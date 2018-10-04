'use strict';
module.exports = function (app) {
  const express = require("express");
  const router = express.Router();
  const JobController = require('./controllers');
  const axios = require("axios")
  const image2base64 = require('image-to-base64');
  var kairosResponse;

  // todoList Routes

  app.route('/api/jobs')
    .get((req, res) => {
      JobController.getAll().then((listJobs) => {
        res.json(listJobs);
      });
    });

  //app.route('/api/jobs/createJob')
    app.post('/api/jobs/createJob', (req, res, next) => {
      console.log(req.files)
      JobController.create(
        req.body.name,
        req.body.lastName,
        req.files[0].path
      ).then((objJob) => {
        let image = null;
        image2base64("C:/Users/Enmanuel/Desktop/PUCMM/02/ProgramaciónWeb/web-api-github/web-project-01/uploads/"+ objJob.image.slice(8,10000)) // you can also to use url
        .then(
            (response) => {
             
              axios.post(`https://api.kairos.com/enroll`, {
                "image": response,
                "subject_id": objJob.name + " " + objJob.lastName,
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
                kairosResponse = "Training: "+data.data.images[0].transaction.status+". With name: "+data.data.images[0].transaction.subject_id
                console.log("Training: "+data.data.images[0].transaction.status+". With name: "+data.data.images[0].transaction.subject_id)
              
              }).then(()=>{res.send(kairosResponse)}).catch((error) => {
                console.log("TRAINING ERROR!")
              })
           
            }
        )
        .catch(
            (error) => {
                console.log(error); //Exepection error....
            }
        )
        //objJob.image.slice(8,10000) 
        
        console.log(objJob.image.slice(8,10000))
      }).then(() => {
        //console.log(kairosResponse)
      })
    });

    app.route('/api/jobs/:category')
    .get((req, res) => {
      JobController.getByCategory(req.params.category).then((listJobs) => {
        
        res.json(listJobs);
      });
    });

  app.route('/api/jobs/find/:id')
    .get((req, res) => {
      JobController.getById(req.params.id).then((objJob) => {
        res.json(objJob)
      });
    })
    .put((req, res) => {
      JobController.updateById(
        req.params.id,
        req.body.company,
        req.body.type,
        req.body.position,
        req.body.location,
        req.body.category,
        req.body.description,
        req.body.applyGuide,
        req.body.email
      ).then((objJob) => {
        res.json(objJob);
      })
    })
    .delete((req, res) => {
      JobController.deleteById(req.params.id).then((strMessage) => {
        res.json(strMessage);
      });
    });

  app.route('/api/jobs/:pageNumber/:nPerPage')
    .get((req, res) => {
      JobController.getByPage(req.params.pageNumber, req.params.nPerPage).then((listJobs) => {
        res.json(listJobs);
      });
    });

  






  // app.get('/', (req, res) => {
  //   res.send('Hello World');
  // });




};