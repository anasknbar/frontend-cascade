import "./globals.css";
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <main>{children}</main>
      </body>
      {/* <script src="https://cdn.ckbox.io/ckbox/2.4.0/ckbox.js"></script> */}
    </html>
  );
}