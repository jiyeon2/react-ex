import {useState} from 'react';
import List from '../list/List'

function Table(props) {
  const [currentPage,setCurrentPage] = useState(1);
  const [itemPerPage, setItemPerPage] = useState(10); 
  const [lastPage, setLastPage] = useState(null);

  return (
    <div>
      <select value={itemPerPage} onChange={(e) => {
        setItemPerPage(Number(e.target.value));
      }}>
        <option value={10}>10개</option>
        <option value={20}>20개</option>
        <option value={30}>30개</option>
      </select>

      <button disabled={!lastPage || currentPage <= 1} onClick={() => {
        if (!lastPage || currentPage <= 1) return;
        setCurrentPage((prev) => prev - 1);
      }}> &lt; </button>
      <span> current page : {currentPage}</span>
      
      <button disabled={!lastPage || currentPage >= lastPage} onClick={() => {
        if (!lastPage || currentPage >= lastPage) return;
        setCurrentPage((prev) => prev + 1);
      }}> &gt; </button>
     
      
      <List currentPage={currentPage} itemPerPage={itemPerPage} setLastPage={setLastPage} />
    </div>
  );
}

export default Table;