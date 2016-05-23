var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

router.use(bodyParser.urlencoded({ extended: true }))
router.use(methodOverride(function(req, res){
      if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        // look in urlencoded POST bodies and delete it
        var method = req.body._method
        delete req.body._method
        return method
      }
}))

//build the REST operations at the base for updates
//this will be accessible from http://127.0.0.1:3000/updates if the default route for / is left unchanged
router.route('/')
    //GET all updates
    .get(function(req, res, next) {
      if (req.user) {
        //retrieve all updates from Monogo
        mongoose.model('Update').find({}, function (err, updates) {
              if (err) {
                  return console.error(err);
              } else {
                  //respond to both HTML and JSON. JSON responses require 'Accept: application/json;' in the Request Header
                  res.format({
                      //HTML response will render the index.jade file in the views/updates folder. We are also setting "updates" to be an accessible variable in our jade view
                    html: function(){
                        res.render('updates/index', {
                              title: 'All updates',
                              "updates" : updates
                          });
                    },
                    //JSON response will show all updates in JSON format
                    json: function(){
                        res.json(infophotos);
                    }
                });
              }     
        });
      }
      else {
      res.redirect('/');
      } 
    })
    //POST a new update
    .post(function(req, res) {
        if (req.user) {
          // Get values from POST request. These can be done through forms or REST calls. These rely on the "name" attributes for forms
          var title = req.body.title;
          var text = req.body.text;
          //call the create function for our database
          mongoose.model('Update').create({
              title : title,
              text : text
             
          }, function (err, update) {
                if (err) {
                    res.send("There was a problem adding the information to the database.");
                } else {
                    //update has been created
                    console.log('POST creating new update: ' + update);
                    res.format({
                        //HTML response will set the location and redirect back to the home page. You could also create a 'success' page if that's your thing
                      html: function(){
                          // If it worked, set the header so the address bar doesn't still say /adduser
                          res.location("updates");
                          // And forward to success page
                          res.redirect("/updates");
                      },
                      //JSON response will show the newly created update
                      json: function(){
                          res.json(update);
                      }
                  });
                }
          
        
        })
      }
          else {
          res.redirect('/');
          } 
    });

/* GET New update page. */
router.get('/new', function(req, res) {
  if (req.user) {
    res.render('updates/new', { title: 'Add New update' });
  }
  else {
    res.redirect('/');
  } 
});

// route middleware to validate :id
router.param('id', function(req, res, next, id) {
    //console.log('validating ' + id + ' exists');
    //find the ID in the Database
    mongoose.model('Update').findById(id, function (err, update) {
        //if it isn't found, we are going to repond with 404
        if (err) {
            console.log(id + ' was not found');
            res.status(404)
            var err = new Error('Not Found');
            err.status = 404;
            res.format({
                html: function(){
                    next(err);
                 },
                json: function(){
                       res.json({message : err.status  + ' ' + err});
                 }
            });
        //if it is found we continue on
        } else {
            //uncomment this next line if you want to see every JSON document response for every GET/PUT/DELETE call
            //console.log(update);
            // once validation is done save the new item in the req
            req.id = id;
            // go to the next thing
            next(); 
        } 
    });
});

router.route('/:id')
  .get(function(req, res) {
    mongoose.model('Update').findById(req.id, function (err, update) {
      if (err) {
        console.log('GET Error: There was a problem retrieving: ' + err);
      } else {
        console.log('GET Retrieving ID: ' + update._id);
        
        
        res.format({
          html: function(){
              res.render('updates/show', {
                
                "update" : update
              });
          },
          json: function(){
              res.json(update);
          }
        });
      }
    });
  });

  //GET the individual update by Mongo ID
router.get('/:id/edit', function(req, res) {
    
  if (req.user) {
    //search for the update within Mongo
    mongoose.model('Update').findById(req.id, function (err, update) {
        if (err) {
            console.log('GET Error: There was a problem retrieving: ' + err);
        } else {
            //Return the update
            console.log('GET Retrieving ID: ' + update._id);
            //format the date properly for the value to show correctly in our edit form
          
          
            res.format({
                //HTML response will render the 'edit.jade' template
                html: function(){
                       res.render('updates/edit', {
                          title: 'Edit Update',
                          "update" : update
                      });
                 },
                 //JSON response will return the JSON output
                json: function(){
                       res.json(update);
                 }
            });
        }
    });
  }
  else {
    res.redirect('/');
  }
});

//PUT to update a update by ID
router.put('/:id/edit', function(req, res) {
    // Get our REST or form values. These rely on the "name" attributes
    var title = req.body.title;
    var text = req.body.text;
    
   //find the document by ID
        mongoose.model('Update').findById(req.id, function (err, update) {
            //update it
            update.update({
                title : title,
                text : text

					 }, function (err, updateID) {
              if (err) {
                  res.send("There was a problem updating the information to the database: " + err);
              } 
              else {
                      //HTML responds by going back to the page or you can be fancy and create a new view that shows a success page.
                      res.format({
                          html: function(){
                               res.redirect("/updates/");
                         },
                         //JSON responds showing the updated values
                        json: function(){
                               res.json(update);
                         }
                      });
               }
            })
        });
});

//DELETE a update by ID
router.delete('/:id/edit', function (req, res){
    //find update by ID
    mongoose.model('Update').findById(req.id, function (err, update) {
        if (err) {
            return console.error(err);
        } else {
            //remove it from Mongo
            update.remove(function (err, update) {
                if (err) {
                    return console.error(err);
                } else {
                    //Returning success messages saying it was deleted
                    console.log('DELETE removing ID: ' + update._id);
                    res.format({
                        //HTML returns us back to the main page, or you can create a success page
                          html: function(){
                               res.redirect("/updates");
                         },
                         //JSON returns the item with the message that is has been deleted
                        json: function(){
                               res.json({message : 'deleted',
                                   item : update
                               });
                         }
                      });
                }
            });
        }
    });
});

module.exports = router;