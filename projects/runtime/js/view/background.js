console.log('BACKROUND.JS FILE')


var background = function (window) {
    'use strict';
    
    window.opspark = window.opspark || {};
    var draw = window.opspark.draw;
    var createjs = window.createjs;
    console.log('BACKGROUND FUNCTION')
    
    /*
     * Create a background view for our game application
     */
    window.opspark.makeBackground = function(app,ground) {
        console.log('MAKEBACKGROUND FUNCTION')
        if(!app) {
            throw new Error("Invaid app argument");
        }
        if(!ground || typeof(ground.y) == 'undefined') {
            throw new Error("Invalid ground argument");
        }

        // container which will be returned
        var background;
        var tree;
        var buildings = [];
        // Add any variables that will be used by render AND update here:
        
        // add objects for display inb ackground
        // called at the start of game and whenever the page is resized
        function render() {
            console.log('RENDER FUNCTION')
            // useful variables
            var canvasWidth = app.canvas.width;
            var canvasHeight = app.canvas.height;
            var groundY = ground.y;

            background.removeAllChildren();

            // this fills the background with a obnoxious yellow
            // you should modify this to suit your game
            var backgroundFill = draw.rect(canvasWidth,canvasHeight, '#00fff2');
            background.addChild(backgroundFill);
            
            
            // TODO: 3 - Add a moon and starfield
            var circle;
            for(var i = 0; i < 100; i++) {
            circle = draw.circle(10,'white','LightGray',2);
            circle.x = canvasWidth*Math.random();
            circle.y = groundY*Math.random();
            background.addChild(circle);
            }   
            
            var moon = draw.bitmap('img/moon.png');
            moon.x = 300;
            moon.y = 25;
            moon.scaleX = 1.0;
            moon.scaleY = 1.0;
            background.addChild(moon);
            
            // // TODO: 5 - Add buildings!     Q: This is before TODO 4 for a reason! Why?
            
            var building;
            for(var i=0;i<5;++i) {
            var buildingHeight = Math.floor(Math.random() * 300);
            building = draw.bitmap(75,buildingHeight,'Red','Black',1);
            building.x = 200*i;
            building.y = groundY-buildingHeight;
            background.addChild(building);
            buildings.push(building);
            }
            
            // TODO 4: Part 1 - Add a tree
            tree = draw.bitmap('img/spacyboi.jpg');
            tree.x =canvasWidth;
            tree.y = groundY - 200;
            background.addChild(tree);
        }
        
        // Perform background animation
        // called on each timer "tick" - 60 times per second
        function update() {
            // useful variables
            var canvasWidth = app.canvas.width;
            var canvasHeight = app.canvas.height;
            var groundY = ground.y;
        
            
            // TODO 4: Part 2 - Move the tree!
            tree.x = tree.x - 50;
            if(tree.x < 0) {
            tree.x = canvasWidth;
            }
            
            // TODO 5: Part 2 - Parallax
           for( var i = 0; i < buildings.length; i++){
               var movement = buildings[i];
            movement.x = movement.x - 10;
            if(movement.x < 0) {
            movement.x = canvasWidth;
            }
           }
        }

        background = new createjs.Container();
        background.resize = render;
        background.update = update;
        
        app.addResizeable(background);
        app.addUpdateable(background);
        
        render();
        return background;
    };
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if((typeof process !== 'undefined') &&
    (typeof process.versions.node !== 'undefined')) {
    // here, export any references you need for tests //
    module.exports = background;
}
