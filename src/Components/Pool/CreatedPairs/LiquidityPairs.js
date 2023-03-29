import React, { useState } from "react";
import UniSwapRouter from "../../../ABIs/UniswapV2Router02.json";
// import Token from "../../../ABIs/Token.json";
import Factory from "../../../ABIs/Factory.json";
import UniswapPair from "../../../ABIs/UniswapV2Pair.json";
import { useContract, useSigner } from "wagmi";
import { getAccount } from "@wagmi/core";
import { ethers } from "ethers";
import Popup from "./Popup";

function LiquidityPairs() {
  const { data: signer /* isError*/ } = useSigner();
  const Address = process.env.REACT_APP_CONTRACT_ADDRESS;
  const [factoryAddress, setFactoryAddress] = useState("");
  const [popPairDetails, setPopPairDetails] = useState(false);
  const [token1Address, setToken1Address] = useState("");
  const [token2Address, setToken2Address] = useState("");
  const [pairType, setPairType] = useState("");
  const [pairAddress, setPairAddress] = useState("");
  const [liquidity, setLiquidity] = useState("");
  const [deadline, setDeadline] = useState(new Date());
  const [WETH, setWETH] = useState("");
  

  const popPairToggle = (item) => {
    popPairDetails ? setPopPairDetails(false) : setPopPairDetails(true);
    detailPopup(item);
  };

  const [factoryAddressList, setFactoryAddressList] = useState([]);

  // const [pairAddress, ] = useState("");
  let account = getAccount();

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

  // ------------------------------------------------------------------- \\

  const AllPairs = async () => {
    setFactoryAddressList([]);
    let _FactoryContract;
    try {
      await RouterContract?.factory().then(async (_Fac) => {
        _FactoryContract = new ethers.Contract(_Fac,Factory,signer);
      });
    } catch (error) {
      console.log("error:", error);
    }
    let count = (await _FactoryContract.allPairsLength()).toString();
    for (let i = 0; i < count; i++) {
      try {
        await _FactoryContract?.allPairs(i).then(async (_res) => {
          const PairContract = new ethers.Contract(_res, UniswapPair, signer);
          if((await PairContract.balanceOf(account.address)).toString() >0 ){
            setFactoryAddressList((prev) => [...prev, PairContract]);
          }
        });
      } catch (error) {
        console.log("error:", error);
      }
    }
    
  };

  const RemoveLiquidity = async () => {
    
    try {
      //it will get the factory address from the router contract
      await RouterContract?.factory().then(async (_address) => {
        console.log("Address:", _address);
        setFactoryAddress(_address);
        // it will get the pair address of the input tokens from the factory contract
        await FactoryContract?.getPair(token1Address, token2Address).then(async (_Address) => {
          console.log("Address:", _Address);
          setPairAddress(_Address);
          //it will get approve of the lp tokens to uniswap contract from pair contract
          await PairContract
            ?.approve(
              Address,
              ethers.utils.parseEther(liquidity.toString())
            )
            .then((liquidityAllowance) => {
              liquidityAllowance.wait().then(async () => {
                //it will then call removeLiquidity function from the uniswap
                await RouterContract
                  ?.removeLiquidity(
                    token1Address,
                    token2Address,
                    liquidity,
                    "0",
                    "0",
                    account.address,
                    (deadline.getTime() / 1000 + 20 * 60).toFixed(0).toString()
                  )
                  .then((remove) => {
                    console.log("Liquidity Removed:", remove);
                  });
              });
            });
        });
      });
    } catch (_err) {
      console.log("Error:", _err);
    }
  };
  
  //remove liquidity ETH function
  const RemoveLiquidityETH = async () => {
    setDeadline(new Date());
    try {
      //it will get the WETH address from the router contract
      await RouterContract?.WETH().then(async (_address) => {
        console.log("Address:", _address);
        setWETH(_address);
        await RouterContract?.factory().then(async (_fac) => {
          console.log("Address:", _fac);
          setFactoryAddress(_fac);
          await FactoryContract?.getPair(WETH, token2Address).then(async (_Address) => {
            console.log("Address:", _Address);
            setPairAddress(_Address);
            await PairContract
              ?.approve(
                Address,
                ethers.utils.parseEther(liquidity.toString())
              )
              .then((Approval) => {
                Approval.wait().then(async () => {
                  await RouterContract
                    ?.removeLiquidityETH(
                      token2Address,
                      liquidity,
                      "0",
                      "0",
                      account.address,
                      (deadline.getTime() / 1000 + 20 * 60)
                        .toFixed(0)
                        .toString()
                    )
                    .then((Removed) => {
                      console.log("Removed liquidity:", Removed);
                    });
                });
              });
          });
        });
      });
    } catch (_err) {
      console.log("Error:", _err);
    }
  };

  const detailPopup = async (item) => {
    await item.token0().then((res) => {
      setToken1Address(res.toString());
    });

    await item.token1().then((res) => {
      setToken2Address(res.toString());
    });

    if (WETH === token1Address || WETH === token2Address) {
      setPairType("ETH-Token");
    } else if(WETH !== token1Address || WETH !== token2Address){
      setPairType("Token-Token");
    }

  };

  const removeLiquidityBTN=()=>{
    if(pairType === "ETH-Token"){
      RemoveLiquidityETH();
    }
    else if(pairType === "Token-Token"){
      RemoveLiquidity();
    }
  }

  const liquidityHandel =(val)=>{
    setLiquidity(val);
  }

  return (
    <div className="mx-10">
      <div className="m-10 rounded-2xl max-w-screen-sm mx-auto">
        <div className="text-white py-5 px-10 bg-[#0000003c] rounded-t-2xl md:flex md:justify-between items-center">
          <div className="xs:text-center">Available Liquidity Pairs</div>
          <div className="xs:text-center xs:mt-2">
            <button
              onClick={AllPairs}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
            >
              Get Liquity Pairs List
            </button>
          </div>
        </div>
        <div className="p-4 bg-[#0000004c] rounded-b-2xl">
          {factoryAddressList.map((item, i) => (
            <div key={i} className="p-4 bg-[#ffffff1a] rounded-md mb-2 flex items-center justify-around">
              <div>
                <ul className="text-white" >
                  <b>Pair Address:</b> {item.address}
                </ul>
              </div>
              <div>
                <button
                  onClick={() => popPairToggle(item)}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-2 rounded inline-flex items-center"
                >
                  Details
                </button>
              </div>
            </div>
          ))}
          {popPairDetails && (
            <Popup
              onLiquidityInput = {liquidityHandel}
              tokenType={pairType}
              token1={token1Address}
              token2={token2Address}
              action={removeLiquidityBTN}
              close={() => setPopPairDetails(false)}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default LiquidityPairs;
