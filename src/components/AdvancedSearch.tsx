import { useCallback, useState } from "react";
import SearchInput from "./SearchInput";
import SuggestionDropdown from "./SuggestionDropdown";

const Search = () => {
  // const [count, setCount] = useState(0)
  const [search, setSearch] = useState("");
  const handleSearch = useCallback((value: string) => {
    setSearch(value);
  }, []);

  return (
    <div className="container">
      <SearchInput search={search} onChange={handleSearch} />
      {/* To test re rendering of search (To be removed) */}
      {/* <div>
        <button onClick={() => setCount(count + 1)}>+</button>
        {count}
      </div> */}
      <SuggestionDropdown search={search.toLowerCase().trim()} />
    </div>
  );
};

export default Search;
