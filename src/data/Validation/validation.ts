import { InputType } from "../../types/input";

type Rule = {
  check: (text: string) => boolean;
  message: string;
};

const ruleSet = new Map<InputType, Rule[]>();
ruleSet.set('email', [
  {
    check(text) {
      return /(.+)@(.+){2,}\.(.+){2,}/.test(text);
    },
    message: `Email doesn't meet format`,
  },
]);
ruleSet.set('password', [
  {
    check(text) {
      return /(.+){8,}/.test(text);
    },
    message: 'Password must be at least 8 characters long',
  },
  {
    check(text) {
      return /[A-Z]/.test(text);
    },
    message: 'Password must contain at least one uppercase letter',
  },
  {
    check(text) {
      return /[a-z]/.test(text);
    },
    message: 'Password must contain at least one lowercase letter',
  },
  {
    check(text) {
      return /\d/.test(text);
    },
    message: 'Password must contain at least one number',
  },
  {
    check(text) {
      return /^[A-Za-z0-9]*$/.test(text);
    },
    message: 'Only English letters or numbers are allowed',
  },
]);
ruleSet.set('firstName', [
  {
    check(text) {
      return /(.+){1,}/.test(text);
    },
    message: 'First name must contain at least one character',
  },
  {
    check(text) {
      return /^[A-Za-z ]*$/.test(text);
    },
    message: 'Only English letters or spaces are allowed',
  },
]);
ruleSet.set('lastName', [
  {
    check(text) {
      return /(.+){1,}/.test(text);
    },
    message: 'Last name must contain at least one character',
  },
  {
    check(text) {
      return /^[A-Za-z ]*$/.test(text);
    },
    message: 'Only English letters or spaces are allowed',
  },
]);
ruleSet.set('birthday', [
  {
    check(text) {
      const now = new Date();
      const birthday = new Date(text);
      const difference = now.getTime() - birthday.getTime();
      return difference / (1000 * 60 * 60 * 24 * 365.25) >= 13;
    },
    message: 'You must at least 13 years old',
  },
]);
ruleSet.set('street', [
  {
    check(text) {
      return /(.+){1,}/.test(text);
    },
    message: 'Street must contain at least one character',
  },
]);
ruleSet.set('city', [
  {
    check(text) {
      return /(.+){1,}/.test(text);
    },
    message: 'City must contain at least one character',
  },
  {
    check(text) {
      return /^[A-Za-z ]*$/.test(text);
    },
    message: 'Only English letters or spaces are allowed',
  },
]);
ruleSet.set('postalCodeUS', [
  {
    check(text) {
      return /^\d{5}(?:-\d{4})?$/.test(text);
    },
    message: `Postal code doesn't meet U.S. format`,
  },
]);
ruleSet.set('postalCodeCA', [
  {
    check(text) {
      return /^[A-Z]\d[A-Z] \d[A-Z]\d$/.test(text);
    },
    message: `Postal code doesn't meet Canada format`,
  },
]);
class Validation {
  public static checkValidity(text: string, type: InputType): string {
    let error = '';
    const rules = ruleSet.get(type);
    if (rules) {
      rules.forEach((rule) => {
        if (!rule.check(text)) {
          error += `${rule.message}\n`;
        }
      });
    }
    return error;
  }
}

export default Validation;
