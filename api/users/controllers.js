'use strict';
require('./model');
const mongoose = require('mongoose');
let bcrypt = require('bcrypt');
let Users = mongoose.model('users');

function getAll() {
  return new Promise((fnResolve, fnReject) => {
    Users.find({}, (objError, listUsers) => {
      if (objError) {
        return fnReject(objError);
      }
      return fnResolve(listUsers);
    });
  });
};

exports.getAll = getAll;

function hashPassword(strPassword) {
  return new Promise((resolve, reject) => {
    bcrypt.hash(strPassword, 10, (objError, strHash) => {
      if (objError) {
        return reject(objError);
      }

      return resolve(strHash);
    });
  });
}

function create(name, userName, type, password, email) {
  return new Promise((fnResolve, fnReject) => {
    return hashPassword(password).then((strHashedPassword) => { //HASHING PASSWORD
      const ObjectUser = Object.assign({}, {
        name: name,
        userName: userName,
        type: type,
        password: strHashedPassword,
        email: email
      });
      const new_user = new Users(ObjectUser); //CREATING USER IN DATABASE 
      new_user.save(function (objError, objUser) {
        if (objError)
          return fnReject(objError);
        return fnResolve(objUser);
      });
    });
  });
};

exports.create = create;

function getById(id) {
  return new Promise((fnResolve, fnReject) => {
    Users.findById(id, function (objError, objUser) {
      if (objError)
        return fnReject(objError);
      return fnResolve(objUser);
    });
  });
};

exports.getById = getById;

function updateById(id, name, userName, type, password, email) {
  return new Promise((fnResolve, fnReject) => {
    return hashPassword(password).then((strHashedPassword) => {
      const ObjectUser = Object.assign({}, {
        name: name,
        userName: userName,
        type: type,
        password: strHashedPassword,
        email: email
      });


      Users.findOneAndUpdate({ _id: id }, ObjectUser, { new: true }, function (objError, objUser) {
        if (objError)
          return fnReject(objError);
        return fnResolve(objUser);
      });
    });
  })
}

exports.updateById = updateById;

function deleteById(id) {
  return new Promise((fnResolve, fnReject) => {
    Users.remove({
      _id: id
    }, function (objError) {
      if (objError) {
        return fnReject(objError);
      }
      return fnResolve({ message: 'User deleted.' });
    });
  });
};

exports.deleteById = deleteById;

// exports.sign_in = function(req, res) {
//   console.log("----------- email----: ",req.body.email);
//   return User.find({email:req.body.email}).then((userx)=> {
//       console.log("userx : ", userx[0].email);
//         if (userx[0].email==null) {
//           res.status(401).json({ message: 'Authentication failed. User not found.' });
//         } else if (userx) {
//             return BcryptX.isValidPassword(req.body.password, userx[0].password).then(() => {
//               return res.json({token: service.createTokenLogin(userx)});
//             })
//           } else {
//               res.status(401).json({ message: 'Authentication failed. Wrong password.' });
//             }
//     //}
//   }).catch(() => {
//       return res.status(404).json({ message: 'Authentication failed. User not password Incorrect.' });
//       });

// };









