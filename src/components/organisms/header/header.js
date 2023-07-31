import { IoIosAnalytics } from "react-icons/io";
import NotificationIcon from "../../molecules/notificationindicator/notificationIcon";
import ProductName from "../../molecules/productName/productname";
import ProfileIcon from "../../molecules/profileIcon/profileIcon";

import Searchbar from "../../molecules/searchbar/searchBar";
export default function Header() {
  return (
    <nav className="flex p-4 flex-row justify-between items-center">
      <ProductName />
      <div className="flex   flex-row justify-center items-center">
        <NotificationIcon />
        <Searchbar />
        <ProfileIcon />
      </div>
    </nav>
  );
}
