import * as angular from 'angular';

import 'angular-ui-router';
import 'angular-sanitize';  
import 'angular-chart.js';
import { AppController } from './AppController';
import { HomeController } from './home/HomeController';
import { ChooseController } from './choose/ChooseController';
import { StartController } from './start/StartController';
import { EncounterController } from './encounter/EncounterController';
import { FightController } from './fight/FightController';
import { StatsController } from './stats/StatsController';
import { FleeController } from './flee/FleeController';
import { ChooseService } from './choose/choose.service';
import { BlockerService } from './blocker.service';
//import { DetailsDirective } from './directives/details.directive';

angular
  .module('Ghoul', [
    'ui.router',
    'ngSanitize',
    'chart.js'
  ])
  .controller('AppController', AppController)
  .controller('HomeController', HomeController)
  .controller('ChooseController', ChooseController)
  .controller('StartController', StartController)
  .controller('EncounterController', EncounterController)
  .controller('FightController', FightController)
  .controller('StatsController', StatsController)
  .controller('FleeController', FleeController)
  .service('ChooseService', ChooseService)
  .service('BlockerService', BlockerService)
  
//.directive('DetailsDirective', DetailsDirective.factory())


require('./directives/details.directive');
require('./directives/hp.directive');
require('./directives/dialog.directive');
require('./app.states');


// angular
//     .module('Ghoul').
//     run(function($transitions) {
//       console.log("Transitions: "); 
//       console.log($transitions); 
//   $transitions.onStart({ }, function(trans) {
//     //var SpinnerService = trans.injector().get('SpinnerService');
//     //SpinnerService.transitionStart();
//     //trans.promise.finally(SpinnerService.transitionEnd);
//     console.log("Tranistion start"); 
//     trans.promise.finally(function() {
//       console.log("Tranistion end"); 
//     });
//   });
// })


/* Opacity transitioni se ne prikazuju, i ne hvata element normalno. Izgleda da Sass na keyframes nadodaje isto neku sifru na kraj, pa zato ne rade te animacije */
// angular
//     .module('Ghoul').constant("BlockerConst", {
//     Element: angular.element(document.querySelectorAll(".blocker")[0])
// }); 

// angular
//     .module('Ghoul').run(function($rootScope, BlockerService) {
//   $rootScope.$on('$stateChangeStart', function() {
//     console.log("State change start"); 
//     BlockerService.ShowBlocker();  
//   });
//   $rootScope.$on('$stateChangeSuccess', function() {
//     console.log("State change success"); 
//     BlockerService.RemoveBlocker(); 
//   });
//   $rootScope.$on('$stateChangeError', function() {
//     BlockerService.RemoveBlocker();
//   });
// })
