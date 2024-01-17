import { useState } from "react";
import "./App.css";
import { useEffect } from "react";

const itemPerPage = 10;
function App() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchAPI = async () => {
    const data = await fetch(`https://dummyjson.com/products?limit=100`);
    const res = await data.json();
    setData(res.products);
  };

  useEffect(() => {
    fetchAPI();
  }, []);
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const startIndex = (currentPage - 1) * itemPerPage;
  const endIndex = startIndex + itemPerPage;
  const currentItems = data.slice(startIndex, endIndex);
  const totalPage = Math.ceil(data.length / itemPerPage);

  return (
    <div className="App">
      <p>Pagination</p>
      {currentItems.map((item) => {
        return <li key={item.id}>{item.title}</li>;
      })}
      <div>
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        {Array.from({ length: totalPage }, (_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            disabled={currentPage === index + 1}
          >
            {index + 1}
          </button>
        ))}

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPage}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default App;
