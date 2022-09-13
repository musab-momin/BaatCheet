import React, { createContext, useContext, useEffect, useState } from "react";
import { auth, database } from "../misc/firebase";



const ProfileContext = createContext();


export const ProfileProvider = ({ children })=>{
    
    const [profile, setProfile] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(()=>{
        let userRef;
        const unSub = auth.onAuthStateChanged(authObj=>{
            if(authObj){

                userRef = database.ref(`/profiles/${authObj.uid}`); 
                userRef.on('value', snap => {
                    const { createdAt, name, avatar } = snap.val();
                    
                    const data = {
                        createdAt,
                        name,
                        uid: authObj.uid,
                        email: authObj.email,
                        avatar
                    }
                    setProfile(data)
                })

            }else{
                setProfile(null)
                if(userRef){
                    userRef.off();
                }
            }
            setIsLoading(false)
        })

        return ()=>{
            unSub();
            if(userRef){
                userRef.off();
            }
        }
    }, [])

    // eslint-disable-next-line react/jsx-no-constructed-context-values
    return <ProfileContext.Provider value={ { profile, isLoading } }>
        { children }
    </ProfileContext.Provider>
}


export const useProfile = ()=> useContext(ProfileContext);