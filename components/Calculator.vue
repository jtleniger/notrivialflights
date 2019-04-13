<template>
  <div class="calculator">
    <div class="field is-horizontal">
      <div class="field-label is-large">
        <label for="departing" class="label">Departing</label>
      </div>
      <div class="field-body">
        <div class="field">
          <div class="control is-large">
            <input type="text" name="departing" class="input is-large" placeholder="Departing" v-model="departing">
          </div>
        </div>
      </div>
    </div>
    <div class="field is-horizontal">
      <div class="field-label is-large">
        <label for="arriving" class="label">Arriving</label>
      </div>
      <div class="field-body">
        <div class="field">
          <div class="control is-large">
            <input type="text" name="arriving" class="input is-large" placeholder="Arriving" v-model="arriving">
          </div>
        </div>
      </div>
    </div>
    <div class="field is-horizontal">
      <div class="field-label">
        <!-- Left empty for spacing -->
      </div>
      <div class="field-body">
        <div class="field">
          <div class="control">
            <button class="button is-primary" v-bind:class="{ 'is-loading': fetching }" v-on:click="calculate">
              Calculate
            </button>
          </div>
        </div>
      </div>
    </div>
    <section class="section" v-if="distance">
      <h1 class="has-text-centered is-size-1">~{{ carbonTons }} tons of CO<sub>2</sub></h1>
    </section>
  </div>
</template>

<style>

</style>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      arriving: '',
      departing: '',
      fetching: false,
      error: false,
      distance: null
    }
  },

  methods: {
    calculate: async function() {
      this.fetching = true;
      this.error = false;

      const params = new URLSearchParams([
        ['from', this.departing],
        ['to', this.arriving]
      ]);

      const res = await axios.get(`/.netlify/functions/getdistance?${params.toString()}`);

      if (res.status !== 200) {
        this.error = true;
      } else {
        this.distance = res.data.result;
      }

      this.fetching = false;
    }
  },

  computed: {
    carbonTons: function(km) {
      if (!this.distance) {
        return null;
      }

      return ( ((0.000134576 * Math.pow(this.distance, 2)) + (6.1798 * this.distance) + 3446.2 ) / (280.39 * 0.77) ) * 0.951 * 0.8 * (3.15 * 2 + .51) * 2.20462;
    }
  }
}
</script>

