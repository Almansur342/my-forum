import { useState } from "react";

const useSearch = () => {
  const [searchQuery, setSearchQuery] =useState('');
  // console.log(searchQuery)
   const updateSearchQuery = (query) =>{
    setSearchQuery(query);
   }
  return {
    searchQuery,
    updateSearchQuery
  }
};

export default useSearch;