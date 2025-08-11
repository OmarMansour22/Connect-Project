"use client";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { Roboto } from "next/font/google";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../theme";
import Navbar from "./_Components/Navbar/page";
import Footer from "./_Components/Footer/page";
import { store } from "@/Redux/store";
import { Provider } from "react-redux";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={roboto.variable}>
      <head>
        <title>Connect</title>
      </head>
      <body
        style={{
          margin: "0px",
          background:
            "linear-gradient(262deg,rgba(95, 42, 155, 0.1) 0%, rgba(175, 87, 199, 0.1) 50%, rgba(237, 83, 224, 0.1) 100%)",
        }}
        className={`${geistSans.variable} ${geistMono.variable}`}
      >
        <Provider store={store}>
          <AppRouterCacheProvider>
            <ThemeProvider theme={theme}>
              <Navbar />
              <div
                style={{
                  minHeight: "100vh",
                }}
              >
                {children}
              </div>
              <Footer />
            </ThemeProvider>
          </AppRouterCacheProvider>
        </Provider>
      </body>
    </html>
  );
}
