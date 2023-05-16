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
  },
  {
    component: "DocumentImage",
    size: {
      width: 250,
      height: 250,
    },
    position: {
      x: 64,
      y: 500,
    },
  }
];

export default data;
