import type { AidType } from "./types";
type Param = { label: string; min: number; max: number; default: number };
export const CATALOG: Record<AidType, { name: string; description: string; params: Record<string, Param> }> = {
  key_turner: { name: "Key Turner Lever", description: "Lever that slots over a key bow for extra leverage.",
    params: { handleLength:{label:"Handle length",min:60,max:140,default:90}, handleThickness:{label:"Handle thickness",min:12,max:30,default:18},
              slotWidth:{label:"Key slot width",min:20,max:35,default:26}, gripGrooves:{label:"Finger grooves (0/1)",min:0,max:1,default:0} } },
  pen_grip: { name: "Ergonomic Pen Grip", description: "Thick sleeve that slides over a pen or pencil.",
    params: { outerDiameter:{label:"Outer diameter",min:18,max:40,default:26}, length:{label:"Length",min:30,max:80,default:50},
              penDiameter:{label:"Pen hole diameter",min:6,max:12,default:8}, gripGrooves:{label:"Finger grooves (0/1)",min:0,max:1,default:1} } },
  utensil_handle: { name: "Built-Up Utensil Handle", description: "Thick handle sleeve for forks and spoons.",
    params: { outerDiameter:{label:"Outer diameter",min:20,max:45,default:30}, length:{label:"Length",min:60,max:130,default:90},
              slotWidth:{label:"Utensil slot width",min:4,max:15,default:10}, slotThickness:{label:"Utensil slot thickness",min:1.5,max:5,default:2.5} } },
};
