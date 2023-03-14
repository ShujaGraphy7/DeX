import React, { useState } from "react";
import { FiSettings } from "react-icons/fi";
import "../../../../styles.css";

function Settings() {
  const [popup, setPopup] = useState(false);

  const toggle = () => {
    popup ? setPopup(false) : setPopup(true);
  };
  return (
    <>
      <div className="flex justify-center">
        <div className="relative inline-block mb-2">
          <button
            onClick={() => toggle()}
            type="button"
            className="text-2xl font-bold text-fuchsia-600 sm:text-sm md:text-2xl hover:animate-spin"
          >
            <FiSettings />
          </button>
          {popup ? (
            <div className="absolute right-0 z-20 w-56 py-2 mt-2 overflow-hidden bg-fuchsia-50 rounded-md shadow-xl dark:bg-fuchsia-800">
              <div className="mx-1 my-2">
                <h1 className="text-sm font-semibold text-fuchsia-700 dark:text-fuchsia-200">
                  Settings
                </h1>
              </div>

              <hr className="border-fuchsia-200 dark:border-fuchsia-800 " />
              <div>
                <div>
                  <p className="block px-4 py-3 text-sm text-fuchsia-700 capitalize transition-colors duration-200 transform dark:text-fuchsia-300  hover:bg-fuchsia-100 dark:hover:bg-fuchsia-700 dark:hover:text-white">
                    Slippage tolerance *
                  </p>
                </div>
                <div className="flex px-3 justify-between items-center">
                  <div>
                    <button className="block rounded-l-full px-3 py-3 text-sm text-fuchsia-700 capitalize border border-fuchsia-300 transition-colors duration-200 transform dark:text-fuchsia-300 bg-fuchsia-200 hover:bg-fuchsia-300 dark:hover:bg-fuchsia-700 dark:hover:text-white">
                      Auto
                    </button>
                  </div>
                  <div className="relative">
                    <input
                      type="number"
                      step="0.01"
                      max="1.5"
                      defaultValue="0.5"
                      className="w-full rounded-r-full p-3 text-sm text-fuchsia-900 border border-fuchsia-300  bg-fuchsia-50 focus:ring-fuchsia-500 focus:border-fuchsia-500 dark:bg-fuchsia-700 dark:border-fuchsia-600 dark:placeholder-fuchsia-400 dark:text-white dark:focus:ring-fuchsia-500 dark:focus:border-fuchsia-500"
                    />
                  </div>
                </div>
              </div>

              <p className="block px-4 py-3 text-sm text-fuchsia-700  capitalize transition-colors duration-200 transform dark:text-fuchsia-300 hover:bg-fuchsia-100 dark:hover:bg-fuchsia-700 dark:hover:text-white">
                Transaction deadline
              </p>
              <div className="flex mx-3 justify-between items-center">
                <div className="relative">
                  <input
                    type="number"
                    step="1"
                    max="45"
                    defaultValue="30"
                    className="w-full rounded-full p-3 text-sm text-fuchsia-900 border border-fuchsia-300  bg-fuchsia-50 focus:ring-fuchsia-500 focus:border-fuchsia-500 dark:bg-fuchsia-700 dark:border-fuchsia-600 dark:placeholder-fuchsia-400 dark:text-white dark:focus:ring-fuchsia-500 dark:focus:border-fuchsia-500"
                  />
                </div>
                <div>
                    <p className="block px-3 py-3 text-sm text-fuchsia-700 capitalize transition-colors duration-200 transform dark:text-fuchsia-300  dark:hover:bg-fuchsia-700 dark:hover:text-white">
                      Minutes
                    </p>
                  </div>
              </div>

              <div className="mx-1 my-2">
                <h1 className="text-sm font-semibold text-fuchsia-700 dark:text-fuchsia-200">
                  Interface Settings
                </h1>
              <hr className="border-fuchsia-200 dark:border-fuchsia-800 my-2 " />
              </div>
              <div className="flex justify-between px-4 py-3 text-sm text-fuchsia-600 capitalize transition-colors duration-200 transform dark:text-fuchsia-300 hover:bg-fuchsia-100 dark:hover:bg-fuchsia-700 dark:hover:text-fuchsia-700">
                <div>Auto Router API</div>
                <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
                  <input
                    type="checkbox"
                    name="toggle1"
                    id="toggle1"
                    className="toggle-checkbox1 absolute block w-6 h-6 rounded-full bg-fuchsia-300 border-4 appearance-none cursor-pointer"
                  />
                  <label
                    htmlFor="toggle"
                    className="toggle-label1 block overflow-hidden h-6 rounded-full bg-fuchsia-300 cursor-pointer"
                  ></label>
                </div>
              </div>
              <div className="flex justify-between px-4 py-3 text-sm text-fuchsia-600 capitalize transition-colors duration-200 transform dark:text-fuchsia-300 hover:bg-fuchsia-100 dark:hover:bg-fuchsia-700 dark:hover:text-fuchsia-700">
                <div>Expert Mode</div>
                <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
                  <input
                    type="checkbox"
                    name="toggle2"
                    id="toggle2"
                    className="toggle-checkbox2 absolute block w-6 h-6 rounded-full bg-fuchsia-300 border-4 appearance-none cursor-pointer"
                  />
                  <label
                    htmlFor="toggle"
                    className="toggle-label2 block overflow-hidden h-6 rounded-full bg-fuchsia-300 cursor-pointer"
                  ></label>
                </div>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
}

export default Settings;
