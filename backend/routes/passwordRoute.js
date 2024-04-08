const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const Password = require("../model/passwordSchema");
const User=require("../model/userSchema")

const LoginStatus=require("../middleware/LoginStatus")
const router = express.Router();

const secretKey = "process.env.SECRET_KEY";

// Random password generation
router.post("/randompassword", LoginStatus,async (req, res) => {
    const { length, useLowercase, useUppercase, useNumbers, useSpecial } = req.body;
    console.log(req.body);
  try {
        const randomPass = generateRandomPassword(length, useLowercase, useUppercase, useNumbers, useSpecial);
        res.status(200).json({ status:"success",message:randomPass });
  } catch (e) {
        res.status(500).json({ error: 'An error occurred while generating the password.' });
  }
});

// Customized password generation
router.post('/custompassword',LoginStatus, async (req, res) => {
    const userId=req.user
    const {length,useName,usePhone,useEmail,useDOB,useNumbers,useLowercase,useUppercase,
        useSpecial,others} = req.body;
        console.log(req.body);
  try{
    const userData=await User.findById(userId);
    if(!userData)return res.status(400).json({status:"error", error: 'password not found' })
    const {name,email,dob,phone}=userData
console.log(userData);
    const customPassword = generateCustomPassword(length,name,dob,email,phone,useName,usePhone,useEmail,useDOB,useNumbers,useLowercase,useUppercase,
        useSpecial,others);
  
      res.status(200).json({status:"success",message: customPassword });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while generating the password.' });
    }
  });


// Save password
  router.post('/savepassword',LoginStatus, async (req, res) => {
    const {title,username,password } = req.body;
    const userId=req.user
    const newPassword = new Password({userId, title,username, password});
    try {
      await newPassword.save();
      res.status(201).json({status:"success", message: newPassword });
    } catch (error) {
      res.status(500).json({ status:"error",error: 'Internal server error' });
    }
  });  

  router.post('/updatepassword:id',LoginStatus, async (req, res) => {
    const {title,username,password } = req.body;
    const passId=req.params.id.replace(":","")
    try {
      let updatedPass=await Password.findByIdAndUpdate(passId,{title,username,password})
      console.log(updatedPass);
      res.status(201).json({status:"success", message: updatedPass });
    } catch (error) {
      res.status(500).json({ status:"error",error: 'Internal server error' });
    }
  });  

  router.delete('/deletepassword:id',LoginStatus, async (req, res) => {
    const passId=req.params.id.replace(":","")
    try {
        let findPass=await Password.findById(passId)
        if(!findPass)return res.status(400).json({status:"error", error: 'password not found' });
      await Password.findByIdAndDelete(passId)
      res.status(201).json({status:"success", message: 'Password deleted' });
    } catch (error) {
      res.status(500).json({status:"error", error: 'Internal server error' });
    }
  }); 

  router.get('/fetchpasswords',LoginStatus, async (req, res) => {
    const userId=req.user
    try {
      let passwords=await Password.find({userId})
      res.status(201).json({status:"success", message: passwords });
    } catch (error) {
      res.status(500).json({status:"error", error: 'Internal server error' });
    }
  });  
  module.exports = router;

// Function to generate random password
function generateRandomPassword(length = 10, useLowercase = false, useUppercase = false, useNumbers = false, useSpecial = false) {
    const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numberChars = '0123456789';
    const specialChars = '@#$%^';

    let characters = '';
    let characterCount = 0;

    // Count the number of character sets selected
    if (useLowercase) characterCount++;
    if (useUppercase) characterCount++;
    if (useNumbers) characterCount++;
    if (useSpecial) characterCount++;

    // Calculate the length of each character set
    const partialLength = Math.floor(length / characterCount);

    // Populate characters string with selected character sets
    for (let i = 0; i < partialLength; i++) {
        if (useLowercase) characters += getRandomCharacter(lowercaseChars);
        if (useUppercase) characters += getRandomCharacter(uppercaseChars);
        if (useNumbers) characters += getRandomCharacter(numberChars);
        if (useSpecial) characters += getRandomCharacter(specialChars);
    }

    // Randomly selecting from characters and concatinating it to password
    let password = characters;
    for (let i = 0; i < length-characters.length; i++) {
        password += characters[Math.floor(Math.random() * characters.length)];
    }

    return password;
}

// Function to get a random character from a character set
function getRandomCharacter(characterSet) {
    return characterSet[Math.abs(Math.floor(Math.random() * characterSet.length))];
}


//Function to generate customized password
function generateCustomPassword(length = 10, name = '', dob = '', email = '', phone = '', useName = false, usePhone = false, useEmail = false, useDOB = false, useNumbers= false, useLowercase = false, useUppercase = false, useSpecial = false, others = []) {
    const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numberChars = '0123456789';
    const specialChars = '@#$%^';

    let characters = [];
    let i, start, rand, up, low, count = 0;
    let nameShort = '', phoneShort = '', emailShort = '', otherShort = '';

    // Count the number of character sets selected
    if (useName) count++;
    if (usePhone) count++;
    if (useEmail) count++;
    if (useDOB) count++;
    if (useLowercase && (useName || useEmail)){ 
        count=count;
    }
    else if(useLowercase){
        count++;
    }
    if (useUppercase && (useName || useEmail)){ 
        count=count;
    }
    else if(useUppercase){
        count++;
    }
    if (useNumbers && (useDOB || usePhone)){ 
        count=count;
    }
    else if(useNumbers){
        count++;
    }
    if (useSpecial) count++;
    if (others != '') count++;

    // validation for length
    if(count > length){
        console.log("Please input a valid length to include all the selected details");
    }
    if(length < 4){
        console.log("Please input a valid length");
    }

    // Calculate the length of each character set
    let part = Math.floor(length / count);

        // Including name in the password
        if (useName){
                start = Math.abs(Math.floor(Math.random() * name.length-part));
                for (i=start; i<start+part; i++){
                    if(i>name.length-1)
                    {
                        nameShort += name[Math.abs(Math.floor(Math.random() * name.length))];
                    }
                    else{
                        nameShort += name[i];
                    }
                }

                // Converting random characters of name to uppercase
                if(useUppercase){
                    rand = Math.abs(Math.floor(Math.random() * nameShort.length-1)) + 1;
                    for(i=0;i<rand;i++){
                        up = Math.abs(Math.floor(Math.random() * nameShort.length));
                        nameShort = nameShort.slice(0, up) + nameShort[up].toUpperCase() + nameShort.slice(up+1,nameShort.length);
                    }
                }

                // Converting random characters of name to lowercase
                if(useLowercase){
                    rand = Math.abs(Math.floor(Math.random() * nameShort.length-1)) + 1;
                    for(i=0;i<rand;i++){
                        low = Math.abs(Math.floor(Math.random() * nameShort.length));
                        nameShort = nameShort.slice(0, low) + nameShort[low].toLowerCase() + nameShort.slice(low+1,nameShort.length);
                    }
                }
                characters.push(nameShort);
        }

        // Including phone number in the password
        if ((usePhone && useNumbers) || usePhone){
                start = Math.abs(Math.floor(Math.random() * phone.length-part));
                for (i=start; i<start+part; i++){
                    if(i>phone.length-1)
                    {
                        phoneShort += phone[Math.abs(Math.floor(Math.random() * phone.length))];
                    }
                    else{
                        phoneShort += phone[i];
                    }
                }
                characters.push(phoneShort);
        }

        // Including email-id in the password
        if (useEmail){
            const atIndex = email.indexOf('@');
            email = email.substring(0, atIndex);
                start = Math.abs(Math.floor(Math.random() * email.length-part));
                for (i=start; i<start+part; i++){
                    if(i>email.length-1)
                    {
                        emailShort += email[Math.abs(Math.floor(Math.random() * email.length))];
                    }
                    else{
                        emailShort += email[i];
                    }
                }

                // Converting random characters of email-id to uppercase
                if(useUppercase){
                    rand = Math.abs(Math.floor(Math.random() * emailShort.length-1)) + 1;
                    for(i=0;i<rand;i++){
                        up = Math.abs(Math.floor(Math.random() * emailShort.length));
                        emailShort = emailShort.slice(0, up) + emailShort[up].toUpperCase() + emailShort.slice(up+1,emailShort.length);
                    }
                }

                // Converting random characters of email-id to lowercase
                if(useLowercase){
                    rand = Math.abs(Math.floor(Math.random() * emailShort.length-1)) + 1;
                    for(i=0;i<rand;i++){
                        low = Math.abs(Math.floor(Math.random() * emailShort.length));
                        emailShort = emailShort.slice(0, low) + emailShort[low].toLowerCase() + nameShort.slice(low+1,emailShort.length);
                    }
                }
                characters.push(emailShort);
        }

        // Including date of birth in password
        if ((useDOB && useNumbers) || useDOB)
        {
            let dob_combined = dob.replace(/-/g,'');
            let date = dob.split('-');
                let date_selected = date[Math.abs(Math.floor(Math.random() * date.length))];
                if(date_selected.length<part){
                    for(i=date_selected.length;i<part;i++){
                        date_selected += dob_combined[Math.abs(Math.floor(Math.random() * dob_combined.length))];
                    }
                }
                else if(date_selected.length>part){
                    date_selected = date_selected.substring(0, part);
                }
                characters.push(date_selected);
        }

        // Including date of numbers in password
        for(i=0;i<part;i++){
            if (!useDOB && !usePhone && useNumbers) {
                characters.push(numberChars[Math.abs(Math.floor(Math.random() * numberChars.length))]);
            }
        }

        // Including uppercase in password
        for(i=0;i<part;i++){
            if (!useName && !useEmail && others=='' && useUppercase) {
                characters.push(uppercaseChars[Math.abs(Math.floor(Math.random() * uppercaseChars.length))]);
            }
        }

        // Including lowercase in password
        for(i=0;i<part;i++){
            if (!useName && !useEmail && others=='' && useLowercase) {
                characters.push(lowercaseChars[Math.abs(Math.floor(Math.random() * lowercaseChars.length))]);
            }
        }

        // Including special characters in password
        for(i=0;i<part;i++)
        {
            if (useSpecial) characters.push(specialChars[Math.abs(Math.floor(Math.random() * specialChars.length))]);
        }

        // Including other details in password
        if(others!=''){
            start = Math.abs(Math.floor(Math.random() * others.length-part));
                for (i=start; i<start+part; i++){
                    if(i>others.length-1)
                    {
                        otherShort += others[Math.abs(Math.floor(Math.random() * others.length))];
                    }
                    else{
                        otherShort += others[i];
                    }
                }

                // Converting random characters of other details to uppercase
                if(useUppercase){
                    rand = Math.abs(Math.floor(Math.random() * otherShort.length-1)) + 1;
                    for(i=0;i<rand;i++){
                        up = Math.abs(Math.floor(Math.random() * otherShort.length));
                        otherShort = otherShort.slice(0, up) + otherShort[up].toUpperCase() + otherShort.slice(up+1,otherShort.length);
                    }
                }

                // Converting random characters of other details to lowercase
                if(useLowercase){
                    rand = Math.abs(Math.floor(Math.random() * otherShort.length-1)) + 1;
                    for(i=0;i<rand;i++){
                        low = Math.abs(Math.floor(Math.random() * otherShort.length));
                        otherShort = otherShort.slice(0, low) + otherShort[low].toLowerCase() + otherShort.slice(low+1,otherShort.length);
                    }
                }
                characters.push(otherShort);
        }

        // Shuffling the elements of characters array
        for (i = characters.length - 1; i > 0; i--) {
            const j = Math.abs(Math.floor(Math.random() * (i + 1)));
            [characters[i], characters[j]] = [characters[j], characters[i]];
        }

    // Concatinating elements of character array to password
    let password = '';
    for (let i = 0; i < characters.length; i++) {
        password += characters[i].toString();
    }

    // Adding additional characters to match the length
    if (password.length != length){
        if(password.length < length){
            let extra_len = length-password.length;
            for(i=0;i<extra_len;i++){
                let additional_char = password[Math.abs(Math.floor(Math.random() * password.length))];
                password += additional_char;
            }
        }
    }
    return password;
}