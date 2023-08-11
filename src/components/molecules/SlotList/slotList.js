import SlotListitem from "../../atom/slotListItem/slotListItem";

export default function SlotList({ slotList }) {
  return (
    <div className="grid mt-4  grid-cols-1 gap-2">
      {slotList.map((item, i) => {
        return (
          <SlotListitem key={`gridItem${i}`} start={item[0]} end={item[1]} />
        );
      })}
    </div>
  );
}
