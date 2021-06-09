import React, { useState } from "react";
import { noop } from "lodash";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardText,
} from "reactstrap";
import { KYC } from "../../config/constants";

const ConnectWallet = ({ handleClick = noop, buttonLabel }) => {
  return (
    <Button
      onClick={handleClick}
      className="shadow-none"
      color="primary"
      style={{
        width: "100%",
        borderRadius: "12px",
        marginTop: "120px",
        background: "#4482D0",
      }}
    >
      {buttonLabel}
    </Button>
  );
};

const Savings = ({ onClick = noop }) => {
  return (
    <>
      {/****** My Wallet ******/}
      <CardText
        style={{
          fontWeight: "bold",
          marginTop: "-10px",
          marginBottom: "5px",
        }}
      >
        My Wallet
      </CardText>
      <Card
        style={{
          marginLeft: -15,
          marginRight: -15,
          padding: "5px 15px",
        }}
      >
        <CardText
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: "14px",
          }}
        >
          <div>
            <img
              src="https://rates.titans.finance/static/images/USDC.png"
              height="18px"
              style={{
                marginBottom: "3px",
                marginRight: "5px",
              }}
              alt=""
            />
            USDC
          </div>
          <div><b>1,300.14</b></div>
        </CardText>
      </Card>
      <Card
        style={{
          marginLeft: -15,
          marginRight: -15,
          padding: "5px 15px",
        }}
      >
        <CardText
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: "14px",
          }}
        >
          <div>
            <img
              src="https://rates.titans.finance/static/images/DAI.png"
              height="18px"
              style={{
                marginBottom: "3px",
                marginRight: "5px",
              }}
              alt=""
            />
            DAI
          </div>
          <div><b>5,088</b></div>
        </CardText>
      </Card>
      <Card
        style={{
          marginLeft: -15,
          marginRight: -15,
          padding: "5px 15px",
        }}
      >
        <CardText
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: "14px",
          }}
        >
          <div>
            <img
              src="https://rates.titans.finance/static/images/ETH.png"
              height="18px"
              style={{
                marginBottom: "3px",
                marginRight: "5px",
              }}
              alt=""
            />
            ETH
          </div>
          <div><b>3.123456789</b></div>
        </CardText>
      </Card>

      {/****** My Savings ******/}
      <CardText
        style={{
          fontWeight: "bold",
          marginTop: "15px",
          marginBottom: "5px",
        }}
      >
        Savings
      </CardText>
      <Card
        style={{
          marginLeft: -15,
          marginRight: -15,
          padding: "5px 15px",
        }}
      >
        <CardText
          style={{
            display: "flex",
            justifyItems: "center",
            justifyContent: "space-between",
            fontSize: "14px",
          }}
        >
          <div>
            <img
              src="https://rates.titans.finance/static/images/USDC.png"
              height="18px"
              style={{
                marginBottom: "3px",
                marginRight: "5px",
              }}
              alt=""
            />
            cUSDC
            <span
              style={{
                marginLeft: "5px",
                background: "#e0e0e0",
                fontSize: "10px",
                padding: "2px 5px",
              }}
            >
              APY: 6.4%
            </span>
          </div>
          <div>
            <b>100.14</b>
            {" "}
            <span
              style={{
                fontSize: "12px",
                color: "#23A632",
              }}
            >
              +2.13
            </span>
          </div>
        </CardText>
        <CardText
          style={{
            marginTop: -15,
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <div
            style={{
              marginRight: "10px",
              background: "#e0e0e0",
              fontSize: "12px",
              padding: "2px 5px",
            }}
          >
            Buy
          </div>
          <div
            style={{
              background: "#e0e0e0",
              fontSize: "12px",
              padding: "2px 5px",
            }}
          >
            Sell
          </div>
        </CardText>
      </Card>
      <Card
        style={{
          marginLeft: -15,
          marginRight: -15,
          padding: "5px 15px",
        }}
      >
        <CardText
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: "14px",
          }}
        >
          <div>
            <img
              src="https://rates.titans.finance/static/images/DAI.png"
              height="18px"
              style={{
                marginBottom: "3px",
                marginRight: "5px",
              }}
              alt=""
            />
            cDAI
            <span
              style={{
                marginLeft: "5px",
                background: "#e0e0e0",
                fontSize: "10px",
                padding: "2px 5px",
              }}
            >
              APY: 3.8%
            </span>
          </div>
          <div
            style={{
              background: "#e0e0e0",
              fontSize: "12px",
              padding: "2px 5px",
            }}
          >
            Buy
          </div>
        </CardText>
      </Card>
      <Card
        style={{
          marginLeft: -15,
          marginRight: -15,
          padding: "5px 15px",
        }}
      >
        <CardText
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: "14px",
          }}
        >
          <div>
            <img
              src="https://rates.titans.finance/static/images/ETH.png"
              height="18px"
              style={{
                marginBottom: "3px",
                marginRight: "5px",
              }}
              alt=""
            />
            cETH
            <span
              style={{
                marginLeft: "5px",
                background: "#e0e0e0",
                fontSize: "10px",
                padding: "2px 5px",
              }}
            >
              APY: 10.3%
            </span>
          </div>
          <div
            style={{
              background: "#e0e0e0",
              fontSize: "12px",
              padding: "2px 5px",
            }}
          >
            Buy
          </div>
        </CardText>
      </Card>
    </>
  );
};

const EntryCard = ({
  buttonLabel,
  handleClick = noop,
  wallet,
}) => {
  const [kyc, setKyc] = useState(false);
  console.log('zzz kyc:', kyc);
  const onClick = () => {
    window.open(`${KYC.url}`);
    setKyc(true);
  };
  return (
    <Card
      style={{
        minWidth: "320px",
        minHeight: "480px",
        borderRadius: "24px",
        filter: "drop-shadow(4px 8px 4px #ddd)",
        background: "#fafafa"
      }}
    >
      <CardHeader
        style={{
          fontSize: "18px",
          textAlign: "center",
          borderTopLeftRadius: "24px",
          borderTopRightRadius: "24px",
          background: "linear-gradient(to right, #4482D0, #0E4B98)",
          color: "white",
        }}
      >
        <b>CRYPTO SAVINGS APP</b>
        <br />
        <span style={{fontSize: "12px"}}><em>powered by APIS</em></span>
      </CardHeader>
      <CardBody>
        {
          wallet
          ? <Savings onClick={onClick} />
          : <ConnectWallet handleClick={handleClick} buttonLabel={buttonLabel} />
        }
      </CardBody>
    </Card>
  );
};

export default EntryCard;
