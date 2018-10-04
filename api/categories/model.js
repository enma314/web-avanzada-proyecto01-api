'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

let categorySchema = new Schema({
  image: 'String'
});

module.exports = mongoose.model('categories', categorySchema);