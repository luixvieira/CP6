import { NextResponse } from "next/server";
import {promises as fs} from "fs";
import { TipoChallenge } from "@/app/types";

export async function GET() {   
    const file = await fs.readFile(process.cwd() + '/src/data/data-challenge.json', 'utf-8');
    const dados = JSON.parse(file);
    return NextResponse.json(dados);
}

export async function POST(request:Request) {

    const file = await fs.readFile(process.cwd() + '/src/data/data-challenge.json','utf-8');
    const challenges:TipoChallenge[] = JSON.parse(file);
    
    const{atividade, nota} = await request.json();
    
    const challenge = {atividade, nota} as TipoChallenge;
    
    //const strAtividade = (challenges[challenges.length - 1].atividade);
    //challenge.atividade = ((parseInt(strAtividade.slice(2)) + 1).toString());

    challenges.push(challenge);

    const fileCreated = JSON.stringify(challenges);
    await fs.writeFile(process.cwd() + '/src/data/data-challenge.json', fileCreated);
        
    return NextResponse.json(challenge, {status:201});

}