import { Geist, Geist_Mono, Libre_Baskerville } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const libreBaskerville = Libre_Baskerville({
  variable: "--font-libre-baskerville",
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
});

export const metadata = {
  title: "Pizza & Friends",
  description: "Unexpectedly a tech community! From dinner meetups to Discord calls, we make cool stuff and try not to take it too seriously.",
  metadataBase: new URL("https://joinpizza.fun"),
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
  openGraph: {
    title: "Pizza & Friends",
    description: "Unexpectedly a tech community! From dinner meetups to Discord calls, we make cool stuff and try not to take it too seriously.",
    url: "https://joinpizza.fun",
    siteName: "Pizza & Friends",
    type: "website",
    images: ["/logo.png"],
  },
  twitter: {
    card: "summary",
    title: "Pizza & Friends",
    description: "Unexpectedly a tech community! From dinner meetups to Discord calls, we make cool stuff and try not to take it too seriously.",
    images: ["/logo.png"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${libreBaskerville.variable} antialiased`}
      >
        {children}
        <footer className="footer">
          <p>
            © {new Date().getFullYear()} Pizza &amp; Friends ·{" "}
            <a href="https://discord.gg/TrycsErM4R" target="_blank" rel="noopener noreferrer">
              Discord
            </a>{" "}
            ·{" "}
            <a href="https://instagram.com/pizzaplusfriends" target="_blank" rel="noopener noreferrer">
              Instagram
            </a>
          </p>
        </footer>
      </body>
    </html>
  );
}
