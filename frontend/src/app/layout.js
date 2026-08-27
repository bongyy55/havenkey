import { Playfair_Display, Comic_Neue } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme/ThemeProvider";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700"],
});

const comicNeue = Comic_Neue({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["300", "400", "700"],
});

export const metadata = {
  title: "B'Narch | Find your next address with confidence",
  description:
    "Verified real estate listings for clients and diaspora buyers across Nigeria.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${playfair.variable} ${comicNeue.variable} antialiased`}>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}