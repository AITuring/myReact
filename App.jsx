// 从ReactDOM中导入createRoot方法，用于创建React的根节点
import { createRoot } from 'react-dom/client';

// 使用createRoot方法创建React的根节点，并将其挂载到id为'app'的DOM元素上
export const root = createRoot(document.getElementById('app'));

import {useState,} from './MyHooks';
import {memo, useMemo} from 'react';

const Child = memo((props) => {
    console.log('child is recalled')
    return (
        <div>
            <h1>count2: {props.childData.count2}</h1>
            {/* <button onClick={() => props.setCount(props.count + 1)}>+</button>
            <button onClick={() => props.setCount(props.count - 1)}>-</button> */}
        </div>
    );
});

function App () {
    const [count, setCount] = useState(0);
    const [count2, setCount2] = useState(0);

    // const childData = {
    //     count2
    // };

    const childData = useMemo(() => ({count2}), [count2]);

    return (
        <div>
            <h1>count: {count}</h1>
            <button onClick={() => setCount(count + 1)}>count+</button>
            <button onClick={() => setCount(count - 1)}>count-</button>
            <Child childData={childData} />
            <button onClick={() => setCount2(count2 + 1)}>count+</button>
            <button onClick={() => setCount2(count2 - 1)}>count-</button>
        </div>
    );
}

root.render(<App />);

export default App;