export function getNext10Days(days = 10) {
  // Get the current date
  const currentDate = new Date();
  // Create an array to hold the results
  const result = [];
  // Function to add leading zero to a number if it's less than 10
  const addLeadingZero = (num) => (num < 10 ? "0" + num : num);
  // Loop through the next 15 days
  for (let i = 0; i < days; i++) {
    // Calculate the date for the current iteration
    const nextDate = new Date(currentDate);
    nextDate.setDate(currentDate.getDate() + i);
    // Get the day of the week in "SUN", "MON", etc. format
    const dayOfWeek = nextDate
      .toLocaleString("en-US", { weekday: "short" })
      .toUpperCase();
    // Get the day of the month in number with leading zero if necessary
    const dayOfMonth = addLeadingZero(nextDate.getDate());
    // Create an object with the day of the week and day of the month
    const dayInfo = { day_of_week: dayOfWeek, day_of_month: dayOfMonth };
    // Push the object to the result array
    result.push(dayInfo);
  }

  return result;
}
