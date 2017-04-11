import { INgRedux } from "ng-redux";
import { IScope } from "@types/angular";
import listActions from '../../actions/list.actions';
import { initialList } from '../../reducers/lists';
import { IListItem } from "../../interfaces";

export default class SidebarListController {
  lists: IListItem[];
  isAdding: false;
  isConfig: false;

  /** @ngInject */
  constructor(
    public $ngRedux: INgRedux,
    $scope: IScope
  ) {
    this.lists = initialList;

    let disconnect = $ngRedux.connect(
      state => this.onUpdate(state),
      listActions
    )(this);

    $scope.$on('$destroy', disconnect);

    this.handleBlur = this.handleBlur.bind(this);
  };

  onUpdate(state: any) {
    return {
      lists: state.lists
    };
  }

  handleBlur() {
    this.isAdding = false;
  }
}
