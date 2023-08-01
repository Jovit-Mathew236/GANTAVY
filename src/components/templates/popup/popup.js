export default function Popup({ children }) {
  return (
    <div className="w-screen  h-screen fixed flex items-center justify-center bg-gray-800 bg-opacity-30 top-0 left-0 z-40">
      <div className="rounded-md relative  w-5/12  bg-white">{children}</div>
    </div>
  );
}
