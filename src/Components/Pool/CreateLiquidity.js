import React, { useState } from "react";
import { GiLinkedRings } from "react-icons/gi";
import CreatePair from "./CreatePair/CreatePair";

function CreateLiquidity() {
  const [popup, setPopup] = useState(false);

  const toggle = () => {
    popup ? setPopup(false) : setPopup(true);
  };
  
  return (
    <div className="mx-10">
      <div className="m-10 rounded-2xl max-w-screen-sm mx-auto">
        <div className="text-white py-5 px-10 bg-[#0000003c] rounded-2xl md:flex md:justify-between items-center">
          <div className="xs:text-center">Your V2 Liquidity</div>
          <div className="xs:text-center xs:my-2">
            <button
              onClick={() => toggle()}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
            >
              <span>
                <GiLinkedRings />
              </span>
              <span>&nbsp;&nbsp; Create A Pair</span>
            </button>
          </div>
        </div>
        {popup ? <CreatePair closeLiquidityPopup={toggle} /> : ""}
      </div>
    </div>
  );
}

export default CreateLiquidity;
