export default {
  findInNestedByName(array, name) {
    if (typeof array !== "undefined") {
      for (let i = 0; i < array.length; i++) {
        if (array[i].name === name) return [{ ...array[i] }];
        let a = this.findInNestedByName(array[i].children, name);
        if (a != null) {
          a.unshift({ ...array[i] });
          return [...a];
        }
      }
    }
    return null;
  }
};
