"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Cadastroatividades() {

    const navigate = useRouter();

    const [atividade, setAtividade] = useState('');
    const [nota, setNota] = useState(0);

    const handleSubmit = async (e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();

    try {
      const response = await fetch(process.env.ENDPOINT_URL as string, {
        method:"POST",
        headers:{
          "Content-Type" : "application/json"
        },
        body: JSON.stringify({ atividade, nota })
      });

      if(response.ok){
        alert("Produto cadastrado com sucesso.")
        setAtividade('');
        setNota(0)
        navigate.push("/produtos");
      }

    } catch (error) {
      console.error("Falha ao cadastrar produto!",error);
    }

  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={atividade} onChange={(e) => setAtividade(e.target.value)} placeholder="Atividade" />
      <input type="number" value={nota} onChange={(e) => setNota(parseInt(e.target.value))} placeholder="Nota" />
      <button type="submit">Adicionar</button>
    </form>
  );
};
