import React from 'react';

const NavContext = React.createContext({
  navValue: "home",
  setNavValue: () => {}
});


export {NavContext}
