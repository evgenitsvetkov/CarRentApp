import { useState } from "react";
import "./styles/Search.css";

const Search = ({ searchTerm: initialSearch, category: initialCategory, sorting: initialSorting, changeParams, categoriesData }) => {
    const [searchTerm, setSearchTerm] = useState(initialSearch);
    const [category, setCategory] = useState(initialCategory);
    const [sorting, setSorting] = useState(initialSorting);

    const sortingData = [
        { label: "Newest", value: 0 },
        { label: "Oldest", value: 1 },
        { label: "HighestPrice", value: 2 },
        { label: "LowestPrice", value: 3 },
    ]

    const handleSubmit = (e) => {
        e.preventDefault();
        changeParams(searchTerm, category, sorting);
    };

    return (
        <div className="search-container">
            <div>
                <label>Category:</label>
                <select name="category" value={category} onChange={(e) => setCategory(e.target.value)}>
                    <option value="">Select a Category</option>
                    {categoriesData.map((categoryData) => (
                        <option key={categoryData.id} value={categoryData.name}>
                            {categoryData.name}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <label>Sorting:</label>
                <select name="sorting" value={sorting} onChange={(e) => setSorting(e.target.value)}>
                    <option value="">Select Sorting</option>
                    {sortingData.map((sort) => (
                        <option key={sort.value} value={sort.value}>
                            {sort.label}
                        </option>
                    ))}
                </select>
            </div>
            <form onSubmit={handleSubmit}>
                <input type="text"
                    name="searchTerm"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value, category, sorting)}
                    placeholder="Search..." />
                <button type="submit" className="submit-btn">Search</button>
            </form>

        </div>    
    );
};

export default Search;