import authActions from '../../actions/auth.actions';
import { IScope } from "@types/angular";
import { INgRedux } from "ng-redux";

export default class LoginController {
  email: string;
  password: string;
  errors: any;
  inProgress: boolean;

  /** @ngInject */
  constructor(
    public $ngRedux: INgRedux,
    public $state: any,
    $scope: IScope
  ) {
    this.inProgress = false;
    this.errors = {};

    this.handleSubmit = this.handleSubmit.bind(this);

    let disconnect = $ngRedux.connect(
      state => this.onUpdate(state),
      authActions
    )(this);

    $scope.$on('$destroy', disconnect);
  }

  onUpdate(state: any) {
    return {
      state: state.auth
    };
  }

  handleSubmit() {
    this.$ngRedux.dispatch(authActions.loginUser(this.email, this.password));
    this.$state.go('app');
  }
}
