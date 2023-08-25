import Wrapper from "../assets/wrappers/SearchContainer";
import { useAppContext } from "../context/appContext";
import FormRow from "./FormRow";
import FormRowSelect from "./FormRowSelect";

const SearchContainer = () => {
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
    if (isLoading) return;
    handleChangeSearchValue({ name: e.target.name, value: e.target.value });
  };
  return (
    <Wrapper>
      <form className="form">
        <div className="form-center">
          <h4>search form</h4>
          <FormRow
            type="text"
            name="search"
            value={search}
            onChange={handleSearch}
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
