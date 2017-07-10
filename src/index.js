import React from "react";
import ReactDOM from "react-dom";

function renderBody() {
  ReactDOM.render((
    <div>Hello, world</div>
  ), document.getElementById("root"));
}

renderBody();
