const { default: axios } = require("axios");

const khaltiPayment = (req,res)=>{
    try {
        const {return_url,website_url,amount,purchase_order_id,purchase_order_name,customer_info:{name,email}} = req.body

        const url = 'https://a.khalti.com/api/v2/epayment/initiate/';
const payload = {
  return_url,
  website_url, 
  amount,
  purchase_order_id,
  purchase_order_name,
  customer_info: {
    name,

    email,
    
  },
//   amount_breakdown: [
//     {
//       label: 'Mark Price',
//       amount: amount,
//     },
//     {
//       label: 'VAT',
//       amount: 300,
//     },
//   ],
  product_details: [
    {
      identity: '1234567890',
      name: 'Khalti logo',
      total_price: amount,
      quantity: 1,
      unit_price: amount,
    },
  ],
};

// Set the headers
const headers = {
    Authorization: 'Key 2139c7f21d004fcc9f7a7e4acb867298',
  'Content-Type': 'application/json',
};

// Make the POST request
axios
  .post(url, payload, { headers })
  .then(response => {
    // Process the response
    const { pidx, payment_url, expires_at, expires_in } = response.data;
    // Redirect the user to the payment_url
    res.json({
        pidx, payment_url, expires_at, expires_in
    })
    // ...
  })
  .catch(error => {
    // Handle the error
    if (error.response) {
      // Request was made and server responded with a status code outside the range of 2xx
      console.error('Request failed with status:', error.response.status);
      console.error('Response data:', error.response.data);
    } else if (error.request) {
      // Request was made but no response was received
      console.error('No response received:', error.request);
    } else {
      // Something else happened while setting up the request
      console.error('Error setting up the request:', error.message);
    }
  })

    } catch (error) {
        console.log("error within api",error)
    }
}

module.exports  = khaltiPayment