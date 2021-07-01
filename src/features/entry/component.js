import React from "react";
import {useContext, useState} from "react";
import { noop } from "lodash";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardText,
} from "reactstrap";
import {NavContext} from '../../context/NavContext';
import {SDKContext, TokenNameContext} from '../../context/SDKContext';

const ConnectWallet = ({
  handleClick = noop,
  buttonLabel,
}) => {
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

const MyWalletRows = ({
  tokens = [],
  balances = {},
}) => {
  const Rows = tokens.map(token => {
    const { name } = token;
    const balance = balances[name];
    if (balance > 0) {
      return (
        <Card
          style={{
            marginLeft: -15,
            marginRight: -15,
            padding: "5px 15px",
          }}
          key={name}
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
                src={`https://rates.titans.finance/static/images/${name}.png`}
                height="18px"
                style={{
                  marginBottom: "3px",
                  marginRight: "5px",
                }}
                alt=""
              />
              {name}
            </div>
            <div><b>{balance}</b></div>
          </CardText>
        </Card>
      );
    }
    return null;
  });
  return (
    <>
      {Rows}
    </>
  )
};

const SavingsRows = ({
  tokens = [],
  APYs = {},
  yieldBalances = {},
  yieldsEarned = {},
}) => {

  const {setRoute} = useContext(NavContext);
  const {settokenName} = useContext(TokenNameContext);
  // TODO: should use actual cToken balances here
  const Rows = tokens.map(token => {
    const { name } = token;
    const apy = Number(APYs[name]).toFixed(1);
    const balance = Number(yieldBalances[name]).toFixed(10);
    const earned = yieldsEarned[name];
    const defaultValue = "0";
    const handleBuy = () =>{
      settokenName(name);
      setRoute('invest');
    }
    const handleSell = () =>{
      settokenName(name);
      setRoute('withdraw');
    }
    
    return(
      <Card
        style={{
          marginLeft: -15,
          marginRight: -15,
          padding: "5px 15px",
        }}
        key={name}
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
              src={`https://rates.titans.finance/static/images/${name}.png`}
              height="18px"
              style={{
                marginBottom: "3px",
                marginRight: "5px",
              }}
              alt=""
            />
            {name}
            <span
              style={{
                marginLeft: "5px",
                background: "#e0e0e0",
                fontSize: "10px",
                padding: "2px 5px",
              }}
            >
              APY: {apy}%
            </span>
          </div>
          <div>
            <b>{balance || defaultValue}</b>
            {" "}
            <span
              style={{
                fontSize: "12px",
                color: "#23A632",
              }}
            >
              {earned || defaultValue}
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
            onClick={handleBuy}
          >
            Buy
          </div>
          <div
            style={{
              background: "#e0e0e0",
              fontSize: "12px",
              padding: "2px 5px",
            }}
            onClick={handleSell}
          >
            Sell
          </div>
        </CardText>
      </Card>
    );
  });
  return (
    <>
      {Rows}
    </>
  );
};

const Savings = ({
  tokens = [],
  balances = {},
  APYs = {},
  yieldBalances = {},
  yieldsEarned = {},
}) => {
  return (
    <>
      <CardText
        style={{
          fontWeight: "bold",
          marginTop: "-10px",
          marginBottom: "5px",
        }}
      >
        My Wallet
      </CardText>
      <MyWalletRows tokens={tokens} balances={balances} />

      <CardText
        style={{
          fontWeight: "bold",
          marginTop: "15px",
          marginBottom: "5px",
        }}
      >
        Savings
      </CardText>
      <SavingsRows
        tokens={tokens}
        APYs={APYs}
        yieldBalances={yieldBalances}
        yieldsEarned={yieldsEarned}
      />
    </>
  );
};


const EntryCard = ({
  buttonLabel,
  handleClick = noop,
  wallet,
  tokens = [],
  balances = {},
  APYs = {},
  yieldBalances = {},
  yieldsEarned = {},
}) => {
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
          ? tokens.length > 0
            ? <Savings
                tokens={tokens}
                balances={balances}
                APYs={APYs}
                yieldBalances={yieldBalances}
                yieldsEarned={yieldsEarned}
              />
            : <div style={{ textAlign: "center" }}>Retrieving account info......</div>
          : <ConnectWallet handleClick={handleClick} buttonLabel={buttonLabel} />
        }
      </CardBody>
    </Card>
  );
};

const InvestLayout = () => {
  const sdk = useContext(SDKContext);
  const {tokenName} = useContext(TokenNameContext);
  const {setRoute } = useContext(NavContext);
  const [tokenAmount, settokenAmount] = useState(0);

  async function handleInputChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    settokenAmount(value);
  }
  async function handleSubmitMax(){
    try{
      const maxBalance = await sdk.getBalance(tokenName);
      console.log("maxBalance :" + maxBalance );
      const decimals = await sdk.getDecimals(tokenName);
      settokenAmount(Number(maxBalance/(10**decimals)).toFixed(10));
    }
    catch(error){
      console.error("Failed to retrieve max balance:", error);
    }
  }
  async function handleSubmit(){
    try{
      sdk.invest(tokenName,(tokenAmount*1e18).toString())
      .on('error', function(error){ 
        console.log("error: ")
        console.log(error.message); })
      .on('transactionHash', function(transactionHash){console.log("transaction hash: " +transactionHash); })
      .on('receipt', function(receipt){
          console.log("reciept");
          console.log(receipt); 
      })
      .on('confirmation', function(confirmationNumber, receipt){ 
        if(confirmationNumber<3){
          console.log("confirmed: "+ confirmationNumber);
          console.log(receipt);
        }
      });
    }
    catch(error){
      console.error("Failed to invest: ", error);
    }
    
  }

  return(
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
        <div>
          <h2>Invest Crypto</h2>
          <img
            src={"https://rates.titans.finance/static/images/"+tokenName+".png"}
            height="18px"
            style={{
              marginBottom: "3px",
              marginRight: "5px",
            }}
            alt=""
          />
          <br/>
          <h3>{tokenName}</h3>
          <label>Amount</label>
          <input type="text" name="tokenInvestAmount" onChange={handleInputChange} value={tokenAmount}></input>
          <button onClick={handleSubmitMax}>Max</button>
          <br/>
          <button type="button" onClick={handleSubmit}>Invest</button><br/>
          <button onClick={() => setRoute('home')}>Cancel</button><br/>
        </div>
      </CardBody>
    </Card>
  );
}

const WithdrawLayout = () => {
  const sdk = useContext(SDKContext);
  const {tokenName} = useContext(TokenNameContext);
  const {setRoute } = useContext(NavContext);
  const [tokenAmount, settokenAmount] = useState(0);
  

  async function handleInputChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    settokenAmount(value);
  }
  async function handleSubmitMax(){
    try{
      const decimals = await sdk.getDecimals(tokenName);
      const maxBalance = await sdk.getInvestBalance(tokenName);
      console.log("maxBalance :" + maxBalance );
      settokenAmount(Number(maxBalance/(10**decimals)).toFixed(10));
    }
    catch(error){
      console.error("Failed to retrieve max balance:", error);
    }
    
  }
  async function handleSubmit(){
    try{
      const decimals = await sdk.getDecimals(tokenName);
      sdk.withdraw(tokenName,(tokenAmount*(10**decimals)).toString())
        .on('error', function(error){ 
          console.log("error: ")
          console.log(error.message); })
        .on('transactionHash', function(transactionHash){console.log("transaction hash: " +transactionHash); })
        .on('receipt', function(receipt){
            console.log("reciept");
            console.log(receipt); 
        })
        .on('confirmation', function(confirmationNumber, receipt){ 
          if(confirmationNumber<3){
            console.log("confirmed: "+ confirmationNumber);
            console.log(receipt);
          }
        });
    }
    catch(error){
      console.error("Failed to withdraw:", error);
    }
    
  }
  return(
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
        <div>
          <h2>Withdraw Crypto</h2>
          <img
            src={"https://rates.titans.finance/static/images/"+tokenName+".png"}
            height="18px"
            style={{
              marginBottom: "3px",
              marginRight: "5px",
            }}
            alt=""
          />
          <br/>
          <h3>{tokenName}</h3>
          <label>Amount</label>
          <input type="text" name="tokenInvestAmount" onChange={handleInputChange} value={tokenAmount}></input>
          <button onClick={handleSubmitMax}>Max</button>
          <br/>
          <button type="button" onClick={handleSubmit}>Withdraw</button><br/>
          <button onClick={() => setRoute('home')}>Cancel</button><br/>
        </div>
      </CardBody>
    </Card>
  );
}

export{EntryCard, InvestLayout, WithdrawLayout};
