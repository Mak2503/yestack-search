import { memo, useCallback, useState } from "react";
import SearchInput from "./SearchInput";
import SuggestionDropdown from "./SuggestionDropdown";
import ProductCard from "./ProductCard";
import { Product } from "../types";

const AdvancedSearch = () => {
  const [search, setSearch] = useState("");
  const [product, setProduct] = useState<Product | null>(null);
  const [isFocused, setIsFocused] = useState(false); // To track focus state

  const handleSearch = useCallback((value: string) => {
    setSearch(value);
  }, []);

  const handleProductSelect = useCallback((product: Product) => {
    setProduct(product);
  }, []);

  const handleFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleBlur = useCallback(() => {
    setIsFocused(false);
    setSearch("");
  }, []);

  console.log("Product", product)

  return (
    <div className="container">
      <SearchInput
        search={search}
        onChange={handleSearch}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      {isFocused && (
        <SuggestionDropdown
          query={search.toLowerCase().trim()}
          handleProduct={handleProductSelect}
          handleBlur={handleBlur}
        />
      )}
      {product && <ProductCard product={product} />}
    </div>
  );
};

export default memo(AdvancedSearch);
