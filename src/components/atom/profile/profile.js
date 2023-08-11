export default function Profile() {
  return (
    <div className="mt-4 flex items-center flex-row">
      <img
        src="https://randomuser.me/api/portraits/men/94.jpg"
        alt=""
        className="w-14 rounded-full h-14"
      />
      <div className="ml-2 mt-2">
        <p className="text-lg font-medium leading-3 mb-0">Jhon Doe</p>{" "}
        <p className="mt-0 text-sm text-gray-600">General Medicine</p>
      </div>
    </div>
  );
}
