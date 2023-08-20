import { useState } from "react";

function Intractivity() {
  const [name, setName] = useState({
    firstName: "",
    lastName: "",
  });

  function handleReset() {
    setName({
      firstName: "",
      lastName: "",
    });
  }

  return (
    <div>
      <input
        className="mr-4"
        value={name.firstName}
        onChange={(e) => setName({ ...name, firstName: e.target.value })}
        type="text"
      />
      <input
        type="text"
        value={name.lastName}
        onChange={(e) =>
          setName({
            ...name,
            lastName: e.target.value,
          })
        }
      />
      <h1>
        Hi, {name.firstName},, {name.lastName}
      </h1>
      <button onClick={handleReset}>Reset</button>
    </div>
  );
}

export default Intractivity;
