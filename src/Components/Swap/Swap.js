import Footer from "../Footer";
import Navbar from "../Navbar";
import SwapPair from "./SwapPair";

function Pool() {
  return (
    <>
      <div className="bg-gradient">
        <div className="bg-gradient-color">
          <Navbar />
          
            <SwapPair/>

          <Footer />
        </div>
      </div>
    </>
  );
}

export default Pool;
