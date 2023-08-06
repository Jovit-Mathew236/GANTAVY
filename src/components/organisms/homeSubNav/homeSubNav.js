import {
  IoReaderOutline,
  IoTimeOutline,
  IoSettingsOutline,
} from "react-icons/io5";
import SubNavItem from "../../atom/subNavItem/subNavItem";
import { usePathname } from "next/navigation";
import Link from "next/link";
export default function HomeSubNav({ selected = false }) {
  const path = usePathname();
  console.log(path);
  const items = [
    {
      Icon: IoReaderOutline,
      text: "Clinic Details",
      id: 223883,
      path: "/pagedetails",
    },
    {
      Icon: IoTimeOutline,
      text: "Clinic Timings",
      id: 22386793,
      path: "/timing",
    },
    {
      Icon: IoSettingsOutline,
      text: "Clinic Settings",
      id: 22698633,
      path: "/settings",
    },
  ];
  return (
    <div className="sidenav flex-row p-3 py-0  pl-8    flex ">
      {items.map((item, i) => {
        return (
          <Link href={`/home/${item.path}`}>
            <SubNavItem
              key={item.id}
              item={item}
              selected={path.includes(item.path)}
            />
          </Link>
        );
      })}
    </div>
  );
}
