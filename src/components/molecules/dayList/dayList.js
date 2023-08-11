import CalenderPicker from "../../atom/calenderPicker/calenderPicker";
import DayItem from "../../atom/dayItem/dayitem";

export default function DayList({ dates }) {
  return (
    <div className="flex flex-row">
      {dates.map((item, i) => {
        return <DayItem key={`dayitem${i}`} item={item} i={i} />;
      })}
      <CalenderPicker />
    </div>
  );
}
