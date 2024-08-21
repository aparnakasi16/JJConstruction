// import bcrypt from 'bcrypt';
const bcrypt = require('bcrypt');
// Function to hash the password
 const hashPassword = async (password) => {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(12,(err,salt)=>{
        if(err){
            reject(err);
        }
        bcrypt.hash(password, salt, (err, hash) => {
            if(err){
                reject(err);
            }
            resolve(hash);
        })
    })
  })
};

// Function to compare passwords
 const comparePassword =  (password, hashed) => {
  return bcrypt.compare(password, hashed)
};

module.exports = hashPassword;
module.exports = comparePassword;
