// this functin will return the first letter of username e.g : Musab Momin return M M
export const getNameInitials = (username) => {
    // split the username on space
    const splitName = username.toUpperCase().split(' ');
    if(splitName.length > 1){
        return splitName[0][0] + splitName[1][0] 
    }
    // if username not have full name like musab so we return only m
    return splitName[0][0]
}   

// we are gettting the snapshoot values as objects so we are converting the it to array of objects.
// input: "NKQINGL:SKJG" : { name: 'ChatRoomName', description: 'ChatRoomDescription', createdAt: 234234 } output: [{id: 'NKQINL:SKJG', 'ChatRoomName', description: 'ChatRoomDescription', createdAt: 234234 }]
export const transformToArrayById = (snapVal) =>{
    return snapVal ? Object.keys(snapVal).map(snapkey => {
        return {...snapVal[snapkey], id: snapkey}
    }) : [];
}