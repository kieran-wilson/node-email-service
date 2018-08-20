import { either, isNil, isEmpty } from 'ramda';

export const nilOrEmpty = either(isNil, isEmpty);
