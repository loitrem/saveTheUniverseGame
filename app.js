// hero class **********************************************************
class hero {

    //hero constructor
    constructor (hull, firepower, accuracy, image) {
        this.hull = hull;
        this.firepower = firepower;
        this.accuracy = accuracy;
        this.image = image;
    }

    //get stats
    getStats () {
        let heroShip = {
            hull: this.hull,
            firepower: this.firepower,
            accuracy: this.accuracy,
            image: this.image
        }
        return heroShip;
    } 

    //set stats
    setStats (heroNew) {

        let heroTemp = new hero();

        heroTemp.hull = heroNew.hull;
        heroTemp.firepower = heroNew.firepower;
        heroTemp.accuracy = heroNew.accuracy;
        heroTemp.image = heroNew.image;

        return heroTemp;
    }
}
// end hero class *************************************************************


// enemy class ****************************************************************
class enemy {

    //enemy constructor
    constructor (hull, firepower, accuracy, image) {
        this.hull = hull;
        this.firepower = firepower;
        this.accuracy = accuracy;
        this.image = image;
    }

    //get stats
    getStats () {
        let enemyShip = {
            hull: this.hull,
            firepower: this.firepower,
            accuracy: this.accuracy,
            image: this.image
        }
        return enemyShip;
    } 

    //set stats
    setStats (enemyNew) {

        let tempEnemy = new enemy();

        tempEnemy.hull = enemyNew.hull;
        tempEnemy.firepower = enemyNew.firepower;
        tempEnemy.accuracy = enemyNew.accuracy;
        tempEnemy.image = enemyNew.image;

        return tempEnemy;
    }
}
// end enemy class ********************************************************

// enemy ship array class **************************************************
class enemyShipArray {

    // sets enemy ship array
    enemyArray(numberOfShips){

        //iniate array
        let enemyArray = [];
        let ships = ["enemy3.png","enemy4.png", "enemy5.png", "enemy6.png", "enemy7.png","boss.png"];

        for (let i = 0; i < numberOfShips; i++){

            // random for hull
            let enemyHull = Math.floor(Math.floor(Math.random()*(7-3)+3));

            // random for firepower
            let enemyFirepower = Math.floor(Math.floor(Math.random()*(5-2)+2));

            // ramdon for accuracy
            let enemyAccuracy = Math.floor((Math.floor(Math.random()*(9-6)+6)));

            // set enemy object
            let enemyList = new enemy(enemyHull, enemyFirepower,enemyAccuracy, ships[i]);

            //add to array
            enemyArray.push(enemyList);
        }
        return enemyArray;
    }

    //set value of object
    setValue (alienShipArray, combatResult) {
        alienShipArray.hull = combatResult.hull;
        alienShipArray.firepower = combatResult.firepower;
        alienShipArray.accuracy = combatResult.accuracy;
        alienShipArray.image = alienShipArray.image;

        return alienShipArray;
    }
}
// end enemy ship array class ********************************************

// combat class **********************************************************
class combat {

    // start game
    start() {

        if (gameOver==false && startBtn === false){

            gameStart = true;
            battleBox.setAttribute('class', 'battleBoxEnd');

            let heroShipHide = document.querySelector('.heroShipImgHide');
            heroShipHide.setAttribute('class', 'heroShipImg heroShip');

            let enemyShipHide = document.querySelector('.enemyShipImgHide');
            enemyShipHide.setAttribute('class', "enemyShipImg");

            battleBox.innerHTML = "Click fire to start combat";

            startBtn = true;
        }
    }

    //animate each ship
    animate() {
    let enemyShipOld = document.querySelector('.enemyShipImg');

        if (alienShipArray[0]){
            enemyShipOld.setAttribute('src', alienShipArray[0].image);

            enemyShipOld.removeAttribute('class');
        
            // the magic
            void enemyShipOld.offsetWidth;

            enemyShipOld.setAttribute('class', 'enemyShipImg');

        } else {
            enemyShipOld.setAttribute('src', 'explosion.png');
        }

    }

    // shoot right animation
    shootRight() {

        let laser = document.getElementById("laser");
        console.log(laser);

        laser.setAttribute('class', 'laserRight');
        laser.setAttribute('src', 'laserright.png');
        void laser.offsetWidth;

        setTimeout(function() {
            laser.setAttribute('class', 'laserHide left');  
        }, 450);
    }

    //shoot left animation
    shootLeft() {
        
            let laserLeft = document.getElementById("laser");
            console.log(laserLeft);
            
            laserLeft.setAttribute('class', 'laserLeft');
            laserLeft.setAttribute('src', 'laserleft.png');
            
            setTimeout(function() {
                laser.setAttribute('class', 'laserHide left');  
            }, 15000);
        }


    //checks if ship is still alive
    isAlive (ship) {
        if (ship.hull<=0) {
            return false;
        } else {
            return true;
        }
    }

    // checks if attack hits
    doesItHit (ship) {

        //sets attack chance random number 1-10
        let attackChance = Math.floor(Math.random()*10);
        console.log("attack " + attackChance);
        console.log("accuracy " + ship.accuracy);
        //checks if attack chance is in accuracy range
        if (attackChance<=ship.accuracy){
            return true;
        } else {
            return false;
        }
    }

    //hero attack
    heroAttack (hero, enemy) {

        //checks if both ships are alive
        if (this.isAlive(hero) && this.isAlive(enemy)){

            //checks if attack hits
            if (this.doesItHit(hero)){
                enemy.hull -= hero.firepower;
                heroHit = true;
            } else {
                heroHit = false;
            }
            
            //sets enemy hull to zero if below zero
            if (enemy.hull<0){
                enemy.hull = 0;
            }

           
            //returns enemy object
            return enemy;
        }
    }

    //enemy attack
    enemyAttack (hero, enemy) {

        //checks if both ships are alive
        if (this.isAlive(hero) && this.isAlive(enemy)){

            //checks if attack hits
            if (this.doesItHit(enemy)){
                hero.hull -= enemy.firepower;
                enemyHit = true;
            } else {
                enemyHit = false;
            }
            
            //sets enemy hull to zero if below zero
            if (hero.hull<0){
                hero.hull = 0;
            }

            //returns enemy object
            return hero;
        }
    }

    //checks if there are enemies left in enemy array
    enemiesLeft (enemies) {

        // if enemies array length is 0 return flase otherwise return true
        if (enemies.length===0){
            return false;
        } else {
            return true;
        }
    }

    //previous hero
    oldHero (hero) {

        let oldHero = new hero();
        
        return oldHero.setStats(hero);
    }

    // retreat
    retreat () {

        if (gameOver==false){

            let retreat = document.querySelector('.heroShip');

            // retreat.removeAttribute('class');
            
            retreat.setAttribute('class', 'run');
            void retreat.offsetWidth; 
            battleBox.setAttribute('class', 'battleBoxEnd');
            battleBox.innerHTML = "You have retreated - GAME OVER - ENEMIES WIN";

            setTimeout(function() {
                // void retreat.offsetWidth; 
                retreat.setAttribute('class', 'heroShipImgHide');   
                }, 450);

            gameOver = true;
            run = true;
        }
    }

    //fight one round
    fight (hero, enemy) {

        let fightArray = [];

        //make sure hero is alive
        if (this.isAlive(hero)){

           //hero attacks first
            this.heroAttack(hero, enemy); 
            this.shootRight();
        }

        // make sure enemy is alive
        if (this.isAlive(enemy)){

            //enemy attacks second
            this.enemyAttack(hero, enemy);
            this.shootLeft();
        }

        //either returns an array with hero and enemy or
        //returns whichever is alive
        if (this.isAlive(hero) && this.isAlive(enemy)){
            fightArray.push("both", hero, enemy);

            return fightArray;

        } else if (this.isAlive(hero) && !this.isAlive(enemy)){
            fightArray.push("hero", hero, enemy);

            return fightArray;

        } else if (!this.isAlive(hero) && this.isAlive(enemy)){
            fightArray.push("enemy", hero, enemy);

            return fightArray;
        }
        
    }
}
//end combat class *******************************************************************

let round = 0;

let earthHero = new hero(20,5,7,"hero.png");
let lastHero = new hero();
let alienShip = new enemyShipArray();
let alienShipArray = alienShip.enemyArray(6);
let shipCombat = new combat();
let battleBox = document.querySelector('.battleBox');
let shipsDestroyed = 0;
let currentShip = 0;
let message = "";
let messageHero = "";
let messageEnemy = "";
let heroHit = true;
let enemyHit = true;
let enemyHullOld = 0;
let heroHullOld = 0;
let heroOld;
let gameStart = false;
let gameOver = false;
let run = false;
let winner = "";
let startBtn = false;

// one round of combat per click
const oneRound = () => {

    if (gameStart===true&&run===false){
        battleBox.setAttribute('class', 'battleBox');
        //calls fight method from combat class
        let combatResult = [];

        if (shipCombat.enemiesLeft(alienShipArray)===true&&gameOver!==true){
            enemyHullOld = alienShipArray[0].hull;
            heroHullOld = lastHero.setStats(earthHero);
            combatResult.push(shipCombat.fight(earthHero, alienShipArray[0]));
        }
        else if (gameOver===true&&run===false&&winner!=="hero"){
            battleBox.setAttribute('class', 'battleBoxEnd');
            battleBox.innerHTML = "GAME OVER" + "<br><br>" + "ENEMY WINS";
            console.log(shipCombat.enemiesLeft(alienShipArray));
            gameStart = false;
            gameOver = true;
            winner = "enemy";
            let heroShipPic = document.querySelector('.heroShipImg');
            heroShipPic.setAttribute('src', 'explosion.png');
 
        }
        else if (shipCombat.enemiesLeft(alienShipArray)===false){
            battleBox.setAttribute('class', 'battleBoxEnd');
            battleBox.innerHTML = "GAME OVER" + "<br><br>" + "HERO WINS";
            console.log(shipCombat.enemiesLeft(alienShipArray));
            gameOver = true;
            winner = "hero";
        }
        

        let survivor = combatResult[0][0];
        let hero = combatResult[0][1];
        let enemy = combatResult[0][2];

        // checks if array has both objects or just one
        if (survivor === "both"){

            //sets message if both ships are alive
            message = "HERO Hull is at: " + hero.hull + "<br><br>" + "Enemy Hull is at: " + enemy.hull;
            
            // changes message depending on if hero's shot hit
            if (heroHit === true){
                messageHero = "HERO HITS ENEMY's hull (" + enemyHullOld + ") for " + hero.firepower + "  Enemy Hull is now at " + enemy.hull;
            } else if (heroHit===false){
                messageHero = "HERO's shot MISSES! Enemy hull is at " + enemy.hull;
            }

            // changes message depending on if enemy's shot hit
            if (enemyHit === true){
                messageEnemy = "ENEMY HITS HERO for " + enemy.firepower + "  Hero Hull is now at " + hero.hull;
            } else if (enemyHit===false){
                messageEnemy = "ENEMY's shot MISSES! Hero hull is at " + hero.hull;
            }
            round++;

        } else if (survivor === "hero"){
            message =   "HERO Hull is at: " + hero.hull + "<br><br>" + "ENEMY Hull is at: " + enemy.hull + "<br><br>" +  
                        "HERO HITS ENEMY's hull (" + enemyHullOld + ") for " + hero.firepower + " ENEMY IS DESTROYED"
                        + "<br><br>" + "ENEMY CANNOT ATTACK";
            messageHero = "";
            messageEnemy = "";
            round++;
            shipsDestroyed++;
            currentShip++;
            alienShipArray.shift();
            shipCombat.animate();
        } else if (survivor === "enemy"){
            message =   "HERO Hull is at: " + hero.hull + "<br><br>" + "ENEMY Hull is at: " + enemy.hull + "<br><br>" + 
                        "ENEMY HITS HERO's hull (" + heroHullOld.hull + ") for " + enemy.firepower + " HERO IS DESTROYED";
            messageHero = "";
            messageEnemy = "";
            round++;
            shipsDestroyed++;
            gameOver = true;
        }

        //add text to battle box
        battleBox.innerHTML = "Round: " + round + "<br><br>" + "Hero Ship hull: " + hero.hull + "<br><br>" + "Ships Destroyed: "
                            + shipsDestroyed + "<br><br>" + message + "<br><br>" + messageHero + "<br><br>" + messageEnemy; 
    }
}



