import * as angular from 'angular';

import { IChooseService } from './choose.service';


export interface IChooseControllerScope {
  Characters: {};
  Info: string;
}

export class ChooseController implements IChooseControllerScope {
  public static $inject: string[] = ['$scope', '$state',
    "ChooseService"];

  private sharePointApiUrl: string;
  private listName: string = "Characters";
  public Characters: {};
  public Character: any; 
  public Info: string;
  public ShowDetails: boolean = false; 
  

  constructor($scope, private $state,
    private chooseService: IChooseService) {
    this.Info = "Choose Your Character";
     
    this.sharePointApiUrl = chooseService.SharePointApiUrl;
    this.activate();
  }



  private activate() {
    this.chooseService.GetCharacterList(this.listName)
      // treba staviti to () => {} jer inace ovo this nije vise kontroler
      .then((data): void => {
        //console.log(data);
        this.Characters = data.data.value;
      });

      console.log("Difficulty: " + this.chooseService.Difficulty); 

  }

  public GetDetails(char) {    
    this.Character = char; 
    this.ShowDetails = true; 
  }

  public Start() {
    console.log(this);
    this.chooseService.ChosenCharacter = this.Character; 
    this.$state.go("start");    
  }


}