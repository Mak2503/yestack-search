import { useQuery } from "@tanstack/react-query";
import { memo } from "react";
import { Product } from "../types";

interface SuggestionBoxProps {
  search: string
}

const SuggestionBox: React.FC<SuggestionBoxProps> = ({ search }) => {
  const fetchProducts = async () => {
    const response = await fetch(
      `http://fakestoreapi.in/api/products?limit=15`
    );
    const data = await response.json();
    return data;
  };

  const { data, isPending, error } = useQuery({
    queryKey: ["productsData"],
    queryFn: fetchProducts,
  });

  if (isPending) return "Loading...";
  if (error) return `An error has occured: ${error.message}`;

  console.log("Search", search)

  return (
    <div className="suggestion-container">
      <p>Popular Searches</p>
      <ul>
        {data.products.map((product: Product) => (
          <li key={product.id}>{product.title.slice(0, 40)}...</li>
        ))}
      </ul>
    </div>
  );
};

export default memo(SuggestionBox);
