export type AlterationNode = HTMLSpanElement | HTMLBRElement;

export type AlterationNodeType = "span" | "br" | "text";

export type Alteration = {
  content: string;
  formats?: {
    [key: string]: any;
  };
  breakline?: boolean;
  node: AlterationNode;
};

export type AlterationRange = {
  start: {
    alteration: Alteration;
    offset: number;
    index: number;
  };
  end: {
    alteration: Alteration;
    offset: number;
    index: number;
  };
  collapsed?: boolean;
};
