// Globals
var timeouts = {},
  dom = {
    p1: document.getElementById("p1"),
    p1i: document.getElementById("p1i"),
    p2i: document.getElementById("p2i"),
    infobox: document.getElementById("infobox")
  };

function scene(){
  // load area (background, text)
}

function ani(){
  AreaToLocal();
}

function AreaToLocal(){
  dom.p1.classList.toggle("hide");
  dom.p1i.classList.remove("transit");
  dom.p1i.classList.toggle("ani1");
  dom.p2i.classList.toggle("ani2");
  if(!dom.p1i.classList.contains("ani1")){
    clearTimeout(timeouts.p1);
    dom.infobox.classList.remove("show");
    timeouts.p1 = null;
  }
  else timeouts.p1 = setTimeout(() => {
    dom.infobox.classList.add("show");
  }, 600);
}

// Utility Functions
function clr(e, arr){
  arr.forEach(_class => e.classList.remove(_class));
}

dom.p1i.addEventListener("mouseenter", e => {
  dom.p1i.classList.add("transit");
});

dom.p1i.addEventListener("mousemove", e => {
  var x = Math.floor(e.pageX * -1 / 6),
    y = Math.floor(e.pageY * -1 / 6);
  dom.p1i.setAttribute("style", `margin: ${y}px 0px 0px ${x}px;`);
});
