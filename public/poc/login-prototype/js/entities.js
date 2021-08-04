var entities = Vue.component('entities', {
    data: function(){
        return {
            subfile: [],
            filtersVisible: false,
            helpVisible: false
        }
    },
    methods: {
      showEntityDetails: function(parm1, entity){
        this.$router.push({path: `/entities/${entity.LCMCOD}`})
      }
    },
    computed: { 
        headers() {
            return ['Tipo de entidad', 'Número de documento','Código de entidad', 'Descripción',' Razón Social']
        },
        dataTable() {
            const props = {
                style: "cursor:pointer;"
            }
            
            return this.subfile.map(data =>  {
                        let base = {
                            props,
                            click: 'clickEvent',
                            td_class: data.VROL == 'ORIGEN' || data.VROL == 'AMBOS'  ? 'menuOrigen' : 'menuDestino',
                            parms: {
                                LCMCOD: data.LCMCOD,
                                LCMDES: data.LCMDES,
                                LCMRUC: data.LCMRUC,
                                DESTDE1: data.DESTDE1
                            },        
                        }
                        let columns = [
                           { value: data.DESTDE1, ...base},
                           { value: data.LCMRUC, ...base},                        	
                            { value: data.LCMCOD, ...base},
                            { value: data.LCMDES, ...base},                        	
                            { value: data.LCMRSO, ...base},

                        ]
                        if(!this.show_section){
                            //columns.push({ value: data.VROL, ...base})
                        }
                        return columns
                        
            }); 
            
        },
    },
    mounted: function(){
        this.subfile = [
            {DESTDE1: 'Adquiriente', LCMRUC: '8468864', LCMCOD: 'ALN001', LCMDES: 'Alignet', LCMRSO: 'Alignet C.A'},
            {DESTDE1: 'Empresa', LCMRUC: '65456', LCMCOD: 'ALN002', LCMDES: 'Alignet 2', LCMRSO: 'Alignet C.A 2'},
            {DESTDE1: 'Comercio', LCMRUC: '54564564', LCMCOD: 'PCT001', LCMDES: 'Peceti 1', LCMRSO: 'Peceti C.A 1'},
            {DESTDE1: 'Comercio', LCMRUC: '564654', LCMCOD: 'PCT002', LCMDES: 'Peceti 2', LCMRSO: 'Peceti C.A 2'},
            {DESTDE1: 'Comercio', LCMRUC: '5456456', LCMCOD: 'ALN005', LCMDES: 'Alignet 5', LCMRSO: 'Alignet C.A 5'},
            {DESTDE1: 'Empresa', LCMRUC: '787887', LCMCOD: 'ALN006', LCMDES: 'Alignet 6', LCMRSO: 'Alignet C.A 6'},
            {DESTDE1: 'Empresa', LCMRUC: '25777858', LCMCOD: 'ALN010', LCMDES: 'Alignet 10', LCMRSO: 'Alignet  C.A 10'},
            {DESTDE1: 'Adquiriente', LCMRUC: '96859698', LCMCOD: 'PIC001', LCMDES: 'Pico 1', LCMRSO: 'Pico C.A 1'},
            {DESTDE1: 'Adquiriente', LCMRUC: '2256859', LCMCOD: 'MAS001', LCMDES: 'Mastedo 1', LCMRSO: 'Mastedo C.A 1'},
            {DESTDE1: 'Adquiriente', LCMRUC: '7485888', LCMCOD: 'MER001', LCMDES: 'Mercusys 1', LCMRSO: 'Mercusys C.A 1'},
            {DESTDE1: 'Adquiriente', LCMRUC: '1245125', LCMCOD: 'CUA001', LCMDES: 'Cuadaro 1', LCMRSO: 'Cuadaro C.A 1'},
            {DESTDE1: 'Adquiriente', LCMRUC: '125125', LCMCOD: 'RAS001', LCMDES: 'Rasa 1', LCMRSO: 'Rasa C.A 1'},
            {DESTDE1: 'Adquiriente', LCMRUC: '8468864', LCMCOD: 'ALN001', LCMDES: 'Alignet', LCMRSO: 'Alignet C.A'},
            {DESTDE1: 'Empresa', LCMRUC: '65456', LCMCOD: 'ALN002', LCMDES: 'Alignet 2', LCMRSO: 'Alignet C.A 2'},
            {DESTDE1: 'Comercio', LCMRUC: '54564564', LCMCOD: 'PCT001', LCMDES: 'Peceti 1', LCMRSO: 'Peceti C.A 1'},
            {DESTDE1: 'Comercio', LCMRUC: '564654', LCMCOD: 'PCT002', LCMDES: 'Peceti 2', LCMRSO: 'Peceti C.A 2'},
            {DESTDE1: 'Comercio', LCMRUC: '5456456', LCMCOD: 'ALN005', LCMDES: 'Alignet 5', LCMRSO: 'Alignet C.A 5'},
            {DESTDE1: 'Empresa', LCMRUC: '787887', LCMCOD: 'ALN006', LCMDES: 'Alignet 6', LCMRSO: 'Alignet C.A 6'},
            {DESTDE1: 'Empresa', LCMRUC: '25777858', LCMCOD: 'ALN010', LCMDES: 'Alignet 10', LCMRSO: 'Alignet  C.A 10'},
            {DESTDE1: 'Adquiriente', LCMRUC: '96859698', LCMCOD: 'PIC001', LCMDES: 'Pico 1', LCMRSO: 'Pico C.A 1'},
            {DESTDE1: 'Adquiriente', LCMRUC: '2256859', LCMCOD: 'MAS001', LCMDES: 'Mastedo 1', LCMRSO: 'Mastedo C.A 1'},
            {DESTDE1: 'Adquiriente', LCMRUC: '7485888', LCMCOD: 'MER001', LCMDES: 'Mercusys 1', LCMRSO: 'Mercusys C.A 1'},
            {DESTDE1: 'Adquiriente', LCMRUC: '1245125', LCMCOD: 'CUA001', LCMDES: 'Cuadaro 1', LCMRSO: 'Cuadaro C.A 1'},
            {DESTDE1: 'Adquiriente', LCMRUC: '125125', LCMCOD: 'RAS001', LCMDES: 'Rasa 1', LCMRSO: 'Rasa C.A 1'},
            {DESTDE1: 'Adquiriente', LCMRUC: '8468864', LCMCOD: 'ALN001', LCMDES: 'Alignet', LCMRSO: 'Alignet C.A'},
            {DESTDE1: 'Empresa', LCMRUC: '65456', LCMCOD: 'ALN002', LCMDES: 'Alignet 2', LCMRSO: 'Alignet C.A 2'},
            {DESTDE1: 'Comercio', LCMRUC: '54564564', LCMCOD: 'PCT001', LCMDES: 'Peceti 1', LCMRSO: 'Peceti C.A 1'},
            {DESTDE1: 'Comercio', LCMRUC: '564654', LCMCOD: 'PCT002', LCMDES: 'Peceti 2', LCMRSO: 'Peceti C.A 2'},
            {DESTDE1: 'Comercio', LCMRUC: '5456456', LCMCOD: 'ALN005', LCMDES: 'Alignet 5', LCMRSO: 'Alignet C.A 5'},
            {DESTDE1: 'Empresa', LCMRUC: '787887', LCMCOD: 'ALN006', LCMDES: 'Alignet 6', LCMRSO: 'Alignet C.A 6'},
            {DESTDE1: 'Empresa', LCMRUC: '25777858', LCMCOD: 'ALN010', LCMDES: 'Alignet 10', LCMRSO: 'Alignet  C.A 10'},
            {DESTDE1: 'Adquiriente', LCMRUC: '96859698', LCMCOD: 'PIC001', LCMDES: 'Pico 1', LCMRSO: 'Pico C.A 1'},
            {DESTDE1: 'Adquiriente', LCMRUC: '2256859', LCMCOD: 'MAS001', LCMDES: 'Mastedo 1', LCMRSO: 'Mastedo C.A 1'},
            {DESTDE1: 'Adquiriente', LCMRUC: '7485888', LCMCOD: 'MER001', LCMDES: 'Mercusys 1', LCMRSO: 'Mercusys C.A 1'},
            {DESTDE1: 'Adquiriente', LCMRUC: '1245125', LCMCOD: 'CUA001', LCMDES: 'Cuadaro 1', LCMRSO: 'Cuadaro C.A 1'},
            {DESTDE1: 'Adquiriente', LCMRUC: '125125', LCMCOD: 'RAS001', LCMDES: 'Rasa 1', LCMRSO: 'Rasa C.A 1'},
        ]

        this.$EventBus.$on('toggleFilterSection', ()=>{
          this.helpVisible = false;
          this.filtersVisible = !this.filtersVisible;
        })

        this.$EventBus.$on('toggleHelpSection', ()=>{
          this.filtersVisible = false
          this.helpVisible = !this.helpVisible;
        })

        this.$EventBus.$emit('toolboxOperationChange', ['filter', 'help'])

        $(".js-range-slider").ionRangeSlider({
          type: 'double',
          grid: true,
          min: 2015,
          max: 2021,
          step: 1
        });
        let chipset = new mdc.chips.MDCChipSet(document.querySelector('.mdc-evolution-chip-set'));
        console.log(chipset)
    },
    template: `<div class="row">
    <div class="col px-5">
      <!-- <div class="information-header">
    <h4 class="information-header-title">
  Acme C.A<span class="information-header-subtitle">ACME001</span></h4>
    <step-bar :totalSteps="totalPaso" :currentStep="pasoActual" class="d-none"></step-bar>
  </div> -->
        <data-table :title="'Entidades'" @clickEvent="showEntityDetails" :headers='headers' :body="dataTable" :id="'data-table'" :sorted="true"></data-table>
        <hr>
        <div class="d-flex justify-content-between">
          <button class="btn btn-primary" @click="$router.go(-1)">Atras</button>
          <button class="btn btn-primary" @click="$router.push('/entities/new')">Adicionar</button>
        </div>
    </div>

    <div v-show="filtersVisible">
        <div class="actions-menu">
            <h5 class="pb-3 filter-title">Filtros<i class='bx bx-filter filter-icon'></i></h5>
            <form>
              <div class="form-group">
                <label for="entity-type">Tipo de entidad</label>
                <select class="form-control form-control-sm" name="entity-type" id="entity-type">
                  <option value=""></option>
                  <option value="1">Adquiriente</option>
                  <option value="2">Empresa</option>
                  <option value="3">Comercios</option>
                </select>
              </div>
              <div class="form-group">
                <label for="doc">Tipo de entidad</label>
                <input class="form-control form-control-sm" type="text" name="doc" id="doc">
              </div>
              <div class="form-group">
                <label for="doc">Código de entidad</label>
                <input class="form-control form-control-sm" type="text" name="doc" id="doc">
              </div>
              <div class="form-group">
                <label for="doc">Fecha de expiración</label>
                <input name="my_range" value="" class="js-range-slider" type="text">
              </div>
              <div class="form-group">
                <label for="doc">Tamaño</label>
                <div class="mdc-chip-set" role="grid">
                  <div class="mdc-chip" role="row">
                    <div class="mdc-chip__ripple"></div>
                    <span role="gridcell">
                      <span role="button" tabindex="0" class="mdc-chip__primary-action">
                        <span class="mdc-chip__text">Micro</span>
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

                <button class="btn btn-primary d-flex align-items-center"><i class='bx bx-search mr-2'></i><span>Buscar</span></button>
              </form>
            </div>
        </div>
        <div class="actions-menu mr-0" v-show="helpVisible">
          <helper :readOnly="true"></helper>
        </div>
    </div>
  </div>  
    `
})