<template>
  <v-container>
    <v-progress-linear indeterminate v-show="this.isLoading"></v-progress-linear>
    <v-card>
      <v-container>
        <v-form>
          <v-text-field v-model="custumer.name" label="Name" required></v-text-field>
          <v-text-field v-model="custumer.companyName" label="Company Name" required></v-text-field>
          <v-text-field v-model="custumer.address" label="Adress" required></v-text-field>
          <hr />
          <v-btn @click="save(custumer)" color="primary">Salvar</v-btn>
          <!-- <b-button @click="obterUsuarios" size="lg" variant="success">Obter Usuários</b-button> -->
        </v-form>
      </v-container>
    </v-card>
    <br />
    <v-card>
      <v-container>
        <p>Item Selecionado:{{selectedItem}}</p>
        <p>Item Editado:{{editedItem}}</p>

        <wj-flex-grid :itemsSource="custumers" :initialized="flexInitialized">
          <wj-flex-grid-column :header="'Name'" :binding="'name'" width="2*" />
          <wj-flex-grid-column :header="'Company Name'" :binding="'companyName'" width="*" />
          <wj-flex-grid-column :header="'Address'" :binding="'address'" width="*" />
        </wj-flex-grid>
      </v-container>
    </v-card>
    <Snackbar ref="snackbar" />
  </v-container>
</template>  

<script>
import "wijmo/wijmo.vue2.grid";
import Snackbar from "./alert-notification.vue";
import _ from 'lodash';    

export default {
  name: "Home",
  data() {
    return {
      custumer: {
        name: "",
        companyName: "",
        address: ""
      },
      selectedItem: "",
      editedItem: "",
      custumers: [],
      isLoading: false
    };
  },

  components: {
    Snackbar
  },

  mounted() {
    this.fetchData();
  },

  methods: {
    flexInitialized: function(flexgrid) {
      flexgrid.beginningEdit.addHandler((s, e) => {
        let item = s.rows[e.row].dataItem;
        item = JSON.parse(JSON.stringify(item));

        this.selectedItem = item;
      });
      // flexgrid.cellEditEnding.addHandler((s, e) => {
      //   let itemId = s.rows[e.row].dataItem.id;
      //   this.custumers.forEach(item => {
      //     if (itemId == item.id) {
      //       this.editedItem = item;
      //       console.log(this.editedItem);
      //     }
      //   });
      //   this.edit(this.editedItem);
      // });
      flexgrid.cellEditEnded.addHandler(async (s, e) => {
        let itemId = s.rows[e.row].dataItem.id;
        this.custumers.forEach(item => {
          if (itemId == item.id) {
            this.editedItem = item;
            console.log(this.editedItem);
          }
        });
        let itemBD = await this.getById(itemId);

        // eslint-disable-next-line no-undef
        if (_.isEqual(itemBD, this.selectedItem)) {
          this.edit(this.editedItem);
        } else {
          this.$refs.snackbar.alert("O item alterado está diferente do BD");
          e.cancel;
        }
      });
    },

    async save(item) {
      await this.$http.post("custumer.json", item);
      this.$refs.snackbar.success("Salvo com Successo!");
      this.fetchData();
    },

    async edit(item) {
      await this.$http.put("custumer/" + item.id + "/.json", item).then(() => {
        this.$refs.snackbar.success("Editado com Successo!");
      });
    },

    async getById(id) {
      let res = await this.$http.get("custumer/" + id + "/.json");
      let data = {
        id: res.data.id,
        name: res.data.name,
        companyName: res.data.companyName,
        address: res.data.address
      };
      return data;
    },

    async fetchData() {
      this.isLoading = true;
      await this.listAll().then(res => {
        this.custumers = res;
      });
      this.isLoading = false;
    },

    async listAll() {
      let data = [];

      await this.$http.get("custumer.json").then(response => {
        for (let i in response.data) {
          data.push({
            id: i,
            name: response.data[i].name,
            companyName: response.data[i].companyName,
            address: response.data[i].address
          });
        }
      });
      return data;
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
