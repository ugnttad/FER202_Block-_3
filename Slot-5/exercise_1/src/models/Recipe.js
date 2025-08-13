export default class Recipe {
  constructor({ title, description, servings, prep, cook, image }) {
    Object.assign(this, { title, description, servings, prep, cook, image });
  }
  get totalTime() { return this.prep + this.cook; }
}