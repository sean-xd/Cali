// Chapter 1 Scene 1
assets["1M"] = () => {
  console.log("ok");
  addBackground("backgrounds/woods-sky.jpg", "up");
  addBackground("backgrounds/woods-tent.jpg", "down");
  // addBackground("backgrounds/woods-night.jpg", "left");
  addBackground("backgrounds/dark-texture.jpg");
  addCharacter("Myth", "characters/Venture/Postal/Myth/f348.png", "left");
  addCharacter("Jessica", "characters/Venture/Postal/Jessica/f352.png", "right");
  addCharacter("Eliza", "characters/Venture/Advance/Eliza/f338.png", "right");
  addCharacter("Art", "characters/Venture/Postal/Art/f342.png", "right");
  addCharacter("Zelda", "characters/Venture/Advance/Zelda/f091.png", "left");
  addCharacter("Leffen", "characters/Venture/Advance/Leffen/f069.png", "left");
  addCharacter("Hitomi", "characters/Venture/Advance/Hitomi/f071.png", "left");
  addCharacter("Vector", "characters/Venture/Advance/Vector/f336.png", "left");
  flip("Art")();
  flip("Leffen")();
  flip("Hitomi")();
};

chapters["1M"] = [
  closeMainMenu,
  music("banana"),
  background("down", 1),
  openDialogue(500),
  line("You open your eyes for what feels like the first time."),
  line("The first thing you see is the night sky."),
  line("Home is out there somewhere.", "Myth"),
  line("You realize you have no idea where you are, and get up to look around."),
  background("up", 1),
  line("You immediately notice a group of people at a campsite nearby, and get closer to listen to them."),
  () => {
    setTimeout(() => cla(dom.characters.Myth, "halfhide"), 0);
    nextStep();
  },
  characterChange("Myth", "left"),
  characterChange("Jessica", "right"),
  line("I'm starving.. When are they coming back with dinner?", "Blonde Girl"),
  characterChange("Jessica", "center"),
  characterChange("Eliza", "right"),
  line("How is Jessica still hungry? All she does is lay around stuffing her face..", "Serious Looking Girl"),
  flip("Jessica"),
  line("Wh-what?! I went on plenty of patrols this week, it's not my fault there's nothing happening here.", "Jessica"),
  line("Didn't Art raid a bandit campsite yesterday? Oh, you sleep through all of your shifts so you wouldn't know..", "Serious Looking Girl"),
  hideCharacter("Eliza", "right"),
  characterChange("Art", "right"),
  line("Come on Eliza it's not her fault. It's my mistake for not waking her up.", "Art"),
  hideCharacter("Art", "right"),
  line("Aaah~ What did I do to deserve getting stuck in this world, with this nerd, and no food...", "Jessica"),
  characterChange("Jessica", "right"),
  line("You were too focused on their conversation that you didn't notice people approaching behind you."),
  characterChange("Myth", "center"),
  characterChange("Zelda", "left"),
  () => {
    clr(dom.characters.Myth, "halfhide");
    nextStep();
  },
  line("Watcha doin?", "Eccentric Girl"),
  shake("Myth"),
  line("Ah!", "Myth"),
  flip("Jessica"),
  shake("Jessica"),
  line("Eeeek!!!", "Jessica"),
  line("You idiot! Don't sneak up on me like that!", "Jessica"),
  hideCharacter("Jessica", "right"),
  line("Are you ok?", "Eccentric Girl"),
  choice({text: "Yeah, totally.", script: [
    characterChange("Art", "right"),
    line("Hey, you guys are back. What were you able to pick up?"),
    hideCharacter("Zelda", "left"),
    characterChange("Leffen", "left"),
    line("Sorry, not much. We're going to have to do some more hunting in the morning.", "Responsible Boy"),
    hideCharacter("Art", "right"),
    characterChange("Myth", "right"),
    characterChange("Leffen", "center"),
    characterChange("Hitomi", "left"),
    line("It's ok. We don't have to eat anyway.", "Stoic Girl"),
    hideCharacter("Hitomi", "left"),
    characterChange("Leffen", "left"),
    characterChange("Myth", "center"),
    characterChange("Jessica", "right"),
    line("Speak for yourself! Where's the food?!", "Jessica"),
    hideCharacter("Jessica", "right"),
    characterChange("Myth", "right"),
    characterChange("Leffen", "center"),
  ]}, {text: "Who are you people?", script: [
    // line("Uh oh-", "Eccentric Girl"),
    // hideCharacter("Eccentric Girl", "left"),
    // cond(stateCheck("1V", "dead"), [
      // vector was killed in the 1V mission, so doesnt break up the convo
      // this is where they become suspicious and you run
    // ], [])
  ]}),

  characterChange("Vector", "left"),
  line("Help! Bandits incoming!", "Frightened Boy"),
  flip("Leffen"),
  line("How many were there? Are we okay to fight them here?", "Responsible Boy"),
  line("I-I think there were four of them, but only two came this way-", "Frightened Boy"),
  line("Alright, Hitomi and I will take Myth to go deal with them. Vector, you help pack up the campsite. We have to be ready to move if they keep chasing us.", "Responsible Boy"),
  line("Y-yes sir!", "Vector"),
  hideCharacter("Vector", "left"),
  characterChange("Leffen", "left"),
  characterChange("Myth", "center"),
  characterChange("Art", "right"),
  line("Leffen, I should come too. They're probably just stragglers from the group I broke up yesterday.", "Art"),
  flip("Leffen"),
  line("I think we'll be alright on our own. We need to be cautious; we don't know how many more there are or where they could be.", "Leffen"),
  line("Make it quick; we're going to head East if you aren't back in time.", "Art"),
  line("Alright, see you soon! Myth, Hitomi, let's go!", "Leffen"),
  closeDialogue(0),
  hideCharacter("Art", "right"),
  hideCharacter("Myth", "center"),
  hideCharacter("Leffen", "left"),
  // characterChange("Myth", "right"),
  // characterChange("Leffen", "center"),
  // characterChange("Hitomi", "left"),
  music("tellme"),
  background("right"),
  // line("Myth, let's go!", "Responsible Boy"),
  // choice({text: "Right behind you!", script: [
  //
  // ]}, {text: "*run away*", script: [
  //
  // ]}),
  () => {}, //buffer

  // battle

  () => {}, // buffer
  // End of chapter
  closeDialogue(1),
  background("center", 1),
  setChapter("2M"),
  openMainMenu("End Sequence 1M", "Save")
];
