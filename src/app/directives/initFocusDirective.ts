export default function initFocusDirective () {
    return {
        restrict: 'A',
        replace: false,
        link: function($scope: angular.IScope, elem: HTMLElement[], attrs: any) {
          elem[0].focus();
        }
    };
}
