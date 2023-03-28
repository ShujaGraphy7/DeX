import { useEffect, useState } from "react";
import { FaBalanceScaleRight } from "react-icons/fa";
import { IoIosArrowBack } from "react-icons/io";
import Settings from "./Settings/Settings";
import TokenPass from "./TokenPass";
import UniSwapRouter from "../../../ABIs/UniswapV2Router02.json";
import Token from "../../../ABIs/Token.json";
// import Factory from "../../../ABIs/Factory.json";
// import UniswapPair from "../../../ABIs/UniswapV2Pair.json";
import { useContract, useSigner } from "wagmi";
import { getAccount } from "@wagmi/core";
import { ethers } from "ethers";

function CreatePair(props) {
  const { data: signer /* isError*/ } = useSigner();
  const Address = process.env.REACT_APP_CONTRACT_ADDRESS;
  // const [factoryAddress, ] = useState("");
  // const [pairAddress, ] = useState("");
  let account = getAccount();

  // ---------------------U S E - E F F E C T S--------------------------- \\

  useEffect(() => {
    if (account.isConnected) {
      setCreatePairButton("Approve");
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


  const AddLiquidity = async () => {
    console.log("Add liquidity");
    setCreatePairButton("Approve");
    setDeadline(new Date());
    setCreatePairButton("Approving Token A...");

    try {
      await TokenAContract?.approve(
        Address,
        token1Value
      ).then((res) => {
        res.wait().then(async () => {
          setCreatePairButton("Approving Token B...");

          await TokenBContract?.approve(
            Address,
            token2Value
          ).then((res) => {
            res.wait().then(async () => {
              setCreatePairButton("Adding Liquidity...");

              await RouterContract?.addLiquidity(
                AddressA,
                AddressB,
                token1Value,
                token2Value,
                "0",
                "0",
                account.address,
                (deadline.getTime() / 1000 + 20 * 60).toFixed(0).toString()
              ).then((_res) => {
                _res.wait();
                setCreatePairButton("Liquidity Added...");
                setToken2Value("");
                setToken1Value("");

                setTokenAbutton("Select Token A");
                setTokenBbutton("Select Token B");
                setTimeout(() => {
                  props.closeLiquidityPopup();
                }, 2000);

                console.log("Liqudity add:", _res);
                props.closeLiquidityPopup();
              });
            });
          });
        });
      });
    } catch (error) {
      console.log("error:", error);
      setCreatePairButton("Liquidity Adding Failed...");
    }
  };

  const AddLiquidityETH = async () => {
    setCreatePairButton("Approve");
    setDeadline(new Date());
    setCreatePairButton("Approving...");

    try {
      await TokenBContract?.approve(
        Address,
        ethers.utils.parseEther(token2Value.toString())
      ).then((res) => {
        res.wait().then(async () => {
          setCreatePairButton("Adding Liquidity with ETH...");
          await RouterContract?.addLiquidityETH(
            AddressB,
            token2Value,
            "0",
            "0",
            account?.address,
            (deadline.getTime() / 1000 + 20 * 60).toFixed(0).toString(),
            { value: ethers.utils.parseEther(token1Value.toString()) }
          ).then((res) => {
            setCreatePairButton("Liquidity Added...");
            setToken2Value("");
            setToken1Value("");
            setTokenAbutton("Select Token A");
            setTokenBbutton("Select Token B");
            setTimeout(() => {
              props.closeLiquidityPopup();
            }, 2000);
          });
        });
      });
    } catch (error) {
      setCreatePairButton("Liquidity Adding Failed...");
      console.error("error:", error);
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
    <div aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="fixed inset-0 bg-black bg-opacity-10 backdrop-blur-sm transition-opacity"></div>

      <div className="fixed inset-0 z-10 overflow-y-auto my-20">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div className="relative transform overflow-auto rounded-lg bg-white text-center shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
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
                    className="font-bold text-2xl text-fuchsia-600 sm:text-sm md:text-2xl hover:animate-pulse"
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
                    {tokenAbutton !== "ETH" ? (
                      <input
                        value={token1Value}
                        onChange={Token1ValueHandeler}
                        type="number"
                        min="0"
                        placeholder="Enter Token Amount"
                        className="block w-full p-3 pr-44 text-lg text-fuchsia-900 placeholder:text-fuchsia-300 border border-fuchsia-300 rounded-lg bg-fuchsia-50 focus:ring-fuchsia-500 focus:border-fuchsia-500 dark:bg-fuchsia-700 dark:border-fuchsia-600 dark:placeholder-fuchsia-400 dark:text-white dark:focus:ring-fuchsia-500 dark:focus:border-fuchsia-500"
                      />
                    ) : (
                      <input
                        value={token1Value}
                        onChange={Token1ValueHandeler}
                        type="number"
                        min="0"
                        placeholder="Enter ETH"
                        className="block w-full p-3 pr-44 text-lg text-fuchsia-900 placeholder:text-fuchsia-300 border border-fuchsia-300 rounded-lg bg-fuchsia-50 focus:ring-fuchsia-500 focus:border-fuchsia-500 dark:bg-fuchsia-700 dark:border-fuchsia-600 dark:placeholder-fuchsia-400 dark:text-white dark:focus:ring-fuchsia-500 dark:focus:border-fuchsia-500"
                      />
                    )}
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
                      value={token2Value}
                      onChange={Token2ValueHandeler}
                      type="number"
                      placeholder={
                        tokenAbutton === "ETH"
                          ? "Enter ETH Amount"
                          : "Enter Token Amount"
                      }
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
                  {token2Value <= 0 ||
                  tokenAbutton === "Select Token A" ||
                  tokenBbutton === "Select Token B" ? (
                    <button
                      disabled={true}
                      className="text-white bg-fuchsia-400 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-4 py-2 dark:bg-fuchsia-600 dark:hover:bg-fuchsia-700 dark:focus:ring-fuchsia-800"
                    >
                      {createPairButton}
                    </button>
                  ) : tokenAbutton === "ETH" || tokenBbutton === "ETH" ? (
                    <button
                      onClick={AddLiquidityETH}
                      className="text-white bg-fuchsia-700 hover:bg-fuchsia-800 focus:ring-4 focus:outline-none focus:ring-fuchsia-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-fuchsia-600 dark:hover:bg-fuchsia-700 dark:focus:ring-fuchsia-800"
                    >
                      {createPairButton}
                    </button>
                  ) : (
                    <button
                      onClick={AddLiquidity}
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
      </div>
    </div>
  );
}

export default CreatePair;
