function findFirstSingleChar(str) {
  let res = null;
  const arr = str.split('');
  console.log(arr);
  [res] = arr.filter((el) => str.indexOf(el) === str.lastIndexOf(el));
  console.log(res);
}
   
findFirstSingleChar('abracadabra')