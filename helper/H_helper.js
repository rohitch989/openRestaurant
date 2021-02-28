exports.reverseString = (str) => {
  var t = "";
  var ans = "";
  for (var i = 0; i < str.length; i++) {
    if (str[i] !== "-") {
      t += str[i];
    } else {
      ans = "/" + t + ans;
      t = "";
    }
  }
  ans = t + ans;
  return ans;
}
// 02/23/2021 5:36 AM
exports.getDay = newdate => {
  const day = new Date(newdate).toUTCString().slice(0, 3);
  return day;
}
