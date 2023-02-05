
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

const JSONViewer = () => {
    const jsonData = JSON.stringify(data, null, 2).split(/\n/gi);
    const deepKeys = objectDeepKeys(data);
    console.log(deepKeys);

    const SingleLineIteration = ({ text }: { text: string }) => {
        const regex = /"[A-Za-z]+":/gi;
        const splitAtKey = text.split(regex);
        const matchedKey = text.match(regex);
        let deepKey = '';

        if (matchedKey) {
            deepKey = deepKeys.shift();
        }

        const onKeyClick = (deepKey: string) => {
            console.log(deepKey);
        }

        return (
            <pre>
                {splitAtKey[0]}
                <span
                    onClick={() => onKeyClick(deepKey)}
                    className='hover:underline hover:text-blue-600 cursor-pointer'
                >
                    {matchedKey}
                </span>
                {splitAtKey[1]}
            </pre>
        )
    }

    return (
        <>
            <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#fff] to-[#fff]">
                <div className="container flex flex-col items-left justify-center ">
                    {jsonData.map((i, index) => (
                        <SingleLineIteration key={index} text={i} />
                    ))}
                </div>
            </main>
        </>
    );
};

export default JSONViewer;
