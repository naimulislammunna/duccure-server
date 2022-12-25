const express = require('express');
const app = express();
const port = process.env.PORT || 5000;


app.get('/', (req, res) =>{
    res.send('server running nowwww');
} );
app.get('/users', (req, res) =>{
    res.send('users  nowwww');
} );


app.listen(port, () =>{
    console.log('Server runnnnnnigggggg', port);
})