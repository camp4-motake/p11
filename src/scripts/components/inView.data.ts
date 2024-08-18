/**
 * inView
 *
 * usage:
 * <div x-data="inView" x-bind="trigger"></div>
 *
 * @requires @alpinejs/intersect
 * @see https://alpinejs.dev/plugins/intersect
 *
 */
import Alpine from 'alpinejs'

Alpine.data('inView', (...args: unknown[]) => ({
  isRepeat: args[0] === 'true',

  trigger: {
    'x-init'() {
      this.$el.dataset.scroll = 'out'
    },
    'x-intersect:enter'() {
      this.$el.dataset.scroll = 'in'
    },
    'x-intersect:leave'() {
      if (!this.isRepeat)
        return
      if (!this.isReverse())
        return
      this.$el.dataset.scroll = 'out'
    },
  },

  isReverse() {
    return Math.sign(this.$el.getBoundingClientRect().top) === 1
  },
}))
