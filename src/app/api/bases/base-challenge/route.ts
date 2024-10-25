import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import { TipoChallenge } from "@/app/types";

const jsonFilePath = process.cwd() + '/src/data/data-challenge.json';

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
