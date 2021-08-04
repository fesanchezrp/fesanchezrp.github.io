var importData = Vue.component('import-data', {
    data: function(){
        return{
            module:{},
            modules: [
                {id: '1', name: 'Mantenimiento'},
                {id: '2', name: 'Conciliación'},
                {id: '3', name: 'Reportes de compensación'},
                {id: '4', name: 'Contracargos'},
                {id: '5', name: 'Parámetros generales'},
                {id: '6', name: 'Liquidación'},
                {id: '7', name: 'Reclamos y controversias'},
                {id: '8', name: 'Consulta de transacciones presentadas'},
            ],
            moduleOption: {},
            modulesOptions: {
                6: [
                    {id: '1', name: 'Entidades - Datos generales', description: ''},
                    {id: '2', name: 'Entidades - Servicios', description: ''},
                    {id: '3', name: 'Entidades - Cuentas de retribución', description: ''},
                    {id: '4', name: 'Entidades - Impuestos', description: ''},
                    {id: '5', name: 'Entidades - Calendario de pagos', description: ''}
                ]
            },
            csv:'',
            processedRows: 0,
            totalRows: 20,
            numberOfErrors: 0,
            numberOfSuccess: 0,
            interval: '',
            progressMsInterval : '',
            progress: 0,
            cancelCountdown: '',
            canceling: false,
            cancelled: false,
            errors: [],
            chart: {}
        }
    },
    methods: {
        processFile(event){
            console.log('Loading .CSV data to js structure');
            this.csv = event.target.files[0];
            CSV.fetch({
                file: this.csv
              }
            ).done(function(dataset) {
              console.log('.CSV data parsed');
              console.log(dataset);
            });
        },
        startImport(event){
            let vm = this;
            $('#load-file-section').hide("slow", function(){
                $('#load-progress-section').show("slow", function(){
                    var ctx = $('#processingChart');
                    vm.chart = new Chart(ctx, {
                        type: 'pie',
                        data: {
                            labels: ['Por procesar', 'Exito', 'Error'],
                            datasets: [{
                                label: 'Registros cargados',
                                data: [vm.totalRows - vm.processedRows, vm.numberOfSuccess, vm.numberOfErrors],
                                backgroundColor: [
                                    'rgba(232, 232, 232, 0.2)',
                                    'rgba(75, 192, 192, 0.2)',
                                    'rgba(255, 99, 132, 0.2)'
                                ],
                                borderColor: [
                                    'rgba(232, 232, 232, 1)',
                                    'rgba(75, 192, 192, 1)',
                                    'rgba(255, 99, 132, 1)'
                                ],
                                borderWidth: 1
                            }]
                        },
                        options: {
                            responsive: false
                        }
                    })
                    vm.updateProgress(getRandomInt(1000, 3000))
                })
            });

            function getRandomInt(min, max) {
                min = Math.ceil(min);
                max = Math.floor(max);
                return Math.floor(Math.random() * (max - min + 1)) + min;
            }
        },
        updateProgress(ms){
            let vm = this;
            vm.interval = setInterval(() => {
                if(vm.processedRows == vm.totalRows){
                    clearInterval(vm.interval);
                }else{
                    let processed = Math.round(Math.random() * (1 - 0)) + 0;
                    vm.processedRows+=1;
                    processed == 1? vm.numberOfSuccess+=1 : vm.numberOfErrors+=1;
                    if(processed == 0) vm.errors.push({rowNumber: vm.processedRows, code: 400, description: vm.processedRows % 2 == 0 ? 'Comercio no existe' : 'Id duplicado'});
                    vm.progress = Math.floor((vm.processedRows * 100) / vm.totalRows);
                    clearInterval(vm.interval);
                    vm.updateProgress(getRandomInt(1000, 3000))
                }
                vm.updateChart();
            }, ms);

            function getRandomInt(min, max) {
                min = Math.ceil(min);
                max = Math.floor(max);
                return Math.floor(Math.random() * (max - min + 1)) + min;
            }
        },
        updateChart(){
            this.chart.data.datasets[0].data = [this.totalRows - this.processedRows, this.numberOfSuccess, this.numberOfErrors];
            this.chart.update();
        },
        cancelProcessing(){
            let res = confirm("¿Está seguro de cancelar el procesamiento hasta este punto?")
            let countdown = 20;
            let vm = this;
            if(res){
                clearInterval(vm.interval);
                this.canceling = true;
                for(let i = 20; i >= 0; i--){
                    setTimeout(function(){
                        vm.cancelCountdown = `Cancelando de forma segura, esperando ${i} segundos`
                        if(i == 0) vm.cancelled = true;
                    },20000 - (1000 * (i - 1)));
                }
            }
        },
        downloadCsv(type){
            if(type == 'original') $('#orga').click();
        },
        showMessage(message){
            alert(message);
        }
    },
    mounted(){

    },
    computed: {
        currentProgressWidth(){
            return `width:${this.progress}%;`; 
        }
    },
    template: `
    <div class="container-fluid input-form">
        <div class="row option-title mb-4 mx-1 secondary-color secondary-text justify-content-center">
            <p>Módulo de carga masiva</p>
        </div>
        <div id="load-file-section" class="input-form filter-form mx-1 my-3 align-items-center">
            <form id="filter-form" class="form-row" v-on:submit.prevent="startImport($event)">
                <div class="module-selection-section col-lg-6 border-right p-3" :style="{opacity: !jQuery.isEmptyObject(moduleOption)? '0.5' : '1'}">
                    <h5>Paso 1. Seleccionar tipo de carga</h5>
                    <h6 class="text-muted">Seleccione el modulo y opción para carga de datos masiva</h6>
                    <div class="form-group">
                        <label for="module">Modulo</label>
                        <select v-model="module" class="form-control form-control-sm" id="module-selector" name="module" title="Module" @change="moduleOption = '';csv = ''">
                            <option v-for="module in modules" :value="module.id" >{{module.name}}</option>
                        </select>
                        <small class="form-text text-muted">
                            Seleccione el módulo a cargar
                        </small>
                    </div>
                    <div class="form-group">
                        <label for="option">Opción</label>
                        <select v-model="moduleOption" class="form-control form-control-sm" id="option-selector" name="option" title="Option" :disabled="jQuery.isEmptyObject(module)">
                            <option v-for="moduleOption in modulesOptions[module]" :value="moduleOption.id" >{{moduleOption.name}}</option>
                        </select>
                        <small class="form-text text-muted">
                            Seleccione opción a cargar
                        </small>
                    </div>
                </div>
                <div class="file-selection-section col-lg-6 p-3 align-self-between" :style="{opacity: jQuery.isEmptyObject(moduleOption)? '0.5' : '1'}">
                    <div class="d-flex flex-column justify-content-between align-items-between h-100">
                        <div>
                            <h5>Paso 2. Seleccionar archivo de carga</h5>
                            <h6 class="text-muted">Seleccione el archivo a ser cargado de forma masiva en el sistema</h6>
                            <div class="custom-file form-group mb-3 mt-2">
                                <input type="file" class="custom-file-input" id="customFile" @change="processFile($event)" :disabled="jQuery.isEmptyObject(moduleOption)">
                                <label class="custom-file-label" for="customFile">Seleccione archivo a cargar</label>
                                <a type="button" class="small form-text d-flex align-items-center mb-2" href="https://www.fitubis.com/public/files/1.%20Plantilla%20carga%20demo.csv" target="_blank">
                                    Descargar archivo .csv de referencia
                                </a>
                            </div>
                        </div>
                        <div style="text-align:right">
                            <button class="btn btn-sm primary-color primary-text ml-auto col-auto" type="submit" :disabled="!csv">Procesar</button>
                        </div>
                    </div>
                </div>
        </div>
        <div id="load-progress-section" class="input-form filter-form mx-1 my-3 align-items-center" style="display:none;">
            <h5>Proceso de la carga</h5>
            <h6 class="text-muted">Archivo.csv</h6>
            <div class="progress">
                <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" :aria-valuenow="processedRows" aria-valuemin="0" :aria-valuemax="totalRows" :style="currentProgressWidth">{{ progress + "%"}}</div>
            </div>
            <div class="row my-3">
                <div class="processing-chart-section col-lg-6 border-right p-3 text-center">
                    <h6>Estadísticas del progreso</h6>
                    <canvas class="m-auto" id="processingChart" width="350" height="350"></canvas>
                </div>
                <div class="time-elapsed-section col-lg-6 p-3 text*center">
                    <h6>Tiempo transcurrido</h6>
                    <div class="text-center">
                        <h4>00:00 minutos</h4>
                    </div>
                    <hr>
                    <h6>Errores encontrados</h6>
                    <div style="height:300px;overflow:auto;">
                        <table id="query-result" class="query-result-table table table-striped table-bordered hover compact">
                            <thead class="primary-color primary-text">
                                <tr>
                                    <th>Número registro</th>
                                    <th>Código error</th>
                                    <th>Descripción</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="error in errors">
                                    <td>{{error.rowNumber}}</td>
                                    <td>{{error.code}}</td>
                                    <td>{{error.description}}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div class="text-right">
                <span class="text-muted mr-2" v-show="canceling">{{cancelCountdown}}.<a href="javascript:void(0)"> Forzar cancelación</a></span>
                <button class="btn btn-sm btn-danger ml-auto col-auto" type="button" @click="cancelProcessing" :disabled="canceling">Cancelar</button>
                <button class="btn btn-sm primary-color primary-text ml-auto col-auto" type="button" @click="location.reload()">Realizar otra carga</button>
                <button class="btn btn-sm primary-color primary-text ml-auto col-auto" type="button" @click="showMessage('Descargando UPLOAD_MOD_OPT_YYYYMMDDTHHMMSS-0500.csv')">Respaldar original</button>
                <a id="orga" class="d-none" href="https://www.fitubis.com/public/files/ORG_MOD_OPT_YYYYMMDDTHHMMSS+0400.csv"></a>
                <button class="btn btn-sm primary-color primary-text ml-auto col-auto" type="button" @click="showMessage('Descargando RESULT_MOD_OPT_YYYYMMDDTHHMMSS-0500.csv')">Descargar resultados</button>
            </div>
        </div>
    </div>
    `
})