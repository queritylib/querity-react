export enum Direction {
  ASC = "ASC",
  DESC = "DESC",
}

export class Sort {
  constructor(public propertyName: string, public direction: Direction) {
    this.propertyName = propertyName;
    this.direction = direction;
  }
}
