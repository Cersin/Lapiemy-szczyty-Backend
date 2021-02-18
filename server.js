const app = require('./app');
const dotenv = require('dotenv');

dotenv.config({path: './config.env'});
// console.log(process.env);
console.log(process.env.NODE_ENV);
// Listen to server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`App running on port ${port}`);
});
