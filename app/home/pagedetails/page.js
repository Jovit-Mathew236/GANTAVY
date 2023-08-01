import Button from "@/src/components/atom/button/button";
import InputField from "@/src/components/atom/inputField/inputField";
import Line from "@/src/components/atom/line/line";
import InputHolder from "@/src/components/molecules/inputHolder/inputHolder";
import HomePage from "@/src/components/pages/home/home";
import {
  IoReaderSharp,
  IoReaderOutline,
  IoTimeOutline,
  IoTime,
  IoSettingsOutline,
  IoSettings,
} from "react-icons/io5";
export default function Home() {
  return (
    <>
      <Line />
      <div className="sidenav flex-row p-3 py-0  pl-8    flex ">
        <div className="flex py-3 relative flex-row  px-5 items-center justify-center">
          <IoReaderOutline className="text-primary-color text-xl mr-1" />
          <p className="tracking-tight flex  font-medium text-primary-color">
            Clinic Details
          </p>
          <div className="line2 absolute opacity-50 bg-primary-color bottom-0 h-1 w-full"></div>
        </div>
        <div className="flex py-3 flex-row  px-5 items-center justify-center">
          <IoTimeOutline className="text-gray-600 text-xl mr-1" />
          <p className="tracking-tight flex  font-medium text-gray-600">
            Clinic Timings
          </p>
        </div>
        <div className="flex py-3 flex-row  px-5 items-center justify-center">
          <IoSettingsOutline className="text-gray-600 text-xl mr-1" />
          <p className="tracking-tight flex  font-medium text-gray-600">
            Clinic Settings
          </p>
        </div>
      </div>
      <div className="bg-shade-color p-3 pl-10 pt-4 flex justify-center  w-full h-full">
        <div className="w-8/12 bg-white  m-8">
          <div className="p-4 flex flex-row justify-between items-center">
            <p className="tracking-tight text-2xl  text-black-color   font-medium">
              Add Clinic Details
            </p>
            <div className="flex flex-row justify-center items-center">
              <p className="font-medium text-md text-black-color mr-3 tracking-tight">
                Cancel
              </p>
              <Button text={"Save & Close"} />
            </div>
          </div>
          <Line />
          <div className="w-3/5 p-6 px-10">
            <InputHolder label="Clinic Name">
              <InputField placeholder={"Enter Clinic Name"} />
            </InputHolder>
            <InputHolder label="Location">
              <InputField placeholder={"Near Technopark Trivandrum"} />
            </InputHolder>
            <InputHolder label="Location Link">
              <InputField
                placeholder={"Paste your location link from Google Maps"}
              />
            </InputHolder>
            <InputHolder label="Description">
              <InputField placeholder={"Describe about your clinic"} />
            </InputHolder>
            <InputHolder label="Clinic Name">
              <InputField placeholder={"Near Technopark Trivandrum"} />
            </InputHolder>
          </div>
        </div>
      </div>
    </>
  );
}
