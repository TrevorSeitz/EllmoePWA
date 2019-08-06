// offline data
db.enablePersistence()
  .catch(err => {
    if(err.code == 'failed-precondition'){
      // probbaly multiple tabs open
      console.log('persistence failed')
    } else if(err.code == 'unimplemented'){
      // lack of browser support
      console.log('persitence is not available')
    }
  })

// Real-time listener
db.collection('locations').onSnapshot((snapshot) => {
  // console.log(snapshot.docChanges())
  snapshot.docChanges().forEach(change =>{
    console.log(change, change.doc.data(), change.doc.id)
    if(change.type === 'added'){
      // add data to ui
      renderLocation(change.doc.data(), change.doc.id)
    }
    if(change.type === 'removed'){
      // remove data from ui
      removeLocation(change.doc.id)
    }
  })
})

// Add new location
const form = document.querySelector('form')
form.addEventListener('submit', evt => {
  evt.preventDefault()

  const location = {
    name: form.title.value,
    // ingredients: form.ingredients.value

  }

  function getUserMedia(options, successCallback, failureCallback) {
    var api = navigator.getUserMedia || navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia || navigator.msGetUserMedia;
    if (api) {
      return api.bind(navigator)(options, successCallback, failureCallback);
    }
  }

  db.collection('locations').add(location)
    .catch(err => console.log(err))

    // could/should use reset method
  form.name.value = ''
  // form.ingredients.value = ''
})



// delete a location
const locationContainer = document.querySelector('.locations')
locationContainer.addEventListener('click', evt => {
  console.log("EVENT: ", evt)
  if(evt.target.tagName === 'I'){
    const id = evt.target.getAttribute('data-id')
    console.log("Clicked location delete id# : ", id)
    // db.collection('locations').doc(id).delete()
  }

  // if(evt.target.tagName === 'IMG'){
  //   const img-id = evt.target.getAttribute('data-id')
  //   console.log("Clicked location id# : ", img-id)
  // }
})
