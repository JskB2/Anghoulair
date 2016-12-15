import * as angular from 'angular';

angular
  .module('Ghoul')
  .config(uiRouterConfigurator);

uiRouterConfigurator.$inject = ['$stateProvider', '$urlRouterProvider'];

function uiRouterConfigurator($stateProvider, $urlRouterProvider): void {
  $stateProvider
    // .state('config', {
    //   template: require('./config/config.html'),
    //   params: {
    //     displayMode: undefined
    //   },
    //   controller: 'configController',
    //   controllerAs: 'vm'
    // })
    .state('home', {
      template: require('./home/home.html'),     
      controller: 'HomeController',
      controllerAs: 'vm'
    })
    .state('choose', {
      template: require('./choose/choose.html'),     
      controller: 'ChooseController',
      controllerAs: 'vm'
    })
    .state('start', {
      template: require('./start/start.html'),     
      controller: 'StartController',
      controllerAs: 'vm'
    })
    .state('encounter', {
      template: require('./encounter/encounter.html'),     
      controller: 'EncounterController',
      controllerAs: 'vm'
    })
    .state('fight', {
      template: require('./fight/fight.html'),     
      controller: 'FightController',
      controllerAs: 'vm'
    })
    .state('stats', {
      template: require('./stats/stats.html'),     
      controller: 'StatsController',
      controllerAs: 'vm'
    })
    .state('flee', {
      template: require('./flee/flee.html'),
      params: {
        success: undefined        
      },
      controller: 'FleeController',
      controllerAs: 'vm'
    })
   
}