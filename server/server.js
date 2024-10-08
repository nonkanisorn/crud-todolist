const express = require("express");
const cors = require("cors");
const app = express();
const port = 5012;
app.use(cors());
app.use(express.json());
app.listen(port, () => console.log(`server running on port ${port}`));
