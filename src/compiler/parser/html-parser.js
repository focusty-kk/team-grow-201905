/**
 * Created with webstorm
 * User: yanghui
 * Date: 2019-06-10
 * Time: 14:12
 *
 */
import {makeMap, no} from '../shared/util'

export const isUnaryTag = makeMap('' +
    'area,base,br,col,embed,frame,hr,img,input,isindex,keygen,' +
    'link,meta,param,source,track,wbr', true);

const singleAttrIdentifier = /([^\s"'<>/=]+)/; //单个属性标识符
const singleAttrAssign = /(?:=)/  //单个属性赋值
const singleAttrValues = [
    // attr value double quotes
    /"([^"]*)"+/.source,
    // attr value, single quotes
    /'([^']*)'+/.source,
    // attr value, no quotes
    /([^\s"'=<>`]+)/.source
]

const attribute = new RegExp(
    '^\\s*' + singleAttrIdentifier.source +
    '(?:\\s*(' + singleAttrAssign.source + ')' +
    '\\s*(?:' + singleAttrValues.join('|') + '))?'
)

let IS_REGEX_CAPTURING_BROKEN = false
'x'.replace(/x(.)?/g, function (m, g) {
    IS_REGEX_CAPTURING_BROKEN = g === ''
})

// Special Elements (can contain anything)
const isScriptOrStyle = makeMap('script,style', true)
const reCache = {}


const decodingMap = {
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&amp;': '&',
    '&#10;': '\n'
}
const encodedAttr = /&(?:lt|gt|quot|amp);/g
const encodedAttrWithNewLines = /&(?:lt|gt|quot|amp|#10);/g

// check whether current browser encodes a char inside attribute values
function shouldDecode (content, encoded) {
    const div = document.createElement('div')
    div.innerHTML = `<div a="${content}">`
    return div.innerHTML.indexOf(encoded) > 0
}

const shouldDecodeNewlines = shouldDecode('\n', '&#10;')

function decodeAttr (value) {
    const re = shouldDecodeNewlines ? encodedAttrWithNewLines : encodedAttr
    return value.replace(re, match => decodingMap[match])
}

