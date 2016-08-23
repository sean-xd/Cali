var timeouts = {},
  d = {
    p1i: document.getElementById("p1i"),
    p2i: document.getElementById("p2i"),
    infobox: document.getElementById("infobox")
  };

function ani(){
  d.p1i.classList.toggle("ani1");
  d.p2i.classList.toggle("ani2");
  if(timeouts.p1){
    clearTimeout(timeouts.p1);
    toggleInfobox();
    timeouts.p1 = null;
  }
  else timeouts.p1 = setTimeout(toggleInfobox, 700);
}

function toggleLocation(){
  d.location.classList.toggle("hide");
}

function toggleInfobox(){
  d.infobox.classList.toggle("show");
}
