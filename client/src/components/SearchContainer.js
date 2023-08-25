import Wrapper from "../assets/wrappers/SearchContainer";
import { useAppContext } from "../context/appContext";
import FormRow from "./FormRow";
import FormRowSelect from "./FormRowSelect";
import { useMemo, useState } from "react";

const SearchContainer = () => {
  const [localSearch, setLocalSearch] = useState("");

  const {
    isLoading,
    search,
    searchStatus,
    searchType,
    sort,
    sortOptions,
    jobTypeOptions,
    statusOptions,
    handleChangeSearchValue,
    clearFilters,
  } = useAppContext();

  const handleSubmit = (e) => {
    e.preventDefault();
    clearFilters();
  };

  const handleSearch = (e) => {
    //還在fetch 當前 search 時 return 不進行其他動作
    // if (isLoading) return;
    handleChangeSearchValue({ name: e.target.name, value: e.target.value });
  };

  const debounce = () => {
    let timeoutID;
    return (e) => {
      setLocalSearch(e.target.value);
      clearTimeout(timeoutID);
      timeoutID = setTimeout(() => {
        handleChangeSearchValue({ name: e.target.name, value: e.target.value });
      }, 1000);
    };
  };

  //useMemo 可以讓callback fn 不會因為set state而造成re-render
  const optimizedDebounce = useMemo(() => debounce(), []);

  return (
    <Wrapper>
      <form className="form">
        <div className="form-center">
          <h4>search form</h4>
          <FormRow
            type="text"
            name="search"
            value={localSearch}
            onChange={optimizedDebounce}
          />
          <FormRowSelect
            labelText="job status"
            options={["all", ...statusOptions]}
            name="searchStatus"
            value={searchStatus}
            onChange={handleSearch}
          />
          <FormRowSelect
            labelText="job type"
            options={["all", ...jobTypeOptions]}
            name="searchType"
            value={searchType}
            onChange={handleSearch}
          />
          <FormRowSelect
            name="sort"
            value={sort}
            options={sortOptions}
            onChange={handleSearch}
          />
          <button
            className="btn btn-block btn-danger"
            disabled={isLoading}
            onClick={handleSubmit}
          >
            clear filters
          </button>
        </div>
      </form>
    </Wrapper>
  );
};
export default SearchContainer;
