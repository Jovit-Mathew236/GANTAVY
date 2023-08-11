export default function DayItem({ item, i }) {
  return (
    <div
      className={`p-2 rounded-md w-20 h-20  flex items-center justify-center flex-col m-2 text-xl ${
        i == 0
          ? "bg-primary-color rounded-md text-white  bg-blue-500 shadow-lg shadow-blue-500/50"
          : "bg-[#F3F8FF] text-black-color"
      }`}
    >
      <p
        className={`font-thin text-md ${
          i == 0 ? "text-gray-100" : "text-gray-400"
        } `}
      >
        {" "}
        {item.day_of_week}
      </p>
      <p className={`font-bold text-md `}>{item.day_of_month}</p>
    </div>
  );
}
