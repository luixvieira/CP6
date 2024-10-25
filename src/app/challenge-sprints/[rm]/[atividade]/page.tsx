"use client";

import { TipoChallenge } from "@/app/types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AtividadeDetalhe({ params }: { params: { rm: number, atividade: string } }) {
  const [challenge, setChallenge] = useState<{ atividade: string, nota: number } | null>(null);

  useEffect(() => {
    // Simula a busca de dados para a atividade
    fetch('/src/data/data-challenge.json')
      .then(response => response.json())
      .then(data => {
        const atividadeData = data.find((item: any) => item.rm === params.rm && item.atividade === params.atividade);
        setChallenge(atividadeData);
      })
      .catch(error => console.error("Erro ao buscar dados:", error));
  }, [params.rm, params.atividade]);

  return (
    <div>
      {challenge ? (
        <>
          <h1>Detalhes da Atividade: {challenge.atividade}</h1>
          <p>Nota: {challenge.nota}</p>
        </>
      ) : (
        <p>Atividade não encontrada.</p>
      )}
    </div>
  );
}
