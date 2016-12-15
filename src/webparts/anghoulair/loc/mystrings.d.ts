declare interface IAnghoulairStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  DescriptionFieldLabel: string;
  DifficultyFieldLabel: string; 
}

declare module 'anghoulairStrings' {
  const strings: IAnghoulairStrings;
  export = strings;
}
