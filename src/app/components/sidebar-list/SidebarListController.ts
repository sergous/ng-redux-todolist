import { INgRedux } from "ng-redux";
import { IScope } from "@types/angular";

interface IListItem {
  id: number;
  name: string;
}
const initialList: IListItem[] = [
  {id: 0, name: 'Default'},
  {id: 1, name: 'Shopping List'},
];

export default class SidebarListController {
  items: IListItem[];
  selectedItem: IListItem;
  isAdding: false;

  /** @ngInject */
  constructor(
    public $ngRedux: INgRedux,
    $scope: IScope
  ) {
    this.items = initialList;
    this.selectedItem = this.items[0];
  };
}
