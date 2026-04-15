import React from "react";
import Footer from "../home/Footer";

export default function SitePageLayout({ children }) {
  return (
    <div className="min-h-screen bg-background font-body text-foreground">
      <main className="mx-auto max-w-[1600px] px-3 py-3 sm:px-5 sm:py-5 lg:px-7 lg:py-7">{children}</main>
      <Footer />
    </div>
  );
}
