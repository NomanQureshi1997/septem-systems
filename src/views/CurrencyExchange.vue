<template>
  <!-- Container for status layout -->
  <div id="main-layout">
    <div id="child-layout">
      <h2>Exchange Rate</h2>
      <div class="input-style" id="from">
        <input type="number" v-model="exchangeFromValue" />
        <div class="vl"></div>
        <select id="currencyDropdown" v-model="exchangeFrom">
          <option v-for="(currency, index) in currenciesList" :key="index" :value="currency.code">
            {{ currency.name }} {{ currency.code }}
          </option>
        </select>
      </div>
      <div class="input-style" id="to">
        <input readonly type="number" v-model="exchangeTOValue" />
        <div class="vl"></div>
        <select aria-readonly="true" id="currencyDropdown" v-model="exchangeTO">
          <option v-for="(currency, index) in currenciesList" :key="index" :value="currency.code">
            {{ currency.name }} {{ currency.code }}
          </option>
        </select>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import axios from 'axios'
import currencies from './currencies.js'

export default {
  setup() {
    const currenciesList = currencies
    return {
      exchangeFrom: ref({}),
      exchangeTO: ref({}),
      exchangeFromValue: ref(0),
      exchangeTOValue: ref(0),
      currenciesList,
      conversionRate: ref(0)
    }
  },
  methods: {
    async conversion(from, to, amount) {
      try {
        const response = await axios.get(
          `https://v6.exchangerate-api.com/v6/ad1f1f8b9388aa759ca78093/pair/${from}/${to}/${amount}`
        )
        if (response.data.result == 'success') {
          this.exchangeTOValue = response.data.conversion_result
          this.conversionRate = response.data.conversion_rate
        }
      } catch (error) {
        console.error('Error fetching exchange rates:', error)
      }
    },
    watchFuncation() {
      if (this.exchangeFromValue > 0 && this.exchangeFrom && this.exchangeTO) {
        this.conversion(this.exchangeFrom, this.exchangeTO, this.exchangeFromValue)
      }
    }
  },
  watch: {
    exchangeFromValue() {
      this.watchFuncation()
    },
    exchangeFrom() {
      this.watchFuncation()
    },
    exchangeTO() {
      this.watchFuncation()
    }
  }
}
</script>

<style scoped>
/* Styling for status layout */
#main-layout {
  position: relative;
}
#child-layout {
  width: 70%;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}

.input-style {
  /* width: 50%; */
  height: 44px;
  border: 1px solid #dadce0;
  border-radius: 4px;
  display: flex;
}
#from {
  margin: 50px 0px;
}
#to {
  margin: 50px 0px;
}
.vl {
  border-left: 2px solid #dadce0;
  height: auto;
}
input,
select {
  border: none;
}
input {
  font-size: 22px;
  padding-left: 11px;
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
  width: 100%;
}
select {
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
  width: 100%;
}
</style>
