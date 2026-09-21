class HashMap {
    constructor() {
        this.capacity = 16;
        this.loadFactor = this.capacity * 0.75
        this.hashes = [];
        this.size = 0
    }
    hash(key) {
        let hashCode = 0;
        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
            hashCode = primeNumber * hashCode + key.charCodeAt(i);
        }
        return hashCode;
    } 
    set(key, value) {
        let newKey = this.hash(key) % this.capacity
        this.hashes[newKey] = [newKey, value]
        this.size++
        if (this.size > this.loadFactor) {
            this.size = 0
            this.capacity *= 2
            this.loadFactor = this.capacity * 0.75
            let newHashes = []
            this.hashes.forEach(hash => {
                newHashes.push([hash[0], hash[1]])
            });
            newHashes.forEach(newHash => {
                this.set(this.hash(newHash[0]), newHash[1])
            });
        }

    }
    get(key) {
        if (this.hashes[this.hash(key) % this.capacity] === undefined) {
            return undefined
        } else if (this.hashes[this.hash(key) % this.capacity][1] === undefined || this.hashes[this.hash(key) % this.capacity][0] !== this.hash(key) % this.capacity) {
            return undefined
        } else {return this.hashes[this.hash(key) % this.capacity][1]}
    }
    has(key) {
        if (this.hashes[this.hash(key) % this.capacity] === undefined) {
            return false
        } else if (this.hashes[this.hash(key) % this.capacity][0] !== this.hash(key) % this.capacity) {
            return false
        } else {return true}
    }
    length() {
        let counter = 0
        this.hashes.forEach(hash => {
            counter++
        })
        return counter
    }
    clear() {
        this.capacity = 16
        this.loadFactor = this.capacity * 0.75
        this.hashes = []
        this.size = 0
    }
    keys() {
        let keyArray = []
        this.hashes.forEach(hash => {
            keyArray.push(hash[0])
        })
        return keyArray
    }
    values() {
        let valueArray = []
        this.hashes.forEach(hash => {
            if (hash[1] !== undefined) {
                valueArray.push(hash[1])
            }
        })
        return valueArray
    }
    entries() {
        return this.hashes
    }
}
class HashSet {
    constructor() {
        this.capacity = 16
        this.loadFactor = this.capacity * .75
        this.hashes = []
        this.size = 0
    }
    hash(key) {
        let hashCode = 0;
        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
            hashCode = primeNumber * hashCode + key.charCodeAt(i);
        }
        return hashCode;
    } 
    set(key) {
        let newKey = this.hash(key) % this.capacity
        this.hashes[newKey] = newKey
        this.size++
        if (this.size > this.loadFactor) {
            this.size = 0
            this.capacity *= 2
            this.loadFactor = this.capacity * 0.75
            let newHashes = []
            this.hashes.forEach(hash => {
                newHashes.push(hash)
            });
            newHashes.forEach(newHash => {
                this.set(this.hash(newHash))
            });
        }
    }
    get(key) {
        if (this.hashes[this.hash(key) % this.capacity] === undefined || this.hashes[this.hash(key) % this.capacity] !== this.hash(key) % this.capacity) {
            return undefined
        } else {return this.hashes[this.hash(key) % this.capacity]}
    }
    has(key) {
        if (this.hashes[this.hash(key) % this.capacity] !== this.hash(key) % this.capacity) {
            return false
        } else {return true}
    }
    clear() {
        this.capacity = 16
        this.loadFactor = this.capacity * 0.75
        this.hashes = []
        this.size = 0
    }
    length() {
        return this.size
    }
    entries() {
        return this.hashes
    }
}
export { HashMap, HashSet }