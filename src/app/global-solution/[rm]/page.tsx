"use client";

import { TipoGS } from "@/app/types";
import { useEffect, useState } from "react";

export default function PaginaIndividual({ params }: { params: { rm: number } }) {
  const [filteredGlobalSolutions, setFilteredGlobalSolutions] = useState<TipoGS[]>([]);
  const [newGlobalSolution, setNewGlobalSolution] = useState({ rm: 0, atividade: "", nota: 0 });
  const rm = parseInt(params.rm.toString(), 10);

  const loadGlobalSolutions = () => {
    fetch('/api/bases/base-global-solution')
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erro ao buscar os dados da API");
        }
        return response.json();
      })
      .then((data: TipoGS[]) => {
        const filtered = data.filter(globalSolution => globalSolution.rm === rm);
        setFilteredGlobalSolutions(filtered);
      })
      .catch((error) => {
        console.error("Erro ao buscar os dados:", error);
      });
  };

  useEffect(() => {
    loadGlobalSolutions();
  }, [rm]);

  const handleAddGlobalSolution = () => {
    if (newGlobalSolution.atividade && newGlobalSolution.nota) {
      fetch('/api/bases/base-global-solution', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          rm: rm,
          atividade: newGlobalSolution.atividade,
          nota: newGlobalSolution.nota,
        }),
      })
      .then(response => response.json())
      .then((data) => {
        console.log("Nota adicionada com sucesso:", data);
        setNewGlobalSolution({ rm: 0, atividade: "", nota: 0 });
        loadGlobalSolutions();
      })
      .catch(error => console.error('Erro ao adicionar nota:', error));
    } else {
      console.log("Dados inválidos para adicionar nova nota.");
    }
  };

  const handleRemoveGlobalSolution = async (index: number) => {
    const { atividade } = filteredGlobalSolutions[index];

    try {
        const response = await fetch(`/api/bases/base-global-solution/${atividade}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error(`Erro ao excluir o CP: ${response.statusText}`);
        }

        const updatedGlobalSolutions = filteredGlobalSolutions.filter((_, i) => i !== index);
        setFilteredGlobalSolutions(updatedGlobalSolutions);
    } catch (error) {
        console.error("Erro ao remover a atividade:", error);
    }
};

  const handleEditGlobalSolution = (index: number, updatedNota: number) => {
    const { atividade, rm } = filteredGlobalSolutions[index];
    console.log("Editando a atividade:", atividade, "com nova nota:", updatedNota);

    fetch(`/src/api/bases/base-global-solution/${atividade}`, {
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
      loadGlobalSolutions();
    })
    .catch(error => console.error('Erro ao editar nota:', error));
  };

  return (
    <div className="container-notas">
      <h1 className="titulo-notas">Notas do Aluno RM: {rm}</h1>
    <div>
      {filteredGlobalSolutions.length > 0 ? (
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
              {filteredGlobalSolutions.map((globalSolution, index) => (
                <tr key={index} className="globalSolution-card">
                  <td>{globalSolution.atividade}</td>
                  <td>{globalSolution.nota}</td>
                  <td><button className="botao-remover" onClick={() => handleRemoveGlobalSolution(index)}>Remover</button></td>
                  <td><input
                    className="editar-nota"
                    type="number"
                    value={globalSolution.nota}
                    onChange={(e) => handleEditGlobalSolution(index, parseFloat(e.target.value))}
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
        value={newGlobalSolution.atividade}
        onChange={(e) => setNewGlobalSolution({ ...newGlobalSolution, atividade: e.target.value })}
      />
      <input
        type="number"
        placeholder="Nota"
        value={newGlobalSolution.nota}
        onChange={(e) => setNewGlobalSolution({ ...newGlobalSolution, nota: parseFloat(e.target.value) })}
      />
      <button onClick={handleAddGlobalSolution}>Adicionar</button>
    </div>
  </div>
  );
}
