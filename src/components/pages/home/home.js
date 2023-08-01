import CreateButton from "../../atom/createButton/createButton";
import HomeCard from "../../molecules/homeCard/homeCard";
import Popup from "../../templates/popup/popup";
export default function HomePage() {
  const data = [
    {
      heading: "Amees Clinic",
      location: "Near Kochi",
      totalbookings: 2,
      id: 123,
    },
    {
      heading: "Angel's Child Care",
      location: "Near Technopark",
      totalbookings: 22,
      id: 133,
    },
  ];
  return (
    <div className="bg-shade-color p-3 pl-10 pt-4   w-full h-full">
      <h3 className="text-2xl mb-2 mt-2 font-medium  tracking-tight text-gray-600">
        My Clinics
      </h3>
      <Popup />
      <CreateButton text={"Create Clinic"} />
      <div className="grid grid-cols-3 gap-x-4">
        {data.map((item) => {
          return <HomeCard item={item} />;
        })}
      </div>
    </div>
  );
}
