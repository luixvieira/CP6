import Image from "next/image";

export default function Home() {
    return (
        <div>
            <Image 
                src="/img/bulbassauro.png" 
                alt="Página de erro" 
                width={50} 
                height={50} 
                placeholder="blur" 
                blurDataURL="/blur.jpg" 
                layout="responsive" 
             />
        </div>
    );
}
