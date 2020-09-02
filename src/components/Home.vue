<template>
  <div class="container-fluid">
    <p v-html="dataValue"></p>

    <wj-flex-grid :itemsSource="data" :autoClipboard="false" :initialized="flexInitialized">
      <wj-flex-grid-column binding="id" header="ID" :width="50" :isReadOnly="true" />
      <wj-flex-grid-column
        binding="country"
        header="Country"
        :isRequired="true"
        :dataMap="countries"
      />
      <wj-flex-grid-column binding="sales" header="Sales" format="n2" />
      <wj-flex-grid-column binding="expenses" header="Expenses" format="n2" />
      <wj-flex-grid-column binding="overdue" header="Overdue" />
    </wj-flex-grid>
  </div>
</template>  

<script>
import "wijmo/wijmo.vue2.core";
import "wijmo/wijmo.vue2.grid";
import * as wijmo from "wijmo/wijmo";
import * as DataService from "./data.js";

export default {
  name: "Home",
  data() {
    return {
      data: DataService.getData(),
      countries: DataService.getCountries(),
      dataValue: ""
    };
  },
  methods: {
    flexInitialized: function(flexgrid) {
      flexgrid.beginningEdit.addHandler((s, e) => {
        let col = s.columns[e.col];
        if (col.binding != "overdue") {
          let item = s.rows[e.row].dataItem;
          if (item.overdue) {
            // prevent editing overdue items
            e.cancel = true;
          }
        }
      });
      flexgrid.cellEditEnding.addHandler((s, e) => {
        let col = s.columns[e.col];
        let value = wijmo.changeType(
          s.activeEditor.value,
          wijmo.DataType.Number,
          col.format
        );
        this.dataValue = value;
        console.log(this.dataValue);
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
</style>
