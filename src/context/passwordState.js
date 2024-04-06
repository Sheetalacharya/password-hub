import react, { createContext, useState } from "react";
import axios from "axios";
const passwordcontext = createContext();
export { passwordcontext };

export default function PasswordState(props) {
  const dummyData = [
    { _id: 1, title: "title1", password: "password1" },
    { _id: 2, title: "title2", password: "password2" },
    { _id: 3, title: "title3", password: "password3" },
    { _id: 4, title: "title4", password: "password4" },
    { _id: 5, title: "title5", password: "password5" },
    { _id: 6, title: "title6", password: "password6" },
    { _id: 7, title: "title7", password: "password7" },
    { _id: 8, title: "title8", password: "password8" },
    { _id: 9, title: "title9", password: "password9" },
  ];
  const [passwords, setPasswords] = useState(dummyData);
  const [btnSelected, setBtnSelected] = useState("");
  const [generatedPass, setGeneratedPass] = useState("");
  const [titleInp, setTitleInp] = useState("");

  const url = "";

  async function fetchAllPassword(authToken) {
    try {
      const response = await fetch(`${url}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authToken,
        },
      });
      const data = await response.json();
      setPasswords(data); //set
    } catch (error) {
      console.log({ error });
    }
  }
  function generateCustomPassword(data) {
    setGeneratedPass("custom password generated");
  }
  function generateRandomPassword(data) {
    setGeneratedPass("random password generated");
  }

  function regenerate(data) {
    if (btnSelected === "custom") {
      generateCustomPassword(data);
    } else {
      generateRandomPassword(data);
    }
  }

  function savePassword(data, authToken) {
    let newData={
      _id:10,
      title:data.title,
      password:data.password
    }
    setPasswords(passwords.concat(newData).reverse());
    
  }

  function editPassword(passwordDoc, authToken) {
    const { _id,title, password } = passwordDoc;
    // axios({
    //   url: `${url}${_id}`, //handle
    //   method: "post",
    //   data: {
    //     title,
    //     password,
    //   },
    //   headers: {
    //     "Content-Type": "application/json",
    //     authToken,
    //   },
    // })
    //   .then((res) => {
    //     const newPasswords=passwords
    //     for (let i = 0; i < newPasswords.length; i++) {
    //       if (newPasswords[i]._id === _id) {
    //         newPasswords[i].title = title;
    //         newPasswords[i].description = password;
    //         break;
    //       }
    //     }
    //     setPasswords(newPasswords);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
    console.log({oldPass:passwords});
    // const newPasswords=passwords
    //     for (let i = 0; i < newPasswords.length; i++) {
    //       console.log(i);
    //       if (newPasswords[i]._id === _id) {
    //         newPasswords[i].title = title;
    //         newPasswords[i].password = password;
    //         break;
    //       }
    //     }
    //     setPasswords(newPasswords);
    //     console.log({newPasswords});
    passwords.forEach(password=>{
      if(password._id==_id){
        password.title=title
        password.password=password
      }
    })
  }
  function deletePassword(passwordId, authToken) {
    // axios({
    //   url: `${url}${passwordId}`,
    //   method: "DELETE",
    //   headers: { "Content-Type": "application/json", authToken },
    // })
    //   .then((res) => {
    //     let newPass = passwords.filter((pass) => pass._id !== passwordId);
    //     setPasswords(newPass);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
    let newPasswords=passwords.filter(pass=>pass._id !=passwordId) 
    setPasswords(newPasswords)
  }
  return (
    <passwordcontext.Provider
      value={{
        passwords,
        generateCustomPassword,
        generateRandomPassword,
        regenerate,
        savePassword,
        editPassword,
        deletePassword,
        btnSelected,
        setBtnSelected,
        generatedPass,
        setGeneratedPass,
        titleInp,
        setTitleInp,
      }}
    >
      {props.children}
    </passwordcontext.Provider>
  );
}
