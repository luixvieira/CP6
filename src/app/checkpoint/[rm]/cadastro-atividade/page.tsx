"use client";

import { useState } from "react";

export default function CadastroAtividade({ params }: { params: { rm: number } }) {
  const [checkpoint, setCheckpoint] = useState({ atividade: "", nota: 0 });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCheckpoint(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(`Atividade: ${checkpoint.atividade}, Nota: ${checkpoint.nota}`);
  };

  return (
    <div>
      <h1>Cadastrar/Editar Atividade para o RM: {params.rm}</h1>
      <form className="max-w-sm mx-auto" onSubmit={handleSubmit}>
        <div className="mb-5">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
            Atividade
          </label>
          <input
            type="text"
            id="idAtividade"
            name="atividade"
            value={checkpoint.atividade}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
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
            value={checkpoint.nota}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Nota da sprint"
            required
          />
        </div>
        <div>
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          >
            Alterar
          </button>
        </div>
      </form>
    </div>
  );
}
