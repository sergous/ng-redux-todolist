import todos from './todos';
import * as types from '../constants/ActionTypes';

describe('todos reducer', () => {
  it('should handle initial state', () => {
    expect(
      todos(undefined, {})
    ).toEqual([
      {
        text: 'Use Redux',
        completed: false,
        id: 0,
        listId: 0
      }, {
        text: 'Get milk',
        completed: false,
        id: 1,
        listId: 1
      }
    ]);
  });

  it('should handle ADD_TODO', () => {
    expect(
      todos([], {
        type: types.ADD_TODO,
        text: 'Run the tests',
        listId: 0
      })
    ).toEqual([
      {
        text: 'Run the tests',
        completed: false,
        id: 0,
        listId: 0
      }
    ]);

    expect(
      todos([
        {
          text: 'Use Redux',
          completed: false,
          id: 0,
          listId: 0
        }
      ], {
        type: types.ADD_TODO,
        text: 'Run the tests',
        listId: 0
      })
    ).toEqual([
      {
        text: 'Run the tests',
        completed: false,
        id: 1,
        listId: 0
      }, {
        text: 'Use Redux',
        completed: false,
        id: 0,
        listId: 0
      }
    ]);

    expect(
      todos([
        {
          text: 'Run the tests',
          completed: false,
          id: 1,
          listId: 0
        }, {
          text: 'Use Redux',
          completed: false,
          id: 0,
          listId: 0
        }
      ], {
        type: types.ADD_TODO,
        text: 'Fix the tests',
        listId: 0
      })
    ).toEqual([
      {
        text: 'Fix the tests',
        completed: false,
        id: 2,
        listId: 0
      }, {
        text: 'Run the tests',
        completed: false,
        id: 1,
        listId: 0
      }, {
        text: 'Use Redux',
        completed: false,
        id: 0,
        listId: 0
      }
    ]);
  });

  it('should handle DELETE_TODO', () => {
    expect(
      todos([
        {
          text: 'Run the tests',
          completed: false,
          id: 1,
          listId: 0
        }, {
          text: 'Use Redux',
          completed: false,
          id: 0,
          listId: 0
        }
      ], {
        type: types.DELETE_TODO,
        id: 1
      })
    ).toEqual([
      {
        text: 'Use Redux',
        completed: false,
        id: 0,
        listId: 0
      }
    ]);
  });

  it('should handle EDIT_TODO', () => {
    expect(
      todos([
        {
          text: 'Run the tests',
          completed: false,
          id: 1,
          listId: 0
        }, {
          text: 'Use Redux',
          completed: false,
          id: 0,
          listId: 0
        }
      ], {
        type: types.EDIT_TODO,
        text: 'Fix the tests',
        id: 1
      })
    ).toEqual([
      {
        text: 'Fix the tests',
        completed: false,
        id: 1,
        listId: 0
      }, {
        text: 'Use Redux',
        completed: false,
        id: 0,
        listId: 0
      }
    ]);
  });

  it('should handle COMPLETE_TODO', () => {
    expect(
      todos([
        {
          text: 'Run the tests',
          completed: false,
          id: 1,
          listId: 0
        }, {
          text: 'Use Redux',
          completed: false,
          id: 0,
          listId: 0
        }
      ], {
        type: types.COMPLETE_TODO,
        id: 1
      })
    ).toEqual([
      {
        text: 'Run the tests',
        completed: true,
        id: 1,
        listId: 0
      }, {
        text: 'Use Redux',
        completed: false,
        id: 0,
        listId: 0
      }
    ]);
  });

  it('should handle COMPLETE_ALL', () => {
    expect(
      todos([
        {
          text: 'Run the tests',
          completed: true,
          id: 1,
          listId: 0
        }, {
          text: 'Use Redux',
          completed: false,
          id: 0,
          listId: 0
        }
      ], {
        type: types.COMPLETE_ALL
      })
    ).toEqual([
      {
        text: 'Run the tests',
        completed: true,
        id: 1,
        listId: 0
      }, {
        text: 'Use Redux',
        completed: true,
        id: 0,
        listId: 0
      }
    ]);

    // unmark if all todos are currently completed
    expect(
      todos([
        {
          text: 'Run the tests',
          completed: true,
          id: 1,
          listId: 0
        }, {
          text: 'Use Redux',
          completed: true,
          id: 0,
          listId: 0
        }
      ], {
        type: types.COMPLETE_ALL
      })
    ).toEqual([
      {
        text: 'Run the tests',
        completed: false,
        id: 1,
        listId: 0
      }, {
        text: 'Use Redux',
        completed: false,
        id: 0,
        listId: 0
      }
    ]);
  });

  it('should handle CLEAR_COMPLETED', () => {
    expect(
      todos([
        {
          text: 'Run the tests',
          completed: true,
          id: 1,
          listId: 0
        }, {
          text: 'Use Redux',
          completed: false,
          id: 0,
          listId: 0
        }
      ], {
        type: types.CLEAR_COMPLETED
      })
    ).toEqual([
      {
        text: 'Use Redux',
        completed: false,
        id: 0,
        listId: 0
      }
    ]);
  });

  it('should not generate duplicate ids after CLEAR_COMPLETED', () => {
    expect(
      [
        {
          type: types.COMPLETE_TODO,
          id: 0
        }, {
          type: types.CLEAR_COMPLETED
        }, {
          type: types.ADD_TODO,
          text: 'Write more tests',
          listId: 0
        }
      ].reduce(todos, [
        {
          id: 0,
          completed: false,
          text: 'Use Redux',
          listId: 0
        }, {
          id: 1,
          completed: false,
          text: 'Write tests',
          listId: 0
        }
      ])
    ).toEqual([
      {
        text: 'Write more tests',
        completed: false,
        id: 2,
        listId: 0
      }, {
        text: 'Write tests',
        completed: false,
        id: 1,
        listId: 0
      }
    ]);
  });
});
