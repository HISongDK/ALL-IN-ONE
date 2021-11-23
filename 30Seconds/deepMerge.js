let obj1 = {
    a: { b: { c: 1, d: 1, e: { f: 1 } } },
}

let obj2 = {
    a: { b: { c: 1, d: 3, e: { f: 2 } } },
}

const deepMerge = (a, b, fn) =>
    [...new Set([...Object.keys(a), ...Object.keys(b)])].reduce((acc, key) => ({
        ...acc,
        [key]: fn(key, a[key], b[key]),
    }))

const result = deepMerge(obj1, obj2, (key, a, b) =>
    key === 'a' ? a && b : Object.assign({}, a, b),
)

console.log(obj1, obj2, result)
