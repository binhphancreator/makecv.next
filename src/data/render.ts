import { TemplateDataRender } from "~/types/document";

const data: TemplateDataRender[] = [
  {
    component: "Paper",
    size: {
      width: 545,
      height: 842,
    },
    position: {
      x: 0,
      y: 0,
    },
    children: [
      {
        component: "Shape",
        size: {
          width: 545,
          height: 200,
        },
        position: {
          x: 0,
          y: 0,
        },
        options: {
          fill: "color_palette.1",
          vector: "rectangle",
          radius: 15,
        },
      },
    ],
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
  },
  {
    component: "Text",
    position: {
      x: 320,
      y: 500,
    },
    options: {
      content: "This is a text component",
    },
  },
];

export default data;
