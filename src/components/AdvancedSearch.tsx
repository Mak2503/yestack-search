import { useCallback, useState } from "react";
import SearchInput from "./SearchInput";
import SuggestionDropdown from "./SuggestionDropdown";
import ProductCard from "./ProductCard";
import { Product } from "../types";

const Search = () => {
  const [search, setSearch] = useState("");
  const [product, setProduct] = useState<Product | null>(null);
  const handleSearch = useCallback((value: string) => {
    setSearch(value);
  }, []);

  const handleProductSelect = useCallback((product: Product) => {
    setProduct(product);
  }, []);

  return (
    <div className="container">
      <SearchInput search={search} onChange={handleSearch} />
      <SuggestionDropdown
        query={search.toLowerCase().trim()}
        handleProduct={handleProductSelect}
      />
      {product && <ProductCard product={product} />}
    </div>
  );
};

export default Search;
