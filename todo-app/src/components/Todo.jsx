import { useState } from "react";

function Todo({ todo, onDelete, onEdit, onComplete }) {
  const [edit, setEdit] = useState(false);
  const [text, setText] = useState(todo.value);

  return (
    <li
      className="flex justify-between my-2 bg-base-300 p-2 rounded-md items-center"
      onDoubleClick={() => {
        onComplete();
      }}
    >
      <input type="checkbox" checked={todo.complete} className="mr-2 w-6 h-6" onChange={onComplete} />
      <input
        onChange={(e) => {
          const value = e.target.value;
          onEdit(value);
          setText(value);
        }}
        value={text}
        disabled={!edit}
        className={` h-[40px] bg-inherit ${todo.complete && "line-through"}`}
      />

      <div className="flex gap-1">
        <button onClick={() => setEdit(!edit)} className="btn btn-neutral">
          {!edit ? "Edit" : "Save"}
        </button>
        <button onClick={onDelete} className="btn btn-error">
          Delete
        </button>
      </div>
    </li>
  );
}

export default Todo;
