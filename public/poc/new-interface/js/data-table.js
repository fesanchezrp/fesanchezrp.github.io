var isMobile = {
    any:  function(){
        return false
    }
}
Vue.component('data-table', {
    props: {
        headers: {
            default: () => [],
            required: true,
            type: Array
        },
        body: {
            default: () => [],
            required: true,
            type: Array
        },
        multi: {
            default: () => [],
            type: Array
        },
        id: {
            required: true,
            type: String
        },
        title: {
            required: true,
            type: String
        },
        length: {
            default: () => [21, 7, 14],
            type: Array
        },
        showfilter: {
            default: false,
            type: Boolean
        },
        showlength: {
            default: true,
            type: Boolean
        },
        showinfo: {
            default: true,
            type: Boolean
        },
        showpages: {
            default: true,
            type: Boolean
        },
        sorted: {
            default: false,
            type: Boolean
        },
        colsort: {
            default: -1,
            type: Number
        },
        dessort: {
            default: true,
            type: Boolean
        },
        contextmenu: {
            type: Array,
            default: (() => [])
        },
        delegates: {
            type: Array,
            default: (() => ['hasmenu'])
        },
        reload: {
            type: Function,
            default: null
        },
        numberOfRecords: {
            type: Number,
            default: null
        }
    },
    /**
     * Obtiene las etiquetas multi lenguaje necesarias para el componente
     * antes de que el componente sea construido
     */
    beforeMount() {
        // this.idMLfun = ml400.pushF({
        //     'function': ((lang, parms) => (this.multi400 = lang))
        // })
        // this.idMLfun = ml400.currentLang
        // this.getLabels();
    },
    /**
     * Obtiene las etiquetas multi lenguaje necesarias para el componente
     * antes de que el componente sea actualizado
     */
    beforeUpdate() {
        this.getLabels();
    },
    /**
     * Muestra las etiquetas necesarias despues de que componente se actualiza.
     */
    updated() {
        if (!isMobile.any() && this.contextmenu.length > 0) {
            this.init_contextMenu()
        }
        // ml400.printLabels(ml400.labels)
        if (isMobile.any()) {
            if (this.updating) return;
            this.updating = true;
            Array.from($(`#${this.id} tbody tr`).children())
                .filter(e => e.tagName !== 'TD')
                .forEach(e => $(e).remove())
            Array.from($(`#${this.id} tbody tr`)).forEach(row => {
                let opts = Array.from($(row).find('.iscontextmenu'))
                    .map(e => {
                        let ml400 = e.getAttribute('label');
                        let text = ml400;
                        let is = e.getAttribute('isml')
                        return is == 'false' ? ({ text }) : ({ ml400 })
                    });
                ([...opts, ...this.headers]).forEach((e, i) => {
                    let [txt, is] = typeof e !== 'object' ? [e, false] :
                        !('ml400' in e) ? [e.text, false] : [this.labels[e.ml400], true];
                    $(row).find(`td:nth-of-type(${i+1})`).before(`<span>${txt}</span>`);
                })
            });
            this.updating = false
        }
    },
    data() {
        return {
            updating: false,
            auxarray: [],
            context_menu: {
                menu: [],
                lbs: [],
                index: []
            },
            CLIPBOARD: '',
            //ml400,
            screenWidth: screen.width,
            idMLfun: null,
            /**Id que seria usada para ejecutarse despues de un cambio de idioma*/
            pages: 0,
            /**Cantidad de paginas generadas con los filtros seleccionados*/
            filter: '',
            /**Valor del filtro de la tabla*/
            lengthSelected_: 0,
            /**La cantidad de registros por pagina que se mostraria a la vez*/
            buttons_: [],
            /**Botones para el control de paginas*/
            current: 1,
            /**Numero de paginas en la que se encuentra la tabla*/
            sort_: {
                /**Configuración del ordenamiento del componente*/
                sorted: false,
                /**Indica si el componente ha sido ordenado*/
                sortCol: 0,
                /**Indice de columna por el cual se ordenaría la tabla*/
                sortDsc: true /**Si el valor es true, se ordenaría de mayor a menor, en caso contrario, de menor a mayor*/
            },
            labels: {},
            /**Etiquetas necesarias para desplegar la informacion*/
            /**
             * Diccionario que se usará para el cambio más dinamico del idioma de la tabla.
             * No del contenido de la misma, sino más bien, de los subcomponentes.
             */
            labelsT: {
                ES: {
                    _next: 'Siguiente',
                    _last: 'Anterior',
                    _from: 'Mostrando Registros del',
                    _to: 'al',
                    _totl: 'de un total de',
                    _regs: 'registros',
                    _show: 'Mostrar',
                    _filt: 'Buscar',
                    _nors: 'No se encontraron resultados',
                    _fld: 'filtrado de un total de',
                    _opt: 'Opciones'
                },
                EN: {
                    _next: 'Next',
                    _last: 'Previous',
                    _from: 'Showing',
                    _to: 'to',
                    _totl: 'of',
                    _regs: 'entries',
                    _show: 'Show',
                    _filt: 'Search',
                    _nors: 'No matching records found',
                    _fld: 'filtred from',
                    _opt: 'Options'
                },
            },
            window: {
                width: 0,
                height: 0
            }
        }
    },
    created() {
        window.addEventListener('resize', this.handleResize)
        this.handleResize();
    },
    destroyed() {
        window.removeEventListener('resize', this.handleResize)
    },
    methods: {
        /**
         * 
         * @param {*} row: Cada una de las filas  
         */
        movil_menu(row) {
            if (this.contextmenu.length == 0) return [];
            if (!('options' in this.contextmenu[0])) {
                return this.contextmenu;
            }
            let col = row.find(e => typeof e == 'object' && 'td_class' in e);
            if (!col) return [];
            let opts = this.contextmenu.find(menu => menu.delegate == col.td_class);
            if (!opts) return [];
            return opts.options;
        },
        /**
         * 
         * @param {*} dat: Cada celda individual de la tabla
         * Método que decidirá la clase que tendrá cada TD de la tabla
         */
        td_class(dat) {
            if (typeof dat !== 'object' || !('td_class' in dat))
                return ['hasmenu'];
            else return Array.isArray(dat.td_class) ? dat.td_class : [dat.td_class];
        },
        /**
         * Prepara los menu contextuales
         */
        init_contextMenu() {
            this.prepareContextMenu();
            ml400.get(e => {
                this.context_menu.index.forEach((index) => {
                    let aux = this.context_menu.menu[index.x].options[index.y];
                    aux.title = ml400.labels[aux.title] || aux.title;
                })
                const delegate = '.' + this.context_menu.menu.map(e => e.delegate).join(',.')
                $("#" + this.id).contextmenu({
                    delegate,
                    autoFocus: true,
                    preventContextMenuForPopup: true,
                    preventSelect: true,
                    taphold: true,
                    menu: [],
                    select: function(event, ui) {
                        let $target = ui.target[0];
                        while ($target.tagName !== 'TR') {
                            $target = $target.parentNode;
                        }
                        const index = $target.attributes.index.value;
                        const row = this.auxarray[index];
                        this.$emit('contextevent', ui.cmd, row)
                    }.bind(this),
                    beforeOpen: function(event, ui) {
                        let menu = this.context_menu.menu.find(menu => ui.target.closest('.' + menu.delegate).length !== 0);
                        if (!!menu) {
                            $("#" + this.id).contextmenu("replaceMenu", menu.options)
                        }
                        /*var $menu = ui.menu,
                            $target = ui.target,
                            extraData = ui.extraData;*/
                    }.bind(this)
                });

            }, this.context_menu.lbs)
        },
        /***
         * MÃ©todo para organizar las opciones de menu contextual que son multi-idioma
         */
        prepareContextMenu() {
            this.context_menu.lbs = [];
            this.context_menu.index = [];
            if (this.contextmenu.length == 0) return;
            let aux = ('options' in this.contextmenu[0]) ? this.contextmenu : [{
                delegate: 'hasmenu',
                options: this.contextmenu
            }];
            this.context_menu.menu = aux.map((menu, x) => {
                let options = menu.options.map((e, y) => {
                    let obj = {...e }
                    if (obj.ml400 !== false) {
                        this.context_menu.index.push(({ x, y }))
                        this.context_menu.lbs.push(e.title);
                    }
                    return obj
                })
                return {
                    delegate: menu.delegate,
                    options
                }
            });
        },
        /**Capta el ancho de la pantalla y si la pantalla tiene un ancho mayor a 760px
           elimina el header de la tabla en modo mobile*/
        handleResize() {
            this.window.width = window.innerWidth;
            if (this.window.width > 1000 && isMobile.any()) {
                Array.from($(`#${this.id} tbody tr`).children())
                    .filter(e => e.tagName !== 'tr')
                    .forEach(e => $(e).remove());
            };
        },
        /**
         * Examina los objetos pasados en los objetos del @body y del @header, para determinar si el 
         * objeto requiere multi-idioma.
         * 
         * @parm val: Valor que se examinara.
         * @return Un objeto con las propiedades que se les hara bind al tag destino.
         *         Si el objeto es multi-idioma, se agregara la propiedad ML400.
         *         Si no es un objeto, retornara un objeto vacio.
         */
        isML(val) {
            if (typeof val !== 'object') {
                return {};
            }
            let aux = 'props' in val ? Object.keys(val.props)
                .reduce(((x, y) => (x[y] = val.props[y], x)), {}) : {};
            if ('ml400' in val) {
                aux['ml400'] = val.ml400
            }
            return aux;
        },
        /**
         * Rastrea el @body y el @headers para recuperar todas aquellas etiquetas que seran usadas para
         * desplegar la informacion.
         * Almacena el resultado en @data.labels 
         */
        getLabels() {
            let lbsl = null;
            if (!!this.headers && Array.isArray(this.headers)) {
                lbls = this.headers.reduce((
                    (x, y) => typeof y === 'object' && 'ml400' in y ? [...x, y.ml400] : x
                ), []);
            }
            if (this.contextmenu.length > 0 && isMobile.any()) {
                lbls = lbls || []
                if ('options' in this.contextmenu[0]) {
                    lbls = lbls.concat(
                        this.contextmenu.map(e => e.options.filter(e => e.ml400 !== false).map(e => e.title))
                        .reduce(((a, e) => [...a, ...e]))
                    );
                } else {
                    lbls = lbls.concat(this.contextmenu.filter(e => e.ml400 !== false).map(e => e.title))
                }
            }
            if (!!this.multi && Array.isArray(this.multi) && this.multi.length > 0) {
                lbls = lbls || []
                lbls = lbls.concat(this.multi);
            }
            if (!!this.body && Array.isArray(this.body)) {
                lbls = lbls || [];
                this.body.forEach(row => {
                    lbls = lbls.concat(row.reduce((
                        (x, y) => typeof y === 'object' && 'ml400' in y ? [...x, y.ml400] : x
                    ), []))
                })
            }
            if (!!lbls && Array.isArray(lbls) && lbls.length > 0) {
                ml400.get(l => this.labels = ml400.labels, lbls)
            } else {
                this.labels = {};
            }
        },
        /**
         * Determina con cual valor se ordenara el registro.
         * 
         * @parm x: miembro del @body por el cual se requiere ordenar.
         * @return Si @x es un objeto multi-idioma, retorna el valor de la etiqueta multi-idioma.
         *         Si @x es un objeto no multi-idioma, retorna la propiedad value.
         *         Si @x no es un objeto, retorna el valor mismo.
         */
        getOrderValue(x) {
            return (typeof x[this.sort.sortCol]) === 'object' ?
                ('ml400' in x[this.sort.sortCol] ? this.labels[x[this.sort.sortCol].ml400] : x[this.sort.sortCol].value) :
                x[this.sort.sortCol];
        },
        /***
         * Recarga los datos del componente, solicitando nueva información utilizando la función configurada en la propiedad "reload"
         */
        reloadData(){
            this.filter = '',
            this.current = 1;
            this.reload(this.lengthSelected_, this.offset, true);
        }
    },
    computed: {
        /**
         * Funcion para determinar si sera necesario una colmna mas en la tabla
         */
        extracol() {
            return this.contextmenu.length > 0 && isMobile.any();
        },
        /**
         * Computed que se encargara de administrar el diccionario usado por el componente
         */
        // multi400: {
        //     set(lang) {
        //         !!lang ? this.idMLfun = lang : 0;
        //     },
        //     get() {
        //         return this.labelsT[this.idMLfun];
        //     }
        // },
        /**
         * Calcula el Offset actual del registro (Para busqueda paginada)
         */
        offset() {
            let offset = (this.lengthSelected_ * this.current) - this.lengthSelected_;
            offset = (offset + Math.abs(offset))/2 > this.totalRows? 0: (offset + Math.abs(offset))/2 
            return offset;
        }
        ,
        /**
         * Determinar el ordenamiento de la tabla.
         */
        sort: {
            /**
             * Determina si la tabla ha sido ordenada, el tipo de ordenamiento y la columna a ordenar.
             * Ademas, determina si la tabla debe iniciar ordenada por defecto.
             * 
             * @return data.sort_;
             */
            get() {
                if (!this.sort_.sorted && this.sorted) {
                    let aux = this.headers.findIndex(e => typeof e == 'object' && e.sortable);
                    if (this.colsort == -1 && aux === -1) {
                        return this.sort_;
                    }
                    if (this.colsort < 0 || this.colsort >= this.headers.length) {
                        return this.sort_;
                    } else {
                        let v = this.headers[this.colsort];
                        if (typeof v != 'object' || !v.sortable) {
                            return this.sort_;
                        } else {
                            this.sort_.sorted = true;
                            this.sort_.sortCol = this.colsort;
                            this.sort_.sortDsc = this.headers[this.colsort].desc;
                        }
                    }
                    if (aux !== -1) {
                        this.sort_.sorted = true;
                        this.sort_.sortCol = aux;
                        this.sort_.sortDsc = this.headers[aux].desc;
                    }
                }
                return this.sort_;
            },
            /**
             * Modifica los parametros de ordenamiento, dependiendo del header al que se le de clic.
             * 
             * @parm v: encabezado al que el usuario le dio clic.
             */
            set(v) {
                this.sort_.sorted = true;
                if (v !== this.sort_.sortCol) {
                    this.sort_.sortDsc = true;
                    this.sort_.sortCol = v;
                } else {
                    this.sort_.sortDsc = !this.sort_.sortDsc;
                }
            }
        },
        /**
         * Botones de paginacion.
         */
        buttons: {
            /**
             * @return @data.buttons_;
             */
            get() {
                return this.buttons_;
            },
            /**
             * @parm v: nuevos botones de paginacion.
             */
            set(v) {
                this.buttons_ = v;
            }
        },
        /**
         * La cantidad de registros por pagina
         */
        lengthSelected: {
            /**
             * Si no se ha seleccionado un @data.lengthSelected_, selecciona por default al primero.
             * En caso contrario, retorna al que haya sido previamente seleccioando.
             * 
             * @return @data.lengthSelected_
             */
            get() {
                if (!this.lengthSelected_) {
                    this.lengthSelected = this.length.length > 0 ? this.length[0] : 0;
                }
                return this.lengthSelected_;
            },
            /**
             * @parm v: nueva cantidad de registros por pagina
             */
            set(v = 0) {
                this.lengthSelected_ = isNaN(v) ? 0 : parseInt(v);
            }
        },
        /**
         * Funcion que determina que registros serian mostrados en la tabla segun
         * los filtros seleccionados.
         * 
         * @return La seccion de registros que se mostraria al usuario
         */
        datos() {
            /**INICIA FILTRANDO LOS REGISTROS SEGUN EL @data.filter**/
            let datos =
                this.body.filter(row => row.some(dato =>
                    (typeof dato !== 'object' ? dato :
                        'ml400' in dato ? (!!this.labels[dato.ml400] ? this.labels[dato.ml400] : '') :
                        'value' in dato ? dato.value :
                        '')
                    .toString().toUpperCase().indexOf(this.filter.toUpperCase()) !== -1
                ));
            /**ORDENA LA INFORMACION SEGUN LOS PARMETROS DE @computed.sort**/
            if (this.sort.sorted) {
                datos = datos.sort((x, y) => {
                    let x_ = this.getOrderValue(x);
                    let y_ = this.getOrderValue(y);
                    if (!isNaN(x_.replace(/[,]/g, '')) && !isNaN(y_.replace(/[,]/g, ''))) {
                        x_ = new Number(x_.replace(/[,]/g, ''))
                        y_ = new Number(y_.replace(/[,]/g, ''))
                    }
                    let [a, b] = this.sort.sortDsc ? [x_, y_] : [y_, x_];
                    return a < b ? -1 : a > b ? 1 : 0;
                })
            }
            /**DETERMINA LA CANTIDAD DE PAGINAS QUE TENDRA LA TABLA**/
                var totalRows = this.numberOfRecords? this.numberOfRecords : datos.length;

            this.pages = Math.ceil(totalRows / this.lengthSelected);
            if (this.pages !== 0) {

                this.totalRows = totalRows;
                /**DETERMINA EN QUE PAGINA SE ENCUENTRA LA TABLA**/
                this.current = this.current == 0 ? 1 :
                    this.current > this.pages ? this.pages : this.current;
                /**GENERA LOS BOTONES DE PAGINACION**/
                this.buttons = (this.pages <= 2 ? [] :
                    this.pages <= 6 ? Array.from({
                        length: 4
                    }, (v, i) => i + 2) :
                    Array.from({
                            length: this.current < 5 ? 4 : 3
                        },
                        (v, i) => i + (this.current < 5 ? 2 : this.current - 1))
                ).filter(e => e < this.pages);
                /**GENERA LA PAGINA QUE SE MOSTRARA**/
                this.from = (this.current - 1) * this.lengthSelected;
                this.to = (this.current * this.lengthSelected);
                this.to = this.to > this.totalRows ? this.totalRows : this.to;
                if(datos[0]){
                    this.auxarray = this.numberOfRecords? this.lengthSelected : datos.slice(this.from, this.to);
                }else{
                    this.auxarray = datos.slice(this.from, this.to);
                }
                return this.auxarray = this.auxarray = this.numberOfRecords? datos.slice(0, this.lengthSelected) : datos.slice(this.from, this.to);
            } else {
                this.buttons = [];
                this.totalRows = this.current = this.to = 0;
                this.from = -1;
                return this.auxarray = [];
            }
        }
    },
    watch: {
        body(){
            if(this.body.length == 0) this.current = 1
        }
    },
    template: /*html */ `
<div class="wrapper notSize">    
    <div class="dataTables_wrapper no-footer">
        <h5 class="datatable-title mt-1 p-0">{{title}}</h5>
            <div v-if="showlength" :class="['dataTables_length']" :id="id+'_length'" @change="$emit('on-entries-request', lengthSelected_, offset)">
                <label>Mostrar
                    <select name="T1_length" aria-controls="T1" class="" v-model="lengthSelected">
                        <option v-for="(opt,k) in length" :key="k">
                            {{opt}}
                        </option>
                    </select>
                    registros por página
                </label>
            </div>
        <button :id="id + '-reload-button'" v-if="reload != null" type="button" class="btn filter btn-sm mb-2 ml-1 d-flex flex-row justify-content-center align-items-center float-right" @click="reloadData">
            <az-svg class="icon-btn d-flex flex-row justify-content-center align-items-center" svgsrc="../imge/icons/reload.svg"></az-svg>
        </button>
        <div  v-if="showfilter" :id="id+'_filter'" :class="['dataTables_filter', 'pt-0']">
            <label>Filtros:
                <input type="search" class="" placeholder="" v-model="filter">
            </label>
        </div>
        <div class="tableWrapper">
            <table :id="id" class="dataFrame dataTable no-footer" role="grid" style="width:0px">
                <thead>
                    <tr>
                        <template  v-if="extracol">
                            <th v-for="(hcm,kopth) in contextmenu" rowspan="1" aria-label 
                            colspan="1" :key="kopth - contextmenu.length" class="no-sort sorting_disabled">
                                {{ml400.labels[hcm.title]}}
                            </th>
                        </template>
                        </template>
                        <th v-for = "(title,key) in headers" :key="key"
                            :class="(typeof title == 'object'&&'ml400' in title?['ml400']:[]).concat(typeof title == 'object'&& !title.sortable ? ['no-sort','sorting_disabled'] : ['sorting',(key !== sort.sortCol || !sort.sorted?'':sort.sortDsc?'sorting_desc':'sorting_asc')])"
                            rowspan="1"
                            colspan="1" 
                            style="width:0px" aria-label
                            v-bind="isML(title)"
                            @click = "(typeof title == 'object' && !title.sortable)  ? false : sort = key"    
                        >
                            {{typeof title == 'object'? ('ml400' in title ? labels[title.ml400]:title.text) : title}}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <template v-if="datos.length > 0">
                        <tr v-for="(row,k2) in datos" :key="k2" :index="k2" 
                            :class="[k2%2===0?'odd':'even']"
                        >
                        <template  v-if="extracol">
                            <td v-for="(opt,kopt) in movil_menu(row)" :key="kopt - movil_menu(row).length "
                                    href="javascript:void(0)" role="menuitem"
                                    :label = 'opt.title'
                                    class="ui-menu-item-wrapper iscontextmenu" 
                                    :isml = "!opt.ml400?'true':'false'"
                                    @click="$emit('contextevent',opt.cmd,row,true)"
                                >
                                <div class="row d-flex justify-content-center"> 
                                    <div class="col-md-6 iconContainer" >
                                        <span :class="['ui-icon',opt.uiIcon]" > 
                                        </span>   
                                    </div>
                                </div>            
                            </td>
                        </template>
                            <td v-for="(dat,k3) in row" index="k2" :key="k3"
                                :data-th="typeof headers[k3] == 'object'? ('ml400' in headers[k3] ? labels[headers[k3].ml400]:headers[k3].text) : headers[k3]"
                                :class="td_class(dat)"
                                >
                                <template v-if="typeof dat == 'object' && 'type' in dat && dat.type == 'input'">
                                    <input v-bind  = "isML(dat)"
                                        @click  = "$emit(dat.click ? dat.click : '',row,dat.parms)"
                                        v-model = "dat.value"
                                    />
                                </template>
                                <template v-else>
                                    <component :is="typeof dat == 'object' && 'type' in dat ? dat.type : 'div'"
                                            v-bind="isML(dat)"
                                            @click="$emit(dat.click ? dat.click : '',row,dat.parms)"
                                    >
                                        <template v-if="typeof dat === 'object'">
                                            {{'ml400' in dat ? labels[dat.ml400]:dat.value}}
                                        </template>
                                        <template v-else>
                                            {{dat}}
                                        </template>
                                    </component >
                                </template> 
                            </td>
                        </tr>
                    </template>
                    <template v-else>
                        <tr  class="odd">
                            <td :colspan="headers.length" class="dataTables_empty" valign="top">
                                Numero de registros
                            </td>
                        </tr>
                    </template>
                </tbody>
            </table>
        </div>
        <div  v-if="showinfo" :class="['dataTables_info']"
             :id="id+'_info'" 
             role="status" aria-live="polite">
                Mostrando registros {{from+1}} de {{to}} de un total de {{totalRows}} registros
                <span v-if="!!filter.trim()">
                    (Campos {{body.length}} registros)
                </span>
        </div>
        <div v-if="showpages" :class="['dataTables_paginate','paging_simple_numbers']" :id="id+'_paginate'">
            <a :class="['paginate_button','previous', current === 1 || pages == 0 ? 'disabled':'']"
               :aria-controls="id" data-dt-idx="0" tabindex="0"
               :id="id+'_previous'"
               @click = "current = current === 1 || pages == 0 ? 1 : current - 1;$emit('on-entries-request', lengthSelected_, offset)"
               >
                Anterior
            </a>
            <span>
                <template v-if="pages !== 0">
                    <a :class="['paginate_button', current == 1?'current':'']"
                       :aria-controls="id"
                       data-dt-idx="1"
                       tabindex="0"
                       @click="current = 1;$emit('on-entries-request', lengthSelected_, offset)"
                    >1</a>
                    <span v-if="current >= 5" class="ellipsis">...</span>   
                    <a v-for="(i,k) in buttons"
                      :class="['paginate_button', current == i?'current':'']"
                      :data-dt-idx="i" tabindex="0"
                      @click="current = i;$emit('on-entries-request', lengthSelected_, offset)"
                      >
                       {{i}}
                    </a>
                    <span v-if="current < pages-2" class="ellipsis">...</span>    
                    <template v-if="pages > 1">
                        <a :class="['paginate_button', current == pages?'current':'']"
                        :aria-controls="id" 
                        data-dt-idx="1" 
                        tabindex="0"
                        @click="current = pages;$emit('on-entries-request', lengthSelected_, offset)"
                        >{{pages}}</a>
                    </template>   
                </template>
            </span>
            <a :class="['paginate_button','next',current === pages || pages == 0 ? 'disabled':'']"
               :aria-controls="id" :data-dt-idx="pages" tabindex="0"
               :id="id+'_next'"
               @click = "current = current === pages || pages == 0 ? 1 : current + 1;$emit('on-entries-request', lengthSelected_, offset)">
                Siguiente
            </a>
        </div>
    </div>  
</div>      
    `
});