import type { ReactNode } from "react";
import { Starfield } from "@/components/background/starfield";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { LoadingScreen } from "@/components/layout/loading-screen";

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <>
      <LoadingScreen />
      <Starfield />
      <div className="site">
        <Header />
        <main id="main-content" tabIndex={-1}>
          {children}
        </main>
        <Footer />
      </div>
    </>
  );
}
