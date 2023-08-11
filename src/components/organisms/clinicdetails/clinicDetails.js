import Bredcrumd from "../../atom/breadcrumbs/breadcrumbs";
import Profile from "../../atom/profile/profile";
import { IoLocationOutline } from "react-icons/io5";
export default function ClincDetails() {
  return (
    <div className="p-10 col-span-4">
      <p className="text-2xl font-bold">Angel's Clinic</p>
      <div className="flex flex-row text-gray-600 items-center">
        <IoLocationOutline className=" " />{" "}
        <p className="text-md ml-2">Near Technopark,Trivandrum</p>
      </div>

      <div className="flex mt-2 flex-row">
        <Bredcrumd text={"ENT"} />{" "}
        <Bredcrumd style={"ml-2"} text={"Gen. Medicine"} />
      </div>
      <Profile />
      <p className="tracking-tight text-gray-600 mt-4 leading-snug">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Illum porro
        illo id voluptatibus quidem eveniet blanditiis expedita earum minima
        unde repudiandae laborum, eos animi qui optio? Dolorum possimus pariatur
        sint.
      </p>
    </div>
  );
}
