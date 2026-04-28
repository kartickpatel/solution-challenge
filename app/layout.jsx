import { Inter } from "next/font/google";
import "./globals.css";
import { RoleProvider } from "@/context/RoleContext";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Rapid Crisis Response Platform",
  description: "Real-time emergency response for hospitality",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-black min-h-screen`}>
        <RoleProvider>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">
              {children}
            </main>
            <footer className="bg-gray-900 border-t border-gray-800 py-6 px-6 text-center">
              <p className="text-gray-500 text-sm">
                &copy; 2026 Grand Horizon Hotel — Emergency Response System. System Status: <span className="text-green-500">All Units Online</span>
              </p>
            </footer>
          </div>
        </RoleProvider>
      </body>
    </html>
  );
}
