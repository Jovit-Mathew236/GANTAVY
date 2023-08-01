import {
  IoSettingsOutline,
  IoCopyOutline,
  IoLocationOutline,
} from "react-icons/io5";
import Button from "../../atom/button/button";
export default function HomeCard({ item }) {
  return (
    <div className="bg-white shadow-xl transition-all cursor-pointer hover:shadow-gray-200 shadow-gray-100 overflow-hidden relative rounded-md p-4 m-2">
      <div className="flex flex-row  mt-2 mb-1 justify-between items-center">
        <p className="text-2xl text-black-color tracking-tight font-medium">
          {item.heading}
        </p>
        <IoSettingsOutline className="text-xl text-gray-600" />
      </div>
      <div className="flex mt-1 flex-row items-center justify-start ">
        <IoLocationOutline className="text-gray-600" />{" "}
        <p className="tracking-tight ml-1 text-gray-600"> {item.location}</p>
      </div>
      <div className="flex mt-2 flex-row items-center justify-between">
        <p className="tracking-tight text-gray-600 ">
          Today: {item.totalbookings} Bookings
        </p>
        <p className="tracking-tight font-medium underline underline-offset-2 text-black-color">
          View all Bookings
        </p>
      </div>

      <div className="flex mt-5 flex-row justify-between items-center">
        <div className="flex flex-row justify-center items-center">
          <IoCopyOutline className="text-xl text-primary-color mr-1" />
          <p className="font-medium text-md text-primary-color tracking-tight">
            Copy Link
          </p>
        </div>
        <Button text="Share" />
      </div>
    </div>
  );
}
