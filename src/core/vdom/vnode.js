// vnode.js


/**
 * Vnode的类
 * 1，标签
 * 2，子标签
 * 3，文本
 */
export default class Vnode {
    constructor(tag, children, text,elm) {
        this.tag = tag;
        this.children = children;
        this.text = text;
        this.elm = elm
    }
}
