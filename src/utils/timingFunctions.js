const checkConflict = (conflicts, setConflicts, data, timeList) => {
  function check(array, index) {
    //sort items based on the value at index 0
    let intervals = [];
    array.map((item) => {
      intervals.push([timeList.indexOf(item[0]), timeList.indexOf(item[1])]);
    });
    intervals.sort((a, b) => a[0] - b[0]);

    let sortedArrayitems = [];
    intervals.map((item) => {
      sortedArrayitems.push(item[0]);
      sortedArrayitems.push(item[1]);
    });
    //make a list
    const unsorted = [...sortedArrayitems];

    sortedArrayitems.sort((a, b) => a - b);
    // sort the list if sorted list is not same as the baove list means conflict

    const result =
      JSON.stringify(unsorted) === JSON.stringify(sortedArrayitems);

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
  data.forEach((day, index) => {
    check(data[index], index, timeList);
  });
};
export const handleSelectChangeEndDatefn = (
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
) => {
  let timeData = data;
  timeData[index][innerArrayindex][1] = selectedOption.value;
  setData([...timeData]);
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
  checkConflict(conflicts, setConflicts, data, timeList);
};

export const handleSelectChangeStartDatefn = (
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
) => {
  let timeData = data;
  timeData[index][innerArrayindex][0] = selectedOption.value;
  setData([...timeData]);
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
  checkConflict(conflicts, setConflicts, data, timeList);
};

export const createNewIntervalfn = (
  index,
  data,
  setData,
  timeList,
  error,
  setError,
  conflicts,
  setConflicts
) => {
  let dataarray = data;
  const len = dataarray[index].length;
  if (len == 0) {
    dataarray[index].push([timeList[10], timeList[18]]);
    setData([...dataarray]);
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
  } else if (endItemIndex + 2 >= totaltimelen) {
    dataarray[index].push([
      timeList[endItemIndex + 1],
      timeList[endItemIndex + 1],
    ]);
    addtoErrorList("Full Error");
    setData([...dataarray]);
  } else {
    dataarray[index].push([
      timeList[endItemIndex + 1],
      timeList[endItemIndex + 2],
    ]);

    setData([...dataarray]);

    addtoErrorList("");
  }

  //first add a new item to error array at index
  checkConflict(conflicts, setConflicts, data, timeList);
};

export const deleteIntervalfn = (
  index,
  itemindex,
  deleteall = false,
  data,
  setData,
  error,
  setError,
  conflicts,
  setConflicts,
  timeList
) => {
  let dataarray = data;
  //find interval array
  let intervalArray = dataarray[index];
  let intervalArraySorted = [];
  if (deleteall) {
    intervalArray = [];
  } else {
    intervalArraySorted = intervalArray.filter((item, i) => {
      return i != itemindex;
    });
  }

  dataarray[index] = [...intervalArraySorted];
  setData([...dataarray]);

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
  checkConflict(conflicts, setConflicts, data, timeList);
};
