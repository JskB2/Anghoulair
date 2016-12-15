angular
    .module('Ghoul')
    .directive('dialogOffice', dialogOffice);

function dialogOffice() {
    return {
        restrict: "E",
        template: require('./dialog.html'),
        scope: {
            win: "=",
            show: "=",
            callStats: "&",
            callQuit: "&"
        },
        link: function (scope, element, attributes) { 
            scope.$watch("win", function(newVal, oldVal) {
                if(newVal && scope.win) {
                    scope.title = "Victory!";
                    scope.text = "<p>You rush over the carcass of your enemy and manage to reach the exit, relieved to gaze at the sun again.</p>"
                    + "<p>Where are you? This area is completely unknown...</p>"
                    + "<br><p>Thank you for playing this game! To see what happens next, wait for the sequel...<p>"
                    + "<p>Would you like to see your <b>stats</b>?</p>";
                }
                else {
                    scope.title = "You fall to the ground";
                    scope.text = "<p>Your lifeless body laying in front of your enemy. What was that place? Who took you there to die? You will never know...</p>"
                    + "<br><p>Thank you for playing this game, better luck next time!<p>";                    
                }
            });    
        }
    }
}