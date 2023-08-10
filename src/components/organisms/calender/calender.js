"use client";

import React, { useState } from "react";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
export default function Calender() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);

  const handlePrevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1)
    );
  };

  const handleNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1)
    );
  };

  const daysInMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  ).getDate();
  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  ).getDay();

  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const handleDayClick = (day) => {
    console.log(day);
    setSelectedDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
    );
  };

  const renderCalendarDays = () => {
    const calendarDays = [];
    const today = new Date();

    for (let i = 0; i < firstDayOfMonth; i++) {
      calendarDays.push(<div key={`empty-${i}`} className="empty-day"></div>);
    }

    for (let i = 1; i <= daysInMonth; i++) {
      const current = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        i
      );

      const isSelected =
        selectedDate &&
        selectedDate.getFullYear() === current.getFullYear() &&
        selectedDate.getMonth() === current.getMonth() &&
        selectedDate.getDate() === current.getDate();

      const formattedDate = (fulldate) => {
        const date = `${fulldate.getFullYear()}/${fulldate.getMonth()}/${fulldate.getDate()}`;
        return date;
      };
      let dayClass;
      let isPastDay;

      if (formattedDate(current) === formattedDate(today)) {
        isPastDay = false;
      } else {
        isPastDay = current < today;
      }
      if (isSelected) {
        dayClass = `calendar-day font-bold text-white  w-10 h-10 rounded-full flex items-center justify-center bg-primary-color   
        `;
      } else {
        dayClass = `calendar-day  w-10 h-10 rounded-full flex items-center justify-center ${
          isPastDay
            ? "text-gray-500"
            : "bg-blue-100 font-bold text-primary-color"
        }  `;
      }
      calendarDays.push(
        <div className="flex cursor-pointer items-center justify-center">
          <div
            key={i}
            className={dayClass}
            onClick={!isPastDay ? () => handleDayClick(i) : undefined}
          >
            {i}
          </div>
        </div>
      );
    }

    return calendarDays;
  };
  return (
    <div className="calendar-container w-3/5">
      <div className="calendar-header  flex flex-row p-5 justify-center items-center">
        <button
          className="w-8 h-8 flex items-center justify-center rounded-full mr-5 bg-blue-200"
          onClick={handlePrevMonth}
        >
          <IoIosArrowBack className="text-xl   text-primary-color" />
        </button>
        <h2 className="text-xl w-42 text-center text-black-color font-bold">
          {currentDate.toLocaleString("default", {
            month: "long",
            year: "numeric",
          })}
        </h2>
        <button
          className="w-8 h-8 flex items-center justify-center rounded-full ml-5 bg-blue-200"
          onClick={handleNextMonth}
        >
          <IoIosArrowForward className="text-xl   text-primary-color  " />
        </button>
      </div>
      <div className="calendar-weekdays grid grid-cols-7 gap-2">
        {weekdays.map((day) => (
          <div
            key={day}
            className="weekday text-center text-gray-600 tracking-tight"
          >
            {day}
          </div>
        ))}
      </div>
      <div className="calendar-days place-content-center grid grid-cols-7 gap-2">
        {renderCalendarDays()}
      </div>
    </div>
  );
}
