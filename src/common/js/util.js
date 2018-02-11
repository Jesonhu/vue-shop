export function windowResize(clientHeight, callbackOne, callbackTwo) {
  window.addEventListener('resize', () => {
    let height = window.innerHeight;
    if (height === clientHeight) {
      callbackOne();
    }
    if (height < clientHeight) {
      callbackTwo();
    }
  });
}
