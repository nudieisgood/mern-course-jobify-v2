import Wrapper from "../assets/wrappers/PageBtnContainer";
import { useAppContext } from "../context/appContext";
import { HiChevronDoubleLeft, HiChevronDoubleRight } from "react-icons/hi";

const PageBtnContainer = () => {
  const { page, numOfPages, handlePageChange } = useAppContext();

  const pages = Array.from({ length: numOfPages }, (_, index) => index + 1);

  const prevPage = () => {
    let goToPage = page - 1;
    if (goToPage < 1) goToPage = 1;
    handlePageChange(goToPage);
  };
  const nextPage = () => {
    let goToPage = page + 1;
    if (goToPage > numOfPages) goToPage = numOfPages;
    handlePageChange(goToPage);
  };

  return (
    <Wrapper>
      <button className="prev-btn" onClick={prevPage}>
        <HiChevronDoubleLeft />
        prev
      </button>
      <div className="btn-container">
        {pages.map((pageNum) => {
          return (
            <button
              type="button"
              className={pageNum === page ? "pageBtn active" : "pageBtn"}
              key={pageNum}
              onClick={() => handlePageChange(pageNum)}
            >
              {pageNum}
            </button>
          );
        })}
      </div>
      <button className="next-btn" onClick={nextPage}>
        next
        <HiChevronDoubleRight />
      </button>
    </Wrapper>
  );
};
export default PageBtnContainer;
