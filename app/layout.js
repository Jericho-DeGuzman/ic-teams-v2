import { Inter } from "next/font/google";
import "./globals.css";
import Siderbar from "./components/navigation/sidebar";
import ReduxProvider from "./redux/ReduxProvider";
import Navbar from "./components/navigation/navbar";
import authenticate from "@/utils/auth";
import { permanentRedirect } from "next/navigation";
import { Toaster } from "react-hot-toast";
import { cookies } from "next/headers";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "IC TEAMS",
};


export default async function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReduxProvider>
          <Toaster />
          <main className="w-full min-h-screen flex">
            <aside style={{ maxWidth: "20%" }}>
              <Siderbar />
            </aside>
            <setion className={`min-h-screen flex-1`}>
              <nav className="w-full">
                <Navbar />
              </nav>
              <main className="min-h-screen p-4 ">
                {children}
              </main>
            </setion>
          </main>
        </ReduxProvider>
      </body>
    </html>
  );
}
