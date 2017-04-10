import authActions from '../../actions/auth.actions';
import { IScope } from "@types/angular";
import { INgRedux } from "ng-redux";

export default class RegisterController {
  email: string;
  username: string;
  password: string;
  inProgress: boolean;

  /** @ngInject */
  constructor(
    public $ngRedux: INgRedux,
    $scope: IScope
  ) {
    this.inProgress = false;

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
    this.$ngRedux.dispatch(authActions.registerUser(this.username, this.email, this.password));
  }
}
