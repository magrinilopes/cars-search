const getters = {
  getIsSearching: state => {
    return state.isSearching;
  },
  getSearchedListVehicles: state => {
    return state.searchedVehicles;
  },
  getListVehicles: state => {
    return state.listVehicles;
  },
  getVehicleDetails: state => {
    return state.vehicleDetails;
  }
}

export default getters;