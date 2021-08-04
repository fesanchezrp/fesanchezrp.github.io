
var helpEditor = Vue.component('help-editor', {
    data: function(){
        return {
            subfile: [],
            filtersVisible: false,
            module: '',
            option: '',
            editor: null
        }
    },
    methods: {
      changeSelectedModule(module){
        $('#editorjs').empty()
        this.option = ''

      },
      changeSelectedOption(option){
        let data = JSON.parse(localStorage.getItem(option)) || {}
        $('#editorjs').empty()
        console.log(data)
        this.editor = new EditorJS({
          tools: {
            header: Header,
            // attaches: {
            //   class: AttachesTool,
            //   config: {
            //     endpoint: 'http://localhost:8008/uploadFile'
            //   }
            // },
            // image: {
            //   class: ImageTool,
            //   config: {
            //     endpoints: {
            //       byFile: 'http://localhost:8008/uploadFile', // Your backend file uploader endpoint
            //       byUrl: 'http://localhost:8008/fetchUrl', // Your endpoint that provides uploading by Url
            //     }
            //   }
            // }
          },
          data: data,
          readOnly: false
        })
      },
      showEntityDetails: function(parm1, entity){
        this.$router.push({path: `/entities/${entity.LCMCOD}`})
      },
      saveHelp(){
        this.editor.save().then((outputData) => {
          localStorage.setItem(this.option, JSON.stringify(outputData))
          Swal.fire({
            icon: 'success',
            title: 'Ayuda guardada con éxito',
            showConfirmButton: false,
            timer: 1300
          })
        }).catch((error) => {
          console.log('Saving failed: ', error)
        });
      }
    },
    computed: { 
        headers() {
            /*
            if(this.show_section){
                return ['ALN0252', 'ALN0259','ALN0160','ALN0209'].map(ml400 => ({ ml400 , sortable: true }))
            }*/
            return ['Tipo de entidad', 'Número de documento','Código de entidad', 'Descripción',' Razón Social']
            // ml400.labels.ALN0046
            /*return [
                {text:this.ml400.labels.AWL0072, value: 'LRLRED'}, 
                {text:this.ml400.labels.AWL0020, value: 'LRLDSC'}, 
                {text:this.ml400.labels.AWL0301, value: 'VROL'},
                
            ]*/
            
        },
        dataTable() {
            const props = {
                style: "cursor:pointer;"
            }
            
            return this.subfile.map(data =>  {
                        let base = {
                            props,
                            click: 'clickEvent',
                            td_class: data.VROL == 'ORIGEN' || data.VROL == 'AMBOS'  ? 'menuOrigen' : 'menuDestino',
                            parms: {
                                LCMCOD: data.LCMCOD,
                                LCMDES: data.LCMDES,
                                LCMRUC: data.LCMRUC,
                                DESTDE1: data.DESTDE1
                            },        
                        }
                        let columns = [
                           { value: data.DESTDE1, ...base},
                           { value: data.LCMRUC, ...base},                        	
                            { value: data.LCMCOD, ...base},
                            { value: data.LCMDES, ...base},                        	
                            { value: data.LCMRSO, ...base},

                        ]
                        if(!this.show_section){
                            //columns.push({ value: data.VROL, ...base})
                        }
                        return columns
                        
            }); 
            
        },
    },
    mounted: function(){
        this.subfile = [
        ]

        this.$EventBus.$emit('toolboxOperationChange', [])

    },
    template: `<div class="row">
    <h4 class="w-100">Editor de ayuda</h4>
    <div class="col-12 pl-0">
      <form class="form-inline">
          <div class="form-group">
            <label class="mr-2" for="module">Módulo</label>
            <select class="form-control form-control-sm" v-model="module" name="module" id="module" @change="changeSelectedModule">
              <option value=""></option>
              <option value="CON">Conciliación</option>
              <option value="CTR">Contracargos</option>
              <option value="LIQ">Liquidación</option>
              <option value="REC">Reclamos</option>
              <option value="CON">Configuración</option>
            </select>
          </div>
          <div class="ml-2 form-group">
            <label class="mr-2" for="option">Opción</label>
            <select style="width:200px;" v-model="option" @change="changeSelectedOption($event.target.value)" class="form-control form-control-sm" name="module" id="module" >
              <option value=""></option>
              <option value="GEN" v-if="module == 'LIQ'">Gestión de entidades</option>
              <option value="AEN" v-if="module == 'LIQ'">Adicionar entidad</option>
            </select>
          </div>
      </form>
    </div>
    <div class="editor col-6" id="editorjs">

    </div>
    <div class="w-100 mt-2 d-flex align-items-center">
      <button class="btn btn-primary" @click="saveHelp"><i class='bx bx-export'></i>
        Publicar</button>
    </div>
</div>  
    `
})