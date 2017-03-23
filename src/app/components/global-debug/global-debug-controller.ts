import {IScope} from 'angular';
import {INgRedux} from 'ng-redux';
export default class GlobalDebugController {
  /** @ngInject */
  constructor($ngRedux: INgRedux, $scope: IScope) {

    let _onChange = (state) => ({
      globalState: state
    });
    const disconnect = $ngRedux.connect(_onChange)(this);

    $scope.$on('$destroy', () => disconnect());
  }
}

