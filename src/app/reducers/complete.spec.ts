import completeReducer from './complete';

const todos = [
  {id: 0, text: 'Active task', completed: false},
  {id: 1, text: 'Done task', completed: true}
];

describe('completeReducer', () => {
  it('shoud increase counter', () => {
    const complete = completeReducer(0, todos[1]);
    expect(complete).toEqual(1);
  });
  it('shoud not increase counter', () => {
    const complete = completeReducer(0, todos[0]);
    expect(complete).toEqual(0);
  });
});
