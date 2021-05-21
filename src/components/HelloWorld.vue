<template>
  <div class="panel panel-default bootstrap-basic">
    <div v-if="loading">Bluesnap is loading</div>
    <div v-else>Bluesnap is done loading</div>

    <form class="panel-body" id="checkout-form" action="#">
      <div class="row">
        <div class="form-group col-md-12">
          <label for="cardholder-name">Name on Card</label>
          <input
            type="text"
            class="form-control"
            id="cardholder-name"
            placeholder="Full Name"
          />
          <span class="helper-text"></span>
        </div>
        <!--Hosted Field for CC number-->
        <div class="form-group col-md-12">
          <label for="card-number">Card Number</label>
          <div class="input-group">
            <div
              class="form-control"
              :class="{
                'form-control--focus': ccn.focus,
                'form-control--error': ccn.error,
              }"
              id="card-number"
              data-bluesnap="ccn"
            ></div>
          </div>
          <span class="helper-text" id="ccn-help"></span>
        </div>
        <!--Hosted Field for CC EXP-->
        <div class="form-group col-xs-7">
          <label for="exp-date">Exp. Date</label>
          <div
            class="form-control"
            :class="{
              'form-control--focus': exp.focus,
              'form-control--error': exp.error,
            }"
            id="exp-date"
            data-bluesnap="exp"
          ></div>
          <span class="helper-text" id="exp-help"></span>
        </div>
        <!--Hosted Field for CC CVV-->
        <div class="form-group col-xs-5">
          <label for="cvv">Security Code</label>
          <div
            class="form-control"
            id="cvv"
            data-bluesnap="cvv"
            :class="{
              'form-control--focus': cvv.focus,
              'form-control--error': cvv.error,
            }"
          ></div>
          <span class="helper-text" id="cvv-help"></span>
        </div>
      </div>

      <button
        class="btn btn-success btn-lg col-xs-6 col-xs-offset-3"
        type="button"
        id="submit-button"
      >
        Pay Now
      </button>
    </form>
  </div>

  <!--BlueSnap Hosted Payment Fields JavaScript file-->
</template>

<script>
import { useBluesnap } from "../composables/useBluesnap";

export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },

  setup() {
    const { loading, ccn, cvv, exp } = useBluesnap();

    return {
      loading,
      ccn,
      cvv,
      exp,
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
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

label {
  display: block;
}

input,
.form-control[data-bluesnap] {
  height: 2.5rem;
  border: 1px solid black;
  width: auto;
  display: block;
  width: 100%;
  box-sizing: border-box;
  border-radius: 4px;
  padding: 0.5rem;

  &:focus,
  &.form-control--focus {
    outline: -webkit-focus-ring-color auto 1px;
  }
  &.form-control--error {
    outline: red auto 1px;
  }
}

.form-control {
  position: relative;

  iframe {
    position: absolute;
  }
}
</style>
