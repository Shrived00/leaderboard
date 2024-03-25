"use client"
import Link from 'next/link'
import React from 'react'
import StackedLineChartIcon from '@mui/icons-material/StackedLineChart';
import logo from '../../public/logo.png'
import TemporaryDrawer from './Drawer';
import Image from 'next/image';

const Navbar = () => {
    return (
        <div className='border border-b-8 shadow-lg '>
            <div className="flex justify-between p-2 items-center ">
                <Link href="/">
                    <Image src={logo} alt="logo" width={100} height={50} />

                </Link>

                <div className="flex  items-center">
                    <Link href="/analytics ">
                        <StackedLineChartIcon />
                    </Link>

                    <TemporaryDrawer />
                </div>


            </div>
        </div>
    )
}

export default Navbar
