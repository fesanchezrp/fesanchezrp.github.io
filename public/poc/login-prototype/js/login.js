Vue.component('login', {
    data : function(){
        return {
            loginErrorMessage: '',
            identityProviders: {
                google: 'https://shorthaired-bush-pegasus.glitch.me/login/google'
            }
        }
    },
    methods: {
        signIn(identityProvider){
            window.location.href = identityProvider
        }
    },
    template: `
    <div class="login-background">
        <div class="login-form" @submit.prevent="">
            <img class="product-logo-login" src="./img/business-logo.png" alt="Business Logo">
            <h4 class="font-weight-bold">Login</h4>
            <p class="text-muted mt-4">
                Use one of the following methods to sign-in to Lorem Ipsum:
            </p> 
            <div class="additional-controls text-center m-2">
                <button type="button" class="login-with-google-btn" @click="signIn(identityProviders.google)">
                Sign in with Google
                </button>
            </div>
        </div>
    </div>    
    `
})