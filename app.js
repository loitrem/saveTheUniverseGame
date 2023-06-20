// save the universe

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

    let enemy = {
        hull: enemyHull,
        firepower: enemyFirepower,
        accuracy: enemyAccuracy,
        image:""
    };

    return enemy;
}

// enemy array
let enemyArrayLength = 6;
let enemyFleet = [];

for (let i = 0; i< enemyArrayLength; i++){
    enemyFleet.push(enemyStats());
}

// hero attack
const heroAttack = (hero, enemy) => {
    enemy.hull -= hero.firepower;
    return enemy;
}

// enemy attack
const enemyAttack = (hero, enemy) => {
    hero.hull -= enemy.firepower;
    return hero;
}

// retreat
const retreat = () => {
    return true;
}

// combat turns
const combat = (hero, enemy) => {


    let round = 1;
    let currentEnemy = 0;

    while (hero.hull>0 && enemy.length>0){

        console.log(enemy);
        console.log("=============================================================================");
        console.log(enemy.length + " enemies left");
        console.log("=============================================================================");
        console.log("hero ship hull: " + hero.hull);
        console.log("=============================================================================");
        console.log("enemy ship hull: " + enemy[currentEnemy].hull);

        heroAttack(hero, enemy[currentEnemy]);

        console.log("Round", round);
        console.log("=============================================================================");
        console.log("HERO TURN");
        console.log("Hero Attacks enemy for " + hero.firepower + " damage");
        console.log("enemy ship now has " + enemy[currentEnemy].hull + " HP");

        if (enemy[currentEnemy].hull<=0){
            currentEnemy++;
            enemy.shift();
        }

        console.log("=============================================================================");
        console.log(enemy.length + " enemies left");
        console.log("=============================================================================");


        enemyAttack(hero, enemy[currentEnemy]);

        console.log("ENEMY TURN");
        console.log("enemy Attacks hero for " + enemy[currentEnemy].firepower + " damage");
        console.log("hero ship now has " + hero.hull + " HP");
        console.log("=============================================================================");

        if (hero.hull<=0){
            console.log("Hero Loses!!!!!");
        }

        if (enemy[currentEnemy].length===0){
            console.log("Hero Wins!!!");
        }

        setTimeout(() => {
        }, "2000");

        round++;

    }


}

combat(heroShip, enemyFleet);

