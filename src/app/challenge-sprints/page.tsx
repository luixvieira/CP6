"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { TipoChallenge } from "../types";

const ChallengeSprints = () => {
    
  const [challengs, setChallenges] = useState<TipoChallenge[]>([]);

  const handleDelete = async (atividade:string) =>{
        try {
            const response = await fetch(`http://localhost:3000/api/bases/base-challenge/${atividade}`,{
                method: 'DELETE',
            });

            if (response.ok) {
                alert("Produto escluído com sucesso!");
                window.location.href = "/challenge-sprints";
            }

        } catch (error) {
            console.error("Falha na exclusão!", error);
            
        }
  }

    useEffect(() => {
        const chamadaApi = async ()=>{
            const response = await fetch("http://localhost:3000/api/bases/base-challenge");
            const data = await response.json();
            setChallenges(data);
        }
        chamadaApi();
    },[]);
  
  return (
      <>
        <div className="paginas challenge">
          <h1>Challenge Sprints</h1>
          <p>Listagem de todas as avaliações de ChallengeSprints aqui.</p>
        </div>

        <div>
        <h2>Produtos</h2>
            <table className="tabela challenge">
                <thead>
                    <tr>
                        <td colSpan={5}>
                            Quantidade de registros: {challengs.length}
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
                    {challengs.map((p) => (
                        <tr key={p.atividade}>
                            <td>{p.atividade}</td>
                            <td>{p.nota}</td>
                            <td><Link href={`/produtos/${p.atividade}`}>Editar</Link></td>
                            <td><Link href="#" onClick={()=>handleDelete(p.atividade)}>Excluir</Link></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
      </>
    )
  }
  
  export default ChallengeSprints;
  