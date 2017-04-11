
import { IObjectCtor } from "./interfaces";

declare var Object: IObjectCtor;
export let assign = Object.assign ? Object.assign : function(target: any, ...sources: any[]): any {
  return;
};
