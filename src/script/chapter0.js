// Chapter 0
addBackground("backgrounds/scene1.jpg", "down");
addBackground("backgrounds/scene2.jpg");
addCharacter("God", "characters/Kaia/Royals/God/f208.png", "center");

chapters[0] = [
  background("up", 1),
  blur("bg", 10),
  quote("- Stephen Crane, War Is Kind and Other Poems", [
    'A man said to the universe:',
    '"Sir, I exist!"',
    '"However" replied the universe,',
    '"The fact has not created in me',
    'A sense of obligation."'
  ]),
  hideBackground(),
  background("center", 1),
  music("chillax"),
  openDialogue(),
  line("You wake up in a white room."),
  line("Well, maybe you're not awake."),
  line("You don't feel anything, and while you notice a light there's nothing in vision to focus on."),
  line("Suddenly a person appears. It feels as though they've been there the whole time."),
  blur("bg", 10),
  characterChange("God", "center"),
  line("Congratulations. You've made it to the End of the World.", "Solemn Woman"),
  line("We're transferring you to the new universe we've created.", "Solemn Woman"),
  line("Would you like to create an Identity or continue without one?", "Solemn Woman"),
  choice({text: "Create an Identity", script: [
    characterChange("God", "right"),
    blur(dom.characters.God),
    closeDialogue(1),
    openLogin("Creating New Identity"),
    openDialogue(1000),
    unblur(dom.characters.God),
    characterChange("God", "center"),
    line("Notice!"),
    line("As armageddon has approached unexpectedly there may be a few hiccups in the universe that we can't immediately resolve."),
    line("Please bear with us and report any bugs to the Global Infrastructure team."),
    line("Welcome to Kaia, and enjoy the rest of eternity."),
  ]}, {text: "Continue [Demo]", script: [
    line("You'll be able to experience the world through the eyes of another."),
    line("We look forward to this valuable experience.")
  ]}),
  hideCharacter("God"),
  closeDialogue(),
  hideBackground()
];
