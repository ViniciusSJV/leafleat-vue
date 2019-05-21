<template>
  <div class="login-wrap">
    <div class="login-html">
        <h1 class="tab">Sign in</h1>
        <ul v-if="errors" class="error-messages">
          <li
            v-for="(v, k) in errors"
            :key="k">
            {{ v | error }}
          </li>
        </ul>
        <form class="login-form" v-on:submit.prevent="onSubmit(username, password)">
          <div class="form-group">
            <div class="group">
              <label for="user" class="label">Usuario</label>

              <input
                id="user"
                class="input"
                type="text"
                autocomplete="current-password"
                v-model="username">
            </div>

            <div class="group">
              <label for="pass" class="label">Senha</label>

              <input
                id="pass"
                class="input"
                type="password"
                autocomplete="new-password"
                v-model="password">

            </div>

            <div class="group">
              <input type="submit" class="button" value="Entrar">
            </div>

          </div>
        </form>

        <div class="hr"></div>

        <div class="foot-lnk">
          <a href="#forgot">Esqueceu a senha?</a>
        </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'RwvLogin',
  data () {
    return {
      username: null,
      password: null
    }
  },
  computed: {
    ...mapGetters([
      'errors'
    ])
  },
  methods: {
    ...mapActions([
      'LOGIN',
      'FORM_ERROR'
    ]),
    onSubmit (username, password) {
      if (!username) {
        this.FORM_ERROR({user_error: 'Informe o usuario'})
        return
      }
      if (!password) {
        this.FORM_ERROR({password_error: 'Informe a senha'})
        return
      }
      this.LOGIN({ username, password })
        .then(() => this.$router.push({ name: 'home' }))
    }
  }
}
</script>

<style scope>

  .login-wrap {
      width: 525px;
      height: 535px;
      margin: 25px auto;
      max-width: 525px;
      min-height: 535px;
      position: relative;
      color: #6a6f8c;
      background: #c8c8c8;
      font: 600 16px/18px 'Open Sans',sans-serif;
      background: url(http://www.alfalog.com.br/armazens/imagens/informacoes/area-armazenagem-01.jpg) no-repeat center;
      box-shadow: 0 12px 15px 0 rgba(0,0,0,.24), 0 17px 50px 0 rgba(0,0,0,.19);
  }

  .login-html {
    width: 385.5px;
    position: absolute;
    padding: 90px 70px 50px 70px;
    background: rgba(40, 57, 101, 0.93);
  }

  .login-html .tab {
    font-size: 22px;
    margin-right: 15px;
    padding-bottom: 5px;
    margin: 0 15px 10px 0;
    display: inline-block;
    color: #fff;
    border-bottom: 2px solid #1161ee;
  }

  .login-form .group {
    margin-bottom: 15px;
  }

  .login-form .group .label, .login-form .group .input, .login-form .group .button {
    width: 100%;
    color: #fff;
    display: block;
  }

  .login-form .group .label {
    color: #aaa;
    font-size: 12px;
  }

  .login-form .group .input, .login-form .group .button {
    border: none;
    padding: 15px 20px;
    border-radius: 25px;
    background: rgba(255,255,255,.1);
  }

  .login-form .group .input {
    width: 345px;
  }

  .login-form .group .button {
    background: #1161ee;
    margin-top: 45px;
    cursor: pointer;
  }

  .hr {
    height: 2px;
    margin: 60px 0 50px 0;
    background: rgba(255,255,255,.2);
  }

  .foot-lnk {
    text-align: center;
  }

  .foot-lnk a {
    color: inherit;
    text-decoration: none;
  }

  .foot-lnk a:hover {
    color: #ffffffe3;
  }

</style>
