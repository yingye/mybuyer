export function saveToLocal(id, key, value) {
  let buyer = window.localStorage.__buyer__;
  if (!buyer) {
    buyer = {};
    buyer[id] = {};
  } else {
    buyer = JSON.parse(buyer);
    if (!buyer[id]) {
      buyer[id] = {};
    }
  }
  buyer[id][key] = value;
  window.localStorage.__buyer__ = JSON.stringify(buyer);
};

export function loadFromLocal(id, key, def) {
  let buyer = window.localStorage.__buyer__;
  console.log('buyer' + buyer);
  if (!buyer) {
    return def;
  }
  buyer = JSON.parse(buyer)[id];
  console.log('id' + id);
  console.log('buyer2' + buyer);
  if (!buyer) {
    return def;
  }
  let ret = buyer[key];
  console.log('buyer2' + ret);
  return ret || def;
};
