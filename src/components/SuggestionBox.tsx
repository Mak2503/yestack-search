import { useQuery } from "@tanstack/react-query";

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

  console.log(data);
  return <div>SuggestionBox</div>;
};

export default SuggestionBox;
