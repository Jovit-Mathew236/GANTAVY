import { IoAddCircleSharp } from "react-icons/io5";

export default function AddBtn({ createNewInterval, i }) {
  return (
    <div className="">
      <IoAddCircleSharp
        className="text-primary-color text-2xl my-2 ml-4"
        onClick={() => createNewInterval(i)}
      />
    </div>
  );
}
