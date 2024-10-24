import Image from "next/image";

export default function NotFound() {
  return (
    <div>
      <h1>404: Page Not Found</h1>
      <h2>A página que você está tentando acessar não está disponível, tente novamente mais tarde.</h2>
      <Image 
        src="/img/404.jpg" 
        alt="Página de erro" 
        width={200} 
        height={200} 
        placeholder="blur" 
        blurDataURL="/blur.jpg" 
        layout="responsive" 
      />
    </div>
  );
}