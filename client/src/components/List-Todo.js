import React, { Fragment, useState, useEffect } from "react";
import EditTodo from "./Edit-Todo";

const ListTodos = () => {
  const [todos, setTodos] = useState([]);
  const getTodos = async () => {
    try {
      const response = await fetch("http://localhost:5000/todos");
      const jsonData = await response.json();
      setTodos(jsonData);
    } catch (er) {
      console.error(er.message);
    }
  };
  useEffect(() => {
    getTodos();
  }, []); //to make sure one request is made by UseEffect

  const deleteTodo = async (id) => {
    try {
      const todo = await fetch(`http://localhost:5000/todos/${id}`, {
        method: "DELETE",
      });
      setTodos(todos.filter((td) => td.todo_id !== id)); //No need to refresh the page to see the updated changes
      // filters out and displays all the ids except the deleted one
    } catch (err) {
      console.error(err.message);
    }
  };

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
              <tr key={todo.todo_id}>
                <td>{todo.description}</td>
                <td>
                  <EditTodo todo={todo} />
                </td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => deleteTodo(todo.todo_id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Fragment>
  );
};

export default ListTodos;
