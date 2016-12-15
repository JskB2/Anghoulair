// Treba staviti, inace ne prepoznaje $ - to stavlja komandu __webpack_require__ u bundle file
import * as $ from 'jquery';


angular
    .module('Ghoul')
    .directive('hpGraph', hpGraph);

function hpGraph() {
    return {
        restrict: "C",
        scope: {
            load: "="
        },
        link: function (scope, element, attributes) {           
            var full = parseInt(scope.load);   
            var graph = $(element).children("#graph");        
            scope.$watch("load", function (oldValue, newValue) {
                if (newValue) {
                    
                    var newCss = scope.load / full * 100;
                    if(newCss < 65 && newCss >= 35) {
                        graph.css("backgroundColor", "#ea4300");
                    }
                    else if (newCss < 35)
                    graph.css("backgroundColor", "#e81123");
                    
                    $(element).children("#graph")
                        graph.css("width", newCss + "%");
                }

            })
        }
    }
}