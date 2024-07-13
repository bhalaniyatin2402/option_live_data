import { useSelector } from "react-redux";
import SearchResultOption from "./SearchResultOption";

export default function SearchResult({ searchResult, loading }) {
  const {
    send: { k },
  } = useSelector((state) => state.socket);

  if (loading) {
    return <h1 className="text-center my-5 text-xl font-bold">Searching...</h1>;
  }

  if (searchResult.length == 0) {
    return (
      <h1 className="text-center my-5 text-xl font-bold">
        Search Option Chain
      </h1>
    );
  }

  return (
    <>
      <ul className="my-4 px-3 h-[55vh] overflow-y-auto">
        {searchResult?.map((option, i) => (
          <SearchResultOption
            key={i}
            optionList={k?.replace(/NFO\|/g, "")?.split("#")}
            option={option}
          />
        ))}
      </ul>
    </>
  );
}
