import { useState, useEffect } from 'react';
import { useGenderList } from '../../query/useGenderList';
import { useEthnicityList } from '../../query/useEthnicityList';
import { useRaceList } from '../../query/useRaceList';

export const initialFilterState = {
  gender: undefined,
  race: undefined,
  ethnicity: undefined,
  death: undefined,
  age_min: undefined,
  age_max: undefined
}

function FilterContainer({setFilter}) {
  const {data: genderList} = useGenderList();
  const {data: raceList} = useRaceList();
  const {data: ethnicityList} = useEthnicityList();

  

  return (
  <div>
    <div>
      <span>필터</span>
    </div>
    
    <Filter label="성별" data={genderList} onChange={(gender) => setFilter((prev) => ({...prev, gender}))} />
    <Filter label="인종" data={raceList} onChange={(race) => setFilter((prev) => ({...prev, race}))} />
    <Filter label="민족" data={ethnicityList} onChange={(ethnicity) => setFilter((prev) => ({...prev, ethnicity}))} />
    <DeathFilter onChange={(death) => setFilter((prev) => ({...prev, death}))} />
    {/* <AgeFilter onChange={(age_min, age_max) => setFilter((prev) => ({...prev, age_min, age_max}))} /> */}
  </div>)
}

export default FilterContainer;

function Filter({data, label, onChange}) {
  return (
    <div>
      <span>{label} : </span>
      <FilterSelector
       data={data}
       onChange={onChange}/>
    </div>
  )
}

function FilterSelector({data, onChange}) {
  const [value, setValue] = useState(undefined);
  return (
    <>
     <select value={value} onChange={(e) => {
          const newValue = e.target.value === '--' ? undefined : e.target.value;
          setValue(newValue);
          onChange(newValue);
        }}>
        <option value={undefined}>--</option>
        {data && data.map(item => (
          <option value={item} key={item}>{item}</option>
        ))}
      </select>
    </>
  )
}

function DeathFilter({onChange}) {
  const [death, setDeath] = useState(undefined);
  return (
    <div>
      <span>사망여부 : </span>
      <select value={death} onChange={(e) => {
          const newValue = e.target.value;
          if (newValue === '--') {
            setDeath(undefined);
            onChange(undefined);
          }
          if (newValue === 'true') {
            setDeath('true');
            onChange(true);
          }
          
          if (newValue === 'false') {
            setDeath('false');
            onChange(false);
          }
        }}
    >
      <option value={undefined}>--</option>
      <option value="true">true</option>
      <option value="false">false</option>
    </select>
  </div>
  )

}

function AgeFilter({onChange}) {
  const [minAge, setMinAge] = useState(undefined);
  const [maxAge, setMaxAge] = useState(undefined);

  const handleMinAgeChange = (e) => {
    const _value = e.target.value;
    console.log(_value);
    setMinAge(Number(_value));
  }

  const handleMaxAgeChange = (e) => {
    const _value = e.target.value;
    console.log(_value);
    setMaxAge(Number(_value));
  }
  return (
    <div>
      <span>최소나이 : {JSON.stringify(minAge)}</span>
      <input type="number" min={0} max={maxAge} value={minAge} onChange={handleMinAgeChange}/>
      <span>최대나이 :  {JSON.stringify(maxAge)}</span>
      <input type="number" min={minAge} max={200} value={maxAge} onChange={handleMaxAgeChange}/>
    </div>
  )
}
