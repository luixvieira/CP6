"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Aluno = {
  nome: string;
  rm: number;
};

type Nota = {
  rm: number;
  nota: number;
};

export default function GSPage() {
  const alunos: Aluno[] = [
    { nome: "Diego Furigo", rm: 558755 },
    { nome: "Luis Henrique", rm: 558935 },
    { nome: "Melissa Pereira", rm: 555656 },
  ];

  const [notas, setNotas] = useState<Nota[]>([]);

  useEffect(() => {
    // Chamar a API para carregar os dados do JSON
    fetch("/api/bases/base-global-solution")
      .then((response) => {
        if (!response.ok) throw new Error("Erro ao carregar o JSON da API");
        return response.json();
      })
      .then((data: Nota[]) => {
        console.log("Dados carregados da API:", data);
        setNotas(data);
      })
      .catch((error) => console.error("Erro ao carregar as notas:", error));
  }, []);

  const calcularMedia = (rm: number): string => {
    const notasDoAluno = notas.filter((nota) => nota.rm === rm);
    console.log(`Notas para RM ${rm}:`, notasDoAluno);

    if (notasDoAluno.length === 0) return "0.00";

    const soma = notasDoAluno.reduce((acc, curr) => acc + curr.nota, 0);
    return (soma / notasDoAluno.length).toFixed(2);
  };

  return (
    <>
      <div className="paginas global">
        <h1>Global Solutions</h1>
        <p>Listagem de todas as avaliações de Globals aqui.</p>
      </div>

      <div className="alunos">
        {alunos.map((aluno) => (
          <Link key={aluno.rm} href={`/global-solution/${aluno.rm}`}>
            <section>
              <span className="nome">{aluno.nome}</span>
              <span>RM: {aluno.rm}</span>
              <div className="caixa-medias">
                <span className="medias">Médias {calcularMedia(aluno.rm)} </span>
              </div>
            </section>
          </Link>
        ))}
      </div>
    </>
  );
}
