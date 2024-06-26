import React, { useState } from 'react';
import useDataStore from '../hooks/dataStore';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import Link from 'next/link';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useUserStore } from '../hooks/userStore';

const Editor = () => {
    const router = useRouter();

    const { user, setUser } = useUserStore();

    const { datavalue, dataname, setDataValue, setDataName, isLoading, setIsLoading } = useDataStore();
    const [updatedData, setUpdatedData] = useState(datavalue.slice());

    const incrementValue = (index: number) => {
        const newData = [...updatedData];
        newData[index]++;
        setUpdatedData(newData);
    };

    const decrementValue = (index: number) => {
        if (index >= 0 && index < updatedData.length) {
            const newData = [...updatedData];
            // Use optional chaining (?.) and nullish coalescing operator (??)
            // to ensure newData[index] is accessed safely and provide a default value (0) if it's undefined
            const currentValue = newData[index];
            if (currentValue !== undefined && currentValue > 0) {
                newData[index] = currentValue - 1;
                setUpdatedData(newData);
            }
        }
    };




    const onHandleUpdate = async () => {
        // Extract names and values from elements array
        const values = updatedData;
        const names = dataname;


        try {
            setIsLoading(true);
            const response = await axios.put('/api/createnew', { names, values });
            setIsLoading(false);
            console.log('Data updated successfully:', response.data);
        } catch (error) {
            console.error('Error updating data:', error);
        }
    };

    const onClickPrevHandler = async () => {
        try {
            // Make a POST request to the API endpoint
            setIsLoading(true);
            const response = await axios.post('/api/prev');

            // Check if the request was successful
            if (response.status === 200) {
                console.log('Previous data loaded successfully');
                router.push('/');
                router.refresh();

            } else {
                console.error('Failed to load previous data');
            }
            setIsLoading(false);
        } catch (error) {
            console.error('Error loading previous data:', error);
        }
    };
    const onClickLogout = () => {
        // Remove user login state and expiration time from local storage
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('loginExpiration');

        // Set user as not logged in
        setUser(false);

        // Redirect to the home page or any other desired page
        router.push('/');
    };

    return (
        <div style={{
            width: '100%', backgroundColor: "#181c24", height: '100vh', color: 'white',
        }}>
            <div className="flex  justify-between py-2 px-3">
                <Link href='/new' className=" py-1 px-2 " style={{
                    backgroundColor: '#3b82f680', color: 'white', borderRadius: '5px',

                }}>New</Link>
                <button
                    className=' py-1 px-2'

                    style={{
                        backgroundColor: '#3b82f680', color: 'white', borderRadius: '5px',

                    }}
                    onClick={onClickPrevHandler}>Load previous</button>

            </div>

            <div className=" p-4 flex flex-col gap-3   ">
                {/* Main */}
                {datavalue.map((value, index) => (
                    <div key={index} className="border  p-2 w-full ">


                        <div className="flex justify-between w-full">
                            <div className=''>{dataname[index]}</div>
                            <div className="  flex justify-between " style={{ width: '40%' }}>
                                <div onClick={() => decrementValue(index)}><RemoveIcon /></div>
                                <div>{updatedData[index]}</div>
                                <div onClick={() => incrementValue(index)}><AddIcon /></div>
                            </div>
                        </div>
                    </div >
                ))}


            </div >
            <div className="  flex justify-between px-4 ">
                <button className=' py-1 px-2' onClick={onHandleUpdate}
                    style={{
                        backgroundColor: '#3b82f680', color: 'white', borderRadius: '5px',



                    }}
                >Update</button>
                <button className=' py-1 px-2' onClick={onClickLogout}
                    style={{
                        backgroundColor: '#b23b3b', color: 'white', borderRadius: '5px',



                    }}
                >Logout</button>
            </div>
        </div >
    );
};

export default Editor;
