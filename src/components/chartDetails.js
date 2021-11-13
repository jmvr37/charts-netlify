import React from 'react';
import { useAQIAPIs } from './useAQIAPIs';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend,  CartesianGrid,  } from 'recharts';
import { TOKEN, FEED_AQICN_URL } from './AQIConst';

const ChartDetails = props => {
    
    const [info, error] = useAQIAPIs(
        `${FEED_AQICN_URL}${props.uid}/?token=${TOKEN}`
    );
  
    let result = []
    if (info.data && info.data.forecast) result = info.data.forecast.daily.o3.map((day, i) => {
        let result = {
            name: day.day,
            o3: day.min
        } 
        if (info.data.forecast.daily.pm25 && info.data.forecast.daily.pm25[i]) result.pm25 = info.data.forecast.daily.pm25[i].avg
        if (info.data.forecast.daily.pm10 && info.data.forecast.daily.pm10[i]) result.pm10 = info.data.forecast.daily.pm10[i].avg
        return result
    });

    return(
        <React.Fragment>
            {error}
        {
            info.data ?
            <div>
                <div class="max-w-xl h-auto mx-auto bg-white rounded-xl shadow-md overflow-hidden bg-white hover:shadow-xl transition-shadow duration-300 ease-in-out py-6 px-6">
                    <LineChart width={430} height={500} data={result}>
                    <CartesianGrid strokeDasharray="3 3" />
                    
                        <Line type="monotone" dataKey="o3" stroke="#1597e5" activeDot={{ r: 6 }} />
                        <Line type="monotone" dataKey="pm25" stroke="#e63d2d" activeDot={{ r: 6 }} />
                        <Line type="monotone" dataKey="pm10" stroke="#161e54" activeDot={{ r: 6 }} />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                    </LineChart>
                </div>
                </div>
                :
                <div class="flex items-center justify-center w-1/4 h-auto">
            <div class="flex justify-center items-center space-x-1 text-sm text-gray-700">
               
                  <svg fill='none' class="w-6 h-6 animate-spin" viewBox="0 0 32 32" xmlns='http://www.w3.org/2000/svg'>
                    <path clip-rule='evenodd'
                      d='M15.165 8.53a.5.5 0 01-.404.58A7 7 0 1023 16a.5.5 0 011 0 8 8 0 11-9.416-7.874.5.5 0 01.58.404z'
                      fill='currentColor' fill-rule='evenodd' />
                  </svg>
          
               
              <div>Loading ...</div>
            </div>
          </div>
        }
        </React.Fragment>
        
        
    )
};

export default ChartDetails;