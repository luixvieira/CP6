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
  const rm = parseInt(params.rm.toString(), 10); // Converter para número para evitar problemas de tipo

  console.log("Valor do RM recebido:", rm); // Log do RM para verificar se está correto

  const loadChallenges = () => {
    console.log("Carregando os desafios para o RM:", rm);
    // Carregar os dados dos desafios a partir da API
    fetch('/api/bases/base-challenge')
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erro ao buscar os dados da API");
        }
        return response.json();
      })
      .then((data: TipoChallenge[]) => {
        console.log("Dados carregados:", data);
        const filtered = data.filter(challenge => challenge.rm === rm);
        console.log("Dados filtrados para o RM:", filtered);
        setFilteredChallenges(filtered);
      })
      .catch((error) => {
        console.error("Erro ao buscar os dados:", error);
      });
  };

  useEffect(() => {
    loadChallenges(); // Carregar os dados quando o componente é montado
  }, [rm]);

  // Função para adicionar uma nova nota
  const handleAddChallenge = () => {
    if (newChallenge.rm && newChallenge.atividade && newChallenge.nota) {
      console.log("Adicionando nova nota:", newChallenge);
      fetch('/api/bases/base-challenge', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          rm: newChallenge.rm,
          atividade: newChallenge.atividade,
          nota: newChallenge.nota,
        }),
      })
      .then(response => response.json())
      .then((data) => {
        console.log("Nota adicionada com sucesso:", data);
        setNewChallenge({ rm: 0, atividade: "", nota: 0 });
        loadChallenges(); // Recarregar os desafios após adicionar
      })
      .catch(error => console.error('Erro ao adicionar nota:', error));
    } else {
      console.log("Dados inválidos para adicionar nova nota.");
    }
  };

  // Função para remover uma nota
  const handleRemoveChallenge = async (index: number) => {
    const { atividade } = filteredChallenges[index];
    console.log("Removendo a atividade:", atividade);

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


  // Função para alterar uma nota
  const handleEditChallenge = (index: number, updatedNota: number) => {
    const { atividade, rm } = filteredChallenges[index];
    console.log("Editando a atividade:", atividade, "com nova nota:", updatedNota);

    fetch(`/api/bases/base-challenge/${atividade}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        rm, // Inclui o rm ao enviar a requisição para o PUT
        atividade,
        nota: updatedNota,
      }),
    })
    .then(response => response.json())
    .then(() => {
      console.log("Nota atualizada com sucesso.");
      loadChallenges(); // Recarregar os desafios após a edição
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
          type="number"
          placeholder="RM"
          value={newChallenge.rm}
          onChange={(e) => setNewChallenge({ ...newChallenge, rm: parseInt(e.target.value, 10) })}
        />
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
