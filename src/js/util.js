// Utility
function el(name, parent){
  parent = parent || document;
  return parent.getElementsByClassName(name)[0];
}

function clt(e, name){
  if(Array.isArray(name)) return name.forEach(n => clt(e, n));
  e.classList.toggle(name);
}

function cla(e, name, unique){
  if(Array.isArray(name)) return name.forEach(n => cla(e, n));
  if(unique && el(name)) clr(el(name), name);
  e.classList.add(name);
}

function clr(e, name){
  if(Array.isArray(name)) return name.forEach(n => clr(e, n));
  e.classList.remove(name);
}

function t(tag, config){
  config = config || {};
  var parent = tag ? document.createElement(tag) : document.createDocumentFragment();
  if(config) Object.keys(config).forEach(key => parent[key] = config[key]);
  return (ch, force) => {
    if(force){parent.innerHTML = ch; return parent;}
    if(!ch && ch !== 0) return parent;
    var type = Object.prototype.toString.call(ch).slice(8,-1);
    if(type === "String" || type === "Number") parent.textContent = ch;
    if(type.substr(0,4) === "HTML" || type.substr(0, 4) === "Docu") parent.appendChild(ch);
    if(type === "Array") ch.forEach(e => parent.appendChild(e));
    return parent;
  };
}

function http(verb, route, cb, data){
  var req = new XMLHttpRequest();
  req.onload = function(){cb(JSON.parse(this.responseText));};
  req.open(verb, route);
  if(verb === "post") req.setRequestHeader("Content-Type", "application/json");
  req.send(data ? JSON.stringify(data) : null);
}

function blur(element, ten){
  return () => {
    if(element === "bg") element = dom.bgs[bgPosition];
    cla(element, ten === 10 ? "blur" : "blur1px");
    nextStep();
  }
}

function unblur(element, ten){
  return () => {
    if(element === "bg") element = dom.bgs[bgPosition];
    else element = dom.characters[element];
    clr(element, ten === 10 ? "blur" : "blur1px");
    nextStep();
  }
}

function flip(name){
  return () => {
    clt(el("cimg", dom.characters[name]), "flip");
    nextStep();
  };
}

function shake(name){
  return () => {
    cla(dom.characters[name], "shake");
    setTimeout(() => {
      clr(dom.characters[name], "shake");
      nextStep();
    }, 500);
  }
}

function cond(check, success, fail, waitFor){
  return () => {
    if(waitFor && !check()) script.unshift(cond(check, success, fail, waitFor));
    script = check() ? (success || []).concat(script) : (fail || []).concat(script);
    nextStep();
  };
}


// dom.p1i.addEventListener("mousemove", e => {
//   var x = Math.floor(e.pageX * -1 / 6),
//     y = Math.floor(e.pageY * -1 / 6);
//   dom.p1i.setAttribute("style", `margin: ${y}px 0px 0px ${x}px;`);
// });
