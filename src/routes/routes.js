import React from 'react';
import {BrowserRouter,Switch,Route}from 'react-router-dom';
import menu from '../pages/menu';
import login from '../pages/login';
function App() {
  return (
   <BrowserRouter>
   <Switch>
     <Route exact path="/" component={login}/>

     <Route exact path="/menu"component={menu}/>
   </Switch>
   </BrowserRouter>
  );
}

export default App;
