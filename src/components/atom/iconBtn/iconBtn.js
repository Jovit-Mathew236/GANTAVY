export default function IconBtn({ Icon, active }) {
  return (
    <div
      className={`w-10 ${
        active ? "bg-blue-50 text-primary-color" : "text-gray-300 bg-white"
      } flex items-center justify-center rounded-full  h-10`}
    >
      <Icon className=" text-xl" />
    </div>
  );
}
