import { Fragment } from "react";
import "./App.css";

import InputTodo from "./components/Input-Todo";
import ListTodos from "./components/List-Todo";

function App() {
  return (
    <Fragment>
      <div className="container">
        <InputTodo />
        <ListTodos />
      </div>
    </Fragment>
  );
}

export default App;
