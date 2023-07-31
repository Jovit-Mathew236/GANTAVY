import Line from "../../atom/line/line";
import Header from "../../organisms/header/header";
import SideNav from "../../organisms/sidenav/sidenav";
import { DM_Sans } from "next/font/google";

const inter = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export default function Dashboard({ children }) {
  return (
    <html className=" " lang="en">
      <body className={[inter.className, ""]}>
        <main className="bg-white h-screen overflow-hidden  flex flex-col">
          <Header />
          <Line />
          <div className="flex mt-2 flex-grow   flex-col">
            <SideNav />

            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
