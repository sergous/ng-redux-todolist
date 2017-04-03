import { INgRedux } from "ng-redux";
import { IScope } from "@types/angular";
import { initialList, IListItem } from '../../reducers/lists';

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
