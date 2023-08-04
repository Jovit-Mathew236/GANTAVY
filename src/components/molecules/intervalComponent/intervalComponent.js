import SelectInput from "../select/select";
import { IoAddCircleSharp, IoRemoveCircle } from "react-icons/io5";
import RemoveButton from "../../atom/removeBtn/removeBtn";
export default function IntervalComponent({
  item,
  i,
  innerIndex,
  objectList,
  error,
  handleSelectChangeEndDate,
  handleSelectChangeStartDate,
  deleteInterval,
}) {
  return (
    <>
      <div className="flex my-2 flex-row justify-start items-start">
        <div className="w-36">
          <SelectInput
            value={{
              label: item[0],
              value: item[0],
            }}
            onChange={(e) => {
              handleSelectChangeStartDate(e, i, innerIndex);
            }}
            options={objectList}
          />
        </div>
        <div className="">
          <p className="w-5 text-center">-</p>
        </div>
        <div className="w-36">
          <SelectInput
            value={{
              label: item[1],
              value: item[1],
            }}
            isMulti={false}
            options={objectList}
            onChange={(e) => {
              handleSelectChangeEndDate(e, i, innerIndex);
            }}
          />
        </div>
        <RemoveButton
          deleteInterval={deleteInterval}
          i={i}
          innerIndex={innerIndex}
        />
      </div>
      {error[i][innerIndex]}
    </>
  );
}
