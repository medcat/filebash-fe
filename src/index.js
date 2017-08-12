import React from "react";
import ReactDOM from "react-dom";
import Application from "Application";
import {withRouter} from "react-router";
import {HashRouter, BrowserRouter, Link, Route} from "react-router-dom";
import "index.scss";

let Router = process.ENV == "production" ? BrowserRouter : HashRouter;
let ApplicationWithRouter = withRouter(Application);
function renderBody() {
  ReactDOM.render((
    <Router>
      <ApplicationWithRouter>
        <Route exact path="/" component={Application.Landing} />
        <Route path="/login" component={Application.Login} />
        <Route path="/upload" component={Application.Upload} />
      </ApplicationWithRouter>
    </Router>
  ), document.getElementById("root"));
}

renderBody();
