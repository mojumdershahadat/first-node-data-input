import logo from "./logo.svg";
import "./App.css";
import { useEffect, useRef, useState } from "react";

function App() {
  const [users, setUsers] = useState([]);
  const nameRef = useRef();
  const emailRef = useRef();
  useEffect(() => {
    fetch("http://localhost:3000/users")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

  const handleAddUser = (e) => {
    const name = nameRef.current.value;
    const email = emailRef.current.value;
    const newUser = { name: name, email: email };
    // send data to the server
    fetch("http://localhost:3000/users", {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newUser),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        const addedUser = data;
        const newUsers = [...users, addedUser];
        setUsers(newUsers);
      });
    nameRef.current.value = "";
    emailRef.current.value = "";
    e.preventDefault();
  };
  return (
    <div className="App">
      <h1>users: {users.length}</h1>
      <form onSubmit={handleAddUser}>
        <input type="text" ref={nameRef} name="" placeholder="name" id="" />
        <input
          type="email"
          name=""
          placeholder="your email"
          ref={emailRef}
          id=""
        />
        <input type="submit" value="submit" />
      </form>
      {users.map((user) => (
        <li>{user.name}</li>
      ))}
    </div>
  );
}

export default App;
