import { useState } from 'react';

function Count() {
    let [count, setCount] = useState(0);
    // [] array
    // [변수, setter]=useState(value)
    function increase() {
        setCount(count + 1);
    }

    return (
        <div>
            <button onClick={increase}>좋아요</button> {count}
        </div>
    );
}

export default Count;