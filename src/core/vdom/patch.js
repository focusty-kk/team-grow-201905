/**
 * Created with webstorm
 * User: yanghui
 * Date: 2019-05-29
 * Time: 17:20
 *
 */
import * as nodeOps from "./node-ops";
import {insertBefore} from "./node-ops";


function insert(parentElm, elm, refElm) {
    if (refElm) {
        nodeOps.insertBefore(parentElm, elm, refElm)
    } else {
        nodeOps.appendChild(parentElm, elm)
    }
}

/**
 * 根据vnode来渲染真实dom节点
 * @param vnode
 * @param parentElm
 * @param refElm
 */
function createElm(vnode, parentElm, refElm) {
    const children = vnode.children;
    const tag = vnode.tag;

    if (tag) {  // 非文本节点
        // 1 创建当前节点
        vnode.elm = document.createElement(tag);
        // 2 创建孩子节点
        createChildren(vnode, children);
        // 3 把当前节点插入到DOM上
        insert(parentElm, vnode.elm, refElm)
    } else {
        //非文本节点
        vnode.elm = document.createTextNode(vnode.text);
        insert(parentElm, vnode.elm, refElm)
    }

}

/**
 * 根据vnode渲染children节点
 * @param vnode
 * @param children
 */
function createChildren(vnode, children) {
    for (let i = 0; i < children.length; i++) {
        createElm(children[i], vnode.elm, null)
    }
}

/**
 * 简单比较两个节点
 * @param node1
 * @param node2
 */
function sameVnode(node1, node2) {
    return node1.tag === node2.tag
}

/**
 * 判断节点是否为空
 * @param text
 * @returns {boolean}
 */
function isUndef(text) {
    return text == null;
}

/**
 * 判断节点是否为空
 * @param text
 * @returns {boolean}
 */
function isDef(text) {
    return text != null;
}

/**
 * 循环增加节点
 * @param parentElm
 * @param refElm
 * @param vnode
 * @param startIdx
 * @param endIdx
 */
function addVnodes(parentElm, refElm, vnode, startIdx, endIdx) {
    for (; startIdx < endIdx; ++startIdx) {
        createElm(vnode[startIdx], parentElm, refElm)
    }
}

function updateChildren(parentElm, oldCh, ch, removeOnly) {
    let oldStartIdx = 0;
    let newStartIdx = 0;
    let oldEndIdx = oldCh.length - 1;
    let oldStartVnode = oldCh[0];
    let oldEndVnode = oldCh[oldEndIdx];
    let newEndIdx = ch.length - 1;
    let newStartVnode = ch[0];
    let newEndVnode = ch[newEndIdx];
    let refElm;

    const canMove = !removeOnly;

    while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
        if(isUndef(oldStartVnode)){
            oldStartVnode = oldCh[++oldStartIdx]
        }else if(isUndef(oldEndVnode)){
            oldEndVnode = oldCh[--oldEndVnode]
        }else if(sameVnode(oldStartVnode,newStartVnode)){
            patchVnode(oldStartVnode,newStartVnode);
            oldStartVnode = oldCh[++oldStartIdx];
            newStartVnode = ch[++newStartIdx]
        }else if(sameVnode(oldEndVnode,newEndVnode)){
            patchVnode(oldEndVnode,newEndVnode)
        }else if(sameVnode(oldStartVnode,newEndVnode)){
            patchVnode(oldStartVnode,newEndVnode);
            canMove &&
                insertBefore(
                    parentElm,
                    oldStartVnode.elm,
                    nodeOps.nextSibling(newEndVnode.elm)
                );
            oldStartVnode = oldCh[++oldStartIdx];
            newStartVnode = ch[--newStartIdx];
        }else if(sameVnode(oldEndVnode,newStartVnode)){
            patchVnode(oldEndVnode,newStartVnode)
            canMove &&
                insertBefore(
                    parentElm,
                    oldEndVnode.elm,
                    oldStartVnode.elm
                )
            oldEndVnode = oldCh[--oldStartIdx]
            newStartVnode = ch[++newStartVnode]
        }else{
            createElm(newStartVnode,parentElm,oldStartVnode.elm)
            newStartVnode = ch[++newStartIdx]
        }
    }

    if (oldStartIdx > oldEndIdx) {
        refElm = isUndef(ch[newEndIdx + 1]) ? null : newCh[newEndIdx + 1].elm;
        addVnodes(parentElm, refElm, ch, newStartIdx, newEndIdx);
    } else if (newStartIdx > newEndIdx) {
        removeVnodes(parentElm, oldCh, oldStartIdx, oldEndIdx);
    }


}

/**
 *
 * @param oldVnode
 * @param vnode
 * @param removeOnly
 */
function patchVnode(oldVnode, vnode, removeOnly) {
    if (oldVnode === vnode) {
        return;
    }
    const elm = (vnode.elm = oldVnode.elm);
    const oldCh = oldVnode.children;
    const ch = vnode.children;

    if (isUndef(vnode.text)) { //元素节点
        if (isDef(oldCh) && isDef(ch)) {  //当新旧vnode的子节点都存在的时候
            if (oldCh !== ch) updateChildren(elm, oldCh, ch, removeOnly)
        } else if (isDef(ch)) {    // 如果vnode chidren不为空
            // 如果oldvnode 节点下text节点的话则清空elm,然后增加
            if (isDef(oldCh.text)) nodeOps.setTextContent(elm, '');
            addVnodes(elm, null, ch, 0, ch.length - 1)
        } else if (isDef(oldCh)) {
            removeVnodes(elm, oldCh, 0, oldCh.length - 1)
        } else if (isDef(oldCh.text)) {
            nodeOps.setTextContent(elm, '')
        }

    } else {  //文本节点
        nodeOps.setTextContent(vnode.text)  //如果是文本节点则替换成新的
    }

}

/**
 * 删除node节点
 * @param elm
 */
function removeNode(elm) {
    const parentElm = nodeOps.parentNode(elm);
    if (parentElm) {
        nodeOps.removeChild(parentElm, elm)
    }
}

function removeVnodes(parentElm, vnodes, startIdx, endIdx) {
    for (; startIdx < endIdx; ++startIdx) {
        const ch = vnodes[startIdx];
        if (isDef(ch)) {
            removeNode(ch.elm)
        }
    }
}

/**
 * 1,如果oldVnode等于vnode 则不更新
 * 2，如果不相等则，渲染新的节点，去掉老的节点
 *
 * @param oldVnode
 * @param vnode
 */
export default function patch(oldVnode, vnode) {
    /*if (sameVnode(oldVnode, vnode)) {
        patchVnode(oldVnode, vnode)
    } else {
        const oldElm = oldVnode.elm;
        const parentElm = nodeOps.parentNode(oldElm);
        const oldElmNextSibling = nodeOps.nextSibling(oldElm);
        createElm(vnode, parentElm, oldElmNextSibling);
        if (parentElm !== null) {
            removeVnodes(parentElm, [oldVnode], 0, 0)
        }
    }
    return vnode.elm*/

    let isInitialPatch = false;

    if (sameVnode(oldVnode, vnode)) {
        // 如果两个vnode节点根一致
        patchVnode(oldVnode, vnode);
    } else {
        //既然到了这里 就说明两个vnode的dom的根节点不一样
        //只是拿到原来的dom的容器parentElm，把当前vnode的所有dom生成进去
        //然后把以前的oldVnode全部移除掉
        const oldElm = oldVnode.elm;
        const parentElm = nodeOps.parentNode(oldElm);
        createElm(vnode, parentElm, nodeOps.nextSibling(oldElm));

        if (parentElm !== null) {
            removeVnodes(parentElm, [oldVnode], 0, 0);
        }
    }

    return vnode.elm;
}
