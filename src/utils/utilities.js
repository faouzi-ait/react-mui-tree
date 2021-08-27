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