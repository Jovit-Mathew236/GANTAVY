import CheckBox from "../../atom/checkbox/checkbox";
import Line from "../../atom/line/line";
import IntervalComponent from "../../molecules/intervalComponent/intervalComponent";
import {
  createNewIntervalfn,
  deleteIntervalfn,
  handleSelectChangeEndDatefn,
  handleSelectChangeStartDatefn,
} from "@/src/utils/timingFunctions";
import AddBtn from "../../atom/addBtn/addBtn";
export default function DayInterval({
  data,
  i,
  dayitem,
  conflicts,
  setConflicts,
  setData,
  timeList,
  objectList,
  error,
  setError,
}) {
  const weekdays = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const handleSelectChangeEndDate = (
    selectedOption,
    index,
    innerArrayindex
  ) => {
    handleSelectChangeEndDatefn(
      selectedOption,
      index,
      innerArrayindex,
      data,
      setData,
      timeList,
      error,
      setError,
      conflicts,
      setConflicts
    );
  };

  const handleSelectChangeStartDate = (
    selectedOption,
    index,
    innerArrayindex
  ) => {
    handleSelectChangeStartDatefn(
      selectedOption,
      index,
      innerArrayindex,
      data,
      setData,
      timeList,
      error,
      setError,
      conflicts,
      setConflicts
    );
  };
  const createNewInterval = (index) => {
    createNewIntervalfn(
      index,
      data,
      setData,
      timeList,
      error,
      setError,
      conflicts,
      setConflicts
    );
  };

  const deleteInterval = (index, itemindex, deleteall = false) => {
    deleteIntervalfn(
      index,
      itemindex,
      deleteall,
      data,
      setData,
      error,
      setError,
      conflicts,
      setConflicts,
      timeList
    );
  };
  const handleCheckboxChange = (checked, index) => {
    if (!checked) {
      deleteInterval(index, 0, true);
    } else {
      createNewInterval(index);
    }
  };
  return (
    <div className="">
      <div className="flex flex-row justify-start">
        <div className="w-8 flex flex-row items-center justify-center">
          <CheckBox
            checked={data[i].length != 0}
            onChange={(e) => handleCheckboxChange(e.target.checked, i)}
            defaultChecked={data[i].length != 0}
          />
        </div>
        <div className="flex w-24 flex-row items-center justify-center">
          <p className="">{weekdays[i]}</p>
        </div>
        <div className="flex flex-col justify-center items-center">
          {dayitem.length == 0 ? "Not Available" : ""}
          {dayitem.map((item, innerIndex) => {
            return (
              <>
                <IntervalComponent
                  key={`intervalcom${i}`}
                  handleSelectChangeStartDate={handleSelectChangeStartDate}
                  deleteInterval={deleteInterval}
                  handleSelectChangeEndDate={handleSelectChangeEndDate}
                  error={error}
                  i={i}
                  objectList={objectList}
                  item={item}
                  innerIndex={innerIndex}
                />
              </>
            );
          })}{" "}
        </div>

        <AddBtn createNewInterval={createNewInterval} i={i} />
      </div>
      {conflicts[i]}
      <div className="my-2">
        <Line />
      </div>
    </div>
  );
}
