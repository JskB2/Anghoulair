import {
  BaseClientSideWebPart,
  IPropertyPaneSettings,
  IWebPartContext,
  PropertyPaneTextField,
  PropertyPaneDropdown,
  PropertyPaneToggle
} from '@microsoft/sp-webpart-base';

import styles from './Anghoulair.module.scss';
import * as strings from 'anghoulairStrings';
import { IAnghoulairWebPartProps } from './IAnghoulairWebPartProps';
import './app/app.module';
import { IChooseService } from './app/choose/choose.service';
import ModuleLoader from '@microsoft/sp-module-loader';

export default class AnghoulairWebPart extends BaseClientSideWebPart<IAnghoulairWebPartProps> {

  private $injector: ng.auto.IInjectorService;

  public constructor(context: IWebPartContext) {
    super(context);

    /* Fabric Components za ms-ListItem, primary-Buttoni su plave boje sa ovim (ne zelene) itd... */
    ModuleLoader.loadCss("https://appsforoffice.microsoft.com/fabric/1.0/fabric.components.min.css");

    // Ovo radi, ali mora biti u lib folderu, vjerojatno ima neki nacin da ga se automatski
    // kopira iz src u lib, treba vidit
    //require('./testCss.css');
  }

  public render(): void {
    // Treba biti ovo u renderecOnce, inace kod promjene propertyja belaj
    if (this.renderedOnce === false) {
      this.domElement.innerHTML = `
      <div class="${styles.anghoulair}" ng-controller="AppController as vm">
        <div class="${styles.container}">          
          <div ui-view></div>
        </div>
      </div>`;

      this.$injector = angular.bootstrap(this.domElement, ['Ghoul']);
    }

    const $rootScope: angular.IRootScopeService = this.$injector.get('$rootScope');
    // Oni dijele uglavnom preko broadcast, ovdi preko chooseService.Difficulty
    // $rootScope.$broadcast('configurationChanged', {
    //   difficulty: this.properties.difficulty
    // });

    console.log(this.properties.difficulty);

    $rootScope.$on('startConfiguration', (event: angular.IAngularEvent): void => {
      // Od Drop 6 vise nije configureStart nego openPropertyPane
      this.openPropertyPane();
    });


    var ChooseService: IChooseService = this.$injector.get<IChooseService>('ChooseService');
    ChooseService.SharePointApiUrl = this.context.pageContext.web.absoluteUrl + '/_api';
    ChooseService.Difficulty = this.properties.difficulty;
    //console.log(ChooseService.SharePointApiUrl); 

  }

  protected get propertyPaneSettings(): IPropertyPaneSettings {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                // PropertyPaneTextField('description', {
                //   label: strings.DescriptionFieldLabel
                // }),

                // Zajebavaju na SP-u DropDownovi (ne zele se otvoriti i pokazati options), na localhost ne - rade normalno
                // PropertyPaneDropdown('difficulty', {
                //   label: strings.DifficultyFieldLabel,
                //   options: [{ key: "easy", text: "Easy", isSelected: true }, { key: "hard", text: "Hard", isSelected: false }],
                //   selectedKey: "easy"
                // }),
                PropertyPaneToggle('difficulty', {
                  label: strings.DifficultyFieldLabel,
                  onText: 'Hard',
                  offText: 'Easy'
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
