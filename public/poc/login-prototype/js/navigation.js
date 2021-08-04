var navigation = Vue.component('navigation', {
    data: function(){
        return {
            menu: [],
            locations: [
                {name: 'Menu principal', path: '/', icon: 'javascript:void(0)'}
            ],
            operations: [],
            filterActive: false,
            helpActive: false
        }
    },
    methods: {
        findMenuRoute(routeName, menu, locations){
            let newLocations = locations || [];
            
            if(routeName){

                for(let option in menu){
                    if(menu[option].action == routeName){
                        newLocations.push(menu[option])
                        break;
                    }else{
                        if(typeof menu[option].action != 'string'){
                            newLocations.push(menu[option])
                            newLocations = this.findMenuRoute(routeName, menu[option].action, newLocations)
                            if(newLocations.length != 0){
                                break;
                            }else{
                                newLocations = []
                            }
                        }
                    }
                }
            }
            return newLocations.filter((location)=> !location.isCategory);
        },
        toggleFilter(){
            this.helpActive = false
            this.filterActive = !this.filterActive
            this.$EventBus.$emit('toggleFilterSection')
        },
        toggleHelp(){
            this.filterActive = false
            this.helpActive = !this.helpActive
            this.$EventBus.$emit('toggleHelpSection')
        },
        getMenu(){
            let menuTree = JSON.parse(localStorage.getItem('menu'))
            if(!menuTree){
                menuTree = menu;
                localStorage.setItem('menu', JSON.stringify(menuTree));
            }
            return menuTree;
        },
        getNavigationItem(menuItem){

        }
    },
    mounted(){
        this.menu = this.getMenu();
        this.locations = this.findMenuRoute(this.$route.name,this.menu, this.locations);

        this.$EventBus.$on('toolboxOperationChange', (operations)=>{
            this.operations = operations
          })
    },
    watch: {
        '$route': function(){
            this.menu = this.getMenu();
            this.locations = this.findMenuRoute(this.$route.name,this.menu, [{name: 'Menu principal', path: '/', icon: 'javascript:void(0)'}]);
        }
    },
    template: `
        <div class="navigation-panel d-flex justify-content-between">
            <div>
                <span v-for="(location, index) of locations" class="location-container" :class="{ active :index == locations.length - 1}">
                    <i class='d-none bx bx-radar icon current-location-icon' v-if="index == locations.length - 1"></i>
                    <!-- <object class="icon current-location-icon" v-if="index == locations.length - 1" type="image/svg+xml" v-bind:data="location.icon"></object> -->
                    <a class="location-hyperlink" href="javascript:void(0)" @click="$router.push(location.path)">
                        <span>{{location.name}}</span>
                    </a>
                    <span v-if="index != locations.length - 1" class="location-separator">></span>
                </span>
            </div>
            <span v-show="operations.find((operation)=> operation == 'filter')" class="toolbox">
                <button class="btn toolbox-button"><i class='bx bx-star' ></i></button>
                <button class="btn toolbox-button"><i class='bx bx-export'></i></button>
                <button class="btn toolbox-button" :class="{'active': filterActive}" @click="toggleFilter"><i class='bx bx-filter-alt'></i></button>
                <button class="btn toolbox-button" :class="{'active': helpActive}" @click="toggleHelp"><i class='bx bx-help-circle' ></i></button>
            </span>
        </div>
    `
})