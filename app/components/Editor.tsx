import React, { useState } from 'react';
import useDataStore from '../hooks/dataStore';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import Link from 'next/link';
import axios from 'axios';

const Editor = () => {
    const { datavalue, dataname, setDataValue, setDataName } = useDataStore();
    const [updatedData, setUpdatedData] = useState(datavalue.slice());

    const incrementValue = (index: number) => {
        const newData = [...updatedData];
        newData[index]++;
        setUpdatedData(newData);
    };

    const decrementValue = (index: number) => {
        const newData = [...updatedData];
        if (newData[index] > 0) {
            newData[index]--;
            setUpdatedData(newData);
        }
    };


    const onHandleUpdate = async () => {
        // Extract names and values from elements array
        const values = updatedData;
        const names = dataname;


        try {
            const response = await axios.put('/api/createnew', { names, values });
            console.log('Data updated successfully:', response.data);
        } catch (error) {
            console.error('Error updating data:', error);
        }
    };


    return (
        <div className="p-3 flex flex-col justify-center items-center">
            <div className="p-5">
                <Link href='/new' className="">New</Link>
                <div className=" ">Load previous</div>
            </div>

            <div className="w-[80%] p-4">
                {/* Main */}
                {datavalue.map((value, index) => (
                    <div key={index} className="">
                        <div className="flex justify-between items-center py-2">
                            <div>{dataname[index]}</div>
                            <div className="flex gap-5 border rounded w-[40%] justify-between p-3">
                                <div onClick={() => decrementValue(index)}><RemoveIcon /></div>
                                <div>{updatedData[index]}</div>
                                <div onClick={() => incrementValue(index)}><AddIcon /></div>
                            </div>
                        </div>
                    </div>
                ))}

                <button className="mt-5 border p-2 bg-slate-500" onClick={onHandleUpdate}>Update</button>
            </div>
        </div>
    );
};

export default Editor;
