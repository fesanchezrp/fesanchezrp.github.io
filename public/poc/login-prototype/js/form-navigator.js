/**
 * Navegación para formularios
 * 
 * Pseudocódigo
* - Obtiene lista de formularios, etiquetas de cabeceras, y contenedor de formulario (El que hace Scroll)
* - Por cada formulario, añadir Observer de intersección, https://developer.mozilla.org/es/docs/Web/API/Intersection_Observer_API, que se ejecute cuando se vea el formulario en pantalla.
* - Al ejecutarse el observer (Cuando se vea el elemento en la pantalla), ejecutar función "toggleActiveFormSection"
* - La función toggleActiveFormSection debe 1) eliminar la clase "active" de la sección que antes se encontaba activa, e incluir "Active" para la nueva sección visible en pantalla
* @nota_1 Verificar invocaciones de callback para determinar si se debe aplicar función "Debounce" al callback
* @nota_2 Tambien debería implementar indicador de validación de formulario.
 */

Vue.component('form-navigator', {
    props: ['formGroup', 'forms', 'formSubmit', 'title', 'submitButton', 'alert', 'actions'],
    data: function(){
        return {
            currentForm: null,
            observer: null,
            options: []
        }
    },
    methods: {
        toggleActiveSection(entries, observer){
            for(entry of entries){
                if(entry.isIntersecting){
                    this.options.find((option)=> option.form === entry.target).active = true
                }else{
                    this.options.find((option)=> option.form === entry.target).active = false
                }
            }
        },
        scrollToForm(form){
            form.scrollIntoView({behavior: 'smooth'});
        }
    },
    mounted: function(){
        let options = {
            root: this.formGroup,
            rootMargin: '0px',
            threshold: 1.0
        }
        this.observer = new IntersectionObserver(this.toggleActiveSection, options)
        for(let formItem = 0; formItem < this.forms.length; formItem++){
            this.options.push({form: this.forms.item(formItem), active: false, name: this.forms.item(formItem).children[0].children[1]?.textContent, icon: this.forms.item(formItem).children[0].children[0]?.textContent})
            this.observer.observe(this.forms.item(formItem))
        }
        this.title = this.title? this.title: 'Nueva entidad'
    },
    computed: {
        formArray : function(){
            return Array.from(this.forms)
        }
    },
    template: `<div class="actions-menu">
    <div v-if="alert" class="alert alert-warning mb-4" style="font-size: 0.8em" role="alert">
        {{alert}}
    </div>
    <div class="font-weight-bold mb-2">
        {{title}}
    </div>
  <div v-for="(form, index) in options" class="action-menu-item">
    <a class="action-menu-item-hyperlink" :class="{active: form.active}" href="javascript:void(0)" @click="scrollToForm(form.form)">
      <span class="material-icons">{{form.icon}}</span>
      <span class="action-menu-item-text">{{form.name}}</span>
      <span></span>
    </a>
  </div>
  <hr>
  <div  v-if="actions" v-for="(actionGroup, index) in actions">
    <div class="font-weight-bold mb-2">
        {{actionGroup.title}}
    </div>
    <div v-for="(actionItem, index) in actionGroup.actions" class="action-menu-item">
    <a class="action-menu-item-hyperlink active" href="javascript:void(0)" @click="actionItem.action() || null">
      <span class="material-icons">{{actionItem.icon}}</span>
      <span class="action-menu-item-text">{{actionItem.title}}</span>
      <span></span>
    </a>
  </div>
    <hr>
  </div>
  <span class="mt-2 d-flex align-items-center">
  
    <button v-if="submitButton" class="d-flex align-items-center mr-2 btn btn-primary btn-sm" @click="$emit('formSubmit')"><span>Crear entidad</span><i class='bx bx-plus ml-1' style="font-size:1.2em"></i></button>
    <a href="javascript:void(0)" @click="$router.go(-1)">Cancelar</a>
  </span>
  <hr>
</div>
`
})