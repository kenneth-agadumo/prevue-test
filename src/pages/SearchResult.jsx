import { useLocation } from "react-router-dom";
import { SearchResults } from "../components/SearchResults";

const SearchResultsPage = () => {
  const router = useLocation();
  console.log("router", router);

  return (
    <div className="p-10">
      <SearchResults
        results={router?.state.searchResults}
        category={router.state.category}
      />
    </div>
  );
};

export default SearchResultsPage;
