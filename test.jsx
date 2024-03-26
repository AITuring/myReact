import {
    useState,
    useReducer,
    useEffect,
    root
} from './MyHooks';
/**
 * data => state
 * view => update
 * 视图上某一个状态发生变化，视图发生相应更新
 * 
 * 
 * useReducer => 收集所有操作某一个数据的方案
 * 派发器 => 根据不同传入参数，执行不同的操作
 *
 */
function App() {

    function countReducer(count, {type, payload}) {
        switch (type) {
            case 'PLUS':
                return count + payload;
                break;
            case 'MINUS':
                return count - payload;
                break;
            case 'MUL':
                return count * payload;
                break;
            case 'DIV':
                return count / payload;
                break;
            default: return count;
        }
    }
    /**
     * dispatch => 派发器
     * dispatch({type: 'PLUS', payload: 1})
     */
    const [count, dispatch] = useReducer(countReducer, 1);

    useEffect(() => {
        ;(async () => {
            await new Promise(resolve => setTimeout(() => resolve(), 1000));
            dispatch({type: 'PLUS', payload: 1});
        })()
    }, [count]);

    return (
        <div>
            <h1>{count}</h1>
            <button onClick={() => dispatch({type: 'MUL', payload: 2})}>*</button>
            <br/>
            <button onClick={() => dispatch({type: 'DIV', payload: 2})}>/</button>
        </div>
    )
}

root.render(<App/>);

export default App;