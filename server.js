const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const axios = require('axios').default;
const cors = require('cors');
const requestIp = require('request-ip');

app.use(express.static(path.join(__dirname, 'build')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(requestIp.mv());
app.use(cors());

app.get('/geolocation', (req, res) => {
  console.log(requestIp.getClientIp(req));
  const ip = requestIp.getClientIp(req);
  axios
    .get(`http://ip-api.com/json/${ip}?lang=ru`)
    .then(ress => {
      res.send(ress.data);
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

app.post('/proxy', (req, res) => {
  const { url, method, params } = req.body;
  const methods = {
    POST: 'post',
    GET: 'get'
  };
  axios[methods[method] || 'get'](url, params)
    .then(res => {
      res.send(res.data);
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

app.get('/:path', function(req, res) {
  let _path = req.params.path;
  res.sendFile(path.join(__dirname, 'build', _path + '.html'), err => {
    if (err) {
      res.sendFile(path.join(__dirname, 'build', 'index.html'), err => {
        res.sendFile(path.join(__dirname, 'build', '200.html'));
        console.log('err fallback 200.html');
      });
    }
  });
});

let PORT;

try {
  PORT = process.env.PORT || 4000;
} catch (err) {
  PORT = 4000;
}

app.listen(PORT, () => {
  console.log(`server listening on ${PORT} PORT`);
});
