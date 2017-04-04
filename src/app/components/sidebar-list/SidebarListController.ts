import { INgRedux } from "ng-redux";
import { IScope } from "@types/angular";
import listActions from '../../actions/list.actions';
import { initialList, IListItem } from '../../reducers/lists';

export default class SidebarListController {
  lists: IListItem[];
  selectedItem: IListItem;
  isAdding: false;
  isConfig: false;

  /** @ngInject */
  constructor(
    public $ngRedux: INgRedux,
    $scope: IScope
  ) {
    this.lists = initialList;
    this.selectedItem = this.lists[0];

    let disconnect = $ngRedux.connect(
      state => this.onUpdate(state),
      listActions
    )(this);

    $scope.$on('$destroy', disconnect);
  };

  onUpdate(state: any) {
    return {
      lists: state.lists
    };
  }
}
