<template>
  <div class="calculator">
    <div class="field">
      <label for="departing" class="label">Departing</label>
      <div class="control is-large">
        <input type="text" name="departing" class="input is-large" placeholder="Departing" v-model="departing">
      </div>
    </div>
    <div class="field">
      <label for="arriving" class="label">Arriving</label>
      <div class="control is-large">
        <input type="text" name="arriving" class="input is-large" placeholder="Arriving" v-model="arriving">
      </div>
    </div>
    <div class="field is-grouped is-grouped-right">
      <div class="control">
        <button class="button is-primary is-large" v-bind:class="{ 'is-loading': fetching, 'is-danger': error }" v-on:click="calculate">
          Calculate
        </button>
      </div>
    </div>
    <section class="section" v-if="distanceKm">
      <h1 class="has-text-centered is-size-1">about {{ tonsOfCO2.toFixed(2) }} tons of CO<sub>2</sub></h1>
      <h2 class="has-text-centered is-size-4">or</h2>
      <h1 class="has-text-centered is-size-1">
        about {{ monthsDriven | pluralize('month') }} of driving<sup><a class="is-size-6" href="#citation-5"><cite>[5]</cite></a></sup><sup><a class="is-size-6" href="#citation-6"><cite>[6]</cite></a></sup><sup><a class="is-size-6" href="#citation-7"><cite>[7]</cite></a></sup>
      </h1> 
    </section>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      arriving: '',
      departing: '',
      fetching: false,
      error: false,
      distanceKm: null
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
        this.distanceKm = res.data.result;
      }

      this.fetching = false;
    },

    
  },

  computed: {
    distanceMi: function () {
      if (!this.distanceKm) {
        return 0;
      }

      return this.distanceKm / 1.609;
    },

    roundtripDistanceMi: function () {
      return 2 * this.distanceMi;
    },

    lbsOfCO2: function() {
      if (!this.distanceKm) {
        return null;
      }

      return 0.24 * this.roundtripDistanceMi;
    },

    monthsDriven: function() {
      const AVG_MPG = 24.7;
      const AVG_MILAGE = 13476;
      const LBS_PER_GALLON = 18.07;

      const GALLONS = AVG_MILAGE / AVG_MPG;

      const LBS_PER_YEAR = LBS_PER_GALLON * GALLONS;

      return Math.round((this.lbsOfCO2 / LBS_PER_YEAR) * 12);
    },

    tonsOfCO2: function() {
      return this.lbsOfCO2 / 2000;
    }
  },

  filters: {
    pluralize: function(value, word) {
      if (value === 1) {
        return `${value} ${word}`;
      }

      return `${value} ${word}s`;
    }
  }
}
</script>

