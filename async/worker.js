(function (global, undefined) {
  function definition(Legio, Request, construct) {
    
    var Worker = global.Worker;
    
    if (!Worker || true) {
      
      var getStructuredClone = function (obj) {
            if (Function.is(obj)) {
              // Nothing to do here…
              throw "Functions can't be cloned.";
            }
            
            var res;
            
            if (Object.is(obj)) {
              // Oh God why?!
              
              if (obj instanceof String) {
                res = new String(obj);
              }
              else if (obj instanceof Number) {
                res = new Number(obj);
              }
              else if (obj instanceof Boolean) {
                res = new Boolean(obj);
              }
              else if (obj instanceof Date) {
                res = new Date(obj);
              }
              else if (obj instanceof RegExp) {
                res = new RegExp(
                  obj.source,
                  "g".substr(0, +obj.global) + "i".substr(0, +obj.ignoreCase) + "m".substr(0, +obj.multiline)
                );
              }
              else {
                res = {};
              }
              
              for (var i in obj) if (Object.owns(obj, i)) {
                // Inception, right?
                res[i] = getStructuredClone(obj[i]);
              }
              
              obj = res;
            }
            
            return obj;
          },
          
          runCode = function () {
            // I know God just killed a few kittens for this, but it's necessary :-(
            with (this) {
              self = this;
              
              importScripts = function () {
                for (var i = 0; i < arguments.length; ++i) {
                  // And again
                  eval(Request.file(arguments[i] + "?" + Date.now(), { async: false }).responseText);
                }
              };
              
              // And again again… Againception!
              eval(arguments[0]);
            }
            
            // But it's really cute and it does its job :-)
          },
          
          runAsync = function (fn, time) {
            global.setTimeout(fn, time || 0);
          },
          
          transferMessage = function (env, msg) {
            if (Function.is(env.onmessage)) {
              msg = getStructuredClone(msg);
              
              // Finally, send the fucking message. Was it really necessary to make so much mess?
              var time = Date.now();
              runAsync(function () {
                env.onmessage({ data: msg, timeStamp: time });
              });
            }
          };
      
      
      Worker = construct({
        init: function (file) {
          var self = this,
              stack = this.stack = [],
              
              attempts = 0,
              
              envTimeouts = this.envTimeouts = [],
              envIntervals = this.envIntervals = [],
              
              // A magical environment for the file
              env = this.environment = {
                self: null,
                
                postMessage: function (msg) {
                  if (self.terminated) {
                    return;
                  }
                  
                  if (!Function.is(self.onmessage)) {
                    if (attempts++ < 20) {
                      runAsync(function () {
                        env.postMessage(msg);
                      }, 10);
                    }
                    
                    // Well, that escalated quickly…
                    
                    return;
                  }
                  
                  transferMessage(self, msg);
                },
                
                // Next shit full of termination. Hey, somebody, call the terminator!
                close: function () {
                  self.terminate();
                  
                  throw "Worker stopped";
                },
                
                // Yeah, really, I have to handle this shit because of termination…
                setTimeout: function (fn, time) {
                  if (self.terminated) {
                    return;
                  }
                  
                  var id = global.setTimeout(fn, time);
                  
                  envTimeouts.push(id);
                  
                  return id;
                },
                setInterval: function (fn, time) {
                  if (self.terminated) {
                    return;
                  }
                  
                  var id = global.setInterval(fn, time);
                  
                  envIntervals.push(id);
                  
                  return id;
                },
                
                onmessage: null,
                onerror: null,
                
                importScripts: null
              };
          
          // Now, captain, load the file!
          Request.file(file + "?" + Date.now(), {
            callback: function (text, status) {
              if (status === 200) {
                runCode.call(env, text);
                
                self.loaded = true;
                
                // Oh, boy, really? Do we need all those old messages?
                for (var i = 0; i < stack.length; ++i) {
                  self.postMessage(stack[i]);
                }
                
                // Fine. Now clean. *poof*
                stack = self.stack = null;
              }
              // Ehm, I'm not really sure why there is an error event…
              else {
                var attempts = 0,
                    invokeError = function () {
                      if (Function.is(self.onerror)) {
                        self.onerror({ message: "Status " + status + " received!" });
                      }
                      else if (attempts++ < 20) {
                        runAsync(invokeError, 10);
                      }
                    };
                
                runAsync(invokeError);
              }
            }
          });
        },
        members: {
          postMessage: function (msg) {
            if (this.terminated) {
              return;
            }
            
            if (!this.loaded) {
              // I quite don't like asynchronous programming… :-(
              this.stack.push(msg);
              return;
            }
            
            transferMessage(this.environment, msg);
          },
          terminate: function () {
            // TODO:
            // How the fuck can I terminate this shit? Impossibru!
            
            if (this.terminated) {
              return;
            }
            
            this.terminated = true;
            
            var envTimeouts = this.envTimeouts,
                envIntervals = this.envIntervals,
                i;
            
            for (i = 0; i < envTimeouts.length; ++i) {
              global.clearTimeout(envTimeouts[i]);
            }
            for (i = 0; i < envIntervals.length; ++i) {
              global.clearInterval(envIntervals[i]);
            }
          }
        }
      });
    }
    
    return Worker;
  }
  
  // Final export
  if (typeof module !== "undefined") {
    module.exports = definition(require("../std"), require("../request"), require("../oop/construct"));
  }
  else if (typeof define !== "undefined") {
    define(["../std", "../request", "../oop/construct"], definition);
  }
})(this);