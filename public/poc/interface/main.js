Vue.component('main-menu', {
    props: ['currentMenu'],
    template: `
        <div class="menu row justify-content-start align-items-end">
            <div v-for="option in currentMenu" class="col-sm col-md-4 col-lg-3 text-center">
                <a v-on:click="changeView($event, option)" class="menu-item btn primary-color">
                    <object class="menu-icon" type="image/svg+xml" v-bind:data="option.iconUrl"></object>
                    <span class="menu-name primary-text">{{option.name}}</span>
                </a>
            </div>
        </div>
    `,
    methods: {
        changeView: function(event, option){
            comp = this
            if(option.action){
                if(typeof option.action == 'string'){
                    this.$router.push(option.action);
                }else{
                    this.currentMenu = option.action;
                    if(window.localStorage.getItem('palette')){
                        setTimeout(function(){comp.$emit('change-palette', 'all')},500);
                    }
                }
            }
        }
    }
});


Vue.component('reporter', {
    data: function(){
        return {
            favoriteSelected: 1,
            resultShown: false,
            hideFilters:!false
        }
    },
    template: `
    <div class="container-fluid input-form">
        <div class="row option-title mb-4 mx-1 secondary-color secondary-text justify-content-center">
            <p>Reportes</p>
        </div>
        <div class="row align-items-between">
            <form class="form-inline col-md-6">
                <div class="form-group mb-2 mx-1">
                    <select v-model="favoriteSelected" v-on:change="changeTheme(theme)"class="form-control form-control-sm input-extra-sm" id="favorite-selector">
                        <option value="1" selected disabled>Consulta</option>
                        <option value="2">TRANSFERENCIAS POR CANAL</option>
                        <option value="3">TRANSACCIONES RECHAZADAS</option>
                    </select>
                </div>
                <button type="button" v-on:click="getResults" class="btn btn-sm mx-1 primary-color primary-text d-flex align-items-center mb-2">
                    <object class="btn-icon" data="./img/menu-icons/search.svg" type="image/svg+xml"></object>
                    Consultar
                </button>
                <button type="button" class="btn btn-sm mx-1 primary-color primary-text d-flex align-items-center mb-2">
                    <object class="btn-icon" data="./img/menu-icons/save.svg" type="image/svg+xml"></object>
                    Guardar
                </button>
                <button type="button" v-on:click="resetQuery" class="btn btn-sm mx-1 primary-color primary-text d-flex align-items-center mb-2">
                    <object class="btn-icon" data="./img/menu-icons/restore.svg" type="image/svg+xml"></object>
                    Reestablecer
                </button>
            </form>
            <form class="form-inline col-md-6 justify-content-end mt-2 mt-md-0">
                <button v-on:click="toggleFilter" type="button" class="btn btn-sm mb-2 mx-1 primary-color primary-text d-flex justify-content-center align-items-center">
                    <object class="btn-icon btn-icon-alone" data="./img/menu-icons/filter.svg" type="image/svg+xml"></object>
                </button>
                <div class="form-group mb-2 mx-1">
                    <select class="form-control" multiple id="filter-files-selector" title="Campos">
                        <option data-content="<span class='badge badge-secondary primary-text'>Código</span>">Código</option>
                        <option data-content="<span class='badge badge-secondary primary-text'>Descripción</span>">Descripción</option>
                        <option data-content="<span class='badge badge-secondary primary-text'>Rubro</span>">Rubro</option>
                        <option data-content="<span class='badge badge-secondary primary-text'>Tipo de transaccion</span>">Tipo de transacción</option>
                        <option data-content="<span class='badge badge-secondary primary-text'>Moneda</span>">Moneda</option>
                        <option data-content="<span class='badge badge-secondary primary-text'>Codigo de artículo</span>">Codigo de artículo</option>
                        <option data-content="<span class='badge badge-secondary primary-text'>Cobro pago</span>">Cobro pago</option>
                        <option data-content="<span class='badge badge-secondary primary-text'>RUC</span>">RUC</option>
                        <option data-content="<span class='badge badge-secondary primary-text'>Codigo de comercio</span>">Código de comercio</option>
                        <option data-content="<span class='badge badge-secondary primary-text'>Cuenta bancaria</span>">Cuenta bancaria</option>
                        <option data-content="<span class='badge badge-secondary primary-text'>Fecha creación</span>">Fecha creación</option>
                        <option data-content="<span class='badge badge-secondary primary-text'>Fecha liquidación</span>">Fecha liquidación</option>
                        <option data-content="<span class='badge badge-secondary primary-text'>Tipo de cobro</span>">Tipo de cobro</option>
                        <option data-content="<span class='badge badge-secondary primary-text'>Orden de pago</span>">Orden de pago</option>
                    </select>
                </div>
                <div class="form-group mb-2 mx-1">
                    <select class="form-control form-control-sm input-sm-md" id="favorite-selector">
                        <option value="1">SOLO DATOS</option>
                        <option value="2">DATOS Y NOMBRES DE CAMPO</option>
                        <option value="3">TIMESTAMP</option>
                        <option value="4">REPORTE</option>
                    </select>
                </div>
                <div class="form-group mb-2 mx-1">
                    <select class="form-control form-control-sm input-extra-sm" id="favorite-selector">
                        <option value="1">XLS</option>
                        <option value="2">CSV</option>
                        <option value="2">TXT</option>
                        <option value="2">PDF</option>
                    </select>
                </div>
                <button type="button" class="btn btn-sm primary-color primary-text d-flex align-items-center mb-2 mx-1 horizontal-btn">
                    <object class="btn-icon" data="./img/menu-icons/extract.svg" type="image/svg+xml"></object>
                    Exportar
                </button>
            </form>
        </div>
        <div v-show="hideFilters" class="input-form filter-form mx-1 my-3">
            <span class="filter-header mx-2">Filtro de búsqueda</span>
            <form id="filter-form" class="row no-gutters my-2">
                <div class="form-group col-md-4 col-lg-2 mx-1">
                    <input id="codigo" type="text" class="form-control form-control-sm" placeholder="Código"/>
                </div>
                <div class="form-group col-md-4 col-lg-2 mx-1">
                    <input id="descripcion" type="text" class="form-control form-control-sm" placeholder="Descripción"/>
                </div>
                <div class="form-group col-md-4 col-lg-2 mx-1">
                    <select multiple class="form-control form-control-sm multi-select-extra-sm" id="rubro-selector" title="Rubro">
                        <option data-content="<span class='badge badge-secondary primary-text'>Rubro 1</span>">Rubro 1</option>
                        <option data-content="<span class='badge badge-secondary primary-text'>Rubro 2</span>">Rubro 2</option>
                        <option data-content="<span class='badge badge-secondary primary-text'>Rubro 3</span>">Rubro 3</option>
                    </select>
                </div>
                <div class="form-group col-md-4 col-lg-2 mx-1">
                    <input id="tipo-transaccion" type="text" class="form-control form-control-sm" placeholder="Tipo de transacción"/>
                </div>
                <div class="form-group col-md-4 col-lg-2 mx-1">
                    <input id="moneda" type="text" class="form-control form-control-sm" placeholder="Moneda"/>
                </div>
                <div class="form-group col-md-4 col-lg-2 mx-1">
                    <input id="codigo-articulo" type="text" class="form-control form-control-sm" placeholder="Codigo de artículo"/>
                </div>
                <div class="form-group col-md-4 col-lg-2 mx-1">
                    <input id="cobro-pago" type="text" class="form-control form-control-sm" placeholder="Cobro pago"/>
                </div>
                <div class="form-group col-md-4 col-lg-2 mx-1">
                    <input id="ruc" type="text" class="form-control form-control-sm" placeholder="RUC"/>
                </div>
                <div class="form-group col-md-4 col-lg-2 mx-1">
                    <input id="codigo-comercio" type="text" class="form-control form-control-sm" placeholder="Código de comercio"/>
                </div>
                <div class="form-group col-md-4 col-lg-2 mx-1">
                    <input id="cuenta" type="text" class="form-control form-control-sm" placeholder="Cuenta bancaria"/>
                </div>
                <div class="form-group col-md-4 col-lg-2 mx-1">
                    <div class="input-group input-group-sm mb-2">
                        <input  id="fecha-creación" type="text" class="form-control" placeholder="Fecha creación" onfocus="(this.type='date')"/>
                    </div>
                </div>
                <div class="form-group col-md-4 col-lg-2 mx-1">
                    <div class="input-group mb-2 input-group-sm">
                    <input id="fecha-liquidación" type="text" class="form-control" placeholder="Fecha liquidación" onfocus="(this.type='date')"/>
                    </div>
                </div>
                <div class="form-group col-md-4 col-lg-2 mx-1">
                    <input id="tipo-cobro" type="text" class="form-control form-control-sm" placeholder="Tipo de cobro"/>
                </div>
                <div class="form-group col-md-4 col-lg-2 mx-1">
                    <input id="orden-pago" type="text" class="form-control form-control-sm" placeholder="Orden de pago"/>
                </div>
                </form>
            </div>
            <div>
            <table id="query-result" class="query-result-table table table-striped table-bordered hover compact">
                <thead class="primary-color primary-text">
                    <tr>
                        <th>Código</th>
                        <th>Descripción</th>
                        <th>Rubro</th>
                        <th>Tipo de transacción</th>
                        <th>Moneda</th>
                        <th>Código de artículo</th>
                        <th>Cobro pago</th>
                        <th>RUC</th>
                        <th>Código de comercio</th>
                        <th>Cuenta bancaria</th>
                        <th>Fecha de creación</th>
                        <th>Fecha de liquidación</th>
                        <th>Tipo de cobro</th>
                        <th>Orden de pago</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>PG-000-001</td>
                        <td>Transferencia por punto de venta</td>
                        <td>Retail</td>
                        <td>Débito</td>
                        <td>USD</td>
                        <td>ART-789-4759</td>
                        <td>Pago</td>
                        <td>20503644789</td>
                        <td>COM-004-7869</td>
                        <td>191-0121121-0-33</td>
                        <td>12/05/2020 13:00:00</td>
                        <td>12/05/2020 13:05:00</td>
                        <td>Deducción inmediata</td>
                        <td>ORD-078-0425</td>
                    </tr>
                    <tr>
                        <td>PG-000-002</td>
                        <td>Transferencia por punto de venta</td>
                        <td>Retail</td>
                        <td>Débito</td>
                        <td>USD</td>
                        <td>ART-789-4759</td>
                        <td>Pago</td>
                        <td>20503644789</td>
                        <td>COM-004-7869</td>
                        <td>191-0121121-0-33</td>
                        <td>12/05/2020 13:00:00</td>
                        <td>12/05/2020 13:05:00</td>
                        <td>Deducción inmediata</td>
                        <td>ORD-078-0425</td>
                    </tr>
                    <tr>
                        <td>PG-000-003</td>
                        <td>Transferencia por punto de venta</td>
                        <td>Retail</td>
                        <td>Débito</td>
                        <td>USD</td>
                        <td>ART-789-4759</td>
                        <td>Pago</td>
                        <td>20503644789</td>
                        <td>COM-004-7869</td>
                        <td>191-0121121-0-33</td>
                        <td>12/05/2020 13:00:00</td>
                        <td>12/05/2020 13:05:00</td>
                        <td>Deducción inmediata</td>
                        <td>ORD-078-0425</td>
                    </tr>
                    <tr>
                        <td>PG-000-004</td>
                        <td>Transferencia por punto de venta</td>
                        <td>Retail</td>
                        <td>Crédito</td>
                        <td>USD</td>
                        <td>ART-789-4759</td>
                        <td>Pago</td>
                        <td>20503244789</td>
                        <td>COM-004-7869</td>
                        <td>191-0121121-0-33</td>
                        <td>12/05/2020 13:00:00</td>
                        <td>12/05/2020 13:05:00</td>
                        <td>Deducción inmediata</td>
                        <td>ORD-078-0425</td>
                    </tr>
                    <tr>
                        <td>PG-000-005</td>
                        <td>Transferencia por punto de venta</td>
                        <td>Retail</td>
                        <td>Reverso</td>
                        <td>USD</td>
                        <td>ART-789-4759</td>
                        <td>Pago</td>
                        <td>20503644789</td>
                        <td>COM-262-7829</td>
                        <td>111-0121121-0-33</td>
                        <td>09/05/2020 13:00:00</td>
                        <td>12/07/2020 13:05:00</td>
                        <td>Deducción diferida</td>
                        <td>ORD-072-0425</td>
                    </tr>
                    <tr>
                        <td>PG-000-006</td>
                        <td>Transferencia por punto de venta</td>
                        <td>Retail</td>
                        <td>Débito</td>
                        <td>AUD</td>
                        <td>ART-789-4759</td>
                        <td>Pago</td>
                        <td>20503644789</td>
                        <td>COM-004-7869</td>
                        <td>191-0121121-0-33</td>
                        <td>12/05/2020 13:00:00</td>
                        <td>12/05/2020 13:05:00</td>
                        <td>Deducción inmediata</td>
                        <td>ORD-078-0425</td>
                    </tr>
                    <tr>
                        <td>PG-000-007</td>
                        <td>Transferencia por punto de venta</td>
                        <td>Retail</td>
                        <td>Débito</td>
                        <td>GBP</td>
                        <td>ART-789-4759</td>
                        <td>Pago</td>
                        <td>20503644789</td>
                        <td>COM-004-7869</td>
                        <td>191-0121121-0-33</td>
                        <td>12/05/2020 13:00:00</td>
                        <td>12/05/2020 13:05:00</td>
                        <td>Deducción inmediata</td>
                        <td>ORD-078-0425</td>
                    </tr>
                    <tr>
                        <td>PG-000-008</td>
                        <td>Transferencia por punto de venta</td>
                        <td>Retail</td>
                        <td>Débito</td>
                        <td>EUR</td>
                        <td>ART-789-4759</td>
                        <td>Pago</td>
                        <td>20503644789</td>
                        <td>COM-004-7869</td>
                        <td>191-0121121-0-33</td>
                        <td>12/05/2020 13:00:00</td>
                        <td>12/05/2020 13:05:00</td>
                        <td>Deducción inmediata</td>
                        <td>ORD-078-0425</td>
                    </tr>
                </tbody>
            </table>
            </div>
            <button type="button" v-on:click="$router.push('/')" class="btn primary-color primary-text btn-sm">Atrás</button>
        </div>
    </div>
    `,
    methods:{
        resetQuery: function(){
            this.favoriteSelected = 1;
            $('#filter-form').trigger("reset");
            this.resultShown = false;
            this.hideFilters = !false;
        },
        getResults: function(){
            this.resultShown = true;
            this.hideFilters = !true;
        },
        toggleFilter: function(){
            this.hideFilters = !this.hideFilters;
        }
    },
    mounted: function(){
        $('#query-result').DataTable({
            scrollX: true,
            pageLength: 10,
            language: {
                "processing": "Procesando...",
                "lengthMenu": "Mostrar _MENU_ registros",
                "zeroRecords": "No se encontraron resultados",
                "emptyTable": "Ningún dato disponible en esta tabla",
                "info": "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
                "infoEmpty": "Mostrando registros del 0 al 0 de un total de 0 registros",
                "infoFiltered": "(filtrado de un total de _MAX_ registros)",
                "search": "",
                "searchPlaceholder": "Buscar",
                "infoThousands": ",",
                "loadingRecords": "Cargando...",
                "paginate": {
                    "first": "Primero",
                    "last": "Último",
                    "next": "Siguiente",
                    "previous": "Anterior"
                },
                "aria": {
                    "sortAscending": ": Activar para ordenar la columna de manera ascendente",
                    "sortDescending": ": Activar para ordenar la columna de manera descendente"
                },
                "buttons": {
                    "copy": "Copiar",
                    "colvis": "Visibilidad"
                }
            }
        });

        $('#filter-files-selector').selectpicker({
            style: '',
            styleBase: 'form-control form-control-sm input-extra-sm',
            liveSearch: true,
            noneResultsText: 'No se encontraron coincidencias',
            liveSearchNormalize: true
        });

        $('#rubro-selector').selectpicker({
            style: '',
            styleBase: 'form-control form-control-sm'
        });
    }
});

Vue.component('navigation-component',{
    data: function() {
        return {optionHistory: []}
    },
    methods:{
        goToAction: function(option){
            if(typeof option.action == 'string' && option.action){
                this.$router.push(option.action);
            }else{
                this.menu = option.action
            }
        },
        changeView: function(event, option){
            if(typeof option.action == 'string' && option.action){
                this.$router.push(option.action);
            }else{
                this.menu = option.action
            }
        }
    },
    template: `
    <div class="navigation-panel row align-items-center">
        <span class="col" v-if="!optionHistory">
                Menu principal
        </span>
        <span v-for="option in optionHistory" v>
        </span>
    </div>
    `
});

Vue.component('customize-application',{
    data: function(){
        return {
            currentSite: {
                palette: window.localStorage.getItem('palette')? JSON.parse(window.localStorage.getItem('palette')) : site.palette,
                elements: window.localStorage.getItem('elements')? JSON.parse(window.localStorage.getItem('elements')) : site.elements
            },
            theme: window.localStorage.getItem('palette')? 2: 1
        }
    },
    template: `
        <form v-on:submit="saveChanges" class="input-form">
        <div class="row option-title mb-4 mx-1 secondary-color secondary-text justify-content-center">
            <p>Personalizar sistema</p>
        </div>
        <h3>Colores</h3>
        <div style="color:gray;font-size:16px;margin-bottom:20px;">Actualiza los colores de los elementos de la aplicación: Cabeceras, íconos, texto, entre otros.</div>
        <div class="form-row">
            <div class="form-group col-md-3">
            <label for="primary-color">Color primario</label>
                <input v-model="currentSite.palette.primaryColor" v-on:change="$emit('change-palette', 'primary-color', currentSite.palette.primaryColor)" v-bind:style="{'background-color': currentSite.palette.primaryColor}" type="text" class="form-control form-control-sm color-input" id="primary-color" aria-describedby="emailHelp" placeholder="Seleccione el color primario de la aplicación">
                <small id="primaryColorHelp" class="form-text text-muted">Se permite formato HEX</small>
            </div>
            <div class="form-group col-md-3">
                <label for="secondary-color">Color secundario</label>
                <input v-model="currentSite.palette.secondaryColor" v-on:change="$emit('change-palette', 'secondary-color', currentSite.palette.secondaryColor)" v-bind:style="{'background-color': currentSite.palette.secondaryColor}" type="text" class="form-control form-control-sm color-input" id="secondary-color" aria-describedby="emailHelp" placeholder="Seleccione el color secundario de la aplicación">
            </div>
            <div class="form-group col-md-3">
            <label for="primary-text-color">Texto primario</label>
                <input v-model="currentSite.palette.primaryText" v-bind:style="{'background-color': currentSite.palette.primaryText}" type="text" class="form-control form-control-sm" id="primary-text" aria-describedby="emailHelp" placeholder="Seleccione el color primario de la aplicación">
            </div>
            <div class="form-group col-md-3">
                <label for="secondary-text-color">Texto secundario</label>
                <input v-model="currentSite.palette.secondaryText" v-bind:style="{'background-color': currentSite.palette.secondaryText}" type="text" class="form-control form-control-sm" id="secondary-text" aria-describedby="emailHelp" placeholder="Seleccione el color secundario de la aplicación">
            </div>
        </div>
        <h3>Componentes</h3>
        <div style="color:gray;font-size:16px;margin-bottom:20px;">Actualiza los colores de los componentes principales: Cabecera, entre otros.</div>
        <div class="form-row">
        <div class="form-group col-md-3">
            <label for="primary-color">Color fondo cabecera</label>
            <input v-model="currentSite.palette.headerColor" v-on:change="$emit('change-palette', 'header-color', currentSite.palette.headerColor)" v-bind:style="{'background-color': currentSite.palette.headerColor}" type="text" class="form-control form-control-sm color-input" id="header-color" aria-describedby="emailHelp" placeholder="Seleccione el color de la cabecera de la aplicación">
        </div>
        <div class="form-group col-md-3">
            <label for="primary-color">Color texto cabecera</label>
            <input v-model="currentSite.palette.headerText" v-on:change="$emit('change-palette', 'header-text', currentSite.palette.headerText)" v-bind:style="{'background-color': currentSite.palette.headerText}" type="text" class="form-control form-control-sm color-input" id="header-text" aria-describedby="emailHelp" placeholder="Seleccione el color de texto de la cabecera de la aplicación">
        </div>
        <div class="w-100"></div>
        <div class="form-group col-md-3">
            <label for="secondary-color">Color divisor</label>
            <input v-model="currentSite.palette.divisorColor" v-on:change="$emit('change-palette', 'divisor-color', currentSite.palette.divisor)" v-bind:style="{'background-color': currentSite.palette.divisorColor}" type="text" class="form-control form-control-sm color-input" id="divisor-color" aria-describedby="emailHelp" placeholder="Seleccione el color secundario de la aplicación">
        </div>
        <div class="form-group col-md-3">
            <label for="primary-color">Color texto divisor</label>
            <input v-model="currentSite.palette.divisorText" v-on:change="$emit('change-palette', 'divisor-text', currentSite.palette.divisorText)" v-bind:style="{'background-color': currentSite.palette.divisorText}" type="text" class="form-control form-control-sm color-input" id="divisor-text" aria-describedby="emailHelp" placeholder="Seleccione el color de texto del divisor de la aplicación">
        </div>
        <div class="form-check col-md-2 ml-4">
            <input class="form-check-input" v-model="currentSite.elements.divisor" v-on:change="$emit('toggle-divisor', currentSite.elements.divisor)" type="checkbox" id="divisorVisible" aria-describedby="emailHelp">
            <label class="form-check-label" for="divisorVisible">Visible</label>
        </div>
        <div class="w-100"></div>
        <div class="form-group col-md-3">
            <label for="background-color">Color de fondo</label>
            <input v-model="currentSite.palette.backgroundColor" v-on:change="$emit('change-palette', 'background-color', currentSite.palette.backgroundColor)" v-bind:style="{'background-color': currentSite.palette.backgroundColor}" type="text" class="form-control form-control-sm color-input" id="background-color" aria-describedby="emailHelp" placeholder="Seleccione el color de fondo">
        </div>
    </div>
    <h3>Identidad corporativa</h3>
    <div style="color:gray;font-size:16px;margin-bottom:20px;">Personaliza la imagen corporativa de la aplicación: Logos, branding etc</div>
    <div class="form-group">
        <label for="business-logo-input">Logo del negocio</label>
        <input type="file" class="form-control-file" v-on:change="updateLogo('business-logo')" id="business-logo-input">
        <small id="businessLogoHelp" class="form-text text-muted">Los logos deben ser simétricos en cada lado y con dimensiones mínimas de 200px x 200px</small>
    </div>
    <div class="form-group">
        <label for="client-logo-input">Logo del cliente</label>
        <input type="file" v-on:change="updateLogo('client-logo')" class="form-control-file" id="client-logo-input">
    </div>
    <div class="form-row align-items-center">
        <div class="form-group col-md-2">
            <button type="button" v-on:click="$router.push('/')" class="btn primary-color primary-text btn-sm">Atrás</button>
            <button type="submit" class="btn primary-color primary-text btn-sm">Guardar</button>
        </div>
        <div class="col-md-4">
            <div class="form-group row align-items-center">
                <label for="tema" class="side-label col-md-3 col-form-label">Tema:</label>
                <div class="col-md-8">
                    <select v-model="theme" v-on:change="changeTheme(theme)" class="form-control form-control-sm" id="tema">
                        <option value="1">AZ7 Actual</option>
                        <option value="6">AZ7 Plus</option>
                        <option value="5">AZ7 Next</option>
                        <option value="4">AZ7 Alignet</option>
                        <option value="3">AZ7 Fallabella</option>
                        <option value="2">Personalizado</option>
                    </select>
                </div>
            </div>
        </div>
    </div>
    </form>
    `,
    methods: {
        updateLogo: function(type){
            let reader = new FileReader();
            let file;
            if(type){
                switch(type){
                    case 'client-logo':
                        file = document.getElementById('client-logo-input').files[0];
                        reader = new FileReader();
                      
                        reader.addEventListener("load", function () {
                            console.log(reader.result);
                            document.getElementById('client-logo').src = reader.result;
                        }, false);
                      
                        if (file) {
                          reader.readAsDataURL(file);
                        }
                    break;
                    case 'business-logo':
                        file = document.getElementById('business-logo-input').files[0];
                        reader = new FileReader();
                      
                        reader.addEventListener("load", function () {
                            document.getElementById('business-logo').src = reader.result;
                        }, false);
                      
                        if (file) {
                          reader.readAsDataURL(file);
                        }
                    break;
                }
            }
        },
        saveChanges: function(e){
            let businessLogo =  document.getElementById('business-logo-input').files[0];
            let clientLogo =  document.getElementById('client-logo-input').files[0];
            let businessLogoReader;
            let clientLogoReader;
            if(businessLogo){
                businessLogoReader = new FileReader();
                      
                businessLogoReader.addEventListener("load", function () {
                    window.localStorage.setItem('business-logo',businessLogoReader.result);
                }, false);
              
                businessLogoReader.readAsDataURL(businessLogo);
            }else{

                if(this.theme == 1 || this.theme == 3 || this.theme == 4 || this.theme == 6){
                    window.localStorage.setItem('business-logo',"./img/azr-logo-color.png");
                }

                if(this.theme == 4 || this.theme == 5){
                    window.localStorage.setItem('business-logo',"./img/azr-logo-white.png");

                }
            }

            if(clientLogo){
                clientLogoReader = new FileReader();
                      
                clientLogoReader.addEventListener("load", function () {
                    window.localStorage.setItem('client-logo',clientLogoReader.result);
                }, false);
                
                clientLogoReader.readAsDataURL(clientLogo);
            }else{
                if(this.theme == 1){
                    window.localStorage.setItem('client-logo',"");
                }
                if(this.theme == 4){
                    window.localStorage.setItem('client-logo','./img/alignet-gris.png')
                }
                if(this.theme == 5){
                    window.localStorage.setItem('client-logo','./img/clai-ao.png')
                }

                if(this.theme == 6){
                    window.localStorage.setItem('client-logo','./img/alignet-color.png')
                }
                
                if(this.theme == 3){
                    window.localStorage.setItem('client-logo',"./img/logo-fallabela-color.png");
                }
            }

            window.localStorage.setItem('palette', JSON.stringify({
                primaryColor: $('#primary-color').val(),
                secondaryColor: $('#secondary-color').val(),
                primaryText: $('#primary-text').val(),
                secondaryText: $('#secondary-text').val(),
                headerColor: $('#header-color').val(),
                divisorColor: $('#divisor-color').val(),
                headerText: $('#header-text').val(),
                divisorText: $('#divisor-text').val(),
                backgroundColor: $('#background-color').val()
            }));
            window.localStorage.setItem('elements', JSON.stringify({divisor: $('#divisorVisible').prop("checked")}));

            alert('Cambios guardados con éxito!');
            e.preventDefault();
        },
        changeTheme(theme){
            switch(theme){
                case '1':
                    this.currentSite = site;
                    this.$emit('toggle-divisor', this.currentSite.elements.divisor);
                    this.$emit('logo-change', '');
                    $('#business-logo').prop('src','./img/azr-logo-color.png');
                    $('#client-logo').prop('src','./img/logo-fallabela-color.png');
                break;
                case '2':
                    this.currentSite.palette = window.localStorage.getItem('palette')? JSON.parse(window.localStorage.getItem('palette')) : site.palette;
                    $('#business-logo').prop('src', window.localStorage.getItem('business-logo')? window.localStorage.getItem('business-logo'): './img/azr-logo-color.png');
                    $('#client-logo').prop('src', window.localStorage.getItem('client-logo')? window.localStorage.getItem('client-logo'): './img/logo-fallabela-color.png');
                break;
                case '3':
                    this.currentSite.palette = {
                        primaryColor: '#477B5E',
                        secondaryColor: '#477B5E',
                        primaryText: '#FDFDFD',
                        secondaryText: '#DEE3C0',
                        headerColor: '#F7F7F7',
                        divisorColor: '#477B5E',
                        headerText: '#477B5E',
                        divisorText: '#DEE3C0',
                        backgroundColor: '#F5F3F3'
                    };
                    this.$emit('toggle-divisor', true);
                    this.currentSite.elements.divisor = true;;
                    $('#business-logo').prop('src','./img/azr-logo-color.png');
                    this.$emit('logo-change', './img/logo-fallabela-color.png');
                    $('#client-logo').prop('src','./img/logo-fallabela-color.png');
                break;
                case '4':
                    this.currentSite.palette = {
                        primaryColor: '#792A79',
                        secondaryColor: '#792A79',
                        primaryText: '#FDFDFD',
                        secondaryText: '#FDFDFD',
                        headerColor: '#42474c',
                        divisorColor: '#792A79',
                        headerText: '#FDFDFD',
                        divisorText: '#FDFDFD',
                        backgroundColor: '#999B9C'
                    };
                    this.$emit('toggle-divisor', true);
                    this.currentSite.elements.divisor = true;
                    $('#business-logo').prop('src','./img/azr-logo-white.png');
                    this.$emit('logo-change', './img/alignet-gris.png');
                    $('#client-logo').prop('src','./img/alignet-gris.png');
                break;
                case '5':
                    this.currentSite.palette = {
                        primaryColor: '#EBEBEB',
                        secondaryColor: '#EBEBEB',
                        primaryText: '#E0962F',
                        secondaryText: '#E0962F',
                        headerColor: '#060E23',
                        divisorColor: '#E0962F',
                        headerText: '#EBEBEB',
                        divisorText: '#060E23',
                        backgroundColor: '#A0A0A0'
                    };
                    this.$emit('toggle-divisor', true);
                    this.currentSite.elements.divisor = true;
                    //$('#business-logo').prop('src','./img/azr-logo-white.png');
                    //$('#client-logo').prop('src','./img/logo-fallabela-white.png');
                    $('#business-logo').prop('src','./img/azr-logo-white.png');
                    this.$emit('logo-change', './img/clai-ao.png');
                    $('#client-logo').prop('src','./img/clai-ao.png');
                break;
                case '6':
                    this.currentSite.palette = {
                        primaryColor: '#E5E5E5',
                        secondaryColor: '#233884',
                        primaryText: '#233884',
                        secondaryText: '#F3F3F3',
                        headerColor: '#F7F7F7',
                        divisorColor: '#233884',
                        headerText: '#233884',
                        divisorText: '#F7F7F7',
                        backgroundColor: '#DBDBDB'
                    };
                    this.$emit('toggle-divisor', true);
                    this.currentSite.elements.divisor = true;
                    $('#business-logo').prop('src','./img/azr-logo-color.png');
                    this.$emit('logo-change', './img/alignet-color.png');
                    $('#client-logo').prop('src','./img/alignet-color.png');
                break;
            }
            $('.primary-color').css('background-color', this.currentSite.palette.primaryColor);
            $('.secondary-color').css('background-color', this.currentSite.palette.secondaryColor);
            $('.primary-text').css('color', this.currentSite.palette.primaryText);
            $('.secondary-text').css('color', this.currentSite.palette.secondaryText);
            $('.header-color').css('background-color', this.currentSite.palette.headerColor);
            $('.divisor-color').css('background-color', this.currentSite.palette.divisorColor);
            $('.header-text').css('color', this.currentSite.palette.headerText);
            $('.divisor-text').css('color', this.currentSite.palette.divisorText);
            $('.background-color').css('background-color', this.currentSite.palette.backgroundColor);
            changeLogoutIconsColor(this.currentSite.palette.headerText);
        }
    },
    mounted: function(){
            let vm = this;
            $('#primary-color').colorpicker();
            $('#secondary-color').colorpicker();
            $('#primary-text').colorpicker();
            $('#secondary-text').colorpicker();
            $('#header-color').colorpicker();
            $('#divisor-color').colorpicker();
            $('#header-text').colorpicker();
            $('#divisor-text').colorpicker();
            $('#background-color').colorpicker();
            $('#primary-color').on('colorpickerChange', function(event) {
              vm.$emit('change-palette', 'primary-color', event.color.toString());
              $('#primary-color').css('background-color', event.color.toString());
            });
            $('#secondary-color').on('colorpickerChange', function(event) {
                vm.$emit('change-palette', 'secondary-color', event.color.toString());
                $('#secondary-color').css('background-color', event.color.toString());
            });

            $('#primary-text').on('colorpickerChange', function(event) {
                vm.$emit('change-palette', 'primary-text', event.color.toString());
                $('#primary-text').css('background-color', event.color.toString());
              });

            $('#secondary-text').on('colorpickerChange', function(event) {
                vm.$emit('change-palette', 'secondary-text', event.color.toString());
                $('#secondary-text').css('background-color', event.color.toString());
            });

            $('#header-color').on('colorpickerChange', function(event) {
                vm.$emit('change-palette', 'header-color', event.color.toString());
                $('#header-color').css('background-color', event.color.toString());
              });

            $('#divisor-color').on('colorpickerChange', function(event) {
                vm.$emit('change-palette', 'divisor-color', event.color.toString());
                $('#divisor-color').css('background-color', event.color.toString());
            });

            $('#header-text').on('colorpickerChange', function(event) {
                vm.$emit('change-palette', 'header-text', event.color.toString());
                $('#header-text').css('background-color', event.color.toString());
              });

            $('#divisor-text').on('colorpickerChange', function(event) {
                vm.$emit('change-palette', 'divisor-text', event.color.toString());
                $('#divisor-text').css('background-color', event.color.toString());
            });
            $('#background-color').on('colorpickerChange', function(event) {
                vm.$emit('change-palette', 'background-color', event.color.toString());
                $('#background-color').css('background-color', event.color.toString());
            });
    }
});


Vue.component('navigator-component',{
    data: function(){
        return {
            currentNavigation: []
        }
    },
    template: `
        <span><>
    `
});

const routes = [
    {path: '/', component: 'main-menu', props: true},
    {path: '/customize', component: 'customize-application'},
    {path: '/reporter', component: 'reporter'}
];

const router = new VueRouter({
    routes: routes
});

let app = new Vue({
    el: '#app',
    data: {
        menu: menu,
        businessLogo: './img/azr-logo-color.png',
        clientLogo: window.localStorage.getItem('client-logo')? window.localStorage.getItem('client-logo') : '',
        site: site,
        isDivisorVisible: false
    },
    methods: {
        showDate: function(){
            alert(`Today's date is: ${new Date().toLocaleString()}`);
        },
        updateApplicationPalette: function(paletteElement, color){
            switch(paletteElement){
                case 'all':
                    let palette = JSON.parse(window.localStorage.getItem('palette'));
                    $('.primary-color').css('background-color', palette.primaryColor);
                    $('.secondary-color').css('background-color', palette.secondaryColor);
                    $('.primary-text').css('color', palette.primaryText);
                    $('.secondary-text').css('color', palette.secondaryText);
                    $('.header-color').css('background-color', palette.headerColor);
                    $('.divisor-color').css('background-color', palette.divisorColor);
                    $('.header-text').css('color', palette.headerText);
                    $('.divisor-text').css('color', palette.divisorText);
                    $('.background-color').css('background-color', palette.backgroundColor);
                    setTimeout(function(){changeButtonIconsColor(palette.primaryText)},1000);
                    setTimeout(function(){changeLogoutIconsColor(palette.headerText)},1000);
                break;
                case 'primary-color':
                    $('.primary-color').css('background-color', color);
                break;
                case 'secondary-color':
                    $('.secondary-color').css('background-color', color);
                break;
                case 'primary-text':
                    $('.primary-text').css('color', color);
                    changeButtonIconsColor(color);
                break;
                case 'secondary-text':
                    $('.secondary-text').css('color', color);
                break;
                case 'header-color':
                    $('.header-color').css('background-color', color);
                break;
                case 'divisor-color':
                    $('.divisor-color').css('background-color', color);
                break;
                case 'header-text':
                    $('.header-text').css('color', color);
                    changeLogoutIconsColor(color);
                break;
                case 'divisor-text':
                    $('.divisor-text').css('color', color);
                break;
                case 'background-color':
                    $('.background-color').css('background-color', color);
                break;
            }
        },
        updateDivisorVisibility: function(visibility){
            this.isDivisorVisible = visibility
        },
        setClientLogo: function(logo){
            this.clientLogo = logo;
        }
    },
    watch: {
        $route : function(to, from){
            let comp = this;
            if(window.localStorage.getItem('palette')){
                setTimeout(function(){comp.updateApplicationPalette('all')},1000);
            }
        }
    },
    mounted: function(){
        let comp = this;
        if(window.localStorage.getItem('palette')){
            setTimeout(function(){comp.updateApplicationPalette('all')},1000)
        };
        if(window.localStorage.getItem('elements')){
            this.isDivisorVisible = JSON.parse(window.localStorage.getItem('elements')).divisor;
        };
        if(window.localStorage.getItem('business-logo')){
            document.getElementById('business-logo').src = window.localStorage.getItem('business-logo');
        };
        
        if(window.localStorage.getItem('client-logo')){
            document.getElementById('client-logo').src = window.localStorage.getItem('client-logo');
        };
    },
    router: router
});

function changeButtonIconsColor(color){
    let svgObjects = $('.btn object');
    for(let svgObject of svgObjects){
        svgObject.contentDocument.getElementsByTagName('svg')[0].style.fill = color;
    }
    return;
}

function changeLogoutIconsColor(color){
    let svgObjects = $('.logout object');
    for(let svgObject of svgObjects){
        svgObject.contentDocument.getElementsByTagName('svg')[0].style.fill = color;
    }
    return;
}