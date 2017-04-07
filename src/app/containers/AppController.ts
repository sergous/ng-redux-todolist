import appActions from '../actions/app.actions';
import { IScope } from "@types/angular";
import { INgRedux } from "ng-redux";

export default class AppController {
  redirectToState: string;

  /** @ngInject */
  constructor(
    public $ngRedux: INgRedux,
    public $state: any,
    $scope: IScope
  ) {

    let disconnect = $ngRedux.connect(
      state => this.onUpdate(state),
      appActions
    )(this);

    $scope.$on('$destroy', disconnect);
  }

  handleRedirect() {
    if (this.redirectToState)
        this.$state.go(this.redirectToState);
  }

  onUpdate(state: any) {
    console.log(state);
    return {
      state: state.app
    };
  }
}
