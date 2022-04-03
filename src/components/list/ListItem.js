import styled from 'styled-components';

const ListItemContainer = styled.div`
  display: flex;
  flex-direction:row ;
  width: 100%;
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
    race
  } = props;
  return (
    <ListItemContainer>
      <PersonId>{personID}</PersonId>
      <Gender>{gender}</Gender>
      <BirthDate>{birthDatetime}</BirthDate>
      <Age>{age}</Age>
      <Race>{race}</Race>
      <Ethnicity>{ethnicity}</Ethnicity>
      <IsDeath>{JSON.stringify(isDeath)}</IsDeath>
    </ListItemContainer>
  )
}

export default ListItem;
