import grapesjs from "grapesjs";
import loadComponents from "./components.js";
import loadBlocks from "./blocks.js";

export default grapesjs.plugins.add("swiperComponent", (editor, opts = {}) => {
  let options = {
    label: "Swiper",
    name: "cswiper",
    category: "Custom",
  };
  for (let name in options) {
    if (!(name in opts)) opts[name] = options[name];
  }

  loadBlocks(editor, options);
  loadComponents(editor, opts);
});