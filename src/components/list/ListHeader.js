import styled from 'styled-components';

const headers = [
  {key:'person_id', label: 'id', sortable: true},
  {key:'gender', label: '성별', sortable: true},
  {key:'birth', label: '생년월일', sortable: true},
  {key:'age', label: '나이'},
  {key:'race', label: '인종', sortable: true},
  {key:'ethnicity', label: '민족', sortable: true},
  {key:'death', label: '사망여부', sortable: true},
]


function ListHeader({sort, setSort}) {
  return (
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
            if (order_desc === true) return {...prev, order_desc: false};
            if (order_desc === false) return {...prev, order_desc: undefined};
            if (order_desc === undefined) return {...prev, order_desc: true};
          })
        }}>
        <span>{h.label}</span>
        {sort.order_column === h.key && sort.order_desc === true && <span>⬇</span>}
        {sort.order_column === h.key && sort.order_desc === false &&<span>⬆</span>}
      </div>
    ))}
  </HeaderContainer>
  )
}

export default ListHeader;

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