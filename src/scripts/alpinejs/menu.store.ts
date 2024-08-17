import Alpine from "alpinejs";

const name = "menu";
const store = { shown: false };

Alpine.store(name, store);

declare module "alpinejs" {
  interface Stores {
    [name]: typeof store;
  }
}
