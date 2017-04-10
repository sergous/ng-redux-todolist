const ListErrors: angular.IComponentOptions = {
  template: `
    <ul class="error-messages">
      <li ng-repeat='error in $ctrl.errors'>
        {{error.message}}
      </li>
    </ul>
    `,
  bindings: {
    errors: '<'
  }
};

export {ListErrors};
