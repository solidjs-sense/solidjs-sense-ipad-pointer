import propNames from '../propNames';

const isElHasProperty = (el: HTMLElement, property?: string) => {
  if (!el.getAttribute) {
    return false;
  }
  const dataAttr = el.getAttribute(propNames.dataAttr);
  if (property && dataAttr?.includes(property)) {
    return true;
  } else if (!property && dataAttr !== null) {
    return true;
  } else {
    return false;
  }
};

export default isElHasProperty;
