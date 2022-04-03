import styled from 'styled-components';
import {useState} from 'react';
import {useDetailData} from '../../query/useDetailData';

const ListItemContainer = styled.div`
  &:nth-child(2n) {
    background-color: #eee;
  }
  &.open {
    background-color: #bce;
  }
`
const ListItemRow = styled.div`
  display: flex;
  flex-direction:row ;
  cursor: pointer;
  &:hover {
    background-color: #cee;
  }

`

const Age = styled.p`
  width: 100px;
`
const BirthDate = styled.p`
  width: 100px;
`
const Ethnicity = styled.p`
  width: 100px;
`
const Gender = styled.p`
  width: 100px;
`
const IsDeath = styled.p`
  width: 100px;
`
const PersonId = styled.p`
  width: 100px;
`
const Race = styled.p`
  width: 100px;
`
function ListItem (props) {
  const {
    age,
    birthDatetime,
    ethnicity,
    gender,
    isDeath,
    personID,
    race,
  } = props;
  const [open, setOpen] = useState(false);
  const {data} = useDetailData(personID);
  return (
    <ListItemContainer className={open && 'open'}>
      <ListItemRow onClick={() => setOpen(o => !o)}>
        <PersonId>{personID}</PersonId>
        <Gender>{gender}</Gender>
        <BirthDate>{birthDatetime}</BirthDate>
        <Age>{age}</Age>
        <Race>{race}</Race>
        <Ethnicity>{ethnicity}</Ethnicity>
        <IsDeath>{JSON.stringify(isDeath)}</IsDeath>
      </ListItemRow>
      {open && <Detail data={data}/>}
    </ListItemContainer>
    
  )
}

export default ListItem;


function Detail(props) {
  const {data} = props;
  if (!data) return 'loading...'
  return (<div>
    <p>전체 방문수 : {data.visitCount}</p>
    <p>진단정보</p>
    <ul>
    {data.conditionList.map((cond,idx) => <li key={`${cond}_${idx}`}>{cond}</li>)}
    </ul>
    
    
  </div>)
}