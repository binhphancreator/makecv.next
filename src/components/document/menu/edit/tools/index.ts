import Alignment from "./Alignment";

const ToolEffects = {
  alignment: Alignment,
};

export type ToolEffectsName = keyof typeof ToolEffects;
export default ToolEffects as { [key: string]: React.FC<any> };
