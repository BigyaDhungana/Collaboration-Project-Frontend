export const queryParamGenerator = (key, value) => {
  const params = new URLSearchParams();
  params.set(key, value);
  return params.toString();
};
