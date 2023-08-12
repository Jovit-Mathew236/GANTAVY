import NotificationIcon from "../../molecules/notificationindicator/notificationIcon";
import ProductName from "../../molecules/productName/productname";

export default function Header() {
  return (
    <nav className="flex  p-4 flex-row justify-between items-center">
      <ProductName />
      <div className="flex   flex-row justify-center items-center">
        <NotificationIcon />
      </div>
    </nav>
  );
}
