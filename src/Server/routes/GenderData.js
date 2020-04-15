var express = require('express');
var router = express.Router();

// Renders search.html with passing any data
router.get('/', (req, res) => {
  res.render('DataByGender/SelectFeature.html')
});

// Get request. query paraemeters contain data from form. render search.html passing data
router.get('/SelectFeature', (req, res) => {
    console.log(req.query);
    // Get respective data using the query parameters
    res.render(
        {
            TypeOfTable: req.query.TypeOfData,
            Gender: req.query.Gender,
            data: [
                {
                    date: '01/02/2020',
                    country: 'Japan',
                    confirmed: 4,
                    recovered: 4,
                    death: 1
                },
                {
                    date: '01/03/2020',
                    country: 'China',
                    confirmed: 5,
                    recovered: 4,
                    death: 0
                },
                {
                    date: '01/04/2020',
                    country: 'US',
                    confirmed: 6,
                    recovered: 4,
                    death: 10
                }
            ],
        
        }
    );
});

module.exports = router;
