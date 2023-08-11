import { IoCalendarSharp } from "react-icons/io5";
export default function CalenderPicker() {
  return (
    <div className="p-2 rounded-md w-20 flex items-center justify-center h-20 bg-[#F3F8FF] m-2 text-xl">
      <div className="w-12 bg-white flex items-center justify-center rounded-full text-primary-color h-12">
        <IoCalendarSharp className=" text-2xl" />
      </div>{" "}
    </div>
  );
}
