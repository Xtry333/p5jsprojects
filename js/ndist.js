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