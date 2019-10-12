function isEmpty(obj) {
  for (let key in obj) {
    // 若迴圈開始，代表有屬性存在
    return false;
  }
  return true;
}
