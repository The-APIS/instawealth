import React from 'react';

const NavContext = React.createContext({
  route: "home",
  setRoute: () => {}
});


export {NavContext}
