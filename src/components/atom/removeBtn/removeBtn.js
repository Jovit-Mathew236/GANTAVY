import { IoRemoveCircle } from "react-icons/io5";

export default function RemoveButton({ deleteInterval, i, innerIndex }) {
  return (
    <div className="">
      <IoRemoveCircle
        className="text-black-color text-2xl mx-4"
        onClick={() => deleteInterval(i, innerIndex)}
      />
    </div>
  );
}
