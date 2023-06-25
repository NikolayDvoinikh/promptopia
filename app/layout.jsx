import { Nav, Provider } from "@components";
import Link from "next/link";
import Image from "next/image";
import "@styles/globals.css";

export const metadata = {
  title: "Promptopia",
  description: "Discover & share AI Prompts",
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <Provider>
          <div className="main">
            <div className="gradient" />
          </div>

          <main className="app">
            <header className="w-full flex-between mb-16 pt-3">
              <Link href="/" className="flex gap-2 flex-center">
                <Image
                  src="/assets/images/logo.svg"
                  alt="Promptopia Logo"
                  width={30}
                  height={30}
                  className="object-contain"
                />
                <p className="logo_text">Promptopia</p>
              </Link>
              <Nav />
            </header>
            {children}
          </main>
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;
