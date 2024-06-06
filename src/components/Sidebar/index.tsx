import React, { useEffect, useRef, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import SidebarLinkGroup from "./SidebarLinkGroup";
import packageJson from "../../../package.json";

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}

function formatTimestamp(timestamp: number, offset: number = 0): string {
  const date = new Date(timestamp + offset * 3600 * 1000); // Adjusting for timezone offset in milliseconds
  const formattedDate = `${date.getDate()} ${getMonthName(
    date.getMonth()
  )} ${date.getFullYear()} ${padZero(date.getHours())}:${padZero(
    date.getMinutes()
  )} GMT+3`;

  function getMonthName(month: number): string {
    const months: string[] = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    return months[month];
  }

  function padZero(number: number): string {
    return number.toString().padStart(2, "0");
  }

  return formattedDate;
}

const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  const location = useLocation();
  const { pathname } = location;
  const version = packageJson.version;
  const trigger = useRef<any>(null);
  const sidebar = useRef<any>(null);

  const storedSidebarExpanded = localStorage.getItem("sidebar-expanded");
  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === "true"
  );
  const [lastDeploymentTime, setLastDeploymentTime] = useState<string | null>(
    null
  );

  useEffect(() => {
    const getLastDeploymentTime = async () => {
      const projectId = "prj_h4khhsHsjvJHdsPuDciq5g9ExSus"; // Replace with your project ID
      const accessToken = "5WRkLI2IU5q0FAyXRZJ4NMPQ"; // Replace with your access token

      try {
        const result = await fetch(
          `https://api.vercel.com/v6/deployments?projectId=${projectId}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        const deployments = await result.json();
        setLastDeploymentTime(deployments?.deployments?.[0]);
      } catch (error) {
        console.error("Error fetching deployment time:", error);
      }
    };

    if (process.env.NODE_ENV !== "development") {
      getLastDeploymentTime();
    } else {
      console.log("DEV");
    }
  }, []); // Empty dependency array ensures this effect runs only once, similar to componentDidMount

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  useEffect(() => {
    localStorage.setItem("sidebar-expanded", sidebarExpanded.toString());
    if (sidebarExpanded) {
      document.querySelector("body")?.classList.add("sidebar-expanded");
    } else {
      document.querySelector("body")?.classList.remove("sidebar-expanded");
    }
  }, [sidebarExpanded]);

  return (
    <aside
      ref={sidebar}
      className={`absolute pl-10 pr-5  mt-10 left-0 top-0 flex justify-between items-center h-full flex-col overflow-y-hidden bg-body dark:bg-boxdark-2 lg:static lg:translate-x-0 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="w-full flex flex-col  duration-300 ease-linear">
        {/* <!-- Sidebar Menu --> */}
        <nav className=" ">
          <div>
            <ul className="mb-6 min-w-40 flex flex-col gap-1.5">
              {/* <!-- Menu Item Overview --> */}
              <li>
                <NavLink
                  to="/"
                  className={`flex flex-col items-center rounded-lg py-3 font-medium  duration-300 ease-in-out 
                  ${
                    pathname === "/"
                      ? "text-white bg-purple dark:bg-purple"
                      : "text-purple"
                  }`}
                >
                  <div className="flex flex-col items-center justify-center">
                    <p className="text-base">Overview</p>
                    {pathname === "/" ? (
                      <svg
                        width="33"
                        height="32"
                        viewBox="0 0 33 32"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M27.5 5H17.5V3C17.5 2.73478 17.3946 2.48043 17.2071 2.29289C17.0196 2.10536 16.7652 2 16.5 2C16.2348 2 15.9804 2.10536 15.7929 2.29289C15.6054 2.48043 15.5 2.73478 15.5 3V5H5.5C4.96957 5 4.46086 5.21071 4.08579 5.58579C3.71071 5.96086 3.5 6.46957 3.5 7V22C3.5 22.5304 3.71071 23.0391 4.08579 23.4142C4.46086 23.7893 4.96957 24 5.5 24H10.42L7.71875 27.375C7.55299 27.5822 7.47633 27.8468 7.50563 28.1105C7.53493 28.3742 7.6678 28.6155 7.875 28.7812C8.0822 28.947 8.34676 29.0237 8.61049 28.9944C8.87421 28.9651 9.11549 28.8322 9.28125 28.625L12.98 24H20.02L23.7188 28.625C23.8008 28.7276 23.9023 28.813 24.0174 28.8764C24.1325 28.9398 24.2589 28.9799 24.3895 28.9944C24.5201 29.0089 24.6523 28.9975 24.7785 28.961C24.9046 28.9244 25.0224 28.8633 25.125 28.7812C25.2276 28.6992 25.313 28.5977 25.3764 28.4826C25.4398 28.3675 25.4799 28.2411 25.4944 28.1105C25.5089 27.9799 25.4975 27.8477 25.461 27.7215C25.4244 27.5954 25.3633 27.4776 25.2812 27.375L22.58 24H27.5C28.0304 24 28.5391 23.7893 28.9142 23.4142C29.2893 23.0391 29.5 22.5304 29.5 22V7C29.5 6.46957 29.2893 5.96086 28.9142 5.58579C28.5391 5.21071 28.0304 5 27.5 5ZM13.5 18C13.5 18.2652 13.3946 18.5196 13.2071 18.7071C13.0196 18.8946 12.7652 19 12.5 19C12.2348 19 11.9804 18.8946 11.7929 18.7071C11.6054 18.5196 11.5 18.2652 11.5 18V15C11.5 14.7348 11.6054 14.4804 11.7929 14.2929C11.9804 14.1054 12.2348 14 12.5 14C12.7652 14 13.0196 14.1054 13.2071 14.2929C13.3946 14.4804 13.5 14.7348 13.5 15V18ZM17.5 18C17.5 18.2652 17.3946 18.5196 17.2071 18.7071C17.0196 18.8946 16.7652 19 16.5 19C16.2348 19 15.9804 18.8946 15.7929 18.7071C15.6054 18.5196 15.5 18.2652 15.5 18V13C15.5 12.7348 15.6054 12.4804 15.7929 12.2929C15.9804 12.1054 16.2348 12 16.5 12C16.7652 12 17.0196 12.1054 17.2071 12.2929C17.3946 12.4804 17.5 12.7348 17.5 13V18ZM21.5 18C21.5 18.2652 21.3946 18.5196 21.2071 18.7071C21.0196 18.8946 20.7652 19 20.5 19C20.2348 19 19.9804 18.8946 19.7929 18.7071C19.6054 18.5196 19.5 18.2652 19.5 18V11C19.5 10.7348 19.6054 10.4804 19.7929 10.2929C19.9804 10.1054 20.2348 10 20.5 10C20.7652 10 21.0196 10.1054 21.2071 10.2929C21.3946 10.4804 21.5 10.7348 21.5 11V18Z"
                          fill="white"
                        />
                      </svg>
                    ) : (
                      <svg
                        width="33"
                        height="32"
                        viewBox="0 0 33 32"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M27.5 5H17.5V3C17.5 2.73478 17.3946 2.48043 17.2071 2.29289C17.0196 2.10536 16.7652 2 16.5 2C16.2348 2 15.9804 2.10536 15.7929 2.29289C15.6054 2.48043 15.5 2.73478 15.5 3V5H5.5C4.96957 5 4.46086 5.21071 4.08579 5.58579C3.71071 5.96086 3.5 6.46957 3.5 7V22C3.5 22.5304 3.71071 23.0391 4.08579 23.4142C4.46086 23.7893 4.96957 24 5.5 24H10.42L7.71875 27.375C7.55299 27.5822 7.47633 27.8468 7.50563 28.1105C7.53493 28.3742 7.6678 28.6155 7.875 28.7812C8.0822 28.947 8.34676 29.0237 8.61049 28.9944C8.87421 28.9651 9.11549 28.8322 9.28125 28.625L12.98 24H20.02L23.7188 28.625C23.8008 28.7276 23.9023 28.813 24.0174 28.8764C24.1325 28.9398 24.2589 28.9799 24.3895 28.9944C24.5201 29.0089 24.6523 28.9975 24.7785 28.961C24.9046 28.9244 25.0224 28.8633 25.125 28.7812C25.2276 28.6992 25.313 28.5977 25.3764 28.4826C25.4398 28.3675 25.4799 28.2411 25.4944 28.1105C25.5089 27.9799 25.4975 27.8477 25.461 27.7215C25.4244 27.5954 25.3633 27.4776 25.2812 27.375L22.58 24H27.5C28.0304 24 28.5391 23.7893 28.9142 23.4142C29.2893 23.0391 29.5 22.5304 29.5 22V7C29.5 6.46957 29.2893 5.96086 28.9142 5.58579C28.5391 5.21071 28.0304 5 27.5 5ZM27.5 22H5.5V7H27.5V22ZM13.5 15V18C13.5 18.2652 13.3946 18.5196 13.2071 18.7071C13.0196 18.8946 12.7652 19 12.5 19C12.2348 19 11.9804 18.8946 11.7929 18.7071C11.6054 18.5196 11.5 18.2652 11.5 18V15C11.5 14.7348 11.6054 14.4804 11.7929 14.2929C11.9804 14.1054 12.2348 14 12.5 14C12.7652 14 13.0196 14.1054 13.2071 14.2929C13.3946 14.4804 13.5 14.7348 13.5 15ZM17.5 13V18C17.5 18.2652 17.3946 18.5196 17.2071 18.7071C17.0196 18.8946 16.7652 19 16.5 19C16.2348 19 15.9804 18.8946 15.7929 18.7071C15.6054 18.5196 15.5 18.2652 15.5 18V13C15.5 12.7348 15.6054 12.4804 15.7929 12.2929C15.9804 12.1054 16.2348 12 16.5 12C16.7652 12 17.0196 12.1054 17.2071 12.2929C17.3946 12.4804 17.5 12.7348 17.5 13ZM21.5 11V18C21.5 18.2652 21.3946 18.5196 21.2071 18.7071C21.0196 18.8946 20.7652 19 20.5 19C20.2348 19 19.9804 18.8946 19.7929 18.7071C19.6054 18.5196 19.5 18.2652 19.5 18V11C19.5 10.7348 19.6054 10.4804 19.7929 10.2929C19.9804 10.1054 20.2348 10 20.5 10C20.7652 10 21.0196 10.1054 21.2071 10.2929C21.3946 10.4804 21.5 10.7348 21.5 11Z"
                          fill="#8460B3"
                        />
                      </svg>
                    )}
                  </div>
                </NavLink>
              </li>
              {/* <!-- Menu Item Overview --> */}

              {/* <!-- Menu Item Messages --> */}
              <li>
                <NavLink
                  to="/messages"
                  className={`flex flex-col items-center rounded-lg py-3 font-medium  duration-300 ease-in-out 
                  ${
                    pathname.includes("messages")
                      ? "text-white bg-purple dark:bg-purple"
                      : "text-purple"
                  }`}
                >
                  <div className="flex flex-col items-center justify-center">
                    <p className="text-base">Messages</p>
                    {pathname.includes("messages") ? (
                      <svg
                        width="33"
                        height="32"
                        viewBox="0 0 33 32"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M27.5 6H5.50004C4.9696 6 4.4609 6.21071 4.08582 6.58579C3.71075 6.96086 3.50004 7.46957 3.50004 8V28C3.49773 28.3814 3.60562 28.7553 3.81074 29.0768C4.01585 29.3984 4.30947 29.6538 4.65629 29.8125C4.92057 29.9356 5.2085 29.9995 5.50004 30C5.96954 29.9989 6.42347 29.8315 6.78129 29.5275L6.79254 29.5187L10.875 26H27.5C28.0305 26 28.5392 25.7893 28.9142 25.4142C29.2893 25.0391 29.5 24.5304 29.5 24V8C29.5 7.46957 29.2893 6.96086 28.9142 6.58579C28.5392 6.21071 28.0305 6 27.5 6ZM20.5 19H12.5C12.2348 19 11.9805 18.8946 11.7929 18.7071C11.6054 18.5196 11.5 18.2652 11.5 18C11.5 17.7348 11.6054 17.4804 11.7929 17.2929C11.9805 17.1054 12.2348 17 12.5 17H20.5C20.7653 17 21.0196 17.1054 21.2071 17.2929C21.3947 17.4804 21.5 17.7348 21.5 18C21.5 18.2652 21.3947 18.5196 21.2071 18.7071C21.0196 18.8946 20.7653 19 20.5 19ZM20.5 15H12.5C12.2348 15 11.9805 14.8946 11.7929 14.7071C11.6054 14.5196 11.5 14.2652 11.5 14C11.5 13.7348 11.6054 13.4804 11.7929 13.2929C11.9805 13.1054 12.2348 13 12.5 13H20.5C20.7653 13 21.0196 13.1054 21.2071 13.2929C21.3947 13.4804 21.5 13.7348 21.5 14C21.5 14.2652 21.3947 14.5196 21.2071 14.7071C21.0196 14.8946 20.7653 15 20.5 15Z"
                          fill="white"
                        />
                      </svg>
                    ) : (
                      <svg
                        width="33"
                        height="32"
                        viewBox="0 0 33 32"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g clip-path="url(#clip0_208_8009)">
                          <path
                            d="M6.14375 28.7638C5.9981 28.8863 5.8205 28.9647 5.63183 28.9898C5.44315 29.0149 5.25124 28.9856 5.07862 28.9054C4.90601 28.8252 4.75987 28.6974 4.65738 28.537C4.55488 28.3766 4.50028 28.1903 4.5 28V8C4.5 7.73478 4.60536 7.48043 4.79289 7.29289C4.98043 7.10536 5.23478 7 5.5 7H27.5C27.7652 7 28.0196 7.10536 28.2071 7.29289C28.3946 7.48043 28.5 7.73478 28.5 8V24C28.5 24.2652 28.3946 24.5196 28.2071 24.7071C28.0196 24.8946 27.7652 25 27.5 25H10.5L6.14375 28.7638Z"
                            stroke="#8460B3"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M12.5 14H20.5"
                            stroke="#8460B3"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M12.5 18H20.5"
                            stroke="#8460B3"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_208_8009">
                            <rect
                              width="32"
                              height="32"
                              fill="white"
                              transform="translate(0.5)"
                            />
                          </clipPath>
                        </defs>
                      </svg>
                    )}
                  </div>
                </NavLink>
              </li>
              {/* <!-- Menu Item Messages --> */}

              {/* <!-- Menu Item Weekly --> */}
              <li>
                <NavLink
                  to="/weekly"
                  className={`flex flex-col items-center rounded-lg py-3 font-medium  duration-300 ease-in-out 
                  ${
                    pathname.includes("weekly")
                      ? "text-white bg-purple dark:bg-purple"
                      : "text-purple"
                  }`}
                >
                  <div className="gap-2  flex flex-col items-center justify-center">
                    <p className="text-base">Weekly reports</p>
                    {pathname.includes("weekly") ? (
                      <svg
                        width="33"
                        height="32"
                        viewBox="0 0 33 32"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M27.2075 10.2925L20.2075 3.2925C20.1146 3.19967 20.0042 3.12605 19.8829 3.07586C19.7615 3.02568 19.6314 2.9999 19.5 3H7.5C6.96957 3 6.46086 3.21071 6.08579 3.58579C5.71071 3.96086 5.5 4.46957 5.5 5V27C5.5 27.5304 5.71071 28.0391 6.08579 28.4142C6.46086 28.7893 6.96957 29 7.5 29H25.5C26.0304 29 26.5391 28.7893 26.9142 28.4142C27.2893 28.0391 27.5 27.5304 27.5 27V11C27.5001 10.8686 27.4743 10.7385 27.4241 10.6172C27.3739 10.4958 27.3003 10.3854 27.2075 10.2925ZM19.5 11V5.5L25 11H19.5Z"
                          fill="white"
                        />
                      </svg>
                    ) : (
                      <svg
                        width="33"
                        height="32"
                        viewBox="0 0 33 32"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g clip-path="url(#clip0_208_8036)">
                          <path
                            d="M25.5 28H7.5C7.23478 28 6.98043 27.8946 6.79289 27.7071C6.60536 27.5196 6.5 27.2652 6.5 27V5C6.5 4.73478 6.60536 4.48043 6.79289 4.29289C6.98043 4.10536 7.23478 4 7.5 4H19.5L26.5 11V27C26.5 27.2652 26.3946 27.5196 26.2071 27.7071C26.0196 27.8946 25.7652 28 25.5 28Z"
                            stroke="#8460B3"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M19.5 4V11H26.5"
                            stroke="#8460B3"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_208_8036">
                            <rect
                              width="32"
                              height="32"
                              fill="white"
                              transform="translate(0.5)"
                            />
                          </clipPath>
                        </defs>
                      </svg>
                    )}
                  </div>
                </NavLink>
              </li>
              {/* <!-- Menu Item Weekly --> */}
              {/* <!-- Menu Item Settings --> */}
              <li>
                <NavLink
                  to="/settings"
                  className={`flex flex-col items-center rounded-lg py-3 font-medium  duration-300 ease-in-out 
                  ${
                    pathname.includes("settings")
                      ? "text-white bg-purple dark:bg-purple"
                      : "text-purple"
                  }`}
                >
                  <div className="gap-2  flex flex-col items-center justify-center">
                    <p className="text-base">Settings</p>
                    {pathname.includes("settings") ? (
                      <svg
                        width="33"
                        height="32"
                        viewBox="0 0 33 32"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M30.2427 13.4013C30.2149 13.2604 30.157 13.1273 30.0731 13.0108C29.9892 12.8943 29.8812 12.7973 29.7565 12.7263L26.0277 10.6013L26.0127 6.39877C26.0123 6.25403 25.9804 6.11112 25.9193 5.97991C25.8583 5.84869 25.7694 5.7323 25.659 5.63877C24.3064 4.49464 22.7488 3.61785 21.069 3.05502C20.9367 3.01024 20.7965 2.99367 20.6574 3.00637C20.5184 3.01908 20.3835 3.06077 20.2615 3.12877L16.5002 5.23127L12.7352 3.12502C12.6132 3.05664 12.4781 3.01463 12.3388 3.00171C12.1995 2.98879 12.059 3.00525 11.9265 3.05002C10.2477 3.61646 8.69179 4.49665 7.34149 5.64377C7.2312 5.73716 7.14246 5.85336 7.08139 5.98434C7.02032 6.11533 6.98837 6.258 6.98774 6.40252L6.96899 10.6088L3.24024 12.7338C3.11549 12.8048 3.00749 12.9018 2.92359 13.0183C2.83969 13.1348 2.78184 13.2679 2.75399 13.4088C2.41273 15.1236 2.41273 16.8889 2.75399 18.6038C2.78184 18.7446 2.83969 18.8778 2.92359 18.9942C3.00749 19.1107 3.11549 19.2077 3.24024 19.2788L6.96899 21.4038L6.98399 25.6075C6.98444 25.7523 7.01631 25.8952 7.07738 26.0264C7.13846 26.1576 7.22729 26.274 7.33774 26.3675C8.69033 27.5116 10.2479 28.3884 11.9277 28.9513C12.06 28.996 12.2002 29.0126 12.3393 28.9999C12.4784 28.9872 12.6133 28.9455 12.7352 28.8775L16.5002 26.7688L20.2652 28.875C20.4142 28.958 20.5822 29.0011 20.7527 29C20.862 29 20.9704 28.9823 21.074 28.9475C22.7524 28.3813 24.3082 27.502 25.659 26.3563C25.7693 26.2629 25.858 26.1467 25.9191 26.0157C25.9802 25.8847 26.0121 25.742 26.0127 25.5975L26.0315 21.3913L29.7602 19.2663C29.885 19.1952 29.993 19.0982 30.0769 18.9817C30.1608 18.8653 30.2186 18.7321 30.2465 18.5913C30.5858 16.8778 30.5846 15.1143 30.2427 13.4013ZM16.5002 21C15.5113 21 14.5446 20.7068 13.7224 20.1574C12.9001 19.608 12.2593 18.8271 11.8808 17.9134C11.5024 16.9998 11.4034 15.9945 11.5963 15.0246C11.7892 14.0547 12.2654 13.1637 12.9647 12.4645C13.664 11.7652 14.5549 11.289 15.5248 11.0961C16.4947 10.9032 17.5 11.0022 18.4137 11.3806C19.3273 11.7591 20.1082 12.3999 20.6576 13.2222C21.207 14.0444 21.5002 15.0111 21.5002 16C21.5002 17.3261 20.9735 18.5979 20.0358 19.5356C19.0981 20.4732 17.8263 21 16.5002 21Z"
                          fill="white"
                        />
                      </svg>
                    ) : (
                      <svg
                        width="33"
                        height="32"
                        viewBox="0 0 33 32"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g clip-path="url(#clip0_345_10673)">
                          <path
                            d="M16.5 21C19.2614 21 21.5 18.7614 21.5 16C21.5 13.2386 19.2614 11 16.5 11C13.7386 11 11.5 13.2386 11.5 16C11.5 18.7614 13.7386 21 16.5 21Z"
                            stroke={
                              pathname.includes("settings")
                                ? "#FFFFFF"
                                : "#8460B3"
                            }
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M16.7563 25.7638C16.5888 25.7638 16.42 25.7638 16.2563 25.7638L12.25 28C10.6904 27.4754 9.24387 26.6611 7.98628 25.6L7.97128 21.1C7.88253 20.96 7.79878 20.8187 7.72128 20.6737L3.73753 18.405C3.42375 16.8179 3.42375 15.1846 3.73753 13.5975L7.71753 11.335C7.79878 11.1913 7.88253 11.0487 7.96753 10.9087L7.98753 6.40875C9.24399 5.34455 10.6902 4.52731 12.25 4L16.25 6.23625C16.4175 6.23625 16.5863 6.23625 16.75 6.23625L20.75 4C22.3096 4.52461 23.7562 5.33886 25.0138 6.4L25.0288 10.9C25.1175 11.04 25.2013 11.1813 25.2788 11.3263L29.26 13.5938C29.5738 15.1809 29.5738 16.8141 29.26 18.4013L25.28 20.6637C25.1988 20.8075 25.115 20.95 25.03 21.09L25.01 25.59C23.7544 26.6544 22.3091 27.472 20.75 28L16.7563 25.7638Z"
                            stroke={
                              pathname.includes("settings")
                                ? "#FFFFFF"
                                : "#8460B3"
                            }
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_345_10673">
                            <rect
                              width="32"
                              height="32"
                              fill="white"
                              transform="translate(0.5)"
                            />
                          </clipPath>
                        </defs>
                      </svg>
                    )}
                  </div>
                </NavLink>
              </li>
              {/* <!-- Menu Item Settings --> */}
              {/* <!-- Menu Item Calendar --> */}
              {process.env.NODE_ENV == "development" && (
                <li>
                  <NavLink
                    to="/calendar"
                    className={`group relative flex justify-center items-center gap-2.5 rounded-sm py-3 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                      pathname.includes("calendar") &&
                      "bg-graydark dark:bg-meta-4"
                    }`}
                  >
                    UI elements
                  </NavLink>
                </li>
              )}
              {/* <!-- Menu Item Calendar --> */}
            </ul>
          </div>
        </nav>
      </div>

      {/* <!-- CONTACT US --> */}
      <div className="mb-40">
        <div className="w-full p-2.5 rounded-xl flex flex-row items-center justify-center gap-2 bg-white dark:bg-black cursor-pointer">
          <svg
            width="40"
            height="40"
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="40" height="40" rx="20" fill="#3B8AAB" />
            <path
              d="M29.75 19.2497V26.7497C29.75 27.7443 29.3549 28.6981 28.6517 29.4013C27.9484 30.1046 26.9946 30.4997 26 30.4997H20.75C20.5511 30.4997 20.3603 30.4207 20.2197 30.28C20.079 30.1394 20 29.9486 20 29.7497C20 29.5508 20.079 29.36 20.2197 29.2194C20.3603 29.0787 20.5511 28.9997 20.75 28.9997H26C26.5967 28.9997 27.169 28.7626 27.591 28.3407C28.0129 27.9187 28.25 27.3464 28.25 26.7497H26C25.4033 26.7497 24.831 26.5126 24.409 26.0907C23.9871 25.6687 23.75 25.0964 23.75 24.4997V20.7497C23.75 20.153 23.9871 19.5807 24.409 19.1587C24.831 18.7367 25.4033 18.4997 26 18.4997H28.2172C28.0753 16.9406 27.4926 15.454 26.5374 14.2137C25.5821 12.9733 24.2936 12.0304 22.8225 11.495C21.3513 10.9596 19.7581 10.8539 18.2291 11.1902C16.7001 11.5264 15.2983 12.2908 14.1875 13.3941C12.8062 14.7571 11.9543 16.5666 11.7838 18.4997H14C14.5967 18.4997 15.169 18.7367 15.591 19.1587C16.0129 19.5807 16.25 20.153 16.25 20.7497V24.4997C16.25 25.0964 16.0129 25.6687 15.591 26.0907C15.169 26.5126 14.5967 26.7497 14 26.7497H12.5C11.9033 26.7497 11.331 26.5126 10.909 26.0907C10.4871 25.6687 10.25 25.0964 10.25 24.4997V19.2497C10.2521 17.3183 10.8271 15.431 11.9023 13.8267C12.9775 12.2223 14.5046 10.9729 16.2901 10.2368C18.0757 9.50066 20.0395 9.3108 21.933 9.69125C23.8265 10.0717 25.5646 11.0054 26.9272 12.3741C27.8268 13.2781 28.5393 14.3508 29.0237 15.5306C29.5081 16.7105 29.7549 17.9743 29.75 19.2497Z"
              fill="white"
            />
          </svg>

          <div className="flex-col justify-center items-start inline-flex">
            <div className=" text-cyan-600 title-xs font-bold leading-tight">
              Need help?
            </div>{" "}
            <div className="self-stretch text-zinc-400 text-xs font-semibold">
              Contact our support center
            </div>
          </div>
        </div>

        {/* <!-- APP VERSION --> */}
        <div className="flex items-center justify-center mb-2">
          <h5 className="flex items-center mr-2 text-sm font-semibold text-grey">
            App version:
          </h5>
          <h5 className="flex items-center text-sx font-bold text-grey">
            {version}
          </h5>
        </div>
        <div className="flex items-center justify-center">
          <p className="w-40 ml-6 text-xs">
            Latest update:{" "}
            {lastDeploymentTime && formatTimestamp(lastDeploymentTime?.created)}
          </p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
