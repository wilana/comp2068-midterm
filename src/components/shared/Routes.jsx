import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Data from '../Data';
import Instructions from './Instructions';
import Home from '../Pages/Home';

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" component={ Home }/>
      <Route exact path="/Instructions" component={Instructions}/>
      <Route exact path="/Data" component={Data}/>
    </Switch>
  );
}
 
export default Routes;