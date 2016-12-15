import * as angular from 'angular';

import { IChooseService } from '../choose/choose.service';


export interface IStartControllerScope {
   Character: any; 
   Info: string;  
}

export class StartController implements IStartControllerScope {
  public static $inject: string[] = ['$scope', '$state',
    "ChooseService"];

  
  private listName: string = "Characters";  
  public Character: any; 
  public Info: string; 
  

  constructor($scope, private $state,
    private chooseService: IChooseService) {
    this.Info = "You suddenly awaken...";
    this.activate();
  }

  private activate() {
    this.Character = this.chooseService.ChosenCharacter; 

  }

}