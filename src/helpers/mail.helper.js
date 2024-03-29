class EmailHelper {
  static instance = new EmailHelper();

  static getLinkToMail(mail, subject, body) {
    const link =
      `mailto:${mail}` +
      "?subject=" +
      encodeURIComponent(`${subject}`) +
      "&body=" +
      encodeURIComponent(`${body}`);

    return link;
  }
}

export default EmailHelper;
