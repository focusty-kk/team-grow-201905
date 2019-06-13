/**
 * Created with webstorm
 * User: yanghui
 * Date: 2019-06-10
 * Time: 14:11
 *
 */

/**
 * 1. codegen/index.js      (把 AST树 生成 VNode 树)
 */

import VNode from 'core/vdom/vnode'

/**
 * ast 返回childrenVnode
 * @param el
 * @returns {[]}
 */
function genChildren(el) {
    const children = el.children;
    const childrenVnode = [];

    if (children.length) {
        children.forEach(c => {
            childrenVnode.push(genElement(c))
        })
    }

    return childrenVnode;
}

/**
 *  根据 ast生成vnode
 * @param el
 * @returns {vnode}
 */
function genElement(el) {
    let vnode = null;
    if (el) {
        if (el.type === 1) {  // 非文本节点
            vnode = new VNode(el.tag, genChildren(el), undefined, null)
        } else if (el.type === 3) {
            vnode = new VNode(null, [], el.text, null)
        }
    }

    return vnode;
}

export default function generate(ast) {
    return genElement(ast)
}


