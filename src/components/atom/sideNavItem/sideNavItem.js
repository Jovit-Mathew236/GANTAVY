export default function SideNavItem({ Icon, text, selected }) {
  if (selected) {
    return (
      <div className="flex bg-blue-100 px-5 py-1 rounded-full  mr-6 flex-row items-center">
        <Icon className="text-2xl text-primary-color" />
        <p className="ml-2 text-lg font-medium text-primary-color  tracking-tight text-gray-600">
          {text}
        </p>
      </div>
    );
  } else {
    return (
      <div className="flex mr-6 flex-row items-center">
        <Icon className="text-2xl text-gray-600" />{" "}
        <p className="ml-2 text-lg font-medium  tracking-tight text-gray-600">
          {text}
        </p>
      </div>
    );
  }
}
