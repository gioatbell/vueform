import { computed, inject } from 'vue'
import useElementComponent from './../composables/useElementComponent'
import localize from './../utils/localize'

export default {
  name: 'ElementLabelFloating',
  props: {
    visible: {
      type: Boolean,
      default: false,
    }
  },
  setup(props, context)
  {
    // ============ DEPENDENCIES ============

    const {
      el$,
      form$,
      Size,
      View,
      classesInstance,
      classes,
      Templates,
      template,
      theme,
    } = useElementComponent(props, context)

    // =============== INJECT ===============

    const config$ = inject('config$')

    // ============== COMPUTED ==============

    /**
     * The floating label of the element, defined via `floating` prop.
     *
     * @type {string}
     */
    const floating = computed(() => {
      let floating = localize(el$.value.floating || /* istanbul ignore next: tested, but not covered */ (form$.value.options.floatPlaceholders ? el$.value.placeholder : null), config$.value, form$.value)

      if (el$.value.isRequired && form$.value.options.showRequired?.indexOf('floating') !== -1) {
        floating += '*'
      }

      return form$.value.$vueform.sanitize(floating)
    })
    
    return {
      el$,
      form$,
      Size,
      View,
      classesInstance,
      theme,
      classes,
      Templates,
      template,
      floating,
    }
  },
}