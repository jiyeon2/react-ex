function PaginationContainer ({itemPerPage, onSelectChange, lastPage, currentPage, handlePrevClick, handleNextClick}) {
  return (
    <div>
      <select value={itemPerPage} onChange={(e) => {
          onSelectChange(Number(e.target.value));
        }}>
          <option value={10}>10개</option>
          <option value={20}>20개</option>
          <option value={30}>30개</option>
        </select>

        <button disabled={!lastPage || currentPage <= 1} onClick={() => {
          if (!lastPage || currentPage <= 1) return;
          handlePrevClick();
        }}> &lt; </button>
        <span> page : {currentPage} / {lastPage} </span>
        
        <button disabled={!lastPage || currentPage >= lastPage} onClick={() => {
          if (!lastPage || currentPage >= lastPage) return;
          handleNextClick();
        }}> &gt; </button>
      
    </div>
  )
}

export default PaginationContainer;