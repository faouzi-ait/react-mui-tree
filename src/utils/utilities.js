// FUNCTION TO FLATTEN THE DATA ARRAY TO 1 LEVEL  
let res = [];
export const flatten = (array) => {
array.forEach((obj) => {
    let name = {id: obj.id, name: obj.name}
    res.push(name);
    if(obj.children){
        flatten(obj.children)
        }
    })
    return res;
}

// FUNCTION TO RETRIEVE THE OBJECTS BASED ON THE ID SELECTED
export const getSelectedObjects = (flattenedArray, selectedIds) => {
    return flattenedArray.filter(f => selectedIds.includes(f.id))
}

// FUNCTION TO FILTER THE TREE ACCORDING TO THE TERM
export const filterTree = (arr, term) => {
    let matches = [];
    if (!Array.isArray(arr)) return matches;

    arr.forEach((i) => {
        if (i.name.includes(term)) {
            matches.push(i);
        } else {
            let childResults = filterTree(i.children, term);
            if (childResults.length)
                matches.push(Object.assign({}, i, { children: childResults }));
        }
    })
    return matches;
}
