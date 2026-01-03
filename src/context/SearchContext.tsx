import React, { createContext, useCallback, useContext, useState } from "react";

interface SearchContextType {
  search: string;
  setSearch: (search: string) => void;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export function SearchProvider({ children }: { children: React.ReactNode }) {
  const [search, setSearchState] = useState("");

  const setSearch = useCallback((newSearch: string) => {
    setSearchState(newSearch);
  }, []);

  return (
    <SearchContext.Provider value={{ search, setSearch }}>
      {children}
    </SearchContext.Provider>
  );
}

export function useSearch() {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error("useSearch must be used within a SearchProvider");
  }
  return context;
}
