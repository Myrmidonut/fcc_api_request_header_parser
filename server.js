const express = require('express');
const cors    = require('cors');

const app = express();

app.use(cors({optionSuccessStatus: 200}));
app.use(express.static('public'));

app.get("/", (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

app.get("/api/hello", (req, res) => {
  res.json({
    greeting: 'hello API'
  });
});

app.get("/api/whoami", (req, res) => {
  const ip = req.headers["x-forwarded-for"].match(/(\d+\.)*\d+/)[0];
  const language = req.headers["accept-language"];
  const software = req.headers["user-agent"];
  
  res.json({
    "ipaddress": ip,
    "language": language,
    "software": software
  });
});

const listener = app.listen(process.env.PORT, () => {
  console.log('Your app is listening on port ' + listener.address().port);
});