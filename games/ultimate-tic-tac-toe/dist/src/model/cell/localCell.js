"use strict";
class LocalCell {
    constructor(value = null) {
        this.value = value;
    }
    getValue() {
        return this.value;
    }
    setValue(value) {
        this.value = value;
    }
    copy() {
        return new LocalCell(this.value);
    }
}
