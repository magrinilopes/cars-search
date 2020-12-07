const mutations = {
  UpdateListVehicles(state, values){
    state.listVehicles = values;
    state.searchedVehicles = true;
  },
  UpdateVehicleDetails(state, details){
    state.vehicleDetails = details;
  },
  UpdateSearching(state, value){
    state.isSearching = value;
  },
  ResetSearching(state){
    state.listVehicles = [];
    state.searchedVehicles = false;
  }
}

export default mutations;