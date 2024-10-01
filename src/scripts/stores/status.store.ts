import Alpine from 'alpinejs';

const name = 'status';
const store = { isPageActive: false };

Alpine.store(name, store);

declare module 'alpinejs' {
  interface Stores {
    [name]: typeof store;
  }
}
