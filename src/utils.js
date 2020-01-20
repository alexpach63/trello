export const randomInteger = (min, max) => {
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
}

export const createCustoms = (evt, list) => ({
    element: evt.item,
    newIndex: evt.newIndex,
    oldIndex: evt.oldIndex,
    parentElement: evt.from,
    item: list[evt.oldIndex],
})

export function removeNode(node: HTMLElement) {
    if (node.parentElement !== null) node.parentElement.removeChild(node);
}

export function insertNodeAt(parent: HTMLElement, newChild: HTMLElement, index: number) {
    const refChild = parent.children[index] || null;
    parent.insertBefore(newChild, refChild);
}