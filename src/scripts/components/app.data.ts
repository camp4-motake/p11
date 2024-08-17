import Alpine from "alpinejs";

document.addEventListener("alpine:init", () => {
  document.documentElement.setAttribute("x-data", "app");
});

Alpine.data("app", () => ({
  init() {
    this.$el.setAttribute("x-bind", "app_attr");
  },

  app_attr: {
    ":class"() {
      return {
        "is-menu-shown": this.$store.menu.shown,
      };
    },
  },
}));
