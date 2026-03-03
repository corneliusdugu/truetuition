// src/app/layout.jsx
import "./globals.css";

import SiteHeader from "./ui/SiteHeader.jsx";
import SiteFooter from "./ui/SiteFooter.jsx";

export const metadata = {
  title: "True Tuition",
  description: "SDG 4 • Quality Education donations platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen bg-white text-slate-900">
          <SiteHeader />
          <main className="min-h-[70vh]">{children}</main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}