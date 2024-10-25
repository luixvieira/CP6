"use client";

import { useEffect, useState } from "react";

type TipoChallenge = {
  rm: number;
  atividade: string;
  nota: number;
};

export default function PaginaIndividual({ params }: { params: { rm: number } }) {
  const [filteredChallenges, setFilteredChallenges] = useState<TipoChallenge[]>([]);
  const [newChallenge, setNewChallenge] = useState({ atividade: "", nota: 0 });
  const rm = parseInt(params.rm.toString(), 10); // Converter para número para evitar problemas de tipo

  useEffect(() => {
    // Carregar os dados dos desafios a partir da API
    fetch('/api/bases/base-challenge')
      .then((response) => response.json())
      .then((data: TipoChallenge[]) => {
        const filtered = data.filter(challenge => challenge.rm === rm);
        setFilteredChallenges(filtered);
      })
      .catch((error) => {
        console.error("Erro ao buscar os dados:", error);
      });
  }, [rm]);

  // Função para adicionar uma nova nota
  const handleAddChallenge = () => {
    if (newChallenge.atividade && newChallenge.nota) {
      fetch('/api/bases/base-challenge', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          rm,
          atividade: newChallenge.atividade,
          nota: newChallenge.nota,
        }),
      })
      .then(response => response.json())
      .then(() => {
        setFilteredChallenges([...filteredChallenges, { ...newChallenge, rm }]);
        setNewChallenge({ atividade: "", nota: 0 });
      })
      .catch(error => console.error('Erro ao adicionar nota:', error));
    }
  };

  // Função para remover uma nota
  const handleRemoveChallenge = (index: number) => {
    const { atividade } = filteredChallenges[index];

    fetch(`/api/bases/base-challenge/${atividade}`, {
      method: 'DELETE',
    })
    .then(response => response.json())
    .then(() => {
      const updatedChallenges = filteredChallenges.filter((_, i) => i !== index);
      setFilteredChallenges(updatedChallenges);
    })
    .catch(error => console.error('Erro ao remover nota:', error));
  };

  // Função para alterar uma nota
  const handleEditChallenge = (index: number, updatedNota: number) => {
    const { atividade } = filteredChallenges[index];

    fetch(`/api/bases/base-challenge/${atividade}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        atividade,
        nota: updatedNota,
      }),
    })
    .then(response => response.json())
    .then(() => {
      const updatedChallenges = filteredChallenges.map((challenge, i) =>
        i === index ? { ...challenge, nota: updatedNota } : challenge
      );
      setFilteredChallenges(updatedChallenges);
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
