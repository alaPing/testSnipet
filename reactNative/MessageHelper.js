import { all, call, select } from 'redux-saga/effects';


// fileDownload and getProperty are defined.
// download a file -> get its property -> return
function* loop(fileId) {
  yield call(fileDownload, fileId);
  const property = yield call(getProperty, fileId);
  return {
    id: fileId,
    ...property,
  };
}

export function* normalizeFileData(files, pattern) {
  if (pattern === 1) {
    return yield all(files.map(file => call(loop, file.id)));
  }
  // abbreviate another pattern
}
