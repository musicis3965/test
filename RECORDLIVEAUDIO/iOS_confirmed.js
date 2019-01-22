if (navigator.mediaDevices === undefined) { 
      navigator.mediaDevices = {};
    if (navigator.mediaDevices.getUserMedia === undefined) {
      navigator.mediaDevices.getUserMedia = function(constraints) {
        // First get ahold of the legacy getUserMedia, if present
        let getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
        // Some browsers just don't implement it - return a rejected promise with an error
        // to keep a consistent interface
        if (!getUserMedia) {
          return Promise.reject(new Error('getUserMedia is not implemented in this browser'));
        }
        // Otherwise, wrap the call to the old navigator.getUserMedia with a Promise
        return new Promise(function(resolve, reject) {
          getUserMedia.call(navigator, constraints, resolve, reject);
        });
      } 
    }
    navigator.mediaDevices.getUserMedia({
      audio: true
    }).then(function(stream) {
      successCallBack(stream);
    }).catch(function(error) {
      console.log('error: ',error);
    });
    function successCallback(stream){
      console.log('stream: ',stream);
   }
}