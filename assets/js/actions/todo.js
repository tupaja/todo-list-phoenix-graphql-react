export const CHANGE_DEPENDENCIES = "CHANGE_DEPENDENCIES";

export const changeDependencies = values => ({
  type: CHANGE_DEPENDENCIES,
  values
});

export const clearDependencies = () => ({
  type: CHANGE_DEPENDENCIES,
  values: []
});
