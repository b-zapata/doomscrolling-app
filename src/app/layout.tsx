import Link from "next/link";
import "./globals.css";

export const metadata = {
  title: "Admin Panel",
  description: "Doomscrolling Intervention Admin",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-black">
        <nav className="bg-white dark:bg-gray-900 text-black dark:text-white shadow px-6 py-4 flex gap-6">
          <Link href="/" className="font-semibold hover:underline">
            Home
          </Link>
          <Link href="/dashboard" className="font-semibold hover:underline">
            Dashboard
          </Link>
          <Link href="/configuration" className="font-semibold hover:underline">
            Configuration
          </Link>
        </nav>
        <main className="p-6">{children}</main>
      </body>
    </html>
  );
}
