import React, { useState, useEffect } from "react";
import { get, noop } from "lodash";
// import { useSelector, useDispatch } from 'react-redux';
// import { Card, Button, CardTitle, CardText } from 'reactstrap';

import EntryCard from "./component";
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

  useEffect(() => {
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
  }, [count, networkId, hasEthereum, selectedAddress]);

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
      <EntryCard
        buttonLabel={buttonLabel}
        handleClick={handleClick}
        wallet={selectedAddress}
      />
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
