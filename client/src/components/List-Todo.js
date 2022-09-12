import React, { Fragment, useState, useEffect } from "react";

const ListTodos = () => {
  const [todos, setTodos] = useState([]);
  const getTodos = async () => {
    try {
      const response = await fetch("http://localhost:5000/todos");
      const jsonData = await response.json();
      //   console.log(jsonData);
      setTodos(jsonData);
    } catch (er) {
      console.error(er.message);
    }
  };
  useEffect(() => {
    getTodos();
  }, []); //to make sure one request is made by UseEffect

  //   console.log(todos);
  return (
    <Fragment>
      <div className="container mt-3">
        <table className="table mt-5 text-center table-striped">
          <thead>
            <tr>
              <th>Description</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {todos.map((todo) => (
              <tr>
                <td>{todo.description}</td>
                <td>Edit</td>
                <td>Delete</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Fragment>
  );
};

export default ListTodos;
