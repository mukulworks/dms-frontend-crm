import { fork } from 'redux-saga/effects';
import { watchUserAuthentication, watchUser, watchDialer} from './watchers';

export default function* startForman() {
  yield fork(watchUserAuthentication);
    yield fork(watchUser);
    yield fork(watchDialer);
}