import Line from "../../atom/line/line";
import Header from "../../organisms/header/header";
import MyBookings from "../../organisms/mybookings/myBookings";
import SideNav from "../../organisms/sidenav/sidenav";

export default function HomePage() {
  return (
    <div className="bg-white min-h-screen">
      <Header />
      <Line />
      <SideNav /> <Line />
      <div className="bg-white grid grid-cols-12 w-full h-full">
        <MyBookings />
      </div>
    </div>
  );
}
