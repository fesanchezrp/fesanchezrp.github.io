
var helper = Vue.component('helper', {
    props: ['readOnly'],
    data: function(){
        return {
            subfile: [],
            filtersVisible: false,
            editor:  new EditorJS({
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
              data: JSON.parse(localStorage.getItem('GEN')) || {},
              readOnly: this.readOnly? true: false
            })
        }
    },
    methods: {
      showEntityDetails: function(parm1, entity){
        this.$router.push({path: `/entities/${entity.LCMCOD}`})
      },
      saveHelp(){
        this.editor.save().then((outputData) => {
          localStorage.setItem('help', JSON.stringify(outputData))
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
        this.$EventBus.$emit('toolboxOperationChange', [])

    },
    template: `<div class="row">
    <div class="col-12" id="editorjs">

    </div>
</div>  
    `
})