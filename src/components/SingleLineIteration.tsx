import { Dispatch, SetStateAction } from "react";

const SingleLineIteration = ({ text, deepKeys, setDeepKey }: { text: string, deepKeys: string[], setDeepKey: Dispatch<SetStateAction<string>> }) => {
    const regex = /"[A-Za-z0-9-_!§$%&/()=?+*#^<>|]+":/gi;
    const splitAtKey = text.split(regex);
    const matchedKey = text.match(regex);
    const deepKey = matchedKey ? deepKeys.shift() : null;

    return (
        <div>
            {splitAtKey[0]}
            <span
                onClick={() => deepKey ? setDeepKey(deepKey) : {}}
                style={{cursor: 'pointer', color: 'blue'}}
            >
                {matchedKey}
            </span>
            {splitAtKey[1]}
        </div>
    )
}

export default SingleLineIteration;