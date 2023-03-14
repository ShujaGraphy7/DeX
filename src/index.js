import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "@rainbow-me/rainbowkit/styles.css";
import {BrowserRouter} from "react-router-dom";
import {
  darkTheme,
  getDefaultWallets,
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import {
  mainnet,
  polygon,
  optimism,
  arbitrum,
  goerli,
  hardhat,
  polygonMumbai,
} from "wagmi/chains";
// import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";

const { chains, provider } = configureChains(
  [mainnet, polygon, optimism, arbitrum, goerli, hardhat, polygonMumbai],
  [
    // alchemyProvider({ apiKey: process.env.ALCHEMY_ID }),
    publicProvider(),
  ]
);

const { connectors } = getDefaultWallets({
  appName: "My RainbowKit App",
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <WagmiConfig client={wagmiClient}>
    <BrowserRouter>
      <RainbowKitProvider
        chains={chains}
        modalSize={{
          smallScreen: "compact",
          largeScreen: "wide",
        }}
        theme={darkTheme({
          accentColor: "#711D7A",
          accentColorForeground: "white",
          overlayBlur: "small",
          borderRadius: "small",
        })}
      >
        <App />
      </RainbowKitProvider>
    </BrowserRouter>
  </WagmiConfig>
);
reportWebVitals();
