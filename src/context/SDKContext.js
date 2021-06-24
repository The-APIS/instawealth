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

export {SDKContext, SupportedTokensContext, TokenBalanceContext}