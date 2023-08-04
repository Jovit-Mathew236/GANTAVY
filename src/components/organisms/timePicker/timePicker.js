import { useEffect, useState } from "react";
import { getObjectList, getTimeList } from "@/src/utils/getTiming";
import DayInterval from "../dayInterval/dayInterval";
export default function TimePicker() {
  const duaration = 10;
  const [data, setData] = useState([[], [], [], [], [], [], []]);

  const [error, setError] = useState([
    [""],
    [""],
    [""],
    [""],
    [""],
    [""],
    [""],
  ]);
  const [conflicts, setConflicts] = useState(["", "", "", "", "", "", ""]);

  const timeList = getTimeList();
  const objectList = getObjectList(timeList);

  return (
    <div className="flex flex-col ">
      {data.map((dayitem, index) => {
        return (
          <DayInterval
            key={`dds${index}`}
            setError={setError}
            error={error}
            conflicts={conflicts}
            setConflicts={setConflicts}
            data={data}
            i={index}
            objectList={objectList}
            timeList={timeList}
            setData={setData}
            dayitem={dayitem}
          />
        );
      })}
    </div>
  );
}
