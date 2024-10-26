import Link from "next/link";

const ChallengeSprints = () => {
  
  const alunos = [
    { nome: "Diego Furigo", rm: 558755 },
    { nome: "Luis Henrique", rm: 558935 },
    { nome: "Melissa Pereira", rm: 555656 },
  ];

  return (
    <>
      <div className="paginas challenge">
        <h1>Challenge Sprints</h1>
        <p>Listagem de todas as avaliações de Challenge Sprints aqui.</p>
      </div>

      <div className="alunos">
        {alunos.map((aluno) => (
          <Link key={aluno.rm} href={`/challenge-sprints/${aluno.rm}`}>
            <section>
              <span className="nome">{aluno.nome}</span>
              <span>RM: {aluno.rm}</span>
              <span className="medias">Médias</span>
              <div className="caixa-medias">
                <div className="caixa-sem">
                  <span className="titulo-sem">1º Sem</span>
                  <span>nota</span>
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
  );
}

export default ChallengeSprints;
