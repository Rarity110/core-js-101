/* ************************************************************************************************
 *                                                                                                *
 * Please read the following tutorial before implementing tasks:                                   *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object        *
 *                                                                                                *
 ************************************************************************************************ */


/**
 * Returns the rectangle object with width and height parameters and getArea() method
 *
 * @param {number} width
 * @param {number} height
 * @return {Object}
 *
 * @example
 *    const r = new Rectangle(10,20);
 *    console.log(r.width);       // => 10
 *    console.log(r.height);      // => 20
 *    console.log(r.getArea());   // => 200
 */
function Rectangle(width, height) {
  class Shape {
    constructor(w, h) {
      this.width = w;
      this.height = h;
    }

    getArea() { return this.width * this.height; }
  }
  return new Shape(width, height);
}


/**
 * Returns the JSON representation of specified object
 *
 * @param {object} obj
 * @return {string}
 *
 * @example
 *    [1,2,3]   =>  '[1,2,3]'
 *    { width: 10, height : 20 } => '{"height":10,"width":20}'
 */
function getJSON(obj) {
  return JSON.stringify(obj);
}


/**
 * Returns the object of specified type from JSON representation
 *
 * @param {Object} proto
 * @param {string} json
 * @return {object}
 *
 * @example
 *    const r = fromJSON(Circle.prototype, '{"radius":10}');
 *
 */
function fromJSON(proto, json) {
  const obj = JSON.parse(json);
  const value = Object.values(obj);
  return new proto.constructor(...value);
}


/**
 * Css selectors builder
 *
 * Each complex selector can consists of type, id, class, attribute, pseudo-class
 * and pseudo-element selectors:
 *
 *    element#id.class[attr]:pseudoClass::pseudoElement
 *              \----/\----/\----------/
 *              Can be several occurrences
 *
 * All types of selectors can be combined using the combination ' ','+','~','>' .
 *
 * The task is to design a single class, independent classes or classes hierarchy
 * and implement the functionality to build the css selectors using the provided cssSelectorBuilder.
 * Each selector should have the stringify() method to output the string representation
 * according to css specification.
 *
 * Provided cssSelectorBuilder should be used as facade only to create your own classes,
 * for example the first method of cssSelectorBuilder can be like this:
 *   element: function(value) {
 *       return new MySuperBaseElementSelector(...)...
 *   },
 *
 * The design of class(es) is totally up to you, but try to make it as simple,
 * clear and readable as possible.
 *
 * @example
 *
 *  const builder = cssSelectorBuilder;
 *
 *  builder.id('main').class('container').class('editable').stringify()
 *    => '#main.container.editable'
 *
 *  builder.element('a').attr('href$=".png"').pseudoClass('focus').stringify()
 *    => 'a[href$=".png"]:focus'
 *
 *  builder.combine(
 *      builder.element('div').id('main').class('container').class('draggable'),
 *      '+',
 *      builder.combine(
 *          builder.element('table').id('data'),
 *          '~',
 *           builder.combine(
 *               builder.element('tr').pseudoClass('nth-of-type(even)'),
 *               ' ',
 *               builder.element('td').pseudoClass('nth-of-type(even)')
 *           )
 *      )
 *  ).stringify()
 *    => 'div#main.container.draggable + table#data ~ tr:nth-of-type(even)   td:nth-of-type(even)'
 *
 *  For more examples see unit tests.
 */

const cssSelectorBuilder = {
  res: [],

  stringify() {
    if (this.combivalue) return this.combivalue;
    let value = '';
    if (this.tagvalue) value += this.tagvalue;
    if (this.idvalue) value += this.idvalue;
    if (this.classvalue) value += this.classvalue;
    if (this.attrvalue) value += this.attrvalue;
    if (this.psClassvalue) value += this.psClassvalue;
    if (this.psElvalue) value += this.psElvalue;
    return value;
  },

  element(value) {
    const el = { ...this };
    if (el.tagvalue) {
      throw new Error('Element, id and pseudo-element should not occur more then one time inside the selector');
    }
    if (
      el.idvalue !== undefined
      || el.classvalue !== undefined
      || el.attrvalue !== undefined
      || el.psClassvalue !== undefined
      || el.psElvalue !== undefined
    ) {
      throw new Error('Selector parts should be arranged in the following order: element, id, class, attribute, pseudo-class, pseudo-element');
    }
    el.tagvalue = value;
    return el;
  },

  id(value) {
    const el = { ...this };
    if (el.idvalue) {
      throw new Error('Element, id and pseudo-element should not occur more then one time inside the selector');
    }
    if (
      el.classvalue !== undefined
      || el.attrvalue !== undefined
      || el.psClassvalue !== undefined
      || el.psElvalue !== undefined
    ) {
      throw new Error('Selector parts should be arranged in the following order: element, id, class, attribute, pseudo-class, pseudo-element');
    }
    el.idvalue = `#${value}`;
    return el;
  },

  class(value) {
    const el = { ...this };
    el.level = [...this.res];
    if (el.attrvalue !== undefined || el.psClassvalue !== undefined || el.psElvalue !== undefined) {
      throw new Error('Selector parts should be arranged in the following order: element, id, class, attribute, pseudo-class, pseudo-element');
    }
    el.classvalue = el.classvalue ? `${el.classvalue}.${value}` : `.${value}`;
    return el;
  },

  attr(value) {
    const el = { ...this };
    if (el.psClassvalue !== undefined || el.psElvalue !== undefined) {
      throw new Error('Selector parts should be arranged in the following order: element, id, class, attribute, pseudo-class, pseudo-element');
    }
    el.attrvalue = el.attrvalue ? `${el.attrvalue}[${value}]` : `[${value}]`;
    return el;
  },

  pseudoClass(value) {
    const el = { ...this };
    if (el.psElvalue !== undefined) {
      throw new Error('Selector parts should be arranged in the following order: element, id, class, attribute, pseudo-class, pseudo-element');
    }
    el.psClassvalue = el.psClassvalue ? `${el.psClassvalue}:${value}` : `:${value}`;
    return el;
  },

  pseudoElement(value) {
    const el = { ...this };
    if (el.psElvalue) {
      throw new Error('Element, id and pseudo-element should not occur more then one time inside the selector');
    }
    el.psElvalue = `::${value}`;
    return el;
  },

  combine(selector1, combinator, selector2) {
    const el = { ...this };
    const result = `${selector1.stringify()} ${combinator} ${selector2.stringify()}`;
    el.combivalue = el.combivalue ? el.combivalue + result : result;
    return el;
  },
};


module.exports = {
  Rectangle,
  getJSON,
  fromJSON,
  cssSelectorBuilder,
};
