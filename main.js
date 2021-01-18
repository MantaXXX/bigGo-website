(function () {
  const store = Vue.createApp({
    data() {
      return {
        search: '',
        stores: null,
        storesAmount: null,
        matchedStores: '',
        clearBtn: false,
        suggestion: false,
        chosenStore: '',
        height: 'height: 15em',
      }
    },
    mounted() {
      axios
        .get('biggo_sitetype.json')
        .then(res => {
          this.stores = Object.values(res.data)
          this.storesAmount = this.stores.length
        })
        .catch(error => console.log(error))
    },
    watch: {
      // 監聽 input 事件被觸發，立即反饋
      search() {
        this.fasterSearch()
      }
    },
    methods: {
      fasterSearch() {
        // 清除鈕顯示
        if (this.search !== '') {
          this.clearBtn = true
          let regExp = new RegExp(this.search, 'i')
          this.matchedStores = this.stores.filter(stores => stores.item.name.match(regExp))
          this.storesAmount = this.matchedStores.length
          // this.chosenStore = ''
        } else {
          this.clearBtn = false
          this.matchedStores = ''
          this.chosenStore = ''
          this.height = ''
        }
      },
      // 清除搜尋
      clearSearch() {
        this.search = ''
      },
      chooseStore(e) {
        this.chosenStore = e
        this.search = e.item.name
        this.suggestion = false
      },
      modal(e) {
        let modal = document.getElementsByClassName('modal')
        if (e.target !== modal) {
          this.suggestion = false
        }
      }
    },
    computed: {
      // 商店渲染
      displayStores() {
        if (this.search === '') {
          return this.stores
        } else return this.matchedStores
      },
      suggestedKeyword() {
        if (this.matchedStores !== '' && this.chosenStore === '') {
          this.suggestion = true
          if (this.storesAmount < 10) {
            this.height = ''
          } else if (this.storesAmount > 10) {
            this.height = 'height: 15em'
          }
        }
        return this.matchedStores
      },
    }
  })
  store.mount("#storeContainer")
})()