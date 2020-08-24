const express = require('express');
const cors = require('cors');
const monk = require('monk');
const Filter = require('bad-words');
// const rateLimit = require('express-rate-limit');

const app = express();

const db = monk('localhost/dweeter');
const dweets = db.get('dweets');
filter = new Filter();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.json({
        message: 'Hello!!!!!'
    });
});

app.get('/dweets',(req, res) => {
    dweets
    .find()
    .then(dweets => {
        res.json(dweets);
    });
});


function isValidDweet(dweet) {
    return dweet.name && dweet.name.toString().trim() !== '' &&
    dweet.content && dweet.content.toString().trim() !== '';
}

// app.use(rateLimit({
//     windowMs: 2 * 1000, // 2 seconds
//     max: 10
// }));


app.post('/dweets', (req, res) => {
    if (isValidDweet(req.body)) {
        // insert into MongoDB
        const dweet = {
            name: filter.clean(req.body.name.toString()),
            content: filter.clean(req.body.content.toString()),
            created: new Date()
        };

    dweets
        .insert(dweet)
        .then(createdDweet => {
            res.json(createdDweet);
        });

    } else {
        res.status(422);
        res.json({
            message: 'Hey! Name and Content are required'
        });
    }
});

app.listen(5000, () => {
    console.log('Listening on http://localhost:5000');
});