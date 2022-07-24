/**
 * Returns true if the specified string has the balanced brackets and false otherwise.
 * Balanced means that is, whether it consists entirely of pairs of opening/closing brackets
 * (in that order), none of which mis-nest.
 * Brackets include [],(),{},<>
 *
 * @param {string} str
 * @return {boolean}
 *
 * @example:
 *   '' => true
 *   '[]'  => true
 *   '{}'  => true
 *   '()   => true
 *   '[[]' => false
 *   ']['  => false
 *   '[[][][[]]]' => true
 *   '[[][]][' => false
 *   '{)' = false
 *   '{[(<{[]}>)]}' = true
 */
 function isBracketsBalanced(str) {
  let res = false;
  if (str.length % 2 !== 0) return res;
  const brackets = ['{}', '[]', '()', '<>'];
  let newStr = str;
  for (let i = 0; i < brackets.length;) {
    // console.log(i);
    // console.log(brackets[i]);
    // console.log(newStr.indexOf(brackets[i]) );
    if (newStr.indexOf(brackets[i]) !== -1) {
      newStr = newStr.replace(brackets[i], '');
      // console.log(newStr);
      i = 0;
    } else { i += 1; }
  }
  
console.log(newStr);
  if (newStr === '') res = true;
  console.log(res);
  return res;
}

// isBracketsBalanced('[[][][[]]]');
isBracketsBalanced('{<>}');

const res = [];
  await array.forEach((promise) => {
    promise
      .then((prom) => res.push(prom))
      .catch((error) => new Error(error)); 
  });
  return res.reduce(action);