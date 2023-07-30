import Image from "next/image";
import { IoIosAnalytics } from "react-icons/io";
import {
  IoNotificationsOutline,
  IoSearch,
  IoReaderOutline,
  IoPersonOutline,
  IoChatbubbleOutline,
  IoSettingsOutline,
  IoCopyOutline,
  IoLocationOutline,
  IoAddCircleOutline,
} from "react-icons/io5";
export default function Home() {
  return (
    <main className="bg-white h-screen overflow-hidden  flex flex-col">
      <nav className="flex p-4 flex-row justify-between items-center">
        <div className="flex flex-row justify-center items-center ">
          <IoIosAnalytics className="text-5xl text-primary-color" />
          <h3 className="text-3xl font-medium  tracking-tight text-black-color">
            Medic App
          </h3>
        </div>
        <div className="flex   flex-row justify-center items-center">
          <div className="flex h-12 w-12 rounded-full mr-3  justify-center items-center bg-shade-color">
            <IoNotificationsOutline className="text-2xl text-gray-600" />
          </div>
          <div className="searchbar mr-6 px-4 rounded-full flex flex-row justify-center items-center bg-shade-color">
            <IoSearch className="text-xl text-gray-600" />
            <input
              type="text"
              placeholder="Search here"
              className="text-md outline-none text-gray-600 w-60 h-12 ml-2 bg-transparent"
            />
          </div>
          <div className=""></div>
          <img
            src="https://randomuser.me/api/portraits/men/85.jpg"
            alt=""
            className="h-12 rounded-full w-12"
          />
        </div>
      </nav>
      <div className="line bg-opacity-70 bg-shade-color"></div>
      <div className="flex mt-2 flex-grow   flex-col">
        <div className="sidenav flex-row p-3 pl-8    flex ">
          <div className="flex bg-blue-100 px-5 py-1 rounded-full  mr-6 flex-row items-center">
            <IoReaderOutline className="text-2xl text-primary-color" />
            <p className="ml-2 text-lg font-medium text-primary-color  tracking-tight text-gray-600">
              Clinics
            </p>
          </div>
          <div className="flex mr-6 flex-row items-center">
            <IoNotificationsOutline className="text-2xl text-gray-600" />{" "}
            <p className="ml-2 text-lg font-medium  tracking-tight text-gray-600">
              Notification
            </p>
          </div>
          <div className="flex  mr-6 flex-row items-center">
            <IoChatbubbleOutline className="text-2xl text-gray-600" />{" "}
            <p className="ml-2 text-lg font-medium tracking-tight text-gray-600">
              Chat
            </p>
          </div>
        </div>
        <div className="bg-shade-color p-3 pl-10 pt-4   w-full h-full">
          <h3 className="text-2xl mb-2 mt-2 font-medium  tracking-tight text-gray-600">
            My Clinics
          </h3>
          <div className="flex absolute right-10 bottom-10 flex-row justify-center items-center py-2 rounded-full text-white w-40 bg-primary-color">
            <IoAddCircleOutline className="text-2xl" />
            <p className="font-medium ml-1">Create Clinic</p>
          </div>
          <div className="grid grid-cols-3 gap-x-4">
            <div className="bg-white shadow-xl transition-all cursor-pointer hover:shadow-gray-200 shadow-gray-100 overflow-hidden relative rounded-md p-4 m-2">
              <div className="flex flex-row  mt-2 mb-1 justify-between items-center">
                <p className="text-2xl text-black-color tracking-tight font-medium">
                  Amees Clinic
                </p>
                <IoSettingsOutline className="text-xl text-gray-600" />
              </div>
              <div className="flex mt-1 flex-row items-center justify-start ">
                <IoLocationOutline className="text-gray-600" />{" "}
                <p className="tracking-tight ml-1 text-gray-600">Near Kochi</p>
              </div>
              <div className="flex mt-2 flex-row items-center justify-between">
                <p className="tracking-tight text-gray-600 ">
                  Today: 3 Bookings
                </p>
                <p className="tracking-tight font-medium underline underline-offset-2 text-black-color">
                  View all Bookings
                </p>
              </div>

              <div className="flex mt-5 flex-row justify-between items-center">
                <div className="flex flex-row justify-center items-center">
                  <IoCopyOutline className="text-xl text-primary-color mr-1" />
                  <p className="font-medium text-md text-primary-color tracking-tight">
                    Copy Link
                  </p>
                </div>
                <div className="px-5 py-1 bg-primary-color rounded-full">
                  <p className="font-medium text-white text-md text-primary-color tracking-tight">
                    Share
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white shadow-xl transition-all cursor-pointer hover:shadow-gray-200 shadow-gray-100 overflow-hidden relative rounded-md p-4 m-2">
              {/* <div className="h-2 top-0 opacity-70 bg-primary-color w-full left-0 absolute"></div> */}
              <div className="flex mt-2 mb-1 flex-row justify-between items-center">
                <p className="text-2xl  text-black-color tracking-tight font-medium">
                  Angel's Child Care
                </p>
                <IoSettingsOutline className="text-xl text-gray-600" />
              </div>
              <div className="flex mt-1 flex-row items-center justify-start ">
                <IoLocationOutline className="text-gray-600" />{" "}
                <p className="tracking-tight ml-1 text-gray-600">
                  Opposite Technopark Tvm
                </p>
              </div>
              <div className="flex mt-2 flex-row items-center justify-between">
                <p className="tracking-tight text-gray-600 ">
                  Today: 23 Bookings
                </p>
                <p className="tracking-tight font-medium underline underline-offset-2 text-black-color">
                  View all Bookings
                </p>
              </div>

              <div className="flex mt-5 flex-row justify-between items-center">
                <div className="flex flex-row justify-center items-center">
                  <IoCopyOutline className="text-xl text-primary-color mr-1" />
                  <p className="font-medium text-md text-primary-color tracking-tight">
                    Copy Link
                  </p>
                </div>
                <div className="px-5 py-1 bg-primary-color rounded-full">
                  <p className="font-medium text-white text-md text-primary-color tracking-tight">
                    Share
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
