export default `<div>
  <h2 s-if="title">{{title}}</h2>
  <form>
    <input type="text" name="foo">
    <button on-click="onBtnClick">submit</button>
  </form>
</div>
`;
