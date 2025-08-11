export default class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  
  introduce() {
    return `Hi, I'm ${this.name} and I'm ${this.age} years old.`;
  }
  
  getDetails() {
    return {
      name: this.name,
      age: this.age
    };
  }
  
  // Static method example
  static createFromString(str) {
    const [name, age] = str.split(',');
    return new Person(name.trim(), parseInt(age.trim()));
  }
  
  // Getter example
  get info() {
    return `${this.name} (${this.age})`;
  }
  
  // Setter example
  set age(newAge) {
    if (newAge < 0) {
      throw new Error('Age cannot be negative');
    }
    this._age = newAge;
  }
  
  get age() {
    return this._age;
  }
}