import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Main from './pages/Main';
import Staking from './pages/Staking';
import Swap from './pages/Swap';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import Liquidity from './pages/Liquidity';

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/staking" component={Staking} />
        <Route exact path="/swap" component={Swap} />
        <Route exact path="/liquidity" component={Liquidity} />
        <Route exact path="/terms" component={Terms} />
        <Route exact path="/privacy" component={Privacy} />
        <Route exact path="/" component={Main} />
      </Switch>
    </Router>
  );
};

export default Routes;
