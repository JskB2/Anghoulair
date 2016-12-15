import * as angular from 'angular';



export interface IAppControllerState {
}

export class AppController implements IAppControllerState {
  public static $inject: string[] = ['$state'];

  
  constructor(private $state) {
    $state.go("home");  
    console.log("AppController");      
  }

  
}