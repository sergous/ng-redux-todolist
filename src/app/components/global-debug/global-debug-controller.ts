import {IScope} from 'angular';
export default class GlobalDebugController {
  constructor($ngRedux: any, $scope: IScope) {

    let _onChange = (state) => ({
      globalState: state
    });
    const disconnect = $ngRedux.connect(_onChange)(this);

    $scope.$on('$destroy', () => disconnect());
  }
}

