'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


let jobSchema = new Schema({
  name: 'String',
  lastName: 'String',
  image: 'String'
});




module.exports = mongoose.model('jobs', jobSchema);