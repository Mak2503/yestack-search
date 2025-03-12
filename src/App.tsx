import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AdvancedSearch from "./components/AdvancedSearch";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AdvancedSearch />
    </QueryClientProvider>
  );
}

export default App;
