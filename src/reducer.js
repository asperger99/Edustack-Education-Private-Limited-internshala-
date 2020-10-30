export const initialState = {
  user: null,
  data:[],
  updatedData:[],
  globalChapter:''
};
function reducer(state, action) {
  switch (action.type) {
    case "UPDATE_USER":
      return {
        ...state,
        user: action.item,
      };
      case "UPDATE_DATA":
      return {
        ...state,
        data:action.item,
      };
      case "UPDATE_CHAPTER":
      return {
        ...state,
        globalChapter:action.item,
      };
      case "UPDATE_UPDATEDDATA":
      return {
        ...state,
        updatedData:[...state.updatedData,action.item],
      };
    default:
      return state;
  }
}
export default reducer;
