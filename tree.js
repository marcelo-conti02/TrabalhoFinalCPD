class BPlusTree {
  constructor(order) {
    this.root = null;
    this.order = order;
  }

  insert(key, value) {
    if (!this.root) {
      this.root = new BPlusNode(true);
      this.root.keys.push({ key, value });
      return;
    }

    this.root = this.root.insert(key, value);

    // Split root if necessary
    if (this.root.isOverflow()) {
      const newRoot = new BPlusNode(false);
      const split = this.root.split();
      newRoot.children.push(this.root, split.newNode);
      newRoot.keys.push(split.middleKey);
      this.root = newRoot;
    }
  }

  search(key) {
    return this.root ? this.root.search(key) : null;
  }

  remove(key) {
    if (this.root) {
      this.root = this.root.remove(key);

      // Adjust root if it has only one child
      if (this.root.children.length === 1 && !this.root.isLeaf()) {
        this.root = this.root.children[0];
      }
    }
  }
}

class BPlusNode {
  constructor(isLeaf) {
    this.isLeaf = isLeaf;
    this.keys = [];
    this.children = [];
  }

  insert(key, value) {
    let index = 0;

    while (index < this.keys.length && key > this.keys[index].key) {
      index++;
    }

    if (this.isLeaf) {
      this.keys.splice(index, 0, { key, value });
    } else {
      const child = this.children[index];
      child.insert(key, value);

      // Split child if necessary
      if (child.isOverflow()) {
        const split = child.split();
        this.children.splice(index, 1, split.newNode);
        this.keys.splice(index, 0, split.middleKey);
      }
    }

    return this;
  }

  search(key) {
    if (this.isLeaf) {
      const keyIndex = this.keys.findIndex((k) => k.key === key);
      return keyIndex !== -1 ? this.keys[keyIndex].value : null;
    }

    let index = 0;
    while (index < this.keys.length && key > this.keys[index].key) {
      index++;
    }

    return this.children[index].search(key);
  }

  remove(key) {
    let index = 0;
    while (index < this.keys.length && key > this.keys[index].key) {
      index++;
    }

    if (this.isLeaf) {
      if (this.keys[index] && this.keys[index].key === key) {
        this.keys.splice(index, 1);
      }
    } else {
      const child = this.children[index];
      child.remove(key);

      // Merge or redistribute children if necessary
      if (child.isUnderflow()) {
        const leftSibling = index > 0 ? this.children[index - 1] : null;
        const rightSibling = index < this.children.length - 1 ? this.children[index + 1] : null;

        if (rightSibling && rightSibling.keys.length > Math.floor(BPlusTree.order / 2)) {
          const transferKey = rightSibling.keys.shift();
          const transferChild = rightSibling.children.shift();
          child.keys.push(this.keys[index]);
          this.keys[index] = transferKey;
          child.children.push(transferChild);
        } else if (leftSibling && leftSibling.keys.length > Math.floor(BPlusTree.order / 2)) {
          const transferKey = leftSibling.keys.pop();
          const transferChild = leftSibling.children.pop();
          child.keys.unshift(this.keys[index - 1]);
          this.keys[index - 1] = transferKey;
          child.children.unshift(transferChild);
        } else if (rightSibling) {
          // Merge with right sibling
          const mergedKeys = child.keys.concat([this.keys[index]], rightSibling.keys);
          const mergedChildren = child.children.concat(rightSibling.children);
          this.keys.splice(index, 1);
          this.children.splice(index, 2, new BPlusNode(false, mergedKeys, mergedChildren));
        } else if (leftSibling) {
          // Merge with left sibling
          const mergedKeys = leftSibling.keys.concat([this.keys[index - 1]], child.keys);
          const mergedChildren = leftSibling.children.concat(child.children);
          this.keys.splice(index - 1, 1);
          this.children.splice(index - 1, 2, new BPlusNode(false, mergedKeys, mergedChildren));
        }
      }
    }

    return this;
  }

  split() {
    const middleIndex = Math.floor(this.keys.length / 2);
    const middleKey = this.keys[middleIndex];
    const newNode = new BPlusNode(this.isLeaf);

    newNode.keys = this.keys.splice(middleIndex + 1);
    newNode.children = this.children.splice(middleIndex + 1);

    return { middleKey, newNode };
  }

  isOverflow() {
    return this.keys.length > BPlusTree.order - 1;
  }

  isUnderflow() {
    return this.keys.length < Math.ceil(BPlusTree.order / 2) - 1;
  }
}

// Usage example
const bPlusTree = new BPlusTree(3);

// Insert
bPlusTree.insert(1, "One");
bPlusTree.insert(2, "Two");
bPlusTree.insert(3, "Gremio");
bPlusTree.insert(4, "Four");
bPlusTree.insert(5, "Five");
bPlusTree.insert(6, "Six");
bPlusTree.insert(7, "Seven");

// Search
let log=bPlusTree.search(3); // Output: Three
console.log(log)
