import Recipe from "../models/Recipe";

const raw = [
  {
    "title": "Mediterranean Chickpea Salad",
    "description": "A refreshing, protein-packed salad tossed in a lemon-olive oil dressing.",
    "servings": 2,
    "prep": 10,
    "cook": 0,
    "image": "/images/1.jpg"
  },
  {
    "title": "Avocado & Tomato Wholegrain Toast",
    "description": "Creamy avocado spread over toasted wholegrain bread, topped with juicy tomatoes.",
    "servings": 1,
    "prep": 5,
    "cook": 5,
    "image": "/images/2.jpg"
  },
  {
    "title": "One-Pan Lemon Garlic Salmon",
    "description": "A 15-minute weeknight dinner of flaky salmon and tender asparagus.",
    "servings": 2,
    "prep": 5,
    "cook": 12,
    "image": "/images/3.jpg"
  },
  {
    "title": "Quinoa Veggie Power Bowl",
    "description": "A balanced bowl of fluffy quinoa, roasted veggies and healthy fats.",
    "servings": 2,
    "prep": 10,
    "cook": 15,
    "image": "/images/4.jpg"
  },
  {
    "title": "Sweet Potato Black Bean Tacos",
    "description": "Smoky roasted sweet potatoes and black beans tucked into warm tortillas.",
    "servings": 3,
    "prep": 10,
    "cook": 15,
    "image": "/images/5.webp"
  },
  {
    "title": "Greek Yogurt Berry Parfait",
    "description": "Layers of creamy yogurt, fresh berries and crunchy oats for a high-protein snack.",
    "servings": 1,
    "prep": 5,
    "cook": 0,
    "image": "/images/6.jpg"
  },
  {
    "title": "Lentil & Spinach Soup",
    "description": "A hearty 30-minute soup rich in plant protein and iron.",
    "servings": 4,
    "prep": 10,
    "cook": 20,
    "image": "/images/7.jpg"
  },
  {
    "title": "Banana Oat Pancakes",
    "description": "Flour-free pancakes sweetened naturally with ripe bananas.",
    "servings": 2,
    "prep": 5,
    "cook": 10,
    "image": "/images/8.jpg"
  }
];

export const recipes = raw.map((r) => new Recipe(r));