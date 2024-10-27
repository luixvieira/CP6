"use client";

import { TipoCheckpoint } from "@/app/types";
import { useEffect, useState } from "react";

export default function PaginaIndividual({ params }: { params: { rm: number } }) {
  const [filteredCheckpoints, setFilteredCheckpoints] = useState<TipoCheckpoint[]>([]);
  const [newCheckpoint, setNewCheckpoint] = useState({ rm: 0, atividade: "", nota: 0 });
  const rm = parseInt(params.rm.toString(), 10);

  const loadCheckpoints = () => {
    fetch('/api/bases/base-checkpoint')
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erro ao buscar os dados da API");
        }
        return response.json();
      })
      .then((data: TipoCheckpoint[]) => {
        const filtered = data.filter(checkpoint => checkpoint.rm === rm);
        setFilteredCheckpoints(filtered);
      })
      .catch((error) => {
        console.error("Erro ao buscar os dados:", error);
      });
  };

  useEffect(() => {
    loadCheckpoints();
  }, [rm]);

  const handleAddCheckpoint = () => {
    if (newCheckpoint.atividade && newCheckpoint.nota) {
      fetch('/api/bases/base-checkpoint', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          rm: rm,
          atividade: newCheckpoint.atividade,
          nota: newCheckpoint.nota,
        }),
      })
      .then(response => response.json())
      .then((data) => {
        console.log("Nota adicionada com sucesso:", data);
        setNewCheckpoint({ rm: 0, atividade: "", nota: 0 });
        loadCheckpoints();
      })
      .catch(error => console.error('Erro ao adicionar nota:', error));
    } else {
      console.log("Dados inválidos para adicionar nova nota.");
    }
  };

  const handleRemoveCheckpoint = async (index: number) => {
    const { atividade } = filteredCheckpoints[index];

    try {
        const response = await fetch(`/api/bases/base-checkpoint/${atividade}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error(`Erro ao excluir o CP: ${response.statusText}`);
        }

        const updatedCheckpoints = filteredCheckpoints.filter((_, i) => i !== index);
        setFilteredCheckpoints(updatedCheckpoints);
    } catch (error) {
        console.error("Erro ao remover a atividade:", error);
    }
};

  const handleEditCheckpoint = (index: number, updatedNota: number) => {
    const { atividade, rm } = filteredCheckpoints[index];
    console.log("Editando a atividade:", atividade, "com nova nota:", updatedNota);

    fetch(`/src/api/bases/base-checkpoint/${atividade}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        rm,
        atividade,
        nota: updatedNota,
      }),
    })
    .then(response => response.json())
    .then(() => {
      console.log("Nota atualizada com sucesso.");
      loadCheckpoints();
    })
    .catch(error => console.error('Erro ao editar nota:', error));
  };

  return (
    <div className="container-notas">
      <h1 className="titulo-notas">Notas do Aluno RM: {rm}</h1>
      <div>
        {filteredCheckpoints.length > 0 ? (
              <table className="tabelaNotas">
              <thead>
                  <tr>
                      <th>Nome atividade</th>
                      <th>Nota</th>
                      <th>Remover atividade</th>
                      <th>Editar nota</th>
                  </tr>
              </thead>

              <tbody>
                {filteredCheckpoints.map((checkpoint, index) => (
                  <tr key={index} className="checkpoint-card">
                    <td>{checkpoint.atividade}</td>
                    <td>{checkpoint.nota}</td>
                    <td><button className="botao-remover" onClick={() => handleRemoveCheckpoint(index)}>Remover</button></td>
                    <td><input
                      className="editar-nota"
                      type="number"
                      value={checkpoint.nota}
                      onChange={(e) => handleEditCheckpoint(index, parseFloat(e.target.value))}
                    /></td>
                  </tr>
                ))}
              </tbody>
          </table>
        ) : (
          <p className="nenhuma-nota">Nenhuma nota encontrada para este aluno.</p>
        )}
      </div>

      <div>
        <h2>Adicionar Nova Nota</h2>
        <input
          type="text"
          placeholder="Atividade"
          value={newCheckpoint.atividade}
          onChange={(e) => setNewCheckpoint({ ...newCheckpoint, atividade: e.target.value })}
        />
        <input
          type="number"
          placeholder="Nota"
          value={newCheckpoint.nota}
          onChange={(e) => setNewCheckpoint({ ...newCheckpoint, nota: parseFloat(e.target.value) })}
        />
        <button onClick={handleAddCheckpoint}>Adicionar</button>
      </div>
    </div>
  );
}
