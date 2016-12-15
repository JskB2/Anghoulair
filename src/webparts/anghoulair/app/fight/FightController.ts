import * as angular from 'angular';
import * as lodash from 'lodash'; 

import { IChooseService } from '../choose/choose.service';
import { ITaunt } from '../choose/choose.service';

export interface IFightControllerScope {
  Info: string;
  Progress: string;
}

export class FightController implements IFightControllerScope {
  public static $inject: string[] = ['$scope', '$state',
    "ChooseService", "$timeout"];

  public Character: any;
  public Enemy: any;
  public Info: string;
  public Progress: string = "Time to act! What do you wish to try?";
  public Working: boolean = false; 
  public ParryBonus: number = 0; 
  public Taunt: string = null; 
  public End: boolean = false;  
  public Win: boolean = undefined; 
  private stats: any = []; 

  constructor($scope, private $state,
    private chooseService: IChooseService, private $timeout) {
    this.Info = "Melee";

    this.activate();
  }



  private activate() {
    this.Character = this.chooseService.ChosenCharacter;
    this.Enemy = this.chooseService.ChosenEnemy;
    //console.log(this.Enemy);
  }


  public Attack() {
    //console.log(this.ParryBonus);
    var dice = Math.floor(Math.random() * 20) + 1;

    if (dice == 20) {
      this.Enemy.HP -= this.Character.Damage + 1;
      this.Progress = "A <b>critical hit</b>! You did <b>" + (this.Character.Damage + 1) + "</b> damage.";
      this.setTaunt(false); 
      this.stats.push(20); 
    }
    else if (dice + this.Character.Skill + this.ParryBonus >= this.Enemy.Armor) {
      let dmg = this.randomizr(this.Character.MinDamage, this.Character.Damage);
      this.Enemy.HP -= dmg;
      this.Progress = "You did <b>" + dmg + "</b> damage.";
      this.setTaunt(false); 
      this.stats.push(dmg); 
    }
    else if (dice == 1) {
      let dmg = this.randomizr(1, 2);
      this.Character.HP -= dmg;
      this.Progress = "You made a critical miss and hurt yourself for <b>" + dmg + "</b> damage!";
      this.stats.push(-1); 
    }
    else {
       this.Progress = "You missed!";
       this.setTaunt(true); 
       this.stats.push(0); 
    }

    this.Working = true; 
    // Reset Parry
    this.ParryBonus = 0; 

    this.$timeout(() => {
      if(this.Character.HP < 1) {
        this.Progress = "You die!";
        this.End = true; 
        this.Win = false;         
      }
      else if(this.Enemy.HP < 1) {
        this.Progress = "You win!"; 
        this.End = true; 
        this.Win = true;        
      }
      else {
      this.enemyAttack();      
      }
    }, this.randomizr(500, 1500));    
  }

  public Parry(){
    this.Working = true; 
    this.ParryBonus = this.randomizr(1, 2); 
    this.Progress = "Your prepare for defense and a more focused attack!";
    this.stats.push(-2);
    this.$timeout(() => {
       this.enemyAttack(); 
    }, this.randomizr(1000, 2000));
  }

  private enemyAttack() {
    //console.log(this.ParryBonus);
    this.Working = true; 
    this.Taunt = null;
    this.$timeout(() => {
       this.Progress = "Your enemy attacks!";
    }, this.randomizr(1000, 2000));   

    this.$timeout(() => {
      var dice = this.randomizr(1, 20);
      if (dice == 20) {
        this.Character.HP -= this.Enemy.Damage + 1;
        this.Progress = "He made a <b>critical hit</b>! You suffer <b>" + (this.Enemy.Damage + 1) + "</b> damage.";
        
      }
      else if (dice + this.Enemy.Skill >= this.Character.Armor + this.ParryBonus) {
        let dmg = this.randomizr(this.Enemy.MinDamage, this.Enemy.Damage);
        this.Character.HP -= dmg;
        this.Progress = "He did <b>" + dmg + "</b> damage.";
         
      }
      else if (dice == 1) {
        let dmg = this.randomizr(1, 2);
        this.Enemy.HP -= dmg;
        this.Progress = "He made a critical miss and hurt himself for <b>" + dmg + "</b> damage!";
        
      }
      else this.Progress = "He missed!";      

    }, this.randomizr(3000, 4000));

    this.$timeout(() => {
      if(this.Character.HP < 1) {
        this.Progress = "You die!";
        this.End = true; 
        this.Win = false;
      }
      else if(this.Enemy.HP < 1) {
        this.Progress = "You win!";
        this.End = true; 
        this.Win = true;
      }
      else {
      this.Progress = "Your turn!";
      this.Working = false; 
      }
    }, this.randomizr(5000, 6000));
  }

  private randomizr(min, max) {
    var score = Math.floor(Math.random() * (max - min + 1)) + min;
    return score; 
  }

  private setTaunt(miss) {     
    var charTaunts = lodash.filter(this.chooseService.Taunts, (o: ITaunt) => { return o.name == this.Character.Title && o.miss == false;});
    var missTaunt = lodash.find(this.chooseService.Taunts, (o: ITaunt) => { return o.name == this.Character.Title && o.miss == true}).taunt; 
    //console.log(charTaunts);  
    //console.log(missTaunt);      

    if(miss) {
      this.Taunt = missTaunt;
    }
    else if (this.randomizr(0, 100) <= 70){
      this.Taunt = charTaunts[this.randomizr(0, charTaunts.length - 1)].taunt; 
    }
    
  }

  public Quit() {
    this.$state.go("home");
  }

  public Stats(){
    console.log(this.stats);
    this.chooseService.Stats = this.stats; 
    this.$state.go("stats");
  }

  public Flee() {
    var flee = this.Character.Skill - this.Enemy.Skill + this.randomizr(1, 20); 
    console.log(flee); 
    if(flee >= 20) this.$state.go("flee", { success: true });
    else this.$state.go("flee", { success: false });
  }

}