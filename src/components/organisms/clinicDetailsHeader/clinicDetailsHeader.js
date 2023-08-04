import Button from "../../atom/button/button";

export default function ClinicDetailsHeader({ heading }) {
  return (
    <div className="p-4 flex flex-row justify-between items-center">
      <p className="tracking-tight text-2xl  text-black-color   font-medium">
        {heading}
      </p>
      <div className="flex flex-row justify-center items-center">
        <p className="font-medium text-md text-black-color mr-3 tracking-tight">
          Cancel
        </p>
        <Button text={"Save & Close"} />
      </div>
    </div>
  );
}
