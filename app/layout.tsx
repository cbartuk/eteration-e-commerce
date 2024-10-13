"use client";

import "./globals.css";
import { store } from "../store/store";
import { Provider } from "react-redux";
import Header from "@/components/Header";
import Footer from "@/components/Footer"; // Footer'ı ekliyoruz
import { usePathname } from "next/navigation";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const showCartIcon = pathname?.startsWith("/products/");

  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <Provider store={store}>
          <Header showCartIcon={showCartIcon} />
          <main className="flex-grow">{children}</main>
          <Footer /> {/* Footer'ı buraya ekliyoruz */}
        </Provider>
      </body>
    </html>
  );
}
