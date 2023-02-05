
import { useState } from 'react';
import data from '../../data.json'

const objectDeepKeys: any = (obj: { [x: string]: any; date?: string; hasError?: boolean; fields?: { id: string; prop: string; value: string; hasError: boolean; }[]; }) => {
    var keys: any[] = [];
    for (var key in obj) {
        keys.push(key);
        if (typeof obj[key] === "object") {
            var subkeys = objectDeepKeys(obj[key]).filter((subkey: string | any[]) => subkey.length > 1);
            keys = keys.concat(subkeys.map(function (subkey: string) {
                return key + "." + subkey;
            }));
        }
    }
    return keys;
}

function fromPath(obj: { [x: string]: any; date?: string; hasError?: boolean; fields?: { id: string; prop: string; value: string; hasError: boolean; }[]; }, path: string, splitter = '.') {
    if (!path)
        return obj;

    if (typeof path === 'number' || !~path.indexOf(splitter))
        return obj[path];

    return path.split(splitter).reduce((o, i) => (o === Object(o) ? o[i] : o), obj);
}

const JSONViewer = () => {
    const [deepKey, setDeepKey] = useState('')
    const jsonData = JSON.stringify(data, null, 2).split(/\n/gi);
    const deepKeys = objectDeepKeys(data);

    const SingleLineIteration = ({ text }: { text: string }) => {
        const regex = /"[A-Za-z]+":/gi;
        const splitAtKey = text.split(regex);
        const matchedKey = text.match(regex);
        let deepKey = '';

        if (matchedKey) {
            deepKey = deepKeys.shift();
        }

        return (
            <pre>
                {splitAtKey[0]}
                <span
                    onClick={() => setDeepKey(deepKey)}
                    className='hover:underline text-blue-600 cursor-pointer'
                >
                    {matchedKey}
                </span>
                {splitAtKey[1]}
            </pre>
        )
    }

    const displayData = (data: { [x: string]: any; date: string | undefined; hasError: boolean | undefined; fields: { id: string; prop: string; value: string; hasError: boolean; }[] | { id: string; prop: string; value: string; hasError: boolean; }[] | undefined; }) => {
        const fromPathData = fromPath(data, deepKey);
        if (typeof fromPathData === 'object') return 'Object';

        return JSON.stringify(fromPath(data, deepKey), null, 2);
    }

    return (
        <>
            <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#fff] to-[#fff]">
                <div className="container flex flex-col items-left justify-center ">
                    <input  type="text" name="name" className='text-2xl h-12 border-blue-400 border-solid border-2'  value={deepKey} onChange={(event) => setDeepKey(event.target.value)}  />
                    <div className='text-xl h-36'>
                        {displayData(data)}
                    </div>
                    {jsonData.map((i, index) => (
                        <SingleLineIteration key={index} text={i} />
                    ))}
                </div>
            </main>
        </>
    );
};

export default JSONViewer;
