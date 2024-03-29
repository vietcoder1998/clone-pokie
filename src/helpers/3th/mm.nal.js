export class MMNalData {
  domain = process.env.NEXT_PUBLIC_MM_DOMAIN;
  token = "";
  user_id = "";
  chanel = "";
  url = `${this.domain}/api/v4/posts`;
  channel_id = "";
  _options = {};

  static instance = new MMNalData();

  get pending_post_id() {
    return [this.uid, new Date().getTime()].join(":");
  }
  get options() {
    return {
      file_ids: [],
      message: "test_data",
      channel_id: this.channel_id,
      pending_post_id: this.pending_post_id,
      user_id: this.user_id,
      create_at: 0,
      metadata: {},
      props: {
        disable_group_highlight: true,
      },
      update_at: new Date().getTime(),
      reply_count: 0,
    };
  }

  static set(key, value) {
    this.instance[key] = value;
  }

  post(message) {
    const newOptions = this.options;

    return fetch(this.url, {
      method: "POST",
      body: JSON.stringify({ ...newOptions, message }),
      "Content-Type": "application/json; charset=",
      headers: {
        "X-Csrf-Token": this.token,
      },
    }).then((response) => {
      console.log(response);
    });
  }
}
