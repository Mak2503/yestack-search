import { useCallback, useState } from "react";
import SearchInput from "./SearchInput";
import SuggestionBox from "./SuggestionBox";

const Search = () => {
  // const [count, setCount] = useState(0)
  const [search, setSearch] = useState("");
  const handleSearch = useCallback((value: string) => {
    setSearch(value);
  }, []);

  return (
    <div>
      <SearchInput search={search} onChange={handleSearch} />
      {/* To test re rendering of search (To be removed) */}
      {/* <div>
        <button onClick={() => setCount(count + 1)}>+</button>
        {count}
      </div> */}
      <SuggestionBox search={search} />
    </div>
  );
};

export default Search;
