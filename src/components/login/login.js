dom.email = el("email");
dom.password = el("password");
dom.login = el("login");
// dom.loginTitle = el("login-title");
var loginRoute = "/signup";
dom.newAccount = el("new-account");
dom.existingAccount = el("existing-account");
dom.activeLogin = el("active-login");

dom.newAccount.addEventListener("click", activateSignup);
dom.existingAccount.addEventListener("click", activateLogin);

function activateSignup(){
  cla(dom.activeLogin, "new");
  loginRoute = "/signup";
}

function activateLogin(){
  clr(dom.activeLogin, "new");
  loginRoute = "/login";
}

function openLogin(){
  if(user) return toggleSaveMenu();
  clr(dom.login, "hide");
  isLocked = true;
}

function closeLogin(){
  cla(dom.login, "hide");
  isLocked = false;
}

function tokenLogin(){
  if(!ls.token) return;
  http("post", "/login", body => {
    console.log(body);
    ls.token = body.user.token;
    user = body.user;
    loadSlots();
  }, {email: ls.email, token: ls.token});
}

function login(){
  var email = dom.email.value,
    password = dom.password.value;
  cla(dom.login, "hide");
  dom.email.value = "";
  dom.password.value = "";
  http("post", loginRoute, body => {
    console.log(body);
    if(!body || !body.success){
      openLogin();
      return console.log("Authentication Unsuccessful. Please try again.");
    }
    user = body.user;
    ls.token = body.user.token;
    ls.email = body.user.email;
    setTimeout(() => {
      cla(dom.login, "hide");
      isLocked = false;
      nextStep();
    }, 500);
  }, {email, password});
}

function update(){ // email token slot identity

}
