var
Legio = require("../std"),
Promise = require("../async/promise");

function getXHR(file, async, post) {
  var xhr;
  
  if (global.XMLHttpRequest) {
    xhr = new XMLHttpRequest();
  }
  else if (global.ActiveXObject) {
    xhr = new ActiveXObject("MSXML2.XMLHTTP"); // Microsoft.XMLHTTP
  }
  
  if (xhr) {
    if (post) {
      xhr.open("POST", file, async);
      xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
      xhr.setRequestHeader("Content-Length", post.length);
      xhr.setRequestHeader("Connection", "close");
    }
    else {
      xhr.open("GET", file, async);
    }
  }
  
  return xhr;
}

function onXHRIsDone() {
  if (this.readyState === 4) {
    if (this._callback) {
      return this._callback(this.responseText, this.status);
    }
    
    if (this.status === 200) {
      this._promise.resolve(this.responseText);
    }
    else {
      this._promise.reject(this.status);
    }
  }
}

var Request = {
  getXHR: getXHR,
  
  file: function (file, cfg) { if (cfg === undefined) { cfg = {}; } 
    if (cfg.get) {
      file += "?" + cfg.get;
    }
    
    var
    async = cfg.async !== false,
    xhr = getXHR(file, async, cfg.post),
    promise;
    
    if (async) {
      if (cfg.callback) {
        xhr._callback = cfg.callback;
      }
      else {
        promise = new Promise(xhr);
        xhr._promise = promise;
      }
      xhr.onreadystatechange = onXHRIsDone;
    }
    
    xhr.send(cfg.post);
    
    return promise || xhr;
  }
};

// A script loading for a browser environment
if (global.document) {
  
  if (!document.head) {
    document.head = document.getElementsByTagName("head")[0];
  }

  var
  onScriptIsLoaded = function () {
    var rs = this.readyState;
    if (rs === "complete" || rs === "loaded") {
      this.onreadystatechange = null;
      document.head.removeChild(this);
      
      onScriptIsDone.call(this);
    }
  },
  onScriptIsDone = function () {
    if (this._promise) {
      this._promise.resolve();
    }
    else {
      this._callback.call(this);
    }
  };
  
  Request.script = function (file, callback) {
    var script = document.createElement("script"), promise;
    
    if (callback) {
      script._callback = callback;
    }
    else {
      promise = new Promise(script);
      script._promise = promise;
    }
    
    if (script.readyState) {
      script.onreadystatechange = onScriptIsLoaded;
    }
    else {
      script.onload = onScriptIsDone;
    }
    
    script.src = file;
    document.head.appendChild(script);
    
    return promise || script;
  };
}

module.exports = Request;
