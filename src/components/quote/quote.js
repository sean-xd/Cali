// Quotes
dom.quote = el("quote");
dom.quote.addEventListener("click", nextStep);
function quote(author, lines){
  return () => {
    script.unshift(() => {
      cla(dom.quote, "hide");
      nextStep();
    });
    script.unshift(() => {
      if(!intervals.quote) return nextStep();
      clearInterval(intervals.quote);
      quickQuote(author, lines);
    });
    var lineNum = 0;
    while(dom.quote.firstChild) dom.quote.removeChild(dom.quote.firstChild);
    clr(dom.quote, "hide");
    intervals.quote = setInterval(() => {
      if(lineNum < lines.length) return addQuoteLine(lines[lineNum++]);
      addQuoteLine(author, 1);
      clearInterval(intervals.quote);
      intervals.quote = null;
    }, 1500);
  };
}

function addQuoteLine(text, isAuthor){
  var line = t("div", {className: `line ${isAuthor ? "author" : ""} hide`})(text);
  dom.quote.appendChild(line);
  setTimeout(() => clr(line, "hide"), 500);
}

function quickQuote(author, lines){
  while(dom.quote.firstChild) dom.quote.removeChild(dom.quote.firstChild);
  lines.forEach(str => dom.quote.appendChild(t("div", {className: "line"})(str)));
  dom.quote.appendChild(t("div", {className: "line author"})(author));
}

// It was of a strange order, that the doom
// Of these two creatures should be thus traced out
// Almost like a reality—the one
// To end in madness—both in misery.
// - George Byron, The Dream, IX

// He allowed himself to be swayed by his conviction
// that human beings are not born once and for all
// on the day their mothers give birth to them
// but that life obliges them over and over again
// to give birth to themselves.
// - Gabriel Garcí­a Márquez, Love in the Time of Cholera

// “Compassion hurts.
// When you feel connected to everything, you also feel responsible for everything.
// And you cannot turn away.
// Your destiny is bound with the destinies of others.
// You must either learn to carry the Universe or be crushed by it.
// You must grow strong enough to love the world,
// yet empty enough to sit down at the same table with its worst horrors.”
// ― Andrew Boyd, Daily Afflictions: The Agony of Being Connected to Everything in the Universe

// Look at the sky.
// We are not alone.
// The whole universe is friendly to us and conspires only to give the best to those who dream and work.
// - A. P. J. Abdul Kalam

// Look out into the universe and contemplate the glory of God.
// Observe the stars, millions of them, twinkling in the night sky,
// all with a message of unity, part of the very nature of God.
// - Sai Baba
