"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { getNext10Days } from "@/src/utils/getDays";
import { IoTimeOutline } from "react-icons/io5";

export default function Page() {
  const dates = getNext10Days(6);
  const slotList = [
    ["09:00 AM", "09:15 AM"],
    ["09:15 AM", "09:30 AM"],
    ["09:30 AM", "09:35 AM"],
    ["09:35 AM", "09:45 AM"],
    ["09:45 AM", "10:15 AM"],
    ["10:00 AM", "10:15 AM"],
    ["10:15 AM", "10:25 AM"],
    ["09:30 AM", "09:35 AM"],
    ["09:35 AM", "09:45 AM"],
    ["09:45 AM", "10:15 AM"],
    ["10:00 AM", "10:15 AM"],
    ["10:15 AM", "10:25 AM"],
  ];
  return (
    <div className="bg-white  relative  p-24 py-12">
      <div className="card border-sm  rounded-2xl   w-full h-full flex flex-row">
        <div className="w-8/12  p-10 h-full border-e-sm">
          <div className="flex flex-row">
            {dates.map((item, i) => {
              return (
                <div
                  className={`p-2 rounded-md w-20 h-20  flex items-center justify-center flex-col m-2 text-xl ${
                    i == 0
                      ? "bg-primary-color rounded-md text-white  bg-blue-500 shadow-lg shadow-blue-500/50"
                      : "bg-[#F3F8FF] text-black-color"
                  }`}
                >
                  <p
                    className={`font-thin text-md ${
                      i == 0 ? "text-gray-100" : "text-gray-400"
                    } `}
                  >
                    {" "}
                    {item.day_of_week}
                  </p>
                  <p className={`font-bold text-md `}>{item.day_of_month}</p>
                </div>
              );
            })}
            <div className="p-2 w-20 h-20 bg-[#F3F8FF] m-2 text-xl">
              <p className=""> sdds</p>
              <p className="">d</p>
            </div>
          </div>
          <div className="p-2 mt-2">
            <p className="text-xl font-semibold tracking-tight text-black-color">
              10 August 2022
            </p>
            <p className="">Pick a time slot for booking</p>
            <div className="grid mt-4  grid-cols-3 gap-6">
              {slotList.map((item) => {
                return (
                  <div className="p-2 rounded-md border-sm">
                    <p className="font-medium tracking-tight">
                      {item[0]}-{item[1]}
                    </p>
                    <div className="flex text-sm tracking-wide font-thin text-gray-400  flex-row justify-start items-center">
                      <IoTimeOutline /> <p className="ml-1">45min</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
