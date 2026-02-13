export type TeamMember = {
  id: string;
  role: string;
  name: string;
  imageUrl: string;
  caption: string;
};

export const TEAM: TeamMember[] = [
  {
    id: "chef",
    role: "Chef",
    name: "Marco Silva",
    imageUrl: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=800&q=85",
    caption: "Fuego y producto. Cada plato cuenta una historia.",
  },
  {
    id: "sala",
    role: "Sala",
    name: "Laura Torres",
    imageUrl: "https://images.unsplash.com/photo-1583394293214-28dad15c0b44?w=800&q=85",
    caption: "Servicio impecable. Ritmo y calor.",
  },
  {
    id: "cocktail",
    role: "Coctelería",
    name: "Javier Mora",
    imageUrl: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=800&q=85",
    caption: "Cócteles únicos. Producto local, técnica clásica.",
  },
  {
    id: "producto",
    role: "Producto",
    name: "Huerta & Mar",
    imageUrl: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=800&q=85",
    caption: "Km0. De la huerta y el mar a la brasa.",
  },
];
