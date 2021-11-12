
import React, { useState, useEffect, useRef } from 'react';
import { TOKEN, SEARCH_CITIES_URL} from './AQIConst';
import { useAQIAPIs } from './useAQIAPIs';
import CityAQIList from './CityAQIList';
import { Typeahead } from 'react-bootstrap-typeahead';
import options from '../data';



const SearchCity = (props) => {
  const [url, setUrl] = useState('');
  const [cities , loading, initial, error] = useAQIAPIs(url);
  const [searchText, setSearchText] = useState('');
  const searchInput = useRef(null);
  const [selected, setSelected] = useState([]);

  console.log("this cities")
  console.log(cities);

  useEffect(() => {
      searchInput.current.focus();
  }, []);
  
  const searchCityName = (event) => {
      event.preventDefault();
      setUrl(`${SEARCH_CITIES_URL}?token=${TOKEN}&keyword=${searchText}`);
  }

  const handleSearchTextChange = (event) => {
      setSearchText(event.target.value);
  }
  return(
      <div>
          { error }
          {/* <Typeahead
            id="basic-example"
            onChange={setSelected}
            options={options}
            placeholder="Choose a state..."
          selected={selected}/> */}
          <form 
          class="m-2 flex justify-center"
          onSubmit={ e => searchCityName(e)}>
              <label>
          
    	<input class="rounded-l-lg p-2 border-t mr-0 border-b border-l text-gray-800 border-gray-200 bg-white"
        type="text" 
        ref={ searchInput }
        value={ searchText } 
        placeholder=" Enter a City Name"
        onChange={ e => handleSearchTextChange(e) }
        />
		 </label>
         <button 
         type="submit"
         class="px-8 rounded-r-lg bg-blue-300  text-gray-800 font-medium p-2 uppercase border-blue-300 border-t border-b border-r">Search
         </button>
</form>
          {
              loading ?
                  (<span>loading...</span>)
                  :
                  !initial && (<CityAQIList data={ cities.data }/>)
          }
      </div>
  )
};

export default SearchCity;