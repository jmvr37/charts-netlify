
import React, { useState, useEffect, useRef } from 'react';
import { TOKEN, SEARCH_CITIES_URL} from './AQIConst';
import { useAQIAPIs } from './useAQIAPIs';
import CityAQIList from './CityAQIList';
import 'react-bootstrap-typeahead/css/Typeahead.css';


const SearchCity = () => {
  const [url, setUrl] = useState('');
  const [cities , loading, initial, error] = useAQIAPIs(url);
  const [searchText, setSearchText] = useState('');
  const searchInput = useRef(null);

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
            (<div class="flex items-center justify-center w-full h-full">
            <div class="flex justify-center items-center space-x-1 text-sm text-gray-700">
               
                  <svg fill='none' class="w-6 h-6 animate-spin" viewBox="0 0 32 32" xmlns='http://www.w3.org/2000/svg'>
                    <path clip-rule='evenodd'
                      d='M15.165 8.53a.5.5 0 01-.404.58A7 7 0 1023 16a.5.5 0 011 0 8 8 0 11-9.416-7.874.5.5 0 01.58.404z'
                      fill='currentColor' fill-rule='evenodd' />
                  </svg>
          
               
              <div>Loading ...</div>
            </div>
          </div>)
            :
            !initial && (<CityAQIList data={ cities.data }/>)
    }
    
</div>
  )
};

export default SearchCity;