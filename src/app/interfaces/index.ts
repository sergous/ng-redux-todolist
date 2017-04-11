export interface IUser {
  username: string;
  email: string;
  password: string;
  token: string;
};

export interface IListItem {
  id: number;
  name: string;
}

export interface ITodo {
  id: number;
  completed: boolean;
  text: string;
  listId: number;
}

export interface IVisibilityFilter {
    filter: Function;
    type: string;
    name: string;
}

export interface IFooterScope extends angular.IScope {
  activeCount?: number;
  completedCount?: number;
  onCompleteAll: Function;
  onClearCompleted: Function;
}

export interface ITodosCountScope extends angular.IScope {
  activeCount: number;
}

export interface IObjectCtor extends ObjectConstructor {
  assign(target: any, ...sources: any[]): any;
}
