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
        const file = await fs.readFile(jsonFilePath, 'utf-8');
        const challenges: TipoChallenge[] = JSON.parse(file);
        
        const { rm, atividade, nota } = await request.json();

        if (typeof rm !== "number" || !atividade || typeof nota !== "number") {
            return NextResponse.json({ msg: "Dados inválidos." }, { status: 400 });
        }
        
        const newChallenge = { rm, atividade, nota } as TipoChallenge;
        challenges.push(newChallenge);

        const fileCreated = JSON.stringify(challenges, null, 2);
        await fs.writeFile(jsonFilePath, fileCreated);
        
        return NextResponse.json(newChallenge, { status: 201 });
    } catch (error) {
        console.error("Erro ao adicionar o desafio:", error);
        return NextResponse.json({ msg: "Erro ao adicionar o desafio." }, { status: 500 });
    }
}

// Método DELETE: Remove um desafio existente
export async function DELETE(request: Request, { params }: { params: { atividade: string } }) {
    try {
        const file = await fs.readFile(jsonFilePath, 'utf-8');
        const challenges: TipoChallenge[] = JSON.parse(file);

        if (!params.atividade) {
            console.error("Parâmetro 'atividade' não foi fornecido.");
            return NextResponse.json({ msg: "Atividade não especificada." }, { status: 400 });
        }

        console.log("Atividade recebida para exclusão:", params.atividade);

        const indice = challenges.findIndex(c => c.atividade === params.atividade);

        if (indice !== -1) {
            challenges.splice(indice, 1);
            const fileUpdate = JSON.stringify(challenges, null, 2);
            await fs.writeFile(jsonFilePath, fileUpdate);
            console.log("Desafio excluído com sucesso:", params.atividade);

            return NextResponse.json({ msg: "Desafio excluído com sucesso!" });
        } else {
            console.error("Atividade não encontrada:", params.atividade);
            return NextResponse.json({ msg: "Atividade não encontrada." }, { status: 404 });
        }
    } catch (error) {
        console.error("Erro ao excluir o desafio:", error);
        return NextResponse.json({ msg: "Erro ao excluir o desafio." }, { status: 500 });
    }
}