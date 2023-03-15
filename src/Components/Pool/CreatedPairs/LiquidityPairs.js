import React, { useState, useEffect } from "react";
import UniSwapRouter from "../../../ABIs/UniswapV2Router02.json";
import Token from "../../../ABIs/Token.json";
import Factory from "../../../ABIs/Factory.json";
import UniswapPair from "../../../ABIs/UniswapV2Pair.json";
import { useContract, useSigner } from "wagmi";
import { getAccount } from "@wagmi/core";
import { ethers } from "ethers";

function LiquidityPairs() {
  const { data: signer /* isError*/ } = useSigner();
  const Address = process.env.REACT_APP_CONTRACT_ADDRESS;
  const [factoryAddress, setFactoryAddress] = useState("");

  const [factoryAddressList, setFactoryAddressList] = useState([]);

  // const [pairAddress, ] = useState("");
  let account = getAccount();

  const [popup, setPopup] = useState(false);

  const toggle = () => {
    popup ? setPopup(false) : setPopup(true);
  };
  // Create Contract Instances;

  const RouterContract = useContract({
    address: Address,
    abi: UniSwapRouter,
    signerOrProvider: signer,
  });

  const PairContract = useContract({
    address: "0x5ca250112D7dBba895763d5b8478A9534589aa4D",
    abi: UniswapPair,
    signerOrProvider: signer,
  });
  console.log(PairContract)
  const FactoryContract = useContract({
    address: factoryAddress,
    abi: Factory,
    signerOrProvider: signer,
  });

  // ------------------------------------------------------------------- \\

  const AllPairs = async () => {
    setFactoryAddressList([]);
    try {
      await RouterContract?.factory().then(async (_Fac) => {
        setFactoryAddress(_Fac);
      });
    } catch (error) {
      console.log("error:", error);
    }
    let count = (await FactoryContract.allPairsLength()).toString();
    for (let i = 0; i < count; i++) {
      try {
        await FactoryContract?.allPairs(i).then((_res) => {
          setFactoryAddressList(prev => [...prev, _res]);
        });
      } catch (error) {
        console.log("error:", error);
      }
    }
    console.log(factoryAddressList);
    console.log(FactoryContract);
  };

  useEffect(() => {
    AllPairs();
  }, []);

  return (
    <div className="mx-10">
      <div className="m-10 rounded-2xl max-w-screen-sm mx-auto">
        <div className="text-white py-5 px-10 bg-[#0000003c] rounded-t-2xl md:flex md:justify-between items-center">
          <div className="xs:text-center">Available Liquidity Pairs</div>
          <div className="xs:text-center xs:mt-2">
            <button onClick={AllPairs}               className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
>
              Get Liquity Pairs List
            </button>
          </div>
        </div>
        <div className="p-4 bg-[#0000004c] rounded-b-2xl">
          {factoryAddressList.map((item, i) => (
        <div className="p-4 bg-[#ffffff1a] rounded-md mb-2">
            <li className="text-white" key={i}>
              {item}
            </li>
        </div>
          ))}
          </div>
      </div>
    </div>
  );
}

export default LiquidityPairs;
