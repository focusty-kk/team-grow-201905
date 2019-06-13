/**
 * Created with webstorm
 * User: yanghui
 * Date: 2019-06-03
 * Time: 16:01
 *
 */
import VNode from 'core/vdom/vnode'
import patch from 'core/vdom/patch'
import parse from 'compiler/parser/index'
import generate from 'compiler/codegen/index'

window.VNode = VNode;
window.patch = patch;
window.parse = parse;
window.generate = generate;
