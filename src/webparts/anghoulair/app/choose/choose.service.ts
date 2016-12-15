import * as angular from "angular";


export interface IChooseService {
    GetCharacterList: (listName: string) => any;
    GetEnemyList: (listName: string) => any;
    SharePointApiUrl: string; 
    ChosenCharacter: any; 
    ChosenEnemy: any;
    Taunts: any; 
    Stats: any; 
    Difficulty: boolean; 
}

export interface ITaunt {
    name: string;
    miss: boolean;
    taunt: string; 
}

export class ChooseService implements IChooseService {
    public static $inject: string[] = ['$http'];

    constructor(private $http) {
    }

    public SharePointApiUrl: string = null;
    public ChosenCharacter: any = null; 
    public ChosenEnemy: any = null; 
    public Taunts = 
    [{name: "Conan", miss: true, taunt: "Crom!"}, {name: "Conan", miss: false, taunt: "Scum!"}, {name: "Conan", miss: false, taunt: "You bastard!"}, {name: "Conan", miss: false, taunt: "Die, fiend!"},
    {name: "Minsc", miss: true, taunt: "Nein!"}, {name: "Minsc", miss: false, taunt: "Go for the eyes, Boo!"}, {name: "Minsc", miss: false, taunt: "Swords, not words!"}, {name: "Minsc", miss: false, taunt: "Hadouken!"},
    {name: "Tigerlilly", miss: true, taunt: "Dammit!"}, {name: "Tigerlilly", miss: false, taunt: "Haha!"}, {name: "Tigerlilly", miss: false, taunt: "Gotcha good!"}] ;  
    public Stats: any = null; 
    public Difficulty: boolean = false; 

    public GetCharacterList(listName: string) {
        var config = {
            headers: { "Accept": "application/json;odata=nometadata" }
        };

        var getString = this.SharePointApiUrl + "/web/lists/getByTitle('" + listName 
        + "')/items?$select=Id,Title,Class,Race,Picture,Weapon,Damage,Skill,Armor,HP,MinDamage";
        //console.log(getString);
        return this.$http.get(getString, config)
            .then(this.returnData, this.handleErrors);        
    }

    public GetEnemyList(listName: string) {
        var config = {
            headers: { "Accept": "application/json;odata=nometadata" }
        };

        var getString = this.SharePointApiUrl + "/web/lists/getByTitle('" + listName 
        + "')/items?$select=Id,Title,Picture,Weapon,Damage,Skill,Armor,HP,MinDamage";
        //console.log(getString);
        return this.$http.get(getString, config)
            .then(this.returnData, this.handleErrors);        
    }


    private returnData(data) {
        return data;
    }

    private handleErrors(error) {
        console.log("Error on $http.get()");
        console.log(error);
    }
}