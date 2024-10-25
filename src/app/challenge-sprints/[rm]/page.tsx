"use client";

import { TipoChallenge } from "@/app/types";
import Link from "next/link";
import { useEffect, useState } from "react";


export default function PaginaIndividual({ params }: { params: { rm: number } }) {

    const materias = ["ARTIFICIAL INTELLIGENCE & CHATBOT", "BUILDING RELATIONAL DATABASE", "COMPUTATIONAL THINKING USING PYTHON", "DOMAIN DRIVEN DESIGN USING JAVA", "FRONT-END DESING ENGINEERING", "SOFTWARE ENGINEERING AND BUSINESS MODEL"]

    const [challenges, setChallenges] = useState<TipoChallenge[]>([]);

    const handleDelete = async (atividade:string) =>{
          try {
              const response = await fetch(`http://localhost:3000/api/bases/base-challenge/${atividade}`,{
                  method: 'DELETE',
              });
  
              if (response.ok) {
                  alert("Atividade escluída com sucesso!");
                  window.location.href = "/challenge-sprints";
              }
  
          } catch (error) {
              console.error("Falha na exclusão!", error);
              
          }
    }
  
      useEffect(() => {
        async function chamadaApi() {
            try {
              const response = await fetch('http://localhost:3000/api/bases/base-challenge');
              
              if (!response.ok) {
                throw new Error(`Erro: ${response.status}`);
              }
              
              const data = await response.json();
              setChallenges(data);
            } catch (error) {
                return console.error("Erro em fazer o fetch:", error);
            }
          }
          chamadaApi();
      },[]);
    
    return (
        <>
          <div className="paginas challenge">
            <h1>Challenge Sprints - {params.rm}</h1>
            <p>Listagem de todas as avaliações de Challenge Sprints aqui.</p>
          </div>
  
          <div>
            {materias.map((m) => (
                <>
                    <h2>{m}</h2>
                    <table className="tabela challenge">
                        <thead>
                            <tr>
                                <td colSpan={5}>
                                    Quantidade de atividades: {challenges.length}
                                </td>
                            </tr>
                            <tr>
                                <th>Atividade</th>
                                <th>Nota</th>
                                <th>Editar</th>
                                <th>Excluir</th>
                            </tr>
                        </thead>
        
                        <tbody>
                            {challenges.map((n) => (
                                <tr key={n.atividade}>
                                    <td>{n.atividade}</td>
                                    <td>{n.nota}</td>
                                    <td><Link href={`/challenge-sprints/${params.rm}/${n.atividade}`}>Editar</Link></td>
                                    <td><Link href="#" onClick={()=>handleDelete(n.atividade)}>Excluir</Link></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <Link href={`/challenge-sprints/${params.rm}/cadastro-atividade`}>Cadastrar nova atividade</Link>
                </>
            ))};
          
          </div>
        </>
      )
}
