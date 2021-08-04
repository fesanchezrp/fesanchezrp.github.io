var newEntity = Vue.component('new-entity', {
  props: ['entityId'],
    data : function(){
        return {
          formGroup: null,
          totalPaso: 4,
          pasoActual: 1
        }
    },
    methods: {
      createEntity(){
        formsValid = true;
        for(let form of this.forms){
          for(let input of form.elements){
            this.validateFieldInput({target: input})
          }
          if(!form.checkValidity()) formsValid = false
        }
        if(formsValid){
          Swal.fire({
            icon: 'success',
            title: 'Entidad creada con éxito',
            showConfirmButton: false,
            timer: 1300
          })
          this.$router.push({path: `/entities/ALN001`})
        }
      },
      validateFieldInput(event){
        let input = event.target;
        let value = input.value;
        let validations = input.dataset;
        let triggeredConstraint = false;
        for(let validationType in validations){
          switch(validationType){
            case 'maxlength':
              if( value.length > validations[validationType]){
                let message = `No debe superar ${validations[validationType]} caracteres`;
                $(input).siblings('.invalid-feedback').html(message)
                input.setCustomValidity(message)
                triggeredConstraint = true;
                input.classList.add('is-invalid')
                input.classList.remove('is-valid')
              }
            case 'required':
              if( !value){
                let message = `Este campo es obligatorio`;
                $(input).siblings('.invalid-feedback').html(message)
                input.setCustomValidity(message)
                input.classList.add('is-invalid')
                input.classList.remove('is-valid')
                triggeredConstraint = true;
              }
            break;
          }
          if(triggeredConstraint) break;
        }

        if(!triggeredConstraint){
          input.classList.remove('is-invalid')
          input.classList.add('is-valid')
          input.setCustomValidity('')
        }
      }
    },
    beforeMount: function(){
      this.formGroup = document.getElementById('entities-form-group')
    },
    mounted: function(){
        $('[data-toggle="tooltip"]').tooltip()
        this.$EventBus.$emit('toolboxOperationChange', [])
        $(".js-range-slider").ionRangeSlider({
          grid: true,
          min: 2015,
          max: 2021,
          step: 1
        });
    },
    computed: {
      forms: function(){
        return document.getElementsByClassName('subform') || []
      }
    },
    template: `<div class="row">
  <div class="col">
    <!-- <div class="information-header">
  <h4 class="information-header-title">
Acme C.A<span class="information-header-subtitle">ACME001</span></h4>
  <step-bar :totalSteps="totalPaso" :currentStep="pasoActual" class="d-none"></step-bar>
</div> -->
    <div id="entities-form-group" class="input-form">
      <form class="subform" novalidate >
        <h5 class="section-header"><span></span><span>Datos Generales</span></h5>
        <div class="form-row">
          <div class="form-group col-lg-2">
            <label for="entity-code">Código de entidad</label>
            <input
              class="form-control form-control-sm"
              type="text"
              name="entity-code"
              id="entity-code"
              data-maxlength="10"
              required
              @input="validateFieldInput"
            />
            <div class="invalid-feedback">Este campo es obligatorio</div>
          </div>
          <div class="form-group col-lg-4">
            <label for="entity-name">Nombre de entidad</label>
            <input
              class="form-control form-control-sm"
              type="text"
              name="entity-name"
              id="entity-name"
            />
          </div>
          <div class="form-group col-lg-2">
            <label for="entity-type">Tipo de entidad <div class="help-indicator" data-toggle="tooltip" data-html="true" title="Tipo de entidad con la cual la empresa realiza transacciones.">?</div></label>
            <select class="form-control form-control-sm" name="entity-type" id="entity-type">
              <option value=""></option>
              <option value="1">Adquiriente</option>
              <option value="2">Empresa</option>
              <option value="3">Comercios</option>
            </select>
          </div>
          <div class="form-group col-lg-4">
            <label for="entity-name">Nombre Comercial</label>
            <input
              class="form-control form-control-sm"
              type="text"
              name="entity-name"
              id="entity-name"
            />
          </div>
          <div class="form-group col-lg-2">
            <label for="entity-country">Pais</label>
            <select
              class="form-control form-control-sm"
              name="entity-country"
              id="entity-country"
            >
              <option value=""></option>
              <option value="1">Perú</option>
              <option value="2">Estados Unidos</option>
              <option value="3">República Checa</option>
            </select>
          </div>
          <div class="form-group col-lg-2">
            <label for="entity-country">Tipo de documento</label>
            <select
              class="form-control form-control-sm"
              name="entity-country"
              id="entity-country"
            >
              <option value=""></option>
              <option value="1">Cédula</option>
              <option value="2">RUC</option>
              <option value="3">Pasaporte</option>
            </select>
          </div>
          <div class="form-group col-lg-2">
            <label for="entity-name">Número de documento</label>
            <input
              class="form-control form-control-sm"
              type="text"
              name="entity-name"
              id="entity-name"
            />
          </div>
          <div class="form-group col-lg-6">
            <label for="entity-name">Razón Social</label>
            <input
              class="form-control form-control-sm"
              type="text"
              name="entity-name"
              id="entity-name"
            />
          </div>
          <div class="form-group col-lg-2">
            <label for="entity-country">Categoría</label>
            <select
              class="form-control form-control-sm"
              name="entity-country"
              id="entity-country"
            >
              <option value=""></option>
              <option value="1">Categoria 1</option>
              <option value="2">Categoria 2</option>
              <option value="3">Categoria 3</option>
            </select>
          </div>
          <div class="form-group col-lg-4">
            <label class="mb-0" for="doc">Tamaño</label>
            <div class="mdc-chip-set" role="grid">
              <div class="mdc-chip" role="row">
                <div class="mdc-chip__ripple"></div>
                <span role="gridcell">
                  <span role="button" tabindex="0" class="mdc-chip__primary-action">
                    <span class="mdc-chip__text">Micromerchant</span>
                  </span>
                </span>
              </div>
              <div class="mdc-chip" role="row">
                <div class="mdc-chip__ripple"></div>
                <span role="gridcell">
                  <span role="button" tabindex="-1" class="mdc-chip__primary-action">
                    <span class="mdc-chip__text">Small</span>
                  </span>
                </span>
              </div>
              <div class="mdc-chip" role="row">
                <div class="mdc-chip__ripple"></div>
                <span role="gridcell">
                  <span role="button" tabindex="-2" class="mdc-chip__primary-action">
                    <span class="mdc-chip__text">Medium</span>
                  </span>
                </span>
              </div>
              <div class="mdc-chip" role="row">
                <div class="mdc-chip__ripple"></div>
                <span role="gridcell">
                  <span role="button" tabindex="-3" class="mdc-chip__primary-action">
                    <span class="mdc-chip__text">Large</span>
                  </span>
                </span>
              </div>
              </div>
            </div>
            <div class="form-group col-lg-6">
              <label for="doc">Fecha de expiración</label>
              <input name="my_range" value="" class="js-range-slider" type="text">
            </div>
        </div>
      </form>

      <form class="subform" novalidate>      
        <h5 class="section-header"><span></span><span>Representante</span></h5>
        <div class="form-row">
          <div class="form-group col-md-4">
            <label for="entity-code">Persona de Contacto</label>
            <input class="form-control form-control-sm" type="text" name="entity-code" id="entity-code" maxlength="30">
            <div class="invalid-feedback">
              Este campo es obligatorio
            </div>
          </div>
          <div class="form-group col-md-4">
            <label for="entity-code">Cargo</label>
            <input class="form-control form-control-sm" type="text" name="entity-code" id="entity-code">
            <div class="invalid-feedback">
              Este campo es obligatorio
            </div>
          </div>
          <div class="form-group col-md-2">
            <label for="entity-code">Teléfono</label>
            <input class="form-control form-control-sm" type="text" name="entity-code" id="entity-code">
            <div class="invalid-feedback">
              Este campo es obligatorio
            </div>
          </div>
          <div class="form-group col-md-2">
            <label for="entity-code">Email</label>
            <input class="form-control form-control-sm" type="text" name="entity-code" id="entity-code">
            <div class="invalid-feedback">
              Este campo es obligatorio
            </div>
          </div>
        </div>
      </form>
      <form class="subform" novalidate>      
        <h5 class="section-header"><span></span><span>Ubicación</span></h5>
        <div class="form-row">
          <div class="form-group col-md-2">
            <label for="entity-code">Departamento Fiscal</label>
            <input class="form-control form-control-sm" type="text" name="entity-code" id="entity-code">
            <div class="invalid-feedback">
              Este campo es obligatorio
            </div>
          </div>
          <div class="form-group col-md-2">
            <label for="entity-code">Provincia Fiscal</label>
            <input class="form-control form-control-sm" type="text" name="entity-code" id="entity-code">
            <div class="invalid-feedback">
              Este campo es obligatorio
            </div>
          </div>
          <div class="form-group col-lg-2">
            <label for="entity-country">Típo de Vía Fiscal</label>
            <select
              class="form-control form-control-sm"
              name="entity-country"
              id="entity-country"
            >
              <option value=""></option>
              <option value="1">Categoria 1</option>
              <option value="2">Categoria 2</option>
              <option value="3">Categoria 3</option>
            </select>
        </div>
          <div class="form-group col-md-4">
            <label for="entity-code">Dirección Fiscal</label>
            <input class="form-control form-control-sm" type="text" name="entity-code" id="entity-code">
            <div class="invalid-feedback">
              Este campo es obligatorio
            </div>
          </div>
          <div class="form-group col-md-2">
            <label for="entity-code">Distrito Fiscal</label>
            <input class="form-control form-control-sm" type="text" name="entity-code" id="entity-code">
            <div class="invalid-feedback">
              Este campo es obligatorio
            </div>
          </div>
        </div>
      </form>
      <div class="form-actions-container">
        <hr />
        <button class="btn btn-primary" @click="$router.go(-1)">Atras</button>
      </div>
    </div>
  </div>
  <div>
    <!-- <div class="actions-menu">
      <div class="action-menu-item">
        <a class="action-menu-item-hyperlink" href="javascript:void(0)">
          <span class="material-icons">account_balance</span>
          <span class="action-menu-item-text">Administrar cuentas bancarias</span>
        </a>
      </div>
      <div class="action-menu-item">
        <a class="action-menu-item-hyperlink" href="javascript:void(0)"> 
          <span class="material-icons">settings</span>
          <span class="action-menu-item-text">Editar Servicios</span>
        </a>
      </div>
      <div class="action-menu-item">
        <a class="action-menu-item-hyperlink" href="javascript:void(0)">
          <span class="material-icons">price_change</span>
          <span class="action-menu-item-text">Editar Esquemas de Comisión</span>
        </a>
      </div>
      <hr>
      <div class="action-menu-item">
        <a class="action-menu-item-hyperlink" href="javascript:void(0)">
          <span class="material-icons">update</span>
          <span class="action-menu-item-text">Actualizar Entidad</span>
        </a>
      </div>
      <div class="action-menu-item">
        <a class="action-menu-item-hyperlink" href="javascript:void(0)">
          <span class="material-icons">delete</span>
          <span class="action-menu-item-text">Eliminar Entidad</span>
        </a>
      </div>
    </div> -->
    <form-navigator :submitButton="true" :formGroup="formGroup" :forms="forms" @formSubmit="createEntity"></form-navigator>
  </div>
</div>
`
})