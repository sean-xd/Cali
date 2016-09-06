dom.email = el("email");
dom.password = el("password");
dom.login = el("login");
dom.loginTitle = el("login-title");

function openLogin(title){
  return () => {
    if(title) dom.loginTitle.textContent = title;
    clr(dom.login, "hide");
    isLocked = true;
  };
}

function closeLogin(){
  return () => {
    cla(dom.login, "hide");
    isLocked = false;
    nextStep();
  }
}

function tokenLogin(){
  if(!ls.token) return false;
  http("post", "/login", body => {
    console.log(body);
    ls.token = body.user.token;
    user = body.user;
  }, {email: ls.email, token: ls.token});
}

function login(){
  var email = dom.email.value,
    password = dom.password.value;
  cla(dom.login, "login-small");
  dom.email.value = "";
  dom.password.value = "";
  http("post", "/signup", body => {
    if(!body || !body.success) return console.log("Authentication Unsuccessful. Please try again.");
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
