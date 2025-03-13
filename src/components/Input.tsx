import { ChangeEvent, memo, useRef } from "react";

interface InputProps {
  value: string;
  onChange: (value: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
}

const Input: React.FC<InputProps> = ({
  value,
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
      className="input"
      type="text"
      value={value}
      onKeyDown={handleKeyDown}
      onChange={handleChange}
      onFocus={onFocus}
    />
  );
};
export default memo(Input);
