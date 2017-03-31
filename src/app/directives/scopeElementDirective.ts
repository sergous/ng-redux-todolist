export default function scopeElementDirective () {
    return {
        restrict: 'A',
        replace: false,
        link: function($scope: angular.IScope, elem: HTMLElement[], attrs: any) {
          $scope[attrs.scopeElement] = elem[0];
        }
    };
}
