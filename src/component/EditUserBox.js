import React, { useEffect, useState } from "react";
import "../Stylesheets/profile.css";

export default function EditUserBox(props) {
  const { _id, name, email, phone, dob } = props.userData;
  const [editUserdata, setEditUserData] = useState({
    name,
    email,
    phone,
    dob,
  });
  const url = "http://localhost:3001";

  async function updateUser() {
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
        email: editUserdata.email,
        dob: editUserdata.dob,
      }),
    });
    const data = await response.json();
    if (data.status !== "error") {
      setEditUserData({
        name: editUserdata.name,
        phone: editUserdata.phone,
        email: editUserdata.email,
        dob: editUserdata.dob,
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
            type="email"
            autoComplete="off"
            placeholder="email"
            name="email"
            onChange={handleOnchange}
            value={editUserdata.email}
          />
          <input
            type="text"
            autoComplete="off"
            placeholder="Phone"
            name="phone"
            onChange={handleOnchange}
            value={editUserdata.phone}
          />
          <div>
            <label htmlFor="">DOB</label>
          <input
            type="date"
            autoComplete="off"
            placeholder="Date of Birth"
            name="dob"
            onChange={handleOnchange}
            value={editUserdata.dob}
          />
          </div>
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
