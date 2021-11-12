import React from 'react';
import CityAQI from './CityAQI';

const CityAQIList = props => {
    let  cityList = [];    
    if (props.data) {
        cityList = props.data;
        console.log("citylist")
        console.log(cityList);
    }
        
    return (
        <div class="grid grid-cols-1 gap-4 py-8 px-8 h-full w-full">
            {
                cityList.length > 0
                ?
                cityList.map((cityInfo, i) => (
                    <span key={i}>
                        <CityAQI cityInfo={cityInfo} />
                    </span>
                ))
                :
                <h1>no data found, try another city</h1>
            }
        </div>
    )
};

export default CityAQIList;