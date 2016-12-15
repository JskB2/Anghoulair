import * as angular from "angular";


/*** IZBACENO, vidi dole notes ***/

export interface IBlockerService {
    RemoveBlocker: () => any;
    ShowBlocker: () => any;
}



export class BlockerService implements IBlockerService {
    public static $inject: string[] = ['BlockerConst', "$timeout"];

    private blocker: any; 

    constructor(private BlockerConst: any, private $timeout) {
        console.log("Blocker");
        // console.log(BlockerConst); 
        this.blocker = BlockerConst.Element; 
        //console.log(BlockerConst); 
         
    }

/* Notes: ne radi preko konstante, jednostavno ne pridodaje klasu tome */
/* Ovome pridodaje klasu, ali se animacije ne vide. Isto tako animacije preko keyframeova za male elemente ne rade*/
/* Blocker prvo postavljen u innerHTML, u startu, onda u choose.html - ne radi, ovo treba vidit */


    public RemoveBlocker() {
        
        if (this.blocker != 0) {
            console.log(this.blocker); 
            console.log("Blocker fade blkr");  
            let blkr = angular.element(document.querySelectorAll(".blocker")[0])
            console.log(blkr);
            blkr.addClass("fade");
            this.$timeout(() => {
                blkr.addClass("gone");
                 console.log("Blocker: adding gone"); 
            }, 1000);

        }
        //else console.log("Blocker not found - remove"); 
    }

    public ShowBlocker() {
        
        if (this.blocker != 0) {
            console.log("Blocker on");
            // Ako je vec aktivan
            // if (!this.blocker.hasClass("gone")) {
            //     console.log("Exists"); 
            //     console.log(this.blocker); 
                 
            // }
            let blkr = angular.element(document.querySelectorAll(".blocker")[0])
            if (blkr.hasClass("gone")) {
                console.log("Removing gone");
                blkr.removeClass("gone"); }

            if (blkr.hasClass("fade")) {
                console.log("Removing fade");
                blkr.removeClass("fade");  
            }
        }

        //else console.log("Blocker not found - show");
    }

    
}