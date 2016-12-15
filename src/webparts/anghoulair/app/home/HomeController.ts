import * as angular from 'angular';



export interface IHomeControllerState {  
}

export class HomeController implements IHomeControllerState {
  public static $inject: string[] = ['$scope', '$state', "$rootScope"];

  constructor($scope, private $state, private $rootScope) {
    $scope.info = "AngGhoul Lair";         
  }

  public configure($event: MouseEvent): void {
    $event.preventDefault();

    this.$rootScope.$broadcast('startConfiguration');    
  }

  
}