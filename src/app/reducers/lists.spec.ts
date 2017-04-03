import lists from './lists';
import * as types from '../constants/ActionTypes';

describe('lists reducer', () => {
  it('should handle initial state', () => {
    expect(
      lists(undefined, {})
    ).toEqual([
      {
        name: 'Default',
        id: 0
      },
      {
        name: 'Shopping List',
        id: 1
      }
    ]);
  });

  it('should handle ADD_LIST', () => {
    expect(
      lists([], {
        type: types.ADD_LIST,
        name: 'Run the tests'
      })
    ).toEqual([
      {
        name: 'Run the tests',
        id: 0
      }
    ]);

    expect(
      lists([
      {
        name: 'Default',
        id: 0
      }
      ], {
        type: types.ADD_LIST,
        name: 'Run the tests'
      })
    ).toEqual([
      {
        name: 'Run the tests',
        id: 1
      },
      {
        name: 'Default',
        id: 0
      }
    ]);

    expect(
      lists([
        {
          name: 'Run the tests',
          id: 1
        },
        {
          name: 'Default',
          id: 0
        }
      ], {
        type: types.ADD_LIST,
        name: 'Fix the tests'
      })
    ).toEqual([
      {
        name: 'Fix the tests',
        id: 2
      }, {
        name: 'Run the tests',
        id: 1
      },
      {
        name: 'Default',
        id: 0
      }
    ]);
  });

  it('should handle DELETE_LIST', () => {
    expect(
      lists([
        {
          name: 'Run the tests',
          id: 1
        },
        {
          name: 'Default',
          id: 0
        }
      ], {
        type: types.DELETE_LIST,
        id: 1
      })
    ).toEqual([
      {
        name: 'Default',
        id: 0
      }
    ]);
  });

  it('should handle EDIT_LIST', () => {
    expect(
      lists([
        {
          name: 'Run the tests',
          id: 1
        },
        {
          name: 'Default',
          id: 0
        }
      ], {
        type: types.EDIT_LIST,
        name: 'Fix the tests',
        id: 1
      })
    ).toEqual([
      {
        name: 'Fix the tests',
        id: 1
      },
      {
        name: 'Default',
        id: 0
      }
    ]);
  });
});
