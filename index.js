const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
const url = require('url')



express()
  .use(express.static(path.join(__dirname, 'public')))
  .use(express.static('public'))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .get('/postage', (req, res) => {
      var price;
      const Url = url.parse(req.url, true)
      const mailType = (Url.query.mailType)
      const weight = Number(Url.query.weight)
      price = calculateRate(mailType, weight)
      const params = {mailType: mailType,
         weight: weight,
         price: price.toLocaleString("en-US", 
         {style: "currency", currency: "USD", minimumFractionDigits: 2})
        }
      
       res.render('pages/postage.ejs', params)
      

  })
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))

 

function calculateRate(mailType, weight) {
  var price = 0;
  switch(mailType) {
    case 'Stamped Letter':
      if (weight <= 1) {
        return price = .55;
        break;
      }
      if (weight <= 2) {
        return price = .70;
        break;
      }
      if (weight <= 3) {
        return price = .85;
        break;
      }
      if (weight <= 3.5) {
        return price = 1.00;
        break;
      }
      if (weight > 3.5) {
        console.log("Please choose 'Large Envelope' mail type.");
      break;
      }
    case 'Metered Letter':
      if (weight <= 1) {
        return price = .50;
        break;
      }
      if (weight <= 2) {
        return price = .65;
        break;
      }
      if (weight <= 3) {
        return price = .80;
        break;
      }
      if (weight <= 3.5) {
        return price = .95;
        break;
      }
      if (weight > 3.5) {
        console.log("Please choose 'Large Envelope' mail type.");
      break;
      }
    case 'Large Envelope':
      if (weight <= 1) {
        return price = 1.00;
        break;
      }
      if (weight <= 2) {
        return price = 1.20;
        break;
      }
      if (weight <= 3) {
        return price = 1.40;
        break;
      }
      if (weight <= 4) {
        return price = 1.60;
        break;
      }
      if (weight <= 5) {
        return price = 1.80;
        break;
      }
      if (weight <= 6) {
        return price = 2.00;
        break;
      }
      if (weight <= 7) {
        return price = 2.20;
        break;
      }
      if (weight <= 8) {
        return price = 2.40;
        break;
      }
      if (weight <= 9) {
        return price = 2.60;
        break;
      }
      if (weight <= 10) {
        return price = 2.80;
        break;
      }
      if (weight <= 11) {
        return price = 3.00;
        break;
      }
      if (weight <= 12) {
        return price = 3.20;
        break;
      }
      if (weight <= 13) {
        return price = 3.40;
        break;
      }
      if (weight > 13) {
        console.log("Please choose 'package' mail type.");
      break;
    }
    case 'Package':
      if (weight <= 4) {
        return price = 3.80;
        break;
      }
      if (weight <= 8) {
        return price = 4.60;
        break;
      }
      if (weight <= 12) {
        return price = 5.30;
        break;
      }
      if (weight <= 13) {
        return price = 5.90;
        break;
      }
      default:
        console.log("Please take your package to the nearest USPS Office.")
      break;
  }
}