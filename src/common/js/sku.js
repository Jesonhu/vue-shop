export default class Sku {
  constructor({ tree, list, price, stockNum, collectionId, noneSku, messages, hideStock }) {
    this.tree = tree;
    this.list = list;
    this.price = price;
    this.stock_num = stockNum;
    this.collection_id = collectionId;
    this.none_sku = noneSku;
    this.messages = messages;
    this.hide_stock = hideStock;
  }
}

export function createSku({ tree, list, price, stockNum, collectionId, noneSku, messages, hideStock }) {
  return new Sku({
    tree: tree,
    list: list,
    price: price,
    stockNum: stockNum,
    collectionId: collectionId,
    noneSku: noneSku,
    messages: messages,
    hideStock: hideStock
  });
}
