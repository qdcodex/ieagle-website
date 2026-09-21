import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SocialFloat from "@/components/SocialFloat";
import ChatBot from "@/components/ChatBot";
import { SITE } from "@/lib/data";

export const metadata = {
  title: `${SITE.name} — ${SITE.tagline}`,
  description: "Community service organisation: events, members, directory, newsletters and business directory.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet" />
      </head>
      <body>
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
