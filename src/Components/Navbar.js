import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useState } from "react";
import { Link } from "react-router-dom";


export default function Navbar() {
  const [navbar, setNavbar] = useState(false);

  return (
    <nav className={`w-full z-50 sticky backdrop-blur-sm bg-gradient-to-t from-[#0000004c] to-[#00000000]  ${
        navbar && "bg-[#0000004c] pb-3 backdrop-blur-md "
      }`}>
      <div className="justify-between px-4 mx-auto lg:max-w-7xl md:items-center md:flex md:px-8">
        <div>
          <div className="flex items-center justify-between py-3 md:py-5 md:block">
            <Link  to="/Swap">
              <h2 className="text-2xl font-bold text-white">KaizenSwap</h2>
            </Link>
            <div className="md:hidden">
              <button
                className="p-2 text-gray-700 rounded-md outline-none focus:border-gray-400 focus:border"
                onClick={() => setNavbar(!navbar)}
              >
                {navbar ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 text-white"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
        <div>
          <div
            className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${
              navbar ? "block" : "hidden"
            }`}
          >
            <ul className="items-center  justify-center space-y-8 md:flex md:space-x-6 md:space-y-0">
              <li className="text-white hover:text-indigo-200">
                <Link to="/Swap">Swap</Link>
              </li>
              <li className="text-white hover:text-indigo-200">
                <Link to="">Tokens</Link>
              </li>
              <li className="text-white hover:text-indigo-200">
                <Link to="">NFTs</Link>
              </li>
              <li className="text-white hover:text-indigo-200">
                <Link to="/Pool">Pool</Link>
              </li>
            </ul>

            <div className="mt-3 space-y-2 lg:hidden md:hidden">
              <div>
                <ConnectButton
                  label="Connect Me "
                  accountStatus={{
                    smallScreen: "avatar",
                    largeScreen: "full",
                  }}
                  showBalance={{
                    smallScreen: false,
                    largeScreen: true,
                  }}
                  chainStatus={"icon"}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="hidden space-x-2 md:inline-block">
          <div>
            <ConnectButton
              label="Connect Me "
              accountStatus={{
                smallScreen: "avatar",
                largeScreen: "full",
              }}
              showBalance={{
                smallScreen: false,
                largeScreen: true,
              }}
              chainStatus={"icon"}
            />
          </div>
        </div>

      </div>
    </nav>
  );
}
