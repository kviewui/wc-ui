/**
 * 把HTMLCollection转换成NodeList
 * @param {HTMLCollection} collection - HTMLCollection
 * @returns {NodeList} NodeList
 * @example
 * convertHTMLCollectionToArray(document.getElementsByTagName('div'))
 * convertHTMLCollectionToArray(document.getElementsByClassName('test'))
 * convertHTMLCollectionToArray(document.querySelectorAll('div'))
 */
export function convertHTMLCollectionToArray(collection: HTMLCollection): NodeList | [] {
    // 如果 collection 不是 HTMLCollection 类型，则直接返回空数组
    if (!(collection instanceof HTMLCollection)) return [];
   let array = Array.prototype.slice.call(collection);
   let documentFragment = document.createDocumentFragment();
    array.forEach((item) => {
        documentFragment.appendChild(item);
    });
    return documentFragment.childNodes;
}