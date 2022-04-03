import {useState} from 'react';
import ListHeader  from '../list/ListHeader';
import List from '../list/List'
import FilterContainer, {initialFilterState} from './Filter';
import StatsContainer from '../stats/StatsContainer';
import {useDataList} from '../../query/useDataList';
import PaginationContainer from './Pagination';



function Table(props) {
  const [currentPage,setCurrentPage] = useState(1);
  const [itemPerPage, setItemPerPage] = useState(10); 

  const [filter, setFilter] = useState(initialFilterState);
  const [sort, setSort] = useState({
    order_column: undefined,
    order_desc: undefined,
  })

  const {data, isLoading, isError} = useDataList({page: currentPage, length: itemPerPage, ...filter,...sort});

  const lastPage = data ? Math.ceil(data.totalLength / itemPerPage) : undefined;

  return (
      <div style={{display: 'flex', flexDirection:'column', alignItems:'center'}}>
        <PaginationContainer
          itemPerPage={itemPerPage}
          onSelectChange={(newValue) => setItemPerPage(newValue)}
          lastPage={lastPage}
          currentPage={currentPage}
          handlePrevClick={() => setCurrentPage((p) => p - 1)}
          handleNextClick={() => setCurrentPage((p) => p + 1)} />
   
      
        <FilterContainer setFilter={setFilter}/>     
        
        <StatsContainer filter={filter}/>
        <div style={{width: '100%',maxWidth: '1200px', margin: '16px'}}>
          <ListHeader sort={sort} setSort={setSort} />
          <List data={data} isLoading={isLoading} isError={isError}/>
        </div>
        <PaginationContainer
          itemPerPage={itemPerPage}
          onSelectChange={(newValue) => setItemPerPage(newValue)}
          lastPage={lastPage}
          currentPage={currentPage}
          handlePrevClick={() => setCurrentPage((p) => p - 1)}
          handleNextClick={() => setCurrentPage((p) => p + 1)} />
   
        
      </div>
  );
}

export default Table;

