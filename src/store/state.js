export default {
  callingAPI: false,
  searching: '',
  serverURI: 'http://45.55.12.52:8080',
  user: null,
  token: null,
  userInfo: {
    messages: [{1: 'test', 2: 'test'}],
    notifications: [],
    tasks: [],
    GUID: '',
    token: ''
  },
  menuState: {
    dashboard: true,
    ownedDevices: false,
    rentedDevices: false,
    marketplace: false
  },
  ownedDevices: [], // Array of devices owned by this user.
  rentedDevices: [], // Array of devices rented by this user.
  modal: {
    show: false,
    title: 'Test title',
    body: '',
    button1Text: 'Close',
    button1Func: function () { $('.appModal').modal('hide') },
    button1Show: true,
    button2Text: '',
    button2Func: null,
    button2Show: true,
    showLoginForm: false
  }
}
