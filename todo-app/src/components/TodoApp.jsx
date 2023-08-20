import { useState } from "react";
import Todo from "./Todo";
function TodoApp() {
  const [todo, setTodo] = useState({
    value: "",
    complete: false,
    id: crypto.randomUUID(),
  });
  const [todoList, setTodoList] = useState([]);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  return (
    <div className="h-screen w-screen ">
      <main className="m-auto max-w-lg p-10 h-full relative">
        <h1>Todo App</h1>
        <section className="mt-5">
          <SearchTodo search={search} setSearch={setSearch} />
          <div className="flex">
            <input
              value={todo.value}
              onChange={(e) => setTodo({ ...todo, value: e.target.value })}
              type="text"
              placeholder="Type here"
              className="mr-2 input input-bordered input-md w-full max-w-xs"
            />
            <button onClick={addTodo} className="btn">
              Add Todo
            </button>
          </div>

          <ul className="h-[600px] overflow-auto">
            {todoList
              .filter((todo) => {
                if (filter === "completed") return todo.complete;
                if (filter === "active") return !todo.complete;
                return true;
              })
              .filter((todo) => {
                const td = todo.value;
                if (td.includes(search)) {
                  return true;
                }
                return false;
              })
              .map((todo) => {
                return (
                  <Todo
                    key={todo.id}
                    todo={todo}
                    onComplete={() => handleComplete(todo.id)}
                    onEdit={(text) => handleEdit(todo.id, text)}
                    onDelete={() => handleDelete(todo.id)}
                  />
                );
              })}
          </ul>
          <div className="flex gap-2 justify-center mt-5 absolute bottom-8 left-0 right-0">
            <input className="w-4" type="radio" name="All" value="All" onClick={() => setFilter("all")} />
            <label>All</label>
            <input className="w-4" type="radio" name="All" value="Active" onClick={() => setFilter("active")} />
            <label>Active</label>
            <input className="w-4" type="radio" name="All" value="Complete" onClick={() => setFilter("completed")} />
            <label>Complete</label>
          </div>
        </section>
      </main>
    </div>
  );

  function addTodo() {
    if (todo.value === "") {
      alert("please fill this field");
    } else {
      setTodoList([...todoList, todo]);
      setTodo({ value: "", edit: false, complete: false, id: crypto.randomUUID() });
    }
  }

  function handleComplete(id) {
    let completeTodo = todoList.map((todo) => {
      if (todo.id === id) {
        todo.complete = !todo.complete;
      }
      return todo;
    });
    setTodoList(completeTodo);
  }

  function handleDelete(id) {
    const deleteTodo = todoList.filter((todo) => todo.id !== id);
    setTodoList(deleteTodo);
  }

  function handleEdit(id, text) {
    const editTodo = todoList.map((todo) => {
      if (todo.id === id) {
        todo.value = text;
      }
      return todo;
    });

    setTodoList(editTodo);
  }
}

export default TodoApp;

function SearchTodo({ search, setSearch }) {
  return (
    <div className="flex mb-8">
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        type="search"
        placeholder="search todo"
        className="mr-2 input input-bordered input-md w-full max-w-xs"
      />
    </div>
  );
}
