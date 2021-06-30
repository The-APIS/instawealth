import React, { useState, useEffect } from "react";
import SDK from "@dapis/sdk/src/compoundSDK";
import { get, noop, cloneDeep } from "lodash";
import {NavContext} from '../../context/NavContext';
import {SDKContext, TokenNameContext} from '../../context/SDKContext';
// import { useSelector, useDispatch } from 'react-redux';
// import { Card, Button, CardTitle, CardText } from 'reactstrap';

import {EntryCard, InvestLayout, WithdrawLayout} from "./component";
import { NETWORK_NAMES } from "../../config/constants";
import {
  copyToClipboard,
  enableWallet,
  getAddressLabel,
  installMetamask,
} from "../../lib/utils";

const Entry = ({
  minutes = 5, // default timeframe is 5 min
}) => {
  const hasEthereum =
    typeof window !== "undefined" && typeof window.ethereum !== "undefined";
  const networkId = Number(get(window, "ethereum.networkVersion"));
  const selectedAddress = get(window, "ethereum.selectedAddress", "");

  const [count, setCount] = useState(0);
  const [tokens, setTokens] = useState([]);
  const [balances, setBalances] = useState({});
  const [yieldBalances, setYieldBalances] = useState({});
  const [yieldsEarned, setYieldsEarned] = useState({});
  const [APYs, setAPYs] = useState({});

  //SDK, Nav and TokenName for invest and Withdraw
  const [sdk, setsdk] = useState(new SDK());
  const [route, setRoute] = useState('home');
  const [tokenName, settokenName] = useState('ETH');

  console.log("zzz tokens:", tokens);
  console.log("zzz balances:", balances);
  console.log("zzz yieldBalances:", yieldBalances);
  console.log("zzz yieldsEarned:", yieldsEarned);
  console.log("zzz APYs:", APYs);


  useEffect(() => {
    // Connect Web3
    if (window && window.ethereum) {
      window.ethereum.on("accountsChanged", (account) => {
        console.log("accountsChanged: ", account);
        setCount(count + 1);
      });
    }
    if (hasEthereum && !networkId) {
      // Network ID not retrieved yet, wait a bit then try again
      setTimeout(() => {
        console.log("Wait for networkId to become available...");
        setCount(count + 1);
      }, 1000);
    }

    // Connect SDK
    const getTokens = async () => {
      try {
        await sdk.init();
        const supportedTokens = sdk.getSupportedTokens();
        console.log("zzzz supportedTokens:", supportedTokens);
        // get balances
        const allBalances = {};
        const allYieldBalances = {};
        const allAPYs = {};
        const allYieldsEarned = {};
        const getBalance = async (token) => {
          const name = token.name;
          const decimal = await sdk.getDecimals(name);
          console.log("zzz getting balance for:", name);
          allBalances[name] = await sdk.getBalance(name) / 10**decimal;
          allAPYs[name] = await sdk.getAPY(name);
          console.log("balance of " + name + " is "+ allBalances[name]);
          // All cTokens have 8 decimals
          allYieldBalances[name] = (await sdk.getInvestBalance(name)) / (10**8);
          // TODO: add yield token balances
          // TODO: add yield earned
        }
        const allTokens = cloneDeep(supportedTokens);
        allTokens.push({ name: "ETH" });
        await Promise.all(allTokens.map(token => getBalance(token)));
        setBalances(allBalances);
        setAPYs(allAPYs);
        setYieldBalances(allYieldBalances);
        setYieldsEarned(allYieldsEarned);

        // save token list
        setTokens(allTokens);

      } catch (error) {
        console.error("Failed to retrieve supported tokens and balances:", error);
      }
    };
    getTokens();

  }, [count, networkId, hasEthereum, selectedAddress, sdk]);

  let onClick = noop;
  let buttonLabel = "Checking connection...";

  if (!hasEthereum) {
    console.log("No metamask installed");
    buttonLabel = "Install Metamask";
    onClick = installMetamask;
  } else {
    buttonLabel = "Connect Wallet";
    onClick = enableWallet;
  }

  const handleClick = async () => {
    enableWallet();
    await onClick();
  };

  return (
    <div>
      <div>
        <SDKContext.Provider value={sdk}>
          <NavContext.Provider value={{ route, setRoute }}>
              <TokenNameContext.Provider value={{tokenName, settokenName}}>
                <NavContext.Consumer>
                  {({ route }) => {
                    switch(route) {
                      case 'invest': 
                        return <InvestLayout 

                        /> 
                      case 'withdraw': 
                        return <WithdrawLayout
                        />
                      default: 
                      return <EntryCard
                        buttonLabel={buttonLabel}
                        handleClick={handleClick}
                        wallet={selectedAddress}
                        tokens={tokens}
                        balances={balances}
                        APYs={APYs}
                        yieldBalances={yieldBalances}
                        yieldsEarned={yieldsEarned}
                      /> 
                    }
                  }}
                </NavContext.Consumer>
              </TokenNameContext.Provider>
          </NavContext.Provider>
        </SDKContext.Provider>
      </div>
      <div
        onClick={selectedAddress ? () => copyToClipboard(selectedAddress) : noop}
        style={{
          fontSize: "12px",
          textAlign: "center",
          marginTop: "40px",
          cursor: "pointer",
        }}
      >
        { selectedAddress
            ? `${NETWORK_NAMES.eth[networkId.toString()] || "Unknown network"} wallet connected: ${getAddressLabel(selectedAddress)}`
            : `Waiting for wallet connection...`
        }
      </div>
    </div>
  );
};

export default Entry;
