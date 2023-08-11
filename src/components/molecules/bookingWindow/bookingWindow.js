import Button from "@/src/components/atom/button/button";
import {
  IoArrowBackCircleOutline,
  IoArrowForwardCircle,
} from "react-icons/io5";
import InputHolder from "@/src/components/molecules/inputHolder/inputHolder";
import InputField from "@/src/components/atom/inputField/inputField";
export default function BookingWindow() {
  return (
    <>
      <div className="">
        <IoArrowBackCircleOutline className="text-3xl text-blue-500" />
      </div>
      <p className="text-2xl font-bold mt-1">Book Your Path to Wellness</p>
      <div className="pt-3 grid grid-cols-2 gap-2">
        <InputHolder label="Your Name">
          <InputField placeholder={"Anjeline Jolly"} />
        </InputHolder>
        <InputHolder label="Age">
          <InputField type={"number"} placeholder={"Age"} />
        </InputHolder>{" "}
        <InputHolder label="Gender">
          <InputField placeholder={"Female"} />
        </InputHolder>
        <InputHolder label="Your Contact Number">
          <InputField placeholder={"0909909090"} />
        </InputHolder>
        <InputHolder label="Your Blood Group">
          <InputField placeholder={"AB+"} />
        </InputHolder>
        <div className="col-span-2">
          <InputHolder label="Any specific details to share">
            <InputField placeholder={"I'm having....."} />
          </InputHolder>
        </div>
      </div>
      <Button Icon={IoArrowForwardCircle} text={"Book Your Slot"} />
    </>
  );
}
