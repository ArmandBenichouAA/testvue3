/* eslint-disable no-restricted-globals */

const currencySymbols = {
  EUR: '€',
};

const currencyPositionBefore = ['nl', 'en'];
const CurrencySeparator = {
  nl: ' ',
  en: '',
  fr: ' ',
};

const ThousandSeparator = {
  nl: '.',
  en: ',',
  fr: ' ',
};

function getThousandSeparator(lang) {
  return ThousandSeparator[lang];
}

function getCurrencySeparator(lang) {
  return CurrencySeparator[lang];
}

function isCurrencyBefore(lang) {
  return currencyPositionBefore.includes(lang);
}

function getCurrencySymbol(currencySymbol) {
  return currencySymbols[currencySymbol];
}

function currencyPosition(lang, unit, priceLabel) {
  const symbol = `${getCurrencySymbol(unit)}`;
  const currencySeparator = getCurrencySeparator(lang);

  if (isCurrencyBefore(lang)) {
    return `${symbol}${currencySeparator}${priceLabel}`;
  }

  return `${priceLabel}${currencySeparator}${symbol}`;
}

function filterNumber(value) {
  if (typeof value === 'number') {
    return value;
  }
  if (/^[-+]?(\d+|Infinity)$/.test(value)) {
    return Number(value);
  }
  return NaN;
}

function precision(n, p = 2) {
  const value = filterNumber(n);
  const precisionNumber = filterNumber(p);

  if (isNaN(n) || isNaN(precisionNumber) || p > 10) {
    return n;
  }

  // eslint-disable-next-line no-restricted-properties
  const power = 10 ** precisionNumber;
  return Math.round(value * power) / power;
}

function numeric(n, p, lang) {
  let value = filterNumber(n);
  const thousandSeparator = getThousandSeparator(lang);

  if (isNaN(value)) {
    return n;
  }

  value = precision(n, p);

  value = value.toString();
  value = value.replace(/\./g, ',');
  if (thousandSeparator) {
    value = value.replace(/\B(?=(\d{3})+(?!\d))/g, thousandSeparator);
  }

  return value;
}

function currency(price, floatingPrecision = 2, displaySign = false, lang = 'fr') {
  const { unit, value } = price;
  // eslint-disable-next-line no-nested-ternary
  const sign = displaySign ? (value >= 0 ? '+ ' : '- ') : '';
  return `${sign}${currencyPosition(lang, unit, numeric(value, floatingPrecision, lang))}`;
}

function capitalize(s) {
  if (typeof s !== 'string') {
    return s;
  }
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export {
  numeric,
  currency,
  capitalize,
  isCurrencyBefore,
  getCurrencySymbol,
  getCurrencySeparator,
  getThousandSeparator,
};
