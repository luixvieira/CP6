"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function GSPage() {
  
  const alunos = [
    { nome: "Diego Furigo", rm: 558755 },
    { nome: "Luis Henrique", rm: 558935 },
    { nome: "Melissa Pereira", rm: 555656 },
  ];



  const [notas, setNotas] = useState([]);

 
  useEffect(() => {
    // Chamar a API para carregar os dados do JSON
    fetch('/api/bases/base-global-solution')
      .then((response) => {
        if (!response.ok) throw new Error("Erro ao carregar o JSON da API");
        return response.json();
      })
      .then((data) => {
        console.log("Dados carregados da API:", data);
        setNotas(data);
      })
      .catch((error) => console.error("Erro ao carregar as notas:", error));
  }, []);

  const calcularMedia = (rm) => {
    const notasDoAluno = notas.filter((nota) => nota.rm === rm);
    console.log(`Notas para RM ${rm}:`, notasDoAluno);
    
    if (notasDoAluno.length === 0) return 0;

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
              <span className="medias">Média: {calcularMedia(aluno.rm)}</span>
              <div className="caixa-medias">
                <div className="caixa-sem">
                  <span className="titulo-sem">1º Sem</span>
                  <span>{calcularMedia(aluno.rm)}</span>
                  <span>nota</span>
                  <span>nota</span>
                </div>
                <div className="caixa-sem">
                  <span className="titulo-sem">2º Sem</span>
                  <span>nota</span>
                  <span>nota</span>
                  <span>nota</span>
                </div>
              </div>
            </section>
          </Link>
        ))}
      </div>
    </>
  )
}
