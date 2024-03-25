import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import useDataStore from '../hooks/dataStore';
import axios from 'axios';

export default function BasicBars() {
    const { datavalue, dataname, setDataValue, setDataName, isLoading, setIsLoading } = useDataStore();


    React.useEffect(() => {

        const fetchData = async () => {
            try {
                const response = await axios.get('/api/createnew');
                const { names, values } = response.data;

                setDataName(names);
                setDataValue(values);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [setDataName, setDataValue]);


    const getChartWidth = () => {
        if (window.innerWidth >= 1200) {
            return window.innerWidth * 0.8;
        } else if (window.innerWidth >= 600) {
            return window.innerWidth * 0.9;
        } else {
            return window.innerWidth;
        }
    };

    return (
        <div className=" flex justify-center items-center ">
            <BarChart
                colors={['#8884d8']}
                xAxis={[{ scaleType: 'band', data: dataname }]}
                series={[{ data: datavalue }]}
                width={getChartWidth()}
                height={500}
            />
        </div>
    );
}
