// 定义一个名为 createElement 的函数，它接受一个元素类型 type，一组属性 props，以及任意数量的子元素 children
function createElement(type, props, ...children) {
    // 返回一个对象，表示一个虚拟DOM元素
    return {
        // 元素类型
        type,
        // 元素属性。这里使用了展开运算符，将传入的 props 合并到新的对象中
        props: {
            ...props,
            // 子元素。这里使用了 map 方法遍历 children，如果子元素是对象，则直接使用；否则，调用 createTextElement 函数将其转换为文本元素
            children: children.map(child => typeof child === 'object' ? child : createTextElement(child))
        },
        // 子元素列表
        children
    };
}

// 定义一个名为 createTextElement 的函数，它接受一个文本内容 text
function createTextElement(text) {
    // 返回一个对象，表示一个文本虚拟DOM元素
    return {
        // 元素类型固定为 'TEXT_ElEMENT'
        type: 'TEXT_ElEMENT',
        // 元素属性。这里包含了文本内容 nodeValue 和一个空的子元素列表
        props: {
            nodeValue: text,
            children: []
        }
    }
}

// 导出 createElement 函数，使其可以在其他模块中使用
export default createElement;