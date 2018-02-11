export default class SkuGoods {
  constructor({ title, picture }) {
    this.title = title;
    this.picture = picture;
  }
}

export function createSkuGoods({ title, picture }) {
  return new SkuGoods({
    title: title,
    picture: picture
  });
}
