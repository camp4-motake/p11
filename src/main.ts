import './images/test300x300.png';
import './scripts/alpinejs';

import intersect from '@alpinejs/intersect';
import Alpine from 'alpinejs';

window.Alpine = Alpine;
Alpine.plugin(intersect);
Alpine.start();
