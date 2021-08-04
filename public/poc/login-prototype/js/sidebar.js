/*<!--Autoriza7 V5 - Copyright CLAI Ltda.(C) 1993-2020.             -->
<!-------------------------------------------------------------------->
<!-- AZ-SIDEBAR-MENU                                                -->
<!----------------------------------------------------------------- -->
<!--Sec.  Ingeniero                    Fecha           Proyecto     -->
<!--CL00  Alvaro Vargas Vargas        20-May-2020      Q           -->
<!-------------------------------------------------------------------->*/
Vue.component('sidebar', {
    data(){
        return{
            options:[]
        }
    },
    methods: {
        sendSontoFather(params){
            this.$emit('soncodeoption', params);
            console.log(params);
        },
        sort_options(){
            this.options = this.arropcs;
            let parents = []
            let aux = []
            this.options.forEach(el => {
                aux.push({...el, SONS:[]})
            });
                for (let i = 0; i < this.options.length; i++) {
                    let sons = []
                    for (let j = 0; j < this.options.length; j++) {
                        let parent_code = this.options[i].OPCCOD  
                        let son_code = this.options[j].OPCOPA            
                        if( parent_code === son_code){                        
                            sons.push(this.options[j])
                            aux = aux.filter(el=> this.options[j].OPCCOD !== el.OPCCOD )              
                        }                                       
                    }
                    if(sons.length>0){
                        parents.push({...this.options[i], SONS: sons})  
                        aux = aux.filter(el=> this.options[i].OPCCOD !== el.OPCCOD )     
                    }              
                }                
            
            let vaux = aux.concat(parents)
            this.options = vaux
        },
        closeSession(){
      	  localStorage.clear()                  	
          sessionStorage.clear()
      	  window.location.assign("https://azclear.site.claipayments.com:8000/")
        }        
    },
    props:['arropcs', 'title'],
    watch: {
        'arropcs': function(){
            let labels = []
            this.arropcs.forEach(el => {
                labels.push(el.OPCDES)
            });
            if(this.arropcs.length > 0){
                this.sort_options()
            }           
        },
        'title': function(){
            let labels = [this.title]
        }
    },
    mounted() {
        $('.list-unstyled-sb').css('max-height', ($(window).height()-145));
        this.sort_options()
    },
    mixins:[],		
	template: //html 
		`
	<!-- Sidebar  -->
        <nav id="az-sidebar" class="active">
            <div class="az-sidebar-header">
                <h3 class="ML400"></h3>
            </div>

            <ul class="list-unstyled-sb az-scroll">
                <li v-for="arrop in options">
                    <a style="cursor: pointer"  @click="sendSontoFather({vopcpad: arrop.OPCCOD})" class="a-sidebar" v-if="arrop.SONS.length == 0">
                        <span><object class="sidebar-item-icon" type="image/svg+xml" :data="arrop.OPCICO"></object></span><span class="ML400">{{arrop.OPCDES}}</span>
                    </a>
                    <a style="cursor: pointer; text-decoration: none" :href="'#'+arrop.OPCCOD+'submenu'" data-toggle="collapse" aria-expanded="false" 
                        class="dropdown-toggle az-dropdown" v-if="arrop.SONS.length > 0" >
                        <span class="ML400">{{arrop.OPCDES}}</span>
                    </a>
                    <ul class="collapse list-unstyled" :id="arrop.OPCCOD+'submenu'">
                        <li v-for="son in arrop.SONS">
                            <a style="cursor: pointer;" @click="sendSontoFather({vopcpad: son.OPCCOD})">
                                <span class="ML400">{{arrop.OPCDES}}</span>
                            </a>
                        </li>
                    </ul>
                </li>
            </ul>
        </nav>
	`
});