export function getTimeList() {
  const timeList = [];
  const startTime = new Date("2000-01-01T00:00:00"); // Set the initial time to 12:00 AM

  // Loop until the time reaches 12:00 AM
  let i = 0;

  while (i == 0 || startTime.getHours() !== 0 || startTime.getMinutes() !== 0) {
    // Add the time to the list

    const formattedTime = startTime.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    if (i != 0) {
      timeList.push(formattedTime.toString());
    }

    // Increment time by 10 minutes
    startTime.setMinutes(startTime.getMinutes() - 10); // Use -10 to go back in time
    i = 1;
  }

  // Reverse the timeList to get the correct order
  timeList.push("12:00 AM");
  timeList.reverse();

  return timeList;
}

export function getObjectList(array) {
  let objectList = [];
  array.forEach((element) => {
    objectList.push({
      label: element.toString(),
      value: element.toString(),
    });
  });
  return objectList;
}
