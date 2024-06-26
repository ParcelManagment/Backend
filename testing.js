
const Package = require("./models/package.js")

async function test(){
    try {
      // Inserting a new row
      const newPackage = await Package.create({
        tag_id: 'ABC939', // Example tag_id
        sender_id: 1, // Example sender_id
        sender_type: 'User', // Example sender_type
        receiver_id: 2, // Example receiver_id
        receiver_type: 'UnregisteredUser', // Example receiver_type
        type: 'food', // Example type
        package_condition: 'new', // Example package_condition
        destination: 'New York', // Example destination
        price: 100, // Example price
        tracking_device_id: 1, // Example tracking_device_id
        submitted_by: 59355 // Example submitted_by
        // Optionally, other fields like created_at, submitted, out_for_delivery, arrived, cancelled
      });
    
      console.log('Inserted Package:', newPackage.toJSON());
    } catch (error) {
      console.error('Error inserting newParcel');
    }
    }

    module.exports = test;