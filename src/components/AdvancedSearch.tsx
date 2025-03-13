import { useCallback, useState } from "react";
import SearchInput from "./SearchInput";
import SuggestionDropdown from "./SuggestionDropdown";

const Search = () => {
  const [search, setSearch] = useState("");
  const handleSearch = useCallback((value: string) => {
    setSearch(value);
  }, []);

  return (
    <div className="container">
      <SearchInput search={search} onChange={handleSearch} />
      <SuggestionDropdown query={search.toLowerCase().trim()} />
    </div>
  );
};

export default Search;
