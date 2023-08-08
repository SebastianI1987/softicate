export class Node {
  value: number;
  name: string;
  next?: Node;

  constructor(value: number, name: string) {
    this.value = value;
    this.name = name;
  }
}
