/**
 * 将虚拟DOM元素渲染到真实DOM容器中
 *
 * @param {Object} element - 虚拟DOM元素对象
 * @param {HTMLElement} container - 真实DOM容器元素
 */
export default function render(element, container) {
    console.log(element.props)
    // 根据虚拟DOM元素的类型创建对应的真实DOM节点
    const dom = element.type === 'TEXT_ElEMENT'
        ? document.createTextNode('') // 如果是文本元素，则创建一个文本节点
        : document.createElement(element.type); // 如果是其他元素，则创建一个对应类型的元素节点

    // 定义一个函数，用于判断属性名是否不是'children'
    const isProperty = key => key !== 'children';

    // 遍历虚拟DOM元素的属性对象
    Object.keys(element.props)
        // 使用filter方法过滤出不是'children'的属性
        .filter(isProperty)
        // 遍历过滤后的属性名，并将虚拟DOM元素的属性值设置到真实DOM节点上
        .forEach(name => {
            switch (name) {
                case 'style':
                    // 特殊处理style属性，将其属性逐个设置到真实DOM节点的style对象上
                    Object.keys(element.props.style).forEach(styleName => {
                        dom.style[styleName] = element.props.style[styleName];
                    });
                    break;
                default:
                    // 对于其他属性，直接设置到真实DOM节点上
                    dom[name] = element.props[name];
                    break;
            }
        });

    // 特殊处理style属性
    // if (element.props.style) {
    //     Object.keys(element.props.style).forEach(styleName => {
    //         dom.style[styleName] = element.props.style[styleName];
    //     });
    // }


    // 遍历虚拟DOM元素的子元素，并递归调用render函数，将子元素渲染到当前真实DOM节点上
    element.props.children.forEach(child => render(child, dom));

    // 将真实DOM节点添加到真实DOM容器中
    container.appendChild(dom);
}