import React from 'react';

const SDKContext = React.createContext();

const SupportedTokensContext = React.createContext({
  supportedTokens: [],
  setsupportedTokens: () => {}
});

const TokenBalanceContext = React.createContext({
  tokenBalance: [],
  settokenBalance: () => {}
});

const TokenNameContext = React.createContext(
  {
    tokenName:'ETH' ,
    settokenName: () => {}
  }
);

export {SDKContext, SupportedTokensContext, TokenBalanceContext,TokenNameContext}