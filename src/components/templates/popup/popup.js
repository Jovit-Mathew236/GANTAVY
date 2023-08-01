import Button from "../../atom/button/button";

import { IoCloseCircleOutline } from "react-icons/io5";
import Line from "../../atom/line/line";
export default function Popup() {
  return (
    <div className="w-screen  h-screen fixed flex items-center justify-center bg-gray-800 bg-opacity-30 top-0 left-0 z-40">
      <div className="rounded-md relative  w-5/12  bg-white">
        <div className="p-6 px-8">
          <IoCloseCircleOutline className="text-xl text-gray-600 absolute right-5 top-5" />
          <div className="">
            <p className="tracking-tight text-black-color  text-2xl font-medium">
              Create A Clinic
            </p>
            <p className="tracking-tight text-gray-400 mb-2  leading-tight">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eius
              voluptate ipsum minus eaque maiores.
            </p>
          </div>
          <div className="w-4/5 mb-2 mt-4">
            <p className="tracking-tight text-black-color text-lg  font-medium">
              Clinic Name
            </p>
            <input
              placeholder="Enter Clinic name"
              type="text"
              className="txt text-md focus:border-primary-color border-spacing-2 text-black-color px-3 border-1 outline-none border-gray-300  w-full p-2 rounded-md "
            />
            <p className="tracking-tight mt-2 text-black-color text-lg  font-medium">
              Description
            </p>
            <input
              placeholder="Enter Short Text About Clinic"
              type="text"
              className="txt text-md focus:border-primary-color border-spacing-2 text-black-color px-3 border-1 outline-none border-gray-300  w-full p-2 rounded-md "
            />
          </div>
        </div>
        <Line />
        <div className=" p-3 flex flex-row justify-end">
          <p className="font-medium text-md text-black-color mr-3 tracking-tight">
            Cancel
          </p>{" "}
          <Button text={"Create Clinic"} />
        </div>
      </div>
    </div>
  );
}
