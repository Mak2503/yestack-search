import { ChangeEvent, memo } from "react";

interface SearchInputProps {
  search: string;
  onChange: (value: string) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({ search, onChange }) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  // To test re-rendering (To be removed)
  console.log("Rendered");

  return (
    <>
      <input
        className="search-input"
        type="text"
        value={search}
        onChange={handleChange}
      />
      <pre>{search}</pre>
    </>
  );
};

export default memo(SearchInput);
