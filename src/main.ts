import intersect from '@alpinejs/intersect';
import Alpine from 'alpinejs';
import './scripts/components';
import './scripts/stores';

window.Alpine = Alpine;
Alpine.plugin(intersect);
Alpine.start();
