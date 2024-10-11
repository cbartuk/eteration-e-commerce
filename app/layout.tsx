"use client";

import "./globals.css";
import { store } from "../store/store";
import { Provider } from "react-redux";
import Header from "@/components/Header";
import { usePathname } from "next/navigation";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  // Sadece ürün detay sayfasında (products/[id]) sepet ikonunu göstermek için:
  const showCartIcon = pathname?.startsWith("/products/");

  return (
    <html lang="en">
      <body>
        <Provider store={store}>
          <Header showCartIcon={showCartIcon} />
          {children}
        </Provider>
      </body>
    </html>
  );
}
