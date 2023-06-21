// save the universe

let gameOver = false;
let battleBox = document.querySelector('.battleBox');
let laser = document.querySelector('.laserHide');
let topMiddle = document.querySelector('.topMiddle');
let round = 1;
let shipsDestroyed = 0;
let winner = "";
let winMsg = "";

// set hero ship stats
let heroShip = {
    hull: 20,
    firepower: 5,
    accuracy: 7,
    image: ""
}

// set enemy ship stats
const enemyStats = () => {
    // random for hull
    let enemyHull = Math.floor(Math.floor(Math.random()*(7-3)+3));

    // random for firepower
    let enemyFirepower = Math.floor(Math.floor(Math.random()*(5-2)+2));

    // ramdon for accuracy
    let enemyAccuracy = Math.floor((Math.floor(Math.random()*(9-6)+6)));

    // set enemy object
    let enemy = {
        hull: enemyHull,
        firepower: enemyFirepower,
        accuracy: enemyAccuracy,
        image:""
    };

    // return enemy object
    return enemy;
}

// enemy array
let enemyArrayLength = 6;
let enemyFleet = [];


// fill enemy array
for (let i = 0; i< enemyArrayLength; i++){
    enemyFleet.push(enemyStats());
}

// hero attack
const heroAttack = (hero, enemy) => {

    enemy.hull -= hero.firepower;

    // if hull is negative make it zero
    if (enemy.hull<0){
        enemy.hull = 0;
    }

    // return enemy
    return enemy;
}

// enemy attack
const enemyAttack = (hero, enemy) => {

    hero.hull -= enemy.firepower;

    // if hull is negative make it zero
    if (hero.hull<0){
        hero.hull = 0;
    }

    // return hero
    return hero;
}

// retreat
const retreat = () => {
    return true;
}

let ships = ["enemy4.png", "enemy5.png", "enemy6.png", "enemy7.png","boss.png"];

//animate each ship
const animate = () => {
    let enemyShipOld = document.querySelector('.enemyShipImg');
    let laser = document.querySelector('laser');

    enemyShipOld.setAttribute('src', ships[0]);

    enemyShipOld.removeAttribute('class');
    
    // the magic
    void enemyShipOld.offsetWidth;

    enemyShipOld.setAttribute('class', 'enemyShipImg');
    
    ships.shift();
}

const shootRight = () => {

    let laser = document.querySelector('.laserHide');

    const rehide = () => {

            laser.setAttribute('class', 'laserHide left');  
    }

    const shootLeft = () => {

            let laserLeft = document.querySelector('.left');
        
            const rehideLeft = () => {
                laser.setAttribute('class', 'laserHide left');
            }

            laserLeft.setAttribute('class', 'laserLeft');
            laserLeft.setAttribute('src', 'laserleft.png');
            setTimeout(rehideLeft, 450);   
        
    }

    laser.setAttribute('class', 'laserRight');
    laser.setAttribute('src', 'laserright.png');
    void laser.offsetWidth;
    setTimeout(rehide, 450);
    setTimeout(shootLeft, 450);

}


// start game
const start = () => {

    let heroShipHide = document.querySelector('.heroShipImgHide');
    heroShipHide.setAttribute('class', 'heroShipImg heroShip');

    let enemyShipHide = document.querySelector('.enemyShipImgHide');
    enemyShipHide.setAttribute('class', "enemyShipImg");

    battleBox.innerHTML = "Round: " + round  + "<br><br>"  + "Enemies Left: " + enemyFleet.length + "<br><br>" + 
        "Hero Hull " + heroShip.hull + "<br><br>" + "ENEMIES DESTROYED: " + shipsDestroyed + "<br><br>" + "Enemy hull is at " + enemyFleet[0].hull + "";

        round++;
    
}

// combat turns
const combat = (hero, enemy) => {

    if (gameOver===false){

        let enemyShipDiv = document.querySelector('.enemyShipImg');
        let heroShipDiv = document.querySelector('.heroShipImg');

        console.log("");
        console.log(enemy.length + " enemies left");

        if (winner!="HERO" && winner!="ENEMY" && hero.hull >0 || enemy[0].hull>0){

            // set current enemy to new hull value after hero attacks
            enemy[0] = heroAttack(hero, enemy[0]);

            console.log("");
            console.log("Round", round);
            console.log("=============================================================================");
            console.log("HERO TURN");
            console.log("Hero Attacks enemy for " + hero.firepower + " damage");
            console.log("enemy ship now has " + enemy[0].hull + " HP");
            console.log("");
            shootRight();

            // if current enemy hull is zero remove it from array
            if (enemy[0].hull<=0 && enemy.length>1){
                enemy.shift();
                animate();
                shipsDestroyed++;
            } 

            // if all enemies are destroyed hero wins
            if (enemy.length===1 && enemy[0].hull===0){
                console.log("Hero Wins!!!");
                gameOver = true;
                winner = "HERO";
                enemyShipDiv.remove();
                winMsg = "Winner is - HERO!!!!!";

                battleBox.innerHTML = "Round: " + round  + "<br><br>"  + "Enemies Left: " + enemy.length + "<br><br>" + 
            "Hero Hull " + hero.hull + "<br><br>" + "ENEMIES DESTROYED: " + shipsDestroyed +  "<br><br>" + "Enemy hull is at " + enemy[0].hull + "<br><br>" + " HERO ATTACKS ENEMY for " 
            + hero.firepower + " damage ENEMY SHIP now has " + enemy[0].hull + " HP" + "<br><br>" 
            + "<br><br>" + winMsg;

            } else {

                console.log("=============================================================================");

                // set hero hull value after enemy attacks
                hero = enemyAttack(hero, enemy[0]);

                console.log("ENEMY TURN");
                console.log("enemy Attacks hero for " + enemy[0].firepower + " damage");
                console.log("hero ship now has " + hero.hull + " HP");
                console.log("");
                console.log("=============================================================================");
                console.log(enemy.length + " enemies left");
                console.log("=============================================================================");
                console.log("");
                console.log("test");
            }

            // if hero hull is zero hero loses
            if (hero.hull<=0 && ships.length>0){
                console.log("Hero Loses!!!!!");
                gameOver = true;
                winner = "ENEMY";
                hero.hull = 0;
                enemyShipDiv.setAttribute('src', ships[0]);
                console.log(ships[0]);
                heroShipDiv.setAttribute('class', 'enemyShipImgHide');
                winMsg = "Winner is - ENEMY!!!!!";
            }


            battleBox.innerHTML = "Round: " + round  + "<br><br>"  + "Enemies Left: " + enemy.length + "<br><br>" + 
            "Hero Hull " + hero.hull + "<br><br>" + "ENEMIES DESTROYED: " + shipsDestroyed +  "<br><br>" + "Enemy hull is at " + enemy[0].hull + "<br><br>" + " HERO ATTACKS ENEMY for " 
            + hero.firepower + " damage ENEMY SHIP now has " + enemy[0].hull + " HP" + "<br><br>" 
            + "ENEMY ATTACKS HERO for " + enemy[0].firepower + " damage HERO SHIP now " +  
            "has " + hero.hull + " HP" +  "<br><br>" + winMsg;


            // incriment round
            round++;

        }
    }

}

// calls combat function
// combat(heroShip, enemyFleet);

