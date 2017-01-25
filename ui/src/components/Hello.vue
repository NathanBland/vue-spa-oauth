<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>Login</h2>
    <button @click="oauthpopup">Login with twitter</button>
  </div>
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods: {
    oauthpopup () {
      let windowName = 'ConnectWithOAuth' // should not include space for IE
      let windowOptions = 'location=0,status=0,width=800,height=400'
      // let reloadLocation = () => { window.location.reload() }
      // log(options.path)
      this.oauthWindow = window.open('/api/auth/twitter', windowName, windowOptions)
      this.oauthInterval = window.setInterval(() => {
        if (this.oauthWindow.closed) {
          window.clearInterval(this.oauthInterval)
          console.log('window closed, we could do something else here if we wanted to..')
          // reloadLocation()
        }
      }, 1000)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
