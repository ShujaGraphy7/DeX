import { useEffect, useState } from "react";
import { FaExchangeAlt } from "react-icons/fa";
import Settings from "./SwapPair/Settings/Settings";
import TokenPass from "./SwapPair/TokenPass";
import UniSwapRouter from "../../ABIs/UniswapV2Router02.json";
import Token from "../../ABIs/Token.json";
import { useContract, useSigner } from "wagmi";
import { getAccount } from "@wagmi/core";
import { ethers } from "ethers";
import "../../styles.css"
function CreatePair(props) {
  const { data: signer /* isError*/ } = useSigner();
  const Address = process.env.REACT_APP_CONTRACT_ADDRESS;
  let account = getAccount();

  // ---------------------U S E - E F F E C T S--------------------------- \\

  useEffect(() => {
    if (account.isConnected) {
      setCreatePairButton("Create Pair");
    } else {
      setCreatePairButton("Connect Wallet");
    }
  }, [account.isConnected]);

  // ---------------U S E   S T A T E S---------------------------------- \\

  const [createPairButton, setCreatePairButton] = useState("");

  const [tokenAdd1Popup, settokenAdd1Popup] = useState(false);
  const [tokenAdd2Popup, settokenAdd2Popup] = useState(false);

  const [token1Value, setToken1Value] = useState("0");
  const [token2Value, setToken2Value] = useState("0");

  const [AddressA, setAddressA] = useState("");
  const [AddressB, setAddressB] = useState("");

  const [tokenAbutton, setTokenAbutton] = useState("Select Token A");
  const [tokenBbutton, setTokenBbutton] = useState("Select Token B");

  const [deadline, setDeadline] = useState(new Date());

  // ------------------------------------------------------------ \\

  //  ------------------I N P U T   H A N D E L E R S------------------------------ \\

  const Token1ValueHandeler = (e) => {
    setToken1Value(e.target.value);
    console.log(token1Value);
  };

  const Token2ValueHandeler = (e) => {
    setToken2Value(e.target.value);
    console.log(token2Value);
  };

  // ----------------------------------------------------------- \\

  // ------------------P O P U P   H A N D E L E R S---------------------------- \\

  const tokenAddpop1 = () => {
    tokenAdd1Popup ? settokenAdd1Popup(false) : settokenAdd1Popup(true);
  };
  const tokenAddpop2 = () => {
    tokenAdd2Popup ? settokenAdd2Popup(false) : settokenAdd2Popup(true);
  };

  // ------------------------------------------------------ \\

  // Create Contract Instances;

  const RouterContract = useContract({
    address: Address,
    abi: UniSwapRouter,
    signerOrProvider: signer,
  });

  // const FactoryContract = useContract({
  //   address: factoryAddress,
  //   abi: Factory,
  //   signerOrProvider: signer,
  // });

  // const PairContract = useContract({
  //   address: pairAddress,
  //   abi: UniswapPair,
  //   signerOrProvider: signer,
  // });

  const TokenAContract = useContract({
    address: AddressA,
    abi: Token,
    signerOrProvider: signer,
  });

  const TokenBContract = useContract({
    address: AddressB,
    abi: Token,
    signerOrProvider: signer,
  });
  
  // ------------------------------------------------------------------- \\

  // ------------------------------------------------------------------- \\

  const SwapExactTokensForTokens = async () => {
    setCreatePairButton("Swaping...")
    try {
        const _amount = ethers.utils.parseEther(token1Value.toString())
        console.log("Amount:", _amount);
        setCreatePairButton("Approving...")

        await TokenAContract
            ?.approve(Address, ethers.utils.parseEther(token1Value.toString()))
            .then((_app) => {
                _app.wait().then(async () => {
                  setCreatePairButton("Swaping...")

                    await RouterContract
                        ?.swapExactTokensForTokens(token1Value, "0", [AddressA, AddressB], account.address, (((deadline.getTime() / 1000) + 20 * 60).toFixed(0)).toString())
                        .then((_swap) => {
                            console.log("Swap Tokens:", _swap);
                        })
                })
            })
            setCreatePairButton("Create Pair")


    } catch (error) {
      setCreatePairButton("Error...")

        console.log("error:", error);
    }
};

const SwapETHForExactTokens = async () => {
  try {
      await RouterContract
          ?.WETH().then(async (_add) => {
              console.log("Address:", _add)

              await RouterContract
                  ?.getAmountsOut(ethers.utils.parseEther(token1Value.toString()), [_add, AddressA]).then(async (amountOut) => {
                      console.log("Amount out:", amountOut[1].toString())

                      await RouterContract
                          ?.swapETHForExactTokens(amountOut[1].toString(), [_add, AddressA], account.address, (((deadline.getTime() / 1000) + 20 * 60).toFixed(0)).toString(), { value: ethers.utils.parseEther(token1Value.toString()) })
                          .then((Swap) => {
                              console.log("Swap ETH:", Swap);
                          })
                  })
          })

  } catch (error) {
      console.log("error:", error);
  }
};
  // ------------------------------------------------------ \\

  const getAddressA = (add) => {
    setAddressA(add);
    AddressA?.length === 42
      ? setTokenAbutton(AddressA.slice("", 6) + "..." + AddressA.slice(-6))
      : AddressA?.length === 3
      ? setTokenAbutton("ETH")
      : setTokenAbutton("Select Token A");
    console.log(AddressA);
    AddressA && settokenAdd1Popup(false);
  };

  const getAddressB = (add) => {
    setAddressB(add);
    AddressB.length === 42
      ? setTokenBbutton(AddressB.slice("", 6) + "..." + AddressB.slice(-6))
      : AddressB?.length === 3
      ? setTokenBbutton("ETH")
      : setTokenBbutton("Select Token B");
    console.log(AddressB);
    AddressB && settokenAdd2Popup(false);
  };

  return (
    <>
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div className="relative transform overflow-auto rounded-lg bg-white text-center shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
            <div className="bg-fuchsia-50 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="px-4 py-1 xs:flex xs:flex-row-reverse justify-between items-center xs:px-2">
                <div>
                  <Settings />
                </div>
                <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full bg-fuchsia-200 sm:mx-0 sm:h-16 sm:w-16">
                  <div className="text-fuchsia-700 text-2xl animate-pulse">
                    <FaExchangeAlt />
                  </div>
                </div>
                <div>
                  
                </div>
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
                      onChange={Token1ValueHandeler}
                      type="number"
                      min="0"
                      placeholder="Enter Token Amount"
                      className="block w-full p-3 pr-44 text-lg text-fuchsia-900 placeholder:text-fuchsia-300 border border-fuchsia-300 rounded-lg bg-fuchsia-50 focus:ring-fuchsia-500 focus:border-fuchsia-500 dark:bg-fuchsia-700 dark:border-fuchsia-600 dark:placeholder-fuchsia-400 dark:text-white dark:focus:ring-fuchsia-500 dark:focus:border-fuchsia-500"
                    />
                    <div>
                      <button
                        onClick={() => tokenAddpop1()}
                        className="text-white absolute right-2.5 bottom-2.5 bg-fuchsia-700 hover:bg-fuchsia-800 focus:ring-4 focus:outline-none focus:ring-fuchsia-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-fuchsia-600 dark:hover:bg-fuchsia-700 dark:focus:ring-fuchsia-800"
                      >
                        <div className="flex items-center">
                          <div>&nbsp;&nbsp; {tokenAbutton}</div>
                        </div>
                      </button>
                      {tokenAdd1Popup && (
                        <TokenPass
                          close={tokenAddpop1}
                          _name="A"
                          onAddPress={getAddressA}
                        />
                      )}
                    </div>
                  </div>

                  <div className="relative my-2">
                    <input
                      onChange={Token2ValueHandeler}
                      type="number"
                      placeholder="Enter Token Amount"
                      min="0"
                      className="block placeholder:text-fuchsia-300 w-full p-3 pr-44 text-lg text-fuchsia-900 border border-fuchsia-300 rounded-lg bg-fuchsia-50 focus:ring-fuchsia-500 focus:border-fuchsia-500 dark:bg-fuchsia-700 dark:border-fuchsia-600 dark:placeholder-fuchsia-400 dark:text-white dark:focus:ring-fuchsia-500 dark:focus:border-fuchsia-500"
                    />
                    <div>
                      <button
                        onClick={() => tokenAddpop2()}
                        className="text-white absolute right-2.5 bottom-2.5 bg-fuchsia-700 hover:bg-fuchsia-800 focus:ring-4 focus:outline-none focus:ring-fuchsia-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-fuchsia-600 dark:hover:bg-fuchsia-700 dark:focus:ring-fuchsia-800"
                      >
                        <div className="flex items-center">
                          <div>&nbsp;&nbsp; {tokenBbutton}</div>
                        </div>
                      </button>
                      {tokenAdd2Popup && (
                        <TokenPass
                          close={tokenAddpop2}
                          _name="B"
                          onAddPress={getAddressB}
                        />
                      )}
                    </div>
                  </div>
                  {token1Value <= 0 || token2Value <= 0 ? (
                    <button
                      disabled={true}
                      className="text-white bg-fuchsia-400 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-4 py-2 dark:bg-fuchsia-600 dark:hover:bg-fuchsia-700 dark:focus:ring-fuchsia-800"
                    >
                      {createPairButton}
                    </button>
                  ) : tokenAbutton == "ETH" || tokenBbutton == "ETH" ? (
                    <button
                      onClick={SwapETHForExactTokens}
                      className="text-white bg-fuchsia-700 hover:bg-fuchsia-800 focus:ring-4 focus:outline-none focus:ring-fuchsia-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-fuchsia-600 dark:hover:bg-fuchsia-700 dark:focus:ring-fuchsia-800"
                    >
                      {createPairButton}
                    </button>
                  ) : (
                    <button
                      onClick={SwapExactTokensForTokens}
                      className="text-white bg-fuchsia-700 hover:bg-fuchsia-800 focus:ring-4 focus:outline-none focus:ring-fuchsia-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-fuchsia-600 dark:hover:bg-fuchsia-700 dark:focus:ring-fuchsia-800"
                    >
                      {createPairButton}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        </>
  );
}

export default CreatePair;
