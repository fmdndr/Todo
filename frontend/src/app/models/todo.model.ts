export class Todo {
  constructor(
    public id: number,
    public createdDate: Date,
    public description: string,
    public isDone: boolean,
    public updatedDate: Date
  ) {}
}
