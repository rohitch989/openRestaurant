const express = require('express');
const router = express.Router();
const { getDay } = require('../helper/H_helper');
const { filterdata } = require('../source/help');
const fs = require('fs');

router.get('/content', (req, res) => {

  res.render('content');

});
router.post('/content', (req, res) => {
  const { date } = req.body;
  if (date) {
    const day = getDay(date.slice(0, 9));
    const time = date.slice(11, 18);
    fs.readFile('./source/work.json', 'utf-8', (err, data) => {

      if (err) {
        console.log('you have an error!')
      } else {
        const answers = filterdata(data, day, time);

        res.render('content', { answers, date })

      }

    })
  } else {
    res.render('content', { error: 'Please enter the date and time to get the result' });
  }


});

module.exports = router;