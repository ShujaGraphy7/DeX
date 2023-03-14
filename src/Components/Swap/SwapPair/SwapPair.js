import React, { useState } from "react";
import { FaBalanceScaleRight } from "react-icons/fa";
import { IoIosArrowBack } from "react-icons/io";
import Settings from "./Settings/Settings";
import TokenPass from "./TokenPass";


function SwapPair(props) {
  

  const [tokenAdd1, setTokenAdd1] = useState("");
  const [tokenAdd2, setTokenAdd2] = useState("");


  const tokenAddpop1 = () => {
    tokenAdd1 ? setTokenAdd1(false) : setTokenAdd1(true);
  };
  const tokenAddpop2 = () => {
    tokenAdd2 ? setTokenAdd2(false) : setTokenAdd2(true);
  };

  return (
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
                <div>
                  <Settings />
                </div>
                <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full bg-fuchsia-200 sm:mx-0 sm:h-16 sm:w-16">
                  <div className="text-fuchsia-700 text-2xl animate-bounce">
                    <FaBalanceScaleRight />
                  </div>
                </div>
                <div>
                  <button
                    type="button"
                    onClick={props.closeLiquidityPopup}
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
                    Add Liquidity
                  </h3>
                  <div className="p-3 my-4 bg-fuchsia-100 rounded-lg">
                    <p className="text-sm text-fuchsia-700 ">
                      <b>Tip:</b> When you add liquidity, you will receive pool
                      tokens representing your position. These tokens
                      automatically earn fees proportional to your share of the
                      pool, and can be redeemed at any time.
                    </p>
                  </div>

                  <div className="relative my-2">
                    <input
                      type="number"
                      className="block w-full p-3 pr-44 text-lg text-fuchsia-900 border border-fuchsia-300 rounded-lg bg-fuchsia-50 focus:ring-fuchsia-500 focus:border-fuchsia-500 dark:bg-fuchsia-700 dark:border-fuchsia-600 dark:placeholder-fuchsia-400 dark:text-white dark:focus:ring-fuchsia-500 dark:focus:border-fuchsia-500"
                    />
                    <div>
                      <button
                        onClick={() => tokenAddpop1()}
                        className="text-white absolute right-2.5 bottom-2.5 bg-fuchsia-700 hover:bg-fuchsia-800 focus:ring-4 focus:outline-none focus:ring-fuchsia-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-fuchsia-600 dark:hover:bg-fuchsia-700 dark:focus:ring-fuchsia-800"
                      >
                        <div className="flex items-center">
                          <div>
                            <FaBalanceScaleRight />
                          </div>
                          <div>&nbsp;&nbsp; Select Token A</div>
                        </div>
                      </button>
                      {tokenAdd1 && (
                        <TokenPass close={tokenAddpop1} _name="A" />
                      )}
                    </div>
                  </div>

                  <div className="relative my-2">
                    <input
                      type="number"
                      className="block w-full p-3 pr-44 text-lg text-fuchsia-900 border border-fuchsia-300 rounded-lg bg-fuchsia-50 focus:ring-fuchsia-500 focus:border-fuchsia-500 dark:bg-fuchsia-700 dark:border-fuchsia-600 dark:placeholder-fuchsia-400 dark:text-white dark:focus:ring-fuchsia-500 dark:focus:border-fuchsia-500"
                    />
                    <div>
                      <button
                        onClick={() => tokenAddpop2()}
                        className="text-white absolute right-2.5 bottom-2.5 bg-fuchsia-700 hover:bg-fuchsia-800 focus:ring-4 focus:outline-none focus:ring-fuchsia-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-fuchsia-600 dark:hover:bg-fuchsia-700 dark:focus:ring-fuchsia-800"
                      >
                        <div className="flex items-center">
                          <div>
                            <FaBalanceScaleRight />
                          </div>
                          <div>&nbsp;&nbsp; Select Token B</div>
                        </div>
                      </button>
                      {tokenAdd2 && (
                        <TokenPass close={tokenAddpop2} _name="B" />
                      )}
                    </div>
                  </div>

                  <button className="text-white bg-fuchsia-700 hover:bg-fuchsia-800 focus:ring-4 focus:outline-none focus:ring-fuchsia-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-fuchsia-600 dark:hover:bg-fuchsia-700 dark:focus:ring-fuchsia-800">
                    <div>Approve</div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SwapPair;
