import "./globals.css";
export default function RootLayout({ children }) {
  return (
    <html lang="en" class='bg-white w-[800px] h-[600px]'>
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
}