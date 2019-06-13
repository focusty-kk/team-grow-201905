/**
 * Created with webstorm
 * User: yanghui
 * Date: 2019-06-10
 * Time: 14:11
 *
 */

import {parseHTML} from './html-parser'

/**
 * 将字符串转换成ast流
 *
 */
export default function parse(template){
    return parseHTML(template)
}
