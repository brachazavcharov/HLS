/*!

=========================================================
* Material Dashboard React - v1.10.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

// core components
import Admin from "layouts/Admin.js";
import RTL from "layouts/RTL.js";
// import 'semantic-ui-css/semantic.min.css'
import 'semantic-ui-css/semantic.min.css'
import "assets/css/material-dashboard-react.scss?v=1.10.0";
import { Provider } from 'react-redux'
// import reducer from "./reducers/customer";
import { customerReducer, productReducer, competitionFilesReducer, orderReducer, recipeRecipe, recommendedProductsReducer } from "./reducers/index";
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import Login from "views/Login/Login";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const myStore = createStore(combineReducers({ customerReducer: customerReducer, productReducer: productReducer }),
  composeEnhancers(
    applyMiddleware(thunk))
);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={myStore}>
      <BrowserRouter>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/admin" component={Admin} />
          {/* <Route path="/rtl" component={RTL} /> */}
          <Redirect from="/" to="/admin/dashboard" />
        </Switch>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
