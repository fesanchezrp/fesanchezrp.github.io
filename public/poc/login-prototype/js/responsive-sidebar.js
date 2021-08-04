Vue.component('responsive-sidebar',{
    data: function(){
        return {}
    },
    methods: {
        changeView(){
                this.$EventBus.$emit('changeView', {name: 'Liquidación', description: 'Intercambio de valores / participaciones en valores', iconUrl: './img/menu-icons/money.svg', status: 1, action: {
                        'LIQUIPRO': {name: 'Procesamiento', description: '', iconUrl: './img/menu-icons/mechanical-gears-primary.svg', status: 0, isCategory: true, action: {
                            'ENT':{name: 'Gestión de Entidades', description: 'Gestione las entidades registradas en el sistema', iconUrl: './img/menu-icons/entities.svg', status: 0, action: 'entities'},
                            'DIS':{name: 'Liquidación de Comercios', description: 'Realice pagos a los comercios gestionados', iconUrl: './img/menu-icons/commerce-disbursement.svg', status: 0, action: ''},
                            'LIQ':{name: 'Generación de Pagos', description: 'Genere pagos, y administre su enturamiento', iconUrl: './img/menu-icons/payment-generation.svg', status: 0, action: ''},
                
                        }},
                        'LIQUICON': {name: 'Consultas y Reportes', description: '', iconUrl: './img/menu-icons/search.svg', status: 0, isCategory: true, action: {
                            'CONCOB':{name: 'Consulta de Cobros', description: 'Consulte los cobros dentro del sistema', iconUrl: './img/menu-icons/collection-search.svg', status: 0, action: ''},
                            'CONPA':{name: 'Consulta de Pagos', description: 'Consulte los pagos dentro del sistema', iconUrl: './img/menu-icons/payment-search.svg', status: 0, action: ''},
                            'LIQCON':{name: 'Transacciones por Liquidar', description: 'Verifique las transacciones pendientes por liquidar', iconUrl: './img/menu-icons/disbursement-transactions.svg', status: 0, action: ''},
                
                        }},
                    }, isOnMainMenu: true})
        }
    },
    mounted: function(){
        let toggleSidebarButton = document.querySelector('#sidebar-toggle-button')
        let sidebar = document.querySelector('.responsive-sidebar')
        let searchButton = document.querySelector('.bx-search')
        toggleSidebarButton.onclick = function(){
            sidebar.classList.toggle('active');
        }

        searchButton.onclick = function(){
            sidebar.classList.toggle('active');
        }      
    },
    template: `
        <div class="responsive-sidebar">
           <div class="logo-container">
                <div class="logo">
                        <!-- <i class='bx bxl-c-plus-plus' ></i> -->
                        <div class="logo-name">Menú</div>
                </div>
                <i class='bx bxl-c-plus-plus' id="sidebar-toggle-button"></i>
           </div>
           <ul class="nav-list">
                <li>
                        <i class='bx bx-search' ></i>                             
                        <input type="text" name="sidebar-search" id="sidebar-search-input" placeholder="Buscar...">
                        <span class="link-tooltip">Buscar</span>
                </li>
                <li>
                        <a href="#">
                             <i class='bx bx-cog' ></i>
                             <span class="link-name">Configuración</span>
                             <span class="link-tooltip">Configuración</span>
                        </a>
                </li>
                <li>
                        <a href="#">
                                <i class='bx bxs-hand'></i>
                             <span class="link-name">Conciliación</span>
                             <span class="link-tooltip">Conciliación</span>
                        </a>
                </li>
                <li>
                        <a href="#">
                                <i class='bx bx-radar'></i>
                             <span class="link-name">Módulo Adquiriencia</span>
                             <span class="link-tooltip">Módulo Adquiriencia</span>
                        </a>
                </li>
                <li>
                        <a href="javascript:void(0)" @click="$router.push(location.path)">
                                <i class='bx bx-money' ></i>
                             <span class="link-name">Liquidación</span>
                             <span class="link-tooltip">Liquidación</span>
                        </a>
                </li>
                <li>
                        <a href="#">
                                <i class='bx bx-speaker' ></i>
                             <span class="link-name">Reclamos y controversias</span>
                             <span class="link-tooltip">Reclamos y controversias</span>
                        </a>
                </li>
           </ul>
           <ul class="nav-list clai-logo-container">
                <li>
                        <a class="w-100">
                                <img class="ml-auto" src="./img/CLAI-left.png">
                                <span class="link-name mr-auto"><img src="./img/CLAI-right.png"></span>
                        </a>
                </li>
           </ul>
        </div>
    `
})