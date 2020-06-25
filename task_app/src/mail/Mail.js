// eslint-disable-next-line import/no-commonjs
module.exports = class Mail {
  constructor(from, to, subject, text) {
    this.from = from;
    this.to = to;
    this.subject = subject;
    this.text = text;
  }

  getFrom() {
    return this.from;
  }

  getTo() {
    return this.to;
  }

  getSubject() {
    return this.subject;
  }

  getText() {
    return this.text;
  }
};
