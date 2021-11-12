import React, { useState } from 'react';
import moment from 'moment';
import ChartDetails from './chartDetails';

const CityAQI = props => {
    const aqi = props.cityInfo.aqi;
    const cityName = props.cityInfo.station.name;
    const time = props.cityInfo.time.stime;
    const uid = props.cityInfo.uid;
    const geo = props.cityInfo.station.geo;
    
    const getAtTimeFormatted = time => {
        return moment(time).format('h:mm:ss a');
    }
    return (
        <div class="max-w-xlg mx-auto flex flex-row justify-center w-full">
        
            <div class="flex flex-col justify-center text-left w-2/5 py-12">
            <h1 class="text-3xl font-serif font-semibold">{ cityName } </h1>
            <h2 class="font-mono">At { getAtTimeFormatted(time) }</h2>
            <h2 class="font-serif text-xl font-semibold">Currrent AQI: <span class="font-light font-mono"> { aqi } </span> </h2>
            <h2 class="font-serif text-xl font-semibold"> Latitud: <span class="font-light font-mono">{geo[0]}</span> </h2> 
            <h2 class="font-serif text-xl font-semibold"> Altitude: <span class="font-light font-mono">{geo[1]} </span></h2> 
            <h1 class="text-lg font-sans font-light">See forecast details for o3, pm25 and pm10 on chart beside </h1>
            </div>
            <ChartDetails  uid={uid}/> 
            
          
            
        </div>
    )
};

export default CityAQI;