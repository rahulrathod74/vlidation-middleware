const express = require("express");
const app = express();
app.use(express.json());

// const checkNumber = (data) => {
//     return typeof data === 'number';
// };
// const checkString = (data) => {
//     return typeof data === 'string';
// };
// const checkArray = (data) => {
//     return Array.isArray(data);
// };

// Input validation middleware
const validateInput = (req, res, next) => {
    const { ID, Name, Rating, Description, Genre, Cast } = req.body;

    // Check if ID and Rating are numbers
    if (typeof ID !== "number" || typeof Rating !== "number") {
        return res.status(400).send("Bad request: ID and Rating should be numbers.");
    }

    // Check if Name, Description, and Genre are strings
    if (typeof Name !== "string" || typeof Description !== "string" || typeof Genre !== "string") {
        return res.status(400).send("Bad request: Name, Description, and Genre should be strings.");
    }

    // Check if Cast is an array and all elements are strings
    if (!Array.isArray(Cast) || !Cast.every(item => typeof item === "string")) {
        return res.status(400).send("Bad request: Cast should be an array of strings.");
    }

    next();
};

app.post('/', validateInput, (req, res) => {
    res.status(200).send("Data received successfully.");
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});
