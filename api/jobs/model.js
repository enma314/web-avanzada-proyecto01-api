'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


let jobSchema = new Schema({
  company: 'String',
  type: 'String',
  position: 'String',
  location: 'String',
  category: 'String',
  description: 'String',
  applyGuide: 'String',
  email: 'String'

});




module.exports = mongoose.model('jobs', jobSchema);