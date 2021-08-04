var reporter = Vue.component('reporter', {
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
            scrollY: 300,
            fixedHeader: true,
            lengthMenu: [3, 5, 10, 50, 70],
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