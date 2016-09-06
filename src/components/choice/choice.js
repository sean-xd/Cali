// Choice
var choices = {
  a: [],
  b: []
};

dom.choices = el("choices");
dom.choiceA = el("choiceA");
dom.choiceB = el("choiceB");

function choice(a, b){
  return () => {
    isLocked = true;
    dom.choiceA.textContent = a.text;
    choices.a = a.script;
    dom.choiceB.textContent = b.text;
    choices.b = b.script;
    clr(dom.choices, ["hide", "up"]);
  };
}

function choose(letter){
  cla(dom.choices, ["hide", "up"]);
  script = choices[letter].concat(script);
  isLocked = false;
  nextStep();
}
