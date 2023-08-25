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
  array.forEach(item => {
    documentFragment.appendChild(item);
  });
  return documentFragment.childNodes;
}

/**
 * 判断是否为 vnode 节点
 * @param node - 节点
 * @returns 是否为 vnode 节点
 * @example
 * isVNode(document.createElement('div')) // false
 * isVNode(h('div')) // true
 */
export function isVNode(node: any) {
  return (
    node &&
    typeof node === 'object' &&
    (node.hasOwnProperty('$tag$') ||
      node.hasOwnProperty('$flags$') ||
      node.hasOwnProperty('$children$') ||
      node.hasOwnProperty('$attrs$') ||
      node.hasOwnProperty('$key$') ||
      node.hasOwnProperty('$ref$') ||
      node.hasOwnProperty('$elm$') ||
      node.hasOwnProperty('$text$'))
  );
}
