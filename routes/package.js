const express = require('express');
const router = express.Router();
const Package = require("../models/package");



router.post('/new', async (req, res, next) => {
    try {
   const packageData= req.body.package
   console.log(Package)
        // Inserting a new row
        const newPackage = await Package.create({
            tag_id: packageData.tag_id,
            type: packageData.type,
            package_condition: packageData.package_condition,
            destination: packageData.destination,
            price: packageData.price,
            tracking_device_id: packageData.tracking_device_id,
            sender_id: 1, // Example sender_id
            sender_type: 'User', // Example sender_type
            receiver_id: 2, // Example receiver_id
            receiver_type: 'UnregisteredUser', // Example receiver_type
            submitted_by: 59355 // Example submitted_by
        });
      
        console.log('Inserted Package:', newPackage.toJSON());
      } catch (error) {
        console.error('Error inserting newParcel',error);
      }

    console.log(req.body.receiver)
    res.status(201).send(req.body)

})


module.exports = router;