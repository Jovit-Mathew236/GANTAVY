export default function InputField({ placeholder, type }) {
  return (
    <input
      placeholder={placeholder}
      type={type ? type : "text"}
      className="txt text-md focus:border-primary-color border-spacing-2 border-sm text-black-color px-3  outline-none border-gray-300  w-full p-2 rounded-md "
    />
  );
}
