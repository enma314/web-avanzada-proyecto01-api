'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


let userSchema = new Schema({
  name:'String',
  userName: 'String',
  type: 'String',
  password: 'String',
  email: 'String'

});




module.exports = mongoose.model('users', userSchema);