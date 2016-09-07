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
  console.log(req.body);
  if(!req.body.email || !req.body.password || users[req.body.email]) return res.send(JSON.stringify({success: false}));
  var email = req.body.email,
    hash = hasher(req.body.password),
    toke = tokenizer(hash);
  users[email] = {email, hash, token: toke.token, ttl: toke.ttl, slots: []};
  saveUsers();
  res.send(JSON.stringify({success: true, user: {email, token: toke.token, slots: []}}));
});

// {email: "", token: "", password: ""}
app.post("/login", (req, res) => {
  var email = req.body.email,
    token = req.body.token,
    hash = hasher(req.body.password),
    now = Date.now(),
    user = users[email],
    checkToken = token === user.token && now < user.ttl,
    checkPass = hash === user.hash,
    result = {success: false};
  if(checkToken || checkPass){
    var toke = tokenizer(user.hash, user);
    result = {success: true, user: {email, token: toke.token, slots: user.slots}};
    saveUsers();
  }
  res.send(JSON.stringify(result));
});

// {email: "", token: "", slot: 1, persona: {}}
app.post("/update", (req, res) => {
  console.log(req.body);
  var email = req.body.email,
    token = req.body.token,
    slot = req.body.slot,
    persona = req.body.persona;
  if(token !== users[email].token || Date.now() > users[email].ttl) return res.send(JSON.stringify({success: false}));
  users[email].slots[slot] = persona;
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
