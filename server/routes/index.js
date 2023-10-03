var express = require('express');
var router = express.Router();
const axios = require("axios");
/* GET home page. */
router.get('/', async (req, res, next) => {
  try {
    const pageNumber = parseInt(req.query.pageNumber) || 1;
    const pageSize = parseInt(req.query.pageSize) || 25;
    const apiUrl = 'https://615f-212-199-47-186.ngrok-free.app/api/v1/app-service/get-apps';

    const requestData = {
      pageNumber: pageNumber,
      pageSize: pageSize
    };

    const response = await axios.put(apiUrl, requestData, {
      headers: {
        Accept: 'application/json',
        // 'User-Agent': 'axios 0.21.1',
      },
    });

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
