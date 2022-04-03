import { useEffect } from 'react';
import {useDataList} from '../../query/useDataList';
import ListItem from './ListItem';
import styled from 'styled-components';


function List(props) {
  const {currentPage,itemPerPage, setLastPage} = props;

  const {data, isLoading, isError} = useDataList({page: currentPage, length: itemPerPage});

  useEffect(() => {
    if (!data) return;
    if (data.patient.totalLength) {
      const lastPage = Math.ceil(data.patient.totalLength / itemPerPage);
      setLastPage(lastPage);
    }
  },[data, itemPerPage, setLastPage]);

  const headers = [
    {key:'personID', label: 'id'},
    {key:'gender', label: '성별'},
    {key:'birthDatetime', label: '생년월일'},
    {key:'age', label: '나이'},
    {key:'race', label: '인종'},
    {key:'ethnicity', label: '민족'},
    {key:'isDeath', label: '사망여부'},
  ]
  return (
    <div>
      <HeaderContainer>
        {headers.map(h => <p key={h.key} className="header-column">{h.label}</p>)}
      </HeaderContainer>
      {isLoading && <p>loading...</p>}
      {isError && <p>error...</p>}
      {data ? (
        data.patient.list.map((item,index) => (
          <ListItem key={`${item.patientId}_${index}`} {...item}/>
        ))
      ) : (
        <p>no data...</p>
      )}
    </div>
  )
}

export default List;


const HeaderContainer = styled.div`
  display: flex;
  flex-direction: row ;
  width: 100%;
  &>.header-column {
    width: 100px;
  }
`