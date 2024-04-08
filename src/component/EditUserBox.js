import React, { useEffect, useState } from "react";
import "../Stylesheets/profile.css";

export default function EditUserBox(props) {
  const { _id, name, phone, dob } = props.userData;
  const [editUserdata, setEditUserData] = useState({
    name,
    phone,
    dob,
    email:props.userData.email
  });
  const url = "http://localhost:3001";

  async function updateUser() {

    if(editUserdata.name=="" || editUserdata.phone=="" || editUserdata.dob==""){
      return
    }

    const authToken = localStorage.getItem("authToken");
    const response = await fetch(`${url}/auth/api/updateuser`, {
      headers: {
        "Content-Type": "application/json",
        authToken,
      },
      method: "POST",
      body: JSON.stringify({
        name: editUserdata.name,
        phone: editUserdata.phone,
        dob: editUserdata.dob,
      }),
    });
    const data = await response.json();
    if (data.status !== "error") {
      setEditUserData({
        name: editUserdata.name,
        phone: editUserdata.phone,
        dob: editUserdata.dob,
        email:props.userData.email
      });
      props.setIsEditBtnClicked(false);
      props.setUserData(editUserdata);
    }
  }
  const handleOnchange = (e) =>
    setEditUserData({ ...editUserdata, [e.target.name]: e.target.value });
  return (
    <div className="editUser-container">
      <div className="editBox">
        <p className="editText">Edit </p>
        <div className="editData">
          <input
            type="text"
            autoComplete="off"
            placeholder="Name"
            name="name"
            onChange={handleOnchange}
            value={editUserdata.name}
          />
          <input
            type="text"
            autoComplete="off"
            placeholder="Phone"
            name="phone"
            onChange={handleOnchange}
            value={editUserdata.phone}
          />
          <input
            type="date"
            autoComplete="off"
            placeholder="Date of Birth"
            name="dob"
            onChange={handleOnchange}
            value={editUserdata.dob}
          />
        </div>
        <div className="userEditButtons">
          <button onClick={updateUser}>Edit</button>
          <button onClick={() => props.setIsEditBtnClicked(false)}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
