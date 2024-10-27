"use client";

import { TipoChallenge } from "@/app/types";
import { useEffect, useState } from "react";

export default function PaginaIndividual({ params }: { params: { rm: number } }) {
  const [filteredChallenges, setFilteredChallenges] = useState<TipoChallenge[]>([]);
  const [newChallenge, setNewChallenge] = useState({ rm: 0, atividade: "", nota: 0 });
  const rm = parseInt(params.rm.toString(), 10);

  const loadChallenges = () => {
    fetch('/api/bases/base-challenge')
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erro ao buscar os dados da API");
        }
        return response.json();
      })
      .then((data: TipoChallenge[]) => {
        const filtered = data.filter(challenge => challenge.rm === rm);
        setFilteredChallenges(filtered);
      })
      .catch((error) => {
        console.error("Erro ao buscar os dados:", error);
      });
  };

  useEffect(() => {
    loadChallenges();
  }, [rm]);

  const handleAddChallenge = () => {
    if (newChallenge.atividade && newChallenge.nota) {
      fetch('/api/bases/base-challenge', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          rm: rm,
          atividade: newChallenge.atividade,
          nota: newChallenge.nota,
        }),
      })
      .then(response => response.json())
      .then((data) => {
        console.log("Nota adicionada com sucesso:", data);
        setNewChallenge({ rm: 0, atividade: "", nota: 0 });
        loadChallenges();
      })
      .catch(error => console.error('Erro ao adicionar nota:', error));
    } else {
      console.log("Dados inválidos para adicionar nova nota.");
    }
  };

  const handleRemoveChallenge = async (index: number) => {
    const { atividade } = filteredChallenges[index];

    try {
        const response = await fetch(`/api/bases/base-challenge/${atividade}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error(`Erro ao excluir o desafio: ${response.statusText}`);
        }
        
        const updatedChallenges = filteredChallenges.filter((_, i) => i !== index);
        setFilteredChallenges(updatedChallenges);
    } catch (error) {
        console.error("Erro ao remover a atividade:", error);
    }
};

  const handleEditChallenge = (index: number, updatedNota: number) => {
    const { atividade, rm } = filteredChallenges[index];
    console.log("Editando a atividade:", atividade, "com nova nota:", updatedNota);

    fetch(`/api/bases/base-challenge/${atividade}`, {
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
      loadChallenges();
    })
    .catch(error => console.error('Erro ao editar nota:', error));
  };

  return (
    <div className="container-notas">
      <h1 className="titulo-notas">Notas do Aluno RM: {rm}</h1>
      <div>
        {filteredChallenges.length > 0 ? (
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
                {filteredChallenges.map((challenge, index) => (
                  <tr key={index} className="challenge-card">
                    <td>{challenge.atividade}</td>
                    <td>{challenge.nota}</td>
                    <td><button className="botao-remover" onClick={() => handleRemoveChallenge(index)}>Remover</button></td>
                    <td><input
                      className="editar-nota"
                      type="number"
                      value={challenge.nota}
                      onChange={(e) => handleEditChallenge(index, parseFloat(e.target.value))}
                    /></td>
                  </tr>
                ))}
              </tbody>
          </table>
        ) : (
          <p className="nenhuma-nota">Nenhuma nota encontrada para este aluno.</p>
        )}
      </div>

      <div className="adicionar-nota">
        <h2 className="titulo">Adicionar Nova Nota</h2>
        <input
          type="text"
          placeholder="Atividade"
          value={newChallenge.atividade}
          onChange={(e) => setNewChallenge({ ...newChallenge, atividade: e.target.value })}
        />
        <input
          type="number"
          placeholder="Nota"
          value={newChallenge.nota}
          onChange={(e) => setNewChallenge({ ...newChallenge, nota: parseFloat(e.target.value) })}
        />
        <button className="botao-adicionar" onClick={handleAddChallenge}>Adicionar</button>
      </div>
    </div>
  );
}
