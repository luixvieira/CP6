"use client";

import { useEffect, useState } from "react";

type TipoChallenge = {
  rm: number;
  atividade: string;
  nota: number;
};

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

        const data = await response.json();
        console.log("Atividade removida com sucesso:", data.msg);

        // Atualizar o estado local após a remoção
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
    <div>
      <h1>Notas do Aluno RM: {rm}</h1>
      <div>
        {filteredChallenges.length > 0 ? (
          filteredChallenges.map((challenge, index) => (
            <div key={index} className="challenge-card">
              <h2>Atividade: {challenge.atividade}</h2>
              <p>Nota: {challenge.nota}</p>
              <button onClick={() => handleRemoveChallenge(index)}>Remover</button>
              <input
                type="number"
                value={challenge.nota}
                onChange={(e) => handleEditChallenge(index, parseFloat(e.target.value))}
              />
            </div>
          ))
        ) : (
          <p>Nenhuma nota encontrada para este aluno.</p>
        )}
      </div>

      <div>
        <h2>Adicionar Nova Nota</h2>
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
        <button onClick={handleAddChallenge}>Adicionar</button>
      </div>
    </div>
  );
}
