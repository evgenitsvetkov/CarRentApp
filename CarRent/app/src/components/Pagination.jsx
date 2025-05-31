import "./styles/Pagination.css";

const Pagination = ({ page, searchTerm, category, sorting, totalPages, changePage }) => {
    return (
        <div className="pagination-container">
            <button className="pagination-button" disabled={page <= 1} onClick={() => changePage((parseInt(page) - 1), searchTerm, category, sorting,)}>
                Previous
            </button>
            <span className="pagination-text"> Page {page} of {totalPages} </span>
            <button className="pagination-button" disabled={page >= totalPages} onClick={() => changePage((parseInt(page) + 1), searchTerm, category, sorting,)}>
                Next
            </button>
        </div>
    );
};

export default Pagination;