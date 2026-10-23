export const dishes = [
  {
    id: "doro-wat",
    name: "Doro Wat",
    description:
      "A rich Ethiopian chicken stew simmered with berbere spices and served with injera.",
    price: 450,
    image: "/dishes/doro-wat.jpg",
  },
  {
    id: "shiro",
    name: "Shiro",
    description:
      "A comforting Ethiopian chickpea stew seasoned with traditional spices and served with injera.",
    price: 220,
    image: "/dishes/shiro.jpg",
  },
  {
    id: "tibs",
    name: "Tibs",
    description:
      "Tender sautéed beef with onions, peppers, and Ethiopian herbs, served with injera.",
    price: 380,
    image: "/dishes/tibs.jpg",
  },
];

export function getDishById(id) {
  return dishes.find((dish) => dish.id === id) ?? null;
}
