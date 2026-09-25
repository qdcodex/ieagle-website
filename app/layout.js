import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SocialFloat from "@/components/SocialFloat";
import ChatBot from "@/components/ChatBot";
import { SITE } from "@/lib/data";

export const metadata = {
  title: `${SITE.fullName} — ${SITE.tagline}`,
  description:
    "iEagles Business Network — a dynamic business community bringing entrepreneurs, business owners, professionals and emerging leaders together to connect, collaborate, learn and grow. Connect • Grow • Serve • Transform.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet" />
      </head>
      <body id="top">
        <Header />
        <main>{children}</main>
        <Footer />
        <SocialFloat />
        <ChatBot />
        <a className="wa-float" href={`https://wa.me/${SITE.whatsapp}`} target="_blank" rel="noopener noreferrer">
          WhatsApp
        </a>
      </body>
    </html>
  );
}
