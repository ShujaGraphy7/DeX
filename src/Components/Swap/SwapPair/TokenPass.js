import React from "react";
import { FaEthereum } from "react-icons/fa";
import { IoIosArrowBack } from "react-icons/io";

function TokenPass(props) {
  
  return (
    <>
      <div
        className="relative z-10"
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true"
      >
        <div className="fixed inset-0 bg-black bg-opacity-10 backdrop-blur-sm transition-opacity"></div>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <div className="relative transform overflow-hidden rounded-lg bg-white text-center shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
              <div className="bg-fuchsia-50 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="px-4 py-1 xs:flex xs:flex-row-reverse justify-between items-center xs:px-2">
                  <div></div>
                  <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full bg-fuchsia-200 sm:mx-0 sm:h-16 sm:w-16">
                    <div className="text-fuchsia-700 text-2xl animate-bounce">
                      <FaEthereum />
                    </div>
                  </div>
                  <div>
                    <button
                      type="button"
                      onClick={props.close}
                      className="font-bold text-2xl text-fuchsia-600 sm:text-sm hover:animate-pulse"
                    >
                      <IoIosArrowBack />
                    </button>
                  </div>
                </div>

                <div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4">
                    <h3
                      className="text-lg font-medium leading-6 xs:text-center text-fuchsia-900"
                      id="modal-title"
                    >
                      Add Token {props._name} Here
                    </h3>
                    
                    <div className="relative my-2">
                      <input
                        type="text"
                        placeholder="Paste token Address Here"
                        className="block w-full p-3 text-lg text-fuchsia-900 border placeholder-fuchsia-300 border-fuchsia-300 rounded-lg bg-fuchsia-50 focus:ring-fuchsia-500 focus:border-fuchsia-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-fuchsia-500 dark:focus:border-fuchsia-500"
                      />
                    </div>

                    <button className="text-white bg-fuchsia-700 hover:bg-fuchsia-800 focus:ring-4 focus:outline-none focus:ring-fuchsia-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-fuchsia-600 dark:hover:bg-fuchsia-700 dark:focus:ring-fuchsia-800">
                      <div>Add</div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default TokenPass;
