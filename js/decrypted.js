// Note: This file has been modified from its original version. Do not trust
// slightly reverse-engineered file as a source of truth.

var System = new function() {
    this.version = 1408337099853;
    this.TAU = 6.283185307179586;
    this.RAD2DEG = 57.2957795131;
    this.DEG2RAD = 0.01745329251;
    this.VIEW2D = 0;
    this.VIEW3D = 1;
    this.NEAREST = 0;
    this.LINEAR = 1;
    this.DRAW = 1;
    this.CACHE = 2;
    this.DRAW_CACHE = this.DRAW | this.CACHE; /* 3 */
    this.Phase = Phase;
    this.Vector2 = Vector2;
    this.InputState = InputState;

    var isRunning = true,
        body = oldPhase = this.phase = null,
        canvas = null,
        onInitHandlers = [],
        hasInitialized = false,
        documentReady = false,
        engine = null,
        documentStatusInterval = null,
        inputState = new InputState,
        currentTime = 0,
        allowContextMenu = false,
        sysThis = this;

    function Phase() {
        this.begin = function(b) {};
        this.end = function() {};
        this.wake = function() {};
        this.mouseWheel = this.mouseRelease = this.mousePress = this.mouseMove = this.keyRelease = this.keyPress = this.charTyped = function(b) {
            return false;
        };
        this.update = function(b) {
            return false;
        }
    }

    function Vector2(x, y) {
        if (arguments.length >= 2) {
            this.x = x;
            this.y = y;
        } else if (arguments.length == 1) {
            // Assume x is a Vector2.
            this.x = x.x;
            this.y = x.y;
        } else {
            this.x = this.y = 0;
        }

        this.toString = function() {
            return `{x:${this.x},y:${this.y}}`;
        };
    }

    function InputState(event) {
        if (arguments.length > 0) {
            this.pagePos = new Vector2(event.pagePos);
            this.mousePos = new Vector2(event.mousePos);
            this.mouseMov = new Vector2(event.mouseMov);
            this.mouseWheel = event.mouseWheel;
            this.mouseButton = event.mouseButton;
            this.keyCode = event.keyCode;
            this.charCode = event.charCode;
            this.ctrlPressed = event.ctrlPressed;
            this.altPressed = event.altPressed;
            this.shiftPressed = event.shiftPressed;
        } else {
            this.pagePos = new Vector2;
            this.mousePos = new Vector2;
            this.mouseMov = new Vector2;
            this.charCode = 0;
            this.keyCode = 0;
            this.mouseWheel = 0;
            this.mouseButton = 0;
            this.shiftPressed = false;
            this.altPressed = false;
            this.ctrlPressed = false;
        }
    }

    function saveModifierKeysToInputState(event) {
        inputState.ctrlPressed = event.ctrlKey;
        inputState.altPressed = event.altKey;
        inputState.shiftPressed = event.shiftKey;
    }

    function startSkullCode() {
        if (!documentReady) {
            return;
        }

        sysThis.phase = new Phase;
        oldPhase = null;

        var onMouseWheel = function(event) {
            try {
                saveModifierKeysToInputState(event);
                inputState.mouseWheel = 0 < (event.detail || -event.wheelDelta) ? 1 : -1;
                sysThis.phase.mouseWheel(inputState);
            } catch (error) {}
            event.preventDefault();
        };

        document.addEventListener("DOMMouseScroll", onMouseWheel, false); // Firefox only.
        document.addEventListener("mousewheel", onMouseWheel, false);

        window.addEventListener("mousemove", function(event) {
            saveModifierKeysToInputState(event);
            var clientRect = canvas.getBoundingClientRect();
            inputState.mousePos.x = Math.floor((inputState.pagePos.x = event.pageX) - clientRect.left);
            inputState.mousePos.y = Math.floor((inputState.pagePos.y = event.pageY) - clientRect.top);
            undefined != event.movementX ? (inputState.mouseMov.x = event.movementX, inputState.mouseMov.y = event.movementY) : undefined != event.mozMovementX ? (inputState.mouseMov.x = event.mozMovementX, inputState.mouseMov.y = event.mozMovementY) : undefined != event.webkitMovementX && (inputState.mouseMov.x = event.webkitMovementX, inputState.mouseMov.y = event.webkitMovementY);
            null != sysThis.phase && sysThis.phase.mouseMove(inputState);
            event.preventDefault();
        }, false);

        canvas.addEventListener("mousedown", function(event) {
            saveModifierKeysToInputState(event);
            event.preventDefault();
            document.activeElement.blur();
            inputState.mouseButton |= 1 << event.button;
            null != sysThis.phase && sysThis.phase.mousePress(inputState);
        }, false);

        // Should we display right-click menu?
        body.oncontextmenu = function() {
            return allowContextMenu;
        };

        window.addEventListener("mouseup", function(event) {
            saveModifierKeysToInputState(event);
            event.preventDefault();
            inputState.mouseButton &= ~(1 << event.button);
            null != sysThis.phase && sysThis.phase.mouseRelease(inputState);
        }, false);

        document.addEventListener("keydown", function(event) {
            saveModifierKeysToInputState(event);
            inputState.keyCode = event.keyCode;
            (9 === event.keyCode || 8 === event.keyCode) && event.preventDefault();
            null != sysThis.phase && sysThis.phase.keyPress(inputState);
        }, false);

        document.addEventListener("keypress", function(event) {
            saveModifierKeysToInputState(event);
            inputState.keyCode = event.keyCode;
            inputState.charCode = event.charCode;
            null != sysThis.phase && sysThis.phase.charTyped(inputState);
            event.preventDefault();
        }, false);

        document.addEventListener("keyup", function(event) {
            saveModifierKeysToInputState(event);
            inputState.keyCode = event.keyCode;
            null != sysThis.phase && sysThis.phase.keyRelease(inputState);
            event.preventDefault();
        }, false);

        runOnInitHandlers();
        sysThis.update();
    }

    function runOnInitHandlers() {
        for (var counter = 0; counter < onInitHandlers.length; ++counter) {
            try {
                onInitHandlers[counter](engine);
            } catch (error) {
                sysThis.err(`postInit routine #${counter}`, error);
            }
        }

        hasInitialized = true;
    }

    function mainLoop(updatedTime) {
        if (isRunning) {
            window.requestAnimationFrame(mainLoop);
        }

        var delta = currentTime != 0 ? updatedTime - currentTime : 0;
        currentTime = updatedTime;

        try {
            if (sysThis.phase !== oldPhase) {
                if (oldPhase !== null) {
                    oldPhase.end();
                }

                if (sysThis.phase != null) {
                    sysThis.phase.begin(oldPhase);
                    oldPhase = sysThis.phase;
                    sysThis.phase.wake();
                }
            }

            if (sysThis.phase != null) {
                sysThis.phase.update(delta);
            }
        } catch (error) {
            sysThis.err("mainLoop()", error);
        }
    }

    // Set option on whether we should allow right-click menu.
    sysThis.allowContextMenu = function(shouldAllowContextMenu) {
        allowContextMenu = !!shouldAllowContextMenu;
    };

    sysThis.log = function(message) {
        window.alert(message);
    };

    sysThis.err = function(message, err) {
        try {
            if (arguments.length < 2) {
                sysThis.log("ERROR: " + message);
            } else {
                sysThis.log("ERROR: " + message + " : " + err.toString() + " : line " + err.lineNumber + " of file: " + err.fileName);
            }
        } catch (error) {}
    };

    sysThis.warn = function(message, err) {
        try {
            if (arguments.length < 2) {
                sysThis.log("WARNING: " + message);
            } else {
                sysThis.log("WARNING: " + message + " : " + err.toString() + " : line " + err.lineNumber + " of file: " + err.fileName);
            }
        } catch (error) {}
    };

    sysThis.onInit = function(handler) {
        if (hasInitialized) {
            sysThis.err("Function not added via onInit(), already initialized");
        } else {
            onInitHandlers.push(handler);
        }
    };

    sysThis.start = function(opts) {
        if (engine != null) {
            sysThis.err("start() called while engine is already running.");
            return false;
        }

        engine = {
            realtime: true,
            canvas: "viewport"
        };

        if (typeof opts != "undefined" && opts != null) {
            try {
                engine.realtime = !!opts.realtime;

                if (typeof opts.canvas != "undefined") {
                    engine.canvas = opts.canvas;
                }
            } catch (error) {
                return sysThis.err("setup object invalid ", error), false
            }
        }

        return startSkullCode();
    };

    sysThis.setRealtime = function(shouldRun /* ??? */) {
        if (shouldRun && isRunning != shouldRun) {
            window.requestAnimationFrame(mainLoop);
        }

        isRunning = shouldRun;
    };

    sysThis.scaleSmoothing = function(canvas, shouldUseSmoothing) {
        shouldUseSmoothing = !!shouldUseSmoothing;
        canvas.imageSmoothingEnabled = shouldUseSmoothing;
        canvas.mozImageSmoothingEnabled = shouldUseSmoothing;
        canvas.webkitImageSmoothingEnabled = shouldUseSmoothing;
    };

    sysThis.setFullScreen = function(fullScreenMode) {
        sysThis.log("Setting screen mode: " + fullScreenMode);

        if (fullScreenMode) {
            if (canvas.requestFullscreen) {
                canvas.requestFullscreen();
            } else if (canvas.msRequestFullscreen) {
                canvas.msRequestFullscreen();
            } else if (canvas.mozRequestFullScreen) {
                canvas.mozRequestFullScreen();
            } else if (canvas.webkitRequestFullscreen) {
                canvas.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
            } else {
                sysThis.log("Fullscreen not supported.");
            }
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            } else {
                sysThis.log("Fullscreen not supported.");
            }
        }
    };

    sysThis.setPointerLock = function(a) {
        sysThis.log("Setting pointer lock: " + a);
        if (a) {
            if (canvas.requestPointerLock) {
                canvas.requestPointerLock();
            } else if (canvas.mozRequestPointerLock) {
                canvas.mozRequestPointerLock();
            } else if (canvas.webkitRequestPointerLock) {
                canvas.webkitRequestPointerLock();
            } else {
                sysThis.log("Pointer lock not supported.");
            }
        } else {
            if (canvas.exitPointerLock) {
                canvas.exitPointerLock();
            } else if (canvas.mozExitPointerLock) {
                canvas.mozExitPointerLock();
            } else if (canvas.webkitExitPointerLock) {
                canvas.webkitExitPointerLock();
            } else {
                sysThis.log("Pointer lock not supported.");
            }
        }
    };

    sysThis.update = function() {
        window.requestAnimationFrame(mainLoop);
    };

    documentStatusInterval = window.setInterval(function() {
        try {
            // Try to get access to body.
            if (!body) {
                body = document.getElementsByTagName("body")[0];
            }

            // Try to set up the canvas.
            if (null != engine && null == canvas) {
                // At first, canvas is a string (due to passed in opts). We will
                // try to get the actual element with this string value.
                if (typeof engine.canvas == "string") {
                    if (canvas = document.getElementById(engine.canvas)) {
                        engine.canvas = canvas;
                    }
                } else {
                    canvas = engine.canvas;
                }
            }

            // We're ready to go!
            if (body && canvas) {
                window.clearInterval(documentStatusInterval);
                documentStatusInterval = null;
                documentReady = true;
                if (engine != null) {
                    startSkullCode();
                }
            }
        } catch (error) {
            sysThis.err("preInit() failed", error)
        }
    }, 250)
};

new function() {
    // Doubly-linked list with front/back references.
    System.LinkedList = function() {
        var first = null,
            last = null;

        this.first = function() {
            return first;
        };

        this.last = function() {
            return last
        };

        this.add = function(e) {
            if (first == null) {
                first = e;
            } else {
                last.next = e;
            }

            e.prior = last;
            last = e;
        };

        this.unlink = function(e) {
            if (e.next == null) {
                last = e.prior;
            } else {
                e.next.prior = e.prior;
            }

            if (e.prior == null) {
                first = e.next;
            } else {
                e.prior.next = e.next;
            }

            e.prior = e.next = null;
        };

        this.insert = function(e, c) {
            if (c == null) {
                c = first;
            }

            if (c == null) {
                last = first = e;
            } else if (c === first) {
                first = e;
            } else {
                c.prior.next = e;
                e.prior = c.prior;
                c.prior = e;
                e.next = c;
            }
        };

        this.empty = function() {
            first = last = null;
        };

        this.attach = function(e) {
            if (first == null) {
                first = e.first();
                last = e.last();
            } else {
                last.next = e.first();

                if (last.next != null) {
                    last.next.prior = last;
                    last = e.last();
                }
            }

            e.empty();
        }
    };

    // https://en.wikipedia.org/wiki/Linear_congruential_generator
    System.LCPRNG = function(seed, modulus) {
        var prNums = [],
            n = 0;

        this.seed = function(_seed) {
            if (arguments.length > 0) {
                var _mod = modulus - 1, _n;

                prNums[0] = seed = _seed | 0; // Seed
                for (_n = 1; _n < _mod; ++_n) {
                    prNums[_n] = 16807 /* Math.pow(7, 5) */ * prNums[_n - 1] & 2147483647 /* (Math.pow(2, 31) - 1) */;
                }

                prNums[_mod] = prNums[0];
                prNums[0] = prNums[1];
                prNums[1] = prNums[2];
                n = 2;
                _mod = modulus << 4;

                for (_n = 0; _n < _mod; ++_n) {
                    this.rand();
                }
            }

            return seed;
        };

        this.rand = function() {
            var oldB = n;
            n = (n + 1) % modulus;
            return prNums[oldB] = prNums[n] + prNums[(n + 29) % modulus] >> 0;
        };

        this.toString = function() {
            return this.seed();
        };

        // Set default argument values.
        if (arguments.length < 1) {
            seed = 1;
        }
        if (arguments.length < 2) {
            a = 32;
        }

        this.seed(seed);
    };

    System.LinearInterp = LinearInterp;

    function LinearInterp(f) {
        var a = this,
            e = a.value = 0;

        a.advance = function(c) {
            e += c;
            return 0 >= e ? a.value = e = 0 : e >= f ? (e = f, a.value = 1) : a.value = e / f
        };

        a.reset = function(c) {
            e = a.value = 0;
            0 < arguments.length && (f = c)
        }
    }

    System.SineInterp = function(f) {
        var e = new LinearInterp(f),
            c = Math.PI / 2;

        this.value = 0;

        this.advance = function(b) {
            b = e.advance(b);

            if (b == 1) {
                this.value = 1;
            } else if (b == 0) {
                this.value = 0;
            } else {
                this.value = Math.sin(b * c);
            }

            return this.value;
        };

        this.reset = function(b) {
            this.value = 0;

            if (arguments.length > 0) {
                e.reset(b);
            } else {
                e.reset();
            }
        }
    };

    System.CosineInterp = function(f) {
        var e = new LinearInterp(f),
            c = Math.PI;

        this.value = 0;

        this.advance = function(b) {
            b = e.advance(b);

            if (b == 1) {
                this.value = 1
            } else if (b == 0) {
                this.value = 0;
            } else {
                this.value = 0.5 * (1 - Math.cos(b * c));
            }

            return this.value;
        };

        this.reset = function(b) {
            this.value = 0;

            if (arguments.length > 0) {
                e.reset(b);
            } else {
                e.reset();
            }
        };
    };

    System.Vector3 = Vector3;

    function Vector3(x, y, z) {
        if (arguments.length >= 2) {
            this.x = x;
            this.y = y;
            this.z = z;
        } else if (arguments.length == 1) {
            // Assume x is a Vector3.
            this.x = x.x;
            this.y = x.y;
            this.z = x.z;
        } else {
            this.x = this.y = this.z = 0;
        }

        this.toString = function() {
            return `{x:${this.x},y:${this.y},z:${this.z}}`
        };
    }

    System.Box3 = function(f, a, e, c, b, l) {
        if (arguments.length >= 5) {
            this.a = new Vector3(f, a, e);
            this.b = new Vector3(c, b, l);
        } else if (arguments.length > 1) {
            this.a = new Vector3(f);
            this.b = new Vector3(a);
        } else if (arguments.length == 1) {
            this.a = new Vector3(f.a);
            this.b = new Vector3(f.b);
        } else {
            this.a = new Vector3;
            this.b = new Vector3;
        }

        this.toString = function() {
            return `{a:${this.a},b:${this.b}}`;
        };
    };

    // Cross product.
    System.cross = function(augendVec, addendVec, productVec) {
        productVec.x = augendVec.y * addendVec.z - augendVec.z * addendVec.y;
        productVec.y = augendVec.z * addendVec.x - augendVec.x * addendVec.z;
        productVec.z = augendVec.x * addendVec.y - augendVec.y * addendVec.x;
    }
};

new function() {
    var g = System,
        k = "file:" == window.location.protocol;

    function fetchObject(f, a) {
        function e(b) {
            if (!b.isLoaded) {
                b.isLoaded = true;
                try {
                    var d = eval(l.responseText);
                    a(d)
                } catch (error) {
                    a(null)
                }
            }
        }
        var c = document.getElementsByTagName("body")[0];
        if (!c) return false;
        if (k) {
            _JSE_ = null;
            var b = document.createElement("script");
            b.onload = function() {
                a(_JSE_);
                c.removeChild(b)
            };
            b.onerror = function() {
                g.log(`fetchObj() failed to load: ${f}`);
                c.removeChild(b);
                a(null)
            };
            b.src = f;
            c.appendChild(b)
        } else {
            var l = new XMLHttpRequest;
            l.isLoaded = false;
            l.onreadystatechange = function() {
                4 === l.readyState && e(l)
            };
            l.onload = function() {
                e(l)
            };
            l.ontimeout = function() {
                g.log(`fetchObj() failed to download: ${f}`);
                a(null)
            };
            l.open("GET", f, true);
            l.send(null);
        }
    }

    System.fetchObject = fetchObject;

    System.ImageLoader = function(pathPrefix, callback) {
        var _this = this,
            c = [];

        this.fails = this.loaded = this.count = 0;
        !pathPrefix && (pathPrefix = "");

        this.queue = function(url, id) {
            var img = new Image;
            url = pathPrefix + url;

            img.onload = function() {
                var _url = url;
                try {
                    _this.loaded++;
                    callback && callback(img, true, _url, id);
                } catch (error) {}
            };

            img.onerror = function() {
                var _url = url;
                try {
                    _this.fails++;
                    callback && callback(img, false, _url, id);
                } catch (error) {}
            };

            img.src = url;
            c[c.length] = img;
            this.count = c.length;
        };
    };

    System.Asset = function(type, name, path, flag, id, rev) {
        var _this = this;

        function _g(a, b) {
            if (a != null) {
                _this.flag = a ? _this.flag | b : _this.flag & ~b;
            }

            return (_this.flag & b) > 0;
        }

        this.type = type || "unknown";
        this.name = name || "";
        this.path = path || "";
        this.flag = flag || 0;
        this.rev = rev ? rev : 0;

        if (arguments.length >= 5) {
            this.id = id;
        } else {
            this.id = assets.length;
            this.flag |= 6;
        }

        assets[this.id] = this;

        this.loaded = function(a) {
            return _g(arguments.length < 1 ? null : a, 1);
        };

        this.stow = function(a) {
            return _g(arguments.length < 1 ? null : a, 2);
        };

        this.updated = function(a) {
            return _g(arguments.length < 1 ? null : a, 4);
        };

        this.customJSE = function() {
            return null;
        };

        this.toString = function() {
            var a = this.customJSE(),
                b = this.flags;

            this.loaded(false);
            this.updated(false);

            this.flags = b;

            return `{\tid :\t${this.id},\n\trev :\t${this.rev},\n\tflag :\t${this.flag},\n\ttype :\t${JSON.stringify(this.type)},\n\tname :\t${JSON.stringify(this.name)},\n\tpath :\t${JSON.stringify(this.path) + (null == a ? "" : ",\n\t" + a)}\n}`;
        }
    };

    System.AssetManager = function(f) {
        var a = this,
            e = {},
            c = {},
            b = {};

        f = 1 > arguments.length ? "" : f.toString();

        a.register = function(a, c) {
            b[a] = c
        };

        a.storeAll = function(b, c, d) {
            var f = 0;
            for (var _g in e) {
                var _h = e[_g];
                null == _h || b && "function" == typeof _h.updated && !_h.updated() || (++f, a.store(_h, c, d))
            }
            return f
        };

        a.store = function(a, b, d) {
            if (d) {
                g.log("Error: AssetManager.store(): Remote storage unimplemented.", "#911");
                try {
                    b(a, 0)
                } catch (error) {
                    g.log("Error: AssetManager.store() callback(data,0): " + error)
                }
            } else if (localStorage) try {
                localStorage.setItem(a.path, "_JSE_=" + a.toString());
                try {
                    b(a, 1)
                } catch (error) {
                    g.log("Error: AssetManager.store() callback(data,1): " + error)
                }
            } catch (error) {
                g.log("Error: AssetManager.store() localStorage.setItem(): " + error);
                try {
                    b(a, 0)
                } catch (error) {
                    g.log("Error: AssetManager.store() callback(data,0): " + error)
                }
            } else {
                g.log("Error: AssetManager.store(): No localStorage");
                try {
                    b(a, 0)
                } catch (error) {
                    g.log("Error: AssetManager.store() callback(data,0): " + error)
                }
            }
        };

        a.fetch = function(a, k, d) {
            3 > arguments.length && (d = false);
            var p = e[a];
            if (p) {
                try {
                    g.log("AM: already loaded: " + a), k(p, a)
                } catch (error) {
                    return g.log("AssetManager callback error '" + f + a + "': " + error, "#911"), -1
                }
                return 0
            }
            var u = c[a];
            if (u) return d || u.push(func), 3;
            var u = c[a] = [k],
                v = function(d) {
                    if (null == d)
                        for (var _h in u) try {
                            u[_h](null, a)
                        } catch (error) {
                            g.log("AssetManager callback error '" + f + a + "': " + error, "#911")
                        } else {
                            if (d.type) {
                                var n = b[d.type];
                                if (n) try {
                                    d = n(d, a)
                                } catch (error) {
                                    g.log("AssetManager creation error '" + f + a + "': " + error, "#911");
                                    for (_h in u) try {
                                        var r = u[_h];
                                        r && r(null, a)
                                    } catch (error) {
                                        g.log("AssetManager callback error '" + f + a + "': " + error, "#911")
                                    }
                                    delete c[a];
                                    return
                                }
                            }
                            e[a] = d;
                            for (_h in u) try {
                                (r = u[_h]) && r(d, a)
                            } catch (error) {
                                g.log("AssetManager callback error '" + f + a + "': " + error, "#911")
                            }
                        }
                    delete c[a]
                };
            if (localStorage && (p = localStorage.getItem(a), null != p)) try {
                return v(eval(p)), 1
            } catch (error) {
                g.log("AssetManager localStorage eval() error '" + a + "': " + error + "\n" + p.toString(), "#911")
            }
            fetchObject(f + a, v);
            return 2
        };

        a.getAsset = function(a) {
            a = e[a];
            return "undefined" != typeof a ? a : null
        };

        a.setAsset = function(a, b) {
            if (b === null) {
                delete e[a];
            } else {
                e[a] = b;
            }
        };
    };

    System.getAsset = function(f) {
        f = assets[f];
        return typeof f == "undefined" ? null : f;
    }
};

new function() {
    System.Protocol = Protocol;
    System.Machine = Machine;

    function Protocol(opts) {
        this.data = null;
        this.direct = false;
        this.host = null;
        this.id = null;
        this.pos = null;
        this.size = null;

        if (arguments.length > 0) {
            this.data = opts.data;
            this.direct = opts.direct;
            this.host = opts.host;
            this.id = opts.id;
            this.pos = opts.pos;
            this.size = opts.size;
        }
    }

    function Machine() {
        this.skull = null;
        this.id = null;

        this.bind = function(a, e) {
            return null;
        };

        this.connect = function(a, e, c) {
            System.log(`sc.connect( ${a}, ${e}, ${c} )`);
            return true;
        }
    }

    // 16-bit integer multiplication?
    Math.imul || (Math.imul = function(int1, int2) {
        var int1_16 = int1 & 65535 /* (Math.pow(2, 16) - 1) */,
            int2_16 = int2 & 65535 /* (Math.pow(2, 16) - 1) */;

        return int1_16 * int2_16 + ((int1 >>> 16 & 65535 /* (Math.pow(2, 16) - 1) */) * int2_16 + int1_16 * (int2 >>> 16 & 65535 /* (Math.pow(2, 16) - 1) */) << 16 >>> 0) | 0;
    });

    // 32-bit floating-point round?
    Math.fround || (Math.fround = function() {
        var converterArray = new Float32Array(1);

        return function(num) {
            converterArray[0] = +num;
            return converterArray[0];
        }
    }());

    System.Environment = function() {
        function explainError(errorCode) {
            if (typeof errorCode != "number") {
                try {
                    return errorCode.toString();
                } catch (error) {
                    errorCode = unknownErrorID;
                }
            }

            errorCode |= 0;

            if (errorCode < 0 || errorCode >= errorExplanations.length) {
                return "Unknown Error.";
            }

            return errorExplanations[errorCode];
        }

        function err(errorID) {
            throw errorID >>> 0;
        }

        function generateID() {
            var id;

            do {
                id = (+new Date ^ 65536 * Math.random() ^ 65536 * Math.random() << 16) >>> 0 | 0;
            } while (brains[id] !== undefined);

            return id;
        }

        function generateID2() {
            var id;

            do {
                id = (+new Date ^ 65536 * Math.random() ^ 65536 * Math.random() << 16) >>> 0 | 0;
            } while (protocols[id] !== undefined);

            return id;
        }

        function printSCError(errorCode) {
            if (typeof errorCode == "number") {
                if (errorCode > 0) {
                    System.log("sc error " + errorCode + ", 0x" + errorCode.toString(16) + ": " + explainError(errorCode));
                    return errorCode;
                }

                return errorCode - 1;
            }

            System.log("sc error ?: " + explainError(errorCode));
            System.log(errorCode);

            return hostEnvironmentExceptionID;
        }

        function logs(a) {
            System.log("sc.logs: " + a);
        }

        function logv(a) {
            System.log("sc.logv: " + (a >>> 0).toString(16) + " : " + a);
        }

        function wait(a) {
            a |= 0;
            0 > a && (a = 0);
            throw -a;
        }

        function getCurrentTime() {
            return Date.now();
        }

        function BrainWrapper(size) {
            // Inherits attributes created in Machine constructor.
            this.inherit = Machine;
            this.inherit();

            size = (size | 0) >>> 13;

            ++brainInstanceCounter;

            this.id = generateID();
            size <<= 13;
            var buffer = new ArrayBuffer(size);
            // new Uint8Array(buffer);
            var uintBuffer = new Uint32Array(buffer);
            this.connect = function(a, b, d) {
                return false;
            };
            this.bind = function(a, b) {
                return uintBuffer.subarray(a >> 2, (a >> 2) + (b >> 2))
            };
            this.brain = window.__asm_func(window, {
                error: err,
                imul: Math.imul,
                logs: logs,
                logv: logv,
                wait: wait,
                time: getCurrentTime
            }, buffer);
            this.size = size;
            this.heap = buffer;
        }

        var unknownErrorID = 6,
            hostEnvironmentExceptionID = 7,
            errorExplanations = "OK.;Permission Required.;Out of memory.;Invalid operation.;Invalid memory access.;Invalid access alignment.;Unknown error.;Host environment exception.;Halted.;Operation not supported.".split(";");

        var brainInstanceCounter = 0,
            brains = [],
            protocols = [];

        this.explain = explainError;

        this.cycle = function(a, b) {
            try {
                return brains[a].brain.cycle(b | 0)
            } catch (error) {
                return printSCError(error)
            }
        };

        this.init = function(id, pos, arg, k0, k1, k2, k3) {
            try {
                brains[id].brain.init(brains[id].size - 1, pos, arg, k0, k1, k2, k3)
            } catch (error) {
                return printSCError(error)
            }
        };

        this.load = function(id, wordArray, startPos) {
            try {
                if (typeof wordArray == "string") {
                    throw explainError(9);
                }

                var programSubbuffer = brains[id].bind(startPos, wordArray.length << 2);
                for (var byteCounter = 0; byteCounter < wordArray.length && byteCounter < programSubbuffer.length; ++byteCounter) {
                    programSubbuffer[byteCounter] = wordArray[byteCounter];
                }

                System.log("Loaded " + byteCounter + " words.");
            } catch (error) {
                return printSCError(error);
            }
        };

        Date.now || (Date.now = function() {
            return (new Date).getTime();
        });

        // Test for least-significant bit.
        try {
            var LSB = function() {
                var a = new ArrayBuffer(4);
                (new DataView(a)).setUint32(0, 1718303319, true);
                switch ((new Int32Array(a))[0]) {
                    case 1463446374:
                        return false;
                    case 1718303319:
                        return true;
                    default:
                        return null;
                }
            }();
        } catch (error) {
            System.log("sc: can't test LSB: " + error);
        }

        this.LSB = LSB;

        this.build = function(heapLength /* array length of 2097152 */) {
            var brainWrapper = new BrainWrapper(heapLength);
            if (!brainWrapper) throw 3;
            brains[brainWrapper.id] = brainWrapper;
            return brainWrapper.id;
        };

        this.dump = function(id) {
            return brains[id].heap;
        };

        this.support = function(a) {
            var d = new Protocol(a);
            d.id = generateID2();
            protocols[d.id] = d;
            return a.id = d.id
        };

        this.register = function(a) {
            var id = generateID();
            brains[id] = a;
            return id;
        };

        this.connect = function(a, d, c) {
            var e = brains[a];
            c = brains[c];
            var f = protocols[d];
            if (!e || !c || !f) throw 3;
            try {
                f = new Protocol(f);
                f.host = e;
                f.client = c;
                f.data = e.bind(f.pos, f.size);
                f.id = generateID2();

                if (f.direct) {
                    try {
                        protocols[f.id] = f, c.connect(a, d, f.data)
                    } catch (error) {
                        delete protocols[f.id];
                        throw hostEnvironmentExceptionID;
                    }
                } else {
                    protocols[f.id] = f;
                }
            } catch (error) {
                throw hostEnvironmentExceptionID;
            }
            return f.id;
        }
    };
};

new function() {
    var g = "#000 #00a #0a0 #0aa #a00 #a0a #a50 #aaa #555 #55f #5f5 #5ff #f55 #f5f #ff5 #fff".split(" "),
        k = "#000000 #000084 #008400 #008080 #840000 #800080 #804000 #808080 #404040 #4040ff #38ff38 #40ffff #ff4040 #ff40ff #ffff40 #ffffff".split(" "),
        f = "#000000 #000099 #009900 #009292 #9b0000 #940094 #964b00 #939393 #4b4b4b #4c4ce0 #39e339 #40e2df #e34b4b #e34ae3 #e0e048 #e2e2e2".split(" ");

    System.InputDevice = function(a) {
        function e(b) {
            c[g] = (b.shiftPressed ? 1 : 0) | (b.ctrlPressed ? 2 : 0) | (b.altPressed ? 4 : 0);
            a(-1);
        }

        // Inherits attributes created in Phase constructor.
        this.inherit = System.Phase;
        this.inherit();

        // Inherits attributes created in Machine constructor.
        this.inherit = System.Machine;
        this.inherit();

        var c = null,
            b = false,
            scale = 1,
            g = 2;

        this.setScale = function(factor) {
            scale = 0 + factor;
        };

        this.mouseMove = function(inputState) {
            c[5] = inputState.mousePos.x * scale;
            c[6] = inputState.mousePos.y * scale;
            c[9] += inputState.mouseMov.x * scale;
            c[10] += inputState.mouseMov.y * scale;
            c[0] |= 1;
            e(inputState);
        };

        this.mousePress = function(inputState) {
            c[7] = inputState.mouseButton;
            c[0] |= 2;
            e(inputState);
        };

        this.mouseRelease = function(inputState) {
            c[7] = inputState.mouseButton;
            c[0] |= 4;
            e(inputState);
        };

        this.mouseWheel = function(inputState) {
            c[8] = inputState.mouseWheel | 0;
            c[0] |= 8;
            e(inputState);
        };

        this.keyPress = function(inputState) {
            c[0] |= 16;
            c[3] = inputState.keyCode;
            e(inputState);
        };

        this.keyRelease = function(inputState) {
            c[3] = inputState.keyCode;
            c[0] |= 32;
            e(inputState);
        };

        this.charTyped = function(inputState) {
            c[0] |= 64;
            c[4] = inputState.charCode;
            e(inputState);
        };

        this.begin = function() {};
        this.end = function() {};

        this.update = function(b) {
            a(b);
            return true
        };

        this.connect = function(a, e, f) {
            if (b) {
                return false;
            }

            c = f;

            return (b = true);
        }
    };

    System.TextDisplay = function(viewportCanvas, e, c, scale, l) {
        // Inherits attributes created in Machine constructor.
        this.inherit = System.Machine;
        this.inherit();

        l = l ? true : false;
        scale |= 0;
        e |= 0;
        c |= 0;

        var width = e * scale,
            height = c * scale;

        viewportCanvas.width = width;
        viewportCanvas.height = height;

        var textCanvas = null,
            v = 0,
            A = 0,
            viewportContext = viewportCanvas.getContext("2d"),
            textContext = viewportContext,
            D = scale > 1 && l ? k : g;

        if (scale > 1) {
            textCanvas = document.createElement("canvas");
            textCanvas.width = e;
            textCanvas.height = c;
            textContext = textCanvas.getContext("2d");
            textCanvas.ctx = textContext;
        }

        textContext.fillStyle = D[0];
        textContext.fillRect(0, 0, e, c);

        var w = Math.floor(e / 9),
            C = c >>> 4,
            y_ = C * w,
            G = 4,
            T = G + (y_ >> 1) - 1,
            y = new ArrayBuffer(y_ << 2),
            R = new Uint32Array(y),
            displayReady = false,
            q = 0,
            H, L, I, J,
            E = 0,
            B = null,
            Z = false,
            F, V, W, Q;

        function n(a, _b) {
            var c = _b.length;
            if (null == N) {
                N = Array(c);
                for (var d = c; 0 <= --d;) N[d] = document.createElement("canvas")
            }
            for (d = c; 0 <= --d;) textCanvas = N[d], textCanvas.width = a.width, textCanvas.height = a.height, c = textCanvas.getContext("2d"), c.globalAlpha = 1, c.globalCompositeOperation = "source-over", c.drawImage(a, 0, 0), c.globalCompositeOperation = "source-atop", c.fillStyle = _b[d], c.fillRect(0, 0, textCanvas.width, textCanvas.height)
        }

        this.connect = function(a, _b, c) {
            if (Z) {
                return false;
            }

            B = c;
            V = +new Date;
            W = 666;
            Q = 0;
            F = false;
            G = 4;
            L = 13;
            H = 1;
            I = 7;
            J = 2;
            E = 0;
            q = E << 16 | H << 12 | L << 8 | I << 4 | J | 134217728 /* Math.pow(2, 27) */;
            l && (q |= 268435456 /* Math.pow(2, 28) */);
            B[0] = q;
            B[2] = C << 16 | w;
            B[1] = 0;
            B[3] = G;

            return Z = true
        };

        this.setScanLines = function(a) {
            l = !!a;

            n(images[1], l ? k : g);

            if (l && scale > 1) {
                viewport.parentElement.style.backgroundColor = f[E];
                D = k;
            } else {
                viewport.parentElement.style.backgroundColor = g[E];
                D = g;
            }

            textContext = scale > 1 ? textCanvas.ctx : viewportContext;

            for (a = 0; a < R.length; ++a) {
                R[a] = 0;
            }
        };

        this.render = function() {
            if (displayReady) {
                System.scaleSmoothing(textContext, false);
                q = B[0];
                0 == (q & 2147483648) && (B[0] = q |= 2147483648, B[2] = C << 16 | w);
                var k = B[1],
                    n = k >>> 16 & 65535,
                    k = k & 65535;
                if (0 == (q & 134217728 /* Math.pow(2, 27) */)) F && (q |= 536870912 /* Math.pow(2, 29) */), F = false;
                else if (W) {
                    var t = +new Date;
                    Q += t - V;
                    Q >= W && (Q = 0, F = !F, q |= 536870912 /* Math.pow(2, 29) */);
                    V = t
                } else F || (q |= 536870912 /* Math.pow(2, 29) */), F = true;
                if (0 != (q & 1610612736 /* Math.pow(2, 29) * 3 */)) {
                    q &= -536870913;
                    t = q >>> 16 & 15;
                    H = q >>> 12 & 15;
                    L = q >>> 8 & 15;
                    I = q >>> 4 & 15;
                    J = q & 15;
                    v = (k + n * w >> 1) + G;

                    if (0 != (q & 268435456 /* Math.pow(2, 28) */) != l) {
                        E = t;
                        this.setScanLines(q & 268435456 /* Math.pow(2, 28) */);
                    } else if (t != E) {
                        E = t;
                        viewport.parentElement.style.backgroundColor = l ? f[E] : g[E];
                    }

                    textContext.globalCompositeOperation = "source-over";
                    textContext.globalAlpha = 1;

                    for (var z = t = 0, y = 0, x = 0, S = 0, O = 0, P = 0, K = 0, y = G; y <= T; ++y) {
                        x = B[y];
                        if (x == R[K] && y != v && y != A) {
                            if (++K, t += 9, t >= e && (z += 16, t = 0, z >= c)) break
                        } else {
                            R[K++] = x;
                            O = x >> 8 & 15;
                            S = x >> 12 & 15;
                            P = x & 255;
                            chx = P & 31;
                            chy = P >> 5 & 7;
                            textContext.fillStyle = D[S];
                            textContext.fillRect(t, z, 9, 16);
                            textContext.drawImage(N[O], 2 + 12 * chx, 2 + 19 * chy, 9, 16, t, z, 9, 16);
                            t += 9;
                            if (t >= e && (z += 16, t = 0, z >= c)) break;
                            x >>>= 16;
                            O = x >> 8 & 15;
                            S = x >> 12 & 15;
                            P = x & 255;
                            chx = P & 31;
                            chy = P >> 5 & 7;
                            textContext.fillStyle = D[S];
                            textContext.fillRect(t, z, 9, 16);
                            textContext.drawImage(N[O], 2 + 12 * chx, 2 + 19 * chy, 9, 16, t, z, 9, 16)
                        }

                        t += 9;

                        if (t >= e && (z += 16, t = 0, z >= c)) {
                            break
                        }
                    }

                    A = v;

                    if (F && (k < w && n < C)) {
                        x = B[v];

                        if (k & 1) {
                            x >>>= 16;
                            O = x >> 8 & 15;

                            if (H < 9 && (J > 0 && I > 0)) {
                                if (H + I > 9) {
                                    I = 9 - H;
                                }

                                if (L + J > 16) {
                                    J = 16 - L;
                                }

                                textContext.fillStyle = D[O];
                                textContext.fillRect(9 * k + H, (n << 4) + L, I, J);
                            }
                        }
                    }

                    if (scale > 1) {
                        System.scaleSmoothing(viewportContext, false);
                        viewportContext.globalAlpha = 1;
                        viewportContext.globalCompositeOperation = "source-over";
                        viewportContext.drawImage(textCanvas, 0, 0, e, c, 0, 0, width, height);
                        if (l && X != null) {
                            viewportContext.fillStyle = X;
                            viewportContext.fillRect(0, 0, width, height);
                            viewportContext.globalCompositeOperation = "lighter";
                            System.scaleSmoothing(viewportContext, true);
                            viewportContext.globalAlpha = 0.5;
                            viewportContext.drawImage(a, 0, 0, width, height, 1.5, 0, width, height);
                            viewportContext.drawImage(a, 0, 0, width, height, -0.25, 1, width, height);
                        }
                    }

                    B[0] = q;
                }
            }
        };

        var images = [],
            N = null,
            X = null,
            imageLoader = new System.ImageLoader("img/", function(img, error, url, id) {
                if (!error) {
                    System.log(`Could not load texture #${id} from: ${url}`);
                    return;
                }

                System.log(`Loaded texture #${id} from: ${url}`);
                images[id] = img;

                if (imageLoader.count == imageLoader.loaded) {
                    var canvas = document.createElement("canvas");
                    images[0] = canvas;
                    canvas.width = 64;
                    canvas.height = 64;

                    var context = canvas.getContext("2d");

                    context.fillStyle = "#000";
                    context.globalAlpha = 1;

                    System.scaleSmoothing(context, false);

                    for (var y = 1; y < 64; y += 2) {
                        context.fillRect(0, y, 64, 1);
                    }

                    X = context.createPattern(canvas, "repeat");
                    n(img, l ? k : g);
                    System.log("Display ready.");
                    displayReady = true;
                }
            });

        imageLoader.queue("sc-font-9x16.png", 1);

        viewport.parentElement.style.backgroundColor = l && b > 1 ? f[E] : g[E];

        this.toString = function() {
            return "TextDisplay";
        };
    }
};

new function() {
    System.onInit(function() {
        try {
            System.log = function(a) {
                console.log(a);
            };

            var env = new System.Environment,
                id = env.build(2097152 /* 0x1fffff */);

            var proto1 = new System.Protocol;
            proto1.pos = 0;
            proto1.size = 64;
            proto1.direct = true;
            env.support(proto1);

            var proto2 = new System.Protocol;
            proto2.pos = proto1.size;
            proto2.size = 16384;
            proto2.direct = true;
            env.support(proto2);

            var canvas = document.getElementById("viewport"),
                c = true,
                inputDevice = new System.InputDevice(function(delta) {
                    if (c) {
                        return;
                    }

                    if (delta < 0) {
                        return;
                    }

                    cycleDelay = -env.cycle(id, 32768);
                    l.render();

                    if (cycleDelay < 0) {
                        c = true;
                    }
                }),
                l;

            if (canvas.offsetParent.offsetWidth + 4 >= 1440 && canvas.offsetParent.offsetHeight + 4 >= 800) {
                l = new System.TextDisplay(canvas, 720, 400, 2, false);
                inputDevice.setScale(1);
            } else {
                l = new System.TextDisplay(canvas, 720, 400, 1, false);
                inputDevice.setScale(2);
            }

            window.setScanLines = l.setScanLines;
            var n = env.register(l);
            env.connect(id, proto2.id, n);

            var d = env.register(inputDevice);
            env.connect(id, proto1.id, d);

            var p = proto2.pos + proto2.size + 1023 & 0xffffc00,
                initialData = [231945, 80, 83919369, 33293, 12288, 395785, 33293, 24576, 133641, 33587721, 33293, 65536, 264713, 33293, 65536, 68105, 33291, 72, 16809992, 33291, 4360, 33289, 2147483648, 33311, 204, 16809986, 33311, 140, 33297, 2147483648, 33290, 0, 295435, 100, 32, 33289, 64, 29193, 33297, 4278190080, 32, 524809, 557585, 4278190080, 295433, 64, 134511122, 67138057, 33297, 4278190080, 32, 295433, 64, 524815, 134511121, 67138057, 32, 33289, 536870912, 33311, 164, 32, 33311, 140, 33297, 536870912, 33290, 0, 295435, 292, 16809986, 33291, 248, 32, 33289, 72, 29193, 32, 295433, 64, 67400201, 67108873, 67141653, 67174409, 251756561, 84017161, 67272725, 84082697, 251887633, 32, 67371536, 262153, 67403795, 17039378, 33882121, 67469331, 50659346, 557577, 64, 588305, 4294901760, 67664402, 32, 295433, 68, 293385, 32, 295433, 68, 67138057, 32, 262665, 393481, 164383, 296, 168558857, 688393, 0, 201851162, 17334803, 202113552, 67910153, 819725, 4, 135004682, 1868299, 484, 32, 786953, 17596947, 68157961, 1081882, 160, 269222413, 135018761, 32, 786953, 17596947, 68157961, 1081882, 160, 269222413, 201863433, 32, 786953, 17596947, 68157961, 1081882, 160, 269222413, 135018505, 32, 786953, 17596947, 68157961, 1081882, 160, 269222413, 819725, 1, 151795721, 32, 528, 31241, 32, 528, 29193, 33290, 0, 1606155, 696, 16809986, 33291, 664, 67371536, 67402249, 32, 528, 29193, 32, 33289, 24, 291337, 67141646, 29193, 32, 33289, 28, 29193, 32, 33289, 32, 29193, 32, 33289, 16, 291337, 134250510, 553481, 67141645, 29193, 32, 786953, 68157961, 336855568, 135528457, 135593993, 253067281, 68452372, 253001745, 152338442, 2392587, 864, 806649869, 33291, 868, 1460961293, 229919, 576, 819725, 1, 353632265, 152338442, 2392587, 912, 806649869, 33291, 916, 1460961293, 229919, 576, 32, 135018505, 32, 295455, 296, 303169808, 17859091, 268698138, 16810515, 67109389, 269484560, 135294985, 269746185, 68190228, 252739601, 806387725, 957382666, 2130443, 1004, 655392781, 268449801, 33293, 2, 253001745, 806649869, 957644810, 2130443, 1040, 655654925, 335558665, 33293, 4, 557581, 1, 819726, 1, 819722, 0, 2392587, 964, 32, 33289, 20, 528905, 67141646, 266761, 67141646, 4617, 33311, 512, 32, 33311, 720, 33290, 0, 1344011, 1160, 33289, 0, 295434, 0, 1344011, 1184, 295433, 0, 33307, 18, 84181524, 33290, 79, 819723, 1220, 33289, 79, 295434, 24, 819723, 1244, 295433, 24, 33311, 544, 1081865, 20, 135272969, 68190222, 68164105, 68190222, 1055241, 557329, 255, 1946779657, 33311, 512, 32, 33289, 8, 266761, 67141646, 4617, 557577, 12, 786953, 819729, 15, 819738, 3, 201851405, 786953, 67928597, 65545, 16875537, 16908297, 16941072, 436305946, 436371482, 536969229, 537034765, 537952265, 1114121, 68255761, 68255760, 34701333, 134447113, 285409294, 51445769, 164383, 608, 557581, 1, 164383, 608, 557582, 2, 1081609, 1056, 17825801, 164383, 512, 34603017, 557581, 3, 164383, 512, 524809, 557585, 15, 557581, 62, 51445769, 164383, 608, 32, 33289, 8, 266761, 67141646, 4617, 557577, 12, 786953, 819729, 15, 819738, 3, 201851405, 786953, 67928597, 1081609, 20445, 4278485002, 1606155, 1620, 1192329225, 164383, 608, 557581, 1, 164383, 608, 557582, 2, 1074888713, 164383, 512, 3725623305, 557581, 3, 164383, 512, 4026826762, 2392587, 1740, 295435, 1712, 557581, 1, 557582, 2, 201982217, 164383, 412, 786953, 67928597, 524809, 557585, 15, 557581, 62, 1192329225, 4278485002, 1606155, 1780, 1326546953, 164383, 608, 4278485002, 1606155, 1812, 201982217, 164383, 412, 32, 134742544, 262665, 295441, 1, 295434, 0, 295435, 1848, 262665, 295441, 2, 295434, 0, 295435, 1888, 229919, 3276, 17334281, 262665, 295441, 4, 295434, 0, 295435, 1916, 262665, 295441, 8, 295434, 0, 295435, 1956, 229919, 3120, 17334281, 262665, 295441, 16, 295434, 0, 295435, 1996, 229919, 2072, 17334281, 262665, 295441, 32, 295434, 0, 295435, 2024, 262665, 295441, 64, 295434, 0, 295435, 2064, 229919, 2840, 17334281, 134218249, 32, 33311, 776, 151027722, 1606155, 2144, 819721, 8, 202379785, 4279271434, 295435, 2136, 1081865, 255, 269228553, 33291, 2144, 4027613193, 269228553, 637566986, 1606155, 2240, 360991, 1304, 819721, 4, 202379785, 1081866, 16, 2654731, 2228, 1081869, 16, 336855568, 1350154, 16, 1868299, 2228, 1350158, 16, 1081870, 16, 269228553, 671121418, 1606155, 2336, 360991, 1304, 819721, 4, 202379785, 1081866, 384, 1868299, 2324, 1081870, 16, 336855568, 1350154, 4294966896, 2654731, 2324, 1350157, 16, 1081869, 16, 269228553, 134250506, 295435, 2360, 620789770, 1606155, 2488, 360991, 1304, 819721, 8, 825866, 240, 2392587, 2404, 4279015440, 1606155, 2488, 819721, 4, 202379785, 1081866, 1, 1868299, 2448, 1081870, 1, 33291, 2484, 336855568, 1350154, 16, 1868299, 2488, 1350158, 16, 1081869, 15, 269228553, 134250506, 1606155, 2568, 202113552, 202379785, 67928077, 202379789, 67928077, 202117641, 819722, 255, 295435, 2560, 268988425, 4279009296, 201850897, 33291, 2564, 537427977, 135297033, 654344202, 1606155, 2708, 360991, 1304, 819721, 8, 825866, 240, 2392587, 2624, 4279015440, 295435, 2708, 819721, 4, 202379785, 1081866, 399, 2654731, 2668, 1081869, 1, 33291, 2704, 336855568, 1350154, 4294966896, 2654731, 2704, 1081870, 15, 1350157, 16, 269228553, 553680906, 1606155, 2772, 360991, 1304, 202113552, 825866, 384, 1868299, 2764, 825870, 384, 33291, 2772, 825865, 0, 570458122, 1606155, 2836, 360991, 1304, 202113552, 825866, 4294966512, 2654731, 2828, 825869, 384, 33291, 2836, 825865, 4294966896, 32, 33311, 776, 295434, 0, 295435, 3116, 819721, 8, 4279015434, 1606155, 2984, 360991, 1304, 360991, 228, 202113552, 202379785, 67928077, 202379789, 68188169, 1081866, 4294967295, 295435, 2980, 825869, 1, 825866, 400, 1868299, 2980, 825870, 16, 202113552, 825869, 16, 32, 269484560, 269750793, 68190217, 269750797, 336621577, 805601290, 1868299, 3116, 956596234, 2392587, 3040, 805601294, 33291, 3072, 537165842, 1627684874, 1868299, 3116, 1711570954, 2392587, 3116, 1459912718, 67436553, 67469331, 84148242, 201658377, 84148241, 84213775, 84934673, 68157458, 269776905, 33291, 2580, 32, 33311, 760, 33290, 0, 1344011, 3200, 360991, 1304, 202113552, 825866, 192, 1868299, 3188, 825870, 192, 33291, 3200, 825865, 0, 32, 33290, 0, 819723, 3272, 360991, 1304, 202113552, 825866, 4294966704, 2654731, 3260, 825869, 192, 33291, 3272, 825865, 4294966896, 32, 32, 33311, 744, 262153, 17072145, 294922, 295435, 3612, 295433, 12, 557577, 16, 819721, 8, 301578, 59, 1081867, 3516, 295455, 1304, 301578, 11, 2654731, 3404, 295433, 4, 134746633, 557594, 16, 301585, 15, 134486546, 32, 825865, 15, 67899913, 819726, 12, 819739, 3, 134746633, 557594, 16, 201851410, 295433, 4, 134486537, 295433, 12, 67899913, 819740, 3, 819722, 0, 1606155, 3512, 819721, 8, 825872, 255, 32, 825865, 255, 819721, 4, 134746633, 557594, 16, 135010825, 67637769, 557578, 62, 1868299, 3608, 557582, 62, 557578, 15, 2130443, 3600, 557577, 15, 135010834, 32, 32, 32, 33289, 1824, 33311, 444, 2654729, 0, 33289, 10, 671351305, 557321, 1203, 33311, 512, 33289, 60, 33311, 512, 33289, 66, 557321, 2049, 33311, 512, 33293, 1, 33290, 69, 2130443, 3692, 33289, 74, 557321, 2049, 33311, 512, 33293, 1, 33290, 77, 2130443, 3740, 33289, 24, 557321, 2080, 33311, 512, 33293, 1, 33290, 34, 2130443, 3788, 33289, 48, 557321, 2080, 33311, 512, 33293, 1, 33290, 58, 2130443, 3836, 33289, 14, 557321, 1082, 33311, 512, 33293, 6, 33290, 61, 1868299, 3884, 33289, 1, 557321, 1840, 33311, 512, 33293, 1, 33290, 2, 2130443, 3932, 33289, 3, 557321, 3888, 33311, 512, 33293, 1, 33290, 4, 2130443, 3980, 33289, 5, 557321, 3104, 33311, 512, 33293, 1, 33290, 6, 2130443, 4028, 33289, 7, 557321, 1056, 33311, 512, 33293, 1, 33290, 8, 2130443, 4076, 2654733, 1, 2654730, 25, 1868299, 3640, 32, 33289, 1824, 33311, 444, 33033, 0, 164105, 1, 33311, 412, 528, 47625, 74123091, 67141645, 47625, 74187893, 67141645, 47625, 73598060, 67141645, 47625, 73663599, 67141645, 47625, 69207141, 67141645, 47625, 74385228, 67141645, 47625, 73663585, 67141645, 47625, 74318953, 67141645, 47625, 67109991, 67141645, 47625, 69207072, 33311, 228, 554, 295433, 0, 33026, 512, 554, 262669, 295434, 512, 1868299, 4324, 32, 33311, 5288, 33311, 84, 33311, 648, 33289, 218169864, 33311, 360, 33311, 4144, 528, 262665, 39433, 1536, 67141645, 39433, 102, 67141645, 4026570761, 67141645, 67115529, 67141645, 67115529, 67141645, 33311, 3616, 33311, 5604, 33311, 6120, 673710608, 673972745, 741085705, 33289, 1, 671351305, 738722313, 403210773, 33311, 808, 738722313, 268993045, 33293, 2, 33311, 808, 738722313, 134775317, 33293, 2, 33311, 808, 738722313, 33293, 2, 33311, 808, 33289, 12, 671351305, 738722313, 819721, 16, 33311, 936, 33289, 62, 671351305, 738722313, 738984457, 3965449, 66, 738750985, 33311, 576, 33293, 1, 134775317, 1006633482, 1868299, 4660, 2916877, 4, 3965453, 4, 738750985, 33290, 75, 1868299, 4660, 2654733, 1, 2654730, 25, 1868299, 4500, 33311, 1536, 33311, 1128, 33311, 228, 295433, 28, 301578, 0, 295435, 4832, 67113503, 32770, 98847, 1304, 98847, 1088, 33291, 4488, 33311, 660, 98847, 1304, 98847, 1088, 33311, 1816, 33290, 0, 1606155, 4472, 33291, 4752, 33289, 24, 266761, 295434, 4294967295, 295435, 5044, 295441, 2147483647, 295434, 0, 295435, 5044, 819721, 0, 33289, 24, 39437, 4, 39434, 4016, 2392587, 5268, 4617, 33293, 64, 291337, 295441, 16711935, 295442, 67109888, 67140105, 819725, 1, 819722, 20, 2130443, 4948, 32, 39433, 12, 1081865, 7408, 1081869, 17408, 268698121, 295441, 15, 819721, 16, 67895822, 819729, 15, 202375693, 295433, 0, 1081869, 16, 268704265, 2130953, 296629226, 3781926562, 370832541, 4100533819, 1113097, 1640715937, 2282019202, 907678707, 3561557531, 537951248, 1081869, 16, 1113097, 3897955274, 3242966668, 909792445, 3561557531, 537951248, 1081869, 112, 1113097, 538976288, 538976288, 538976288, 538976288, 33289, 4, 39433, 128, 67141645, 4278229001, 469794825, 39433, 4888, 32, 33289, 28, 39433, 0, 32, 33289, 26112, 4, 2130947, 986125130, 2117622666, 1773876455, 1345566354, 1082377, 3835485448, 626029974, 848202269, 2539554945, 537920528, 268467209, 1342210061, 268467209, 536903693, 268467209, 1610645518, 270533635, 1082377, 4184631899, 2489423265, 2902401863, 554152117, 537920528, 268467209, 268468237, 270533635, 1082377, 1386827165, 344341847, 2769698716, 1750545076, 537920528, 268467209, 268468237, 270533635, 1082377, 1904909879, 1657915225, 531540249, 2314484855, 537920528, 268467209, 268468237, 270533635, 1082377, 3077683328, 2873561090, 2834377921, 91958683, 537920528, 268467209, 536903693, 270533635, 1082377, 201823064, 4047731608, 1944857960, 3928019016, 537920528, 268467209, 33289, 26188, 64009, 5668, 64013, 17408, 33289, 24, 39433, 0, 33289, 28, 39433, 0, 32, 33289, 26214, 290825, 3741614097, 294922, 1606155, 5664, 553711625, 33289, 26188, 29193, 33294, 17408, 68255762, 543, 32, 33289, 24, 39434, 0, 1606155, 5944, 295433, 25, 33289, 66, 557321, 1793, 33311, 608, 33293, 1, 33290, 69, 2130443, 5708, 33289, 62, 557321, 2049, 33311, 608, 33293, 1, 33290, 64, 2130443, 5756, 295438, 1, 295434, 0, 1344011, 5700, 1081865, 7408, 1081869, 17408, 268698121, 295441, 15, 819721, 16, 67895822, 819729, 15, 202375693, 1081869, 48, 528, 268442121, 33293, 4, 39433, 96, 33293, 4, 39433, 255, 33311, 228, 33289, 28, 39433, 6812, 32, 33289, 24, 266761, 295441, 2147483648, 295434, 0, 295435, 6100, 1081865, 7408, 1081869, 17408, 268698121, 295441, 15, 819721, 16, 67895822, 819729, 15, 202375693, 1081869, 144, 2130441, 32, 540021763, 806386704, 807410697, 33289, 24, 39437, 1, 39434, 2147483904, 2392587, 6100, 32, 33289, 28, 39433, 0, 32, 33289, 24, 266761, 295441, 2147483648, 295434, 0, 295435, 6572, 1081865, 7408, 1081869, 17408, 268698121, 295441, 15, 819721, 16, 67895822, 819729, 15, 202375693, 268435977, 33293, 144, 270562313, 536902666, 1606155, 6288, 33294, 12, 64009, 1068879309, 33293, 4, 64009, 3402485190, 33289, 24, 39433, 4294967295, 32, 3179017, 24, 3185162, 4294967295, 1606155, 6356, 3185161, 2147483648, 33294, 12, 64009, 559664589, 33293, 4, 64009, 3402485085, 32, 268435977, 33293, 135, 815113, 3742138385, 819210, 1606155, 6572, 553711625, 268435977, 33293, 144, 2126857, 4, 1081865, 32, 537926665, 33289, 24, 39433, 2147483648, 33289, 28, 39433, 6576, 33289, 4, 39433, 144, 1081865, 7408, 1081869, 17408, 268698121, 295441, 15, 819721, 16, 67895822, 819729, 15, 202375693, 268435977, 2130441, 538976288, 539230729, 539493129, 536902665, 33293, 16, 536902665, 33293, 16, 536902665, 32, 1081865, 7408, 1081869, 17408, 268698121, 295441, 15, 819721, 16, 67895822, 819729, 15, 202375693, 268435977, 33293, 144, 2130441, 32, 540021763, 807410697, 33289, 24, 39437, 4, 4617, 33297, 2147483647, 33290, 1012, 2392587, 6756, 33294, 4, 268435981, 295433, 0, 268809, 301585, 4294967280, 301581, 48, 33293, 192, 805338128, 32, 33289, 28, 39433, 0, 33289, 24, 39433, 2147483648, 33289, 0, 268442121, 39437, 48, 32, 33289, 24, 39434, 0, 1606155, 6880, 4, 2130947, 609603697, 3827201277, 2017767172, 305025323, 1081865, 32, 537926665, 39433, 1, 1081865, 32, 270537737, 1081865, 7408, 1081869, 17408, 268698121, 295441, 15, 819721, 16, 67895822, 819729, 15, 202375693, 791049, 39437, 1, 819740, 13, 819722, 12, 1606155, 6984, 32, 67928595, 202375693, 266761, 295441, 1, 295434, 0, 295435, 7048, 2130961, 4278255360, 4278255360, 4278255360, 4278255360, 33291, 7068, 2130961, 16711935, 16711935, 16711935, 16711935, 537951248, 39434, 120, 1868299, 7120, 33289, 28, 39433, 0, 67141646, 39433, 4294967295, 32, 538969091, 1081865, 32, 537926665, 32, 33289, 24, 266761, 295441, 2147483648, 295434, 0, 295435, 7404, 1081865, 7408, 1081869, 17408, 268698121, 295441, 15, 819721, 16, 67895822, 819729, 15, 202375693, 1081869, 16, 2130953, 296629226, 3781926562, 370832541, 4100533819, 537951241, 1113104, 815731403, 3494559619, 909792445, 3561557531, 1081869, 16, 537951241, 1113104, 3897955274, 3242966668, 909792445, 3561557531, 1081869, 112, 1113097, 2103055042, 3455133029, 2567071376, 2541834704, 33289, 0, 1081870, 96, 268442121, 67141645, 39433, 87, 33289, 28, 39433, 5948, 4, 33289, 32, 536878089, 32, 1463939758, 3326931380, 3056969150, 96598792, 1093237284, 3193090925, 1190316837, 2327456273, 3722913432, 656716174, 3986763130, 2805873590, 655296613, 4220167014, 412422730, 2896959909, 1240801077, 2289915026, 3091872572, 3004862258, 3774637222, 3029171748, 113609937, 342160229, 2169358072, 1857196085, 3035887015, 1991096755, 999209482, 62679574, 1621157293, 3415654802, 2679544969, 2589032546, 3091691, 2709876190, 3078451754, 1862372174, 1876609296, 2980959652, 767828645, 3056538818, 4199657431, 2224850305, 648831876, 762226756, 4125654416, 3281065681, 1824431908, 2972358790, 1154494572, 1004089482, 3964982144, 2333228622, 1937675833, 2027273804, 3023948975, 2061557655, 188418291, 2533739843, 3007707444, 2159632807, 1136306181, 580665584, 2822457629, 4264452840, 58240373, 2376750997, 3750055457, 2556437494, 1628000574, 579906905, 4235429432, 4127085373, 913888998, 2932837449, 423358060, 252269192, 2865927480, 3689710646, 3989525251, 1637073132, 800275110, 2048522342, 2413859470, 1537648706, 2124341735, 266630385, 4185899390, 455048676, 2424671937, 3462756120, 289337448, 304095005, 870003032, 3126552634, 839488576, 3184793007, 3216239573, 2639881168, 1477709771, 4267881742, 2057616676, 4208343878, 1889734753, 827265580, 527604906, 1250623640, 779874098, 4116551120, 174617448, 3811109075, 1811690580, 316416889, 3860212922, 2730276359, 1102894332, 559650798, 1369524717, 450582892, 1824573393, 2875254829, 992362217, 3164592277, 1296457222, 4034595309, 128042560, 579116589, 3312835567, 3795356162, 1657749439, 978098637, 1630663885, 3035715313, 1544040467, 630482770, 2371306047, 1158087676, 3621929687, 1937961774, 3443513511, 2112579222, 2959655290, 3924269802, 3276072179, 3489515428, 1711381242, 297442464, 2271032040, 1666967181, 2721614932, 3491540574, 1301902465, 188935495, 171527446, 1485392717, 4206122755, 1613435277, 490272048, 631303548, 4285628210, 2289052987, 968759551, 3919716872, 4004474864, 1168790043, 339990338, 3540096090, 1498078014, 2867058481, 3436039788, 2015604696, 1253651714, 680292690, 882954220, 3956364869, 77502352, 1372778815, 374944816, 3643810855, 2041911997, 2070458491, 1238485275, 3372360956, 1427420770, 3543888402, 2912813487, 3455043861, 231281468, 3945315909, 862585016, 3935976823, 3151638003, 609769078, 2776387579, 319276646, 3945177622, 659266984, 3190306416, 2157344998, 1762397601, 1298417490, 3778002297, 2552069204, 163327691, 3435023424, 4119692560, 3512525776, 1197504079, 3887470592, 546347638, 1634415293, 2616806129, 2872900568, 1694199789, 5354042, 943120895, 2918167529, 103197460, 3149448997, 4048513369, 4012034013, 3689522896, 2868704720, 4324678, 1350125003, 323601324, 1000335329, 982868308, 4190641745, 3140213306, 1658072050, 143663500, 1141107051, 2695732704, 1304434742, 1835788832, 1129160006, 1053347312, 2326664085, 645850608, 2873011723, 2280265901, 1194850556, 858199173, 2889050345, 863553215, 3832171240, 3781720744, 3935368700, 2636202445, 3688914773, 2353269162, 3083470373, 927006586, 3087795051, 2277131589, 3411396375, 3277466918, 99297387, 3173141367, 3239510693, 536246121, 3383174193, 1677353172, 1783939601, 2981787914, 3619728433, 4110947920, 378108449, 2142644709, 1023959057, 720689136, 3304224958, 1915539692, 4162424131, 509622741, 731010050, 46826685, 217763498, 3982195385, 2853965943, 3376142862, 912267809, 2164645939, 1839274395, 957473694, 4116405984, 73902773, 3098905606, 173200160, 1977079677, 3412710853, 2513325798, 2500917750, 4190678970, 4284857351, 2877499588, 3609618488, 2693480212, 3987726937, 541157625, 716718698, 1261846761];

            // These instructions are dumped in addresses 0x00004400 - 0x000065af.
            env.load(id, initialData, p);
            env.init(id, p, p + (initialData.length << 2), 0, 0, 0, 0);

            c = false;
        } catch (error) {
            if (typeof error == "number") {
                throw env.explain(error);
            }

            throw "boot: " + error.toString() + ": line " + error.lineNumber + ": " + error.fileName;
        }
        System.phase = inputDevice;
    });

    System.start({
        canvas: "viewport",
        realtime: true
    });
};
