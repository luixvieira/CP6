import Image from "next/image";
import Link from "next/link";

export default function Home() {
    return (
        <div className="flex flex-col items-center p-6 bg-gradient-to-b from-pink-500 to-yellow-500 min-h-screen">
            <h1 className="text-4xl font-bold text-white mb-4">Bem-vindo ao Portfólio Acadêmico</h1>
            <p className="text-lg text-white mb-8 text-center max-w-xl">
                Esse site permite que você visualize as médias e notas detalhadas dos alunos nas seções de avaliações. 
                Abaixo, você encontrará as instruções para navegar:
            </p>

            <section className="bg-white rounded-lg shadow-lg p-6 w-full max-w-3xl mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Como Usar o Site</h2>
                <ul className="list-disc pl-5 space-y-2">
                    <li>
                        <strong>Dashboard:</strong> Aqui você pode ver um resumo geral dos alunos.
                    </li>
                    <li>
                        <strong>Challenge Sprints:</strong> Clique nessa seção para visualizar as médias das atividades de Challenge Sprints. Escolha um aluno para ver as notas específicas.
                    </li>
                    <li>
                        <strong>CheckPoints:</strong> Nessa seção, você pode ver as médias dos alunos nas atividades de CheckPoints. Clique em um aluno para detalhes das notas.
                    </li>
                    <li>
                        <strong>Global Solutions:</strong> Acesse essa seção para ver as médias dos alunos nas atividades de Global Solutions. Clique no nome do aluno para visualizar todas as notas individuais.
                    </li>
                </ul>
                <p className="mt-4 text-gray-700 text-sm">
                    Clique em qualquer uma das seções acima para explorar as médias e notas detalhadas.
                </p>
            </section>

            <div className="w-48 mb-8">
                <Image 
                    src="/img/bulbassauro.png" 
                    alt="Imagem decorativa" 
                    width={50} 
                    height={50} 
                    placeholder="blur" 
                    blurDataURL="/blur.jpg" 
                    layout="responsive" 
                />
            </div>

            <nav className="flex space-x-4">
                <Link href="/" className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded transition">
                    Dashboard
                </Link>
                <Link href="/challenge-sprints" className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded transition">
                    Challenge Sprints
                </Link>
                <Link href="/checkpoints" className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded transition">
                    CheckPoints
                </Link>
                <Link href="/global-solutions" className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded transition">
                    Global Solutions
                </Link>
            </nav>
        </div>
    );
}
