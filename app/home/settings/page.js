"use client";
import Button from "@/src/components/atom/button/button";
import InputField from "@/src/components/atom/inputField/inputField";
import Line from "@/src/components/atom/line/line";
import InputHolder from "@/src/components/molecules/inputHolder/inputHolder";
import HomePage from "@/src/components/pages/home/home";
import { useEffect } from "react";
import {
  IoReaderSharp,
  IoReaderOutline,
  IoTimeOutline,
  IoTime,
  IoSettingsOutline,
  IoSettings,
} from "react-icons/io5";

import Select, { StylesConfig } from "react-select";

export default function DeatilsPage() {
  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];
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
  return (
    <>
      <Line />
      <div className="sidenav flex-row p-3 py-0  pl-8    flex ">
        <div className="flex py-3 relative flex-row  px-5 items-center justify-center">
          <IoReaderOutline className="text-primary-color text-xl mr-1" />
          <p className="tracking-tight flex  font-medium text-primary-color">
            Clinic Details
          </p>
          <div className="line2 absolute opacity-50 bg-primary-color bottom-0 h-1 w-full"></div>
        </div>
        <div className="flex py-3 flex-row  px-5 items-center justify-center">
          <IoTimeOutline className="text-gray-600 text-xl mr-1" />
          <p className="tracking-tight flex  font-medium text-gray-600">
            Clinic Timings
          </p>
        </div>
        <div className="flex py-3 flex-row  px-5 items-center justify-center">
          <IoSettingsOutline className="text-gray-600 text-xl mr-1" />
          <p className="tracking-tight flex  font-medium text-gray-600">
            Clinic Settings
          </p>
        </div>
      </div>
      <div className="bg-shade-color p-3 pl-10 pt-4 flex justify-center  w-full h-full">
        <div className="w-8/12 bg-white  m-8">
          <div className="p-4 flex flex-row justify-between items-center">
            <p className="tracking-tight text-2xl  text-black-color   font-medium">
              Clinic Settings
            </p>
            <div className="flex flex-row justify-center items-center">
              <p className="font-medium text-md text-black-color mr-3 tracking-tight">
                Cancel
              </p>
              <Button text={"Save & Close"} />
            </div>
          </div>

          <Line />
          <div className="w-3/5 p-6 px-10">
            <InputHolder label="Booking link">
              <p className="mb-2 tracking-tight text-md">www.jhon.medapp.in/</p>
              <InputField type={"text"} placeholder={"booking-for-alsy"} />
            </InputHolder>
            <p className="text-primary-color mb-2 tracking-tight text-md">
              www.jhon.medapp.in/booking-for-alsy
            </p>
            <Button text={"Copy Link"} />
          </div>
          <Line />
          <div className="w-3/5 p-6 px-10">
            <InputHolder label="Stop accepting bookings">
              <div className="flex mt-2 flex-row items-center">
                <Button text="Stop Accepting" />
              </div>{" "}
              <p className="mt-2 tracking-tight text-md">
                You won't be able to accept bookings.
              </p>
            </InputHolder>
            <InputHolder label="Add Doctor profile">
              <div className="flex mt-2 flex-row items-center">
                <input
                  id="bordered-checkbox-2"
                  type="checkbox"
                  value=""
                  name="bordered-checkbox"
                  class="w-4 h-4 text-blue-100 bg-gray-100  rounded "
                />{" "}
                <p className=" ml-3 tracking-tight text-md">
                  Add your Doctor profile in booking page
                </p>
              </div>
            </InputHolder>

            <InputHolder label="Clinic Category">
              <Select
                classNamePrefix="custom-select"
                closeMenuOnSelect={false}
                defaultValue={[options[4], options[5]]}
                isMulti
                styles={customStyles}
                options={options}
              />
            </InputHolder>
          </div>
          <Line />
          <div className="w-3/5 p-6 px-10">
            <InputHolder label="Cancellation policy">
              <div className="flex mt-2 flex-row items-center">
                <input
                  id="bordered-checkbox-2"
                  type="checkbox"
                  value=""
                  name="bordered-checkbox"
                  class="w-4 h-4 text-blue-100 bg-gray-100  rounded "
                />{" "}
                <p className=" ml-3 tracking-tight text-md">
                  Patients can cancel their bookings
                </p>
              </div>
            </InputHolder>

            <InputHolder label="Patients can cancel before">
              <InputField type={"number"} placeholder={"in Minutes"} />
            </InputHolder>
          </div>
        </div>
      </div>
    </>
  );
}
