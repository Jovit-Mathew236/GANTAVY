import { IoCloseCircleOutline } from "react-icons/io5";
import Button from "../../atom/button/button";
import InputField from "../../atom/inputField/inputField";
import Line from "../../atom/line/line";
import PopupHeader from "../../molecules/popupHeader/popupHeader";

export default function ConfirmDialoguePopop() {
  return (
    <>
      <IoCloseCircleOutline className="text-xl text-gray-600 absolute right-5 top-5" />
      <PopupHeader
        heading="Cancel all bookings"
        content="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eius
          voluptate ipsum minus eaque maiores.?"
      />
      <Line styles="mt-6" />

      <div className=" p-3 flex flex-row justify-end">
        <p className="font-medium text-md text-black-color mr-3 tracking-tight">
          Close
        </p>
        <Button styles={"bg-red-500"} text={"Cancel All Bookings"} />
      </div>
    </>
  );
}
