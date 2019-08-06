'use strict';

/**
 * Initializes the ellmoeFirebase app.
 */
function ellmoeFirebase() {
  firebase.auth().signInAnonymously().then(() => {
    firebase.firestore().enablePersistence()
      .then(() => {
        this.initTemplates();
        this.initRouter();
      });
  }).catch(err => {
    console.log(err);
  });
}

/**
 * Initializes the router for the ellmoeFirebase app.
 */
ellmoeFirebase.prototype.initRouter = function() {
  this.router = new Navigo();

  this.router
    .on({
      '/': () => {
        this.viewList();
      }
    })
    .on({
      '/setup': () => {
        this.viewSetup();
      }
    })
    .resolve();

  firebase
    .firestore()
    .collection('locations')
    .limit(1)
    .onSnapshot(snapshot => {
      if (snapshot.empty) {
        this.router.navigate('/setup');
      }
    });
};

ellmoeFirebase.prototype.getCleanPath = function(dirtyPath) {
  if (dirtyPath.startsWith('/index.html')) {
    return dirtyPath.split('/').slice(1).join('/');
  } else {
    return dirtyPath;
  }
};

ellmoeFirebase.prototype.getFirebaseConfig = function() {
  return firebase.app().options;
};

ellmoeFirebase.prototype.getRandomItem = function(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
};

window.onload = () => {
  window.app = new ellmoeFirebase();
};
