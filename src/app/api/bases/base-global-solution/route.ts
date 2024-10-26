import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import { TipoCheckpoint } from "@/app/types";

const jsonFilePath = process.cwd() + '/src/data/data-checkpoint.json';

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

export async function POST(request: Request) {
    try {
        const file = await fs.readFile(jsonFilePath, 'utf-8');
        const checkpoints: TipoCheckpoint[] = JSON.parse(file);
        
        const { rm, atividade, nota } = await request.json();

        if (typeof rm !== "number" || !atividade || typeof nota !== "number") {
            return NextResponse.json({ msg: "Dados inválidos." }, { status: 400 });
        }
        
        const newCheckpoint = { rm, atividade, nota } as TipoCheckpoint;
        checkpoints.push(newCheckpoint);

        const fileCreated = JSON.stringify(checkpoints, null, 2);
        await fs.writeFile(jsonFilePath, fileCreated);
        
        return NextResponse.json(newCheckpoint, { status: 201 });
    } catch (error) {
        console.error("Erro ao adicionar o CP:", error);
        return NextResponse.json({ msg: "Erro ao adicionar o CP." }, { status: 500 });
    }
}

export async function DELETE(request: Request, { params }: { params: { atividade: string } }) {
    try {
        const file = await fs.readFile(jsonFilePath, 'utf-8');
        const checkpoints: TipoCheckpoint[] = JSON.parse(file);

        if (!params.atividade) {
            console.error("Parâmetro 'atividade' não foi fornecido.");
            return NextResponse.json({ msg: "Atividade não especificada." }, { status: 400 });
        }

        console.log("Atividade recebida para exclusão:", params.atividade);

        const indice = checkpoints.findIndex(c => c.atividade === params.atividade);

        if (indice !== -1) {
            checkpoints.splice(indice, 1);
            const fileUpdate = JSON.stringify(checkpoints, null, 2);
            await fs.writeFile(jsonFilePath, fileUpdate);

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