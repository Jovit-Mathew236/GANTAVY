export default function SubNavItem({ item, selected }) {
  if (selected) {
    return (
      <div
        key={item.id}
        className="flex cursor-pointer py-3 relative flex-row  px-5 items-center justify-center"
      >
        <item.Icon className="text-primary-color text-xl mr-1" />
        <p className="tracking-tight flex  font-medium text-primary-color">
          {item.text}
        </p>
        <div className="line2 absolute opacity-50 bg-primary-color bottom-0 h-1 w-full"></div>
      </div>
    );
  } else {
    return (
      <div
        key={item.id}
        className="flex py-3 cursor-pointer flex-row  px-5 items-center justify-center"
      >
        <item.Icon className="text-gray-600 text-xl mr-1" />
        <p className="tracking-tight flex  font-medium text-gray-600">
          {item.text}
        </p>
      </div>
    );
  }
}
