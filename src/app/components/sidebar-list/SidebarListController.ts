import { INgRedux } from "ng-redux";
import { IScope } from "@types/angular";

interface IListItem {
  name: string;
}
const initialList: IListItem[] = [{name: 'Default'}];

export default class SidebarListController {
  items: IListItem[];

  /** @ngInject */
  constructor(
    public $ngRedux: INgRedux,
    $scope: IScope
  ) {
    this.items = initialList;
  };
}
