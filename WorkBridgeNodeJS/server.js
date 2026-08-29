const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

app.get('/',(req,res)=>{

    res.send('<h1>Welcome to WorkBridge</h1>')

});
















app.listen(PORT, () => {
    console.log(`App running on http://localhost:${PORT}`);
});

