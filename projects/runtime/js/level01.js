console.log("Obstacle FUNCTION");

var level01 = function (window) {

    window.opspark = window.opspark || {};

    var draw = window.opspark.draw;
    var createjs = window.createjs;

    window.opspark.runLevelInGame = function(game) {
        // some useful constants 
        var groundY = game.groundY;
        
        var createSawBlade = function(x,y){
        var myObstacle = game.createObstacle(hitZoneSize,damageFromObstacle);
        myObstacle.x = x;
        myObstacle.y = y;
        game.addGameItem(myObstacle);  
        var obstacleImage = draw.bitmap('img/kamen.png');
        obstacleImage.x = -25;
        obstacleImage.y = -25;
        myObstacle.addChild(obstacleImage);
        };
        
        function createPowerCube(x, y){
            var myCube = game.createObstacle(25, 25);
            myCube.x = x;
            myCube.y = y;
            game.addGameItem(myCube);
            var cubeImage = draw.bitmap('img/powercube.jpg');
            cubeImage.x = -25;
            cubeImage.y = -25;
            myCube.addChild(cubeImage);
        }
        
        function createEnemy(x, y){
        var enemy = game.createGameItem('enemy', 25);
        var redSquare = draw.rect(50,50,'pink');
        redSquare.x = -25;
        redSquare.y = -25;
        enemy.addChild(redSquare);
        enemy.x = x;
        enemy.y = y;
        game.addGameItem(enemy);
        
        enemy.velocityX = -1;
        enemy.rotationalVelocity = 10
        enemy.onPlayerCollision = function(){
            game.changeIntegrity(-30);
            enemy.fadeOut()
        }
        enemy.onProjectileCollision = function(){
            game.increaseScore(100)
            enemy.shrink()
        }
      }
      
         function createReward(x, y){
            var myReward = game.createObstacle(25, 25);
            myReward.x = x;
            myReward.y = y;
            game.addGameItem(myReward);
            var rewardImage = draw.bitmap('img/cooldude.jpg');
            rewardImage.x = -5;
            rewardImage.y = -5;
            myReward.addChild(rewardImage);
            myReward.onPlayerCollision = function(){
                game.changeIntegrity(50);
                game.increaseScore(1000);
                myReward.fadeOut();
                myReward.flyTo(254, groundY - 254);
            }
        }
       
        // this data will allow us to define all of the
        // behavior of our game
        var levelData = {
            name: "Robot Romp",
            number: 1, 
            speed: -3,
            gameItems: [
                {type: 'sawblade',x:1600,y:500},
                {type: 'sawblade',x:600,y:550},
                {type: 'sawblade',x:900,y:525},
                {type: 'sawblade',x:1100,y:450},
                {type: 'sawblade',x:1300, y:360},
                {type: 'powerCube',x:1500,y:350},
                {type: 'enemy',x:600,y:groundY - 50},
                {type: 'reward',x:1900,y:groundY - 100}
                ]
        };
        window.levelData = levelData;
        // set this to true or false depending on if you want to see hitzones
        game.setDebugMode(false);

        // BEGIN EDITING YOUR CODE HERE
        var hitZoneSize = 25;
        var damageFromObstacle = 10;
    
         for(var i = 0; i < levelData.gameItems.length - 3; i++){
            createSawBlade(levelData.gameItems[i].x, levelData.gameItems[i].y);
        }
        
         for(var p = 5; p < levelData.gameItems.length - 2; p++){
             createPowerCube(levelData.gameItems[p].x, levelData.gameItems[p].y);
         }
         
         for(var e = 6; e < levelData.gameItems.length - 1; e++){
             createEnemy(levelData.gameItems[e].x, levelData.gameItems[e].y);
         }
         
         for(var r = 7; r < levelData.gameItems.length; r++){
             createReward(levelData.gameItems[r].x, levelData.gameItems[r].y);
         }
       
    };
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if((typeof process !== 'undefined') &&
    (typeof process.versions.node !== 'undefined')) {
    // here, export any references you need for tests //
    module.exports = level01;
}
