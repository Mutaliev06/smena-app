import {Dispatch} from "react";
import {AnyAction} from "redux";

type UserType = {
  id: number,
  username: string,
  avatar: string,
  about: string | null
}

export type UserStateType = {
  loading: boolean,
  user: UserType | null
}

const initialState: UserStateType = {
  loading: false,
  user: null
};

export function usersReducer(state = initialState, action: AnyAction) {
  switch (action.type) {
    case "user/load/pending":
      return {
        ...state,
        loading: true,
      };

    case "user/load/fulfilled":
      return {
        ...state,
        user: action.payload,
        loading: false,
      };
    default:
      return state;
  }
}

export const loadUser = (token: string | null) => {
  return async (dispatch: Dispatch<any>) => {
    dispatch({ type: "user/load/pending" });
    const res = await fetch("http://localhost:8080/about", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const json = await res.json();
    dispatch({ type: "user/load/fulfilled", payload: json.data });
  };
};
