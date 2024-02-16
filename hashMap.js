// node class
class node {
    constructor(key, value) {
        this.key = key;
        this.value = value;
        this.next = null;
    };
}

// linkedList class
class linkedList {
    constructor() {
        this.head = null;
    }

    // append(value) method
    append(key, value) {
        const newNode = new node(key, value);
        if (!this.head) {
            this.head = newNode;
        } else {
            // go to the end of the list
            let curr = this.head;
            while (curr.next != null) {
                curr = curr.next;
            }
            curr.next = newNode;
        }
    }

    // prepend method, add node to the start of the list
    prepend(key, value) {
        const newNode = new node(key, value);
        if (!this.head) {
            this.append(key, value);
        } else {
            newNode.next = this.head;
            this.head = newNode;
        }
    }

    // size returns the size of the list
    size() {
        let count = 0;
        let curr = this.head;

        while (curr != null) {
            count++;
            curr = curr.next;
        }
        return count;
        
    }

    // tail returns the last node in the list
    tail() {
        let curr = this.head;
        while (curr.next != null) {
            curr = curr.next;
        }
        return curr;
    }

    // at(index) returns the node at the given index
    at(index) {
        let curr = this.head;
        let counter = 0;

        while (curr != null) {

            if (counter == index) {
                return curr;
            }
            counter++;
            curr = curr.next;
        }
        return null;
    }

    // pop removes the last element
    pop() {
        let curr = this.head;
        let prev = null;

        while (curr != null) {
            prev = curr;
            curr = curr.next;
        }
        prev.next = null;
    }


    // contains(value) returns true if the value is in the list and false if not
    containsValue(value) {

        let curr = this.head;
        while (curr != null) {
            if (curr.key == value) return true;
            curr = curr.next;
        }
        return false
    }
    // find(value) returns the index of the node containing the value or null if not found
    find(value) {
        let index = 0;
        let curr = this.head;
        while (curr != null) {
            if (curr.key == value) return index;
            index++;
            curr = curr.next;
        }
        return null;
    }

    // to string represents the linkedlist as (value) -> (value) -> (value) -> null
    toString() {
        let curr = this.head;
        let nodeString = '';
        while (curr != null) {
            nodeString += `(${curr.key}, ${curr.value}) -> `;
            curr = curr.next;
        }
        nodeString += 'null';
        return nodeString;
    }

    // insertAt(value, index) inserts a new node with the provided value at the given index
    insertAt(key, value, index) {

        if (index == 0) {
            this.prepend(key, value);
            return
        }

        let curr = this.head;
        let prev = null;
        let counter = 0;

        while (counter < index) {
            prev = curr;
            curr = curr.next;
            counter++;
        }

        const newNode = new node(key, value);
        prev.next = newNode;
        newNode.next = curr;
    }

    // removeAt(index) removes the node at the given index
    removeAt(index) {
        if (index == 0) {
            this.head = this.head.next;
            return;
        }

        let curr = this.head;
        let prev = null;
        let counter = 0;

        while (counter < index) {
            prev = curr;
            curr = curr.next;
            counter++;
        }
        prev.next = curr.next;
    }
}

class HashMap {
    constructor() {
        this.length = 16;
        this.map = [];
    }

    hash(key) {
        let hashCode = 0;

        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
            hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % 16;
        }

        return hashCode;
    }

    set(key, value) {
        const hashValue = this.hash(key);
        if (!this.map[hashValue]) {
            this.map[hashValue] = new linkedList();
            this.map[hashValue].append(key, value);
            return;
        }

        // is there is an existing chain here, check if the key exists. if not, append a new one
        const foundIndex = this.map[hashValue].find(key);
        if (foundIndex != null) {
            this.map[hashValue].removeAt(foundIndex);
        }
        this.map[hashValue].append(key, value);
    }

    get(key) {
        const hashValue = this.hash(key);
        // this is a linkedlist
        let curr = this.map[hashValue].head;
        while (curr != null) {
            if (curr.key == key) return curr.value;
            curr = curr.next;
        }
        return curr;
    }

    has(key) {
        const hashValue = this.hash(key);

        // if nothing here, there is no key
        if (!this.map[hashValue]) return false;

        // if something here, check if the value exists
        return this.map[hashValue].containsValue(key);
    }

    remove(key) {
        const hashValue = this.hash(key);

        if (!this.map[hashValue]) return false;
        
        // find the index
        const index = this.map[hashValue].find(key);
        if (index == null) return false;

        // remove at index
        this.map[hashValue].removeAt(index);
        return true;
    }

    print(hashValue) {
        console.log(this.map[hashValue].toString());
    }
    
    keyCount() {
        let keys = 0;

        for (let i = 0; i < this.map.length; i++) {
            if (this.map[i]) {
                keys += this.map[i].size();
            }
        }
        return keys;
    }

    clear() {
        for (let i = 0; i < this.map.length; i++) {
            this.map[i] = null;
        }
    }

    keys() {
        let keys = [];
        for (let i = 0; i < this.map.length; i++) {
            if (this.map[i]) {
                let curr = this.map[i].head;

                while (curr != null) {
                    keys.push(curr.key);
                    curr = curr.next;
                }
            }
        }
        return keys;
    }

    values() {
        let values = [];
        for (let i = 0; i < this.map.length; i++) {
            if (this.map[i]) {
                let curr = this.map[i].head;

                while (curr != null) {
                    values.push(curr.value);
                    curr = curr.next;
                }
            }
        }
        return values;
    }

    entries() {
        let entries = [];
        for (let i = 0; i < this.map.length; i++) {
            if (this.map[i]) {
                let curr = this.map[i].head;

                while (curr != null) {
                    entries.push([curr.key, curr.value]);
                    curr = curr.next;
                }
            }
        }
        return entries;
    }


}

