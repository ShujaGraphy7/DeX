import React, { useEffect, useState } from "react";
import { FaEthereum } from "react-icons/fa";
import { IoIosArrowBack } from "react-icons/io";
import { Switch } from "@headlessui/react";

function TokenPass(props) {
  const [address, setAddress] = useState("");
  const [isEmpty, setIsEmpty] = useState(true);
  const [enabled, setEnabled] = useState(false);

  const onChangeHandedler = (e) => {
    enabled &&(
      setAddress(e.target.value)
      )
      setIsEmpty(true);

    if (address.length !== 42) {
      setIsEmpty(false);
    }
  };

  const onAddPressHandeler = (e) => {
    // e.preventDefault();
    if (address.length === 42) {
    props.onAddPress(address);
  }
  else if (!enabled){
      props.onAddPress(address);

    }
  };

  useEffect(() => {
    !enabled && setAddress("ETH");
  }, [enabled]);

  return (
    <>
      <div
        className="relative z-10"
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true"
      >
        <div className="fixed inset-0 bg-fuchsia-900 bg-opacity-10 backdrop-blur-sm transition-opacity"></div>

        <div className="fixed inset-0 z-10 overflow-y-auto w-[90%] mx-auto">
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
                <div className="text-fuchsia-600 font-bold my-4 flex gap-5 justify-center">
                 <span className={`${enabled && "text-fuchsia-300"}`}>ETH</span> <Switch
                    checked={enabled}
                    onChange={setEnabled}
                    className={`bg-fuchsia-300 relative inline-flex h-6 w-11 items-center rounded-full`}
                  >
                    <span className="sr-only">Enable notifications</span>
                    <span
                      className={`${
                        enabled ? "translate-x-6" : "translate-x-1"
                      } inline-block h-4 w-4 transform rounded-full bg-fuchsia-900 border-fuchsia-100 border-2 transition`}
                    />
                  </Switch><span className={`${!enabled && "text-fuchsia-300"}`}> Token</span>
                </div>

                <div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4">
                    <h3
                      className="text-lg font-medium leading-6 xs:text-center text-fuchsia-900"
                      id="modal-title"
                    >
                      {enabled &&
                      <span>Add Token {props._name} Here
                      </span>}
                    </h3>
                      {enabled? (

                        
                        <div className="relative my-2">
                        <input
                        onChange={onChangeHandedler}
                        type="text"
                        value={address}
                        placeholder="Paste token Address Here"
                        className="block w-full p-3 text-lg text-fuchsia-900 border placeholder-fuchsia-300 border-fuchsia-300 rounded-lg bg-fuchsia-50 focus:ring-fuchsia-500 focus:border-fuchsia-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-fuchsia-500 dark:focus:border-fuchsia-500"
                        />
                        </div>
                        ):(""
                        )}
                        {enabled ?
                    (!isEmpty ? (
                      <button
                        onClick={onAddPressHandeler}
                        className="text-white bg-fuchsia-700 hover:bg-fuchsia-800 focus:ring-4 focus:outline-none focus:ring-fuchsia-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-fuchsia-600 dark:hover:bg-fuchsia-700 dark:focus:ring-fuchsia-800"
                      >
                        <div>Add</div>
                      </button>
                    ) : (
                      <button
                        disabled={true}
                        onClick={onAddPressHandeler}
                        className="text-white bg-fuchsia-400 focus:ring-4 focus:outline-none focus:ring-fuchsia-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-fuchsia-600 dark:hover:bg-fuchsia-700 dark:focus:ring-fuchsia-800"
                      >
                        <div>Add</div>
                      </button>
                    )):(<button
                      onClick={onAddPressHandeler}
                      className="text-white bg-fuchsia-700 focus:ring-4 focus:outline-none focus:ring-fuchsia-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-fuchsia-600 dark:hover:bg-fuchsia-700 dark:focus:ring-fuchsia-800"
                    >
                      <div>Add</div>
                    </button>)}
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
