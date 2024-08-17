import "./scripts/components";
import "./scripts/stores";

import intersect from "@alpinejs/intersect";
import Alpine from "alpinejs";

window.Alpine = Alpine;
Alpine.plugin(intersect);
Alpine.start();
