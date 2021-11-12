import React from 'react';
import { useAQIAPIs } from './useAQIAPIs';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend,  CartesianGrid,  } from 'recharts';
import { TOKEN, FEED_AQICN_URL } from './AQIConst';

const ChartDetails = props => {
    
    const [info, error] = useAQIAPIs(
        `${FEED_AQICN_URL}${props.uid}/?token=${TOKEN}`
    );
    console.log("info")
    console.log(info)
    let result = []
    if (info.data) result = info.data.forecast.daily.o3.map((day, i) => {
        let result = {
            name: day.day,
            o3: day.avg
        }
        if (info.data.forecast.daily.pm25) result.pm25 = info.data.forecast.daily.pm25[i].avg
        // if (info.data.forecast.daily.pm10) result.pm10 = info.data.forecast.daily.pm10[i].avg
        return result
    });

    return(
        <React.Fragment>
            {error}
        {
            info.data ?
            <div>
                <div class="max-w-md h-auto mx-auto bg-white rounded-xl shadow-md overflow-hidden bg-white hover:shadow-xl transition-shadow duration-300 ease-in-out py-6 px-6">
                    <LineChart width={400} height={500} data={result}>
                    <CartesianGrid strokeDasharray="3 3" />
                    
                        <Line type="monotone" dataKey="o3" stroke="#8884d8" />
                        <Line type="monotone" dataKey="pm25" stroke="#8884d8" />
                        <Line type="monotone" dataKey="pm10" stroke="#8884d8" />
                      
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                    </LineChart>
                </div>
                </div>
                :
                <span>Loading...</span>
        }
        </React.Fragment>
        
        
    )
};

export default ChartDetails;