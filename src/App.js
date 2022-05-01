import { useState, useEffect } from "react";

function App() {
  const [loading, setLoading] = useState(true);
  const [dater, setDater] = useState([]);
  useEffect(() => {
    const setCoin = async () => {
      await fetch("http://jsonplaceholder.typicode.com/todos/1")
        .then((response) => response.json())
        .then((json) => console.log(json));
    };
  }, []);

  return (
    <div>
      <h1>{loading ? "loading" : null}</h1>
    </div>
  );
}

export default App;
