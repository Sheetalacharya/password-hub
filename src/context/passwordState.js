import react,{ createContext, useState } from "react";
import axios from "axios";
const passwordcontext=createContext()
export {passwordcontext}

export default function PasswordState(props){
    const [passwords,setPasswords]=useState([])


    const url=""

    async function fetchAllPassword(authToken){
        try {
            const response = await fetch(`${url}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    authToken
                }
            })
            const data = await response.json()
            setPasswords(data) //set

        } catch (error) {
            console.log({ error });
        }
    }
    function generateCustomPassword(){

    }
    function generateRandmPassword(){

    }

    function regenerate(){

    }

    function savePassword(){

    }
    function editPassword(id,passwordDoc,authToken){
        const { title,password} = passwordDoc
        axios({
            url: `${url}${id}`, //handle
            method: "post",
            data: {
                title,password
            },
            headers:{
                "Content-Type": "application/json",
                authToken
            }
        }).then(res => {
            passwords.forEach(pass => {
                if (pass._id === id) {
                    pass.title = title
                    pass.password=password
                }
            })
        })
            .catch(err => { console.log(err); })
    }
    function deletePassword(passwordId,authToken){
        axios({
            url: `${url}/api/food/delete/${passwordId}`,
            method: "DELETE",
            headers:{"Content-Type": "application/json",
                authToken
            }
        }).then(res => { 
            let newPass=passwords.filter(pass=>pass._id!==passwordId)
            setPasswords(newPass)
         })
            .catch(err => { console.log(err); })
    }
return(
    <passwordcontext.Provider value={{}}>{props.children}</passwordcontext.Provider>
)
}
