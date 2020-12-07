const getters = {
  getIsSearching: jest.fn().mockReturnValue(false),
  getSearchedListVehicles: jest.fn().mockReturnValue(false),
  getListVehicles: jest.fn().mockReturnValue([]),
  getVehicleDetails: jest.fn().mockReturnValue(null)
}

export default getters;