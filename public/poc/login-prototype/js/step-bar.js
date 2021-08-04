/**/
const stepBar = Vue.component('step-bar', {
    props: ['totalSteps', 'currentStep'/*, 'stepTitles'*/],
    data () {
      return {
          //currentStep: 1,
    	  //totalSteps: 0,
          stepTitles: ['']
      }
    },
    methods: {
      changeCurrentStep: function(newStep) {

    	  
          if (newStep < 0) {
              this.currentStep = 0;
          } else if (newStep > (this.totalSteps + 1)) {
              this.currentStep = this.totalSteps + 1;
          } else {
              this.currentStep = newStep;
          }
      },
      fnClick: function(i){
    	  this.$emit('paso',i)
      },            
      updateProgressBar: function() {

    	  
          var totalCompletedSteps = this.currentStep > this.totalSteps ? this.totalSteps : (this.currentStep <= 0 ? 0 : (this.currentStep - 1));
          
          for(var i = 1; i <= this.totalSteps; i++) {
              var stepCircleElement = this.$refs['step-circle-' + i][0];
              if (i == this.currentStep) {
                  stepCircleElement.classList.add("current-step-circle");
                  stepCircleElement.classList.remove("completed-step-circle");
                  stepCircleElement.classList.remove("not-started-step-circle");
              } else if ( i <= totalCompletedSteps) {
                  stepCircleElement.classList.add("completed-step-circle");
                  stepCircleElement.classList.remove("current-step-circle");
                  stepCircleElement.classList.remove("not-started-step-circle");
              } else {
                  stepCircleElement.classList.add("not-started-step-circle");
                  stepCircleElement.classList.remove("completed-step-circle");
                  stepCircleElement.classList.remove("current-step-circle");
              }
          }
          var propgressBarInPercent = totalCompletedSteps == this.totalSteps ? 100 : (totalCompletedSteps*100/(this.totalSteps - 1));
          $('.progress-bar').css('width', propgressBarInPercent + '%');
          var stepTitle = this.stepTitles[this.currentStep - 1];
          this.$refs.stepTitleRef.innerHTML = stepTitle == undefined ? "" : stepTitle;
      }
    },
    computed:{
	
    	stylepro(){
    		return {
    			'height': '10px',
    			'position': 'relative',
    			'overflow': 'visible',
    			'background-color': '#aaa'
    		}
    	},
    	stylebar (){
    			return{
    			'background-color': '#003366'
    			}
    		},
    	stylestep(){
    		return {
				'border-style': 'solid',
				'border-width': '3px',
				'background': '#ffffff',
				'position': 'absolute',
				'display': 'table-cell',
				'height': '36px',
				'width': '36px',
				'text-align': 'center',
				'vertical-align': 'middle',
				'border-radius': '50%',
				//'font': '18px josefin sans, arial',
				'text-align': 'center',
				'margin-top': '0px',
				'padding-top': '5px',
				'margin-left': '-5px'
    		}
    	}
    },
    mounted() {
      this.$nextTick(function() {
         this.updateProgressBar();
      });
    },
    watch: {
      currentStep: function() {
          this.updateProgressBar();
      },

    },
    template : /*html */ `
    <div class="step-progress-bar container mt-4">
      <div class="container row">
          <div class="col">
              <div class="progress" >
                  <div class="progress-bar"  role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100">
                      <div v-for="i in totalSteps" v-bind:key="i" 
                           v-bind:ref="'step-circle-' + i"
                           v-bind:class="['step-circle', 'not-started-step-circle']"
                           v-bind:style="{left: ((i-1) * 100/(totalSteps-1)) + '%'}"
                           @click="fnClick(i)"
                           style="cursor:pointer;"
                      >
                           {{i}}
                      </div>
                  </div>
              </div>
          </div>
      </div>
      <h4 ref="stepTitleRef" class="step-title-header mt-4 text-center font-weight-bold mx-auto"></h4>
  </div>
  `
});