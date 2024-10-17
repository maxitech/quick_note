import Quill from 'quill'
import 'quill/dist/quill.snow.css'

const quill = new Quill('#editor', {
  modules: {
    syntax: true,
    toolbar: '#toolbar-container'
  },
  placeholder: 'Compose an epic...',
  theme: 'snow'
})
