export default function DetailsPageContainer({ children }) {
  return (
    <div className="bg-shade-color p-3 pl-10 pt-4 flex justify-center  w-full h-full">
      <div className="w-8/12 bg-white  m-8">{children}</div>
    </div>
  );
}
