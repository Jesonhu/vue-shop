export const sendSmsMixin = {
  computed: {
    sendSmsActive() {
      if (this.username.length === 11 && this.smsText === '获取验证码') {
        return 'active';
      }
      return '';
    }
  },
  methods: {
    countDown() {
      this.timer = null;
      clearInterval(this.timer);
      let num = 59;
      this.smsText = '59s';
      this.timer = setInterval(() => {
        num = num - 1;
        if (num === 0) {
          clearInterval(this.timer);
          this.timer = null;
          this.smsText = '获取验证码';
          return;
        }
        this.smsText = `${num}s`;
      }, 1000);
    }
  }
};
