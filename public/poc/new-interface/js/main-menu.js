var mainMenu = Vue.component('main-menu', {
    props: ['menu', 'currentMenu', 'previousMenu'],
    data: function(){
        return {
            menuHistory: []
        }
    },
    template: `
        <div>
            <div class="menu row no-gutters justify-content-start align-items-end">
                <div v-for="option in currentMenu" class="col-auto text-center" :class="{'w-100':!(typeof option.action == 'string' || (option.action != 'string' && option.isOnMainMenu))}">
                    <template v-if="typeof option.action == 'string' || (option.action != 'string' && option.isOnMainMenu)">
                        <a v-on:click="changeView($event, option)" class="menu-item btn primary-color">
                            <object class="menu-icon" type="image/svg+xml" v-bind:data="option.iconUrl"></object>
                            <div class="text-left">
                                <div class="menu-name primary-text">{{option.name}}</div>
                                <p class="option-description primary-text">{{option.description}}</p>
                            </div>
                        </a>
                    </template>
                    <template v-else>
                        <h5 class="menu-name menu-category-name w-100"><object class="menu-icon menu-category-icon" type="image/svg+xml" v-bind:data="option.iconUrl"></object><span>{{option.name}}</span></h5>
                        <div class="menu row no-gutters justify-content-start align-items-end">
                            <div v-for="optionitem in option.action" class="col-auto text-center">
                                <a v-on:click="changeView($event, optionitem)" class="menu-item btn primary-color">
                                    <object class="menu-icon" type="image/svg+xml" v-bind:data="optionitem.iconUrl"></object>
                                    <div class="text-left">
                                        <div class="menu-name primary-text">{{optionitem.name}}</div>
                                        <p class="option-description primary-text">{{optionitem.description}}</p>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </template>
                </div>
            </div>
            <div class="container-fluid menu-action-container">
                <button v-show="menuHistory.length != 1" class="btn btn-primary" @click="returnTo">Atras</button>
            </div>
        </div>
    `,
    methods: {
        changeView: function(event, option){
            comp = this
            if(option.action){
                this.menuHistory.push(this.currentMenu)
                if(typeof option.action == 'string'){
                    this.$router.push(option.action);
                }else{
                    this.currentMenu = option.action;
                    if(window.localStorage.getItem('palette')){
                        setTimeout(function(){comp.$emit('change-palette', 'all')},500);
                    }
                }
            }
        },
        returnTo: function(){
            this.currentMenu = this.menuHistory.pop();
            this.previousMenu = null
        }
    },
    mounted: function(){
        this.currentMenu = menu
        this.menuHistory.push(this.currentMenu)
        this.$EventBus.$emit('toolboxOperationChange', [])
    }
});