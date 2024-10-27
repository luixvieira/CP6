import type { Metadata } from "next";
import "@/app/globals.css"
import Cabecalho from "@/components/Cabecalho/Cabecalho";
import Rodape from "@/components/Rodape/Rodape";

export const metadata: Metadata = {
    title: "CP6",
    description: "Feito com amor para o prof Ale<3",
    icons: "/img/heart.png"
  };

export const viewport = {
    width: "device-width",
    initialScale: 5.0,
    colorScheme: "light"
}

export default function RootLayout({children,}: Readonly<{children: React.ReactNode;}>) {
    return (
        <html lang="pt-br">
          <body>
            <Cabecalho/>
            {children}
            <Rodape/>
           </body>
        </html>
      );
}