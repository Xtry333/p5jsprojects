const UtilX = {}

UtilX.ndist = (v1, v2) => {
    if (v1 && v2 && v1.length !== v2.length)
        throw "Vectors must be the same length."
    const dt = []
    let res = 0
    for (let i = 0; i < v1.length; i++) {
        let v = v1[i]
        if (v2) v -= v2[i]
        res += v * v
    }
    return Math.sqrt(res)
}

UtilX.mandist = (v1, v2) => {
    if (v1 && v2 && v1.length !== v2.length)
        throw "Vectors must be the same length."
    const dt = []
    let res = 0
    for (let i = 0; i < v1.length; i++) {
        let v = v1[i]
        if (v2) v -= v2[i]
        res += Math.abs(v)
    }
    return res
}

// Usage: await sleep(time) in async functions
UtilX.sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms))
}

UtilX.removeElement = (arr, el) => {
    for (let i = 0; i < arr.length; i++) {
        if (el == arr[i])
            arr.splice(i, 1)
    }
}

UtilX.removeIf = (arr, pred) => {
    for (let i = 0; i < arr.length; i++) {
        if (pred(arr[i]))
            arr.splice(i, 1)
    }
}

UtilX.random = (min, max) => {
    if (max)
    return Math.floor(Math.random() * (max - min + 1)) + min
    if (!min)
    return UtilX.random(0,1)
    return Math.floor(Math.random() * min)
}