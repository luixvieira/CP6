"use client";

import { TipoChallenge } from "@/app/types";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CadastroAtividade() {

  const navigate = useRouter();

  const [challenge, setChallenge] = useState<TipoChallenge>({
      atividade: "",
      nota: 0
  });

  const handleSubmit = async (e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:3000/api/bases/base-challenge`, {
        method:"POST",
        headers:{
          "Content-Type" : "application/json"
        },
        body: JSON.stringify(challenge)
      });

      if(response.ok){
        alert("Atividade cadastrada com sucesso.")
        setChallenge({
          atividade: "",
          nota: 0
      });
        navigate.push("/challenge-sprints");
      }

    } catch (error) {
      console.error("Falha ao cadastrar atividade!",error);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
    <input
      type="text"
      value={challenge.atividade}
      onChange={(e)=> setChallenge({...challenge, atividade: (e.target.value)})}
      placeholder="Atividade"
    />
    <input
      type="number"
      value={challenge.nota}
      onChange={(e)=> setChallenge({...challenge, nota: parseFloat(e.target.value)})}
      placeholder="Nota"
    />
    <button type="submit">Adicionar</button>
  </form>
  );
};
