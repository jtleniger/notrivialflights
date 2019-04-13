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
    <p>
      Business travel accounts for somewhere around 516 million passengers on flights every year.<sup><a href="#citation-1"><cite>[1]</cite></a></sup>
      A roundtrip flight from NY to LA generates about 0.6 tons of CO<sub>2</sub> per passenger, depending on how it's calculated.<sup><a href="#citation-2"><cite>[2]</cite></a></sup>
      This is nearly 310 million tons of CO<sub>2</sub> every year (on the low end, compared to some sources<sup><a href="#citation-3"><cite>[3]</cite></a></sup>).
      Just so HR can tell you your personality type.
    </p>
    <p>
      Let that sink in. The entire carbon output of Poland<sup><a href="#citation-4"><cite>[4]</cite></a></sup>, roughly, so businessmen can shake a coworkers hand instead of seeing them on a screen.
      This probably won't convince HR or your boss a phone call is better, but it's worth a shot.
    </p>
  </section>
  <section class="section">
    <h4 class="is-size-4 has-text-centered">How much carbon will my flight create?</h4>
    <calculator />
  </section>
  <section class="section">
    <p class="has-text-weight-light is-size-6">
      Dislaimer: I don't know what I'm doing and all the math could be wrong. I just care about climate change and don't like business trips.
      It's pretty tricky to choose numbers for this type of thing as there are many studies and it's not clear which ones are more accurate.
    </p>
  </section>
  <section class="section is-size-7">
    <ol>
      <li id="citation-1">
        <a href="https://www.bts.gov/archive/publications/america_on_the_go/us_business_travel/entire" target="_blank">United States Department of Transportation - Bureau of Transportation Statistics</a>
        <p>Based on 4.3 billion passengers a year and a low estimate of 12% of passengers travelling for business.</p> 
      </li>
      <li id="citation-2">
        <a href="https://blueskymodel.org/air-mile" target="_blank">BlueSkyModel</a>
        <p>0.24 pounds per mile.</p>
      </li>
      <li id="citation-3">
        <a href="https://co2.myclimate.org" target="_blank">myclimate.org</a>
        <p>1.5 tons rountrip NY to LA.</p>
      </li>
      <li id="citation-4">
        <a href="https://ec.europa.eu/jrc/en/publication/eur-scientific-and-technical-research-reports/fossil-co2-emissions-all-world-countries-2018-report" target="_blank">
          "Fossil CO2 emissions of all world countries - 2018 Report". Publications Office of the European Union.
        </a>
        <p>2017 Fossil CO<sub>2</sub> (MT CO<sub>2</sub>/yr).</p>
      </li>
      <li id="citation-5">
        <a href="https://www.fhwa.dot.gov/ohim/onh00/bar8.htm" target="_blank">
          U.S. Department of Transportation: Federal Highway Administration
        </a>
        <p>Average Annual Miles by Age Group.</p>
      </li>
      <li id="citation-6">
        <a href="https://www.reuters.com/article/us-autos-emissions/u-s-vehicle-fuel-economy-rises-to-record-24-7-mpg-epa-idUSKBN1F02BX" target="_blank">
          Reuters
        </a>
        <p>Average fuel efficiency of new cars, 2018.</p>
      </li>
      <li id="citation-7">
        <a href="https://blueskymodel.org/gallon-gas" target="_blank">
          BlueSkyModel
        </a>
        <p>18.07 lbs of CO<sub>2</sub> per gallon.</p>
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
p {
  margin-bottom: 18px;
}
li p {
  margin-bottom: initial;
}
h4 {
  padding-bottom: 18px;
}
</style>
