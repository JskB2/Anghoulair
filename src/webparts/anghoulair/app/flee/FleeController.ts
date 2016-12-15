import * as angular from 'angular';

import { IChooseService } from '../choose/choose.service';


export interface IFleeControllerScope {
  Info: string;
}

export class FleeController implements IFleeControllerScope {
  public static $inject: string[] = ['$scope', '$state',
    "ChooseService", "$stateParams"];

  public Info: string;
  public Run: boolean;
  public Text: string;

  constructor($scope, private $state,
    private chooseService: IChooseService, private $stateParams) {
    this.Run = this.$stateParams.success;
    this.activate();
  }

  private activate() {
    console.log(this.$stateParams.success);
    if (this.Run) {
      this.Info = "You escape";
      this.Text = "<p>You manage to push aside the <b>" + this.chooseService.ChosenEnemy.Title + "</b> and run through the corridor, eventually reaching a staircase leading outside. You rush the staircase and feel relieved to gaze at the sun again.</p>"
        + "<p>But where are you? This area is completely unknown...</p>"
        + "<br><p>Thank you for playing this game! To see what happens next, wait for the sequel...<p>"

    }
    else
    { this.Info = "You don't make it";
      this.Text = "<p>Your enemy manages to cut your path and pushes you sideways. You hit the side of the wall and start to lose consciousness, gasping for air as the <b>" + this.chooseService.ChosenEnemy.Title 
      + "</b> firmly grips your neck, crushing your windpipe.<br/> What was that place? Who took you there to die? You will never know...</p>"
                    + "<br/><p>Thank you for playing this game, better luck next time!<p>"; }

  }

}