var landing = Vue.component('landing',{
    data: function(){
        return {
            menu: menu,
            businessLogo: './img/business-logo.png',
            clientLogo: window.localStorage.getItem('client-logo')? window.localStorage.getItem('client-logo') : '',
            site: site,
            isDivisorVisible: false,
            sidemenu: [
                {OPCCOD: 'AZ001', OPCDES: 'Conciliación', OPCOPA: 'AZPA', OPCICO: './img/menu-icons/handshake.svg'},
                {OPCCOD: 'AZ001', OPCDES: 'Reportes', OPCOPA: 'AZPA', OPCICO:'./img/menu-icons/report.svg'},
                {OPCCOD: 'AZ001', OPCDES: 'Contracargos', OPCOPA: 'AZPA', OPCICO:'./img/menu-icons/chargeback.svg'},
                {OPCCOD: 'AZ001', OPCDES: 'Liquidación', OPCOPA: 'AZPA', OPCICO:'./img/menu-icons/money.svg'},
                {OPCCOD: 'AZ001', OPCDES: 'Reclamos', OPCOPA: 'AZPA', OPCICO:'./img/menu-icons/megaphone.svg'},
                {OPCCOD: 'AZ001', OPCDES: 'Transacciones presentadas', OPCOPA: 'AZPA', OPCICO:'./img/menu-icons/dial.svg'},
                {OPCCOD: 'AZ001', OPCDES: 'Mantenimiento', OPCOPA: 'AZPA', OPCICO:'./img/menu-icons/wrench.svg'},
                {OPCCOD: 'AZ001', OPCDES: 'Parámetros generales', OPCOPA: 'AZPA', OPCICO:'./img/menu-icons/mechanical-gears.svg'},
            ]
        }
    },
    methods: {
        showDate: function(){
            alert(`Today's date is: ${new Date().toLocaleString()}`);
        },
        toggleSideMenu: function(){
            let sidebar = $('#az-sidebar')
            sidebar.toggleClass('active')
        },
        logout: function(){
            axios({method: 'get', url: 'https://shorthaired-bush-pegasus.glitch.me/logout', withCredentials: true})
            .then((user)=>{
                this.$emit('logout')
            })
            .catch((err)=>{
               this.$emit('logout')
            })
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

        this.$EventBus.$on('changeView', ()=>{
            this.filtersVisible = !this.filtersVisible;
        })
        tippy('#user-panel', {
            allowHTML: true,
            interactive: true,
            placement: 'bottom-start',
            offset: [-20, 10],
            theme: 'translucent',
            trigger: 'mouseenter focusin click',
            content: document.getElementById('user-popover'),
          });
    }
    ,
    template: `
    <div class="page background-color d-flex flex-column justify-content-between" id="app">
        <header class="header container-fluid header-color header-text">
            <div class="row justify-content-between">
                <a href="javascript:void(0)" @click="$router.push('/')" style="padding:10px">
                    <img id="business-logo" src="./img/business-logo.png" alt="logo">
                </a>
                <div class="header-left-section d-flex align-self-end ml-auto" style="padding:10px">
                    <a id="user-panel">
                        <div class="user-image-holder"></div>
                    </a>
                    <div id="user-popover" class="user-popover" style="color:black">
                        <h5 class="mb-0" style="color:black">Hola, <b>Fernando</b></h5>
                        <div class="text-secondary" style="font-size:0.8rem">Lorem Inpsum - FSANCHEZ</div>
                        <div class="mt-2" style="font-size:0.8rem">Última conexión el {{new Date().toLocaleString()}}</div>
                        <hr class="w-100">
                        <div class="user-option">
                            <span class="font-weight-bold mt-2">Ajustes</span>
                        </div>
                        <div class="user-option">
                            <a href="javascript:void(0)">Preferencias</a>
                        </div>
                        <div class="user-option">
                            <a href="javascript:void(0)">Ayuda</a>
                        </div>
                        <div class="user-option">
                            <a href="javascript:void(0)">Términos y condiciones</a>
                        </div>
                        <div class="user-option">
                            <a href="javascript:void(0)">Acerca de Lorem Impsum</a>
                        </div>
                        <hr class="w-100">
                        <span class="change-language-box ml-auto">Cambiar idioma: <img class="change-language-flag" src="./img/spain-flag-icon-32.png" alt="change to spain"/><img class="change-language-flag"  src="./img/united-states-of-america-flag-icon-32.png" alt="change to english"/></span>
                        <hr class="w-100">
                        <div style="text-align: right">
                            <button @click="logout" class="logout ml-auto btn btn-primary btn-sm justify-content-end align-items-center">
                                <object class="logout-icon" data="./img/menu-icons/logout.svg" type="image/svg+xml"></object>
                                <span>Cerrar sesión</span>
                                </button>
                        </div>
                    </div>
                </div>
            </div>
        </header>
        <div v-show="isDivisorVisible" class="navigator container-fluid divisor-color divisor-text">
            <div class="navigator-content row justify-content-between align-items-center">
                <span class="location d-flex align-items-center">
                    <object class="navigation-icon" data="./img/menu-icons/location.svg" type="image/svg+xml"></object>
                    <span class="navigation">Usted está aqui: Menú principal</span>
                </span>
                <span class="change-language-box ml-auto">Cambiar idioma: <img class="change-language-flag" src="./img/spain-flag-icon-32.png" alt="change to spain"/><img class="change-language-flag"  src="./img/united-states-of-america-flag-icon-32.png" alt="change to english"/></span>
            </div>
        </div>
        <div class="container-fluid main-container flex-grow-1">
            <div class="row flex-grow-1">
                <div class="main-content-container col p-0">
                    <div class="welcome-message-container">
                        <h2 class="welcome-message text-muted">Welcome to Lorem Ipsum</h2>
                    </div>
                </div>
            </div>
        </div>
        <footer class="container-fluid d-none">
            <div class="row footer d-flex justify-content-between align-items-center">
                <span class="copyright">Prueba de concepto - ©{{new Date().getFullYear()}} Fernando Sánchez, todos los derechos reservados.</span>
                <img id="creator-logo" class="creator-logo" src="./img/CLAI-Payments.png" alt="">
            </div>
        </footer>
    </div>
    `
})

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