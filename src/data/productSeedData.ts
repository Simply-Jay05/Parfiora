export type SeedProduct = {
  id: string;
  name: string;
  category: string;
  price: number;
  description: string;
  featured: boolean;
  mainImage: number;
  galleryImages: number[];
};

export const productSeedData: SeedProduct[] = [
  {
    id: "almond",
    name: "Almond",
    category: "Classic",
    price: 3500,
    description: "",
    featured: true,
    mainImage: require("../../assets/images/products/almond(1).png"),
    galleryImages: [require("../../assets/images/products/almond(2).png")],
  },

  {
    id: "biscoff",
    name: "Biscoff",
    category: "Chocolate",
    price: 4000,
    description: "",
    featured: true,
    mainImage: require("../../assets/images/products/biscoff(1).png"),
    galleryImages: [require("../../assets/images/products/biscoff(2).png")],
  },

  {
    id: "blueberry",
    name: "Blueberry",
    category: "Fruit",
    price: 3500,
    description: "",
    featured: true,
    mainImage: require("../../assets/images/products/blueberry(1).png"),
    galleryImages: [
      require("../../assets/images/products/blueberry(2).png"),
      require("../../assets/images/products/blueberry(3).png"),
    ],
  },

  {
    id: "chocolate",
    name: "Chocolate",
    category: "Chocolate",
    price: 4000,
    description: "",
    featured: true,
    mainImage: require("../../assets/images/products/chocolate.png"),
    galleryImages: [require("../../assets/images/products/chocolate(2).png")],
  },

  {
    id: "classic",
    name: "Classic",
    category: "Classic",
    price: 3000,
    description: "",
    featured: false,
    mainImage: require("../../assets/images/products/classic(1).png"),
    galleryImages: [],
  },

  {
    id: "coconut",
    name: "Coconut",
    category: "Tropical",
    price: 3500,
    description: "",
    featured: false,
    mainImage: require("../../assets/images/products/coconut(1).png"),
    galleryImages: [],
  },

  {
    id: "coffee",
    name: "Coffee",
    category: "Classic",
    price: 3500,
    description: "",
    featured: false,
    mainImage: require("../../assets/images/products/coffee(1).png"),
    galleryImages: [require("../../assets/images/products/coffee(2).png")],
  },

  {
    id: "honey",
    name: "Honey",
    category: "Classic",
    price: 3500,
    description: "",
    featured: false,
    mainImage: require("../../assets/images/products/honey(1).png"),
    galleryImages: [require("../../assets/images/products/honey(2).png")],
  },

  {
    id: "kiwi",
    name: "Kiwi",
    category: "Fruit",
    price: 3500,
    description: "",
    featured: false,
    mainImage: require("../../assets/images/products/kiwi(1).png"),
    galleryImages: [require("../../assets/images/products/kiwi(2).png")],
  },

  {
    id: "mango",
    name: "Mango",
    category: "Tropical",
    price: 3500,
    description: "",
    featured: true,
    mainImage: require("../../assets/images/products/mango(1).png"),
    galleryImages: [require("../../assets/images/products/mango(2).png")],
  },

  {
    id: "mixed-berry",
    name: "Mixed Berry",
    category: "Fruit",
    price: 4000,
    description: "",
    featured: true,
    mainImage: require("../../assets/images/products/mixed-berry(1).png"),
    galleryImages: [
      require("../../assets/images/products/mixed-berry(2).png"),
      require("../../assets/images/products/mixed-berry(3).png"),
      require("../../assets/images/products/mixed-berry(4).png"),
    ],
  },

  {
    id: "oreo-cookie",
    name: "Oreo Cookie",
    category: "Chocolate",
    price: 4000,
    description: "",
    featured: true,
    mainImage: require("../../assets/images/products/oreo-cookie(1).png"),
    galleryImages: [
      require("../../assets/images/products/oreo-cookie(2).png"),
      require("../../assets/images/products/oreo-cookie(3).png"),
    ],
  },

  {
    id: "passion-fruit",
    name: "Passion Fruit",
    category: "Tropical",
    price: 3500,
    description: "",
    featured: false,
    mainImage: require("../../assets/images/products/passion-fruit(1).png"),
    galleryImages: [
      require("../../assets/images/products/passion-fruit(2).png"),
    ],
  },

  {
    id: "peach",
    name: "Peach",
    category: "Fruit",
    price: 3500,
    description: "",
    featured: false,
    mainImage: require("../../assets/images/products/peach(1).png"),
    galleryImages: [
      require("../../assets/images/products/peach(2).png"),
      require("../../assets/images/products/peach(3).png"),
    ],
  },

  {
    id: "peanut-butter",
    name: "Peanut Butter",
    category: "Classic",
    price: 4000,
    description: "",
    featured: true,
    mainImage: require("../../assets/images/products/peanut-butter(1).png"),
    galleryImages: [
      require("../../assets/images/products/peanut-butter(2).png"),
    ],
  },

  {
    id: "pineapple",
    name: "Pineapple",
    category: "Tropical",
    price: 3500,
    description: "",
    featured: false,
    mainImage: require("../../assets/images/products/pineapple(1).png"),
    galleryImages: [require("../../assets/images/products/pineapple(2).png")],
  },

  {
    id: "strawberry",
    name: "Strawberry",
    category: "Fruit",
    price: 4000,
    description: "",
    featured: true,
    mainImage: require("../../assets/images/products/strawberry(1).png"),
    galleryImages: [
      require("../../assets/images/products/strawberry(2).png"),
      require("../../assets/images/products/strawberry(3).png"),
      require("../../assets/images/products/strawberry(4).png"),
    ],
  },

  {
    id: "white-chocolate",
    name: "White Chocolate",
    category: "Chocolate",
    price: 4000,
    description: "",
    featured: true,
    mainImage: require("../../assets/images/products/white-chocolate(1).png"),
    galleryImages: [
      require("../../assets/images/products/white-chocolate(2).png"),
      require("../../assets/images/products/white-chocolate(3).png"),
    ],
  },
];
