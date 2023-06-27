import { Wish } from "@/types/Wish";

export enum ActionTypes {
  ADD_WISHES =  'ADD_WISHES',
  REMOVE_WISHES =  'REMOVE_WISHES',
  UPDATE_WISHES =  'UPDATE_WISHES',
  FILTER_WISHES = 'FILTER_WISHES',
  CROSS_OUT_WISHES = 'CROSS_OUT_WISHES',
  REMOVE_ALL_WISHES = 'REMOVE_ALL_WISHES',
}

export interface IAction {
  readonly type: ActionTypes;
  readonly payload?: any;
}

export const wishReducer = (state: Wish[], action: IAction): Wish[] => {
  const onFilterWishes = (value = 'default') => {
    let sortSelected: Wish[] = _sortByDefault();
    if(value === 'value'){
      sortSelected = _sortByValue();
    }else if(value === 'title'){
      sortSelected = _sortByTitle();
    }
    return sortSelected;
  }

  const _sortByValue = () => {
    return [...state].sort((a,b)=> a.value - b.value);
  }

  const _sortByTitle = () => {
    return [...state].sort((a,b)=> {
      if (a.title < b.title) {return -1;}
      if (a.title > b.title) { return 1; }
      return 0;
    });
  }

  const _sortByDefault = () => {
    return [...state].sort((a,b)=> {
      if (a.id < b.id) {return -1;}
      if (a.id > b.id) { return 1; }
      return 0;
    });
  }

  const onCrossOutRow = (id: string) => {
    return state.map((wish: Wish) => {
      if(wish.id === id && wish.status == 'none')
        return({...wish, status: 'completed' })
      else if(wish.id === id && wish.status == 'completed')
        return({...wish, status: 'none' })
      else
        return(wish)
      }
    ) as Wish[];
  }

  switch(action.type) {
    case ActionTypes.ADD_WISHES:
      return [...state, {
        id: 'aX'+ state.length + 1,
        title: action.payload?.title || '',
        value: action.payload?.value || 0,
        status: 'none'
      }];
    case ActionTypes.REMOVE_WISHES:
      return state.map((wish: Wish) => wish.id === action.payload
        ? ({ ...wish, status: 'removed' })
        : (wish)
      )
    case ActionTypes.UPDATE_WISHES:
      return state.map((wish: Wish) =>
      wish.id == action.payload?.id
        ? ({ ...wish,
          id: action.payload?.id,
          title: action.payload?.title || '',
          value: action.payload?.value || 0,
          status: 'none' })
        : (wish)
      )
    case ActionTypes.FILTER_WISHES:
      return onFilterWishes(action.payload)
    case ActionTypes.CROSS_OUT_WISHES:
      return onCrossOutRow(action.payload);
    case ActionTypes.REMOVE_ALL_WISHES:
      return [];
    default:
      return state;
  }
}