import { ChangeEvent, memo, useRef } from "react";

interface SearchInputProps {
  search: string;
  onChange: (value: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
}

const SearchInput: React.FC<SearchInputProps> = ({
  search,
  onChange,
  onFocus,
  onBlur,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape" || e.key === "Tab") {
      inputRef.current?.blur();
      onBlur!();
    }
  };

  return (
    <input
      ref={inputRef}
      className="search-input"
      type="text"
      value={search}
      onKeyDown={handleKeyDown}
      onChange={handleChange}
      onFocus={onFocus}
    />
  );
};
export default memo(SearchInput);
