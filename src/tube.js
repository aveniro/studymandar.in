export default class Tube {
    array = new Array();

    add(x) {
        this.array.splice(0, 0, x);
        return this;
    }

    front() {
        return this.array[0];
    }

    drop() {
        this.array.splice(0, 1);
        return this;
    }

    dump() {
        this.array = new Array();
        return this;
    }

    size() {
        return this.array.length;
    }
}