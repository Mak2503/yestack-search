import { useQuery } from "@tanstack/react-query";
import { memo } from "react";
import { Product } from "../types";
import { useDebounce } from "../hooks/useDebounce";

interface SuggestionBoxProps {
  search: string
}

const SuggestionBox: React.FC<SuggestionBoxProps> = ({ search }) => {
  const debouncedQuery = useDebounce(search, 300);
  
  const fetchProducts = async ({ queryKey }: { queryKey: string[] }) => {
    const [, query] = queryKey;
    const response = await fetch(
      `https://fakestoreapi.in/api/products`
    );
    const data = await response.json();
    const filteredData = data.products.filter((product: Product) => {
      return product.title.toLowerCase().includes(query);
    });
    return filteredData;
  };

  const { data, isPending, error } = useQuery({
    queryKey: ["productsData", debouncedQuery],
    queryFn: fetchProducts,
  });

  if (isPending) return "Loading...";
  if (error) return `An error has occured: ${error.message}`;

  return (
    <div className="suggestion-container">
      <h5 style={{ marginLeft: "15px" }}>Popular Searches</h5>
      <ul>
        {data.map((product: Product) => (
          <li key={product.id}>{product.title.slice(0, 40)}...</li>
        ))}
      </ul>
    </div>
  );
};

export default memo(SuggestionBox);
