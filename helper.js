let createYearMonth = (y,m) => {
  if (m < 1 || m > 12) {
    throw new Error ("Month must be between 1 and 12");
  }
  return new Date(y, m-1);
}

let parse_inline_html = (list_of_items) => {
  /*
   * Parse <<<hyperlinks>>>
   * return [[ {_text: text, _link:link } ]]
   */

  let r = /<<<(.*)>>>(.*)/;
  return list_of_items.map(i => {
    if (typeof i !== typeof ''){
      return i
    }

    let result = i.match(r);
    if (result) {
      return {
        _link: result[1],
        _text: result[2],
      }
    }
    else {
      return i;
    }
  }
)}
