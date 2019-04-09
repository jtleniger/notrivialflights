<template>
<section class="container">
  <section class="hero is-dark">
    <div class="hero-body">
      <div class="container">
        <h1 class="has-text-centered is-size-1 title">No. Trivial. Flights.</h1>
        <h2 class="has-text-centered subtitle">A conference call is fine.</h2>
      </div>
    </div>
  </section>
  <section class="section">
    <p class="has-text-centered">
      Business travel accounts for somewhere around 516 million passengers on flights every year.<sup><a href="#citation-1"><cite>[1]</cite></a></sup>
      A roundtrip flight from NY to LA generates about 1.5 tons of CO<sub>2</sub> per passenger.<sup><a href="#citation-2"><cite>[2]</cite></a></sup>
      This is nearly 774 million tons of CO<sub>2</sub> every year, just so HR can tell you your personality type.
    </p>
    <p class="has-text-centered">
      Let that sink in. The entire carbon output of Germany so you can shake a coworkers hand instead of seeing them on a screen.
    </p>
  </section>
  <section class="section">
    <h4 class="is-size-4 has-text-centered">How much carbon will my flight create?</h4>
    <calculator />
  </section>
  <section class="section">
    <h4 class="has-text-centered is-size-4 is-italic has-text-weight-light">This site probably won't convince HR or your boss a phone call is better, but it's worth a shot.</h4>
  </section>
  <section class="section is-size-7">
    <ol>
      <li id="citation-1">
        <a href="https://www.bts.gov/archive/publications/america_on_the_go/us_business_travel/entire" target="_blank">United States Department of Transportation - Bureau of Transportation Statistics</a>
        <p>Based on 4.3 billion passengers a year and a low estimate of 12% of passengers travelling for business.</p> 
      </li>
      <li id="citation-2">
        <a href="https://co2.myclimate.org" target="_blank">myclimate.org</a>
      </li>
    </ol>
  </section>
</section>
</template>

<script>
import Calculator from '~/components/Calculator.vue'

export default {
  components: {
    Calculator
  }
}
</script>

<style>
h4 {
  padding-bottom: 18px;
}
</style>
