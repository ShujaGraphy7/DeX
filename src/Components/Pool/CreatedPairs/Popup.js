import { useState } from "react";
import { FaInfoCircle } from "react-icons/fa";
import { IoIosArrowBack } from "react-icons/io";

function Popup(props) {
  const [liquidity, setLiquidity] = useState("");


  const TokenAmountHandeler = (e) =>{
    setLiquidity(e.target.value);
  }
  return (
    <div aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="fixed inset-0 bg-black bg-opacity-10 backdrop-blur-sm transition-opacity"></div>

      <div className="fixed inset-0 z-10 overflow-y-auto my-20">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div className="relative transform overflow-auto rounded-lg bg-white text-center shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
            <div className="bg-fuchsia-50 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="px-4 py-1 xs:flex xs:flex-row-reverse justify-between items-center xs:px-2">
                <div></div>
                <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full bg-fuchsia-200 sm:mx-0 sm:h-16 sm:w-16">
                  <div className="text-fuchsia-700 text-2xl animate-pulse">
                    <FaInfoCircle />
                  </div>
                </div>
                <div>
                  <button
                    type="button"
                    onClick={props.close}
                    className="font-bold text-2xl text-fuchsia-600 sm:text-sm md:text-2xl hover:animate-pulse"
                  >
                    <IoIosArrowBack />
                  </button>
                </div>
              </div>
              <div className="my-5">
                <div className="my-5 py-2 bg-fuchsia-200 rounded-2xl">
                  <b>Token 1 Address:</b> {props.token1}
                </div> 
                <div className="my-5 py-2 bg-fuchsia-200 rounded-2xl">
                  <b>Token 2 Address:</b> {props.token2}
                </div>
                <div className="my-5 px-5 py-3 mx-auto bg-fuchsia-200 rounded-2xl w-fit">
                  <b>Pair Type</b> {props.tokenType}
                </div>
                <div className="relative my-2">
                        <input
                        onChange={TokenAmountHandeler}
                        type="number"
                        placeholder="Enter Tokens Amount"
                        className="block w-full p-3 text-lg text-fuchsia-900 border placeholder-fuchsia-300 border-fuchsia-300 rounded-lg bg-fuchsia-50 focus:ring-fuchsia-500 focus:border-fuchsia-500 dark:bg-fuchsia-700 dark:border-fuchsia-600 dark:placeholder-fuchsia-400 dark:text-white dark:focus:ring-fuchsia-500 dark:focus:border-fuchsia-500"
                        />
                        </div>
                  <button 

                  // onLiquidityInput={liquidity}
                  onClick={ ()=>{props.onLiquidityInput(liquidity); props.action()} }
                  className="text-white bg-fuchsia-700 hover:bg-fuchsia-800 focus:ring-4 focus:outline-none focus:ring-fuchsia-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-fuchsia-600 dark:hover:bg-fuchsia-700 dark:focus:ring-fuchsia-800">
                    Remove Liquidity
                  </button>
                  
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Popup;
