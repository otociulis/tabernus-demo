module.exports = function(key) {
  if (key) {
    key = key.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    key = key.replace(/\s+/g, "-").toLowerCase();
    key = key.replace(/[\W_]+/g, "-");
    key = key.replace(/[-]+$/, "");
  }
  return key;
};
