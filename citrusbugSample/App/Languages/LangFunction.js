import {english} from './LangStringFiles/english';
import {dutch} from './LangStringFiles/dutch';

export function getLangValue(value, language) {
  if (language === 'en') {
    return english[value];
  } else {
    return dutch[value];
  }
}

