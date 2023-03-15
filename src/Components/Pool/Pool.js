import Footer from "../Footer";
import Navbar from "../Navbar";
import CreateLiquidity from "./CreateLiquidity";
import LiquidityPairs from "./CreatedPairs/LiquidityPairs";
import MessageBox from "./MessageBox";
function Pool() {
  return (
    <>
      <div className="bg-gradient">
        <div className="bg-gradient-color">
          <Navbar />
          
            <MessageBox/>
            <CreateLiquidity/>
            <LiquidityPairs/>

          <Footer />
        </div>
      </div>
    </>
  );
}

export default Pool;
