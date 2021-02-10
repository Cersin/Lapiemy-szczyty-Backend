const app = require('./app');

// Listen to server
const port = 3001;
app.listen(port, () => {
    console.log(`App running on port ${port}`);
});
