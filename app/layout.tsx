import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ragsites - AI Automation for Local Businesses",
  description: "From AI Receptionists that never sleep to 5-Star Review Systems. We build the tech that scales local businesses.",
  icons: {
    icon: "/new-logo.png",
    apple: "/new-logo.png",
  },
  other: {
    "trustpilot-one-time-domain-verification-id": "a3c41fb2-a225-48c4-a6ac-1e2d903acc81",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-ZEZRV7M5F4"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-ZEZRV7M5F4');
          `}
        </Script>


        {/* Microsoft Clarity */}
        <Script id="microsoft-clarity" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "v3fxwwhemk");
          `}
        </Script>

        {/* Trustpilot */}
        <Script
          src="//widget.trustpilot.com/bootstrap/v5/tp.widget.bootstrap.min.js"
          strategy="afterInteractive"
        />

        {children}
      </body>
    </html>
  );
}
