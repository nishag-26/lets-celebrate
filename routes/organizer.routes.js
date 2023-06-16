const express = require("express");
const router = express.Router();

const User = require("../models/User.model");
const Organizer = require("../models/Organizer.model");

const isLoggedIn = require("../middleware/isLoggedIn");

// READ: display all organizers
router.get("/organizers", (req, res, next) => {
   Organizer.find()
        .then( (organizersFromDB) => {

            const data = {
                organizers: organizersFromDB
            }

            res.render("organizers/organizer-list", data);
        })
        .catch( e => {
            console.log("error getting list of organizers from DB", e);
            next(e);
        });
});

// create: display form
router.get("/organizers/create", (req, res, next) =>  {
    Organizer.find()
    .then(organizersFromDB => {
        const data = { 
            organizers: organizersFromDB
        }
     res.render("organizers/organizer-create", data);
   
})
.catch(e => {
    console.log("error displaying organizer create form", e);
    next(e);

});
});
// create : process form
router.post("/organizers/create" ,(req, res, next) => {
    const newOrganizer = {
        title: req.body.title,
        description: req.body.description,
        rating: req.body.rating
    };
    console.log("we receive data",newOrganizer);
    Organizer.create(newOrganizer)
         .then( (newOrganizer) => {
          
         res.redirect("/organizers");
         })
         .catch( e => {
             console.log("error creating new organizer", e);
             next(e);
         });
});

// update
 router.get("/organizers/:organizerId/edit", (req, res, next) => {

     const {organizerId } = req.params;

    Organizer.findById(organizerId)
    .then(organizerDetails => {
        console.log(organizerDetails);
        res.render("organizers/organizer-edit",{ organizer: organizerDetails});
    }) 
        .catch(error => {
            console.log("error getting updating organizers in DB")
            next(error);
        });
}); 

router.post("/organizers/:organizerId/edit", (req, res, next) => {
  const { organizerId } = req.params;
  const { title, description, rating } = req.body;
  Organizer.findByIdAndUpdate(
    organizerId,
    { title, description, rating },
    { new: true }
  )
    .then((updatedOrganizer) =>
      res.redirect(`/organizers`)
    )
    .catch((error) => next(error));
});

   // delete

router.post('/organizers/:organizerId/delete', (req, res, next) => {
  const { organizerId } = req.params;
 
  Organizer.findByIdAndDelete(organizerId)
    .then(() => res.redirect(`/organizers`))
    .catch(error => next(error));
});

// READ: display details of one organizer
router.get("/organizers/:organizerId", (req, res, next) => {
    const id = req.params.organizerId;

    Organizer.findById(id)
        .then( organizerFromDB => {
            res.render("organizers/organizer-details", organizerFromDB);
        })
        .catch( e => {
            console.log("error getting organizer details from DB", e);
            next(e);
        });
});


module.exports = router;
