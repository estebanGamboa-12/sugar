export type MenuItem = {
  id: string;
  name: string;
  tagline: string;
  price: string;
  imageUrl: string;
  category: "brasa" | "huerta" | "mar" | "postres" | "bodega";
  description: string;
  allergens: string[];
};

export const MENU_ITEMS: MenuItem[] = [
  // Brasa
  {
    id: "brasa-1",
    name: "Costillar Ibérico 48h",
    tagline: "Brasa de encina, salsa chimichurri",
    price: "42€",
    imageUrl: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&q=85",
    category: "brasa",
    description: "Costillar de cerdo ibérico de bellota, cocinado 48 horas a baja temperatura y terminado en brasa de encina. Acompañado de chimichurri casero.",
    allergens: ["Gluten"],
  },
  {
    id: "brasa-2",
    name: "Tomahawk Wagyu A5",
    tagline: "Brasa, mantequilla de trufa",
    price: "128€",
    imageUrl: "https://images.unsplash.com/photo-1558030006-450675393462?w=600&q=85",
    category: "brasa",
    description: "Tomahawk de wagyu japonés A5, parrilla a la brasa. Mantequilla de trufa negra, patatas confitadas.",
    allergens: ["Lácteos"],
  },
  {
    id: "brasa-3",
    name: "Pollo al carbón",
    tagline: "Marinado 24h, especias secretas",
    price: "24€",
    imageUrl: "https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=600&q=85",
    category: "brasa",
    description: "Pollo entero marinado 24 horas con especias de la casa, cocinado al carbón. Crujiente por fuera, jugoso por dentro.",
    allergens: ["Apio", "Mostaza"],
  },
  // Huerta
  {
    id: "huerta-1",
    name: "Ensalada de temporada",
    tagline: "Verduras de km0, vinagreta de miel",
    price: "18€",
    imageUrl: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&q=85",
    category: "huerta",
    description: "Mix de verduras de temporada de productores locales. Vinagreta de miel de la Alcarria, queso de cabra y nueces.",
    allergens: ["Frutos secos", "Lácteos"],
  },
  {
    id: "huerta-2",
    name: "Risotto de espárragos",
    tagline: "Arborio, parmesano 36 meses",
    price: "26€",
    imageUrl: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=600&q=85",
    category: "huerta",
    description: "Risotto cremoso con espárragos trigueros, parmesano Reggiano 36 meses y reducción de limón.",
    allergens: ["Gluten", "Lácteos"],
  },
  {
    id: "huerta-3",
    name: "Tartar de remolacha",
    tagline: "Cabra, menta, pan crujiente",
    price: "16€",
    imageUrl: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=600&q=85",
    category: "huerta",
    description: "Tartar de remolacha asada, queso de cabra, menta fresca y chips de pan de centeno.",
    allergens: ["Gluten", "Lácteos"],
  },
  // Mar
  {
    id: "mar-1",
    name: "Lubina a la sal",
    tagline: "Costra mediterránea, hierbas",
    price: "48€",
    imageUrl: "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=600&q=85",
    category: "mar",
    description: "Lubina entera cocida en costra de sal mediterránea. Emulsión de hierbas, patatas confitadas.",
    allergens: [],
  },
  {
    id: "mar-2",
    name: "Ceviche de corvina",
    tagline: "Leche de tigre, camote",
    price: "22€",
    imageUrl: "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=600&q=85",
    category: "mar",
    description: "Corvina fresca marinada en leche de tigre. Camote, maíz y cilantro.",
    allergens: ["Pescado", "Apio"],
  },
  {
    id: "mar-3",
    name: "Gambas rojas al ajillo",
    tagline: "Dénia, pan artesano",
    price: "32€",
    imageUrl: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&q=85",
    category: "mar",
    description: "Gambas rojas de Dénia a la plancha con ajo confitado y guindilla. Pan artesano para mojar.",
    allergens: ["Crustáceos", "Gluten"],
  },
  // Postres
  {
    id: "postres-1",
    name: "Tiramisú de la nonna",
    tagline: "Mascarpone, café espresso",
    price: "12€",
    imageUrl: "https://images.unsplash.com/photo-1534080564583-6be75777b70a?w=600&q=85",
    category: "postres",
    description: "Tiramisú clásico con mascarpone de Lombardía, café espresso y cacao amargo. Receta de la nonna.",
    allergens: ["Gluten", "Lácteos", "Huevo"],
  },
  {
    id: "postres-2",
    name: "Tarta de queso vasca",
    tagline: "Crema quemada, arándanos",
    price: "14€",
    imageUrl: "https://images.unsplash.com/photo-1533134242443-d4dd215307d5?w=600&q=85",
    category: "postres",
    description: "Tarta de queso estilo San Sebastián. Crema quemada por fuera, cremosa por dentro. Coulis de arándanos.",
    allergens: ["Gluten", "Lácteos", "Huevo"],
  },
  {
    id: "postres-3",
    name: "Sorbete de mandarina",
    tagline: "Albahaca, merengue",
    price: "10€",
    imageUrl: "https://images.unsplash.com/photo-1557142046-c704a3adf364?w=600&q=85",
    category: "postres",
    description: "Sorbete de mandarina valenciana, merengue ligero y albahaca fresca. Refrescante y ligero.",
    allergens: ["Huevo"],
  },
  // Bodega
  {
    id: "bodega-1",
    name: "Chardonnay Rueda",
    tagline: "Barrica francesa, 2020",
    price: "38€",
    imageUrl: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=600&q=85",
    category: "bodega",
    description: "Rueda 2020. Crianza en barrica francesa. Notas de mantequilla, manzana verde y vainilla.",
    allergens: ["Sulfitos"],
  },
  {
    id: "bodega-2",
    name: "Pinot Noir Borgoña",
    tagline: "Grand Cru, 2019",
    price: "95€",
    imageUrl: "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=600&q=85",
    category: "bodega",
    description: "Borgoña 2019. Elegancia y sutileza. Cereza, tierra húmeda y especias.",
    allergens: ["Sulfitos"],
  },
];

export const MENU_CATEGORIES = ["brasa", "huerta", "mar", "postres", "bodega"] as const;
export type MenuCategory = (typeof MENU_CATEGORIES)[number];
