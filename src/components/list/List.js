import { useEffect } from 'react';
import {useDataList} from '../../query/useDataList';
import ListItem from './ListItem';


function List(props) {
  const {currentPage,itemPerPage, setLastPage, filter, sort} = props;

  const {data, isLoading, isError} = useDataList({page: currentPage, length: itemPerPage, ...filter,...sort});

  useEffect(() => {
    if (!data) return;
    if (data.totalLength) {
      const lastPage = Math.ceil(data.totalLength / itemPerPage);
      setLastPage(lastPage);
    }
  },[data, itemPerPage, setLastPage]);

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


