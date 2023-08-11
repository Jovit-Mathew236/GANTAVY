import { IoTimeOutline } from "react-icons/io5";
import Button from "../button/button";

export default function SlotListitem({ start, end }) {
  return (
    <div className="p-2 flex flex-row justify-between border-b-sm">
      <p className="font-medium tracking-tight">
        {start}-{end}
      </p>
      <div className="flex text-sm tracking-wide font-thin text-gray-400  flex-row justify-start items-center">
        <IoTimeOutline /> <p className="ml-1">45min</p>
      </div>
      <Button styles={"bg-blue-500 text-sm"} text="Book Now" />
    </div>
  );
}
