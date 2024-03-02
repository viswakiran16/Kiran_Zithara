
import React, { useState, useEffect } from 'react';
import './DataTable.css'; // Import CSS file

const DataTable = () => {
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(20); // Change this to adjust the number of items per page
    const [searchInput, setSearchInput] = useState('');
    const [sortBy, setSortBy] = useState(null);
    const [sortOrder, setSortOrder] = useState('asc');

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/data');
            const jsonData = await response.json();
            setData(jsonData);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    // Logic to slice the data array based on current page and items per page
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    let currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

    // Search logic
    if (searchInput) {
        currentItems = currentItems.filter(
            item =>
                item.customer_name.toLowerCase().includes(searchInput.toLowerCase()) ||
                item.location.toLowerCase().includes(searchInput.toLowerCase())
        );
    }

    // Sorting logic
    if (sortBy) {
        currentItems.sort((a, b) => {
            const aValue = sortBy === 'date' ? new Date(a.created_at) : a[sortBy];
            const bValue = sortBy === 'date' ? new Date(b.created_at) : b[sortBy];
            return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
        });
    }

    // Logic to paginate
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Handler for search input change
    const handleSearchInputChange = (event) => {
        setSearchInput(event.target.value);
    };

    // Handler for sort option change
    const handleSortChange = (event) => {
        setSortBy(event.target.value);
    };

    // Handler for sort order change
    const handleSortOrderChange = (event) => {
        setSortOrder(event.target.value);
    };

    return (
        <div className="table-container">
            {/* Search and Sorting Controls */}
            <div className="controls">
                <input
                    type="text"
                    placeholder="Search by name or location"
                    value={searchInput}
                    onChange={handleSearchInputChange}
                />
                <div className="sort-controls">
    <h5>SORT BY :</h5>
    <div className="select-container">
        <select value={sortBy} onChange={handleSortChange}>
            <option value="date">Date</option>
            <option value="time">Time</option>
        </select>
        <select value={sortOrder} onChange={handleSortOrderChange}>
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
        </select>
    </div>
</div>

            </div>
            <table className="data-table">
                <thead>
                    <tr>
                        <th>S No</th>
                        <th>Customer Name</th>
                        <th>Age</th>
                        <th>Phone</th>
                        <th>Location</th>
                        <th>Date</th>
                        <th>Time</th>
                    </tr>
                </thead>
                <tbody>
                    {currentItems.map((item, index) => (
                        <tr key={index}>
                            <td>{item.sno}</td>
                            <td>{item.customer_name}</td>
                            <td>{item.age}</td>
                            <td>{item.phone}</td>
                            <td>{item.location}</td>
                            <td>{new Date(item.created_at).toLocaleDateString()}</td>
                            <td>{new Date(item.created_at).toLocaleTimeString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {/* Pagination */}
            <div className="pagination">
                {[...Array(Math.ceil(data.length / itemsPerPage)).keys()].map((number) => (
                    <button key={number} onClick={() => paginate(number + 1)}>
                        {number + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default DataTable;


// import React, { useState, useEffect } from 'react';
// import './DataTable.css'; // Import CSS file

// const DataTable = () => {
//     const [data, setData] = useState([]);
//     const [currentPage, setCurrentPage] = useState(1);
//     const [itemsPerPage, setItemsPerPage] = useState(20); // Change this to adjust the number of items per page
//     const [searchInput, setSearchInput] = useState('');
//     const [sortBy, setSortBy] = useState(null);
//     const [sortOrder, setSortOrder] = useState('asc');

//     useEffect(() => {
//         fetchData();
//     }, []);

//     const fetchData = async () => {
//         try {
//             const response = await fetch('http://localhost:5000/api/data');
//             const jsonData = await response.json();
//             setData(jsonData);
//         } catch (error) {
//             console.error('Error fetching data:', error);
//         }
//     };

//     // Logic to slice the data array based on current page and items per page
//     const indexOfLastItem = currentPage * itemsPerPage;
//     const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//     let currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

//     // Search logic
//     if (searchInput) {
//         currentItems = currentItems.filter(
//             item =>
//                 item.customer_name.toLowerCase().includes(searchInput.toLowerCase()) ||
//                 item.location.toLowerCase().includes(searchInput.toLowerCase())
//         );
//     }

//     // Sorting logic
//     if (sortBy) {
//         currentItems.sort((a, b) => {
//             const aValue = sortBy === 'date' ? new Date(a.created_at) : a[sortBy];
//             const bValue = sortBy === 'date' ? new Date(b.created_at) : b[sortBy];
//             return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
//         });
//     }

//     // Logic to paginate
//     const paginate = (pageNumber) => setCurrentPage(pageNumber);

//     // Handler for search input change
//     const handleSearchInputChange = (event) => {
//         setSearchInput(event.target.value);
//         setCurrentPage(1); // Reset page to 1 when search query changes
//     };

//     // Handler for sort option change
//     const handleSortChange = (event) => {
//         setSortBy(event.target.value);
//         setCurrentPage(1); // Reset page to 1 when sort option changes
//     };

//     // Handler for sort order change
//     const handleSortOrderChange = (event) => {
//         setSortOrder(event.target.value);
//     };

//     return (
//         <div className="table-container">
//             {/* Search and Sorting Controls */}
//             <div className="controls">
//                 <input
//                     type="text"
//                     placeholder="Search by name or location"
//                     value={searchInput}
//                     onChange={handleSearchInputChange}
//                 />
//                 <div className="sort-controls">
//                     <h5>SORT BY :</h5>
//                     <div className="select-container">
//                         <select value={sortBy} onChange={handleSortChange}>
//                             <option value="">None</option>
//                             <option value="date">Date</option>
//                             <option value="time">Time</option>
//                         </select>
//                         <select value={sortOrder} onChange={handleSortOrderChange}>
//                             <option value="asc">Ascending</option>
//                             <option value="desc">Descending</option>
//                         </select>
//                     </div>
//                 </div>
//             </div>
//             <table className="data-table">
//                 <thead>
//                     <tr>
//                         <th>S No</th>
//                         <th>Customer Name</th>
//                         <th>Age</th>
//                         <th>Phone</th>
//                         <th>Location</th>
//                         <th>Date</th>
//                         <th>Time</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {currentItems.map((item, index) => (
//                         <tr key={index}>
//                             <td>{item.sno}</td>
//                             <td>{item.customer_name}</td>
//                             <td>{item.age}</td>
//                             <td>{item.phone}</td>
//                             <td>{item.location}</td>
//                             <td>{new Date(item.created_at).toLocaleDateString()}</td>
//                             <td>{new Date(item.created_at).toLocaleTimeString()}</td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//             {/* Pagination */}
//             <div className="pagination">
//                 {[...Array(Math.ceil(currentItems.length / itemsPerPage)).keys()].map((number) => (
//                     <button key={number} onClick={() => paginate(number + 1)}>
//                         {number + 1}
//                     </button>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default DataTable;
