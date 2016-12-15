import * as angular from 'angular';

import { IChooseService } from '../choose/choose.service';


export interface IEncounterControllerScope {
   Enemy: any; 
   Info: string;  
}

export class EncounterController implements IEncounterControllerScope {
  public static $inject: string[] = ['$scope', '$state',
    "ChooseService"];

  
  private listName: string = "Enemies"; 
  private enemies: any;  
  public Enemy: any; 
  public Character: any; 
  public Info: string; 
  

  constructor($scope, private $state,
    private chooseService: IChooseService) {
    this.Info = "Lurking in the shadows";
    this.activate();
  }

  private activate() {
    this.chooseService.GetEnemyList(this.listName)
      // treba staviti to () => {} jer inace ovo this nije vise kontroler
      .then((data): void => {
        //console.log(data);
        this.enemies = data.data.value;
        // Difficulty odredjuje Enemyja
        if(this.chooseService.Difficulty) this.Enemy = this.enemies[1];
        else this.Enemy = this.enemies[0]; 
        this.chooseService.ChosenEnemy = this.Enemy; 
        this.Character = this.chooseService.ChosenCharacter; 
      });

  }

  public Flee() {
    var flee = this.Character.Skill - this.Enemy.Skill + this.randomizr(1, 20); 
    console.log(flee); 
    if(flee >= 20) this.$state.go("flee", { success: true });
    else this.$state.go("flee", { success: false });
  }

  private randomizr(min, max) {
    var score = Math.floor(Math.random() * (max - min + 1)) + min;
    return score; 
  }

}