const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db"); //db connection

// MIDDLEWARE
app.use(cors());
app.use(express.json()); //req.body

// ROUTES

// Create a TODO
app.post("/todos", async (req, res) => {
  try {
    const { description } = req.body;
    const newTodo = await pool.query(
      "INSERT INTO todo (description) VALUES($1) RETURNING *",
      [description]
    );
    res.json(newTodo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

// GET all TODO's
app.get("/todos", async (req, res) => {
  try {
    const todos = await pool.query("SELECT * FROM todo");
    res.send(todos.rows);
  } catch (err) {
    console.error(err.message);
  }
});

// GET a TODO
app.get("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [
      id,
    ]);

    res.json(todo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

// UPDATE a TODO
app.put("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    const todo = await pool.query(
      "UPDATE todo SET description = $1 WHERE todo_id = $2",
      [description, id]
    );
    res.json("Updated");
  } catch (err) {
    console.error(err.message);
  }
});

// DELETE a TODO
app.delete("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await pool.query("DELETE FROM todo WHERE todo_id = $1", [id]);
    res.json("Deleted");
  } catch (err) {
    console.error(err.message);
  }
});

const port = process.env.port || 5000;
app.listen(port, () => console.log(`Listening server on port ${port}`));
