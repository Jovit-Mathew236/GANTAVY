import { useEffect, useState } from "react";
import Select, { StylesConfig } from "react-select";
import { IoAddCircleSharp, IoRemoveCircle } from "react-icons/io5";
import Line from "../../atom/line/line";
export default function TimePicker() {
  const weekdays = ["SUN", "MON", "TUE", "WED", "THU"];
  const duaration = 10;
  const [data, setData] = useState({
    0: [],
    1: [],
    2: [],
    3: [],
    4: [],
  });

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
  let objectList = [];
  const timeList = getTimeList();

  function getTimeList() {
    const timeList = [];
    const startTime = new Date("2000-01-01T00:00:00"); // Set the initial time to 12:00 AM

    // Loop until the time reaches 12:00 AM
    let i = 0;

    while (
      i == 0 ||
      startTime.getHours() !== 0 ||
      startTime.getMinutes() !== 0
    ) {
      // Add the time to the list

      const formattedTime = startTime.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
      if (i != 0) {
        timeList.push(formattedTime.toString());
        objectList.push({
          label: formattedTime.toString(),
          value: formattedTime.toString(),
        });
      }

      // Increment time by 10 minutes
      startTime.setMinutes(startTime.getMinutes() - 10); // Use -10 to go back in time
      i = 1;
    }

    // Reverse the timeList to get the correct order
    timeList.push("12:00 AM");
    objectList.push({
      label: "12:00 AM",
      value: "12:00 AM",
    });
    timeList.reverse();
    objectList.reverse();
    return timeList;
  }

  const handleSelectChangeEndDate = (
    selectedOption,
    index,
    innerArrayindex
  ) => {
    let timeData = data;
    timeData[index][innerArrayindex][1] = selectedOption.value;
    setData(timeData);
    const selectionIndex = timeList.indexOf(selectedOption.value);
    const startIndex = timeList.indexOf(timeData[index][innerArrayindex][0]);

    let errors = error;

    if (selectionIndex <= startIndex) {
      errors[index][innerArrayindex] = "Full error";
      setError([...errors]);
    } else {
      errors[index][innerArrayindex] = "";
      setError([...errors]);
    }
    checkConflict();
  };
  const handleSelectChangeStartDate = (
    selectedOption,
    index,
    innerArrayindex
  ) => {
    let timeData = data;
    timeData[index][innerArrayindex][0] = selectedOption.value;
    setData({ ...timeData });
    const selectionIndex = timeList.indexOf(selectedOption.value);
    const endIndex = timeList.indexOf(timeData[index][innerArrayindex][1]);
    let errors = error;
    if (selectionIndex >= endIndex) {
      errors[index][innerArrayindex] = "Full error";
      setError([...errors]);
    } else {
      errors[index][innerArrayindex] = "";
      setError([...errors]);
    }
    checkConflict();
  };
  const createNewInterval = (index) => {
    let dataarray = data;
    const len = dataarray[index].length;
    if (len == 0) {
      dataarray[index].push([timeList[10], timeList[18]]);
      setData({ ...dataarray });
      addtoErrorList("");
      return;
    }
    const totaltimelen = timeList.length;
    const lastItem = dataarray[index][len - 1][1];
    const endItemIndex = timeList.indexOf(lastItem);
    //find the end time of previous one
    //find its index
    //find element at index+1 and index+2
    //if index+2 is not available
    //set both time to item at index+1
    //if index+1 is also not available prevent insertion

    function addtoErrorList(errortext) {
      let errors = error;
      errors[index].push(errortext);
      setError([...errors]);
    }
    if (endItemIndex + 1 >= totaltimelen) {
      //console.log("Not able to add");
    } else if (endItemIndex + 2 >= totaltimelen) {
      dataarray[index].push([
        timeList[endItemIndex + 1],
        timeList[endItemIndex + 1],
      ]);
      addtoErrorList("Full Error");
      setData({ ...dataarray });
    } else {
      dataarray[index].push([
        timeList[endItemIndex + 1],
        timeList[endItemIndex + 2],
      ]);

      setData({ ...dataarray });
      console.log(data);
      addtoErrorList("");
    }

    //first add a new item to error array at index
    checkConflict();
  };

  const deleteInterval = (index, itemindex, deleteall = false) => {
    let dataarray = data;
    //find interval array
    let intervalArray = dataarray[index];
    console.log(intervalArray, "intervalArray");
    let intervalArraySorted = [];
    if (deleteall) {
      intervalArray = [];
    } else {
      intervalArraySorted = intervalArray.filter((item, i) => {
        return i != itemindex;
      });
    }

    //console.log(index, itemindex, intervalArray);
    dataarray[index] = [...intervalArraySorted];
    console.log(dataarray, "Data array");
    setData({
      0: [],
      1: [],
      2: [],
      3: [],
      4: [],
    });
    setData({ ...dataarray });
    let errors = error;
    let errorIndexArray = error[index];
    if (deleteall) {
      errorIndexArray = [];
    } else {
      errorIndexArray = errorIndexArray.filter((item, index) => {
        return index != itemindex;
      });
    }

    errors[index] = errorIndexArray;
    setError([...errors]);
    // remove interval array at item index
    //set data
    //remove item at itemindex at position index
    checkConflict();
  };
  const handleCheckboxChange = (checked, index) => {
    if (!checked) {
      deleteInterval(index, 0, true);
    } else {
      createNewInterval(index);
    }
  };
  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      padding: "0.1rem",
      border: state.isFocused
        ? "1.7px solid #236bfe"
        : "1.7px solid rgba(209,213,219,1)",
      boxShadow: "none",
      color: "#070707",
      borderRadius: "0.375rem",
      "&:hover": {
        border: "1.7px solid rgba(209,213,219,1)",
      },
    }),
    multiValue: (provided, state) => ({
      ...provided,
      color: "#070707",
      borderRadius: 1000,
      padding: ".05rem .8rem",
      backgroundColor: "rgb(219,234,254)",
    }),
    multiValueLabel: (provided, state) => ({
      ...provided,
      color: "#236bfe",
      fontWeight: 500,
      borderRadius: 1000,
    }),
    multiValueRemove: (provided, state) => ({
      ...provided,
      color: "#236bfe",
      borderRadius: 1000,
      "&:hover": {
        backgroundColor: "rgb(219,234,254)",
      },
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected
        ? "#007bff"
        : state.isFocused
        ? "#f0f0f0"
        : "white",
      color: state.isSelected ? "white" : "#070707",
      "&:hover": {
        backgroundColor: state.isSelected ? "#007bff" : "#f0f0f0",
        color: state.isSelected ? "white" : "black",
      },
    }),
    menu: (provided) => ({
      ...provided,
      border: "1.7px solid rgba(209,213,219,1)",
      color: "#070707",
      boxShadow: "none",
      borderRadius: "0.375rem",
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "#070707",
    }),
  };
  const checkConflict = () => {
    function check(array, index) {
      //sort items based on the value at index 0
      let intervals = [];
      array.map((item) => {
        //console.log(item);
        intervals.push([timeList.indexOf(item[0]), timeList.indexOf(item[1])]);
      });
      intervals.sort((a, b) => a[0] - b[0]);
      ////console.log(intervals, "Before operation");

      let sortedArrayitems = [];
      intervals.map((item) => {
        sortedArrayitems.push(item[0]);
        sortedArrayitems.push(item[1]);
      });
      //make a list
      const unsorted = [...sortedArrayitems];
      // //console.log(unsorted, "After operation");
      sortedArrayitems.sort((a, b) => a - b);
      // sort the list if sorted list is not same as the baove list means conflict
      ////console.log("Non sorted Array", unsorted);
      ////console.log("Sorted Array", sortedArrayitems);
      const result =
        JSON.stringify(unsorted) === JSON.stringify(sortedArrayitems);
      ////console.log(result);

      if (!result) {
        let errors = conflicts;
        conflicts[index] = "Conflicting Shedules";
        setConflicts([...errors]);
      } else {
        let errors = conflicts;
        conflicts[index] = "";
        setConflicts([...errors]);
      }
    }
    Object.keys(data).map((day, index) => {
      check(data[day], index);
    });
  };
  useEffect(() => {
    console.log(data, "value of data");
  }, [data]);
  return (
    <div className="flex flex-col ">
      {Object.entries(data).map((dayitem, i) => {
        return (
          <div className="">
            <div className="flex flex-row justify-start">
              <div className="w-8 flex flex-row items-center justify-center">
                <input
                  id="bordered-checkbox-2"
                  type="checkbox"
                  value=""
                  onChange={(e) => handleCheckboxChange(e.target.checked, i)}
                  defaultChecked={data[i].length != 0}
                  name="bordered-checkbox"
                  class="w-4 h-4 text-blue-100 bg-gray-100  rounded "
                />
              </div>
              <div className="flex w-24 flex-row items-center justify-center">
                <p className="">{weekdays[i]}</p>
              </div>
              <div className="flex flex-col justify-center items-center">
                {data[i].length == 0 ? "Not Available" : ""}
                {data[i].map((item, innerIndex) => {
                  return (
                    <>
                      <div className="flex my-2 flex-row justify-start items-start">
                        <div className="w-36">
                          <Select
                            defaultValue={{
                              label: item[0].toString(),
                              value: item[0],
                            }}
                            selectedOption={{
                              label: item[0].toString(),
                              value: item[0],
                            }}
                            onChange={(e) => {
                              handleSelectChangeStartDate(e, i, innerIndex);
                            }}
                            classNamePrefix="custom-select"
                            closeMenuOnSelect={false}
                            styles={customStyles}
                            options={objectList}
                          />
                        </div>
                        <div className="">
                          <p className="w-5 text-center">-</p>
                        </div>
                        <div className="w-36">
                          <Select
                            defaultValue={{
                              label: item[1].toString(),
                              value: item[1],
                            }}
                            selectedOption={{
                              label: item[1].toString(),
                              value: item[1],
                            }}
                            onChange={(e) => {
                              handleSelectChangeEndDate(e, i, innerIndex);
                            }}
                            classNamePrefix="custom-select"
                            closeMenuOnSelect={false}
                            styles={customStyles}
                            options={objectList}
                          />
                        </div>
                        <div className="">
                          <IoRemoveCircle
                            className="text-black-color text-2xl mx-4"
                            onClick={() => deleteInterval(i, innerIndex)}
                          />
                        </div>
                      </div>
                      {error[i][innerIndex]}
                    </>
                  );
                })}{" "}
              </div>

              <div className="">
                <IoAddCircleSharp
                  className="text-primary-color text-2xl my-2 ml-4"
                  onClick={() => createNewInterval(i)}
                />
              </div>
            </div>
            {conflicts[i]}
            <div className="my-2">
              <Line />
            </div>
          </div>
        );
      })}
    </div>
  );
}
