const express = require('express');
const jwt     = require('jsonwebtoken');
const bodyParser = require('body-parser');

const app = express();

const secret = 'ssssshhh';

app.use(express.static('./public'));
app.use('/node_modules', express.static('./node_modules'));

app.use(bodyParser.json());

app.post('/auth', (req, res) => {
    // get the user from db
    // Check that the password matches
    const payload = {username: req.body.username, password: req.body.password}
    jwt.sign(payload, secret, {}, (err, token) => {
        if (err) throw err;
        else {
            console.log('Returning to client')
            res.status(200).send({
                token: token,
                msg: 'ok',
                user: req.body.username
            })
        }
    });
})

app.get('/auth/me', (req, res) => {
    const token = req.get('Authorization');
    console.log(token);
    jwt.verify(token, secret, (err, decoded) => {
        if (err) return res.status(401).send(err);
        return res.status(200).json(decoded)
    })
})

app.get('/api/user/secretinfo', verify, (req, res) => {

})

function verify(req, res, next) {
  const token = req.get('Authorization');
  jwt.verify(token, secret, (err, decoded) => {
    if (err) return res.status(401).send();
    else {
      next();
    }
  })
}


app.listen(3000, function() {
    console.log('Listening on 3000...');
})
