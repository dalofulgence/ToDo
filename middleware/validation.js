const { check } = require('express-validator');
 
exports.saveUser = [
    check('username', 'User Name is requied').not().isEmpty(),
    check('firstName', 'Fist Name is requied').not().isEmpty(),
    check('lastName', 'Last Name is requied').not().isEmpty(),
    check('todo', 'To Do is requied').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail().normalizeEmail({ gmail_remove_dots: true }),
    check('password', 'Password must be 6 or more characters').isLength({ min: 6 })
]

// // Handling Errors
// app.use((err, req, res, next) => {
//     // console.log(err);
//     err.statusCode = err.statusCode || 500;
//     err.message = err.message || "Internal Server Error";
//     res.status(err.statusCode).json({
//       message: err.message,
//     });
// });


