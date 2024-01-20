import { fork } from 'redux-saga/effects';
import { watchInbound, watchOutbound } from './watchers';

export default function* startCRMForman() {
    yield fork(watchInbound);
    // yield fork(watchOutbound);
}