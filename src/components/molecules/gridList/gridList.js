import SlotGridItem from "../../atom/slotGridItem/slotGridItem";

export default function GridList({ slotList }) {
  return (
    <div className="grid mt-4  grid-cols-3 gap-5">
      {slotList.map((item, i) => {
        return <SlotGridItem key={`id${i}`} start={item[0]} end={item[1]} />;
      })}
    </div>
  );
}
