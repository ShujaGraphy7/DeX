import React, { useState } from "react";
import { FaBalanceScaleRight } from "react-icons/fa";
import Settings from "./SwapPair/Settings/Settings";
import TokenPass from "./SwapPair/TokenPass";
import {MdSwapVert} from "react-icons/md"
import UniSwapRouter from "../../ABIs/UniswapV2Router02.json";
import Token from "../../ABIs/Token.json";
import Factory from "../../ABIs/Factory.json";
import UniswapPair from "../../ABIs/UniswapV2Pair.json";
import { useContract, useSigner } from "wagmi";
import { getAccount } from "@wagmi/core";
import { ethers } from "ethers";

function SwapPair(props) {
  const { data: signer, isError } = useSigner();
  const Address = process.env.REACT_APP_CONTRACT_ADDRESS;
  const [factoryAddress, setFactoryAddress] = useState("");
  const [pairAddress, setPairAddress] = useState("");
  const account = getAccount();
  const [tokenAdd1, setTokenAdd1] = useState(false);
  const [tokenAdd2, setTokenAdd2] = useState(false);

  const [buttonText, setButtonText ] = useState("Connect Wallet");
  const [tokenAAmount, setTokenAAmount] = useState("");
  const [deadline, setDeadline] = useState(new Date());



  const tokenAddpop1 = () => {
    tokenAdd1 ? setTokenAdd1(false) : setTokenAdd1(true);
  };
  const tokenAddpop2 = () => {
    tokenAdd2 ? setTokenAdd2(false) : setTokenAdd2(true);
  };

  // Create Contract Instances;

  const RouterContract = useContract({
    address: Address,
    abi: UniSwapRouter,
    signerOrProvider: signer,
  });

  const FactoryContract = useContract({
    address: factoryAddress,
    abi: Factory,
    signerOrProvider: signer,
  });

  const PairContract = useContract({
    address: pairAddress,
    abi: UniswapPair,
    signerOrProvider: signer,
  });

  const TokenAContract = useContract({
    address: tokenAdd1,
    abi: Token,
    signerOrProvider: signer,
  });

  const TokenBContract = useContract({
    address: tokenAdd2,
    abi: Token,
    signerOrProvider: signer,
  });

  // ------------------------------------------------------------------- \\

  const tokenAamountHandel = (e) =>{
    setTokenAAmount(e.target.value);
    console.log(tokenAAmount)
  }
  const SwapExactTokensForTokens = async () => {
    try {
      const _amount = ethers.utils.parseEther(tokenAAmount.toString());
      console.log("Amount:", _amount);
      await TokenAContract?.approve(
        UniSwapRouter,
        ethers.utils.parseEther(tokenAAmount.toString())
      ).then((res) => {
        res.wait().then(async () => {
          await UniSwapRouter?.swapExactTokensForTokens(
            tokenAAmount,
            "0",
            [tokenAdd1, tokenAdd2],
            account.address,
            (deadline.getTime() / 1000 + 20 * 60).toFixed(0).toString()
          ).then((_swap) => {
            console.log("Swap Tokens:", _swap);
          });
        });
      });
    } catch (error) {
      console.log("error:", error);
    }
  };

  return (
    <>
      <div>
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div className="relative transform text-center shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
            <div className="bg-fuchsia-50 px-4 pt-5 pb-4 sm:p-6 sm:pb-4 rounded-md">
              <div className="px-4 py-1 xs:flex xs:flex-row-reverse justify-between items-center xs:px-2">
                <div>
                  <Settings />
                </div>
                <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full bg-fuchsia-200 sm:mx-0 sm:h-16 sm:w-16">
                  <div className="text-fuchsia-700 text-2xl animate-pulse">
                    <MdSwapVert />
                  </div>
                </div>
                <div></div>
              </div>

              <div>
                <div className="mt-3 text-center sm:mt-0 sm:ml-4">
                  <h3
                    className="text-lg font-medium leading-6 xs:text-center text-fuchsia-900"
                    id="modal-title"
                  >
                    Swap Pair
                  </h3>
                

                  <div className="relative my-2">
                    <input
                      onChange={tokenAamountHandel}
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
                    <div>{buttonText}</div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SwapPair;
