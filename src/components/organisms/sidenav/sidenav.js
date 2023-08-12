import { data } from "autoprefixer";
import {
  IoTicket,
  IoReaderOutline,
  IoChatbubbleOutline,
} from "react-icons/io5";
import SideNavItem from "../../atom/sideNavItem/sideNavItem";
export default function SideNav() {
  const items = [
    {
      icon: IoTicket,
      text: "My Bookings",
      id: 123,
    },
    {
      icon: IoReaderOutline,
      text: "Help",
      id: 124,
    },
    {
      icon: IoChatbubbleOutline,
      text: "Chat",
      id: 125,
    },
  ];
  return (
    <div className="sidenav flex-row p-3 pl-8 flex items-center">
      {items.map((item) => {
        return (
          <SideNavItem
            key={item.id}
            selected={item.id == 123}
            text={item.text}
            Icon={item.icon}
          />
        );
      })}
    </div>
  );
}
