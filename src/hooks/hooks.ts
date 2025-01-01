import { useDispatch } from "react-redux";
import { AppDispatchType } from "../redux/reduxStore";

export const useAppDispatch: () => AppDispatchType = useDispatch;
