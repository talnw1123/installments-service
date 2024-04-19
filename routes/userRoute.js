const express = require('express')

const { auth } = require('../middleware/auth');

const router = express.Router();

// Get all users
// router.get('/',auth, allUsers)

// Get one user
// router.get('/:id', getUser)

// Register user to DB
// router.post('/register', createUser)


// Login user to DB
// router.post('/login', loginUser)

// Update a user
// router.patch("/:id", updateUser)

// Delete a user
// router.delete('/:id', deleteUser)

module.exports = router;