import { IoAppsSharp, IoMenuSharp } from "react-icons/io5";
import IconBtn from "../../atom/iconBtn/iconBtn";

export default function BookingHeader() {
  return (
    <>
      <p className="text-xl font-semibold tracking-tight text-black-color">
        10 August 2022
      </p>
      <div className="flex flex-row justify-between items-center">
        <p className="mt-3 text-xl tracking-tight">
          Pick a time slot for booking
        </p>
        <div className="flex flex-row">
          <IconBtn Icon={IoAppsSharp} active={true} />
          <IconBtn Icon={IoMenuSharp} active={false} />
        </div>
      </div>
    </>
  );
}
