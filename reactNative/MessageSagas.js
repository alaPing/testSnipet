import { all, call, select, takeLatest } from 'redux-saga/effects';

import MessageAPI from 'MessageAPI';
import { normalizeFileData } from 'MessageHelper';
import MessageActions from 'MessageRedux';


export function* doLoadMessageTemplate(action: Object): Saga<void> {
  const options = { templateId: action.templateId };
  const accessToken = yield select(state => state.auth.accessToken);
  const result = yield call(MessageAPI.getMessageTemplate, options, accessToken);

  const files = result.data.files
    ? yield call(normalizeFileData, result.data.files, 1)
    : [];

  yield put(MessageActions.loadMessageTemplateCompleted(result.data.template, files));
}


export function* initMessageSagas(): Saga<void> {
  yield all([
    takeLatest(MessageTypes.LOAD_MESSAGE_TEMPLATE, doLoadMessageTemplate),
    // abbreviate
  ]);
}
