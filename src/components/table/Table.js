import {useState} from 'react';
import styled from 'styled-components';
import List from '../list/List'
import FilterContainer, {initialFilterState} from './Filter';


const headers = [
  {key:'person_id', label: 'id', sortable: true},
  {key:'gender', label: '성별', sortable: true},
  {key:'birth', label: '생년월일', sortable: true},
  {key:'age', label: '나이'},
  {key:'race', label: '인종', sortable: true},
  {key:'ethnicity', label: '민족', sortable: true},
  {key:'death', label: '사망여부', sortable: true},
]

function Table(props) {
  const [currentPage,setCurrentPage] = useState(1);
  const [itemPerPage, setItemPerPage] = useState(10); 
  const [lastPage, setLastPage] = useState(null);

  const [filter, setFilter] = useState(initialFilterState);
  const [sort, setSort] = useState({
    order_column: undefined,
    order_desc: undefined,
  })


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
        <span> page : {currentPage} / {lastPage} </span>
        
        <button disabled={!lastPage || currentPage >= lastPage} onClick={() => {
          if (!lastPage || currentPage >= lastPage) return;
          setCurrentPage((prev) => prev + 1);
        }}> &gt; </button>
      
        <FilterContainer setFilter={setFilter}/>     
        

        <HeaderContainer>
        {headers.map(h => (
          <div key={h.key} 
            className={`header-column ${sort.order_column === h.key && 'sort'}`}
            style={h.sortable && {cursor: 'pointer'}}
            onClick={() => {
              setSort((prev) => {
                const {order_column, order_desc} = prev;
                if (order_column !== h.key) {
                  return ({
                    order_column: h.key,
                    order_desc: true,
                  })
                }
                if (order_desc === true) {
                  return ({...prev, order_desc: false})
                }
                if (order_desc === false) {
                  return ({...prev, order_desc: undefined})
                }
                if (order_desc === undefined) {
                  return ({...prev, order_desc: true})
                }
              })
            }

            }>
            <span>{h.label}</span>
            {sort.order_column === h.key && sort.order_desc === true && <span>⬇</span>}
            {sort.order_column === h.key && sort.order_desc === false &&<span>⬆</span>}
          </div>
        ))}
      </HeaderContainer>
        <List currentPage={currentPage} itemPerPage={itemPerPage} setLastPage={setLastPage} filter={filter} 
        sort={sort}
        />
      </div>
  );
}

export default Table;

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: row ;
  width: 100%;
  &>.header-column {
    width: 100px;
  }
  &>.header-column.sort{
    color: red;
  }
`