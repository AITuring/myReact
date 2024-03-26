// 从ReactDOM中导入createRoot方法，用于创建React的根节点
import { createRoot } from 'react-dom/client';

// 使用createRoot方法创建React的根节点，并将其挂载到id为'app'的DOM元素上
export const root = createRoot(document.getElementById('app'));

// 初始化两个空数组，用于存储状态和状态设置器
const states = [];
const stateSetters = [];

// 初始化状态索引为0
let stateIndex = 0;

// 创建一个状态函数，如果对应索引的状态已经存在，则返回该状态，否则返回初始状态
function createState(initialState, stateIndex) {
    return states[stateIndex] ? states[stateIndex] : initialState;
}

// 创建一个状态设置器函数，它接受一个新的状态值或一个函数作为参数
// 如果新状态是一个函数，则使用该函数更新当前状态；否则，直接更新当前状态
// 更新状态后，调用render函数重新渲染组件
function createStateSetter(stateIndex) {
    return (newState) => {
        // 值或函数
        if (typeof newState === 'function') {
            states[stateIndex] = newState(states[stateIndex]);
        } else {
            states[stateIndex] = newState;
        }

        // 重新渲染
        render();
    }
}

// 导出useState函数，它接受一个初始状态作为参数，并返回一个状态值和一个状态设置器
export function useState(initialState) {
    // 将初始状态存入状态数组
    states[stateIndex] = createState(initialState, stateIndex);

    // 如果对应索引的状态设置器不存在，则创建一个并存入状态设置器数组
    if (!stateSetters[stateIndex]) {
        const stateSetter = createStateSetter(stateIndex);
        stateSetters.push(stateSetter);
    }

    // 获取当前状态值和状态设置器
    const _state = states[stateIndex];
    const _stateSetter = stateSetters[stateIndex];

    // 更新状态索引
    stateIndex++;

    // 返回状态值和状态设置器
    return [
        _state,
        _stateSetter
    ];
}

export function useReducer(reducer, initialState) {
    const [state, setState] = useState(initialState);

    function dispatch({type, payload}) {
        const nextState = reducer(state, {type, payload});
        setState(nextState);
    }

    return [state, dispatch]
}

// 初始化一个空数组，用于存储每个effect的依赖项
const effectDepArr = [];

// 初始化一个索引，用于跟踪当前的effect和它的依赖项
let effectIndex = 0;

// 导出useEffect函数，使其可以在其他模块中使用
export function useEffect(effect, deps) {
    // 检查effect是否是一个函数，如果不是，则抛出一个错误
    if (typeof effect !== 'function') {
        throw new Error('useEffect参数必须是一个函数');
    }

    // 检查deps是否是一个数组，如果不是并且不是undefined，则抛出一个错误
    if (deps !== undefined && !Array.isArray(deps)) {
        throw new Error('useEffect的第二个参数必须是一个数组');
    }

    // 检查deps是否发生了变化
    // 如果当前index的effect没有依赖项（即effectDepArr[effectIndex]为undefined），或者deps中的任何一个值与之前存储的值不同，则认为deps发生了变化
    const isChanged = effectDepArr[effectIndex] ? deps.some((dep, index) => dep !== effectDepArr[effectIndex][index]) : true;

    // 如果deps发生了变化，或者deps是undefined（表示这个effect没有依赖项），则执行effect函数
    if (isChanged || deps === undefined) {
        effect();
    }

    // 更新当前index的effect的依赖项
    effectDepArr[effectIndex] = deps;

    // 增加索引，为下一个effect和它的依赖项做准备
    effectIndex++;
}


// 定义一个异步的render函数，它用于渲染App组件
async function render() {
    // 动态导入App组件
    const App = (await import('../test')).default;

    // 在控制台打印App组件
    console.log(App);

    // 重置状态索引为0
    stateIndex = 0;

    // 使用根节点渲染App组件
    root.render(<App />);
}