/**
 * Created with webstorm
 * User: yanghui
 * Date: 2019-06-11
 * Time: 15:00
 *
 */

export const no = () => false;

export function makeMap(str, expectLowerCase) {
    const map = Object.create(null);
    const list = str.split(',');
    for (let i = 0; i < list.length; i++) {
        map[list[i]] = true;
    }
    return expectLowerCase
        ? val => map[val.toLowerCase()]
        : val => map[val]
}

