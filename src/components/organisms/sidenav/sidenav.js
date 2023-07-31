import { data } from "autoprefixer";
import {
  IoNotificationsOutline,
  IoReaderOutline,
  IoChatbubbleOutline,
} from "react-icons/io5";
import SideNavItem from "../../atom/sideNavItem/sideNavItem";
export default function SideNav() {
  const items = [
    {
      icon: IoNotificationsOutline,
      text: "Clinics",
      id: 123,
    },
    {
      icon: IoReaderOutline,
      text: "Notification",
      id: 124,
    },
    {
      icon: IoChatbubbleOutline,
      text: "Chat",
      id: 125,
    },
  ];
  return (
    <div className="sidenav flex-row p-3 pl-8    flex ">
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
