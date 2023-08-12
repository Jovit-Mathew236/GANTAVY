import BookedItem from "../../molecules/bookedItem/bookeditem";

export default function MyBookings() {
  return (
    <div className="p-5 col-span-8">
      <div className="p-10 grid grid-cols-2 gap-4">
        <BookedItem /> <BookedItem /> <BookedItem />
      </div>
    </div>
  );
}
