import { getNext10Days } from "@/src/utils/getDays";
import BookingHeader from "../../molecules/bookingHeader/bookingHeader";
import DayList from "../../molecules/dayList/dayList";
import GridList from "../../molecules/gridList/gridList";
import SlotList from "../../molecules/SlotList/slotList";
import ClincDetails from "../../organisms/clinicdetails/clinicDetails";

export default function BookingPage() {
  const dates = getNext10Days(6);
  const slotList = [
    ["09:00 AM", "09:15 AM"],
    ["09:15 AM", "09:30 AM"],
    ["09:30 AM", "09:35 AM"],
    ["09:35 AM", "09:45 AM"],
    ["09:45 AM", "10:15 AM"],
    ["10:00 AM", "10:15 AM"],
    ["10:15 AM", "10:25 AM"],
    ["09:30 AM", "09:35 AM"],
    ["09:35 AM", "09:45 AM"],
    ["09:45 AM", "10:15 AM"],
    ["10:00 AM", "10:15 AM"],
    ["10:15 AM", "10:25 AM"],
  ];
  return (
    <div className="bg-white min-h-screen  relative  p-24 py-12">
      <div className="card border-sm  rounded-2xl   w-full h-full grid grid-cols-12">
        <div className="col-span-8 relative  p-10 h-full border-e-sm">
          {/* <BookingWindow /> */}
          <DayList dates={dates} />

          <div className="p-2 mt-2">
            <BookingHeader />
            <GridList slotList={slotList} />
            <SlotList slotList={slotList} />
          </div>
        </div>
        <ClincDetails />
      </div>
    </div>
  );
}
