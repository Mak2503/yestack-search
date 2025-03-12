import { useCallback, useState } from "react";
import "./App.css";
import SearchInput from "./components/SearchInput";

function App() {
  // const [count, setCount] = useState(0)
  const [search, setSearch] = useState("");
  const handleSearch = useCallback((value: string) => {
    setSearch(value);
  }, []);

  return (
    <main>
      <SearchInput search={search} onChange={handleSearch} />
      {/* To test re rendering of search (To be removed) */}
      {/* <div>
        <button onClick={() => setCount(count + 1)}>+</button>
        {count}
      </div> */}
    </main>
  );
}

export default App;
