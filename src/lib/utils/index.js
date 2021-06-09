import { get } from "lodash";

const copyToClipboard = (content) => {
  if (get(window, "navigator.clipboard.writeText")) {
    window.navigator.clipboard.writeText(content).then(
      function () {
        alert("Contract address copied to clipboard: " + content);
      },
      function (err) {
        console.error(
          "Copy to clipboard failed",
          err
        );
      }
    );
  }
};

// Wallet handling
const getAddressLabel = (addr, num = 4) =>
  `${addr.substring(0, num)}...${addr.substring(addr.length - num)}`;

// Metamask
const enableWallet = () => window.ethereum.enable();
const installMetamask = () => window.open("https://metamask.io/");

export {
  copyToClipboard,
  enableWallet,
  getAddressLabel,
  installMetamask,
};