import { IoAddCircleOutline } from "react-icons/io5";
export default function CreateButton({ text }) {
  return (
    <div className="flex absolute right-10 bottom-10 flex-row justify-center items-center py-2 rounded-full text-white w-40 bg-primary-color">
      <IoAddCircleOutline className="text-2xl" />
      <p className="font-medium ml-1">{text}</p>
    </div>
  );
}
