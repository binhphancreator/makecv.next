import { DataRender } from "~/types/document";

const data: DataRender[] = [
  {
    component: "Paper",
    size: {
      width: 545,
      height: 842,
    },
    position: {
      x: 0,
      y: 0,
    }
  },
  {
    component: "PaperBackground",
    size: {
      width: 545,
      height: 200,
    },
    position: {
      x: 32,
      y: 40,
    },
    options: {
      backgroundColor: "color_palette.1",
    }
  }
];

export default data;
