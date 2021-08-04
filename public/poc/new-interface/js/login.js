Vue.component('login', {
    data : function(){
        return {
            loginErrorMessage: ''
        }
    },
    template: `
    <div class="login-background">
        <div class="login-form" @submit.prevent="$emit('login')">
            <img class="product-logo-login" src="./img/reconprime-logo.png" alt="Reconprime Product Logo">
            <div class="alert alert-danger" role="alert" v-if="loginErrorMessage">
                {{loginErrorMessage}}
            </div>
            <form class="py-2">
                <div class="form-group">
                    <label for="username">Nombre de usuario</label>
                    <input type="text" name="username" id="username" class="form-control">
                </div>
                <div class="form-group">
                    <label for="password">Contraseña</label>
                    <input type="password" name="password" id="password" class="form-control">
                </div>
                <div class="text-center">
                    <button class="btn btn-primary" type="submit"><i class="bi bi-box-arrow-in-right mr-2"></i>Ingresar</button>
                </div>
            </form>
            <div class="additional-controls text-center">
                <a href="javascript:void(0)">¿Olvidó su contraseña?</a>
            </div>
        </div>
    </div>    
    `
})