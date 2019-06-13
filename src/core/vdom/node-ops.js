/**
 * Created with webstorm
 * User: yanghui
 * Date: 2019-05-31
 * Time: 09:58
 *
 */

/*新建元素nodeType等于1的节点*/
export function createElement(tagName){
    return document.createElement(tagName)
}

/*新建元素nodeType等于3的节点*/
export function createTextNode(text) {
    return document.createTextNode(text)
}

/*新建注释节点*/
export function createComment(text) {
    return document.createComment(text)
}

/*前面插入node节点*/
export function insertBefore(parentNode,newNode,referenceNode) {
    parentNode.insertBefore(newNode,referenceNode)
}

/*删除节点元素*/
export function removeChild(node,child) {
    node.removeChild(child)
}

/*后面插入元素*/
export function appendChild(node,child){
    node.appendChild(child)
}

/*获取父元素*/
export function parentNode(node) {
    return node.parentNode
}

/*获取兄弟元素*/
export function nextSibling(node) {
    return node.nextSibling
}

/*获取tagName*/
export function tagName(node) {
    return node.tagName
}

/*元素设置text，如果您设置了 textContent 属性，会删除所有子节点，并被替换为包含指定字符串的一个单独的文本节点。*/
export function setTextContent(node,text) {
    node.textContent = text
}

/*元素设置属性*/
export function setAttribute(node,key,value) {
    node.setAttribute(key,value)
}

