import store from ".";

const actions = {
  updateListVehicles(store, listVehicles){
    store.commit('UpdateListVehicles', listVehicles);
  },
  updateVehicleDetails(store, details){
    store.commit('UpdateVehicleDetails', details);
  },
  updateSearching(store, valueBoolean){
    store.commit('UpdateSearching', valueBoolean);
  },
  resetSearching(){
    store.commit('ResetSearching')
  }
}

export default actions;