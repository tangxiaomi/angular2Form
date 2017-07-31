export class Hero {
  constructor(
    public id: number,
    public name: string,
    public power: string,
    public alterEgo?: string
  ) {  }
}
export class ConfigurationForm {
  authenticationUrl: string = "";
}