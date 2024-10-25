import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { TipoChallenge } from "@/app/types";

const jsonFilePath = path.resolve('./data/data-challenge.json');

// Método GET: Retorna todos os desafios
export async function GET() {
    try {
        const file = await fs.readFile(jsonFilePath, 'utf-8');
        const dados = JSON.parse(file);
        return NextResponse.json(dados);
    } catch (error) {
        console.error("Erro ao ler o arquivo JSON:", error);
        return NextResponse.json({ msg: "Erro ao ler o arquivo JSON." }, { status: 500 });
    }
}

// Método POST: Adiciona um novo desafio
export async function POST(request: Request) {
    try {
        // Ler os dados existentes no JSON
        const file = await fs.readFile(jsonFilePath, 'utf-8');
        const challenges: TipoChallenge[] = JSON.parse(file);
        
        // Extrair os dados do corpo da requisição
        const { rm, atividade, nota } = await request.json();

        // Verificar se todos os campos necessários foram fornecidos
        if (typeof rm !== "number" || !atividade || typeof nota !== "number") {
            return NextResponse.json({ msg: "Dados inválidos." }, { status: 400 });
        }
        
        // Criar o novo desafio com os dados fornecidos
        const newChallenge = { rm, atividade, nota } as TipoChallenge;
        challenges.push(newChallenge);

        // Salvar as alterações no arquivo JSON
        const fileCreated = JSON.stringify(challenges, null, 2);
        await fs.writeFile(jsonFilePath, fileCreated);
        
        // Retornar a nova entrada adicionada
        return NextResponse.json(newChallenge, { status: 201 });
    } catch (error) {
        // Em caso de erro, logar o erro e retornar uma resposta de erro
        console.error("Erro ao adicionar o desafio:", error);
        return NextResponse.json({ msg: "Erro ao adicionar o desafio." }, { status: 500 });
    }
}

// Método PUT: Atualiza um desafio existente
export async function PUT(request: Request, { params }: { params: { atividade: string } }) {
    try {
        // Ler os dados existentes no JSON
        const file = await fs.readFile(jsonFilePath, 'utf-8');
        const challenges: TipoChallenge[] = JSON.parse(file);

        // Extrair os dados do corpo da requisição
        const { rm, nota } = await request.json();

        // Encontrar o índice do desafio que corresponde à atividade fornecida
        const indice = challenges.findIndex(c => c.atividade === params.atividade);

        if (indice !== -1) {
            // Atualizar a nota e o rm do desafio encontrado
            challenges[indice].nota = nota;
            challenges[indice].rm = rm;

            // Salvar as alterações no arquivo JSON
            const fileUpdate = JSON.stringify(challenges, null, 2);
            await fs.writeFile(jsonFilePath, fileUpdate);

            // Retornar uma resposta de sucesso
            return NextResponse.json({ msg: "Sprint atualizada com sucesso!" });
        } else {
            // Caso a atividade não seja encontrada
            return NextResponse.json({ msg: "Atividade não encontrada." }, { status: 404 });
        }
    } catch (error) {
        // Em caso de erro, logar o erro e retornar uma resposta de erro
        console.error("Erro ao atualizar a sprint:", error);
        return NextResponse.json({ msg: "Erro ao atualizar a sprint." }, { status: 500 });
    }
}

// Método DELETE: Remove um desafio existente
export async function DELETE(request: Request, { params }: { params: { atividade: string } }) {
    try {
        // Ler os dados existentes no JSON
        const file = await fs.readFile(jsonFilePath, 'utf-8');
        const challenges: TipoChallenge[] = JSON.parse(file);

        // Encontrar o índice do desafio que corresponde à atividade fornecida
        const indice = challenges.findIndex(c => c.atividade === params.atividade);

        if (indice !== -1) {
            // Remover o desafio do array
            challenges.splice(indice, 1);

            // Salvar as alterações no arquivo JSON
            const fileUpdate = JSON.stringify(challenges, null, 2);
            await fs.writeFile(jsonFilePath, fileUpdate);

            // Retornar uma resposta de sucesso
            return NextResponse.json({ msg: "Sprint excluída com sucesso!" });
        } else {
            // Caso a atividade não seja encontrada
            return NextResponse.json({ msg: "Atividade não encontrada." }, { status: 404 });
        }
    } catch (error) {
        // Em caso de erro, logar o erro e retornar uma resposta de erro
        console.error("Erro ao excluir a sprint:", error);
        return NextResponse.json({ msg: "Erro ao excluir a sprint." }, { status: 500 });
    }
}
