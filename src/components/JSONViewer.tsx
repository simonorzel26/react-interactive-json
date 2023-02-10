
import { Dispatch, SetStateAction, useState } from 'react';
import { objectDeepKeys } from './helpers';
import SingleLineIteration from './SingleLineIteration';

type Props = {
    json: any,
    setSelectedKey: Dispatch<SetStateAction<string>>
}

const JSONViewer = ({ json, setSelectedKey }: Props) => {
    const jsonData = JSON.stringify(json, null, 2).split(/\n/gi);
    const deepKeys = objectDeepKeys(json);

    return (
        <>
            <div>
                <pre>
                    {jsonData.map((i, index) => (
                        <SingleLineIteration key={index} deepKeys={deepKeys} deepKeyIndex={index} text={i} setDeepKey={setSelectedKey} />
                    ))}
                </pre>
            </div>
        </>
    );
};

export default JSONViewer;
