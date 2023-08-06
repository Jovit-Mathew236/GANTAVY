"use client";
import Button from "@/src/components/atom/button/button";
import Line from "@/src/components/atom/line/line";
import DetailsPageContainer from "@/src/components/molecules/detailsPageContainer/detailPageContainer";
import ConfirmDialoguePopop from "@/src/components/organisms/confirmationDialogue/confirmDialoguePopop";
import CreateClinicPopup from "@/src/components/organisms/createClinicPopup/createClinicPopup";
import HomeSubNav from "@/src/components/organisms/homeSubNav/homeSubNav";
import Popup from "@/src/components/templates/popup/popup";
import { FaFemale, FaMale } from "react-icons/fa";
import { FaDroplet } from "react-icons/fa6";
import { IoCalendarSharp, IoMenuSharp } from "react-icons/io5";
import { LuXCircle, LuCheck, LuMoveDiagonal } from "react-icons/lu";
export default function Page() {
  function getNext10Days() {
    // Get the current date
    const currentDate = new Date();
    // Create an array to hold the results
    const result = [];
    // Function to add leading zero to a number if it's less than 10
    const addLeadingZero = (num) => (num < 10 ? "0" + num : num);
    // Loop through the next 15 days
    for (let i = 0; i < 10; i++) {
      // Calculate the date for the current iteration
      const nextDate = new Date(currentDate);
      nextDate.setDate(currentDate.getDate() + i);
      // Get the day of the week in "SUN", "MON", etc. format
      const dayOfWeek = nextDate
        .toLocaleString("en-US", { weekday: "short" })
        .toUpperCase();
      // Get the day of the month in number with leading zero if necessary
      const dayOfMonth = addLeadingZero(nextDate.getDate());
      // Create an object with the day of the week and day of the month
      const dayInfo = { day_of_week: dayOfWeek, day_of_month: dayOfMonth };
      // Push the object to the result array
      result.push(dayInfo);
    }

    return result;
  }

  // Call the function to get the array of objects
  const next10DaysArray = getNext10Days();

  return (
    <div className="">
      {/* <Popup>
        <ConfirmDialoguePopop />
      </Popup> */}
      <Line />
      <HomeSubNav />
      <Line />
      <div className=" p-5 bg-shade-color pl-12 pr-12    w-full h-full">
        <h3 className="text-2xl mb-2 mt-2 font-medium  tracking-tight text-gray-600">
          Bookings
        </h3>
        <div className="">Select a date to view bookings</div>
        <div className="flex p-3   flex-row justify-around">
          {next10DaysArray.map((item, i) => {
            if (i == 0) {
              return (
                <div className="p-4 w-32  border-1  ring-primary-color ring-offset-2 ring-2  m-1 mx-4 rounded-xl relative bg-white">
                  <p className="text-xl text-primary-color font-bold">
                    {item.day_of_month}
                  </p>

                  <p className="text-xl font-medium text-gray-600">
                    {item.day_of_week}
                  </p>
                </div>
              );
            } else {
              return (
                <div className="p-4 w-32  bg-white  border-1  m-1 mx-4 rounded-xl relative ">
                  <p className="text-xl text-primary-color font-bold">
                    {item.day_of_month}
                  </p>

                  <p className="text-xl font-medium text-gray-600">
                    {item.day_of_week}
                  </p>
                </div>
              );
            }
          })}
        </div>{" "}
        <Line />
        <div className="p-3 mt-4 pl-2">
          {" "}
          <div className="flex flex-row items-center justify-between">
            <p className="text-xl tracking-tight font-medium text-black-color">
              05 June 2023 | Appointments
            </p>
            <div className="flex flex-row">
              <div className="w-10 bg-white flex items-center justify-center rounded-full text-primary-color h-10">
                <IoCalendarSharp className=" text-xl" />
              </div>{" "}
              <div className="w-10 bg-white ml-5 flex items-center justify-center rounded-full text-gray-300 h-10">
                <IoMenuSharp className=" text-xl" />
              </div>
            </div>
          </div>
          <div className=" bg-white mt-4 ">
            <div className="grid p-3  font-medium tracking-tight text-md text-black-color   grid-cols-9">
              <p className="col-span-2 ">Name</p>
              <p className="">Gender</p>
              <p className="">Age</p>
              <p className="">Slot</p>
              <p className="col-span-2">Time</p>
              <p className="col-span-2">
                <Button styles={"bg-red-500"} text={"Cancel All bookings"} />
              </p>
            </div>
            <Line />
            <div className="font-medium text-gray-600">
              <div className="grid p-3 font-regular tracking-tight text-md    grid-cols-9">
                <div className="col-span-2 flex flex-row items-center">
                  <img
                    src="https://randomuser.me/api/portraits/women/2.jpg"
                    alt=""
                    className="w-8 h-8 rounded-full"
                  />
                  <p className="ml-2">Catherine Stevens</p>
                </div>
                <p className="">Female</p>
                <p className="">28</p>
                <p className="">04</p>
                <p className="col-span-2">09.10 AM -09.45 AM</p>
                <div className="flex flex-row justify-center items-center">
                  <LuXCircle className="text-2xl text-red-500" />
                  <LuCheck className="text-2xl text-green-500 ml-5" />
                  <LuMoveDiagonal className="text-2xl text-gray-500 ml-5" />
                </div>
              </div>
              <Line />
              <div className="grid p-3 font-regular tracking-tight text-md    grid-cols-9">
                <div className="col-span-2 flex flex-row items-center">
                  <img
                    src="https://randomuser.me/api/portraits/men/54.jpg"
                    alt=""
                    className="w-8 h-8 rounded-full"
                  />
                  <p className="ml-2">Marcus Daniels</p>
                </div>
                <p className="">Male</p>
                <p className="">48</p>
                <p className="">07</p>
                <p className="col-span-2">09.45 AM -10.00 AM</p>
                <div className="flex flex-row justify-center items-center">
                  <LuXCircle className="text-2xl text-red-500" />
                  <LuCheck className="text-2xl text-green-500 ml-5" />
                  <LuMoveDiagonal className="text-2xl text-gray-500 ml-5" />
                </div>
              </div>
              <Line />
              <div className="grid p-3  font-regular tracking-tight text-md    grid-cols-9">
                <div className="col-span-2 line-through  flex flex-row items-center">
                  <img
                    src="https://randomuser.me/api/portraits/men/52.jpg"
                    alt=""
                    className="w-8 h-8 rounded-full"
                  />
                  <p className="ml-2 ">Oscar Torres</p>
                </div>
                <p className="line-through">Male</p>
                <p className="line-through">38</p>
                <p className="line-through">08</p>
                <p className="col-span-2 line-through">09.45 AM -10.00 AM</p>
                <div className="flex flex-row justify-center items-center">
                  <p className="">Undo</p>
                </div>
              </div>
              <Line />
              <div className="grid p-3 font-regular tracking-tight text-md   grid-cols-9">
                <div className="col-span-2 flex flex-row items-center">
                  <img
                    src="https://randomuser.me/api/portraits/women/54.jpg"
                    alt=""
                    className="w-8 h-8 rounded-full"
                  />
                  <p className="ml-2">Roberta Lucas</p>
                </div>
                <p className="">Female</p>
                <p className="">20</p>
                <p className="">09</p>
                <p className="col-span-2">09.45 AM -10.00 AM</p>
                <div className="flex flex-row justify-center items-center">
                  <LuXCircle className="text-2xl text-red-500" />
                  <LuCheck className="text-2xl text-green-500 ml-5" />
                  <LuMoveDiagonal className="text-2xl text-gray-500 ml-5" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className=""></div>
        <div className="w-full grid grid-cols-3 gap-4 p-2 ">
          {/* <div className="w-full bg-white p-2 border-1  rounded-lg flex flex-col">
            <div className="flex justify-between flex-row items-center">
              <p className="text-xl text-black-color font-medium tracking-tight">
                Jhone Doe
              </p>{" "}
              <div className="flex text-md text-gray-600 flex-row items-center justify-center">
                <FaMale /> <p className="ml-2">Male</p>
              </div>
            </div>
            <div className="flex justify-between flex-row items-center">
              <p className="font-medium tracking-tight text-md text-black-color">
                Age : 27
              </p>
              <div className="flex text-gray-600 flex-row items-center justify-center">
                <FaDroplet /> <p className="ml-2">AB+</p>
              </div>
            </div>
            <div className="flex text-gray-600 font-medium text-lg mt-1 flex-row items-center">
              <p className="">Slot: 24</p>
              <div className="flex ml-4  flex-row items-center justify-center">
                <IoMdTime /> <p className="ml-1">9.30 AM - 9.45 AM</p>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
}
