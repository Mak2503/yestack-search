import { useInfiniteQuery } from "@tanstack/react-query";
import { Fragment, memo, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { Product } from "../types";
import { useDebounce } from "../hooks/useDebounce";

interface SuggestionDropdownProps {
  query: string;
  handleProduct: (product: Product) => void;
  handleBlur: () => void
}

const SuggestionDropdown: React.FC<SuggestionDropdownProps> = ({
  query,
  handleProduct,
  handleBlur
}) => {
  const { ref, inView } = useInView();
  const [page, setPage] = useState(1);
  const debouncedQuery = useDebounce(query, 300);

  const fetchProducts = async ({
    queryKey,
    pageParam,
  }: {
    queryKey: string[];
    pageParam: number | false;
  }) => {
    const [, query] = queryKey;
    setPage(pageParam ? pageParam : 1);
    const response = await fetch(
      `https://fakestoreapi.in/api/products?page=${pageParam}&limit=15`
    );
    const data = await response.json();
    const filteredData = data.products.filter((product: Product) => {
      return product.title.toLowerCase().includes(query);
    });

    return filteredData;
  };

  const { status, data, error, isFetchingNextPage, fetchNextPage } =
    useInfiniteQuery({
      queryKey: ["productsData", debouncedQuery],
      queryFn: fetchProducts,
      initialPageParam: 1,
      getPreviousPageParam: () => page > 1 && page - 1,
      getNextPageParam: () => page < 10 && page + 1,
    });

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView]);

  if ((status as "idle" | "pending" | "success" | "error") === "pending")
    return (
      <div className="suggestion-container">
        <p className="subText">Loading...</p>
      </div>
    );
  if (status === "error" || error) {
    return (
      <div className="suggestion-container">
        <p className="subText">An error has occured: ${error.message}</p>
      </div>
    );
  }
  if (!data || data.pages.length === 0 || data.pages[0].length === 0) {
    return (
      <div className="suggestion-container">
        <p className="subText">No results found</p>
      </div>
    );
  }

  const setProduct = (product: Product) => {
    handleProduct(product);
    handleBlur()
  };

  return (
    <div className="suggestion-container">
      <h5 style={{ marginLeft: "15px" }}>Popular Searches</h5>
      <ul>
        {data.pages.length > 0
          ? data.pages.map((page, index) => (
              <Fragment key={index}>
                {page.map((product: Product) => (
                  <li key={product.id} onClick={() => setProduct(product)}>
                    {product.title?.slice(0, 70)}...
                  </li>
                ))}
              </Fragment>
            ))
          : null}
        {query && (
          <li
            ref={ref}
            className="subText"
            style={{ marginLeft: 0 }}
          >
            {isFetchingNextPage ? "Loading more..." : "Nothing more to load"}
          </li>
        )}
      </ul>
    </div>
  );
};

export default memo(SuggestionDropdown);
