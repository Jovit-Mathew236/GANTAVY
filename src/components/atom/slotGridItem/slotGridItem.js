import { IoTimeOutline } from "react-icons/io5";
export default function SlotGridItem({ start, end }) {
  return (
    <div className="p-2 rounded-md border-sm">
      <p className="font-medium tracking-tight">
        {start}-{end}
      </p>
      <div className="flex text-sm tracking-wide font-thin text-gray-400  flex-row justify-start items-center">
        <IoTimeOutline /> <p className="ml-1">45min</p>
      </div>
    </div>
  );
}
