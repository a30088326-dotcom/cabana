import { Leaf, Sun, TreePine, Waves } from "lucide-react";
export function RetreatValues() {
  return (
    <div className="values-strip">
      <span>
        <TreePine size={20} />
        Immersed in nature
      </span>
      <span>
        <Sun size={20} />
        Unhurried mornings
      </span>
      <span>
        <Leaf size={20} />
        Thoughtful comforts
      </span>
      <span>
        <Waves size={20} />
        Your own rhythm
      </span>
    </div>
  );
}
