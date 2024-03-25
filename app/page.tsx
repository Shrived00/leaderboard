"use client"
import Image from "next/image";
import BasicBars from "./components/BasicBars";
import TemporaryDrawer from "./components/Drawer";
import useDataStore from "./hooks/dataStore";
import Loader from "./components/Loader";
import StackedLineChartIcon from '@mui/icons-material/StackedLineChart';
import Link from "next/link";

export default function Home() {
  const { isLoading, setIsLoading } = useDataStore();

  return (
    <main className="" >

      {isLoading ? <Loader />

        : <>

          <div className=" ">
            <BasicBars />

          </div>
        </>}

    </main>
  );
}
