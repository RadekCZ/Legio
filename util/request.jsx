#module Legio.Request (
  Legio = "../std" = Legio,
  Promise = "../async/promise" = Legio.Promise
)

getXHR(file, async, post) -> {
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

onXHRIsDone() -> {
  if (@readyState === 4) {
    if (@_callback) {
      return @_callback(@responseText, @status);
    }
    
    if (@status === 200) {
      @_promise.resolve(@responseText);
    }
    else {
      @_promise.reject(@status);
    }
  }
}

var Request = {
  getXHR: getXHR,
  
  file: (file, cfg = {}) -> {
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
  onScriptIsLoaded = () -> {
    var rs = @readyState;
    if (rs === "complete" || rs === "loaded") {
      @onreadystatechange = null;
      document.head.removeChild(@);
      
      onScriptIsDone.call(@);
    }
  },
  onScriptIsDone = () -> {
    if (@_promise) {
      @_promise.resolve();
    }
    else {
      @_callback.call(@);
    }
  };
  
  Request.script = (file, callback) -> {
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

#export Request;
