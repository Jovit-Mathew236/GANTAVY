import { IoCloseCircleOutline } from "react-icons/io5";
import Button from "../../atom/button/button";
import InputField from "../../atom/inputField/inputField";
import Line from "../../atom/line/line";
import PopupHeader from "../../molecules/popupHeader/popupHeader";

export default function CreateClinicPopup() {
  return (
    <>
      <IoCloseCircleOutline className="text-xl text-gray-600 absolute right-5 top-5" />
      <PopupHeader
        heading="Create A Clinic"
        content="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eius
          voluptate ipsum minus eaque maiores."
      />
      <Line />
      <div className="p-6 pt-0 px-8">
        <div className="w-4/5 mb-2 mt-4">
          <p className="tracking-tight text-black-color text-lg  font-medium">
            Clinic Name
          </p>
          <InputField placeholder={"Enter Clinic name"} />
          <p className="tracking-tight mt-2 text-black-color text-lg  font-medium">
            Description
          </p>
          <InputField placeholder={"Enter Short Text About Clinic"} />
        </div>
      </div>
      <Line />
      <div className=" p-3 flex flex-row justify-end">
        <p className="font-medium text-md text-black-color mr-3 tracking-tight">
          Cancel
        </p>
        <Button text={"Create Clinic"} />
      </div>
    </>
  );
}
