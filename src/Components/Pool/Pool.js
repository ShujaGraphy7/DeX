import Footer from "../Footer";
import Navbar from "../Navbar";
import CreateLiquidity from "./CreateLiquidity";
import MessageBox from "./MessageBox";
function Pool() {
  return (
    <>
      <div className="bg-gradient">
        <div className="bg-gradient-color">
          <Navbar />
          
            <MessageBox/>
            <CreateLiquidity/>

          <Footer />
        </div>
      </div>
    </>
  );
}

export default Pool;
