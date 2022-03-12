<template v-cloak>
  
 <div>
   <button @click="connect" v-if="account == 0">connect</button>
   <button v-else>yey you are connected</button>
  </div>  

<div>
  <button v-if="hasAccess && account.length > 0" @click="download">DOWNLOAD</button>
  <button v-else-if="canBuy & account.length > 0" @click="buy">BUY FOR 0.01 ETH</button>
  <button v-else>SORRY YOU CANNOT BUUY</button>
</div>

Can Buy ??:  {{canBuy}}

<div >{{totalSales}} / 100 Sold</div>

<div>{{checkAccess()}}</div>

</template>

<script>
import { web3, contract, signDownloadMessage } from '../lib/web3'

export default {
  name: 'App',
  components: {},
  data(){
    return {
      contract,
      web3,
      signDownloadMessage,
      canBuy: false,
      totalSales: 0,
      account: [],
      hasAccess: false
    }
  },
  created() {
    this.setAccountIfAlreadyConnected()
  },
  mounted() {
    this.addAccountChangeListener();
    this.fetchCanBuy();
  },
  methods: {
    connect() {
      //when button is clicked, grab the crypto wallet account
      //run a function with a promise to set the account
      window.ethereum
        .request({method: "eth_requestAccounts"})
        .then(response => {
          this.account = response;
        });
    },
    addAccountChangeListener() {
      //grab the crypto wallet account that is already connected 
      //if there is one, run a function with a promise to set the account
      window.ethereum
        .on("accountsChanged", this.setAccountIfAlreadyConnected)
    },
    setAccounts() {
      
    },
    setAccountIfAlreadyConnected() {
      //grab the crypto wallet account if there is already one connected 
      //if there is one, run a function with a promise to set the account
      window.ethereum
        .request({method: "eth_accounts"})
        .then(response => {
          this.account = response;
        });
    },
    fetchCanBuy() {
      this.contract.methods.canBuy().call()
        .then(response => {
          console.log(response);
            this.canBuy = response;
        });

      this.contract.methods.totalSales().call() //send writes // call reads
        .then(response => {
            this.totalSales = response;
        });
    },
    async buy() {
      if (this.account.length > 0) {
        try {
          await this.contract.methods.buy().send({
            from: this.account[0], 
            value: this.web3.utils.toWei("0.01", "ether")
          })
          
          this.checkAccess();
          this.fetchCanBuy();

        } catch (e) {
          alert(e)
        }  
      } else {
        console.log('you are not logged in')
      }
    },
    checkAccess() {
      if (this.account > 0) {
        this.contract.methods.hasAccess().call({from: this.account[0]})
        .then(response => {
            this.hasAccess = response;
        });
      }else {
        this.hasAccess = false;
      }
    },
    async download() {
      if (this.account.length > 0) {
        await this.web3.eth.personal.sign(this.signDownloadMessage, this.account[0]);
      } else {
        alert("must be logged in")
      }
    }
  }
}
</script>



<style>
[v-cloak] { display: none !important}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}


</style>
