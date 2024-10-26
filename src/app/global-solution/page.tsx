import Link from "next/link";

export default function GSPage() {
  
  const alunos = [
    { nome: "Diego Furigo", rm: 558755 },
    { nome: "Luis Henrique", rm: 558935 },
    { nome: "Melissa Pereira", rm: 555656 },
  ];

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
              <span>{aluno.nome}</span>
              <span>RM: {aluno.rm}</span>
              <span>Médias</span>
              <div>
                <div>
                  <span>1º Sem</span>
                  <span>nota</span>
                  <span>nota</span>
                  <span>nota</span>
                </div>
                <div>
                  <span>2º Sem</span>
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
