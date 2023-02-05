
import ReactJson from 'react-json-view'
import data from '../../data.json'



const JSONViewer = () => {
    const jsonData = JSON.stringify(data, null, 2).split(/\n/gi);
    console.log(jsonData);
    return (
        <>
            <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#fff] to-[#fff]">
                <div className="container flex flex-col items-left justify-center ">
                    {jsonData.map((i) => (
                        <pre>
                            {i.split(/"[A-Za-z]+":/gi)[0]}
                            <span
                                onClick={(e) => console.log(e)}
                                className='hover:underline hover:text-blue-600 cursor-pointer'
                                >
                                {i.match(/"[A-Za-z]+":/gi)}
                            </span>
                            {i.split(/"[A-Za-z]+":/gi)[1]}
                        </pre>
                    ))}
                </div>
            </main>
        </>
    );
};

export default JSONViewer;
