import * as angular from 'angular';


// export class DetailsDirective implements angular.IDirective {



//     public restrict: string = 'E';
//     public replace: boolean = true;
//     //public templateUrl: string = "./details.html";  
//     public scope: any = {
//         'show': '=',
//         character: "="
//     };

//     constructor() {
//     }

//     public static factory(): angular.IDirectiveFactory {
//         const directive: angular.IDirectiveFactory = () => new DetailsDirective();
//         return directive;
//     }

//     public link(scope, elements, attributes) {
//         console.log("Dir active");
//     }
// }


// export class DetailsDirective  
// {
//     public link: (scope: ng.IScope, element: ng.IAugmentedJQuery, attrs: ng.IAttributes) => void;    
//     public scope = {};

//     constructor(/*list of dependencies*/)
//     {
//         // It's important to add `link` to the prototype or you will end up with state issues.
//         // See http://blog.aaronholmes.net/writing-angularjs-directives-as-typescript-classes/#comment-2111298002 for more information.
//         DetailsDirective.prototype.link = (scope: ng.IScope, element: ng.IAugmentedJQuery, attrs: ng.IAttributes) =>
//         {
//             /*handle all your linking requirements here*/
//         };
//     }

//     public static factory()
//     {
//         var directive = (/*list of dependencies*/) =>
//         {
//             return new DetailsDirective(/*list of dependencies*/);
//         };

//         //directive['$inject'] = ['/*list of dependencies*/'];

//         return directive;
//     }
// }

// console.log("Dir start Test"); 

/* Mora ovako, nista od onog gore ne radi, problem sa Angular injectom, u 3 PM */

angular
    .module('Ghoul')
    .directive('detailsDirective', detailsDirective);

function detailsDirective() {


    return {
        restrict: "C",
        // Treba preko ovog require
        template: require('./details.html'),
        scope: {
            character: "=",
            show: "=",
            callStart: "&"
        },
        link: function (scope, element, attributes) {
            
            scope.closeDir = function () {
                scope.show = false;
            }

        }
    }
}