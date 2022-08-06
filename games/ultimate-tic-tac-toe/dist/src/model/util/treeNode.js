"use strict";
class TreeNode {
    constructor(value = undefined) {
        this.value = value;
        this.children = [];
    }
    isLeaf() {
        return this.children.length === 0;
    }
    getChildren() {
        return this.children;
    }
    setChildren(children) {
        this.children = children;
    }
    size() {
        if (this.isLeaf()) {
            return 1;
        }
        let sum = 1;
        for (let child of this.children) {
            sum += child.size();
        }
        return sum;
    }
}
