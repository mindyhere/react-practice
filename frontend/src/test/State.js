import { useState } from 'react';

function State() {
    const [names, setName] = useState(['김철수', '마이클', '손흥민']);

    return (
        <div>
            {names[0]}<br />
            {names[1]}<br />
            {names[2]}<br />
        </div>
    );
}

export default State;