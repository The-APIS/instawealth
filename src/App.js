import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Layout from "./layouts/Layout";
import EntryPage from "./pages/Entry";

const App = () => (
  <BrowserRouter>
    <Switch>
      <Layout>
        <Route exact path="/" component={EntryPage} />
      </Layout>
    </Switch>
  </BrowserRouter>
);

export default App;
