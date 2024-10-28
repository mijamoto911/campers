export const selectAllCampers = (state) => state.campers.items;
export const selectCampersLoading = (state) => state.campers.loading;
export const selectCampersError = (state) => state.campers.error;
export const selectCamperById = (id) => (state) =>
  state.campers.items.find((camper) => camper.id === id);
