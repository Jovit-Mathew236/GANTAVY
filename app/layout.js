// "use client";
import SideNav from "@/src/components/organisms/SideNavbar/SideNav";
import "./globals.css";
import { DM_Sans } from "next/font/google";
import TopNav from "@/src/components/organisms/TopNavbar/TopNav";
// import { usePathname } from "next/navigation";

const inter = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata = {
  title: "GANTAVY",
  description: "GANTAVY",
};

export default function RootLayout({ children }) {
  // const url = usePathname();
  return (
    <html lang="en">
      {
        <body className={inter.className}>
          <SideNav />
          <main>
            <TopNav />
            {children}
          </main>
        </body>
      }
    </html>
  );
}
