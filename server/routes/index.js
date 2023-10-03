var express = require('express');
var router = express.Router();
const axios = require("axios");
/* GET home page. */
router.get('/', async (req, res, next) => {
  try {
    // Define the URL for your PUT request
    const apiUrl = 'https://615f-212-199-47-186.ngrok-free.app/api/v1/app-service/get-apps';
    // Define the data to send in the PUT request
    const requestData = {
      pageNumber: 1,
      pageSize: 25
      // Add your data here
      // For example: key1: 'value1', key2: 'value2'
    };
    // Make the Axios PUT request
    const response = await axios.put(apiUrl, requestData, {
      headers: {
        Accept: 'application/json',
        'User-Agent': 'axios 0.21.1',
      },
    });

    // Handle the response as needed
    console.log('PUT Request Successful:', response.data);

    // Return the response data to the client
    res.json(response.data);
  } catch (error) {
    console.error('PUT Request Error:', error);

    // Handle the error and send an error response to the client
    res.status(500).json({ error: 'An error occurred while making the PUT request.' });
  }
});

module.exports = router;

router.put('/update-apps', async (req, res) => {

});
