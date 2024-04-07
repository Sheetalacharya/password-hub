import react, { createContext, useState } from "react";
const passwordcontext = createContext();
export { passwordcontext };

export default function PasswordState(props) {
  const dummyData = [
    { _id: 1, title: "title1", username: "username1", password: "password1" },
    { _id: 2, title: "title2", username: "username2", password: "password2" },
    { _id: 3, title: "title3", username: "username3", password: "password3" },
    { _id: 4, title: "title4", username: "username4", password: "password4" },
    { _id: 5, title: "title5", username: "username5", password: "password5" },
    { _id: 6, title: "title6", username: "username6", password: "password6" },
    { _id: 7, title: "title7", username: "username7", password: "password7" },
    { _id: 8, title: "title8", username: "username8", password: "password8" },
    { _id: 9, title: "title9", username: "username9", password: "password9" },
  ];
  const [passwords, setPasswords] = useState([]);
  const [btnSelected, setBtnSelected] = useState("");
  const [generatedPass, setGeneratedPass] = useState("");
  const [titleUnameInp, setTitleUnameInp] = useState({
    title: "",
    username: "",
  });
  const[selectedForGen,setSelectedForgen]=useState({})

  function handleTitleUnameInp(e) {
    setTitleUnameInp({ ...titleUnameInp, [e.target.name]: e.target.value });
  }

  const url = "http://localhost:3001";
 
 
  async function fetchAllPassword(authToken) {
    try {
      const response = await fetch(`${url}/manage/fetchpasswords`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authToken,
        },
      });
      const data = await response.json();
      // setPasswords(data); //set
      if (data.status !== "error") {
        setPasswords(data.message)
      }
    } catch (error) {
      console.log({ error });
    }
  }

  async function generateCustomPassword(choices,authToken) {
    // setGeneratedPass("custom password generated");
    const response = await fetch(`${url}/manage/custompassword`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authToken,
      },
      body: JSON.stringify({
        length: choices.lengthInp,
        useName: choices.nameCheck,
        usePhone: choices.phoneCheck,
        useEmail: choices.emailCheck,
        useDOB: choices.dobCheck,
        useNumbers: choices.numberCheck,
        useLowercase: choices.uppercaseCheck,
        useUppercase: choices.lowercaseCheck, 
        useSpecial: choices.splCharCheck,
        others: choices.otherWords,
      }),
    });
    const data = await response.json();
    if (data.status !== "error") {
      return setGeneratedPass(data.message);
    }
  }


  async function generateRandomPassword(choices,authToken) {
  //  setGeneratedPass("random password generated");

    console.log({choices});
    const response = await fetch(`${url}/manage/randompassword`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authToken,
      },
      body: JSON.stringify({
        length: choices.lengthInp,
        useNumbers: choices.numberCheck,
        useUppercase: choices.uppercaseCheck,
        useLowercase: choices.lowercaseCheck,
        useSpecial: choices.splCharCheck 
      }),
    });
    const data = await response.json();
    if (data.status !== "error") {
      return setGeneratedPass(data.message);
    }

  }

  function regenerate(data,authToken) {
    if (btnSelected === "custom") {
      generateCustomPassword(data,authToken);
    } else {
      generateRandomPassword(data,authToken);
    }
  }

  async function savePassword(bodyData, authToken) {
    const response = await fetch(`${url}/manage/savepassword`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authToken,
      },
      body: JSON.stringify({
        title:bodyData.title,
  username:bodyData.username,
  password:bodyData.password
      }),
    });
    const data = await response.json();
    if (data.status !== "error") {
      return setPasswords(passwords.concat(data.message).reverse());
    }    
  }

  async function editPassword(passwordDoc, authToken,passwordId) {
    const response = await fetch(`${url}/manage/updatepassword:${passwordId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authToken,
      },
      body: JSON.stringify({
        title:passwordDoc.title,
  username:passwordDoc.username,
  password:passwordDoc.password
      }),
    });
    const data = await response.json();
    if (data.status !== "error") {
      passwords.forEach((password) => {
        if (password._id == passwordDoc._id) {
          password.title = passwordDoc.title;
          password.username = passwordDoc.username;
          password.password = passwordDoc.password;
        }
      });
    }        
  }
  async function deletePassword(passwordId,authToken) {
    const response = await fetch(`${url}/manage/deletepassword:${passwordId}`, {
      method: "delete",
      headers: {
        "Content-Type": "application/json",
        authToken,
      }
    });
    const data = await response.json();
    if (data.status !== "error") {
      let newPasswords = passwords.filter((pass) => pass._id != passwordId);
    setPasswords(newPasswords);
    }    
    
  }
  return (
    <passwordcontext.Provider
      value={{
        fetchAllPassword,
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
        titleUnameInp,
        setTitleUnameInp,
        handleTitleUnameInp,
        selectedForGen,setSelectedForgen
      }}
    >
      {props.children}
    </passwordcontext.Provider>
  );
}
