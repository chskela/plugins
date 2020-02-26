const mw = modal({
  title: 'Ура',
  closable: true,
  content: '<h1> ddddd</h1>',
  width: '500px',
  footerButtons: [
    {
      text: 'Ок',
      type: 'primary',
      handler() {
        console.log('Primary btn clicked')
        mw.close()
      }
    },
    {
      text: 'Cancel',
      type: 'danger',
      handler() {
        console.log('Danger btn clicked')
        mw.close()
      }
    }
  ]
});
