import { INC, DEC } from '../actionTypes/counterActionType';

export const incrementAction = () => ({ type: INC });
export const decrementAction = () => ({ type: DEC });