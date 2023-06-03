const express = require('express');
const router = express.Router();

const User = require('../../models/User.js');

router.get('/', (request, result) => {
    User.find()
        .then(users => result.json(users))
        .catch(err => result.status(404).json({ noitemsfound: 'No Items found' }));
});

router.post('/', (request, result) => {

    email = request.body.email;

    User.findOne({email: email})
        .then(existingUser => {
            if(existingUser) {
                return result.status(400).json({ error: 'Email already in use. Please login instead.' });
            }

            User.create(request.body)
                .then(user => result.json({message: 'User added successfully'}))
                .catch(error => result.status(400).json({ error: 'Unable to add this User' }));
        })
        .catch(error => result.status(400).json({ error: 'Unable to add this User' }));
});

router.post('/login', (request, result) => {
    email = request.body.email;
    password = request.body.password;

    User.findOne({email: email, password: password})
        .then(user => {
            if(user) {
                return result.json({message: 'User logged in successfully', user: user});
            }
            return result.status(400).json({ error: 'Incorrect email or password' });
        })
        .catch(error => result.status(400).json({ error: 'Failed' }));
});

module.exports = router;