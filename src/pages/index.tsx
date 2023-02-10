import { type NextPage } from "next";
import JSONViewer from "../components/JSONViewer";
import data from '../../data.json'
import { useState } from "react";
import { fromPath } from "../components/helpers";

const Home: NextPage = () => {
  const [deepKey, setDeepKey] = useState('')

  const displayData = (data: any) => {
      const fromPathData = fromPath(data, deepKey);
      if (typeof fromPathData === 'object') return 'Object';

      return JSON.stringify(fromPath(data, deepKey), null, 2);
  }
  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#fff] to-[#fff]">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
                <input  type="text" name="name" className='text-2xl h-12 border-blue-400 border-solid border-2'  value={deepKey} onChange={(event) => setDeepKey(event.target.value)}  />
                <div className='text-xl h-36'>
                    {displayData(data)}
                </div>
          <JSONViewer json={data} setSelectedKey={setDeepKey} />
        </div>
      </main>
    </>
  );
};

export default Home;
