import { TipoChallenge } from "@/app/types";
import { promises as fs } from "fs";
import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: { params: { atividade: string } }) {
    const file = await fs.readFile(process.cwd() + '/src/data/data-challenge.json', 'utf-8');
    const dados:TipoChallenge[] = JSON.parse(file);
    const atividade = dados.find(a => a.atividade == params.atividade);
    return NextResponse.json(atividade);
}

export async function PUT(request: Request, { params }: { params: { atividade: string } }) {
    const file = await fs.readFile(process.cwd() + '/src/data/data-challenge.json', 'utf-8');
    const challenges:TipoChallenge[] = JSON.parse(file);
    const{atividade, nota} = await request.json();//Podemos receber os dados do request
    
    const indice = challenges.findIndex(c => c.atividade == params.atividade);
    if(indice != -1){
        challenges.splice(indice, 1, {atividade, nota});
        const fileUpdate = JSON.stringify(challenges);
        await fs.writeFile(process.cwd() + '/src/data/data-challenge.json', fileUpdate);
            
        return NextResponse.json({msg:"Sprint atualizada com sucesso!"});
    
    }
}

export async function DELETE(request: Request,  { params }: { params: { atividade: string } }) {
    const file = await fs.readFile(process.cwd() + '/src/data/data-challenge.json','utf-8');
    const challenges:TipoChallenge[] = JSON.parse(file);

    const indice = challenges.findIndex(c => c.atividade == params.atividade);
    if(indice != -1){
        challenges.splice(indice, 1);
        const fileUpdate = JSON.stringify(challenges);
        await fs.writeFile(process.cwd() + '/src/data/data-challenge.json', fileUpdate);
            
        return NextResponse.json({msg:"Sprint excluída com sucesso!"});
    
    }
}