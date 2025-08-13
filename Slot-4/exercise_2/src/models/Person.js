export default class Person {
  constructor({ id, firstName, lastName, age, city, skills, isActive }) {
    Object.assign(this, { id, firstName, lastName, age, city, skills, isActive });
  }
  get fullName() { return `${this.firstName} ${this.lastName}`; }
}