import {
  IoLocateOutline,
  IoLocationOutline,
  IoTimeOutline,
} from "react-icons/io5";
import DayItem from "../../atom/dayItem/dayitem";
import { BsArrowRight, BsArrowUpRight, BsMap } from "react-icons/bs";
export default function BookedItem() {
  return (
    <div className="border-sm relative rounded-md p-3">
      <div className="absolute right-3 top-3 rounded-full border-sm w-14 h-14 flex items-center justify-center">
        <BsArrowUpRight className="text-xl text-gray-400" />
      </div>
      <div className="flex flex-row ">
        <DayItem i={true} item={{ day_of_month: "12", day_of_week: "SUN" }} />
        <div className="p-2">
          <p className="text-xl font-bold">Angel's Clinic</p>
          <p className="">Dr:Alice Jhon</p>
        </div>
      </div>
      <div className="flex flex-row mt-2 justify-between">
        <div className="flex text-sm tracking-wide font-thin text-gray-400  flex-row justify-start items-center">
          <IoTimeOutline /> <p className="ml-1">09:00 AM -09:15 AM</p>
        </div>
        <div className="flex cursor-pointer underline font-medium flex-row items-center justify-center">
          <p className="leading-0">Get Location</p>
          <IoLocationOutline className="mt-1 ml-1" />
        </div>
      </div>
    </div>
  );
}
