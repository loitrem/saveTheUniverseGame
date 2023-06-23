// hero class **********************************************************
class hero {

    //hero constructor
    constructor (hull, firepower, accuracy, image, shield) {
        this.hull = hull;
        this.firepower = firepower;
        this.accuracy = accuracy;
        this.image = image;
        this.shield = shield;
    }

    //get stats
    getStats () {
        let heroShip = {
            hull: this.hull,
            firepower: this.firepower,
            accuracy: this.accuracy,
            image: this.image,
            shield: this.shield
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
        heroTemp.shield = heroNew.shield;

        return heroTemp;
    }

    upgrade(category, menu){

        // determine which button is clicked and perform accordingly
        if (category==="hull") {

            if(points>=300) {
                points -= 300;
                let hullHide = document.querySelector('.shopHull');
                hullHide.setAttribute('class', 'shopHullHide');    
                earthHero.hull += 5;
                earthHero = earthHero.setStats(earthHero);
            }
            
        } else if (category==="firepower") {

            if(points>=500) {
                points -= 500;
                let hullHide = document.querySelector('.shopFirepower');
                hullHide.setAttribute('class', 'shopFirepowerHide');

                earthHero.firepower += 1;
                earthHero = earthHero.setStats(earthHero);
            }

        } else if (category==="accuracy") {

            if(points>=400) {
                points -= 400;
                let hullHide = document.querySelector('.shopAccuracy');
                hullHide.setAttribute('class', 'shopAccuracyHide');

                earthHero.accuracy += 1;
                earthHero = earthHero.setStats(earthHero);
            }
        } 

        if (menu==="done") {

            battleBox.innerHTML = "STAGE END" + "<br><br>" + "Would you like to continue?" + "<br><br>" + "Your shields will be recharged." + 
                                "<br><br>" + "<div class='stageScreen'><button class='stageButton' onclick='shipCombat.nextStage(hero)'>Continue</button>" + 
                                "<button class='stageButton' onclick='shipCombat.retreat()'>Run Away</button><button class='stageButtonUpgrade' onclick='earthHero.upgrade(``,`initial`)'>Upgrade Shop</button></div>";
        } else if (menu==="initial"){
            //sets up menu
            battleBox.innerHTML = "<div class='shopScreenWrapper'>UPGRADE SHOP" + "<br><br>" + points + "<br><br>" + "<div class='shopScreen'>" + 
                                "<div class='shopItem'>Cost: 300 Points<button class='shopButton shopHull' onclick='earthHero.upgrade(`hull`,`" + menu + "`)'>Hull</button></div>" + 
                                "<div class='shopItem'>Cost: 500 Points<button class='shopButton shopFirepower' onclick='earthHero.upgrade(`firepower`,`" + menu + "`)'>Firepower</button></div>" + 
                                "<div class='shopItem'>Cost: 400 Points<button class='shopButton shopAccuracy' onclick='earthHero.upgrade(`accuracy`,`" + menu + "`)'>Accuracy</button></div></div>" +  
                                "<button class='shopButton' onclick='earthHero.upgrade(``,`done`)'>Done</button>" + "<br><br>" + "</div>";
        }

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
        let ships = ["enemy3.png","enemy4.png", "enemy5.png", "enemy6.png", "enemy7.png","enemy3.png","enemy4.png", "enemy5.png", "enemy6.png", "enemy7.png"];

        for (let i = 0; i < numberOfShips; i++){

            // random for hull
            let enemyHull = Math.floor(Math.floor(Math.random()*(7-3)+3));

            // random for firepower
            let enemyFirepower = Math.floor(Math.floor(Math.random()*(5-2)+2));

            // ramdon for accuracy
            let enemyAccuracy = Math.floor(Math.floor(Math.random()*(9-6)+6));

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
            gameStart = true;
            run = false;
            
            earthHero = new hero(earthHeroHull,earthHeroFirepower,earthHeroAccuracty,earthHeroImg, Math.floor(Math.floor(Math.random()*(4-1)+1)));

        }
    }

    //restart game
    restart(){
        battleBox.innerHTML = "";
        gameOver = false;
        gameStart = false;
        startBtn = false;
        run = run;
        shipsDestroyed = 0;
        currentShip = 0;
        stage = 1;
        points = 0;
        round = 0;
        newStage = false;
        alienShip = new enemyShipArray();
        alienShipArray = alienShip.enemyArray(Math.floor(Math.floor(Math.random()*(10-6)+6)));

        let heroShip = document.querySelector('.heroShipImg');

        if (heroShip===null){
            heroShip = document.querySelector('.heroShipImgHide');
        }

        heroShip.removeAttribute('class');
        heroShip.setAttribute('class', 'heroShipImgHide');
        heroShip.setAttribute('src', 'hero.png');

        let enemyShip = document.querySelector('.enemyShipImg');
        enemyShip.removeAttribute('class');
        enemyShip.setAttribute('class', "enemyShipImgHide");
        enemyShip.setAttribute('src', "enemy3.png");

    }

    //next stage
    nextStage(){
        battleBox.innerHTML = "";
        gameOver = false;
        gameStart = false;
        startBtn = false;
        run = false;
        shipsDestroyed = 0;
        currentShip = 0;
        earthHero.shield = Math.floor(Math.floor(Math.random()*(4-1)+1));
        alienShip = new enemyShipArray();
        alienShipArray = alienShip.enemyArray(Math.floor(Math.floor(Math.random()*(10-6)+6)));

        let heroShip = document.querySelector('.heroShipImg');

        if (heroShip===null){
            heroShip = document.querySelector('.heroShipImgHide');
        }

        let retreatBtn = document.querySelector('.retreatHide');
        retreatBtn.setAttribute('class', 'retreat');
        let startGameBtn = document.querySelector('.startGameHide');
        startGameBtn.setAttribute('class', 'startGame');
        let fireBtn = document.querySelector('.fireHide');
        fireBtn.setAttribute('class', 'fire');

        heroShip.removeAttribute('class');
        heroShip.setAttribute('class', 'heroShipImgHide');
        heroShip.setAttribute('src', 'hero.png');

        let enemyShip = document.querySelector('.enemyShipImg');
        enemyShip.removeAttribute('class');
        enemyShip.setAttribute('class', "enemyShipImgHide");
        enemyShip.setAttribute('src', "enemy3.png");

        let heroShipHide = document.querySelector('.heroShipImgHide');
        heroShipHide.setAttribute('class', 'heroShipImg heroShip');

        let enemyShipHide = document.querySelector('.enemyShipImgHide');
        enemyShipHide.setAttribute('class', "enemyShipImg");

        battleBox.innerHTML = "Click fire to start combat";
        newStage = false;
        startBtn = true;
        run = false;
        gameStart = true;
        round = 0;
        stage++;
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

        let laserRight = document.getElementById("laserr");

        laserRight.setAttribute('class', 'laserRight');
        laserRight.setAttribute('src', 'laserright.png');
        void laserRight.offsetWidth;

        setTimeout(function() {
        laserRight.setAttribute('class', 'laserHide');  
        }, 250);

    }

    //shoot left animation
    shootLeft() {
        
        let laserLeft = document.getElementById("laserl");
        
        laserLeft.setAttribute('class', 'laserLeft');
        laserLeft.setAttribute('src', 'laserleft.png');
        void laserLeft.offsetWidth;
        
        setTimeout(function() {
            laserLeft.setAttribute('class', 'laserHide');  
        }, 250);
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
            this.shootRight();

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
                if (hero.shield>0){
                    hero.shield--;

                    //sets shield to zero if a negative number
                    if (hero.shield<0){
                        hero.shield = 0;
                    }
                } else if (hero.shield===0){
                    hero.hull -= enemy.firepower;
                }

                enemyHit = true;
            } else {
                enemyHit = false;
            }
            
            //sets enemy hull to zero if below zero
            if (hero.hull<0){
                hero.hull = 0;
            }

            this.shootLeft();

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
    retreat (hero) {
        if (newStage==false){
            let retreatBtn = document.querySelector('.retreat');
            retreatBtn.setAttribute('class', 'retreat');
            let startBtn = document.querySelector('.startGame');
            startBtn.setAttribute('class', 'startGame');
            let fireBtn = document.querySelector('.fire');
            fireBtn.setAttribute('class', 'fire');
        } else {
            let retreatBtn = document.querySelector('.retreatHide');
            retreatBtn.setAttribute('class', 'retreat');
            let startBtn = document.querySelector('.startGameHide');
            startBtn.setAttribute('class', 'startGame');
            let fireBtn = document.querySelector('.fireHide');
            fireBtn.setAttribute('class', 'fire');
        }

            let retreat = document.querySelector('.heroShip');
            
            retreat.setAttribute('class', 'run');
            void retreat.offsetWidth; 
            battleBox.setAttribute('class', 'battleBoxEnd');
            battleBox.innerHTML = "You have retreated - GAME OVER - ENEMIES WIN" + "<br><br>" + "<button class='startGame' onclick='shipCombat.restart(" + hero +  ")'>Play Again</>";

            setTimeout(function() {

                retreat.setAttribute('class', 'heroShipImgHide');   
                }, 450);

            gameOver = true;
            run = true;
    }

    //fight one round
    fight (hero, enemy) {

        let fightArray = [];

        //make sure hero is alive
        if (this.isAlive(hero)){

           //hero attacks first
            this.heroAttack(hero, enemy); 
    
        }

        // make sure enemy is alive
        if (this.isAlive(enemy)){

            //enemy attacks second
            this.enemyAttack(hero, enemy);
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

let earthHeroHull = 20;
let earthHeroFirepower = 5;
let earthHeroAccuracty = 7;
let earthHeroImg = "hero.png";
let earthHero = new hero(earthHeroHull,earthHeroFirepower,earthHeroAccuracty,earthHeroImg, Math.floor(Math.floor(Math.random()*(4-1)+1)));
let lastHero = new hero();
let alienShip = new enemyShipArray();
let alienShipArray = alienShip.enemyArray(Math.floor(Math.floor(Math.random()*(10-6)+6)));
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
let stage = 1;
let maxStage = 3;
let newStage = false;
let points = 0;
let change = 0;
let count = 1;

// one round of combat per click
const oneRound = () => {

    if (stage===1){
        change = 1;
        if (alienShipArray.length>0&&count===stage){
            for (let i = 0; i< alienShipArray.length; i++){
            alienShipArray[i].hull = Math.floor(alienShipArray[i].hull * change); 
            }
            count++;   
        }
        
    } else if (stage===2){
        change = 1.5;
        if (alienShipArray.length>0&&count===stage){
            for (let i = 0; i< alienShipArray.length; i++){
            alienShipArray[i].hull = Math.floor(alienShipArray[i].hull * change); 
            }  
            count++;  
        }
    } else if (stage===3){
        change = 2;
        if (alienShipArray.length>0&&count===stage){
            for (let i = 0; i< alienShipArray.length; i++){
            alienShipArray[i].hull = Math.floor(alienShipArray[i].hull * change); 
            }    
            count++;   
        }
    }

    // if you hit start and have not retreated
    if (gameStart===true&&run===false){
        //next stage
        if (stage<=maxStage) {

            battleBox.setAttribute('class', 'battleBox');
            //calls fight method from combat class
            let combatResult = [];

            //if nobody has won conduct combat
            if (shipCombat.enemiesLeft(alienShipArray)===true&&gameOver!==true){
                enemyHullOld = alienShipArray[0].hull;
                heroHullOld = lastHero.setStats(earthHero);
                combatResult.push(shipCombat.fight(earthHero, alienShipArray[0]));

            }
            // if not max stage
            else if (shipCombat.enemiesLeft(alienShipArray)===false&&stage<maxStage&&newStage===false){
                battleBox.setAttribute('class', 'battleBoxEnd');
                battleBox.innerHTML = "STAGE END" + "<br><br>" + "Would you like to continue?" + "<br><br>" + "Your shields will be recharged." + 
                                    "<br><br>" + "<div class='stageScreen'><button class='stageButton' onclick='shipCombat.nextStage(hero)'>Continue</button>" + 
                                    "<button class='stageButton' onclick='shipCombat.retreat()'>Run Away</button><button class='stageButtonUpgrade' onclick='earthHero.upgrade(``,`initial`)'>Upgrade Shop</button></div>";
                newStage = true;
                let startGameBtn = document.querySelector('.startGame');
                startGameBtn.setAttribute('class', 'startGameHide');
                let fireBtn = document.querySelector('.fire');
                fireBtn.setAttribute('class', 'fireHide');
                let retreatBtn = document.querySelector('.retreat');
                retreatBtn.setAttribute('class', 'retreatHide');
            }
            //if max stage
            else if (shipCombat.enemiesLeft(alienShipArray)===false&&stage===maxStage||gameOver===true){

                // if enemy wins
                if (gameOver===true&&run===false&&winner!=="hero"){
                    battleBox.setAttribute('class', 'battleBoxEnd');
                    battleBox.innerHTML = "GAME OVER" + "<br><br>" + "ENEMY WINS" + "<br><br>" + "<button class='startGame' onclick='shipCombat.restart()'>Play Again</>";
                    gameStart = false;
                    gameOver = true;
                    winner = "enemy";
                    let heroShipPic = document.querySelector('.heroShipImg');
                    heroShipPic.setAttribute('src', 'explosion.png');
                }
                //if hero wins
                else if (shipCombat.enemiesLeft(alienShipArray)===false){
                    battleBox.setAttribute('class', 'battleBoxEnd');
                    battleBox.innerHTML = "GAME OVER" + "<br><br>" + "HERO WINS" + "<br><br>" + "<button class='startGame' onclick='shipCombat.restart()'>Play Again</>";
                    gameStart = false;
                    gameOver = true;
                    winner = "hero";
                }
            }

            //checks if game is over
            if (gameOver===false&&newStage===false){

                let survivor = combatResult[0][0];
                let hero = combatResult[0][1];
                let enemy = combatResult[0][2];

                // checks if array has both objects or just one
                if (survivor === "both"){

                    //sets message if both ships are alive
                    message = "HERO Hull is at: " + hero.hull + " Shields can block: " + hero.shield + " more hits" + "<br><br>" + "Enemy Hull is at: " + enemy.hull;
                    
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
                    message =   "HERO Hull is at: " + hero.hull + " Shields can block: " + hero.shield + " more hits" + "<br><br>" + "ENEMY Hull is at: " + enemy.hull + "<br><br>" +  
                                "HERO HITS ENEMY's hull (" + enemyHullOld + ") for " + hero.firepower + " ENEMY IS DESTROYED"
                                + "<br><br>" + "ENEMY CANNOT ATTACK";
                    messageHero = "";
                    messageEnemy = "";
                    round++;
                    shipsDestroyed++;
                    currentShip++;
                    alienShipArray.shift();
                    shipCombat.animate();
                    points += 100;
                } else if (survivor === "enemy"){
                    message =   "HERO Hull is at: " + hero.hull + " Shields can block: " + hero.shield + " more hits" + "<br><br>" + "ENEMY Hull is at: " + enemy.hull + "<br><br>" + 
                                "ENEMY HITS HERO's hull (" + heroHullOld.hull + ") for " + enemy.firepower + " HERO IS DESTROYED";
                    messageHero = "";
                    messageEnemy = "";
                    round++;
                    shipsDestroyed++;
                    gameOver = true;
                }

                //add text to battle box
                battleBox.innerHTML = "Points: " + points + "<br><br>" + "Round: " + round + "<br><br>" + "Enemies left: " + alienShipArray.length + "<br><br>" + "Ships Destroyed: "
                                    + shipsDestroyed + "<br><br>" + message + "<br><br>" + messageHero + "<br><br>" + messageEnemy; 
            }
        }
    }
}