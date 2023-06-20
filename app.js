// save the universe

let gameOver = false;

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

//animate each ship
const animate = () => {
    let enemyShipDiv = document.querySelector('.enemyShipImg');
    enemyShipDiv.setAttribute('src', 'enemy4.png');
    enemyShipDiv.setAttribute('class', 'enemyShipImg enemyShip');


}

// combat turns
const combat = (hero, enemy) => {

    // iniate round
    let round = 1;

    console.log("");
    console.log(enemy.length + " enemies left");

    // while loop to go through rounds
    while (hero.hull>0 && enemy.length>0 && gameOver===false){

        // set current enemy to new hull value after hero attacks
        enemy[0] = heroAttack(hero, enemy[0]);

        console.log("");
        console.log("Round", round);
        console.log("=============================================================================");
        console.log("HERO TURN");
        console.log("Hero Attacks enemy for " + hero.firepower + " damage");
        console.log("enemy ship now has " + enemy[0].hull + " HP");
        console.log("");

        // if current enemy hull is zero remove it from array
        if (enemy[0].hull===0){
            enemy.shift();
            animate();
        }

        // if all enemies are destroyed hero wins
        if (enemy.length===0){
            console.log("Hero Wins!!!");
            gameOver = true;
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
        }

        // if hero hull is zero hero loses
        if (hero.hull<=0){
            console.log("Hero Loses!!!!!");
            gameOver = true;
        }

        // setTimeout(() => {
        // }, "2000");

        // incriment round
        round++;

    }


}

// calls combat function
// combat(heroShip, enemyFleet);

