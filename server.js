var fs = require("fs"),
  crypto = require("crypto"),
  express = require("express"),
  bodyParser = require('body-parser'),
  app = express(),
  users = require(__dirname + "/db/users.json");

app.use(bodyParser.json());
app.use(express.static(__dirname + "/public"));

function tokenizer(salt, user){
  var ttl = Date.now() + 1000 * 60 * 60 * 24 * 7,
    token = hasher(salt + ttl);
  if(user){
    user.ttl = ttl;
    user.token = token;
    saveUsers();
  }
  return {ttl, token};
}

// {email: "", password: ""}
app.post("/signup", (req, res) => {
  if(!req.body.email || !req.body.password || users[req.body.email]) return res.send(JSON.stringify({success: false}));
  var email = req.body.email,
    hash = hasher(req.body.password),
    toke = tokenizer(hash);
  users[email] = {email, hash, token: toke.token, ttl: toke.ttl};
  saveUsers();
  res.send(JSON.stringify({success: true, user: {email, token: toke.token}}));
});

// {email: "", token: "", password: ""}
app.post("/login", (req, res) => {
  var email = req.body.email,
    token = req.body.token,
    hash = hasher(req.body.password),
    now = Date.now(),
    checkToken = token === users[email].token && now < users[email].ttl,
    checkPass = hash === users[email].hash,
    result = {success: false};
  if(checkToken || checkPass){
    var toke = tokenizer(token, users[email]);
    result = {success: true, user: {email, token: toke.token}};
    saveUsers();
  }
  res.send(JSON.stringify(result));
});

// {email: "", token: "", slot: 1, identity: {}}
app.post("/update", (req, res) => {
  var email = req.body.email,
    token = req.body.token,
    slot = req.body.slot,
    identity = req.body.identity;
  if(token !== users[email].token || now > users[email].ttl) return res.send(JSON.stringify({success: false}));
  users[email].slots[slot] = identity;
  saveUsers();
  res.send(JSON.stringify({success: true}));
});

app.listen(3000);

function saveUsers(){
  fs.writeFile(__dirname + "/db/users.json", JSON.stringify(users));
}

function hasher(str){
  if(!str) return false;
  return crypto.createHmac("sha256", "ohwow").update(str).digest("base64");
}
