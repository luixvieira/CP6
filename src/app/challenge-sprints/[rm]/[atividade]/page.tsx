"use client";

import { TipoChallenge } from "@/app/types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function EditarAtividade({ params }: { params: { atividade: string }}) {

  const navigate = useRouter();

  const [challenge, setChallenge] = useState<TipoChallenge>({
    atividade: "",
    nota: 0
});

  useEffect(() => {
      const chamadaApi = async ()=>{
        const response = await fetch(`http://localhost:3000/api/bases/base-challenge/${params.atividade}`);
        const data = await response.json();
        setChallenge(data);
      }
      chamadaApi();
  }, [params])


  const handleChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
        const {name, value } = e.target;
        setChallenge((prev) => ({ ...prev, [name]: value }));
  }

  const handleSubmit = async (e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:3000/api/bases/base-challenge/${params.atividade}`, {
        method:"PUT",
        headers:{
          "Content-Type" : "application/json"
        },
        body: JSON.stringify(challenge)
      });

      if(response.ok){
        alert("Sprint atualizada com sucesso!")
        setChallenge({
            atividade: "",
            nota: 0
        });
        navigate.push("/challenge-sprints");
      }

    } catch (error) {
      console.error("Falha ao atualizar sprint!", error);
    }

  }

  return (
    <div>
      <h2>Sprint</h2>
      <div>
        <form className="max-w-sm mx-auto" onSubmit={handleSubmit}>
          <div className="mb-5">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
              Atividade
            </label>
            <input
              type="text"
              id="idAtividade"
              name="atividade"
              value={challenge.atividade}
              onChange={(e)=> handleChange(e)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Nome da atividade"
              required
            />
          </div>
          <div className="mb-5">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
              Nota
            </label>
            <input
              type="number"
              id="idNota"
              name="nota"
              value={challenge.nota}
              onChange={(e)=> handleChange(e)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Nota da sprint"
              required
            />
          </div>
          <div>
            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Alterar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}