import type { Metadata } from "next";
import "@/app/globals.css"

export const metadata: Metadata = {
    title: "CP6-Portifólio",
    description: "Feito com amor para o prof Ale<3",
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
            {children}
           </body>
        </html>
      );
}