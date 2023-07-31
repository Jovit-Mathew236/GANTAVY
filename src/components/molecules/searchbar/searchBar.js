import { IoSearch } from "react-icons/io5";
export default function Searchbar() {
  return (
    <div className="searchbar mr-6 px-4 rounded-full flex flex-row justify-center items-center bg-shade-color">
      <IoSearch className="text-xl text-gray-600" />
      <input
        type="text"
        placeholder="Search here"
        className="text-md outline-none text-gray-600 w-60 h-12 ml-2 bg-transparent"
      />
    </div>
  );
}
