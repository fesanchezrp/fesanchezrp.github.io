var customizeApplication = Vue.component('customize-application',{
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