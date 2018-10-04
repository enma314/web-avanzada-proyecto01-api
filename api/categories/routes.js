'use strict';
module.exports = function (app) {
  const express = require("express");
  const router = express.Router();
  const CategoryController = require('./controllers');
  const axios = require("axios")
  const image2base64 = require('image-to-base64');

  app.route('/api/categories')
    .get((req, res) => {
      CategoryController.getAll().then((listCategories) => {
        res.json(listCategories);
      });
    });
  
  app.route('/api/categories/:id')
    .get((req, res) => {
      CategoryController.getById(req.params.id).then((objCategory) => {
        res.json(objCategory)
      });
    })
    .delete((req, res) => {
      CategoryController.deleteById(req.params.id).then((strMessage) => {
        res.json(strMessage);
      });
    })

  app.route('/api/categories/createCategory')
    .post((req,res) => {
      CategoryController.create(
        req.files[0].path
      ).then((objCategory) => {
        let image = null;
        image2base64("C:/Users/Enmanuel/Desktop/PUCMM/02/ProgramaciónWeb/web-api-github/web-project-01/uploads/"+ objCategory.image.slice(8,10000)) // you can also to use url
        .then(
            (response) => {
             
              axios.post(`https://api.kairos.com/recognize`, {
                "image": response,
                "gallery_name": "MyGallery"
              }, {
                  headers: {
                      'Content-Type': 'application/json',
                      'app_id': '9c24674f',
                      'app_key': '82119fc61ade019309693e68ca0e78e7'
                  }
              })
              .then((data) => {
                //console.log(data.data)
                console.log(data.data.images[0].candidates)
                res.send(data.data.images[0].candidates);
              
              }).catch((error) => {
                console.log("RECOGNIZE ERROR!")
              })
           
            }
        )
        .catch(
            (error) => {
                console.log(error); //Exepection error....
            }
        )
          
      })
    });

};