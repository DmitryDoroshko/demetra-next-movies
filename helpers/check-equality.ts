export function areTwoArraysEqual(arr1: any[], arr2: any[]): boolean {
  if (arr1.length !== arr2.length) {
    return false;
  }

  for (let i = 0; i < arr1.length; i++) {
    const element1 = arr1[i];
    const element2 = arr2[i];

    if (Array.isArray(element1) && Array.isArray(element2)) {
      if (!areTwoArraysEqual(element1, element2)) {
        return false;
      }
    } else if (typeof element1 === "object" && typeof element2 === "object") {
      if (!areObjectsEqual(element1, element2)) {
        return false;
      }
    } else if (element1 !== element2) {
      return false;
    }
  }

  return true;
}

export function areObjectsEqual(obj1: any, obj2: any): boolean {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  if (keys1.length !== keys2.length) {
    return false;
  }

  for (const key of keys1) {
    const value1 = obj1[key];
    const value2 = obj2[key];

    if (Array.isArray(value1) && Array.isArray(value2)) {
      if (!areTwoArraysEqual(value1, value2)) {
        return false;
      }
    } else if (typeof value1 === "object" && typeof value2 === "object") {
      if (!areObjectsEqual(value1, value2)) {
        return false;
      }
    } else if (value1 !== value2) {
      return false;
    }
  }

  return true;
}