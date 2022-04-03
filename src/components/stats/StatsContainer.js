import {useStats} from '../../query/useStats';
import {useMemo, useCallback} from 'react';
import styled from 'styled-components'
import { PieChart } from 'react-minimal-pie-chart';


const colors = ['#90EE90','#D3D3D3','#FFB6C1','#FFA07A','#20B2AA','#87CEFA','#B0C4DE','#66CDAA', '#58139f','#ac2e38'];

function getUniqueList(list, column) {
  if (!list || !list.length) return [];
  return [...new Set(list.map(l => l[column]))];
}

const genderLabelDict = {
  'M': '남자',
  'F': '여자'
}

function StatsContainer({filter}) {
  const {data, isLoading, isError} = useStats();

  // 중복없는 컬럼별 값의 목록
  const ethnicityList = useMemo(() => getUniqueList(data,'ethnicity'),[data])
  const genderList = useMemo(() => getUniqueList(data,'gender'),[data]);
  const raceList = useMemo(() => getUniqueList(data,'race'),[data]);

  // stats 데이터에서 특정 컬럼 & 값으로 필터링한 count의 총합 구하는 함수
  const _countByFilter = useCallback((columnValueList) => {
    if (!data) return 0;
    let dataCopy = [...data];
    columnValueList.forEach(({column}) => {
      if (filter[column]) {
        dataCopy = dataCopy.filter((d) => d[column] === filter[column]);
      }
    })
    columnValueList.forEach(({column,value}) => {
      dataCopy = dataCopy.filter((d) => d[column] === value);
    })
    const totalCount = dataCopy.map(d => d.count).reduce((total,cur) => total+cur, 0);
    return totalCount;
  },[data, filter]);

  // 성별환자수
  const countByGender = useMemo(() => {
    return genderList.map(gender => ({key: gender, count: _countByFilter([{column:'gender', value:gender}])}));
  },[_countByFilter, genderList])

  // 인종별 환자수
  const countByRace = useMemo(() => {
    return raceList.map(race => ({key: race, count: _countByFilter([{column:'race', value: race}])}))
  },[_countByFilter, raceList]);

  // 민족별 환자수
  const countByEthnicity = useMemo(() => {
    return ethnicityList.map(ethnicity => ({key: ethnicity, count: _countByFilter([{column:'ethnicity', value:ethnicity}] )}))
  },[_countByFilter, ethnicityList])

  // 성별_인종별 환자수
  const countByGenderEthnicity = useMemo(() => {
    let result = [];
    genderList.forEach(gender => {
      ethnicityList.forEach(ethnicity => {
        const key = `${gender}_${ethnicity}`;
        const count = _countByFilter([
          {column: 'gender', value: gender}, 
          {column: 'ethnicity', value: ethnicity}
        ]);
        result.push({key, count});
      })
    })
    return result;
  },[_countByFilter, ethnicityList, genderList]);

  // 성별_민족별 환자수
  const countByGenderRace = useMemo(() => {
    let result = [];
    genderList.forEach(gender => {
      raceList.forEach(race => {
        const key=`${gender}_${race}`;
        const count = _countByFilter([
          {column: 'gender',  value: gender},
          {column: 'race', value: race}
        ])
        result.push({key, count});
      })
    })
    return result;
    },[_countByFilter, genderList, raceList]);

  const pieList = [
    {
      label: '성별 환자 수', 
      data: countByGender.map((i, index) => ({
        title: genderLabelDict[i.key], 
        value: i.count
      }))
    },
    {
      label:'인종별 환자 수',
      data: countByRace.map((i, index) => ({
        title: i.key, 
        value: i.count
      }))
    },
    {
      label:'민족별 환자 수', 
      data: countByEthnicity.map((i, index) => ({title: i.key, value: i.count}))
    },
    {
      label:'(성별 + 인종)별 환자 수', 
      data: countByGenderRace.map((i, index) => ({title: i.key, value: i.count}))
    },
    {
      label:'(성별 + 민족)별 환자 수', 
      data: countByGenderEthnicity.map((i, index) => ({title: i.key, value: i.count}))
    },
  ]

  if (isLoading) return <p>loading...</p>;
  if (isError) return <p>error...</p>;
  if (!data) return<p>no data...</p>;


  return (
   <PieListContainer>
     {pieList.map(pie => (<PieItem
      key={pie.label}
      data={pie.data.map((d,i) => ({...d, color: colors[i % colors.length]}))}
      label={pie.label}
     />))}
   </PieListContainer>
   
  )
}

export default StatsContainer;

const PieListContainer = styled.div`
  width: 100%;
  position: 'relative';
  display: flex;
  flex-wrap: wrap ;
  flex-direction: row;
`

function PieItem({data, label}) {
  return (
    <div style={{width: '600px', height: '350px', border: '1px solid #eee'}}>
       <p>{label}</p>
       <div style={{ display: 'flex', alignItems:'center'}}>
         <div style={{width: '300px', height: '300px'}}>
       
         <PieChart
           radius={40}
           data={data}
           label={(({dataEntry}) => {
             return dataEntry.percentage > 1 ? (`${Math.round(dataEntry.percentage)}%`) : '';
           })}
           labelStyle={{fontSize: '8px'}}
           labelPosition={100}
           />
       </div>
      <ul>
        {data.map((d,index) => (
          <li key={index} style={{listStyle: 'none'}}>
            <span style={{marginRight: '5px',display: 'inline-block', backgroundColor: d.color, width: '10px', height: '10px'}} />
            <span>{d.title} : </span>
            <span>{d.value} 명</span>
          </li>
        ))}
      </ul>
       </div>
    
    </div>
    
  )
}