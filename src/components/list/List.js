import ListItem from './ListItem';


function List(props) {
  const {data, isLoading, isError} = props;


  if (isLoading) return <p>loading...</p>;
  if (isError) return <p>error...</p>;

  return (
    <div>
      {data.list.length > 0 ? (
        data.list.map((item,index) => (
          <ListItem key={`${item.patientId}_${index}`} {...item}/>
        ))
      ) : (
        <p>no data...</p>
      )}
    </div>
  )
}

export default List;


