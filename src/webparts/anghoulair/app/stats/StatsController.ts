import * as angular from 'angular';
import * as lodash from 'lodash';

import { IChooseService } from '../choose/choose.service';


export interface IStatsControllerScope {
  Info: string;
  DoughnutData: any;
  DoughnutLabels: any;
}

export class StatsController implements IStatsControllerScope {
  public static $inject: string[] = ['$scope', '$state',
    "ChooseService"];


  public Info: string;
  public DoughnutData: any;
  public DoughnutLabels: any;
  public HitsData = [];
  public HitsLabels = [];
  
  // Ovo ne radi bas - ako nema dovoljno boja koliko i podataka, odma nastavlja sa random. Na line uopce ne radi, skroz cudno. Dal je series prisutno ili ne, izgleda da nema razlike
  // public HitsSeries = ["SeriesA"]; 
  public HitsColors =  []; 
  // ["rgb(159,204,0)"];
 

  constructor($scope, private $state,
    private chooseService: IChooseService) {
    this.Info = "Stats";

    this.activate();
  }



  private activate() {
    let data = this.chooseService.Stats; 
    var hit = 0, miss = 0, crHit = 0, crMiss = 0, parry = 0;

    lodash.forEach(data, (value: any) => {  

      if(value == 20) {
        ++crHit;
        this.HitsData.push(value); 
      }
      else if (value > 0) {
        ++hit;
        this.HitsData.push(value); 
      }
      else if (value == 0) {
        ++miss;
      }
      else if (value == -1) {
        ++crMiss;
      }

      else ++parry
    }); 

    for(var i = 0; i < this.HitsData.length; i++) {
      this.HitsLabels.push("Hit " + (i + 1));
      // Jedino ovako ce svi biti jenobojni, ako ih ima isto
      this.HitsColors.push("#4BC0C0");
    }

    let doughtnut = []; 
    this.DoughnutLabels = ["Hits", "Critical Hits", "Misses", "Critical Misses", "Parries"]; 
    this.DoughnutData = [hit, crHit, miss, crMiss, parry]; 
    console.log(this.DoughnutData); 

    // Test
    // this.HitsLabels = ["January", "February", "March", "April", "May", "June", "July"];
    // this.HitsData = [65, 59, 80, 81, 56, 55, 40];    

  }
}