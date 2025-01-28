const express = require('express');
const bodyParser = require('body-parser');
const matchRoutes = require("./routes/match.route");

const app = express();
app.use(bodyParser.json());

cors = require('cors');
app.use(cors());


app.use("/api/tenis", matchRoutes);


const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
