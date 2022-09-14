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


export const transformToArray = snapVal =>{
    return snapVal ? Object.keys(snapVal) : []
}


// we are gettting the snapshoot values as objects so we are converting the it to array of objects.
// input: "NKQINGL:SKJG" : { name: 'ChatRoomName', description: 'ChatRoomDescription', createdAt: 234234 } output: [{id: 'NKQINL:SKJG', 'ChatRoomName', description: 'ChatRoomDescription', createdAt: 234234 }]
export const transformToArrayById = (snapVal) =>{
    return snapVal ? Object.keys(snapVal).map(snapkey => {
        return {...snapVal[snapkey], id: snapkey}
    }) : [];
}


export async function getUserUpdates(userId, keyToUpdate, value, db){
    const updates = {}
    updates[`/profiles/${userId}/${keyToUpdate}`] = value;

    // fetching the author inside the Messages table bcoz we have to update the author inside message table also
    const getMssg = db.ref('/messages').orderByChild('auhtor/uid').equalTo(userId).once('value');

    // fetching the author inside the rooms table bcoz we have to update the author inside rooms table also
    const getRoom = db.ref('/rooms').orderByChild('lastMessage/author/uid').equalTo(userId).once('value');

    // getMssg and getRoom return us the snapshot of their database transaction
    const [mssgSnapShot, roomSnapShot] = await Promise.all([getMssg, getRoom]);

    // updating the value for each record inside message table
    mssgSnapShot.forEach(snap => {
        updates[`/messages/${snap.key}/author/${keyToUpdate}`] = value;
    })

    // updating the value for each record inside rooms table
    roomSnapShot.forEach(snap => {
        updates[`/rooms/${snap.key}/lastMessage/author/${keyToUpdate}`] = value;
    })

    return updates;
}