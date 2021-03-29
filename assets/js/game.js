//function to generate a random numeric value
var randomNumber = function(min,max) {
  var value = Math.floor(Math.random() * (max - min +1) + min);
  return value;
};

var fightOrSkip = function() {
  //ask player if they'd like to fight or skip using fightOrSkip function
  var promptFight = window.prompt('Would you like to FIGHT or SKIP this battle? Enter "FIGHT" or "SKIP" to choose');

  promptFight = promptFight.toLowerCase();
  // conditional Recursive Function 
  if (!promptFight) {
    window.alert("You need to provide a valid answer! Please try again.");
    return fightOrSkip();
  }

  if (promptFight === "skip") {
    var confirmSkip = window.confirm("Wre you sure you'd like to quite?");

    //if yes (true), leave fight
    if (confirmSkip) {
      window.alert(playerInfo.name + " has decided to skip this fight. Goodbye!");
      //subtract money from the playerMoney for skipping
      playerInfo.money = math.max(0, playerInfo.money - 10);
      shop();
    }
  }
}

// fight function (now with parameter for enemy's name)
var fight = function(enemy) {
  var isPlayerTurn = true;
    //randomly change turn order
    if (Math.random() > 0.5) {
      isPlayerTurn = false;
    }
    while (playerInfo.health > 0 && enemy.health > 0) {
      if (isPlayerTurn) {
        // ask player if they'd like to fight or run
        if (fightOrSkip()) {
          break;
        }

        // remove enemy's health by subtracting the amount set in the playerInfo.attack variable
        var damage = randomNumber(playerInfo.attack - 3, playerInfo.attack);
        enemy.health = Math.max(0, enemy.health - damage);
        console.log(
          playerInfo.name + ' attacked ' + enemy.name + '. ' + enemy.name + ' now has ' + enemy.health + ' health remaining.'
        );

      // check enemy's health
      if (enemy.health <= 0) {
        window.alert(enemy.name + ' has died!');

        // award player money for winning
        playerInfo.money = playerInfo.money + 20;

        // leave while() loop since enemy is dead
        break;
      } else {
        window.alert(enemy.name + ' still has ' + enemy.health + ' health left.');
      }
      //player gets attacked first
    } else {
      // remove players's health by subtracting the amount set in the enemyAttack variable
      var damage = randomNumber(enemy.attack - 3, enemy.attack);

      playerInfo.health = Math.max(0, playerInfo.health - damage);
      console.log(
        enemy.name + ' attacked ' + playerInfo.name + '. ' + playerInfo.name + ' now has ' + playerInfo.health + ' health remaining.'
      );

      // check player's health
      if (playerInfo.health <= 0) {
        window.alert(playerInfo.name + ' has died!');
        // leave while() loop if player is dead
        break;
      } else {
        window.alert(playerInfo.name + ' still has ' + playerInfo.health + ' health left.');
      }
    }
    //switch turn order
    isPlayerTurn = !isPlayerTurn;
  }
};

// function to start a new game
var startGame = function() {
  // reset player states
  playerInfo.reset();

  //fight each enemy bot 
  for (var i = 0; i < enemyInfo.length; i++) {
    //if player is still alive, keep fighting
    if (playerInfo.health > 0) {
      //let player know what round they are in
      window.alert("Welcome to Robot Gladiators! Round " + (i + 1));

      //pick new enemy to fight
      var pickedEnemyObj = enemyInfo[i];

      // reset enemy health
      pickedEnemyObj.health = randomNumber(40, 60);

      // pass pickedEnemyName into the fight funcion
      fight(pickedEnemyObj);

      // if we'r not at the last enemy in the array
      if (playerInfo.health > 0 && i < enemyInfo.length - 1) {
        //ask if player wants to shop
        var storeConfirm = window.confirm("The fight is over, visit the store before the next round?");

        //if yes, go to store
        if (storeConfirm) {
          shop();
        }
      }
    }
    // if player is not alive, break out of the loop
    else {
      window.alert("You have lost your robot in battle! Game Over!");
      break;
    }
  }

  // after loop ends, out of the game
  endGame();
};

// function to end the entire game
var endGame = function() {
  window.alert("The game has now ended. Let's see how you did!");

  //check the highscore
  var highScore = localStorage.getItem("highscore");
  if (highScore === null) {
    highScore = 0;
  }

  // if player has more money than the high score, player has new high score
  if (playerInfo.money > highScore) {
    localStorage.setItem("highscore", playerInfo.money);
    localStorage.setItem("name", playerInfo.name);

    alert(playerInfo.name + " now has the high score of " + playerInfo.money + "!");

  }
  else {
    alert(playerInfo.name + " did not beat the high score of " + highScore + ". Maybe next time!");
  }
  
  // ask player if they'd like to play again
  var playAgainConfirm = window.confirm("Would you like to play again?");

  if (playAgainConfirm) {
    startGame();
  } else {
    window.alert("Thank you for playing Robot Gladiators! Come back soon!");
  }
};

// shop function
var shop = function() {
  //ask player what they would like to do
  var shopOptionPrompt = window.prompt(
    "Would you like to REFILL your Health, UPGRADE your attack, or Leave the store? Please enter one: 1 to REFILL, 2 to UPGRADE, or 3 to LEAVE."
  );

  shopOptionPrompt = parseInt(shopOptionPrompt);
  //use switch to carry out action
  switch (shopOptionPrompt) {
    case 1:
      playerInfo.refillHealth();
      break;
    case 2:
      playerInfo.upgradeAttack();
      break;
    case 3:
      window.alert("Leaving the store.");
    // do nothing so function will end
      break;
    default:
    window.alert("You did not pick a valid option. Try again.");
    //call shop()
    shop();
    break;
  }
};

//function to set name
var getPlayerName = function() {
  var name = "";
  while (name ===""||name === null ){
    name = prompt("What is your robot's name?")
  }
  // Add Loop here with prompt and condition 
  console.log("Your robot's name is" + name);
  return name;
}



var playerInfo = {
  name:getPlayerName(),
  health: 100,
  attack: 10,
  money: 10,
  reset: function() {
    this.health = 100;
    this.money = 10;
    this.attack = 10;
  },
  refillHealth: function() {
    if (this.money >= 7) {
      window.alert("Refillling player's health by 20 for 7 dollars.");
      this.health += 20;
      this.money -= 7;
    }
    else {
      window.alert("You don't have enough money!");
    }
  },
  upgradeAttack: function () {
    if (this.money >= 7) {
      window.alert("Upgrading player's attack by 6 for 7 dollars.");
      this.attack += 6;
      this.money -= 7;
    }
    else {
      window.alert("You don't have enough money!");
    }
  }
};
var enemyInfo = [
  {
    name: "Roberto",
    attack: randomNumber(10, 14)
  },
  {
    name: "Amy Android",
    attack: randomNumber(10, 14)
  },
  {
    name: "Robo Trumble",
    attack: randomNumber(10, 14)
  }
];

// start the game when the page loads
startGame();