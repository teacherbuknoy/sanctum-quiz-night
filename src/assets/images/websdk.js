/*!
 * Copyright (c) 2023 Oracle and/or its affiliates.
 * All rights reserved. Oracle Digital Assistant Client Web SDK, Release: 22.12.0
 */
var e, factory;
(e = self),
    (factory = function () {
        return (function () {
            "use strict";
            var e = {
                    216: function (e, t, i) {
                        var s;
                        i.d(t, {
                            a: function () {
                                return k;
                            },
                            b: function () {
                                return v;
                            },
                            c: function () {
                                return s;
                            },
                            d: function () {
                                return o;
                            },
                        }),
                            (function (e) {
                                (e.DE_DE = "de-de"),
                                    (e.EN_AU = "en-au"),
                                    (e.EN_GB = "en-gb"),
                                    (e.EN_IN = "en-in"),
                                    (e.EN_US = "en-us"),
                                    (e.ES_ES = "es-es"),
                                    (e.FR_FR = "fr-fr"),
                                    (e.HI_IN = "hi-in"),
                                    (e.IT_IT = "it-it"),
                                    (e.PT_BR = "pt-br");
                            })(s || (s = {}));
                        const n = Object.keys(s).map((e) => s[e]);
                        function o(e) {
                            return n.indexOf(e) >= 0;
                        }
                        var a;
                        !(function (e) {
                            (e[(e.Connecting = 0)] = "Connecting"), (e[(e.Open = 1)] = "Open"), (e[(e.Closing = 2)] = "Closing"), (e[(e.Closed = 3)] = "Closed");
                        })(a || (a = {}));
                        var r = i(24);
                        const c = window.audioinput;
                        function l() {
                            return c;
                        }
                        function h(e) {
                            return new Promise((e, t) => {
                                const i = l();
                                i.checkMicrophonePermission((s) => {
                                    s
                                        ? e()
                                        : i.getMicrophonePermission((i, s) => {
                                              i ? e() : t(s);
                                          });
                                });
                            }).then(() => {
                                const t = l();
                                return t.start(e), t;
                            });
                        }
                        function d() {
                            return new Promise((e) => {
                                const t = l();
                                t.isCapturing() ? (t.stop(e), t.disconnect()) : e();
                            });
                        }
                        let p = window.AudioContext;
                        const u = window.navigator;
                        let g = u.mediaDevices;
                        const m = u.webkitGetUserMedia,
                            f = u.mozGetUserMedia,
                            b = !!((g && g.getUserMedia) || m || f);
                        var v;
                        !(function (e) {
                            (e.RecognitionNotAvailable = "RecognitionNotAvailable"),
                                (e.RecognitionNotReady = "RecognitionNotReady"),
                                (e.RecognitionNoAPI = "RecognitionNoAPI"),
                                (e.RecognitionProcessingFailure = "RecognitionProcessingFailure"),
                                (e.RecognitionTooMuchSpeechTimeout = "RecognitionTooMuchSpeechTimeout"),
                                (e.RecognitionNoSpeechTimeout = "RecognitionNoSpeechTimeout"),
                                (e.RecognitionMultipleConnection = "RecognitionMultipleConnection");
                        })(v || (v = {}));
                        var w = function (e, t, i, s) {
                            return new (i || (i = Promise))(function (n, o) {
                                function a(e) {
                                    try {
                                        c(s.next(e));
                                    } catch (e) {
                                        o(e);
                                    }
                                }
                                function r(e) {
                                    try {
                                        c(s.throw(e));
                                    } catch (e) {
                                        o(e);
                                    }
                                }
                                function c(e) {
                                    var t;
                                    e.done
                                        ? n(e.value)
                                        : ((t = e.value),
                                          t instanceof i
                                              ? t
                                              : new i(function (e) {
                                                    e(t);
                                                })).then(a, r);
                                }
                                c((s = s.apply(e, t || [])).next());
                            });
                        };
                        const x = 4096,
                            C = 48e3;
                        let S,
                            y = !0;
                        class k {
                            constructor() {
                                (this._streamBuffer = []),
                                    (this._isRecording = !1),
                                    (p = p || window.webkitAudioContext),
                                    b &&
                                        (void 0 === g && (g = {}),
                                        void 0 === g.getUserMedia &&
                                            (g.getUserMedia = (e) => {
                                                const t = m || f;
                                                if (!t) {
                                                    const e = Error("getUserMedia is not implemented in this browser");
                                                    return (e.name = "TypeError"), Promise.reject(e);
                                                }
                                                return new Promise((i, s) => {
                                                    t.call(navigator, e, i, s);
                                                });
                                            }));
                            }
                            static getInstance() {
                                return this._service || (this._service = new k()), this._service;
                            }
                            startRecognition(e) {
                                var t, i;
                                return (
                                    (this._startPromise = new r.Deferred()),
                                    e && ((this._onRecognitionText = e.onRecognitionText), (this._onAnalyserReady = e.onAnalyserReady), (this._onVisualData = e.onVisualData), (this._onSpeechNetworkChange = e.onSpeechNetworkChange)),
                                    (null === (t = this._connection) || void 0 === t ? void 0 : t.readyState) === a.Closing || (null === (i = this._connection) || void 0 === i ? void 0 : i.readyState) === a.Connecting
                                        ? Promise.reject(new Error(v.RecognitionMultipleConnection))
                                        : (this._isRecording ? this._startPromise.resolve() : this._url ? this._setupRecognition() : this._buildServerURL().then(() => this._setupRecognition()), this._startPromise.promise)
                                );
                            }
                            stopRecognition() {
                                return (this._stopPromise = new r.Deferred()), this._isRecording ? this._stopProcessing() : this._stopPromise.resolve(), this._stopPromise.promise;
                            }
                            setConfig(e) {
                                return e.recognitionLocale || (e.recognitionLocale = s.EN_US), e.tokenGenerator && (this._authService = r.AuthTokenService.getInstance()), (this._config = e), this._buildServerURL();
                            }
                            setLocale(e) {
                                o(e) && this._config && ((this._config.recognitionLocale = e), this._buildServerURL());
                            }
                            _setConnectionState(e) {
                                var t;
                                null === (t = this._onSpeechNetworkChange) || void 0 === t || t.call(this, e);
                            }
                            _buildServerURL() {
                                return ((e = this._config),
                                (t = this._authService),
                                new Promise((i, s) => {
                                    e.tokenGenerator
                                        ? t
                                              .get()
                                              .then((t) => {
                                                  (e.channelId = t.getClaim("channelId")), (e.userId = t.getClaim("userId")), I(e, i, s);
                                              })
                                              .catch((e) => s(e))
                                        : I(e, i, s);
                                })).then((e) => {
                                    this._url = e;
                                });
                                var e, t;
                            }
                            _setupRecognition() {
                                return new Promise((e, t) => {
                                    b
                                        ? (function (e, t) {
                                              navigator.mediaDevices
                                                  .getUserMedia({ audio: !0 })
                                                  .then((t) => {
                                                      const i = new AudioContext();
                                                      e({ context: i, stream: i.createMediaStreamSource(t) });
                                                  })
                                                  .catch(() => {
                                                      t(Error(v.RecognitionNoAPI));
                                                  });
                                          })(e, t)
                                        : void 0 !== l()
                                        ? (function (e, t) {
                                              d()
                                                  .then(() =>
                                                      h({ audioSourceType: 6, bufferSize: x, streamToWebAudio: !0 }).then((t) => {
                                                          e({ context: l().getAudioContext(), stream: t });
                                                      })
                                                  )
                                                  .catch(() => {
                                                      t(Error(v.RecognitionNoAPI));
                                                  });
                                          })(e, t)
                                        : t(Error(v.RecognitionNoAPI));
                                })
                                    .then((e) => {
                                        let t;
                                        (this._streamBuffer = []),
                                            (S = new Float32Array(0)),
                                            (this._connection = this._getSpeechServerConnection(this._url)),
                                            (function (e, t, i) {
                                                return w(this, void 0, void 0, function* () {
                                                    const s = e.createAnalyser();
                                                    (s.smoothingTimeConstant = 0.8), (s.fftSize = 256);
                                                    const n =
                                                            "class RecorderProcessor extends AudioWorkletProcessor {\n        buffersize = 4096;\n    \n        // Track the current buffer fill level\n        _bytesWritten = 0;\n    \n        // Create  a buffer of fixed size\n        _buffer = new Float32Array(this.buffersize);\n    \n        constructor() {\n            super();\n            this.initBuffer();\n        }\n    \n        initBuffer() {\n            this._bytesWritten = 0;\n        }\n    \n        isBufferEmpty() {\n            return this._bytesWritten === 0;\n        }\n    \n        isBufferFull() {\n            return this._bytesWritten === this.buffersize;\n        }\n    \n        flush() {\n            // trim the buffer if ended prematurely\n            this.port.postMessage(\n                this._bytesWritten < this.buffersize ? this._buffer.slice(0, this._bytesWritten) : this._buffer\n            );\n            this.initBuffer();\n        }\n    \n        process(inputs) {\n            this.append(inputs[0][0]);\n    \n            return true;\n        }\n    \n        /**\n         * \n         * @param {Float32Array} channelData \n         * @returns \n         */\n        append(channelData) {\n            if (this.isBufferFull()) {\n                this.flush();\n            }\n    \n            if (!channelData) return;\n    \n            for (let i = 0; i < channelData.length; i++) {\n                this._buffer[this._bytesWritten++] = channelData[i];\n            }\n        }\n    }\n    \n    registerProcessor('recorder.worklet', RecorderProcessor);",
                                                        o = URL.createObjectURL(new Blob([n], { type: "application/javascript" }));
                                                    yield e.audioWorklet.addModule(o);
                                                    const a = new AudioWorkletNode(e, "recorder.worklet");
                                                    return URL.revokeObjectURL(o), t.connect(s), s.connect(a), a.connect(e.destination), (a.port.onmessage = i), { analyser: s, processor: a };
                                                });
                                            })(e.context, e.stream, this._onPortMessage.bind(this)).then((i) => {
                                                (t = i), this._onAnalyserReady && this._onAnalyserReady(t.analyser), (this._context = e.context), (this._stream = e.stream), (this._analyser = t.analyser), (this._audioWorklet = t.processor);
                                            });
                                    })
                                    .catch((e) => {
                                        this._startPromise && this._startPromise.reject(e);
                                    });
                            }
                            _getSpeechServerConnection(e) {
                                const t = new WebSocket(e);
                                return (t.onopen = this._onOpen.bind(this)), (t.onclose = this._onClose.bind(this)), (t.onmessage = this._onMessage.bind(this)), (t.onerror = this._onError.bind(this)), t;
                            }
                            _onOpen() {
                                this._config.tokenGenerator
                                    ? this._authService.get().then((e) => {
                                          this._connection.send(`Bearer ${e.token}`), this._setConnectionState(a.Open), this._sendPreConnectionBuffer();
                                      })
                                    : (this._setConnectionState(a.Open), this._sendPreConnectionBuffer());
                            }
                            _onClose() {
                                this._isRecording && this._stopProcessing(), this._stopPromise && (this._stopPromise.resolve(), (this._stopPromise = void 0)), this._setConnectionState(a.Closed);
                            }
                            _onMessage(e) {
                                try {
                                    const t = JSON.parse(e.data);
                                    if (!t.event && t.code) throw e;
                                    const i = (function (e) {
                                        let t, i;
                                        const s = e.requestId,
                                            n = e.nbest;
                                        return (
                                            "partialResult" === e.event
                                                ? ((t = "partial"), (i = n[0].utterance))
                                                : n && n.length
                                                ? ((t = "final"), (i = n[0].utterance))
                                                : ((t = "error"), (i = e.resultCode ? v.RecognitionTooMuchSpeechTimeout : v.RecognitionNoSpeechTimeout)),
                                            { requestId: s, type: t, text: i, message: e }
                                        );
                                    })(t);
                                    "finalResult" === t.event && this.stopRecognition(), this._onRecognitionText && this._onRecognitionText(i);
                                } catch (e) {
                                    this._notifyError(v.RecognitionProcessingFailure), this.stopRecognition();
                                }
                            }
                            _onError() {
                                this._connection.readyState === a.Open && (this._notifyError(v.RecognitionProcessingFailure), this._connection.close());
                            }
                            _notifyError(e) {
                                this._onRecognitionText && this._onRecognitionText({ requestId: "", text: e, type: "error" });
                            }
                            _onPortMessage(e) {
                                var t;
                                this._startPromise && ((this._isRecording = !0), this._startPromise.resolve(), (this._startPromise = void 0));
                                const i = e.data,
                                    s = (null === (t = this._context) || void 0 === t ? void 0 : t.sampleRate) || C;
                                try {
                                    const e = (function (e, t, i) {
                                        if (i === t) return e;
                                        if (i > t) throw Error();
                                        let s = [];
                                        if (t === C) s = A;
                                        else {
                                            if (44100 !== t) throw Error();
                                            s = E;
                                        }
                                        const n = t / i;
                                        let o, a, r;
                                        y
                                            ? ((o = Math.floor(e.length % n)), (a = e.length - o), (r = 0 === o ? Array.from(e) : e.slice(0, a)))
                                            : ((o = Math.floor((e.length + S.length - s.length) % n)), (a = e.length + S.length - s.length - o), (r = new Float32Array(S.length + a)), r.set(S), r.set(e.slice(0, a), S.length));
                                        const c = Math.floor(a / n),
                                            l = new Int16Array(c),
                                            h = -1,
                                            d = 32767;
                                        if (t === C)
                                            for (let e = s.length; e < r.length; e += n) {
                                                let t = 0;
                                                for (let i = 0; i < s.length; i++) t += r[e - i] * s[i];
                                                const i = Math.max(Math.min(t, 1), h) * d;
                                                l[(e - s.length) / n] = i;
                                            }
                                        else {
                                            const e = [];
                                            for (let t = s.length; t < r.length; t++) {
                                                let i = 0;
                                                for (let e = 0; e < s.length; e++) i += r[t - e] * s[e];
                                                e[t - s.length] = i;
                                            }
                                            for (let t = 0; t < c; t++) {
                                                const i = 3,
                                                    s = t * n,
                                                    o = Math.floor(s) - i + 1,
                                                    a = Math.floor(s) + i;
                                                let r = 0;
                                                for (let t = o; t <= a; t++) r += (t < 0 ? e[0] : t >= e.length ? e[e.length - 1] : e[t]) * M(i, s - t);
                                                l[t] = Math.max(Math.min(r, 1), h) * d;
                                            }
                                        }
                                        return (S = y ? e.slice(a - s.length - S.length) : e.slice(a - s.length - (S.length - s.length))), (y = !1), l.buffer;
                                    })(i, s, 16e3);
                                    this._onVisualData && this._processAnalyser(this._analyser), this._sendBuffer(e);
                                } catch (e) {
                                    this._notifyError(v.RecognitionProcessingFailure), this.stopRecognition();
                                }
                            }
                            _processAnalyser(e) {
                                if (e) {
                                    const t = new Uint8Array(e.frequencyBinCount);
                                    e.getByteFrequencyData(t), this._onVisualData && this._onVisualData(t);
                                }
                            }
                            _sendBuffer(e) {
                                this._connection.readyState !== a.Open || this._streamBuffer.length ? this._streamBuffer.push(e) : this._connection.send(e);
                            }
                            _sendPreConnectionBuffer() {
                                if (this._connection.readyState === a.Open)
                                    for (; this._streamBuffer.length; ) {
                                        const e = this._streamBuffer.shift();
                                        e && this._connection.send(e);
                                    }
                            }
                            _stopProcessing() {
                                var e, t;
                                (this._isRecording = !1),
                                    this._connection &&
                                        (this._connection.readyState === a.Open && (this._connection.send("Done"), this._connection.close()),
                                        this._audioWorklet && this._audioWorklet.disconnect(),
                                        this._analyser && this._analyser.disconnect(),
                                        l()
                                            ? d()
                                            : ((e = this._context),
                                              (t = this._stream) &&
                                                  (t.mediaStream &&
                                                      t.mediaStream.getAudioTracks().forEach((e) => {
                                                          e.stop();
                                                      }),
                                                  t.disconnect()),
                                              e && e.close()),
                                        (this._audioWorklet = void 0),
                                        (this._analyser = void 0),
                                        (this._stream = void 0),
                                        (this._context = void 0),
                                        (this._streamBuffer = []),
                                        (y = !0),
                                        (S = new Float32Array(0)));
                            }
                        }
                        const _ = "/voice/stream/recognize",
                            T = "generic";
                        function I(e, t, i) {
                            (e.channelId && e.userId) || i(Error(v.RecognitionNotReady)),
                                t(
                                    (function (e) {
                                        const t = `ws${e.isTLS ? "s" : ""}://`,
                                            i = `${_}/${e.recognitionLocale}/${T}`,
                                            s = { channelId: e.channelId || "", encoding: "audio/raw", userId: e.userId || "" };
                                        return e.tokenGenerator && (s.jwtInBody = "true"), (0, r.buildURL)(t, e.URI, s, i);
                                    })(e)
                                );
                        }
                        const A = [
                                -25033838264794034e-21,
                                -3645156113737857e-20,
                                -11489993827892933e-21,
                                393243788874656e-19,
                                6998419352067277e-20,
                                37556691270439976e-21,
                                -476966455345305e-19,
                                -0.00011379935461751734,
                                -8400957697117619e-20,
                                4208817777607469e-20,
                                0.00016391587447478332,
                                0.00015508372993570357,
                                -1253765788919669e-20,
                                -0.00021258262011091092,
                                -0.0002524059896175195,
                                -51874329668708116e-21,
                                0.0002479230009768214,
                                0.00037351534477673157,
                                0.00016157590781788105,
                                -0.0002541085239198603,
                                -0.000510486865332593,
                                -0.0003246104617540939,
                                0.00021219136947965464,
                                0.0006488877825604561,
                                0.0005444416935293036,
                                -0.0001016639071691704,
                                -0.0007673001147209819,
                                -0.0008176720912938691,
                                -972696982411551e-19,
                                0.0008376185852528038,
                                0.0011319450250252222,
                                0.0004008193339799052,
                                -0.0008262743020160207,
                                -0.0014643282305934196,
                                -0.0008183365045047033,
                                0.0006964471772153777,
                                0.001780467922489105,
                                0.0013489288090360295,
                                -0.00041122152287042,
                                -0.0020347535966250413,
                                -0.0019782994815083733,
                                -6247794246099269e-20,
                                0.002171643809964705,
                                0.0026761621389245617,
                                0.00074944268608935,
                                -0.00212817775887288,
                                -0.003394541347147186,
                                -0.0016615884301227524,
                                0.001837545335885159,
                                0.004067170702246546,
                                0.0027936171643976352,
                                -0.001233420727213658,
                                -0.004610035314537476,
                                -0.004119319153202972,
                                0.00025459137646049936,
                                0.00492286494534436,
                                0.005588805700369816,
                                0.001150762425755883,
                                -0.004891042781491068,
                                -0.0071267634777626675,
                                -0.003021979039818941,
                                0.00438688631315642,
                                0.008631467181982988,
                                0.005385139236634672,
                                -0.003268406079325266,
                                -0.009973661255235284,
                                -0.008256256502745316,
                                0.0013719935383757782,
                                0.010993210336541666,
                                0.011651337116264694,
                                0.0015082475865128093,
                                -0.01148872195209017,
                                -0.015609515327517686,
                                -0.005671504441670989,
                                0.011188303272599716,
                                0.02024519058502148,
                                0.011637590928971467,
                                -0.009667754909210324,
                                -0.025878090076785515,
                                -0.020500381603699786,
                                0.006098908137700642,
                                0.033428666116203716,
                                0.03513487017573178,
                                0.001719739622764723,
                                -0.046085580848361105,
                                -0.06623078150315037,
                                -0.023349941728869696,
                                0.08292213207159124,
                                0.21069217442624302,
                                0.2973829711397418,
                                0.2973829711397419,
                                0.21069217442624305,
                                0.08292213207159124,
                                -0.023349941728869693,
                                -0.06623078150315037,
                                -0.046085580848361105,
                                0.0017197396227647225,
                                0.03513487017573178,
                                0.033428666116203716,
                                0.006098908137700641,
                                -0.020500381603699783,
                                -0.025878090076785508,
                                -0.009667754909210326,
                                0.011637590928971469,
                                0.020245190585021472,
                                0.011188303272599716,
                                -0.00567150444167099,
                                -0.015609515327517682,
                                -0.01148872195209017,
                                0.001508247586512809,
                                0.011651337116264699,
                                0.010993210336541666,
                                0.0013719935383757782,
                                -0.008256256502745314,
                                -0.009973661255235283,
                                -0.0032684060793252657,
                                0.00538513923663467,
                                0.008631467181982988,
                                0.004386886313156419,
                                -0.0030219790398189413,
                                -0.0071267634777626675,
                                -0.0048910427814910715,
                                0.0011507624257558842,
                                0.005588805700369813,
                                0.00492286494534436,
                                0.00025459137646049936,
                                -0.004119319153202973,
                                -0.004610035314537475,
                                -0.0012334207272136583,
                                0.002793617164397636,
                                0.004067170702246546,
                                0.0018375453358851592,
                                -0.0016615884301227509,
                                -0.0033945413471471847,
                                -0.0021281777588728797,
                                0.0007494426860893505,
                                0.0026761621389245612,
                                0.0021716438099647056,
                                -6247794246099253e-20,
                                -0.001978299481508373,
                                -0.0020347535966250404,
                                -0.00041122152287042,
                                0.0013489288090360292,
                                0.0017804679224891048,
                                0.0006964471772153777,
                                -0.0008183365045047026,
                                -0.00146432823059342,
                                -0.0008262743020160207,
                                0.0004008193339799063,
                                0.0011319450250252222,
                                0.0008376185852528037,
                                -9726969824115494e-20,
                                -0.0008176720912938694,
                                -0.0007673001147209783,
                                -0.00010166390716916983,
                                0.0005444416935293033,
                                0.0006488877825604562,
                                0.0002121913694796546,
                                -0.00032461046175409424,
                                -0.000510486865332593,
                                -0.00025410852391986036,
                                0.0001615759078178811,
                                0.0003735153447767315,
                                0.00024792300097682137,
                                -5187432966870808e-20,
                                -0.0002524059896175194,
                                -0.00021258262011091095,
                                -1253765788919669e-20,
                                0.0001550837299357036,
                                0.0001639158744747833,
                                42088177776074685e-21,
                                -8400957697117623e-20,
                                -0.00011379935461751733,
                                -4769664553453051e-20,
                                3755669127044002e-20,
                                699841935206728e-19,
                                393243788874656e-19,
                                -11489993827892933e-21,
                                -3645156113737856e-20,
                                -2503383826479402e-20,
                            ],
                            E = [
                                -5044267067893139e-21,
                                5738740247594612e-21,
                                1611195555688156e-20,
                                10560179594562795e-21,
                                -1242816862904201e-20,
                                -3084430704328611e-20,
                                -18160396924882423e-21,
                                2303124169528074e-20,
                                5216612702894834e-20,
                                2806026886746509e-20,
                                -389608521587068e-19,
                                -8174245278012476e-20,
                                -4037543061985353e-20,
                                619375276294956e-19,
                                0.00012143092661620545,
                                55083199655424166e-21,
                                -9401891583478883e-20,
                                -0.00017326981522755043,
                                -7198069055926206e-20,
                                0.0001376274218691789,
                                0.00023946132645647525,
                                9064030545698025e-20,
                                -0.00019557611633250834,
                                -0.0003223511502826996,
                                -0.00011036322783022617,
                                0.0002710935667931249,
                                0.00042440564349633953,
                                0.00013013140955365376,
                                -0.00036784896615780913,
                                -0.0005481886438481025,
                                -0.00014855826094166272,
                                0.0004899798946967381,
                                0.000696340560985472,
                                0.00016383778624615643,
                                -0.0006421263408051642,
                                -0.0008715631880363658,
                                -0.00017369118859371453,
                                0.000829476349448821,
                                0.0010766146787146871,
                                0.00017530890385814463,
                                -0.0010578310750603923,
                                -0.001314320458073489,
                                -0.0001652844648711556,
                                0.0013337004262191077,
                                0.0015876076783199174,
                                0.000139534308084411,
                                -0.0016644454627712116,
                                -0.001899573527380014,
                                -9319422024995832e-20,
                                0.002058491185395933,
                                0.0022536018141979036,
                                20477911370491685e-21,
                                -0.0025256449668619525,
                                -0.0026535487754524955,
                                8552498376473957e-20,
                                0.0030775744811722015,
                                0.0031040297261921,
                                -0.00023314744969763122,
                                -0.003728529808331677,
                                -0.003610856230113392,
                                0.000432598472497653,
                                0.0044964472481822506,
                                0.004181705019767344,
                                -0.0006966685466235378,
                                -0.005404666489478738,
                                -0.00482715710731867,
                                0.0010418556659416306,
                                0.006484667519607787,
                                0.00556235368742558,
                                -0.0014902159613265254,
                                -0.007780573986407925,
                                -0.0064097301786953595,
                                0.002072517010858728,
                                0.009356870546119134,
                                0.0074037416266333166,
                                -0.00283386009764953,
                                -0.011312323822665827,
                                -0.008599512596140524,
                                0.003844300507349054,
                                0.013806774337071994,
                                0.01008985372973804,
                                -0.005220460312862638,
                                -0.01711716324115331,
                                -0.01204196749753927,
                                0.007174046245357611,
                                0.021768247992024713,
                                0.01478690833035584,
                                -0.010136389804721707,
                                -0.02888735624896028,
                                -0.019078400739739057,
                                0.015146805312378952,
                                0.041410446665863104,
                                0.027068163980255515,
                                -0.025512027260482153,
                                -0.07011218378743589,
                                -0.04829678433503421,
                                0.06041368701604651,
                                0.21199607414538668,
                                0.3213532652447261,
                                0.3213532652447261,
                                0.21199607414538668,
                                0.060413687016046526,
                                -0.04829678433503422,
                                -0.07011218378743589,
                                -0.025512027260482153,
                                0.027068163980255515,
                                0.041410446665863104,
                                0.015146805312378952,
                                -0.019078400739739057,
                                -0.02888735624896028,
                                -0.010136389804721703,
                                0.01478690833035584,
                                0.021768247992024713,
                                0.007174046245357611,
                                -0.01204196749753927,
                                -0.01711716324115331,
                                -0.005220460312862639,
                                0.010089853729738038,
                                0.013806774337071994,
                                0.0038443005073490553,
                                -0.008599512596140524,
                                -0.011312323822665827,
                                -0.0028338600976495314,
                                0.007403741626633317,
                                0.009356870546119134,
                                0.002072517010858727,
                                -0.006409730178695359,
                                -0.007780573986407925,
                                -0.001490215961326526,
                                0.005562353687425577,
                                0.006484667519607787,
                                0.0010418556659416256,
                                -0.004827157107318673,
                                -0.005404666489478739,
                                -0.0006966685466235378,
                                0.004181705019767345,
                                0.004496447248182251,
                                0.0004325984724976533,
                                -0.003610856230113392,
                                -0.003728529808331677,
                                -0.0002331474496976315,
                                0.0031040297261921003,
                                0.003077574481172201,
                                8552498376473897e-20,
                                -0.002653548775452496,
                                -0.002525644966861952,
                                2047791137049164e-20,
                                0.002253601814197904,
                                0.002058491185395933,
                                -9319422024995909e-20,
                                -0.001899573527380014,
                                -0.0016644454627712118,
                                0.00013953430808441038,
                                0.0015876076783199174,
                                0.0013337004262191077,
                                -0.0001652844648711556,
                                -0.0013143204580734896,
                                -0.0010578310750603925,
                                0.00017530890385814333,
                                0.0010766146787146878,
                                0.0008294763494488195,
                                -0.00017369118859371463,
                                -0.00087156318803637,
                                -0.0006421263408051633,
                                0.00016383778624615698,
                                0.0006963405609854716,
                                0.0004899798946967381,
                                -0.00014855826094166245,
                                -0.0005481886438481027,
                                -0.00036784896615780924,
                                0.00013013140955365368,
                                0.00042440564349633964,
                                0.00027109356679312505,
                                -0.00011036322783022619,
                                -0.0003223511502826996,
                                -0.00019557611633250842,
                                9064030545698017e-20,
                                0.00023946132645647525,
                                0.00013762742186917883,
                                -7198069055926207e-20,
                                -0.0001732698152275505,
                                -9401891583478886e-20,
                                5508319965542416e-20,
                                0.00012143092661620549,
                                6193752762949557e-20,
                                -4037543061985352e-20,
                                -8174245278012477e-20,
                                -38960852158706805e-21,
                                28060268867465078e-21,
                                52166127028948336e-21,
                                2303124169528077e-20,
                                -18160396924882423e-21,
                                -30844307043286126e-21,
                                -12428168629042018e-21,
                                10560179594562806e-21,
                                1611195555688157e-20,
                                5738740247594605e-21,
                                -5044267067893138e-21,
                            ];
                        function M(e, t) {
                            let i;
                            if (0 === t) i = 1;
                            else if (t >= e || t <= -e) i = 0;
                            else {
                                const s = Math.PI * t;
                                i = (e * Math.sin(s) * Math.sin(s / e)) / (s * s);
                            }
                            return i;
                        }
                    },
                    197: function (e, t, i) {
                        i.d(t, {
                            a: function () {
                                return o;
                            },
                            b: function () {
                                return a;
                            },
                            c: function () {
                                return ie;
                            },
                            d: function () {
                                return n;
                            },
                            e: function () {
                                return L;
                            },
                            f: function () {
                                return s;
                            },
                            g: function () {
                                return b.a;
                            },
                            h: function () {
                                return b.b;
                            },
                            i: function () {
                                return r;
                            },
                            j: function () {
                                return h.c;
                            },
                            k: function () {
                                return c;
                            },
                            l: function () {
                                return l;
                            },
                            m: function () {
                                return W;
                            },
                            n: function () {
                                return H;
                            },
                            o: function () {
                                return G;
                            },
                            p: function () {
                                return j;
                            },
                            q: function () {
                                return z;
                            },
                            r: function () {
                                return R;
                            },
                            s: function () {
                                return B;
                            },
                            t: function () {
                                return X;
                            },
                            u: function () {
                                return m;
                            },
                            v: function () {
                                return f;
                            },
                            w: function () {
                                return u;
                            },
                            x: function () {
                                return g;
                            },
                            y: function () {
                                return d;
                            },
                            z: function () {
                                return p;
                            },
                            A: function () {
                                return A;
                            },
                            B: function () {
                                return h.d;
                            },
                            C: function () {
                                return U;
                            },
                            D: function () {
                                return v;
                            },
                            E: function () {
                                return x;
                            },
                            F: function () {
                                return D;
                            },
                            G: function () {
                                return P;
                            },
                        });
                        var s,
                            n,
                            o,
                            a,
                            r,
                            c,
                            l,
                            h = i(216);
                        function d(e) {
                            return e && "object" == typeof e && "type" in e;
                        }
                        function p(e) {
                            return e && "object" == typeof e && "postback" === e.type;
                        }
                        function u(e) {
                            return void 0 !== e.fields;
                        }
                        function g(e) {
                            return void 0 !== e.formRows;
                        }
                        function m(e) {
                            return void 0 !== e.fields;
                        }
                        function f(e) {
                            return void 0 !== e.formRows;
                        }
                        !(function (e) {
                            (e.Open = "open"), (e.Close = "close"), (e.Error = "error"), (e.Message = "message"), (e.MessageReceived = "message:received"), (e.MessageSent = "message:sent"), (e.State = "state");
                        })(s || (s = {})),
                            (function (e) {
                                (e[(e.Connecting = 0)] = "Connecting"), (e[(e.Open = 1)] = "Open"), (e[(e.Closing = 2)] = "Closing"), (e[(e.Closed = 3)] = "Closed");
                            })(n || (n = {})),
                            (function (e) {
                                (e.Call = "call"), (e.Location = "location"), (e.Postback = "postback"), (e.Share = "share"), (e.SubmitForm = "submitForm"), (e.Url = "url"), (e.Webview = "webview");
                            })(o || (o = {})),
                            (function (e) {
                                (e.Image = "image"), (e.Video = "video"), (e.Audio = "audio"), (e.File = "file");
                            })(a || (a = {})),
                            (function (e) {
                                (e.Attachment = "attachment"),
                                    (e.Card = "card"),
                                    (e.Location = "location"),
                                    (e.Postback = "postback"),
                                    (e.Raw = "raw"),
                                    (e.Suggest = "suggest"),
                                    (e.Text = "text"),
                                    (e.CloseSession = "closeSession"),
                                    (e.SessionClosed = "sessionClosed"),
                                    (e.Table = "table"),
                                    (e.Form = "form"),
                                    (e.TableForm = "tableForm"),
                                    (e.Status = "status"),
                                    (e.EditForm = "editForm"),
                                    (e.FormSubmission = "formSubmission");
                            })(r || (r = {})),
                            (function (e) {
                                (e.Skill = "bot"), (e.User = "user");
                            })(c || (c = {})),
                            (function (e) {
                                (e.Agent = "AGENT"), (e.Bot = "BOT");
                            })(l || (l = {}));
                        var b = i(721);
                        function v(e) {
                            const t = !1;
                            if ((i = e) && "object" == typeof i && "messagePayload" in i) {
                                const i = e.messagePayload;
                                if (d(i)) {
                                    if (i.actions && !w(i.actions)) return t;
                                    if (i.globalActions && !w(i.globalActions)) return t;
                                    switch (i.type) {
                                        case r.Attachment:
                                            return (function (e) {
                                                const t = e.attachment;
                                                return !!(t && t.type && t.url);
                                            })(i);
                                        case r.Card:
                                            return (function (e) {
                                                let t = !1;
                                                if (e.layout && e.cards.length) {
                                                    t = !0;
                                                    for (const t of e.cards) {
                                                        if (!t.title) return !1;
                                                        if (t.actions && !w(t.actions)) return !1;
                                                    }
                                                }
                                                return t;
                                            })(i);
                                        case r.CloseSession:
                                        case r.SessionClosed:
                                            return !0;
                                        case r.Location:
                                            return (function (e) {
                                                const t = e.location;
                                                return !!(t && t.latitude && t.longitude);
                                            })(i);
                                        case r.Postback:
                                            return (function (e) {
                                                return !!e.postback;
                                            })(i);
                                        case r.Text:
                                            return (function (e) {
                                                return !!e.text;
                                            })(i);
                                        case r.Table:
                                            return C(i);
                                        case r.Form:
                                            return S(i);
                                        case r.TableForm:
                                            return (function (e) {
                                                return C(e) && S(e);
                                            })(i);
                                        case r.EditForm:
                                            return (function (e) {
                                                const t = e.fields,
                                                    i = e.formColumns,
                                                    s = e.formRows;
                                                return (
                                                    ((null == t ? void 0 : t.length) > 0 &&
                                                        t.every((e) =>
                                                            (function (e) {
                                                                const t = e.displayType,
                                                                    i = e;
                                                                return (
                                                                    t &&
                                                                    Object.values(b.a).includes(t) &&
                                                                    ((function (e) {
                                                                        const t = e.id;
                                                                        let i = !1;
                                                                        switch (e.displayType) {
                                                                            case b.a.SingleSelect:
                                                                            case b.a.MultiSelect:
                                                                                i = (function (e) {
                                                                                    const t = e.layoutStyle,
                                                                                        i = e.options;
                                                                                    return (
                                                                                        void 0 !== t &&
                                                                                        "string" == typeof t &&
                                                                                        t.length > 0 &&
                                                                                        void 0 !== i &&
                                                                                        i.length > 0 &&
                                                                                        i.every((e) =>
                                                                                            (function (e) {
                                                                                                const t = e.label,
                                                                                                    i = e.value;
                                                                                                return void 0 !== t && "string" == typeof t && t.length > 0 && void 0 !== i;
                                                                                            })(e)
                                                                                        )
                                                                                    );
                                                                                })(e);
                                                                                break;
                                                                            case b.a.Toggle:
                                                                                i = (function (e) {
                                                                                    const t = e.valueOn,
                                                                                        i = e.valueOff;
                                                                                    return void 0 !== t && "string" == typeof t && t.length > 0 && void 0 !== i && "string" == typeof i && i.length > 0;
                                                                                })(e);
                                                                                break;
                                                                            case b.a.DatePicker:
                                                                            case b.a.TimePicker:
                                                                            case b.a.TextInput:
                                                                            case b.a.NumberInput:
                                                                                i = !0;
                                                                        }
                                                                        return i && k(e) && void 0 !== t && t.length > 0;
                                                                    })(i) ||
                                                                        T(e))
                                                                );
                                                            })(e)
                                                        ) &&
                                                        "number" == typeof i &&
                                                        i > 0) ||
                                                    (null == s ? void 0 : s.length) > 0
                                                );
                                            })(i);
                                        case r.FormSubmission:
                                            return (function (e) {
                                                return y.includes(e.processingMethod) && !!e.submittedFields;
                                            })(i);
                                        case r.Status:
                                            return (function (e) {
                                                return e.type === r.Status && "status" in e;
                                            })(i);
                                    }
                                }
                            }
                            var i;
                            return t;
                        }
                        function w(e) {
                            for (const t of e) if (!t.type || !t.label || "string" != typeof t.label) return !1;
                            return !0;
                        }
                        function x(e) {
                            return e && "profile" in e && "object" == typeof e.profile && null !== e.profile;
                        }
                        function C(e) {
                            const t = e.headings,
                                i = e.rows;
                            return t && t.length > 0 && i && i.length > 0 && t.every((e) => k(e)) && i.every((e) => _(e));
                        }
                        function S(e) {
                            const t = e.forms;
                            return t && t.length > 0 && t.every((e) => (u(e) && _(e)) || g(e));
                        }
                        const y = Object.values(b.b);
                        function k(e) {
                            const t = e.label;
                            return void 0 !== t && t.length > 0;
                        }
                        function _(e) {
                            const t = e.fields;
                            return t && t.length > 0 && t.every((e) => T(e));
                        }
                        function T(e) {
                            const t = e.displayType;
                            return t && A(t) && k(e);
                        }
                        const I = [b.a.Text, b.a.Link, b.a.Image, b.a.Media, b.a.ActionDisplay];
                        function A(e) {
                            return I.includes(e);
                        }
                        var E,
                            M = i(24);
                        !(function (e) {
                            (e.ConnectionNone = "ConnectionNone"),
                                (e.ConnectionExplicitClose = "ConnectionExplicitClose"),
                                (e.MessageInvalid = "MessageInvalid"),
                                (e.NetworkFailure = "NetworkFailure"),
                                (e.NetworkOffline = "NetworkOffline"),
                                (e.ProfileInvalid = "ProfileInvalid"),
                                (e.TtsNotAvailable = "TtsNotAvailable"),
                                (e.TTSNoWebAPI = "TTSNoWebAPI"),
                                (e.SuggestionsEmptyRequest = "SuggestionsEmptyRequest"),
                                (e.SuggestionsInvalidRequest = "SuggestionsInvalidRequest"),
                                (e.SuggestionsTimeout = "SuggestionsTimeout"),
                                (e.UploadBadFile = "UploadBadFile"),
                                (e.UploadMaxSize = "UploadMaxSize"),
                                (e.UploadNetworkFail = "UploadNetworkFail"),
                                (e.UploadNotAvailable = "UploadNotAvailable"),
                                (e.UploadZeroSize = "UploadZeroSize"),
                                (e.LocationNoAPI = "LocationNoAPI"),
                                (e.LocationNotAvailable = "LocationNotAvailable"),
                                (e.LocationTimeout = "LocationTimeout"),
                                (e.LocationInvalid = "LocationInvalid");
                        })(E || (E = {}));
                        const L = Object.assign(Object.assign(Object.assign({}, E), M.AuthError), h.b);
                        function P(e, t, i) {
                            e.setRequestHeader(t, i);
                        }
                        function D(e, t, i) {
                            e.addEventListener(t, i);
                        }
                        function O(e) {
                            return (e.lastIndex = 0), e;
                        }
                        function R(e) {
                            return Error(e);
                        }
                        function B(e) {
                            return Promise.reject(R(e));
                        }
                        const V = navigator,
                            N = V && V.geolocation;
                        function z() {
                            return N
                                ? new Promise((e, t) => {
                                      N.getCurrentPosition(
                                          (t) => {
                                              e(t.coords);
                                          },
                                          (e) => {
                                              let i;
                                              switch (e.code) {
                                                  case e.POSITION_UNAVAILABLE:
                                                      i = L.LocationNotAvailable;
                                                      break;
                                                  case e.TIMEOUT:
                                                      i = L.LocationTimeout;
                                                      break;
                                                  case e.PERMISSION_DENIED:
                                                  default:
                                                      i = L.LocationNoAPI;
                                              }
                                              t(R(i));
                                          },
                                          { enableHighAccuracy: !0, timeout: 5e3 }
                                      );
                                  })
                                : B(L.LocationNoAPI);
                        }
                        function F(e) {
                            return "number" == typeof e;
                        }
                        function $(e, t, i) {
                            return e >= t && e <= i;
                        }
                        function U(e) {
                            const { latitude: t, longitude: i } = e;
                            return F(t) && F(i) && $(t, -90, 90) && $(i, -180, 180);
                        }
                        function H(e, t) {
                            const i = (function (e) {
                                const t = e.split("/")[0].toLowerCase();
                                switch (t) {
                                    case a.Audio:
                                    case a.Image:
                                    case a.Video:
                                        return t;
                                    default:
                                        return a.File;
                                }
                            })(e);
                            return { messagePayload: { type: r.Attachment, attachment: { type: i, url: t } } };
                        }
                        function j(e, t) {
                            const i = { messagePayload: { text: e, type: r.Text } };
                            return t && (i.sdkMetadata ? (i.sdkMetadata.speechId = t) : (i.sdkMetadata = { speechId: t })), i;
                        }
                        function W(e) {
                            let t;
                            return (t = "label" in e ? e.label : e.text || ""), { messagePayload: { text: t, postback: e.postback, type: r.Postback } };
                        }
                        function G(e) {
                            return { messagePayload: e };
                        }
                        const q = "; ",
                            K = "",
                            Y = /<[^>]+>/g,
                            J = /&#(\d+);/g,
                            Z = /&#[xX]([\da-fA-F]+);/g;
                        function X(e, t) {
                            const i = e.messagePayload;
                            let s = K;
                            switch (i.type) {
                                case r.Attachment:
                                    s = (function (e, t) {
                                        return `${t[`${e.type}_${e.attachment.type}`]}`;
                                    })(i, t);
                                    break;
                                case r.Card:
                                    s = (function (e, t) {
                                        const i = e.cards;
                                        let s = K,
                                            n = K;
                                        if (i && i.length) {
                                            const e = t.card,
                                                o = e ? (e.indexOf("{0}") >= 0 ? e : `${e} {0}`) : K,
                                                a = i.length > 1;
                                            s = i
                                                .filter((e) => e.title)
                                                .map((e, t) => {
                                                    const i = `${a ? `${o.replace("{0}", `${t + 1}`)}: ` : K}`,
                                                        s = e.description,
                                                        r = s ? q + s : K;
                                                    if (e.actions) {
                                                        const t = (function (e) {
                                                            return (
                                                                (e &&
                                                                    e.length &&
                                                                    e
                                                                        .filter((e) => e && e.label)
                                                                        .map((e) => e.label)
                                                                        .join(q)) ||
                                                                K
                                                            );
                                                        })(e.actions);
                                                        n = t ? q + t : K;
                                                    }
                                                    return `${i}${e.title}${r}${n}`;
                                                })
                                                .join(q);
                                        }
                                        return s;
                                    })(i, t);
                                    break;
                                case r.Location:
                                    s = (function (e) {
                                        const t = e.location;
                                        return `${t.title ? `${t.title}${q}` : K}${t.latitude},${t.longitude}`;
                                    })(i);
                                    break;
                                case r.Text:
                                    s = i.text;
                                    break;
                                case r.Table:
                                    s = (function (e, t) {
                                        const i = e.paginationInfo,
                                            s = i && i.status;
                                        return (
                                            (s ? s + q : K) +
                                            e.rows
                                                .filter((e) => e && e.fields && e.fields.length)
                                                .map((e, i) => ee(e, i, t))
                                                .join(q)
                                        );
                                    })(i, t);
                                    break;
                                case r.Form:
                                    s = (function (e, t) {
                                        const i = e.paginationInfo,
                                            s = i && i.status;
                                        return (
                                            (s ? s + q : K) +
                                            e.forms
                                                .filter((e) => e && u(e) && e.fields.length)
                                                .map((e, i) => ee(e, i, t))
                                                .join(q)
                                        );
                                    })(i, t);
                                    break;
                                case r.TableForm:
                                    s = (function (e, t) {
                                        const i = e.paginationInfo,
                                            s = i && i.status;
                                        return (
                                            (s ? s + q : K) +
                                            e.rows
                                                .filter((e) => e && e.fields && e.fields.length)
                                                .map((i, s) => ee(i, s, t) + q + te(e.forms[s].fields, t))
                                                .join(q)
                                        );
                                    })(i, t);
                                    break;
                                case r.EditForm:
                                    s = (function (e, t) {
                                        return m(e) ? te(e.fields, t) : e.formRows.map((e) => e.columns.map((e) => te(e.fields, t)).join(q)).join(q);
                                    })(i, t);
                            }
                            return (
                                (n = (function (e, t) {
                                    const i = e.headerText || K,
                                        s = e.footerText || K,
                                        n = i + (i && t ? q : K) + t + Q(e.actions) + (s ? `${q}${s}` : K) + Q(e.globalActions);
                                    return n;
                                })(i, s)),
                                n && n.length
                                    ? n
                                          .replace(O(J), (e, t) => String.fromCharCode(t))
                                          .replace(O(Z), (e, t) => {
                                              const i = Number.parseInt(`0x${t}`, 16);
                                              return String.fromCharCode(i);
                                          })
                                          .replace(O(Y), K)
                                    : K
                            );
                            var n;
                        }
                        function Q(e) {
                            let t = K;
                            return (
                                e &&
                                    e.forEach((e) => {
                                        e.label && (t = `${t}${q}${e.label}`);
                                    }),
                                t
                            );
                        }
                        function ee(e, t, i) {
                            return `${(i.itemIterator || "").replace("{0}", `${t + 1}`)}: ${te(e.fields, i)}`;
                        }
                        function te(e, t) {
                            return e && e.length
                                ? e
                                      .filter((e) => e && e.value)
                                      .map((e) =>
                                          (function (e, t) {
                                              const i = e.displayType;
                                              if (A(i)) return `${e.label}: ${"link" === e.displayType ? (t.linkField || "").replace("{0}", e.label) : e.value}`;
                                              let s = `${e.label}: ${i}`;
                                              switch (i) {
                                                  case b.a.SingleSelect:
                                                  case b.a.MultiSelect:
                                                      s += `: ${
                                                          ((n = e.options),
                                                          n && n.length
                                                              ? n
                                                                    .filter((e) => e && e.label && e.value)
                                                                    .map((e) => e.label)
                                                                    .join(q)
                                                              : K)
                                                      }`;
                                                      break;
                                                  case b.a.Toggle:
                                                      const t = e;
                                                      s += `: ${t.labelOn || t.valueOn} ${t.labelOff || t.valueOff}`;
                                              }
                                              var n;
                                              return s;
                                          })(e, t)
                                      )
                                      .join(q)
                                : K;
                        }
                        class ie {
                            constructor(e) {
                                (this.dispatcher = e), (this.state = n.Closed);
                            }
                            getState() {
                                return this.state;
                            }
                            isOpen() {
                                return this.state === n.Open;
                            }
                            isClosed() {
                                return this.state === n.Closed;
                            }
                            on(e, t) {
                                this.dispatcher.bind(e, t);
                            }
                            off(e, t) {
                                this.dispatcher.unbind(e, t);
                            }
                            setState(e) {
                                (this.state = e), this.dispatcher.trigger(s.State, e);
                            }
                        }
                    },
                    721: function (e, t, i) {
                        var s;
                        i.d(t, {
                            a: function () {
                                return s;
                            },
                            b: function () {
                                return n;
                            },
                        }),
                            (function (e) {
                                (e.Text = "text"),
                                    (e.Link = "link"),
                                    (e.Image = "image"),
                                    (e.ActionDisplay = "action"),
                                    (e.Media = "media"),
                                    (e.SingleSelect = "singleSelect"),
                                    (e.MultiSelect = "multiSelect"),
                                    (e.DatePicker = "datePicker"),
                                    (e.TimePicker = "timePicker"),
                                    (e.Toggle = "toggle"),
                                    (e.TextInput = "textInput"),
                                    (e.NumberInput = "numberInput");
                            })(s || (s = {}));
                        const n = { MapVariable: "mapVariable", SeparateVariables: "separateVariables", CompositeBag: "compositeBag" };
                    },
                    930: function (e, t, i) {
                        i.r(t),
                            i.d(t, {
                                ActionType: function () {
                                    return x.a;
                                },
                                AttachmentType: function () {
                                    return x.b;
                                },
                                ConnectionState: function () {
                                    return x.d;
                                },
                                CoreError: function () {
                                    return x.e;
                                },
                                CoreEvent: function () {
                                    return x.f;
                                },
                                DisplayType: function () {
                                    return x.g;
                                },
                                FILE_TYPES: function () {
                                    return O;
                                },
                                FormSubmissionProcessingMethod: function () {
                                    return x.h;
                                },
                                MAX_MB: function () {
                                    return L;
                                },
                                MessageType: function () {
                                    return x.i;
                                },
                                RecognitionLocale: function () {
                                    return x.j;
                                },
                                SenderType: function () {
                                    return x.k;
                                },
                                SkillMessageSource: function () {
                                    return x.l;
                                },
                                WebCore: function () {
                                    return R;
                                },
                                buildPostbackMessage: function () {
                                    return x.m;
                                },
                                buildUserAttachmentMessage: function () {
                                    return x.n;
                                },
                                buildUserMessage: function () {
                                    return x.o;
                                },
                                buildUserTextMessage: function () {
                                    return x.p;
                                },
                                getCurrentPosition: function () {
                                    return x.q;
                                },
                                getError: function () {
                                    return x.r;
                                },
                                getRejectPromiseError: function () {
                                    return x.s;
                                },
                                getUtteranceText: function () {
                                    return x.t;
                                },
                                isEditFormPayloadWithFields: function () {
                                    return x.u;
                                },
                                isEditFormPayloadWithRows: function () {
                                    return x.v;
                                },
                                isFormEntityWithFields: function () {
                                    return x.w;
                                },
                                isFormEntityWithRows: function () {
                                    return x.x;
                                },
                                isMessagePayload: function () {
                                    return x.y;
                                },
                                isPostbackPayload: function () {
                                    return x.z;
                                },
                                isValidLocale: function () {
                                    return x.B;
                                },
                                isValidLocation: function () {
                                    return x.C;
                                },
                                isValidMessage: function () {
                                    return x.D;
                                },
                                isValidProfileMessage: function () {
                                    return x.E;
                                },
                            });
                        var s = i(24);
                        let n = 1,
                            o = 1,
                            a = 1;
                        const r = window,
                            c = r.addEventListener,
                            l = r.speechSynthesis,
                            h = r.SpeechSynthesisUtterance,
                            d = r.navigator,
                            p = clearTimeout;
                        class u {
                            constructor() {
                                if (!r || !l || !h) throw Error("TTSNoWebAPI");
                                f().then((e) => {
                                    this._voice = e;
                                }),
                                    c("beforeunload", (e) => {
                                        l.cancel(), p(this._pauser), delete e.returnValue;
                                    }),
                                    c(
                                        "click",
                                        () => {
                                            l && (l.cancel(), l.resume(), l.speak(new h(" ")));
                                        },
                                        { once: !0 }
                                    );
                            }
                            static getInstance() {
                                return this._service || (this._service = new u()), this._service;
                            }
                            speak(e) {
                                if (this._voice) {
                                    const t = new h(e);
                                    (t.voice = this._voice), (t.pitch = n), (t.rate = o), (t.volume = a), l.paused && l.resume(), l.speak(t), this._voice.localService || (p(this._pauser), b((e) => (this._pauser = e)));
                                }
                            }
                            cancel() {
                                l.speaking && (l.cancel(), p(this._pauser));
                            }
                            getVoices() {
                                return g();
                            }
                            setVoice(e) {
                                return (function (e) {
                                    const t = e.map((e) => Object.assign({ lang: "", name: "" }, e));
                                    return g().then((e) => {
                                        for (const i of t) for (const t of e) if (v(i.lang, t.lang) && v(i.name, t.name)) return t;
                                        for (const i of t) for (const t of e) if (v(i.lang, t.lang)) return t;
                                        for (const i of t) for (const t of e) if (t.lang.indexOf(i.lang) >= 0) return t;
                                        return f();
                                    });
                                })(e).then((e) => {
                                    (this._voice = e), (n = e.pitch || 1), (o = e.rate || 1), (a = e.volume || 1);
                                });
                            }
                            getVoice() {
                                return this._voice;
                            }
                        }
                        function g() {
                            return new Promise((e) => {
                                m(e),
                                    l.addEventListener("voiceschanged", () => {
                                        m(e);
                                    });
                            });
                        }
                        function m(e) {
                            const t = l.getVoices();
                            t.length &&
                                e(
                                    (function (e) {
                                        return Array.isArray(e) ? e : e._list;
                                    })(t)
                                );
                        }
                        function f() {
                            return g().then((e) => {
                                if (d && d.language) {
                                    const t = e.filter((e) => e.lang === d.language)[0];
                                    if (t) return t;
                                }
                                const t = e.filter((e) => e.default)[0];
                                return t || e[0];
                            });
                        }
                        function b(e) {
                            const t = r.setTimeout(() => {
                                l.speaking && (l.pause(), l.resume(), b(e));
                            }, 1e4);
                            e(t);
                        }
                        function v(e, t) {
                            return e.toLowerCase() === t.toLowerCase();
                        }
                        var w = i(216),
                            x = i(197);
                        const C = { state: { type: "ping" } };
                        class S extends x.c {
                            constructor(e) {
                                super(e.dispatcher), (this.url = e.url), (this.authService = e.authService);
                            }
                            open() {
                                return this.isOpen() ? Promise.resolve() : navigator.onLine ? this.connect() : (0, x.s)(x.e.NetworkOffline);
                            }
                            close() {
                                return this.isClosed() ? Promise.resolve() : this.disconnect();
                            }
                            send(e) {
                                return new Promise((t, i) => {
                                    if (this.isOpen()) {
                                        const s = new XMLHttpRequest();
                                        s.open("POST", this.url),
                                            (0, x.G)(s, "Content-Type", "application/json"),
                                            (s.onload = () => {
                                                s.status >= 200 && s.status < 300 ? t(e) : i(s.response);
                                            }),
                                            (s.onerror = () => {
                                                i((0, x.r)(x.e.NetworkFailure));
                                            }),
                                            this.sendRequest(s, JSON.stringify(e)).catch(i);
                                    } else i((0, x.r)(x.e.ConnectionNone));
                                });
                            }
                            updateConnectionUrl(e) {
                                this.url = (0, s.getLongPollURL)(e.URI, { channelId: e.channelId, userId: e.userId }, e.isTLS);
                            }
                            connect() {
                                return (
                                    this.openPromise ||
                                        ((this.openPromise = new s.Deferred()),
                                        this.setState(x.d.Connecting),
                                        this.openConnection()
                                            .then(() => {
                                                this.onOpen(), this.poll();
                                            })
                                            .catch((e) => {
                                                this.openPromise && (this.openPromise.reject(e), (this.openPromise = null)), this.onClose();
                                            })),
                                    this.openPromise.promise
                                );
                            }
                            disconnect() {
                                return this.closePromise || (this.xhr.abort(), (this.closePromise = new s.Deferred()), this.setState(x.d.Closing), this.onClose()), this.closePromise.promise;
                            }
                            openConnection() {
                                return new Promise((e, t) => {
                                    const i = new XMLHttpRequest();
                                    i.open("POST", this.url),
                                        (0, x.G)(i, "Content-Type", "application/json"),
                                        (i.onload = () => {
                                            i.status >= 200 && i.status < 300 ? e() : t(i.response);
                                        }),
                                        (i.onerror = () => {
                                            t((0, x.r)(x.e.NetworkFailure));
                                        }),
                                        this.sendRequest(i, JSON.stringify(C)).catch((e) => {
                                            t(e);
                                        });
                                });
                            }
                            poll() {
                                let e = 0;
                                this.isOpen() &&
                                    ((this.xhr = new XMLHttpRequest()),
                                    this.xhr.open("GET", this.url),
                                    (this.xhr.onload = () => {
                                        (e = 0), this.xhr.status && 200 === this.xhr.status && this.onMessages(this.xhr.responseText), this.poll();
                                    }),
                                    (this.xhr.onerror = () => {
                                        5 === e ? this.close() : (e++, this.poll());
                                    }),
                                    this.sendRequest(this.xhr));
                            }
                            sendRequest(e, t) {
                                return this.authService
                                    ? new Promise((i, s) => {
                                          var n;
                                          null === (n = this.authService) ||
                                              void 0 === n ||
                                              n
                                                  .get()
                                                  .then((s) => {
                                                      (0, x.G)(e, "Authorization", `Bearer ${s.token}`), e.send(t), i();
                                                  })
                                                  .catch((e) => {
                                                      s(e);
                                                  });
                                      })
                                    : (e.send(t), Promise.resolve());
                            }
                            onMessages(e) {
                                try {
                                    JSON.parse(e).forEach((e) => {
                                        this.onMessage(JSON.parse(e));
                                    });
                                } catch (e) {
                                    this.onError(e);
                                }
                            }
                            onOpen() {
                                this.openPromise && (this.openPromise.resolve(), (this.openPromise = null)),
                                    this.closePromise && (this.closePromise.reject(), (this.closePromise = null)),
                                    this.setState(x.d.Open),
                                    this.dispatcher.trigger(x.f.Open);
                            }
                            onClose() {
                                this.closePromise && (this.closePromise.resolve(), (this.closePromise = null)), (this.openPromise = null), this.setState(x.d.Closed), this.dispatcher.trigger(x.f.Close);
                            }
                            onMessage(e) {
                                this.dispatcher.trigger(x.f.Message, e), this.dispatcher.trigger(x.f.MessageReceived, e);
                            }
                            onError(e) {
                                this.dispatcher.trigger(x.f.Error, e);
                            }
                        }
                        const y = Promise,
                            k = 3e6,
                            _ = window;
                        class T extends x.c {
                            constructor(e) {
                                super(e.dispatcher),
                                    (this.isExplicitClose = !1),
                                    (this.isHeartBeatAlive = !1),
                                    (this.isTokenValid = !1),
                                    (this.retryAttempt = 0),
                                    (this.reconnectAttempted = !1),
                                    (this.ws = null),
                                    (this.url = e.url),
                                    (this.authService = e.authService),
                                    (this.retryInterval = e.retryInterval),
                                    (this.retryMaxAttempts = e.retryMaxAttempts),
                                    e.suggestionPromise && (this.suggestionPromise = e.suggestionPromise);
                            }
                            open() {
                                return this.isOpen() ? y.resolve() : navigator.onLine ? this.connect() : (0, x.s)(x.e.NetworkOffline);
                            }
                            close() {
                                return (this.isExplicitClose = !0), clearTimeout(this.retryMonitor), this.isClosed() ? y.resolve() : this.disconnect();
                            }
                            send(e) {
                                return new y((t, i) => {
                                    if (this.ws && this.isOpen()) {
                                        this.isTokenValid = !0;
                                        try {
                                            this.ws.send(JSON.stringify(e)), t(e), ((s = e).state && s.state.type && "ping" === s.state.type) || (this.dispatcher.trigger(x.f.Message, e), this.dispatcher.trigger(x.f.MessageSent, e));
                                        } catch (e) {
                                            i((0, x.r)(x.e.NetworkFailure));
                                        }
                                    } else i((0, x.r)(x.e.ConnectionNone));
                                    var s;
                                });
                            }
                            updateConnectionUrl(e) {
                                this.url = (0, s.getWebSocketURL)(e.URI, { channelId: e.channelId, userId: e.userId }, e.isTLS, e.channel);
                            }
                            connect() {
                                return this.openPromise || ((this.openPromise = new s.Deferred()), this.setState(x.d.Connecting), this.openConnection()), this.openPromise.promise;
                            }
                            disconnect() {
                                var e;
                                return this.closePromise || (null === (e = this.ws) || void 0 === e || e.close(), (this.closePromise = new s.Deferred()), this.setState(x.d.Closing)), this.closePromise.promise;
                            }
                            openConnection() {
                                try {
                                    (this.ws = new WebSocket(this.url)),
                                        (this.ws.onopen = () => {
                                            this.setState(x.d.Open), (this.reconnectAttempted = !1), this.authService ? this.authenticateConnection() : this.onOpen();
                                        }),
                                        (this.ws.onclose = (e) => {
                                            this.stopMonitors(),
                                                this.isExplicitClose
                                                    ? (this.setState(x.d.Closed), this.rejectAndCloseConnection(x.e.ConnectionExplicitClose, e))
                                                    : this.authService && !this.isTokenValid && 1006 !== e.code
                                                    ? (this.setState(x.d.Closed), this.rejectAndCloseConnection(x.e.AuthExpiredToken, e))
                                                    : this.reconnectAttempted || this.retryConnection(e);
                                        }),
                                        (this.ws.onmessage = this.onMessage.bind(this)),
                                        (this.ws.onerror = () => {
                                            this.retryConnection(), (this.reconnectAttempted = !0), this.onError.bind(this);
                                        });
                                } catch (e) {
                                    this.retryConnection();
                                }
                            }
                            retryConnection(e) {
                                this.setState(x.d.Connecting),
                                    this.retryAttempt < this.retryMaxAttempts
                                        ? (this.retryAttempt++, (this.retryMonitor = _.setTimeout(this.openConnection.bind(this), this.retryInterval)))
                                        : (this.setState(x.d.Closed), this.rejectAndCloseConnection(x.e.NetworkFailure, e));
                            }
                            rejectAndCloseConnection(e, t) {
                                this.openPromise && this.openPromise.reject((0, x.r)(e)), this.onClose(t);
                            }
                            authenticateConnection() {
                                var e;
                                (this.isTokenValid = !1),
                                    null === (e = this.authService) ||
                                        void 0 === e ||
                                        e
                                            .get()
                                            .then((e) => {
                                                this.send(
                                                    (function (e) {
                                                        return { state: { token: e, tokenType: "jwt", type: "auth" } };
                                                    })(e.token)
                                                ).then(() => {
                                                    setTimeout(() => (this.isTokenValid = !0), 1e4), this.onOpen();
                                                });
                                            })
                                            .catch((e) => {
                                                var t;
                                                null === (t = this.openPromise) || void 0 === t || t.reject(e), this.close();
                                            });
                            }
                            onOpen() {
                                var e;
                                this.stopMonitors(),
                                    clearTimeout(this.retryMonitor),
                                    (this.heartBeatMonitor = this.initHeartBeat()),
                                    (this.refreshMonitor =
                                        ((e = this),
                                        _.setTimeout(() => {
                                            I(e);
                                        }, k))),
                                    (this.retryAttempt = 0),
                                    (this.isExplicitClose = !1),
                                    (this.isTokenValid = !1),
                                    this.openPromise && (this.openPromise.resolve(), (this.openPromise = null)),
                                    this.closePromise && (this.closePromise.reject(), (this.closePromise = null)),
                                    this.dispatcher.trigger(x.f.Open);
                            }
                            onClose(e) {
                                (this.retryAttempt = 0),
                                    (this.isExplicitClose = !1),
                                    (this.isTokenValid = !1),
                                    this.closePromise && (this.closePromise.resolve(), (this.closePromise = null)),
                                    (this.openPromise = null),
                                    this.dispatcher.trigger(x.f.Close, e);
                            }
                            onMessage(e) {
                                try {
                                    const t = JSON.parse(e.data);
                                    !(function (e) {
                                        return e.state && e.state.type && "pong" === e.state.type;
                                    })(t)
                                        ? t.suggestions && this.suggestionPromise
                                            ? this.suggestionPromise.resolve(t.suggestions)
                                            : (this.dispatcher.trigger(x.f.Message, t), this.dispatcher.trigger(x.f.MessageReceived, t))
                                        : (this.isHeartBeatAlive = !0);
                                } catch (e) {
                                    this.onError(e);
                                }
                            }
                            onError(e) {
                                this.dispatcher.trigger(x.f.Error, e);
                            }
                            initHeartBeat() {
                                return _.setInterval(() => {
                                    this.send(C).then(() => {
                                        (this.isHeartBeatAlive = !1),
                                            (this.pongMonitor = _.setTimeout(() => {
                                                this.isOpen() && !this.isHeartBeatAlive && I(this);
                                            }, 1e4));
                                    });
                                }, 3e4);
                            }
                            stopMonitors() {
                                clearTimeout(this.refreshMonitor), clearInterval(this.heartBeatMonitor), clearTimeout(this.pongMonitor);
                            }
                        }
                        function I(e) {
                            e.close().then(() => e.open());
                        }
                        class A {
                            constructor(e) {
                                (this.options = e),
                                    e.isLongPoll && ((this.options.retryInterval = 2e3), (this.options.retryMaxAttempts = 5)),
                                    (this.dispatcher = (0, s.generateEventDispatcher)()),
                                    (this.wsConnection = new T({
                                        authService: e.authService,
                                        url: (0, s.getWebSocketURL)(e.baseURL, e.searchParams, e.isTLS, e.channel),
                                        retryInterval: e.retryInterval,
                                        retryMaxAttempts: e.retryMaxAttempts,
                                        suggestionPromise: e.suggestionPromise,
                                        dispatcher: this.dispatcher,
                                    })),
                                    (this.currentConnection = this.wsConnection);
                            }
                            open() {
                                return this.options.isLongPoll
                                    ? new Promise((e, t) => {
                                          this.wsConnection
                                              .open()
                                              .then(() => {
                                                  this.useWS(e);
                                              })
                                              .catch(() => {
                                                  this.useLongPoll(e, t);
                                              });
                                      })
                                    : this.currentConnection.open();
                            }
                            close() {
                                return clearTimeout(this.upgradeToWebSocketMonitor), this.currentConnection.close();
                            }
                            send(e) {
                                return this.currentConnection.send(e);
                            }
                            isOpen() {
                                return this.currentConnection.isOpen();
                            }
                            isClosed() {
                                return this.currentConnection.isClosed();
                            }
                            getState() {
                                return this.currentConnection.getState();
                            }
                            updateConnectionUrl(e) {
                                var t;
                                this.wsConnection.updateConnectionUrl(e),
                                    (this.options = Object.assign(Object.assign({}, this.options), { baseURL: e.URI, searchParams: { channelId: e.channelId, userId: e.userId }, isTLS: e.isTLS, channel: e.channel })),
                                    null === (t = this.longPollConnection) || void 0 === t || t.updateConnectionUrl(e);
                            }
                            on(e, t) {
                                this.dispatcher.bind(e, t);
                            }
                            off(e, t) {
                                this.dispatcher.unbind(e, t);
                            }
                            useWS(e) {
                                var t;
                                (this.currentConnection = this.wsConnection),
                                    clearTimeout(this.upgradeToWebSocketMonitor),
                                    (null === (t = this.longPollConnection) || void 0 === t ? void 0 : t.isOpen()) && this.longPollConnection.close(),
                                    e();
                            }
                            useLongPoll(e, t) {
                                (this.currentConnection = this.getLongPollConnection()),
                                    this.currentConnection
                                        .open()
                                        .then(() => {
                                            (this.upgradeToWebSocketMonitor = this.initUpgradeToWebSocketTimer()), e();
                                        })
                                        .catch((e) => {
                                            t(e);
                                        });
                            }
                            getLongPollConnection() {
                                return (
                                    this.longPollConnection ||
                                        (this.longPollConnection = new S({
                                            url: (0, s.getLongPollURL)(this.options.baseURL, this.options.searchParams, this.options.isTLS),
                                            authService: this.options.authService,
                                            dispatcher: this.dispatcher,
                                        })),
                                    this.longPollConnection
                                );
                            }
                            initUpgradeToWebSocketTimer() {
                                return window.setTimeout(this.open.bind(this), 3e5);
                            }
                        }
                        const E = { isLongPoll: !1, isTLS: !0 };
                        class M {
                            constructor(e) {
                                (this.suggestionPromise = new s.Deferred()),
                                    (this.areNewConnectionParamsPassed = (e, t, i) => {
                                        let s = !1;
                                        return ((e && e !== this.config.URI) || (t && t !== this.config.channelId) || (i && i !== this.config.userId)) && (s = !0), s;
                                    }),
                                    (this.updateConnectionParams = (e, t, i) =>
                                        new Promise((s, n) => {
                                            e && "string" == typeof e && e.length && (this.config.URI = e),
                                                this.authService
                                                    ? this.authService
                                                          .get()
                                                          .then((e) => {
                                                              (this.config.channelId = e.getClaim("channelId")),
                                                                  (this.config.userId = e.getClaim("userId")),
                                                                  this.connection.updateConnectionUrl({
                                                                      URI: this.config.URI,
                                                                      channelId: this.config.channelId,
                                                                      userId: this.config.userId,
                                                                      isTLS: this.config.isTLS,
                                                                      channel: this.config.channel,
                                                                  }),
                                                                  s();
                                                          })
                                                          .catch((e) => n(e))
                                                    : ("string" == typeof t && t.length && (this.config.channelId = t),
                                                      "string" == typeof i && i.length && (this.config.userId = i),
                                                      this.connection.updateConnectionUrl({ URI: this.config.URI, channelId: this.config.channelId, userId: this.config.userId, isTLS: this.config.isTLS, channel: this.config.channel }),
                                                      s());
                                        })),
                                    (this.config = Object.assign(Object.assign({}, E), e)),
                                    this.config.tokenGenerator && (this.authService = s.AuthTokenService.getInstance()),
                                    (this.connection = new A({
                                        baseURL: this.config.URI,
                                        isLongPoll: this.config.isLongPoll,
                                        isTLS: this.config.isTLS,
                                        channel: this.config.channel,
                                        retryInterval: void 0 !== this.config.retryInterval && this.config.retryInterval >= 0 ? 1e3 * this.config.retryInterval : 5e3,
                                        retryMaxAttempts: void 0 !== this.config.retryMaxAttempts && this.config.retryMaxAttempts >= 0 ? this.config.retryMaxAttempts : 5,
                                        searchParams: { channelId: this.config.channelId, userId: this.config.userId },
                                        authService: this.authService,
                                        suggestionPromise: this.suggestionPromise,
                                    })),
                                    window.addEventListener("online", () => this.open()),
                                    window.addEventListener("offline", () => this.close());
                            }
                            open(e) {
                                const { URI: t, userId: i, channelId: s } = e || {};
                                if (this.isOpen()) {
                                    if (this.areNewConnectionParamsPassed(t, s, i)) {
                                        const e = t && this.config.URI !== t;
                                        return !this.authService || e ? this.close().then(() => this.updateConnectionParams(t, s, i).then(() => this.connection.open())) : Promise.resolve();
                                    }
                                    return Promise.resolve();
                                }
                                return this.updateConnectionParams(t, s, i).then(() => this.connection.open());
                            }
                            close() {
                                return this.connection.close();
                            }
                            isOpen() {
                                return this.connection.isOpen();
                            }
                            send(e, t, i) {
                                let s;
                                return (
                                    (s = "string" == typeof e ? (0, x.p)(e, t) : (0, x.z)(e) ? (0, x.m)(e) : (0, x.y)(e) ? (0, x.o)(e) : e),
                                    (0, x.D)(s) ? ((null == i ? void 0 : i.sdkMetadata) && (s = this.updateMetadata(s, i.sdkMetadata)), (s.userId = this.config.userId), this.connection.send(s)) : (0, x.s)(x.e.MessageInvalid)
                                );
                            }
                            updateUser(e, t) {
                                let i = e;
                                return (null == t ? void 0 : t.sdkMetadata) && (i = this.updateMetadata(e, t.sdkMetadata)), this.connection.send(i);
                            }
                            sendDeviceToken(e) {
                                const t = { state: { type: "token", deviceToken: e } };
                                return this.connection.send(t);
                            }
                            getSuggestions(e) {
                                var t;
                                const i = { messagePayload: { query: e, threshold: 30, type: x.i.Suggest } };
                                return (
                                    this.connection.send(i),
                                    setTimeout(() => {
                                        var e;
                                        null === (e = this.suggestionPromise) || void 0 === e || e.reject((0, x.r)(x.e.SuggestionsTimeout));
                                    }, 1e4),
                                    null === (t = this.suggestionPromise) || void 0 === t ? void 0 : t.promise
                                );
                            }
                            on(e, t) {
                                this.connection.on(e, t);
                            }
                            off(e, t) {
                                this.connection.off(e, t);
                            }
                            updateMetadata(e, t) {
                                return t && (e.sdkMetadata = Object.assign(Object.assign({}, e.sdkMetadata), t)), e;
                            }
                        }
                        const L = 25,
                            P = 1024 * L * 1024;
                        class D {
                            static getInstance() {
                                return this.service || (this.service = new D()), this.service;
                            }
                            setParams(e) {
                                (this.params = e),
                                    (this.URL = (function (e, t, i) {
                                        const n = `http${i ? "s" : ""}://`;
                                        return (0, s.buildURL)(n, e, t, "/chat/v1/attachments");
                                    })(e.URI, { channelId: e.channelId, userId: e.userId }, e.isTLS));
                            }
                            upload(e, t) {
                                return new Promise((i, n) => {
                                    const o = e.size;
                                    if (0 === o) return void n(Error(x.e.UploadZeroSize));
                                    if (o > P) return void n(Error(x.e.UploadMaxSize));
                                    const a = new XMLHttpRequest(),
                                        r = () => n(Error(x.e.UploadNetworkFail));
                                    (0, x.F)(a, "readystatechange", () => {
                                        if (4 === a.readyState)
                                            switch (a.status) {
                                                case 200: {
                                                    const e = JSON.parse(a.responseText);
                                                    i(e);
                                                    break;
                                                }
                                                case 413:
                                                    n(Error(x.e.UploadMaxSize));
                                                    break;
                                                case 415:
                                                    n(Error(x.e.UploadBadFile));
                                                    break;
                                                default:
                                                    r();
                                            }
                                    }),
                                        (0, x.F)(a, "abort", r),
                                        (0, x.F)(a, "error", r),
                                        (0, x.F)(a, "timeout", r),
                                        this.params.tokenGenerator
                                            ? s.AuthTokenService.getInstance()
                                                  .get()
                                                  .then((i) => this.send(a, { file: e, options: t, token: i.token }))
                                                  .catch((e) => n(e))
                                            : this.send(a, { file: e, options: t });
                                });
                            }
                            send(e, { file: t, options: i, token: s }) {
                                const n = new FormData();
                                n.append("attachment", t, encodeURI(t.name)),
                                    e.open("POST", this.URL),
                                    (0, x.G)(e, "x-oda-meta-file-size", t.size.toString()),
                                    s &&
                                        ((0, x.G)(e, "Authorization", `Bearer ${s}`),
                                        this.params.enableAttachmentSecurity && ((0, x.G)(e, "x-oda-meta-file-isProtected", "True"), (0, x.G)(e, "x-oda-meta-file-authType", "ChannelClientAuth"))),
                                    e.send(n),
                                    i && i.onInitUpload && i.onInitUpload(e);
                            }
                        }
                        const O = {
                            AUDIO: ".aac, .amr, .m4a, .mp3, .mp4a, .mpga, .oga, .ogg, .wav, audio/*",
                            FILE:
                                ".7z, .csv, .doc, .docx, .eml, .ics, .key, .log, .msg, .neon, .numbers, .odt, .pages, .pdf, .pps, .ppsx, .ppt, .pptx, .rtf, .txt, .vcf, .xls, .xlsx, .xml, .yml, .yaml, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                            IMAGE: ".gif, .jfif, .jpeg, .jpg, .png, .svg, .tif, .tiff, .webp, image/*",
                            VIDEO: ".3g2, .3gp, .avi, .m4v, .mov, .mp4, .mpeg, .mpg, .ogv, .qt, .webm, .wmv, video/*",
                            ALL: "",
                        };
                        O.ALL = `${O.AUDIO},${O.FILE},${O.IMAGE},${O.VIDEO}`;
                        class R {
                            constructor(e) {
                                (this.recognizedText = null),
                                    this.initServices(e),
                                    (this.chatService = new M(e)),
                                    this.chatService.on(x.f.Open, () => {
                                        this.uploadService && this.uploadService.setParams(e), this.recognitionService && this.recognitionService.setConfig(e);
                                    });
                            }
                            connect(e) {
                                return this.chatService.open(e);
                            }
                            disconnect() {
                                const e = this.chatService.close();
                                return e.then(this.onChatServiceClose.bind(this)), e;
                            }
                            isConnected() {
                                return this.chatService.isOpen();
                            }
                            sendMessage(e, t) {
                                if (!e) return (0, x.s)(x.e.MessageInvalid);
                                let i = "",
                                    s = "";
                                return (
                                    "string" == typeof e ? (s = e) : (0, x.y)(e) && (s = e.text),
                                    this.recognizedText && this.recognizedText.text === s && (i = this.recognizedText.requestId),
                                    (this.recognizedText = null),
                                    this.chatService.send(e, i, t)
                                );
                            }
                            updateUser(e, t) {
                                return (0, x.E)(e) ? this.chatService.updateUser(e, t) : (0, x.s)(x.e.ProfileInvalid);
                            }
                            sendDeviceToken(e) {
                                return this.chatService.sendDeviceToken(e);
                            }
                            uploadAttachment(e, t) {
                                return this.isConnected() ? (this.uploadService ? this.uploadService.upload(e, t).then((e) => (0, x.n)(e.type, e.url)) : (0, x.s)(x.e.UploadNotAvailable)) : (0, x.s)(x.e.ConnectionNone);
                            }
                            sendAttachment(e, t) {
                                return this.uploadAttachment(e, t).then((e) => this.chatService.send(e, "", { sdkMetadata: null == t ? void 0 : t.sdkMetadata }));
                            }
                            sendLocation(e) {
                                return this.isConnected()
                                    ? e
                                        ? (0, x.C)(e)
                                            ? this.chatService.send({ messagePayload: { type: x.i.Location, location: e } })
                                            : (0, x.s)(x.e.LocationInvalid)
                                        : (0, x.q)().then((e) => this.chatService.send({ messagePayload: { type: x.i.Location, location: { latitude: e.latitude, longitude: e.longitude } } }))
                                    : (0, x.s)(x.e.ConnectionNone);
                            }
                            sendUserTypingStatus(e, t) {
                                return this.sendMessage((0, x.o)({ partyType: "user", source: "sdk", status: e, type: x.i.Status, text: t }));
                            }
                            getSuggestions(e) {
                                return e ? ("string" != typeof e ? (0, x.s)(x.e.SuggestionsInvalidRequest) : this.chatService.getSuggestions(e)) : (0, x.s)(x.e.SuggestionsEmptyRequest);
                            }
                            destroy() {
                                this.disconnect();
                                for (const e in this) this[e] && delete this[e];
                            }
                            setTTSService(e) {
                                this.ttsService = e;
                            }
                            getTTSService() {
                                return this.ttsService || u.getInstance();
                            }
                            getTTSVoices() {
                                return this.ttsService ? this.ttsService.getVoices() : (0, x.s)(x.e.TtsNotAvailable);
                            }
                            setTTSVoice(e) {
                                return this.ttsService ? this.ttsService.setVoice(e) : (0, x.s)(x.e.TtsNotAvailable);
                            }
                            getTTSVoice() {
                                if (this.ttsService) return this.ttsService.getVoice();
                                throw (0, x.r)(x.e.TtsNotAvailable);
                            }
                            speakTTS(e, t) {
                                if (this.ttsService) {
                                    let i;
                                    if ("string" == typeof e) i = e;
                                    else {
                                        if (!(0, x.D)(e)) return;
                                        i = (0, x.t)(e, t);
                                    }
                                    this.ttsService.speak(i);
                                }
                            }
                            cancelTTS() {
                                this.ttsService && this.ttsService.cancel();
                            }
                            startRecognition(e) {
                                return this.recognitionService
                                    ? this.isConnected()
                                        ? this.recognitionService.startRecognition(
                                              Object.assign(Object.assign({}, e), {
                                                  onRecognitionText: (t) => {
                                                      "final" === t.type && (this.recognizedText = t), e.onRecognitionText(t);
                                                  },
                                              })
                                          )
                                        : (0, x.s)(x.e.ConnectionNone)
                                    : (0, x.s)(x.e.RecognitionNotAvailable);
                            }
                            stopRecognition() {
                                return this.recognitionService ? this.recognitionService.stopRecognition() : (0, x.s)(x.e.RecognitionNotAvailable);
                            }
                            setRecognitionLocale(e) {
                                if (e && "string" == typeof e && this.recognitionService) {
                                    const t = e.toLowerCase();
                                    this.recognitionService.setLocale(t);
                                }
                            }
                            on(e, t) {
                                this.chatService.on(e, t);
                            }
                            off(e, t) {
                                this.chatService.off(e, t);
                            }
                            getAuthToken() {
                                var e;
                                return null === (e = this.authService) || void 0 === e ? void 0 : e.get();
                            }
                            onChatServiceClose() {
                                console.log("The chat service is closed.");
                            }
                            initServices(e) {
                                (e.URI = e.URI.replace(/^https?:\/\//gi, (e) => (console.warn(`Please remove "${e}" from URI.`), ""))),
                                    this.initAttachmentService(e),
                                    this.initAuthService(e),
                                    this.initTTSService(e),
                                    (this.recognitionService = w.a.getInstance());
                            }
                            initAttachmentService(e) {
                                e.enableAttachment && (this.uploadService = D.getInstance());
                            }
                            initAuthService(e) {
                                e.tokenGenerator && ((this.authService = s.AuthTokenService.getInstance()), this.authService.setFetch(e.tokenGenerator));
                            }
                            initTTSService(e) {
                                if (e.isTTS) {
                                    if (e.TTSService) return void (this.ttsService = e.TTSService);
                                    try {
                                        this.ttsService = u.getInstance();
                                    } catch (e) {}
                                }
                            }
                        }
                    },
                    532: function (e, t, i) {
                        var s;
                        i.r(t),
                            i.d(t, {
                                ChatEvent: function () {
                                    return s;
                                },
                                ConnectionState: function () {
                                    return T.d;
                                },
                                DOMUtil: function () {
                                    return Oe;
                                },
                                Logger: function () {
                                    return R;
                                },
                                MessageComponentFactory: function () {
                                    return _t;
                                },
                                RecognitionLocale: function () {
                                    return T.j;
                                },
                                SDK_VERSION: function () {
                                    return U;
                                },
                                ShareCategory: function () {
                                    return Fe;
                                },
                                StorageType: function () {
                                    return Ne;
                                },
                                WidgetComponent: function () {
                                    return ti;
                                },
                                WidgetTheme: function () {
                                    return ze;
                                },
                                configureLocale: function () {
                                    return C;
                                },
                                debounce: function () {
                                    return S;
                                },
                                deepFreeze: function () {
                                    return o;
                                },
                                getValues: function () {
                                    return a;
                                },
                                isAnyVoiceAvailable: function () {
                                    return r;
                                },
                                setObjectReadOnly: function () {
                                    return f;
                                },
                                syncTTSLocaleIfUnavailable: function () {
                                    return v;
                                },
                                updateCSSVar: function () {
                                    return k;
                                },
                            }),
                            (function (e) {
                                (e.CHAT_LANG = "chatlanguagechange"),
                                    (e.CLICK_AUDIO_RESPONSE_TOGGLE = "click:audiotoggle"),
                                    (e.CLICK_ERASE = "click:erase"),
                                    (e.CLICK_VOICE_TOGGLE = "click:voicetoggle"),
                                    (e.DESTROY = "destroy"),
                                    (e.CHAT_END = "chatend"),
                                    (e.MESSAGE = "message"),
                                    (e.MESSAGE_RECEIVED = "message:received"),
                                    (e.MESSAGE_SENT = "message:sent"),
                                    (e.NETWORK = "networkstatuschange"),
                                    (e.READY = "ready"),
                                    (e.TYPING = "typing"),
                                    (e.UNREAD = "unreadCount"),
                                    (e.WIDGET_CLOSED = "widget:closed"),
                                    (e.WIDGET_OPENED = "widget:opened");
                            })(s || (s = {}));
                        const n = (e) => {
                            let t;
                            try {
                                t = window[e];
                                const i = "__storage_test__";
                                return t.setItem(i, i), t.removeItem(i), !0;
                            } catch (e) {
                                return e instanceof DOMException && (22 === e.code || 1014 === e.code || "QuotaExceededError" === e.name || "NS_ERROR_DOM_QUOTA_REACHED" === e.name) && t && 0 !== t.length;
                            }
                        };
                        function o(e) {
                            const t = Object.keys(e);
                            for (const i of t) {
                                const t = e[i];
                                t && "object" == typeof t && o(t);
                            }
                            return Object.freeze(e);
                        }
                        function a(e) {
                            const t = [];
                            if ("object" == typeof e && null !== e) for (const i of Object.keys(e)) t.push(e[i]);
                            return t;
                        }
                        function r(e, t) {
                            if (!t) return Promise.resolve(!1);
                            if ((Array.isArray(t) || (t = [t]), !t.length)) return Promise.resolve(!1);
                            const i = t.map((e) => {
                                var t;
                                return null === (t = e.lang) || void 0 === t ? void 0 : t.toLowerCase();
                            });
                            return e.getVoices().then((e) => {
                                let t = !1;
                                const s = e.map((e) => e.lang.toLowerCase());
                                for (const e of i)
                                    if (s.indexOf(e) >= 0) {
                                        t = !0;
                                        break;
                                    }
                                return t;
                            });
                        }
                        const c = /(?:youtube\.com\/watch\?v=|youtu.be\/)([^#&?\s]*)/gim;
                        function l(e) {
                            let t;
                            return e.replace(d(c), (e, i) => (i && i.length && (t = i), e)), t;
                        }
                        const h = /(?:https?:\/\/)?videohub\.oracle\.com\/media\/\S+\/([\w]+)/gim;
                        function d(e) {
                            return (e.lastIndex = 0), e;
                        }
                        const p = [
                            { match: /<([a-z])/gi, replace: (e, t) => `&#x3c;${t}` },
                            { match: /<\/([a-z])/gi, replace: (e, t) => `&#x3c;&#47;${t}` },
                        ];
                        function u(e) {
                            return (
                                p.forEach((t) => {
                                    e = e.replace(d(t.match), t.replace);
                                }),
                                e
                            );
                        }
                        function g(e, t) {
                            for (let i = 0; i < e.childElementCount; i++) {
                                const s = e.children[i];
                                if ("a" === s.tagName.toLowerCase()) {
                                    const e = s;
                                    (e.rel = "noreferrer noopener"), t.onclick && (e.onclick = t.onclick.bind(e)), t.target && (e.target = t.target);
                                }
                                s.hasChildNodes() && g(s, t);
                            }
                        }
                        function m(e) {
                            for (let t = 0; t < e.childElementCount; t++) {
                                const i = e.children[t];
                                "a" === i.tagName.toLowerCase() &&
                                    (i.onclick = (e) => (window.open(i.href, "", "height=450px,width=800px,menubar,toolbar,personalbar,status,resizable,noopener,noreferrer"), e.preventDefault(), e.stopPropagation(), !1)),
                                    i.hasChildNodes() && m(i);
                            }
                        }
                        function f(e) {
                            const t = Object.getOwnPropertyNames(e);
                            for (const i of t) Object.defineProperty(e, i, { configurable: !0, writable: !1 });
                            return e;
                        }
                        function b(e) {
                            return e.replace(/^https?:\/\//i, "");
                        }
                        const v = (() => {
                            let e = !1;
                            return (t = { hasRecognition: !1, hasSynthesis: !1, isReset: !1, recognitionLocale: "", synthesisLocales: [] }) => {
                                var i;
                                t.isReset && (e = !1);
                                let s = t.synthesisLocales;
                                return (
                                    Array.isArray(s) || (s = []),
                                    t.hasRecognition && t.hasSynthesis && (null === (i = t.recognitionLocale) || void 0 === i ? void 0 : i.length) && ((!e && t.synthesisLocales.length) || ((e = !0), (s = [{ lang: t.recognitionLocale }]))),
                                    s
                                );
                            };
                        })();
                        function w(e, t) {
                            const i = e.toLowerCase();
                            for (const e in t) if (i === e.toLowerCase()) return !0;
                            return !1;
                        }
                        function x(e, t) {
                            const i = e.toLowerCase().split("-")[0];
                            for (const e in t) if (i === e.toLowerCase()) return !0;
                            return !1;
                        }
                        function C(e, t) {
                            let i = [e.toLowerCase()],
                                s = "en";
                            var n;
                            (i = i.concat((null === (n = navigator.languages) || void 0 === n ? void 0 : n.map((e) => e.toLowerCase())) || [])), i.indexOf(s) < 0 && i.push(s);
                            for (const e of i) {
                                if (w(e, t)) {
                                    s = e;
                                    break;
                                }
                                if (x(e, t)) {
                                    s = e.split("-")[0];
                                    break;
                                }
                            }
                            return s;
                        }
                        function S(e, t) {
                            let i;
                            return function () {
                                const s = this,
                                    n = arguments,
                                    o = function () {
                                        (i = null), e.apply(s, n);
                                    };
                                clearTimeout(i), (i = setTimeout(o, t));
                            };
                        }
                        function y(e, t) {
                            let i = !1;
                            return function () {
                                const s = this;
                                i ||
                                    (e.apply(s, arguments),
                                    (i = !0),
                                    setTimeout(() => {
                                        i = !1;
                                    }, t));
                            };
                        }
                        function k(e, t, i) {
                            return e.replace(new RegExp(`(${i}: )(.*?)(;|})`, "g"), `$1${t}$3`);
                        }
                        var _,
                            T = i(197);
                        function I(e) {
                            return e.filter((e) => {
                                const t = e.getActionType();
                                return t === T.a.Postback || t === T.a.Location;
                            });
                        }
                        class A {
                            constructor(e, t) {
                                (this.util = e), (this._disabled = !1), (this._type = t.type), (this._label = t.label), (this._imageUrl = t.imageUrl);
                            }
                            render() {
                                const e = this.util;
                                if (((this._htmlElement = e.createButton(["action-postback"])), (this._htmlElement.onclick = this.handleOnClick.bind(this)), this._imageUrl)) {
                                    const t = e.createImage(this._imageUrl, ["action-image"], this._label || "");
                                    this._htmlElement.appendChild(t);
                                }
                                if (this._label) {
                                    const t = e.linkify(this._label, { emHTML: !0 }),
                                        i = e.createDiv();
                                    (i.innerHTML = t), this._htmlElement.appendChild(i);
                                }
                                return this._disabled && e.addCSSClass(this._htmlElement, "disabled"), this._htmlElement;
                            }
                            handleOnClick(e) {
                                if (this.onActionClick && !this._disabled) {
                                    const e = { getPayload: this.getEventPayload.bind(this), label: this._label, type: this._type };
                                    this.onActionClick(e);
                                }
                                (this._type !== T.a.Postback && this._type !== T.a.Location && this._type !== T.a.Share) || (e.preventDefault(), e.stopPropagation());
                            }
                            disable() {
                                (this._disabled = !0), this._htmlElement && (this.util.addCSSClass(this._htmlElement, "disabled"), (this._htmlElement.disabled = !0));
                            }
                            enable() {
                                (this._disabled = !1), this._htmlElement && (this.util.removeCSSClass(this._htmlElement, "disabled"), (this._htmlElement.disabled = !1));
                            }
                            getActionType() {
                                return this._type;
                            }
                        }
                        class E extends A {
                            constructor(e, t) {
                                super(e, t), (this._phoneNumber = t.phoneNumber);
                            }
                            render() {
                                const e = this.util,
                                    t = super.render();
                                e.addCSSClass(t, "action-call");
                                const i = e.createAnchor(`tel:${this._phoneNumber}`, "");
                                return (
                                    (this.onActionClick = () => {
                                        i.click();
                                    }),
                                    t
                                );
                            }
                            getEventPayload() {
                                return Promise.resolve(this._phoneNumber);
                            }
                        }
                        class M extends A {
                            render() {
                                const e = this.util,
                                    t = super.render();
                                return e.addCSSClass(t, "action-location"), t;
                            }
                            getEventPayload() {
                                return (0, T.q)();
                            }
                        }
                        class L extends A {
                            constructor(e, t) {
                                super(e, t), (this._postback = t.postback);
                            }
                            getEventPayload() {
                                return Promise.resolve(this._postback);
                            }
                        }
                        class P extends A {
                            constructor(e, t, i) {
                                super(e, t), (this.shareText = i);
                            }
                            render() {
                                const e = this.util,
                                    t = super.render();
                                return e.addCSSClass(t, "action-share"), t;
                            }
                            getEventPayload() {
                                return Promise.resolve(this.shareText);
                            }
                        }
                        class D extends A {
                            constructor(e, t) {
                                super(e, t), (this._formSubmissionPayload = { action: t.action || "", processingMethod: t.processingMethod || "", variable: t.variable || "" });
                            }
                            getEventPayload() {
                                return Promise.resolve(this._formSubmissionPayload);
                            }
                        }
                        class O extends A {
                            constructor(e, t, i = !1, s) {
                                super(e, t), (this._openInWindow = i), (this._linkHandler = s), (this._url = t.url);
                            }
                            render() {
                                const e = this.util,
                                    t = super.render();
                                if ((e.addCSSClass(t, "action-url"), this._url)) {
                                    const i = e.createAnchor(this._url, "", [], this._openInWindow, this._linkHandler);
                                    t.onclick = () => {
                                        i.click();
                                    };
                                }
                                return t;
                            }
                            getEventPayload() {
                                return Promise.resolve(this._url);
                            }
                        }
                        class R {
                            constructor(e) {
                                this.module = e;
                            }
                            debug(...e) {
                                this._log(R.LOG_LEVEL.DEBUG, e);
                            }
                            error(...e) {
                                this._log(R.LOG_LEVEL.ERROR, e);
                            }
                            info(...e) {
                                this._log(R.LOG_LEVEL.INFO, e);
                            }
                            warn(...e) {
                                this._log(R.LOG_LEVEL.WARN, e);
                            }
                            _log(e, t) {
                                if (R.logLevel >= e) {
                                    let i;
                                    switch ((t.unshift(`[${R.appName}.${R.appVersion}.${this.module}]`), R.logLevel)) {
                                        case R.LOG_LEVEL.ERROR:
                                            i = console.error;
                                            break;
                                        case R.LOG_LEVEL.WARN:
                                            i = console.warn;
                                            break;
                                        case R.LOG_LEVEL.INFO:
                                            i = console.info;
                                            break;
                                        case R.LOG_LEVEL.DEBUG:
                                            i = console.debug;
                                    }
                                    R.historyEnabled && (R.history.push(Object.assign(Object.assign({}, t), { level: e })), R._historySize <= R.history.length && R.history.shift()), i.apply(console, t);
                                }
                            }
                        }
                        (R.LOG_LEVEL = { DEBUG: 4, ERROR: 1, INFO: 3, NONE: 0, WARN: 2 }), (R.logLevel = R.LOG_LEVEL.ERROR), (R.history = []), (R.historyEnabled = !1), (R._historySize = 100);
                        class B {
                            static fromActionPayload(e, t, i, s, n, o) {
                                switch (e.type) {
                                    case T.a.Postback:
                                        return new L(t, e);
                                    case T.a.Url:
                                        return new O(t, e, i, n);
                                    case T.a.Webview:
                                        return new O(t, e, i, o.webviewLinkHandler);
                                    case T.a.Location:
                                        return new M(t, e);
                                    case T.a.Call:
                                        return new E(t, e);
                                    case T.a.Share:
                                        return new P(t, e, s);
                                    case T.a.SubmitForm:
                                        return new D(t, e);
                                    default:
                                        return B.logger.error(`Payload contains wrong action type:${e.type}`), null;
                                }
                            }
                        }
                        (B.logger = new R("ActionComponentFactory")),
                            (function (e) {
                                (e.LEFT = "left"), (e.RIGHT = "right");
                            })(_ || (_ = {}));
                        class V {
                            constructor(e, t, i, s, n, o) {
                                (this.settings = e),
                                    (this.util = t),
                                    (this.side = s),
                                    (this.source = n),
                                    (this.actions = []),
                                    (this.globalActions = []),
                                    (this._postActions = []),
                                    (this.locale = e.locale),
                                    (this.translations = e.i18n[this.locale]),
                                    o && o.locale && ((this.locale = o.locale), (this.translations = Object.assign(Object.assign({}, this.translations), this.settings.i18n[o.locale])));
                                let a = "";
                                switch (i.type) {
                                    case T.i.Card:
                                        i.cards.forEach((e) => {
                                            var t;
                                            a += (e.title ? `${e.title} - ` : "") + (e.description ? `${e.description} - ` : "") + (null !== (t = e.url) && void 0 !== t ? t : "") + "\n";
                                        });
                                        break;
                                    case T.i.Text:
                                        a = i.text;
                                        break;
                                    case T.i.Attachment:
                                        a = i.attachment.url;
                                        break;
                                    case T.i.Location:
                                        const e = i.location;
                                        a = `${e.title ? `${e.title} - ` : ""}${e.latitude}, ${e.longitude}`;
                                }
                                if ((i.actions && (this.actions = N(i.actions, t, e.openLinksInNewWindow, a, e.linkHandler, o, this.handleOnActionClick.bind(this))), (this._isActionsExternal = e.displayActionsAsPills), i.globalActions)) {
                                    const s = N(i.globalActions, t, e.openLinksInNewWindow, a, e.linkHandler, o, this.handleOnActionClick.bind(this));
                                    this.globalActions = this.globalActions.concat(s);
                                }
                                (this.headerText = i.headerText), (this.footerText = i.footerText), (this.type = i.type), (this._postActions = I(this.actions).concat(I(this.globalActions)));
                            }
                            handleOnActionClick(e) {
                                if (this.onActionClick) {
                                    const t = e;
                                    (t.messageComponent = this), this.onActionClick(t);
                                }
                            }
                            hasActions() {
                                return this.actions.length > 0 || this.globalActions.length > 0;
                            }
                            focusFirstAction() {
                                var e;
                                null === (e = this.firstActionButton) || void 0 === e || e.focus();
                            }
                            disableActions() {
                                this.actions.forEach((e) => {
                                    e.disable();
                                }),
                                    this.globalActions.forEach((e) => {
                                        e.disable();
                                    });
                            }
                            disablePostbacks() {
                                this._postActions.forEach((e) => {
                                    e.disable();
                                });
                            }
                            enableActions() {
                                this.actions.forEach((e) => {
                                    e.enable();
                                }),
                                    this.globalActions.forEach((e) => {
                                        e.enable();
                                    });
                            }
                            enablePostbacks() {
                                this._postActions.forEach((e) => {
                                    e.enable();
                                });
                            }
                            render(e) {
                                const t = this,
                                    i = t.util,
                                    s = t.actions,
                                    n = t.globalActions,
                                    o = i.createDiv(["message"]);
                                o.lang = t.locale;
                                const a = i.createDiv(["message-wrapper"]);
                                o.appendChild(a);
                                const r = t.getContent(e);
                                if ((this.type !== T.i.EditForm && t.headerText && a.appendChild(t.getHeader()), a.appendChild(r), s && s.length)) {
                                    const e = t.getActions();
                                    (t._isActionsExternal ? a : r).appendChild(e), t.firstActionButton || (t.firstActionButton = e.firstElementChild);
                                }
                                if ((t.footerText && a.appendChild(t.getFooter()), n && n.length)) {
                                    const e = t.getGlobalActions();
                                    o.appendChild(e), t.firstActionButton || (t.firstActionButton = e.firstElementChild);
                                }
                                return o;
                            }
                            getHeader() {
                                return z(this.headerText, "message-header", this.util);
                            }
                            getContent(e) {
                                const t = this.util.createDiv(["message-bubble"]);
                                return (t.style.padding = this.settings.messagePadding || t.style.padding), e && t.appendChild(e), t;
                            }
                            getActions() {
                                const e = this._isActionsExternal ? ["message-global-actions"] : ["message-actions"];
                                return "horizontal" !== this.settings.actionsLayout && e.push("col"), F(this.actions, e, this.util);
                            }
                            getFooter() {
                                return z(this.footerText, "message-footer", this.util);
                            }
                            getGlobalActions() {
                                const e = ["message-global-actions"];
                                return this.settings.icons.avatarBot && e.push("has-message-icon"), "horizontal" !== this.settings.globalActionsLayout && e.push("col"), F(this.globalActions, e, this.util);
                            }
                        }
                        function N(e, t, i, s, n, o, a) {
                            const r = [];
                            return (
                                e.forEach((e) => {
                                    const c = B.fromActionPayload(e, t, i, s, n, o);
                                    c && ((c.onActionClick = a), r.push(c));
                                }),
                                r
                            );
                        }
                        function z(e, t, i) {
                            const s = i.createDiv(["message-bubble", t]),
                                n = i.createDiv();
                            return (n.innerHTML = i.linkify(e, { emHTML: !0, emVideo: !0 })), s.appendChild(n), s;
                        }
                        function F(e, t, i) {
                            const s = i.createDiv(t);
                            return (
                                e.forEach((e) => {
                                    s.appendChild(e.render());
                                }),
                                s
                            );
                        }
                        class $ {}
                        ($.GEOLOCATION_REQUEST_DENIED = 1),
                            ($.CHAT_SCROLL_DELAY = 300),
                            ($.WEBSOCKET_READY_STATE = ["CONNECTING", "OPEN", "CLOSING", "CLOSED"]),
                            ($.WEBSOCKET_CLOSE_EVENT = { CODE: { ABNORMAL_CLOSURE: 1006 } }),
                            ($.ATTACHMENT_HEADER = { AUTHORIZATION: "Authorization", FILE_AUTH_TYPE: "x-oda-meta-file-authType", FILE_IS_PROTECTED: "x-oda-meta-file-isProtected", FILE_SIZE: "x-oda-meta-file-size" }),
                            ($.MAX_SUGGESTIONS_COUNT = 5),
                            ($.MIN_SUGGESTIONS_COUNT = 1),
                            ($.SUGGESTIONS_COUNT_THRESHOLD = 30),
                            ($.TIME = { MIN_FIFTY: 3e6 });
                        const U = "22.12",
                            H = 1024,
                            j = 26214400,
                            W = 1e3,
                            G = Ce('<path d="M11.007 15.117A1 1 0 0 0 13 15V7l-.005-.176A3 3 0 0 0 7 7v8l.005.217A5 5 0 0 0 17 15V5h2v10a7 7 0 1 1-14 0V7a5 5 0 0 1 10 0v8l-.005.176A3 3 0 0 1 9 15V9h2v6z"/>'),
                            q = Ce(
                                '<path d="M4 2h10.414L20 7.586V10h-2V9h-5V4H6v16h12v-1h2v3H4zm11 3.414L16.586 7H15z"/><path d="m7.764 17 1.849-4.87h1.012L12.486 17H11.32l-.32-.998H9.204L8.882 17zm1.722-1.883h1.226l-.617-1.916zm3.278-.415v-2.573h1.045v2.553c0 .531.079.916.235 1.152.156.233.404.349.744.349.344 0 .591-.116.743-.349.157-.236.235-.62.235-1.152v-2.553h1.045v2.573c0 .822-.165 1.427-.496 1.816-.326.384-.835.576-1.527.576s-1.204-.192-1.535-.576c-.326-.389-.489-.994-.489-1.816zM17.686 17v-4.87h1.635c.795 0 1.396.205 1.802.616.407.41.61 1.018.61 1.822 0 .795-.203 1.4-.61 1.816-.402.41-1.002.616-1.802.616zm1.622-4.02h-.577v3.17h.577c.45 0 .786-.128 1.005-.383.223-.259.335-.659.335-1.2s-.11-.94-.329-1.198c-.218-.26-.556-.389-1.011-.389z"/>'
                            ),
                            K = Ce('<path d="M6.35 8L5 9.739 12 16l7-6.261L17.65 8 12 13.054z"/>'),
                            Y = Ce('<path d="M8 17.65L9.739 19 16 12 9.739 5 8 6.35 13.054 12z"/>'),
                            J = Ce('<path d="M16 17.65L14.261 19 8 12l6.261-7L16 6.35 10.946 12z"/>'),
                            Z = Ce(
                                '<path d="M6 11h8v2H6zm0-4h12v2H6z"/><path d="M2 2v20h3.5l3-4H14v-2H7.5l-3 4H4V4h16v6h2V2z"/><path d="M20.3 12.3L19 13.6l-1.3-1.3-1.4 1.4 1.3 1.3-1.3 1.3 1.4 1.4 1.3-1.3 1.3 1.3 1.4-1.4-1.3-1.3 1.3-1.3z"/>'
                            ),
                            X = Ce('<path d="M17.524 5 19 6.476 13.475 12 19 17.524 17.524 19 12 13.475 6.476 19 5 17.524 10.525 12 5 6.476 6.476 5 12 10.525z"/>'),
                            Q = Ce('<path d="M11 13v9H9v-5.586l-6.293 6.293-1.414-1.414L7.586 15H2v-2zM21.293 1.293l1.414 1.414L16.414 9H22v2h-9V2h2v5.586z"/>'),
                            ee = Ce('<path d="M4 15v5h16v-5h2v7H2v-7zm9-13v10.587l3.293-3.294 1.414 1.414L12 16.414l-5.707-5.707 1.414-1.414L11 12.585V2z"/>'),
                            te = Ce('<path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zM8.707 7.293l8 8-1.414 1.414-8-8z"/></svg>'),
                            ie = Ce('<path class="st0" d="M20 20H4V4h7V2H2v20h20v-9h-2z"/><path xmlns="http://www.w3.org/2000/svg" class="st0" d="M14 2v2h4.6L8.3 14.3l1.4 1.4L20 5.4V10h2V2z"/>'),
                            se = Ce('<path d="M14.414 2 21 8.584V22H3V2.009zM13 3.999l-8 .007v15.995h14V9.996l-6 .001zm4.585 3.998L15 5.413v2.585z"/>'),
                            ne = Ce('<path d="M4 2h10.414L20 7.586V22H4zm2 2v16h12V9h-5V4zm9 1.414L16.586 7H15z"/><path d="M16 12a1 1 0 11-2 0 1 1 0 012 0zm-6.143 1L7 19h10l-2.857-4.5L12 16.75z"/>'),
                            oe = Ce('<path d="M22 5v14H2V5zm-2 2H4v10h16zM7 13v2H5v-2zm12 0v2h-2v-2zm-4 0v2H9v-2zM7 9v2H5V9zm12 0v2h-2V9zm-4 0v2h-2V9zm-4 0v2H9V9z" />'),
                            ae = Ce(
                                '<path d="M13 14c-1.5 0-2.9-.4-4-1.1 1.1-2.4 1.7-5 1.9-6.9h9V4H7V2H5v2H2v2h6.9c-.2 1.7-.7 3.7-1.5 5.6C6.5 10.5 6 9.2 6 8H4c0 1.9.9 4 2.5 5.5C5.3 15.5 3.8 17 2 17v2c2.6 0 4.6-1.9 6.1-4.3 1.4.8 3 1.3 4.9 1.3zm7.6 4.6L17 10.5l-3.6 8.1-1.3 3 1.8.8L15 20h4l1.1 2.4 1.8-.8zm-4.7-.6l1.1-2.5 1.1 2.5z"/>'
                            ),
                            re =
                                '<svg width="36" height="36" viewBox="0 0 36 36"><path fill-rule="evenodd" clip-rule="evenodd" d="M7.875 8.625a2.25 2.25 0 00-2.25 2.25v16c0 .621.504 1.125 1.125 1.125h.284c.298 0 .585-.119.796-.33l2.761-2.76a2.25 2.25 0 011.59-.66h15.944a2.25 2.25 0 002.25-2.25V10.875a2.25 2.25 0 00-2.25-2.25H7.875zM24.75 18a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5zm-4.5-2.25a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-9 2.25a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5z" fill="#fff"/></svg>',
                            ce = Ce(
                                '<path d="M4.014 3C2.911 3 2 3.888 2 4.992v15c0 .6.408 1.008 1.007 1.008h.6a.887.887 0 0 0 .695-.288l3.094-3.12c.407-.384.91-.6 1.415-.6h11.175C21.089 16.992 22 16.104 22 15V4.992C22 3.888 21.089 3 19.986 3zm3.981 7.008A1.986 1.986 0 0 1 6.005 12c-1.103 0-1.99-.888-1.99-1.992s.887-2.016 1.99-2.016 1.99.912 1.99 2.016zm5.995 0C13.99 11.112 13.103 12 12 12s-1.99-.888-1.99-1.992.887-2.016 1.99-2.016 1.99.912 1.99 2.016zm5.996 0c0 1.104-.888 1.992-1.99 1.992s-1.991-.888-1.991-1.992.887-2.016 1.99-2.016 1.99.912 1.99 2.016z" fill="#fff"/>'
                            ),
                            le = Ce(
                                '<path d="M7 22v-2h4v-2.062C7.06 17.444 4 14.073 4 10h2c0 3.309 2.691 6 6 6s6-2.691 6-6h2c0 4.072-3.059 7.444-7 7.938V20h4v2h-6zm5-20c2.206 0 4 1.794 4 4v4c0 2.206-1.794 4-4 4s-4-1.794-4-4V6c0-2.206 1.794-4 4-4zm0 2c-1.103 0-2 .897-2 2v4c0 1.103.897 2 2 2s2-.897 2-2V6c0-1.103-.897-2-2-2z"/>'
                            ),
                            he = Ce('<path d="M19.33 23.02l-7.332-3.666-7.332 3.666 1.418-7.995L1 9.555l7.331-1.222L11.998 1l3.666 7.333 7.332 1.222-5.084 5.47z"/>'),
                            de = Ce('<path d="M13 22V5.414l5.293 5.293 1.414-1.414L12 1.585 4.293 9.293l1.414 1.414L11 5.414V22h2z" fill="#161513"/>'),
                            pe = Ce('<path d="M22 2v20H2V2zm-2 2H4v16h16zm-3 1.674V14a2 2 0 11-2.15-1.995L15 12V8.326l-5 1.428V16a2 2 0 11-2.15-1.995L8 14V8.246z"/>'),
                            ue = Ce('<path d="M13.414 2L17 5.586V7h.414L21 10.586V22H7v-4H3V2zM17 9.414V18H9v2h10v-8.586zm-2-3L12.586 4H5v12h10zM13 11v2H7v-2zm-2-4v2H7V7z"/>'),
                            ge = Ce(
                                '<path d="M12 2c3.874 0 6.994 3.28 6.99 7.214l.011.285c.008.927-.202 2.23-.787 3.837-.96 2.639-2.73 5.452-5.49 8.353L12 22.45l-.724-.761c-2.76-2.901-4.53-5.714-5.49-8.353-.627-1.722-.823-3.095-.782-4.03l.006-.252C5.134 5.147 8.205 2 12 2zm0 2C9.254 4 7.006 6.362 7.002 9.386L7 9.529c-.004.694.168 1.753.667 3.123.741 2.036 2.038 4.221 4.014 6.507l.32.365.32-.365c1.867-2.159 3.127-4.228 3.886-6.166l.128-.34c.535-1.469.694-2.58.664-3.259l-.008-.32C16.879 6.244 14.676 4 12 4zm0 2a3 3 0 1 1-.001 6A3 3 0 0 1 12 6zm0 2a1 1 0 1 0 .001 2A1 1 0 0 0 12 8z"/>'
                            ),
                            me = Ce('<path d="M22 2v16h-4v4H2V6h4V2zm-9.036 12.378L6.93 20H16v-2.585zM16 8H4v11.999l9.036-8.377L16 14.585zm4-4H8v2h10v10h2zM7 9a2 2 0 110 4 2 2 0 010-4z"/>'),
                            fe = Ce(
                                '<path d="M1.707.293l22 22-1.414 1.414L12 13.414V21l-6.35-5.114H1V7.954h4.65l.5-.39L.293 1.707zM19.67 4.446c2.119 1.967 3.302 4.613 3.33 7.452a10.363 10.363 0 01-1.392 5.295l-1.476-1.476c.58-1.18.88-2.472.868-3.8-.023-2.29-.981-4.43-2.697-6.025zM7.583 8.996l-1.232.955H3v3.964h3.351L10 16.875v-5.461zm8.051-1.68C17.15 8.547 17.991 10.21 18 11.999c.003.482-.055.956-.17 1.416l-1.86-1.86c-.133-1.017-.691-1.964-1.604-2.706zM12 3v4.586L9.424 5.01z"/>'
                            ),
                            be = Ce(
                                '<path d="M13 3v18l-6.35-5.114H2V7.954h4.65zm5.67 1.446c2.119 1.967 3.302 4.613 3.33 7.452.029 2.904-1.15 5.658-3.316 7.75l-1.396-1.421c1.772-1.71 2.735-3.95 2.712-6.31-.023-2.29-.981-4.43-2.697-6.025zM11 7.125L7.351 9.95H4v3.964h3.351L11 16.875zm4.634.19C17.15 8.548 17.991 10.212 18 12c.01 1.806-.828 3.5-2.358 4.771l-1.284-1.519c1.065-.885 1.65-2.037 1.642-3.242-.006-1.187-.587-2.309-1.634-3.16z"/>'
                            ),
                            ve = Ce(
                                '<path d="M4 2h10.414L20 7.586V10h-2V9h-5V4H6v16h12v-1h2v3H4zm11 3.414L16.586 7H15z"/><path d="m12.36 17-1.796-4.87h1.18l1.138 3.584 1.153-3.585h1.132L13.37 17zm3.33 0v-4.87h1.046V17zm1.996 0v-4.87h1.635c.795 0 1.396.205 1.802.616.407.41.61 1.018.61 1.822 0 .795-.203 1.4-.61 1.816-.402.41-1.002.616-1.802.616zm1.622-4.02h-.577v3.17h.577c.45 0 .786-.128 1.005-.383.223-.259.335-.659.335-1.2s-.11-.94-.329-1.198c-.218-.26-.556-.389-1.011-.389z"/>'
                            ),
                            we = Ce('<path d="M11 11h2v4h-2zm0 6h2v2h-2z"/><path d="M12 1.8L1.9 22h20.2L12 1.8zm0 4.4L18.9 20H5.1L12 6.2z"/>'),
                            xe = Ce('<path d="M11 2a9 9 0 017.032 14.617l3.675 3.676-1.414 1.414-3.676-3.675A9 9 0 1111 2zm0 2a7 7 0 100 14 7 7 0 000-14zm1 3v3h3v2h-3v3h-2v-3H7v-2h3V7z"/>');
                        function Ce(e) {
                            return `<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 24 24">${e}</svg>`;
                        }
                        var Se = i(24);
                        const ye = "aria-expanded",
                            ke = "aria-activedescendant",
                            _e = "expand",
                            Te = /http/gi,
                            Ie = "ODA_MASK_3-2-0",
                            Ae = new RegExp(Ie, "gi"),
                            Ee = /www/gi,
                            Me = "ODA_MASK_2-6-1",
                            Le = new RegExp(Me, "gi"),
                            Pe = /(\b(https?|ftp):\/\/[-A-Z0-9+&@#/%?=~_|!:,.;]*[-A-Z0-9+&@#/%=~_|])/gim,
                            De = /([-+&@#/%?=~_|!:,.;])?(\bwww\.[-A-Z0-9+&@#/%?=~_|!:,.;]*[-A-Z0-9+&@#/%=~_|])/gim;
                        class Oe {
                            constructor(e) {
                                (this.openPopupList = []), (this.cssPrefix = e.name), (this.locale = e.i18n[e.locale]);
                            }
                            addCSSClass(e, ...t) {
                                e.classList
                                    ? t.forEach((t) => e.classList.add(`${this.cssPrefix}-${t}`))
                                    : e.setAttribute(
                                          "class",
                                          t.reduce((e, t) => `${e} ${this.cssPrefix}-${t}`, "")
                                      );
                            }
                            createAnchor(e, t, i = [], s = !1, n) {
                                const o = this.createElement("a", i);
                                o.rel = "noreferrer noopener";
                                let a = !1;
                                return (
                                    (o.href = e),
                                    (o.innerText = t),
                                    n && (n.onclick && ((o.onclick = n.onclick.bind(o)), (a = !0)), n.target && ((o.target = n.target), (a = !0))),
                                    a ||
                                        (s
                                            ? o.addEventListener("click", (t) => (window.open(e, "", "height=450px,width=800px,menubar,toolbar,personalbar,status,resizable,noopener,noreferrer"), t.preventDefault(), t.stopPropagation(), !1))
                                            : (o.target = "_blank")),
                                    o
                                );
                            }
                            createButton(e = []) {
                                const t = "button",
                                    i = this.createElement(t, [...e, "flex"]);
                                return (i.type = t), i;
                            }
                            createDiv(e = []) {
                                return this.createElement("div", e);
                            }
                            createElement(e, t = []) {
                                const i = document.createElement(e);
                                return this.addClasses(i, t), i;
                            }
                            createElementFromString(e, t = []) {
                                const i = this.createDiv();
                                i.innerHTML = e.trim();
                                const s = i.firstElementChild;
                                return t && this.addClasses(i.firstElementChild, t), s;
                            }
                            createIconButton({ css: e, icon: t, title: i, iconCss: s }) {
                                const n = this.createButton(["icon", ...e]);
                                (n.innerHTML = ""), (n.title = i);
                                const o = this.createImageIcon({ icon: t, iconCss: s, title: i });
                                return n.appendChild(o), n;
                            }
                            createImage(e, t = [], i = "") {
                                const s = this.createElement("img", t);
                                return e && (s.src = e), (s.alt = i), s.setAttribute("draggable", "false"), s;
                            }
                            createImageIcon({ icon: e, title: t, iconCss: i }) {
                                if (
                                    ((e) => {
                                        const t = e.match(/<svg\s/gi);
                                        return t && t.length > 0;
                                    })(e)
                                ) {
                                    const s = this.createElementFromString(e, i);
                                    return s.setAttribute("role", "img"), t && s.setAttribute("aria-label", t), s;
                                }
                                return this.createImage(e, i, t);
                            }
                            createInputElement(e, t = []) {
                                const i = this.createElement("input", t);
                                return this.setAttributes(i, e), i;
                            }
                            setAttributes(e, t) {
                                const i = ["valueOn", "valueOff"];
                                Object.keys(t).forEach((s) => {
                                    const n = t[s];
                                    n && ("errorMsg" === s ? e.setAttribute("data-error", n) : i.includes(s) ? e.setAttribute(s, n) : (e[s] = n));
                                });
                            }
                            createListItem(e, t, i, s, n, o, a = !1) {
                                const r = this.createElement("li", [n, a && "with-sub-menu"]);
                                if (((r.id = e), (r.tabIndex = -1), r.setAttribute("dir", "auto"), r.setAttribute("role", "menuitem"), i && r.setAttribute("data-value", i), s)) {
                                    const e = this.createImageIcon({ icon: s, iconCss: ["icon", `${n}-icon`] });
                                    r.appendChild(e);
                                }
                                const c = this.createElement("span", ["text", `${n}-text`, "ellipsis"]);
                                return (c.innerText = t), (r.title = t), r.appendChild(c), o && Be(r, "click", o), r;
                            }
                            createMedia(e, t, i = []) {
                                const s = this.createElement(e, i);
                                return t && (s.src = t), (s.autoplay = !1), s;
                            }
                            getBanner(e, t) {
                                const i = this.createDiv(["dialog-wrapper"]),
                                    s = "prompt-banner",
                                    n = this.createDiv([`${s}-background`]),
                                    o = this.createDiv([`${s}-main-content`, "flex"]),
                                    a = this.createDiv([`${s}-content`]),
                                    r = this.createDiv([s]);
                                if (e.icon) {
                                    const t = this.createImageIcon({ icon: e.icon, title: "" }),
                                        i = this.createDiv([`${s}-icon`]);
                                    Re(i, t), Re(o, i);
                                }
                                const c = this.createDiv([`${s}-text`]);
                                if (((c.innerText = e.text), c.setAttribute("role", "alert"), Re(a, c), e.description)) {
                                    const t = this.createDiv([`${s}-description`]);
                                    (t.innerText = e.description), Re(a, t);
                                }
                                Re(o, a), Re(r, o);
                                const l = e.closeIcon || X,
                                    h = `${s}-close-button`,
                                    d = this.createIconButton({ css: [h, "flex"], icon: l, title: e.closeText, iconCss: [`${h}-icon`] }),
                                    p = `${s}-out`;
                                Be(d, "click", () => {
                                    this.addCSSClass(r, p),
                                        setTimeout(() => {
                                            this.removeCSSClass(r, p), i.remove();
                                        }, 200);
                                }),
                                    e.autoClose &&
                                        setTimeout(() => {
                                            d && d.click();
                                        }, 6e3);
                                const u = e.actions;
                                if (u && u.length) {
                                    const e = this.createDiv(["action-wrapper", "flex"]);
                                    u.forEach((i) => {
                                        const s = ["popup-action"];
                                        "filled" === i.type && s.push("filled");
                                        const n = this.createButton(s);
                                        (n.innerHTML = i.label), (n.onclick = i.handler.bind(t)), e.appendChild(n);
                                    }),
                                        r.appendChild(e);
                                }
                                return Re(r, d), Re(i, n), Re(i, r), i;
                            }
                            getMenu(e) {
                                const t = this.createElement("ul", ["popup", ...e.menuClassList]);
                                (t.id = e.menuId), (t.tabIndex = -1), t.setAttribute("role", "menu"), t.setAttribute("aria-labelledby", e.buttonId);
                                const i = e.menuItems;
                                if ((i.forEach((e) => t.appendChild(e)), e.defaultValue)) {
                                    const i = t.querySelector(`[data-value="${e.defaultValue}"]`);
                                    this.addCSSClass(i, "active");
                                }
                                return (
                                    Be(t, "click", () => this.popupClose(t, e.menuButton)),
                                    Be(t, "keydown", (s) => {
                                        let n = !1;
                                        if (!(s.ctrlKey || s.altKey || s.metaKey)) {
                                            if (s.shiftKey && s.code === Se.KeyCode.Tab) this.popupClose(e.menuButton, t);
                                            else
                                                switch (s.code) {
                                                    case Se.KeyCode.Return:
                                                    case Se.KeyCode.Space:
                                                        s.target.click(), (n = !0);
                                                        break;
                                                    case Se.KeyCode.Esc:
                                                    case Se.KeyCode.Tab:
                                                        this.popupClose(e.menuButton, t), s.code === Se.KeyCode.Esc && (e.menuButton.focus(), (n = !0));
                                                        break;
                                                    case Se.KeyCode.Up:
                                                        this.popupFocusPreviousItem(t), (n = !0);
                                                        break;
                                                    case Se.KeyCode.Down:
                                                        this.popupFocusNextItem(t), (n = !0);
                                                        break;
                                                    case Se.KeyCode.Home:
                                                    case Se.KeyCode.PageUp:
                                                        this.popupFocusFirstItem(t, i), (n = !0);
                                                        break;
                                                    case Se.KeyCode.End:
                                                    case Se.KeyCode.PageDown:
                                                        this.popupFocusLastItem(t, i), (n = !0);
                                                }
                                            n && (s.stopPropagation(), s.preventDefault());
                                        }
                                    }),
                                    t
                                );
                            }
                            getMenuButton(e) {
                                const t = e.button,
                                    i = e.menu,
                                    s = i.querySelectorAll("li"),
                                    n = t.classList.contains(`${this.cssPrefix}-with-sub-menu`);
                                return (
                                    t.setAttribute("role", "button"),
                                    t.setAttribute("aria-haspopup", "true"),
                                    t.setAttribute(ye, "false"),
                                    t.setAttribute("aria-controls", e.menuId),
                                    Be(t, "click", () => {
                                        const i = document.getElementById(e.menuId);
                                        "true" === t.getAttribute(ye) ? this.popupClose(t, i) : this.popupOpen(t, i, n);
                                    }),
                                    Be(t, "keydown", (e) => {
                                        let o = !1;
                                        switch (e.code) {
                                            case Se.KeyCode.Return:
                                            case Se.KeyCode.Down:
                                            case Se.KeyCode.Space:
                                                this.popupOpen(t, i, n), this.popupFocusFirstItem(i, s), (o = !0);
                                                break;
                                            case Se.KeyCode.Up:
                                                this.popupOpen(t, i, n), this.popupFocusLastItem(i, s), (o = !0);
                                        }
                                        o && (e.stopPropagation(), e.preventDefault());
                                    }),
                                    t
                                );
                            }
                            wrapMessageBlock(e, t, i = _.LEFT) {
                                const s = "message",
                                    n = this.createDiv([`${s}-block`, "flex", i]),
                                    o = this.createDiv([`${s}s-wrapper`]),
                                    a = this.createDiv([`${s}-list`, "flex", "col"]);
                                if (t) {
                                    const e = this.createImageIcon({ icon: t, iconCss: ["message-icon"], title: i === _.LEFT ? this.locale.avatarBot : this.locale.avatarUser }),
                                        s = this.createDiv(["icon-wrapper"]);
                                    s.appendChild(e), n.appendChild(s);
                                }
                                return a.appendChild(e), o.appendChild(a), n.appendChild(o), n;
                            }
                            getMessageBlock(e, t, i, s = !1) {
                                const n = "message",
                                    o = this.createDiv([n]),
                                    a = this.createDiv([`${n}-wrapper`]),
                                    r = this.createDiv([`${n}-bubble`, s && "error"]);
                                return r.appendChild(t), a.appendChild(r), o.appendChild(a), this.wrapMessageBlock(o, i, e);
                            }
                            linkify(e, t) {
                                t = t || {};
                                const i = this.maskElements(e),
                                    s = t.emHTML ? i : u(i),
                                    n = s && s.replace(d(Pe), (e, i) => this.parseVideoOrLink(i, t.emVideo)),
                                    o = n && n.replace(d(De), (e, i, s) => (i ? e : this.parseVideoOrLink(s, t.emVideo)));
                                return this.unmaskElements(o);
                            }
                            removeCSSClass(e, ...t) {
                                var i, s;
                                if (e.classList) t.forEach((t) => e.classList.remove(`${this.cssPrefix}-${t}`));
                                else {
                                    const t = "class",
                                        n = null !== (s = null === (i = e.getAttribute(t)) || void 0 === i ? void 0 : i.split(" ")) && void 0 !== s ? s : [];
                                    if (n.length) {
                                        const i = n.filter((e) => n.indexOf(`${this.cssPrefix}-${e}`) < 0).join(" ");
                                        e.setAttribute(t, i);
                                    }
                                }
                            }
                            setLocale(e) {
                                this.locale = e;
                            }
                            addClasses(e, t = []) {
                                return e.setAttribute("dir", "auto"), t && this.addCSSClass(e, ...t), e;
                            }
                            embedYouTube(e) {
                                return `<div class="${this.cssPrefix}-youtube-wrapper"><iframe width="100%" src="https://www.youtube.com/embed/${e}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>`;
                            }
                            getEmbedOVH(e) {
                                return `<div class="${this.cssPrefix}-ovh-wrapper"><iframe src="https://cdnapisec.kaltura.com/p/2171811/sp/217181100/embedIframeJs/uiconf_id/35965902/partner_id/2171811?iframeembed=true&playerId=kaltura_player&entry_id=${e}&flashvars[streamerType]=auto&amp;flashvars[localizationCode]=en&amp;flashvars[leadWithHTML5]=true&amp;flashvars[sideBarContainer.plugin]=true&amp;flashvars[sideBarContainer.position]=left&amp;flashvars[sideBarContainer.clickToClose]=true&amp;flashvars[chapters.plugin]=true&amp;flashvars[chapters.layout]=vertical&amp;flashvars[chapters.thumbnailRotator]=false&amp;flashvars[streamSelector.plugin]=true&amp;flashvars[EmbedPlayer.SpinnerTarget]=videoHolder&amp;flashvars[dualScreen.plugin]=true&amp;flashvars[hotspots.plugin]=1&amp;flashvars[Kaltura.addCrossoriginToIframe]=true&amp;&wid=1_yz4xoltb" width="100%" height="auto" allowfullscreen webkitallowfullscreen mozAllowFullScreen allow="autoplay *; fullscreen *; encrypted-media *" sandbox="allow-forms allow-same-origin allow-scripts allow-top-navigation allow-pointer-lock allow-popups allow-modals allow-orientation-lock allow-popups-to-escape-sandbox allow-presentation allow-top-navigation-by-user-activation" frameborder="0"></iframe></div>`;
                            }
                            maskElements(e) {
                                const t = this.createDiv();
                                t.innerHTML = e;
                                const i = t.children;
                                for (let e = 0; e < i.length; e++) i[e].outerHTML = i[e].outerHTML.replace(d(Te), Ie).replace(d(Ee), Me);
                                return t.innerHTML;
                            }
                            unmaskElements(e) {
                                return e.replace(d(Le), "www").replace(d(Ae), "http");
                            }
                            parseVideoOrLink(e, t) {
                                const i = t ? l(e) : null;
                                if (i) return this.embedYouTube(i);
                                const s = t
                                    ? (function (e) {
                                          let t;
                                          return e.replace(d(h), (e, i) => (i && i.length && (t = i), e)), t;
                                      })(e)
                                    : null;
                                return s ? this.getEmbedOVH(s) : `<a href="${e}" target="_blank" rel="noreferrer">${e}</a>`;
                            }
                            popupClose(e, t) {
                                e.getAttribute(ye) && (this.removeCSSClass(t, _e), e.setAttribute(ye, "false"));
                            }
                            popupFocusFirstItem(e, t) {
                                this.popupFocusItem(t[0], e);
                            }
                            popupFocusLastItem(e, t) {
                                this.popupFocusItem(t[t.length - 1], e);
                            }
                            popupFocusPreviousItem(e) {
                                const t = e.getAttribute(ke),
                                    i = e.querySelector(`#${t}`);
                                this.popupFocusItem(i.previousSibling || e.lastChild, e);
                            }
                            popupFocusNextItem(e) {
                                const t = e.getAttribute(ke),
                                    i = e.querySelector(`#${t}`);
                                this.popupFocusItem(i.nextSibling || e.firstChild, e);
                            }
                            popupFocusItem(e, t) {
                                e.focus(), t.setAttribute(ke, e.id);
                            }
                            popupOpen(e, t, i = !1) {
                                if ("false" === e.getAttribute(ye)) {
                                    this.addCSSClass(t, _e), e.setAttribute(ye, "true");
                                    const s = document.querySelector(`.${this.cssPrefix}-widget`),
                                        n = s.getBoundingClientRect(),
                                        o = e.getBoundingClientRect(),
                                        a = "rtl" === window.getComputedStyle(t).direction;
                                    if (i) {
                                        const i = 48;
                                        (t.style.top = `${e.offsetTop + e.offsetHeight + 60}px`), a ? (t.style.left = `${i}px`) : (t.style.right = `${i}px`), (t.style.maxWidth = s.offsetWidth - i + "px");
                                    } else {
                                        let e = n.right - o.right;
                                        a ? ((e = o.left - n.left), (t.style.left = `${e}px`)) : (t.style.right = `${e}px`), (t.style.maxWidth = s.offsetWidth - e + "px");
                                    }
                                    setTimeout(() => {
                                        const i = document.querySelectorAll(`.${this.cssPrefix}-with-sub-menu`);
                                        document.addEventListener(
                                            "click",
                                            (s) => {
                                                let n = !1;
                                                i.forEach((e) => {
                                                    e.contains(s.target) && (n = !0);
                                                }),
                                                    n
                                                        ? this.openPopupList.push({ menu: t, menuButton: e })
                                                        : (this.openPopupList.length &&
                                                              this.openPopupList.forEach((e) => {
                                                                  this.popupClose(e.menuButton, e.menu);
                                                              }),
                                                          this.popupClose(e, t));
                                            },
                                            { once: !0 }
                                        );
                                    });
                                }
                            }
                        }
                        function Re(e, t) {
                            e.appendChild(t);
                        }
                        function Be(e, t, i, s) {
                            e.addEventListener(t, i, s);
                        }
                        class Ve {
                            remove() {
                                this.element.remove();
                            }
                            appendToElement(e) {
                                e.appendChild(this.element);
                            }
                            prependToElement(e) {
                                const t = e.firstChild;
                                t ? e.insertBefore(this.element, t) : e.appendChild(this.element);
                            }
                            appendContentChildElement(e) {
                                this._getContentElement().appendChild(e);
                            }
                            appendContentChild(e) {
                                this._getContentElement().appendChild(e.element);
                            }
                            _getContentElement() {
                                return this.element;
                            }
                        }
                        var Ne, ze, Fe, $e, Ue;
                        !(function (e) {
                            (e.SESSION = "sessionStorage"), (e.LOCAL = "localStorage");
                        })(Ne || (Ne = {})),
                            (function (e) {
                                (e.CLASSIC = "classic"), (e.DEFAULT = "default"), (e.REDWOOD_DARK = "redwood-dark");
                            })(ze || (ze = {})),
                            (function (e) {
                                (e.AUDIO = "audio"), (e.FILE = "file"), (e.LOCATION = "location"), (e.VISUAL = "visual");
                            })(Fe || (Fe = {})),
                            (function (e) {
                                (e.ARROW_DOWN = "ArrowDown"), (e.ARROW_UP = "ArrowUp"), (e.ENTER = "Enter");
                            })($e || ($e = {})),
                            (function (e) {
                                (e[(e.KEYBOARD = 0)] = "KEYBOARD"), (e[(e.VOICE = 1)] = "VOICE");
                            })(Ue || (Ue = {}));
                        const He = {
                            AUDIO: ".aac, .amr, .m4a, .mp3, .mp4a, .mpga, .oga, .ogg, .wav, audio/*",
                            FILE:
                                ".7z, .csv, .doc, .docx, .eml, .ics, .key, .log, .msg, .neon, .numbers, .odt, .pages, .pdf, .pps, .ppsx, .ppt, .pptx, .rtf, .txt, .vcf, .xls, .xlsx, .xml, .yml, .yaml, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                            IMAGE: ".gif, .jfif, .jpeg, .jpg, .png, .svg, .tif, .tiff, .webp, image/*",
                            VIDEO: ".3g2, .3gp, .avi, .m4v, .mov, .mp4, .mpeg, .mpg, .ogv, .qt, .webm, .wmv, video/*",
                            ALL: "",
                        };
                        He.ALL = `${He.AUDIO},${He.FILE},${He.IMAGE},${He.VIDEO}`;
                        const je = window.setTimeout;
                        class We extends Ve {
                            constructor(e, t, i, n, o, a, r, c, l, h) {
                                if (
                                    (super(),
                                    (this.util = e),
                                    (this.onSend = t),
                                    (this.onUpload = i),
                                    (this.settings = n),
                                    (this.onQueryChange = o),
                                    (this.onSpeechToggle = a),
                                    (this.onShareLocation = r),
                                    (this.sendUserTypingStatusMessage = c),
                                    (this.eventDispatcher = l),
                                    (this.widget = h),
                                    (this.mode = void 0),
                                    (this.fileMaxSize = j),
                                    (this._navKeys = []),
                                    (this.isDisabledVoiceButtonLang = !1),
                                    (this.isDisabledVoiceButtonNetwork = !1),
                                    (this.recognitionRequested = !1),
                                    (this.isFocusableDevice = !0),
                                    (this.isTyping = !1),
                                    (this.triggerTypingEvent = y(() => {
                                        this.eventDispatcher.trigger(s.TYPING, this.isTyping);
                                    }, 1e3)),
                                    (this.sendTypingStatus = y((e) => {
                                        this.sendUserTypingStatusMessage("RESPONDING", this.settings.enableAgentSneakPreview ? e : "...");
                                    }, this.settings.typingStatusInterval * W)),
                                    (this.cssPrefix = n.name),
                                    (this.i18n = n.i18n),
                                    (this.icons = n.icons),
                                    (this.locale = this.i18n[n.locale]),
                                    (this.isFocusableDevice = !(0, Se.isMobile)()),
                                    (this._shareBtnID = `${this.cssPrefix}-share-button`),
                                    (this.element = this._createElement()),
                                    n.enableSpeech)
                                ) {
                                    const e = this._createVoiceComponent();
                                    this.element.appendChild(e);
                                }
                                const d = this._createKeyboardComponent();
                                this.element.appendChild(d),
                                    this.setInputMode(Ue.KEYBOARD),
                                    this.disable(!0),
                                    window.addEventListener(
                                        "resize",
                                        S(() => {
                                            this._expand();
                                        }, 100)
                                    );
                            }
                            setInputMode(e) {
                                e !== this.mode && (this.settings.enableSpeech ? ((this.mode = e), this.mode === Ue.KEYBOARD ? this._showKeyboardMode() : this._showVoiceMode()) : ((this.mode = Ue.KEYBOARD), this._showKeyboardMode()));
                            }
                            setUserInputText(e) {
                                this._textArea && ((this._textArea.value = e), this._textArea.setSelectionRange(e.length, e.length), this.focusTextArea(), this.updateSendButtonDisabledState());
                            }
                            getUserInputText() {
                                return this._textArea.value;
                            }
                            setUserInputPlaceholder(e) {
                                this._textArea && Ye(this._textArea, e);
                            }
                            setVoiceRecording(e) {
                                this.settings.enableSpeech && (e && this.recognitionRequested ? this.setInputMode(Ue.VOICE) : e || this.setInputMode(Ue.KEYBOARD));
                            }
                            updateVisualizer(e, t) {
                                this.mode === Ue.VOICE && (0, Se.drawVisualizer)(e, this._visualizerCanvas, t);
                            }
                            focusTextArea() {
                                this.isFocusableDevice && this._textArea.focus(), (this._textArea.scrollTop = this._textArea.scrollHeight);
                            }
                            render(e) {}
                            disable(e = !0) {
                                const t = this.util,
                                    i = "disabled";
                                this.settings.enableAttachment && (this._shareButton.disabled = e),
                                    e
                                        ? (t.addCSSClass(this._textArea, i), this.settings.enableAutocomplete && (this._invalidateSuggestions(), this._removeSuggestionsPopup()))
                                        : (t.removeCSSClass(this._textArea, i), this.updateSendButtonDisabledState()),
                                    this.settings.enableSpeech && (this.setInputMode(Ue.KEYBOARD), this.disableVoiceModeButton(e, { src: "network" })),
                                    (this.isFooterDisabled = e);
                            }
                            isDisabled() {
                                return this.isFooterDisabled;
                            }
                            disableVoiceModeButton(e, { src: t }) {
                                if (this.settings.enableSpeech) {
                                    switch (t) {
                                        case "lang":
                                            this.isDisabledVoiceButtonLang = e;
                                            break;
                                        case "network":
                                            this.isDisabledVoiceButtonNetwork = e;
                                    }
                                    this.settings.multiLangChat && (this.isDisabledVoiceButtonLang || this.isDisabledVoiceButtonNetwork)
                                        ? (this._switchToVoiceModeButton.disabled = !0)
                                        : (this._switchToVoiceModeButton.disabled = this.isDisabledVoiceButtonNetwork);
                                }
                            }
                            displaySuggestions(e) {
                                if ((this._removeSuggestionsPopup(), 0 === e.length)) (this._suggestions = e), (this._isSuggestionsValid = !1);
                                else if (this._textArea.value) {
                                    (this._currentSuggestionFocus = e.length > $.MAX_SUGGESTIONS_COUNT ? $.MAX_SUGGESTIONS_COUNT : e.length < $.MIN_SUGGESTIONS_COUNT ? $.MIN_SUGGESTIONS_COUNT : e.length),
                                        (this._suggestions = e),
                                        (this._isSuggestionsValid = !0);
                                    const t = this.util.createDiv(this.settings.enableAttachment ? ["autocomplete-items"] : ["autocomplete-items", "no-attach"]);
                                    t.setAttribute("role", "list");
                                    const i = this._textArea.value.trim();
                                    t.id = We.SUGGESTIONS_ID;
                                    for (let s = this._currentSuggestionFocus - 1; s > -1; s--) {
                                        const n = this._createSuggestionListItem(e[s], i);
                                        t.appendChild(n);
                                    }
                                    this.element.appendChild(t);
                                }
                            }
                            getSuggestions() {
                                return this._suggestions;
                            }
                            getSuggestionsValid() {
                                return this._isSuggestionsValid;
                            }
                            setLocale(e) {
                                if (((this.locale = e), this._shareButton)) {
                                    const t = e.upload;
                                    qe(this._uploadFileInput, t),
                                        this._shareMenu.querySelectorAll("li").forEach((e) => {
                                            const t = e.dataset.value,
                                                i = this.locale[`share${t.charAt(0).toUpperCase() + t.substring(1).toLowerCase()}`] || this.locale[t] || e;
                                            e.querySelector("span").innerText = i;
                                        });
                                }
                                this.setUserInputPlaceholder(e.inputPlaceholder), this._sendButton && Ke(this._sendButton, e.send), this._switchToVoiceModeButton && Ke(this._switchToVoiceModeButton, e.speak);
                            }
                            _createElement() {
                                return this.util.createDiv(["footer"]);
                            }
                            _showKeyboardMode() {
                                var e;
                                const t = this.util;
                                t.removeCSSClass(this.element, "mode-voice"),
                                    t.addCSSClass(this.element, "mode-keyboard"),
                                    this.updateSendButtonDisabledState(),
                                    this.settings.enableAutocomplete && (null === (e = this._textArea.value) || void 0 === e ? void 0 : e.trim().length) >= 3 && this._setSuggestionsRequestTimer();
                            }
                            _showVoiceMode() {
                                const e = this.util;
                                e.removeCSSClass(this.element, "mode-keyboard"), e.addCSSClass(this.element, "mode-voice"), this.updateSendButtonDisabledState(), this._textArea && this._removeSuggestionsPopup();
                            }
                            _createKeyboardComponent() {
                                const e = this.util,
                                    t = e.createDiv(["footer-mode-keyboard", "flex"]);
                                (this._textArea = this._createInputTextArea()), t.appendChild(this._textArea);
                                const i = e.createDiv(["footer-actions", "flex"]),
                                    s = this._createSendMessageButton();
                                if (
                                    ((this._sendButton = s),
                                    i.appendChild(s),
                                    this.settings.enableSpeech && ((this._switchToVoiceModeButton = this._createVoiceSwitchButton()), i.appendChild(this._switchToVoiceModeButton)),
                                    this.settings.enableSpeech)
                                ) {
                                    const e = this._createKeyboardSwitchButton();
                                    i.appendChild(e);
                                }
                                if (this.settings.enableAttachment) {
                                    const e = this._createShareComponent();
                                    i.appendChild(e);
                                }
                                return t.appendChild(i), t;
                            }
                            _createShareComponent() {
                                const e = this.util,
                                    t = e.createDiv(),
                                    i = Ge(this.util, { css: ["button-upload", "flex"], customIcon: this.icons.shareMenu, defaultIcon: G, title: this.locale.upload });
                                i.id = this._shareBtnID;
                                const s = e.createElement("input", ["none"]);
                                (s.type = "file"), (s.tabIndex = -1), s.setAttribute("aria-hidden", "true"), qe(s, this.locale.upload), (this._uploadFileInput = s), (this._shareMenu = this._getShareMenu(i));
                                const n = e.getMenuButton({ button: i, menuId: this._shareMenu.id, menu: this._shareMenu });
                                return (
                                    Be(n, "click", (e) => {
                                        this._removeSuggestionsPopup();
                                    }),
                                    (this._shareButton = n),
                                    document.addEventListener(
                                        "deviceready",
                                        () => {
                                            const e = globalThis ? globalThis.device : window ? window.device : void 0;
                                            "Android" === (null == e ? void 0 : e.platform) && this._uploadFileInput.removeAttribute("accept");
                                        },
                                        !1
                                    ),
                                    Be(s, "click", () => (s.value = null)),
                                    Be(s, "change", (e) => {
                                        const t = e.target;
                                        t.files && t.files.length && this._onUpload(t.files[0]);
                                    }),
                                    t.appendChild(this._shareButton),
                                    t.appendChild(this._shareMenu),
                                    t.appendChild(s),
                                    t
                                );
                            }
                            _getShareMenu(e) {
                                return this.util.getMenu({ menuId: `${this.settings.name}-share-menu`, menuClassList: ["share-popup-list"], buttonId: this._shareBtnID, menuItems: this._getShareItems(), menuButton: e });
                            }
                            _getShareItems() {
                                const e = this.util,
                                    t = this.icons,
                                    i = this.locale,
                                    s = this._uploadFileInput,
                                    n = `${this.cssPrefix}-share-`;
                                let o = this.settings.shareMenuItems;
                                const a = [],
                                    r = [Fe.AUDIO, Fe.FILE, Fe.LOCATION, Fe.VISUAL],
                                    c = new Set();
                                if (
                                    (((null == o ? void 0 : o.length) && !o.every((e) => "string" == typeof e && r.indexOf(e.toLowerCase()) < 0)) || (o = r),
                                    o.forEach((e) => {
                                        "string" == typeof e && c.add(e.toLowerCase());
                                    }),
                                    c.has(Fe.VISUAL))
                                ) {
                                    const o = `${n}visual`,
                                        r = t.shareMenuVisual || me;
                                    a.push(
                                        e.createListItem(o, i.shareVisual, "visual", r, "share-popup-item", () => {
                                            (s.accept = `${He.IMAGE},${He.VIDEO}`), s.click();
                                        })
                                    );
                                }
                                if (c.has(Fe.AUDIO)) {
                                    const o = `${n}audio`,
                                        r = t.shareMenuAudio || pe;
                                    a.push(
                                        e.createListItem(o, i.shareAudio, "audio", r, "share-popup-item", () => {
                                            (s.accept = He.AUDIO), s.click();
                                        })
                                    );
                                }
                                if (c.has(Fe.FILE)) {
                                    const o = `${n}file`,
                                        r = t.shareMenuFile || ue;
                                    a.push(
                                        e.createListItem(o, i.shareFile, "file", r, "share-popup-item", () => {
                                            (s.accept = He.FILE), s.click();
                                        })
                                    );
                                }
                                if (c.has(Fe.LOCATION)) {
                                    const s = `${n}location`,
                                        o = t.shareMenuLocation || ge;
                                    a.push(e.createListItem(s, i.shareLocation, "location", o, "share-popup-item", () => this.onShareLocation()));
                                }
                                const l = t.shareMenuFile || ue;
                                return (
                                    this.settings.shareMenuItems
                                        .filter((e) => "string" != typeof e && "string" == typeof e.type)
                                        .forEach((t) => {
                                            const n = t.type.toLowerCase(),
                                                o = `share_${n.indexOf("*") >= 0 ? "all" : n.replace(/ /g, "_")}`,
                                                r = `${this.cssPrefix}-${o}`,
                                                c = i[o] || this.i18n.en[o];
                                            let h = t.label;
                                            c ? (h = c) : (this.i18n.en[o] = h);
                                            const d = t.icon || l,
                                                p = t.maxSize && t.maxSize >= 1 ? Math.min(t.maxSize * H, j) : j,
                                                u =
                                                    n.indexOf("*") >= 0
                                                        ? He.ALL
                                                        : n
                                                              .split(" ")
                                                              .filter((e) => He.ALL.indexOf(e) >= 0)
                                                              .map((e) => `.${e} `)
                                                              .join(",");
                                            a.push(
                                                e.createListItem(r, h, o, d, "share-popup-item", () => {
                                                    (this.fileMaxSize = p), (s.accept = u), s.click();
                                                })
                                            );
                                        }),
                                    a
                                );
                            }
                            _createInputTextArea() {
                                const e = ["user-input"];
                                this.settings.enableSpeech && e.push("user-input-inline-send");
                                const t = this.util.createElement("textarea", e);
                                return (
                                    (function (e, t) {
                                        Ye(e, t), Je(e, t);
                                    })(t, this.locale.inputPlaceholder),
                                    (t.rows = 1),
                                    (t.onkeydown = this.onInputKeyDown.bind(this)),
                                    (t.onkeyup = this.onInputKeyUp.bind(this)),
                                    (t.oninput = () => {
                                        const e = t.value;
                                        (this.widget.speechFinalResult = this.widget.speechFinalResult || { speechId: "", text: "" }), (this.widget.speechFinalResult.text = e), this._expand();
                                    }),
                                    Be(t, "paste", () => {
                                        this.isFooterDisabled || je(this.updateSendButtonDisabledState.bind(this));
                                    }),
                                    this._handleInputChange(t),
                                    t
                                );
                            }
                            _handleInputChange(e) {
                                const t = Object.getOwnPropertyDescriptor(HTMLTextAreaElement.prototype, "value");
                                Object.defineProperty(e, "value", {
                                    set: (i) => {
                                        t.set.call(e, i), this.updateSendButtonDisabledState(), this._expand();
                                    },
                                    get: t.get,
                                });
                            }
                            _createSendMessageButton() {
                                const e = ["button-send"];
                                this.settings.enableSpeech && e.push("button-send-inline");
                                const t = Ge(this.util, { css: e, customIcon: this.icons.send, defaultIcon: de, title: this.locale.send });
                                return (
                                    (t.onclick = () => {
                                        var e, t;
                                        this._isUserInputEmpty() ||
                                            ((this._previousInputValue = void 0),
                                            (this._textArea.value = null === (t = null === (e = this._textArea) || void 0 === e ? void 0 : e.value.trim()) || void 0 === t ? void 0 : t.replace("\n", "")),
                                            this.settings.enableAutocomplete && (this._invalidateSuggestions(), this._removeSuggestionsPopup()),
                                            this._onSend());
                                    }),
                                    t
                                );
                            }
                            _createVoiceSwitchButton() {
                                const e = Ge(this.util, { css: ["button-switch-voice"], customIcon: this.icons.mic, defaultIcon: le, title: this.locale.speak });
                                return (
                                    (e.onclick = () => {
                                        this.onSpeechToggle(!0), (this.recognitionRequested = !0);
                                    }),
                                    e
                                );
                            }
                            _createVoiceComponent() {
                                const e = this.util,
                                    t = e.createDiv(["footer-mode-voice", "flex"]),
                                    i = e.createDiv(["footer-visualizer-wrapper"]);
                                return (this._visualizerCanvas = e.createElement("canvas")), (this._visualizerCanvas.width = 244), (this._visualizerCanvas.height = 32), i.appendChild(this._visualizerCanvas), t.appendChild(i), t;
                            }
                            _createKeyboardSwitchButton() {
                                const e = Ge(this.util, { css: ["button-switch-kbd"], customIcon: this.icons.keyboard, defaultIcon: oe, title: this.locale.inputPlaceholder });
                                return (
                                    (e.onclick = () => {
                                        (this.recognitionRequested = !1), this.onSpeechToggle(!1);
                                    }),
                                    e
                                );
                            }
                            updateSendButtonDisabledState() {
                                const e = this._sendButton;
                                if (e && e.nodeType) {
                                    const t = this.util,
                                        i = "none",
                                        s = this._textArea;
                                    s && s.value && s.value.trim().length && this.mode !== Ue.VOICE ? t.removeCSSClass(this._sendButton, i) : t.addCSSClass(e, i);
                                }
                            }
                            _isUserInputEmpty() {
                                return !this._textArea || 0 === this._textArea.value.trim().length;
                            }
                            onInputKeyDown(e) {
                                var t;
                                this.isDisabled() ||
                                    e.isComposing ||
                                    229 === e.keyCode ||
                                    (e.code === Se.KeyCode.Return && !e.shiftKey && (null === (t = this._textArea.value) || void 0 === t ? void 0 : t.trim().length) > 0 && (e.preventDefault(), this._sendButton.click()));
                            }
                            onInputKeyUp(e) {
                                var t;
                                const i = null === (t = this._textArea.value) || void 0 === t ? void 0 : t.trim();
                                if (this.isDisabled()) return this._invalidateSuggestions(), void this._removeSuggestionsPopup();
                                if (
                                    (this.triggerTypingEvent(),
                                    this.settings.enableSendTypingStatus && (i ? this.sendTypingStatus(i) : this.sendUserTypingStatusMessage("LISTENING")),
                                    clearTimeout(this.listeningStatusTimer),
                                    (this.listeningStatusTimer = je(() => {
                                        this.sendUserTypingStatusMessage("LISTENING");
                                    }, this.settings.typingStatusInterval * W)),
                                    this.updateSendButtonDisabledState(),
                                    !e.isComposing && this.settings.enableAutocomplete)
                                ) {
                                    if (this._onNavigateSuggestion(e)) return;
                                    e.code === Se.KeyCode.Backspace && ((this._previousInputValue = void 0), this._invalidateSuggestions(), this._removeSuggestionsPopup(), clearTimeout(this._suggestionsRequest)),
                                        this._getNavKeys().indexOf(e.code) < 0 &&
                                            (i.length >= 3
                                                ? this._previousInputValue !== this._textArea.value && ((this._previousInputValue = this._textArea.value), clearTimeout(this._suggestionsRequest), this._setSuggestionsRequestTimer())
                                                : ((this._previousInputValue = void 0), this._removeSuggestionsPopup(), clearTimeout(this._suggestionsRequest)));
                                }
                            }
                            _expand() {
                                this._textArea.style.height = null;
                                const e = 0.6 * this.widget.chatWidgetDiv.clientHeight,
                                    t = this._textArea.scrollHeight;
                                this._textArea.style.height = `${t < e ? t : e}px`;
                            }
                            _onNavigateSuggestion(e) {
                                let t = !1;
                                const i = document.getElementById(We.SUGGESTIONS_ID);
                                if (i) {
                                    const s = i.getElementsByTagName("div");
                                    e.code === Se.KeyCode.Down
                                        ? (e.preventDefault(),
                                          this._currentSuggestionFocus < s.length - 1
                                              ? (this._currentSuggestionFocus++, this._addActive(s))
                                              : (this._removeActive(s), (this._textArea.value = this._currentInputValue ? this._currentInputValue : this._textArea.value), (this._currentSuggestionFocus = s.length)),
                                          (t = !0))
                                        : e.code === Se.KeyCode.Up &&
                                          (e.preventDefault(),
                                          this._currentSuggestionFocus === s.length && (this._currentInputValue = this._textArea.value),
                                          this._currentSuggestionFocus > 0 && this._currentSuggestionFocus--,
                                          this._addActive(s),
                                          (t = !0));
                                }
                                return t;
                            }
                            _addActive(e) {
                                e &&
                                    (this._removeActive(e),
                                    this.util.addCSSClass(e[this._currentSuggestionFocus], "autocomplete-active"),
                                    e[this._currentSuggestionFocus].scrollIntoView(),
                                    (this._textArea.value = e[this._currentSuggestionFocus].innerText));
                            }
                            _removeActive(e) {
                                for (const t of e) this.util.removeCSSClass(t, "autocomplete-active");
                            }
                            _removeSuggestionsPopup() {
                                const e = document.getElementById(We.SUGGESTIONS_ID);
                                e && e.remove();
                            }
                            _onSend() {
                                this.onSend(this._textArea.value), (this._textArea.value = ""), (this._textArea.innerText = ""), je(this._expand.bind(this));
                            }
                            _onUpload(e) {
                                const t = this.fileMaxSize;
                                (this.fileMaxSize = j), this.onUpload(e, { maxSize: t }), (this._uploadFileInput.value = "");
                            }
                            _onQueryChange() {
                                this.onQueryChange(this._textArea.value.trim()).catch(() => {});
                            }
                            _setSuggestionsRequestTimer() {
                                this._suggestionsRequest = je(() => {
                                    this._onQueryChange();
                                }, 300);
                            }
                            _invalidateSuggestions() {
                                (this._suggestions = null), (this._isSuggestionsValid = !1);
                            }
                            _getNavKeys() {
                                if (!this._navKeys.length) for (const e of Object.keys($e)) this._navKeys.push($e[e]);
                                return this._navKeys;
                            }
                            _createSuggestionListItem(e, t) {
                                const i = this.util,
                                    s = i.createDiv();
                                s.setAttribute("role", "listitem"),
                                    (s.onclick = () => {
                                        (this._textArea.value = s.innerText), this._removeSuggestionsPopup(), this._sendButton.click();
                                    });
                                const n = new RegExp(t, "i"),
                                    o = e.match(n);
                                if (o) {
                                    if (0 !== o.index) {
                                        const t = i.createElement("span");
                                        (t.textContent = e.substr(0, o.index)), s.appendChild(t);
                                    }
                                    const n = i.createElement("strong");
                                    if (((n.textContent = e.substr(o.index, t.length)), s.appendChild(n), o.index + t.length !== e.length)) {
                                        const n = i.createElement("span");
                                        (n.textContent = e.substring(o.index + t.length)), s.appendChild(n);
                                    }
                                } else s.textContent = e;
                                return s;
                            }
                        }
                        function Ge(e, { css: t, customIcon: i, defaultIcon: s, title: n }) {
                            const o = i || s;
                            return e.createIconButton({ css: ["footer-button", "flex"].concat(t), icon: o, iconCss: [], title: n });
                        }
                        function qe(e, t) {
                            Ke(e, t), Je(e, t);
                        }
                        function Ke(e, t) {
                            e.title = t;
                        }
                        function Ye(e, t) {
                            e.placeholder = t;
                        }
                        function Je(e, t) {
                            e.setAttribute("aria-label", t);
                        }
                        We.SUGGESTIONS_ID = "chat_widget_suggestions";
                        class Ze extends Ve {
                            constructor(e, t, i, s, n, o, a) {
                                super(),
                                    (this.settings = e),
                                    (this.util = t),
                                    (this.onClose = i),
                                    (this.onClearMessage = s),
                                    (this.onAudioToggle = n),
                                    (this.core = o),
                                    (this.onEndConversation = a),
                                    (this.logger = new R("ChatHeaderComponent")),
                                    (this.headerActions = []),
                                    (this.menuActions = []),
                                    (this.cssPrefix = e.name),
                                    (this.i18n = this.settings.i18n),
                                    (this.element = this._createElement()),
                                    this.settings.showConnectionStatus && this.core.on(T.f.State, (e) => this.updateStatusMessage(e)),
                                    this.disable(!0);
                            }
                            render() {}
                            addLanguageSelect(e) {
                                const t = !(!this.menuActions || !this.menuActions.length);
                                (this.multiLangControl = e.render(t)), this.multiLangControl && (t ? this.actionsMenu.appendChild(this.multiLangControl) : this.actionsContainer.prepend(this.multiLangControl));
                            }
                            closeWidgetPopup() {
                                this.onClose();
                            }
                            clearHistory() {
                                this.onClearMessage();
                            }
                            showTTSButton(e) {
                                const t = this.audioActionElem;
                                t && (t.style.display = e ? "flex" : "none");
                            }
                            disableTTSButton(e) {
                                if (this.audioActionElem) {
                                    const t = this.util,
                                        i = this.audioActionElem;
                                    if ("LI" === i.tagName) {
                                        const s = "disable";
                                        e ? t.addCSSClass(i, s) : t.removeCSSClass(i, s);
                                    } else this.audioActionElem.disabled = e;
                                }
                            }
                            setLocale(e) {
                                const t = `${this.cssPrefix}-none`;
                                this.currentTranslations = e;
                                const i = e.chatTitle;
                                i && ((this.title.innerText = i), (this.title.title = i), this.logo && (this.logo.title = i));
                                const s = e.chatSubtitle;
                                function n(e, t) {
                                    if ("LI" === e.tagName) {
                                        const i = e.querySelector("svg") || e.querySelector("img");
                                        "img" === i.localName ? (i.alt = t) : i.setAttribute("aria-label", t), (e.querySelector("span").innerText = t);
                                    } else e.title = t;
                                }
                                s
                                    ? ((this.subtitle.innerText = s), (this.subtitle.title = s), this.subtitle.classList.remove(t), this.networkStatus.classList.add(t))
                                    : this.settings.showConnectionStatus && (this.updateStatusMessage(this.chatStatus), this.networkStatus.classList.remove(t), this.subtitle.classList.add(t)),
                                    this.endActionElem && n(this.endActionElem, e.endConversation),
                                    this.closeActionElem && n(this.closeActionElem, e.close),
                                    this.clearActionElem && n(this.clearActionElem, e.clear),
                                    this.audioActionElem && n(this.audioActionElem, this._audioActionElemOn ? e.audioResponseOn : e.audioResponseOff),
                                    this.multiLangControl && n(this.multiLangControl, e.languageSelectDropdown);
                            }
                            disable(e = !0) {
                                this.settings.enableEndConversation && (this.endActionElem.disabled = e);
                            }
                            _createElement() {
                                var e;
                                const t = this.util,
                                    i = this.settings,
                                    s = i.icons,
                                    n = t.createDiv(["header", "flex"]),
                                    o = t.createDiv(["header-info-wrapper"]),
                                    a = t.createDiv(["header-actions", "flex"]),
                                    r = i.locale,
                                    c = this.i18n[r],
                                    l = c.chatTitle,
                                    h = c.chatSubtitle;
                                if (!("logo" in s) || s.logo) {
                                    const e = t.createImageIcon({ icon: s.logo || ce, iconCss: ["logo"], title: l });
                                    n.appendChild(e), (this.logo = e);
                                }
                                if (l) {
                                    const e = t.createDiv(["title"]);
                                    (e.id = `${i.name}-title`), (e.innerText = l), (e.title = l), o.appendChild(e), (this.title = e);
                                }
                                (this.subtitle = t.createDiv(["subtitle"])),
                                    o.appendChild(this.subtitle),
                                    (this.networkStatus = t.createDiv(["connection-status", "disconnected"])),
                                    o.appendChild(this.networkStatus),
                                    h
                                        ? ((this.subtitle.innerText = h), (this.subtitle.title = h), (i.showConnectionStatus = !1), this.networkStatus.classList.add(`${this.cssPrefix}-none`))
                                        : i.showConnectionStatus && ((this.networkStatus.innerText = c.disconnected), (this.networkStatus.title = this.networkStatus.innerText), this.subtitle.classList.add(`${this.cssPrefix}-none`)),
                                    n.appendChild(o);
                                const d = t.createDiv(["header-gap"]);
                                if ((n.appendChild(d), i.customHeaderElementId)) {
                                    const e = document.getElementById(i.customHeaderElementId);
                                    if (e) {
                                        const i = t.createDiv(["header-custom-element"]);
                                        i.appendChild(e), n.appendChild(i);
                                    } else this.logger.error(`Could not find element with ID '${i.customHeaderElementId}'. No custom element added to the chat header.`);
                                }
                                if (!i.embedded) {
                                    const e = s.collapse || Q;
                                    this.headerActions.push({ name: "collapse", title: c.close, icon: e, clickHandler: this.closeWidgetPopup.bind(this) });
                                }
                                if (((this.actionsContainer = a), i.enableEndConversation)) {
                                    const e = s.close || X;
                                    this.headerActions.push({ name: "end-conversation", title: c.endConversation, icon: e, clickHandler: this.onEndConversation.bind(this) });
                                }
                                if (
                                    (i.enableBotAudioResponse &&
                                        ((this._audioActionElemOn = !i.initBotAudioMuted),
                                        this.headerActions.push({
                                            name: "tts",
                                            title: this._audioActionElemOn ? c.audioResponseOn : c.audioResponseOff,
                                            icon: this._audioActionElemOn ? s.ttsOn || be : s.ttsOff || fe,
                                            clickHandler: () => {
                                                (this._audioActionElemOn = !this._audioActionElemOn), this.setAudioResponseIcon(c), this.onAudioToggle(this._audioActionElemOn);
                                            },
                                        })),
                                    i.enableClearMessage)
                                ) {
                                    const e = s.clearHistory || Z;
                                    this.headerActions.push({ name: "clear", title: c.clear, icon: e, clickHandler: this.clearHistory.bind(this) });
                                }
                                return (
                                    null === (e = this.headerActions) ||
                                        void 0 === e ||
                                        e.forEach((e, i) => {
                                            const s = this.settings.multiLangChat ? this.headerActions.length + 1 : this.headerActions.length;
                                            if (!this.settings.enableHeaderActionCollapse || (i < 2 && !(s > 2 && 1 === i))) {
                                                const i = t.createIconButton({ css: ["header-button"], icon: e.icon, iconCss: [], title: e.title });
                                                (i.onclick = e.clickHandler), this.mapActionElems(e, i), this.actionsContainer.prepend(i);
                                            } else this.menuActions.push();
                                        }),
                                    this.menuActions && this.menuActions.length && this.createActionMenu(this.menuActions),
                                    n.appendChild(a),
                                    n
                                );
                            }
                            mapActionElems(e, t) {
                                switch (((t.id = `${this.cssPrefix}-${e.name}`), e.name)) {
                                    case "end-conversation":
                                        this.endActionElem = t;
                                        break;
                                    case "collapse":
                                        this.closeActionElem = t;
                                        break;
                                    case "tts":
                                        this.audioActionElem = t;
                                        break;
                                    case "clear":
                                        this.clearActionElem = t;
                                }
                            }
                            createActionMenu(e) {
                                const t = this.util,
                                    i = `${this.settings.name}-action-menu`,
                                    s = `${i}-button`,
                                    n = e.map((e) => {
                                        const i = t.createListItem(`action-menu-option-${e.name}`, e.title, e.name, e.icon, "action-item", e.clickHandler);
                                        return this.mapActionElems(e, i), i;
                                    }),
                                    o = t.createIconButton({
                                        css: ["header-button", "button-close"],
                                        icon:
                                            '<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path d="M4.99935 9.99967C4.99935 10.9201 4.25316 11.6663 3.33268 11.6663C2.41221 11.6663 1.66602 10.9201 1.66602 9.99967C1.66602 9.0792 2.41221 8.33301 3.33268 8.33301C4.25316 8.33301 4.99935 9.0792 4.99935 9.99967Z" fill="#161513"/><path d="M11.666 9.99967C11.666 10.9201 10.9198 11.6663 9.99935 11.6663C9.07887 11.6663 8.33268 10.9201 8.33268 9.99967C8.33268 9.0792 9.07887 8.33301 9.99935 8.33301C10.9198 8.33301 11.666 9.0792 11.666 9.99967Z" fill="#161513"/><path d="M18.3327 9.99967C18.3327 10.9201 17.5865 11.6663 16.666 11.6663C15.7455 11.6663 14.9993 10.9201 14.9993 9.99967C14.9993 9.0792 15.7455 8.33301 16.666 8.33301C17.5865 8.33301 18.3327 9.0792 18.3327 9.99967Z" fill="#161513"/></svg',
                                        iconCss: [],
                                        title: this.i18n[this.settings.locale].showOptions,
                                    }),
                                    a = t.getMenu({ menuId: i, menuClassList: ["action-menu"], menuItems: n, buttonId: s, menuButton: o }),
                                    r = t.getMenuButton({ button: o, menuId: i, menu: a });
                                this.actionsContainer.prepend(r), this.actionsContainer.appendChild(a), (this.actionsMenu = a);
                            }
                            setAudioResponseIcon(e) {
                                const t = this.util,
                                    i = this.currentTranslations || e,
                                    s = this.settings.icons;
                                this.audioActionElem.innerHTML = "";
                                const n = this._audioActionElemOn ? i.audioResponseOn : i.audioResponseOff,
                                    o = this._audioActionElemOn ? s.ttsOn || be : s.ttsOff || fe,
                                    a = "LI" === this.audioActionElem.tagName,
                                    r = t.createImageIcon({ icon: o, iconCss: [a ? "icon" : "", "action-item-icon"], title: n });
                                if (a) {
                                    this.audioActionElem.appendChild(r);
                                    const e = t.createElement("span", ["text", "action-item-text", "ellipsis"]);
                                    (e.innerText = n), this.audioActionElem.appendChild(e);
                                } else this.audioActionElem.appendChild(r), (this.audioActionElem.title = n);
                            }
                            updateStatusMessage(e) {
                                const t = this.util,
                                    i = "connecting",
                                    s = "connected",
                                    n = "disconnected",
                                    o = this.networkStatus;
                                this.chatStatus = e;
                                const a = this.currentTranslations || this.i18n[this.settings.locale];
                                switch (e) {
                                    case T.d.Open:
                                        (o.innerText = a.connected), t.removeCSSClass(o, i, n), t.addCSSClass(o, s);
                                        break;
                                    case T.d.Closed:
                                        (o.innerText = a.disconnected), t.removeCSSClass(o, i, s), t.addCSSClass(o, n);
                                        break;
                                    case T.d.Closing:
                                        (o.innerText = a.closing), t.removeCSSClass(o, s, n), t.addCSSClass(o, i);
                                        break;
                                    case T.d.Connecting:
                                        (o.innerText = a.connecting), t.removeCSSClass(o, s, n), t.addCSSClass(o, i);
                                }
                                o.title = o.innerText;
                            }
                        }
                        class Xe extends Ve {
                            constructor(e) {
                                super(), (this.element = e.createDiv(["conversation"]));
                            }
                            render(e) {}
                        }
                        class Qe {
                            constructor(e, t, i, s, n) {
                                (this.settings = e), (this.util = t), (this.side = s), (this.hasActions = n), (this._url = i.url), (this._type = i.type);
                                const o = i.url.split("/");
                                this._title = decodeURI(i.title || o[o.length - 1]);
                            }
                            static capitalize(e) {
                                return e.charAt(0).toUpperCase() + e.slice(1);
                            }
                            createDownloadButton(e) {
                                const t = this.util,
                                    i = this.settings,
                                    s = t.createElement("a"),
                                    n = t.createIconButton({ css: ["attachment-control-icon", "attachment-button", "flex"], icon: i.icons.download || ee, iconCss: ["attachment-download-icon"], title: i.i18n[i.locale].download });
                                return s.setAttribute("href", e), s.setAttribute("download", ""), s.setAttribute("target", "_blank"), s.appendChild(n), s;
                            }
                            createAttachment(e, t) {
                                const i = this.util,
                                    s = this.settings,
                                    n = i.createDiv(["attachment"]),
                                    o = i.createDiv(["attachment-placeholder", "flex"]),
                                    a = i.createDiv(["attachment-icon"]),
                                    r = i.createImageIcon({ icon: e, title: "" });
                                a.appendChild(r);
                                const c = this._title,
                                    l = i.createDiv(["attachment-footer", "flex", this.hasActions && "with-actions"]),
                                    h = i.createElement("label", ["attachment-title"]),
                                    d = i.createDiv(["attachment-controls", "flex"]);
                                if (((h.innerText = c), h.setAttribute("title", c), l.appendChild(h), this._type === T.b.Image)) {
                                    const e = i.createIconButton({
                                        css: ["attachment-control-icon", "attachment-button", "flex"],
                                        icon: s.icons.expandImage || xe,
                                        iconCss: ["attachment-expand-icon"],
                                        title: s.i18n[s.locale].imageViewerOpen,
                                    });
                                    (e.onclick = () => {
                                        this.createImagePreview(this._url, c);
                                    }),
                                        d.appendChild(e);
                                }
                                if ((this.side === _.LEFT && d.appendChild(this.createDownloadButton(this._url)), t))
                                    switch (
                                        (o.appendChild(t),
                                        (t.onerror = () => {
                                            t.remove(), o.appendChild(a);
                                        }),
                                        this._type)
                                    ) {
                                        case T.b.Image:
                                            (t.onload = () => {
                                                t.clientHeight > 211 && (o.style.alignItems = "flex-start"), l.appendChild(d);
                                            }),
                                                (t.onclick = () => {
                                                    this.createImagePreview(this._url, this._title);
                                                });
                                            break;
                                        case T.b.Audio:
                                        case T.b.Video:
                                            t.onloadeddata = () => {
                                                l.appendChild(d);
                                            };
                                    }
                                else o.appendChild(a), l.appendChild(d);
                                return n.appendChild(o), null == n || n.appendChild(l), n;
                            }
                            createImagePreview(e, t) {
                                const i = this.util,
                                    s = "image-preview",
                                    n = this.settings,
                                    o = i.createDiv([`${s}-wrapper`]),
                                    a = i.createImage(e, [s]),
                                    r = i.createElement("label", [`${s}-title`]);
                                r.innerText = t;
                                const c = document.querySelector(`.${this.settings.name}-wrapper`),
                                    l = n.icons.close || X,
                                    h = i.createIconButton({ css: [`${s}-close`], icon: l, iconCss: [`${s}-close-icon`], title: n.i18n[n.locale].imageViewerClose });
                                (h.onclick = () => {
                                    o.remove();
                                }),
                                    (h.onkeydown = (e) => {
                                        "Tab" === e.code && (o.focus(), e.preventDefault());
                                    });
                                const d = i.createDiv([`${s}-header`]);
                                d.appendChild(r),
                                    d.appendChild(h),
                                    o.appendChild(d),
                                    o.appendChild(a),
                                    o.setAttribute("tabindex", "-1"),
                                    (o.onkeydown = (e) => {
                                        "Escape" === e.code && o.remove();
                                    }),
                                    c.appendChild(o),
                                    o.focus();
                            }
                        }
                        class et extends Qe {
                            render() {
                                const e = this.util,
                                    t = this.settings,
                                    i = t.icons.fileAudio || q,
                                    s = e.createMedia("video", this._url, ["attachment-audio"]);
                                (s.controls = !0), (s.preload = "metadata"), _.RIGHT === this.side && s.setAttribute("controlsList", "nodownload");
                                const n = `<a href="${this._url}">`,
                                    o = t.i18n[t.locale].attachmentAudioFallback.replace("{0}", n).replace("{/0}", "</a>");
                                return (s.innerHTML = o), t.linkHandler ? g(s, t.linkHandler) : t.openLinksInNewWindow && m(s), this.createAttachment(i, s);
                            }
                        }
                        class tt extends Qe {
                            render() {
                                const e = this.settings.icons.fileGeneric || se;
                                return this.createAttachment(e);
                            }
                        }
                        class it extends Qe {
                            render() {
                                const e = this.util,
                                    t = this.settings.icons.fileImage || ne,
                                    i = e.createImage(this._url, ["attachment-image"], this._title);
                                return this.createAttachment(t, i);
                            }
                        }
                        class st extends Qe {
                            render() {
                                const e = this.util,
                                    t = this.settings,
                                    i = t.icons.fileVideo || ve;
                                if (l(this._url)) {
                                    const i = e.createElement("span");
                                    return (i.innerHTML = e.linkify(this._url, { emHTML: !0, emVideo: t.embeddedVideo })), i;
                                }
                                const s = e.createMedia("video", this._url, ["attachment-video"]);
                                (s.controls = !0), (s.preload = "metadata"), _.RIGHT === this.side && s.setAttribute("controlsList", "nodownload");
                                const n = `<a href="${this._url}">`,
                                    o = t.i18n[t.locale].attachmentVideoFallback.replace("{0}", n).replace("{/0}", "</a>");
                                return (s.innerHTML = o), this.settings.linkHandler ? g(s, t.linkHandler) : this.settings.openLinksInNewWindow && m(s), this.createAttachment(i, s);
                            }
                        }
                        class nt extends V {
                            constructor(e, t, i, s, n, o) {
                                super(e, t, i, s, n, o), (this._attachment = nt.fromPayload(e, t, i.attachment, s, o, this.hasActions()));
                            }
                            static fromPayload(e, t, i, s, n, o = !1) {
                                if (n && n.authToken && n.uri && i.url.indexOf(n.uri) >= 0 && !this.tokenRegex.test(i.url)) {
                                    const e = null == n ? void 0 : n.authToken;
                                    (null == e ? void 0 : e.length) && (i.url = `${i.url}?token=${e}`);
                                }
                                switch (i.type) {
                                    case T.b.Image:
                                        return new it(e, t, i, s, o);
                                    case T.b.Video:
                                        return new st(e, t, i, s, o);
                                    case T.b.Audio:
                                        return new et(e, t, i, s, o);
                                    case T.b.File:
                                        return new tt(e, t, i, s, o);
                                    default:
                                        throw Error("Payload contains wrong attachment type");
                                }
                            }
                            getContent() {
                                return super.getContent(this._attachment.render());
                            }
                        }
                        nt.tokenRegex = /token=[a-z\.\d]+/i;
                        class ot {
                            constructor(e, t, i, s, n) {
                                var o;
                                if (
                                    ((this.settings = e),
                                    (this.util = t),
                                    (this.options = n),
                                    (this._actions = []),
                                    (this._postActions = []),
                                    (this._title = i.title),
                                    (this._description = i.description),
                                    (this._imageUrl = i.imageUrl),
                                    (this._url = i.url),
                                    i.actions)
                                ) {
                                    for (const s of i.actions) {
                                        const i = (this._title ? `${this._title} - ` : "") + (this._description ? `${this._description} - ` : "") + (null !== (o = this._url) && void 0 !== o ? o : ""),
                                            a = B.fromActionPayload(s, t, e.openLinksInNewWindow, i, e.linkHandler, n);
                                        a && ((a.onActionClick = this.handleOnActionClick.bind(this)), this._actions.push(a));
                                    }
                                    this._postActions = I(this._actions);
                                }
                            }
                            handleOnActionClick(e) {
                                this.onActionClick && this.onActionClick(e);
                            }
                            render() {
                                const e = this.util,
                                    t = this.settings,
                                    i = t.locale,
                                    s = this._url,
                                    n = e.createDiv(["card"]),
                                    o = s ? e.createAnchor(s, "", ["card-component"], t.openLinksInNewWindow, t.linkHandler) : e.createDiv(["card-content"]);
                                if ((this._url && (o.innerText = ""), this._imageUrl)) {
                                    const s = t.i18n;
                                    let n = s[i].cardImagePlaceholder;
                                    if (this.options && this.options.locale) {
                                        const e = s[this.options.locale];
                                        n = e ? e.cardImagePlaceholder : n;
                                    }
                                    o.appendChild(e.createImage(this._imageUrl, ["card-image"], n));
                                }
                                const a = { emHTML: !0, emVideo: !0 },
                                    r = e.createDiv(["card-title"]);
                                if (((r.innerHTML = e.linkify(this._title, a)), o.appendChild(r), this._description)) {
                                    const t = e.createDiv(["card-description"]);
                                    (t.innerHTML = e.linkify(this._description, a)), o.appendChild(t);
                                }
                                if ((n.appendChild(o), t.linkHandler ? g(o, t.linkHandler) : t.openLinksInNewWindow && m(o), this._actions.length > 0)) {
                                    const i = e.createDiv("horizontal" !== t.cardActionsLayout ? ["card-actions", "col"] : ["card-actions"]);
                                    let s = !0;
                                    for (const e of this._actions) {
                                        const t = e.render();
                                        s && ((this.firstActionButton = t), (s = !1)), i.appendChild(t);
                                    }
                                    n.appendChild(i);
                                }
                                return n;
                            }
                            hasActions() {
                                return this._actions.length > 0;
                            }
                            disableActions() {
                                this._actions.forEach((e) => e.disable());
                            }
                            disablePostbacks() {
                                this._postActions.forEach((e) => e.disable());
                            }
                            enableActions() {
                                this._actions.forEach((e) => e.enable());
                            }
                            enablePostbacks() {
                                this._postActions.forEach((e) => e.enable());
                            }
                            getFirstActionButton() {
                                return this.firstActionButton;
                            }
                        }
                        class at extends V {
                            constructor(e, t, i, s, n, o) {
                                super(e, t, i, s, n, o), (this.cards = []), (this.layout = i.layout), (this.numCards = i.cards.length);
                                let a = 0;
                                i.cards.forEach((e) => {
                                    a++, this.cards.push(new ot(this.settings, t, e, a, o));
                                }),
                                    (this.globalActions = this.actions.concat(this.globalActions)),
                                    (this.actions = []);
                            }
                            hasActions() {
                                return this.cards[0].hasActions() || this.actions.length > 0 || this.globalActions.length > 0;
                            }
                            disableActions() {
                                super.disableActions(),
                                    this.cards.forEach((e) => {
                                        e.disableActions();
                                    });
                            }
                            disablePostbacks() {
                                super.disablePostbacks(),
                                    this.cards.forEach((e) => {
                                        e.disablePostbacks();
                                    });
                            }
                            enableActions() {
                                super.enableActions(),
                                    this.cards.forEach((e) => {
                                        e.enableActions();
                                    });
                            }
                            enablePostbacks() {
                                super.enablePostbacks(),
                                    this.cards.forEach((e) => {
                                        e.enablePostbacks();
                                    });
                            }
                            render() {
                                const e = this.util,
                                    t = this.settings.name,
                                    i = [`card-message-${this.layout}`],
                                    s = super.render();
                                if (s.querySelector(`.${t}-icon-wrapper`)) {
                                    i.push("has-message-icon");
                                    const n = s.querySelector(`.${t}-content-wrapper`);
                                    e.addCSSClass(n, "with-icon");
                                }
                                return e.addCSSClass(s, ...i), s;
                            }
                            getContent() {
                                const e = this.util,
                                    t = e.createDiv(["card-message-content"]),
                                    i = e.createDiv(["card-message-cards"]);
                                let s = !0;
                                if (
                                    (this.cards.forEach((e) => {
                                        e.onActionClick = this.handleOnActionClick.bind(this);
                                        const t = e.render();
                                        s && e.hasActions() && ((this.firstActionButton = e.getFirstActionButton()), (s = !1)), i.appendChild(t);
                                    }),
                                    t.appendChild(i),
                                    "horizontal" === this.layout && this.numCards > 1)
                                ) {
                                    let e;
                                    t.appendChild(this.getNextButton()),
                                        (this.activeCard = 0),
                                        i.addEventListener("scroll", () => {
                                            window.clearTimeout(e),
                                                (e = window.setTimeout(() => {
                                                    let e = 0;
                                                    for (let t = 0; t < this.numCards; t++) {
                                                        const s = i.children[t];
                                                        if (i.scrollLeft <= s.offsetLeft + 5) {
                                                            e = t;
                                                            break;
                                                        }
                                                    }
                                                    e !== this.activeCard && ((this.activeCard = e), this.updateCardsScrollState());
                                                }, 100));
                                        }),
                                        window.addEventListener(
                                            "resize",
                                            S(() => {
                                                this.showHideNavButtons();
                                            }, 500)
                                        );
                                }
                                return (
                                    (this.content = t),
                                    (this.cardsWrapper = i),
                                    new IntersectionObserver(
                                        (e) => {
                                            e.forEach((e) => {
                                                e.isIntersecting && this.showHideNavButtons();
                                            });
                                        },
                                        { root: document.querySelector(".oda-chat-conversation") }
                                    ).observe(i),
                                    t
                                );
                            }
                            getNextButton() {
                                if (!this.nextButton) {
                                    const e = this.util,
                                        t = this.translations.cardNavNext;
                                    this.nextButton = e.createDiv(["next-wrapper"]);
                                    const i = e.createButton(["round", "next"]);
                                    (i.title = t), i.setAttribute("aria-label", t);
                                    const s = e.createElementFromString(Y);
                                    s.setAttribute("role", "img"), s.setAttribute("aria-label", t), i.appendChild(s), (i.onclick = this.showNextCard.bind(this)), this.nextButton.appendChild(i);
                                }
                                return this.nextButton;
                            }
                            getPreviousButton() {
                                if (!this.prevButton) {
                                    const e = this.util,
                                        t = this.translations.cardNavPrevious;
                                    this.prevButton = e.createDiv(["prev-wrapper"]);
                                    const i = e.createButton(["round", "previous"]);
                                    (i.title = t), i.setAttribute("aria-label", t);
                                    const s = e.createElementFromString(J);
                                    s.setAttribute("role", "img"), s.setAttribute("aria-label", t), i.appendChild(s), (i.onclick = this.showPrevCard.bind(this)), this.prevButton.appendChild(i);
                                }
                                return this.prevButton;
                            }
                            showNextCard() {
                                this.activeCard < this.numCards && (this.activeCard++, this.updateCardsScrollState());
                            }
                            showPrevCard() {
                                this.activeCard > 0 && (this.activeCard--, this.updateCardsScrollState());
                            }
                            updateCardsScrollState() {
                                var e, t, i, s;
                                const n = this.cardsWrapper.children[this.activeCard];
                                n &&
                                    ((this.cardsWrapper.scrollLeft = n.offsetLeft - 56),
                                    0 === this.activeCard
                                        ? null === (e = this.prevButton) || void 0 === e || e.remove()
                                        : (null === (t = this.prevButton) || void 0 === t ? void 0 : t.parentElement) || this.content.prepend(this.getPreviousButton()),
                                    this.activeCard === this.numCards - 1
                                        ? null === (i = this.nextButton) || void 0 === i || i.remove()
                                        : (null === (s = this.nextButton) || void 0 === s ? void 0 : s.parentElement) || this.content.appendChild(this.getNextButton()));
                            }
                            showHideNavButtons() {
                                this.cardsWrapper.scrollWidth === this.cardsWrapper.offsetWidth
                                    ? (this.nextButton && (this.nextButton.hidden = !0), this.prevButton && (this.prevButton.hidden = !0))
                                    : (this.nextButton && (this.nextButton.hidden = !1), this.prevButton && (this.prevButton.hidden = !1));
                            }
                        }
                        class rt extends V {
                            constructor(e, t, i, s, n, o) {
                                super(e, t, i, s, n, o);
                                const a = i.location;
                                (this._title = a.title), (this._url = a.url), (this._longitude = a.longitude), (this._latitude = a.latitude);
                            }
                            render() {
                                const e = this.util,
                                    t = e.createDiv(["message"]);
                                t.lang = this.locale;
                                const i = e.createDiv(["message-wrapper"]);
                                t.appendChild(i);
                                const s = e.createDiv(["attachment"]),
                                    n = e.createDiv(["attachment-placeholder", "flex"]),
                                    o = e.createDiv(["attachment-icon"]),
                                    a = e.createImageIcon({ icon: this.settings.icons.shareMenuLocation || ge, title: "" }),
                                    r = e.createDiv(["attachment-footer", "flex"]),
                                    c = e.createElement("label", ["attachment-title"]);
                                if (((c.innerText = this._title ? this._title : `${this._latitude.toFixed(4)}, ${this._longitude.toFixed(4)}`), r.appendChild(c), o.appendChild(a), n.appendChild(o), !this.actions.length)) {
                                    const t = e.createDiv(["attachment-controls"]),
                                        i = e.createIconButton({ css: ["attachment-control-icon", "attachment-button", "flex"], icon: this.settings.icons.externalLink || ie, iconCss: [], title: this.translations.openMap }),
                                        s = e.createAnchor(this._url || `https://www.google.com/maps/@${this._latitude},${this._longitude},12z`, "", [], this.settings.openLinksInNewWindow, this.settings.linkHandler);
                                    (i.onclick = () => {
                                        s.click();
                                    }),
                                        t.appendChild(i),
                                        r.appendChild(t);
                                }
                                return s.appendChild(n), s.appendChild(r), i.appendChild(this.getContent(s)), t;
                            }
                        }
                        class ct extends V {
                            constructor(e, t, i, s, n, o) {
                                super(e, t, i, s, n, o), (this._payload = JSON.stringify(i.payload));
                            }
                            getContent() {
                                const e = this.util.createElement("span");
                                return (e.innerText = this._payload), super.getContent(e);
                            }
                        }
                        class lt extends V {
                            constructor(e, t, i, s, n, o) {
                                super(e, t, i, s, n, o), (this._text = i.text);
                            }
                            getContent() {
                                const e = this.settings,
                                    t = this.util,
                                    i = t.createDiv();
                                return (i.innerHTML = t.linkify(this._text, { emHTML: this.side === _.LEFT, emVideo: !0 })), e.linkHandler ? g(i, e.linkHandler) : e.openLinksInNewWindow && m(i), super.getContent(i);
                            }
                        }
                        class ht extends lt {
                            constructor(e, t, i, s, n, o) {
                                super(e, t, i, s, n, o), (this.currentRating = 0), (this.payloadActions = i.actions), (this.ratingId = Date.now());
                            }
                            focusFirstAction() {
                                this.ratingActions[0].focus();
                            }
                            disableActions() {
                                this.setDisabled(!0), super.disableActions();
                            }
                            disablePostbacks() {
                                this.setDisabled(!0), super.disablePostbacks();
                            }
                            enableActions() {
                                this.setDisabled(!1), super.enableActions();
                            }
                            enablePostbacks() {
                                this.setDisabled(!1), super.enablePostbacks();
                            }
                            highlightRating(e) {
                                const t = this.util,
                                    i = "active";
                                for (let s = 0; s < this.actions.length; s++) {
                                    const n = s + 1;
                                    "string" == typeof e && (e = this.getValidRating(e)), (e && n <= e) || (0 === e && n <= this.currentRating) ? t.addCSSClass(this.ratingActions[s], i) : t.removeCSSClass(this.ratingActions[s], i);
                                }
                            }
                            getActions() {
                                const e = this.util,
                                    t = this.settings,
                                    i = t.i18n[t.locale].ratingStar,
                                    s = e.createDiv(["rating-wrapper"]);
                                (this.ratingActions = this.payloadActions.map((n) => {
                                    const o = e.createElement("input", ["star-input", "rating-hidden"]);
                                    (o.id = `rating-${n.label}-${this.ratingId}`), (o.type = "radio"), (o.name = `rating-${this.ratingId}`), (o.value = n.label);
                                    const a = e.createElement("label", ["star-label"]);
                                    (a.htmlFor = `rating-${n.label}-${this.ratingId}`), a.setAttribute("data-rating", n.label);
                                    const r = e.createElement("span", ["rating-hidden"]),
                                        c = i.replace("{0}", `${n.label}`);
                                    r.innerText = c;
                                    const l = (t.icons && t.icons.rating) || he,
                                        h = e.createImageIcon({ icon: l, title: c, iconCss: ["rating-star-icon"] });
                                    return (
                                        a.appendChild(r),
                                        a.appendChild(h),
                                        (o.onfocus = () => {
                                            o.disabled || (this.currentRating = this.getRatingStarsAndHighlight(o));
                                        }),
                                        (o.onkeydown = (e) => {
                                            "Enter" === e.key && this.submitRating(n);
                                        }),
                                        (a.onclick = () => {
                                            o.disabled || ((this.currentRating = this.getRatingStarsAndHighlight(a)), this.submitRating(n));
                                        }),
                                        (a.onmouseover = () => {
                                            o.disabled || this.getRatingStarsAndHighlight(a);
                                        }),
                                        (a.onmouseleave = () => {
                                            o.disabled || this.getRatingStarsAndHighlight(null);
                                        }),
                                        s.appendChild(o),
                                        s.appendChild(a),
                                        o
                                    );
                                })),
                                    this.currentRating && this.getRatingStarsAndHighlight(null);
                                const n = e.createDiv(["rating-root"]);
                                return n.appendChild(s), n;
                            }
                            setDisabled(e) {
                                this.ratingActions &&
                                    this.ratingActions.forEach((t) => {
                                        t.disabled = e;
                                    });
                            }
                            submitRating(e) {
                                const t = { getPayload: () => Promise.resolve(e.postback), label: e.label, type: e.type };
                                this.handleOnActionClick(t);
                            }
                            getRatingStarsAndHighlight(e) {
                                let t = 0;
                                if (e) {
                                    const i = e.value ? e.value : null == e ? void 0 : e.getAttribute("data-rating");
                                    t = i ? parseInt(i, 10) : 0;
                                }
                                return this.highlightRating(t), t;
                            }
                            getValidRating(e) {
                                let t = 0;
                                if (e.match(/^\d+$/)) {
                                    const i = parseInt(e, 10);
                                    i > 0 && i <= this.actions.length && (t = i);
                                }
                                return t;
                            }
                        }
                        var dt = i(721);
                        class pt extends V {
                            constructor(e, t, i, s, n, o) {
                                super(e, t, i, s, n, o),
                                    (this._actions = []),
                                    (this.cssPrefix = e.name),
                                    (this._options = o),
                                    (this._payload = i),
                                    (this._isActionsExternal = !0),
                                    (this.actions = this.actions.filter((e) => e.getActionType() !== T.a.SubmitForm || ((this._submitFormAction = e), !1)));
                            }
                            disableActions() {
                                super.disableActions(), this._actions.forEach((e) => e.disable()), this._submitFormAction && this._submitFormAction.disable();
                            }
                            disablePostbacks() {
                                super.disablePostbacks(), I(this._actions).forEach((e) => e.disable());
                            }
                            enableActions() {
                                super.enableActions(), this._actions.forEach((e) => e.enable()), this._submitFormAction && this._submitFormAction.disable();
                            }
                            enablePostbacks() {
                                super.enablePostbacks(), I(this._actions).forEach((e) => e.enable());
                            }
                            render() {
                                return super.render();
                            }
                            getHeader() {
                                const e = this.util,
                                    t = super.getHeader();
                                return e.addCSSClass(t, "message-header-yellow"), t;
                            }
                            getContent(e) {
                                const t = "message-bubble",
                                    i = this.util.createDiv([t, `${t}-tabular-message`]);
                                e && i.appendChild(e);
                                const s = this.getPageStatus();
                                return s && i.appendChild(s), i;
                            }
                            getPageStatus() {
                                const e = this.util;
                                let t;
                                const i = this._payload.paginationInfo;
                                return i && i.totalCount > i.rangeSize && ((t = e.createDiv(["results-page-status"])), (t.innerText = i.status)), t;
                            }
                        }
                        class ut extends pt {
                            getContent() {
                                const e = this.util,
                                    t = this._payload,
                                    i = "form-message",
                                    s = e.createDiv([i]);
                                t.formColumns > 2 && (t.formColumns = 2);
                                const n = t.forms;
                                return (
                                    n.forEach((o, a) => {
                                        if (o.title) {
                                            const t = e.createDiv([`${i}-header`]);
                                            (t.innerText = o.title), s.appendChild(t);
                                        }
                                        const [r, c] = gt(e, o, t.formColumns, this.settings, this.handleOnActionClick.bind(this), this._options);
                                        this._actions = this._actions.concat(c);
                                        const l = a + 1;
                                        l === n.length || n[l].title || e.addCSSClass(r, "with-border"), s.appendChild(r);
                                    }),
                                    super.getContent(s)
                                );
                            }
                        }
                        function gt(e, t, i, s, n, o) {
                            const a = "form-message",
                                r = `${a}-actions-col`,
                                c = e.createDiv([`${a}-item`]);
                            t.fields.forEach((t) => {
                                c.appendChild(mt(t, a, e, i, s));
                            });
                            const l = (function (e, t, i, s, n) {
                                var o;
                                const a = [];
                                if ((null === (o = e.actions) || void 0 === o ? void 0 : o.length) > 0) {
                                    let o = e.title ? `${e.title} - ` : "";
                                    e.fields.forEach((e) => {
                                        o += e.value ? `${e.value} - ` : "";
                                    }),
                                        o.length && (o = o.slice(0, o.length - 3));
                                    for (const r of e.actions) {
                                        const e = B.fromActionPayload(r, t, i.openLinksInNewWindow, o, i.linkHandler, n);
                                        e && ((e.onActionClick = s.bind(this)), a.push(e));
                                    }
                                }
                                return a;
                            })(t, e, s, n, o);
                            return (
                                c.appendChild(
                                    (function (e, t, i, s) {
                                        const n = t.createDiv("horizontal" !== i.formActionsLayout ? ["form-actions", "col", s] : ["form-actions"]);
                                        for (const t of e) {
                                            const e = t.render();
                                            n.appendChild(e);
                                        }
                                        return n;
                                    })(l, e, s, r)
                                ),
                                [c, l]
                            );
                        }
                        function mt(e, t, i, s, n) {
                            const o = `${t}-field`,
                                a = [o, `${o}-col-${s}`],
                                r = i.createDiv(a),
                                c = i.createDiv([`${t}-key`]),
                                l = i.createDiv([`${t}-value`]);
                            if (((c.innerText = e.label), e.displayType === T.g.Link)) {
                                const t = i.createDiv(),
                                    s = i.createElement("a", e.linkLabel ? [] : ["ellipsis"]);
                                (s.href = e.value),
                                    (s.innerText = e.linkLabel || b(e.value) || ""),
                                    s.setAttribute("target", "_blank"),
                                    t.appendChild(s),
                                    n.linkHandler ? g(t, n.linkHandler) : n.openLinksInNewWindow && m(t),
                                    l.appendChild(s);
                            } else l.innerText = e.value || "";
                            const h = e.alignment;
                            return h && ((c.style.textAlign = h), (l.style.textAlign = h)), r.appendChild(c), r.appendChild(l), r;
                        }
                        class ft extends pt {
                            constructor() {
                                super(...arguments), (this._errorElems = []), (this._inputElements = []), (this._submittedFields = {});
                            }
                            getContent() {
                                const e = this._payload,
                                    t = this.settings,
                                    i = this.util,
                                    s = "form-message",
                                    n = `${s}-item`,
                                    o = `${s}-actions-col`,
                                    a = i.createDiv([s]),
                                    r = i.createDiv([n]);
                                if ((e.formColumns > 2 && (e.formColumns = 1), this.headerText)) {
                                    const e = i.createDiv([`${s}-header`]);
                                    (e.innerText = this.headerText), a.appendChild(e);
                                }
                                return (
                                    e.fields
                                        .filter((e) => e)
                                        .forEach((n) => {
                                            (0, T.A)(n.displayType) ? r.appendChild(mt(n, s, i, e.formColumns, t)) : r.appendChild(this.renderEditableFieldElement(n, s));
                                        }),
                                    (this._actionsDiv = i.createDiv("horizontal" !== t.formActionsLayout ? ["form-actions", "col", o] : ["form-actions"])),
                                    this._actionsDiv.appendChild(this._submitFormAction.render()),
                                    r.appendChild(this._actionsDiv),
                                    this._errorElems.length && this.renderErrorMessage(this._actionsDiv, e.errorMessage || this.translations.editFormErrorMessage, !0),
                                    a.appendChild(r),
                                    super.getContent(a)
                                );
                            }
                            validateForm() {
                                var e;
                                let t = !0;
                                return (
                                    this._errorElems.forEach((e) => {
                                        e.remove();
                                    }),
                                    this._inputElements.forEach((e) => {
                                        const i = e.dataset.error,
                                            s = e.tagName.toLowerCase(),
                                            n = e.nextElementSibling;
                                        let o,
                                            a = !0;
                                        switch (s) {
                                            case "select":
                                                const t = e;
                                                t.checkValidity() || ((a = !1), (o = i || t.validationMessage));
                                                break;
                                            case "form":
                                                const s = e,
                                                    n = s.ariaLabel;
                                                n === dt.a.MultiSelect && "true" === s.ariaRequired
                                                    ? s.querySelectorAll("input[type='checkbox']:checked").length || ((a = !1), (o = i || s.querySelector("input").validationMessage))
                                                    : n !== dt.a.SingleSelect || s.checkValidity() || ((a = !1), (o = i || s.querySelector("input").validationMessage));
                                                break;
                                            case "input":
                                                const r = e;
                                                "checkbox" === r.type || r.checkValidity() || ((o = i || r.validationMessage), (a = !1));
                                                break;
                                            case "textarea":
                                                const c = e;
                                                c.required && (c.checkValidity() || ((o = i || c.validationMessage), (a = !1)));
                                                break;
                                            case "div":
                                                const l = e;
                                                "true" === l.getAttribute("aria-required") && ((o = i), (a = !!l.firstElementChild.firstElementChild));
                                        }
                                        a ? (e.parentElement.classList.remove(`${this.cssPrefix}-error`), "SPAN" === (null == n ? void 0 : n.tagName) && n.remove()) : (n && "SPAN" === n.tagName) || this.renderErrorMessage(e, o),
                                            (t = t && a);
                                    }),
                                    t ? null === (e = this._errorElems[0]) || void 0 === e || e.remove() : this.renderErrorMessage(this._actionsDiv, this.translations.editFormErrorMessage, !0),
                                    t
                                );
                            }
                            getSubmittedFields() {
                                return (
                                    this._inputElements
                                        .filter((e) => {
                                            const t = e.tagName.toLowerCase();
                                            return "textarea" === t && (this._submittedFields[e.id] = e.value), "input" === t;
                                        })
                                        .forEach((e) => {
                                            const t = e;
                                            switch (t.type) {
                                                case "checkbox":
                                                    this._submittedFields[t.id] = t.checked ? t.getAttribute("valueOn") : t.getAttribute("valueOff");
                                                    break;
                                                case "number":
                                                    this._submittedFields[t.id] = t.valueAsNumber;
                                                    break;
                                                default:
                                                    this._submittedFields[t.id] = t.value;
                                            }
                                        }),
                                    this._submittedFields
                                );
                            }
                            renderEditableFieldElement(e, t) {
                                var i, s, n;
                                const o = this.util,
                                    a = `${t}-field`,
                                    r = [a, `${a}-col-1`, `edit-${a}`],
                                    c = o.createDiv(r),
                                    l = o.createDiv([`${t}-key`, "with-margin"]),
                                    { id: h, displayType: d, placeholder: p, required: u, clientErrorMessage: g, serverErrorMessage: m, autoSubmit: f } = e;
                                let b, v;
                                switch (((l.innerText = e.label), c.appendChild(l), d)) {
                                    case dt.a.SingleSelect:
                                        const a = e;
                                        if (((v = a.defaultValue), v && (this._submittedFields[h] = v), "radioGroup" === a.layoutStyle)) {
                                            const e = o.createElement("form", [`${t}-value`, "form-container", "col"]);
                                            o.setAttributes(e, { id: h, ariaLabel: d, errorMsg: g }),
                                                a.options.forEach((t) => {
                                                    const i = o.createInputElement({ type: "radio", name: h, value: t.label, required: u, checked: t.value === v }, ["radio-input"]);
                                                    i.onchange = () => {
                                                        i.checked && (this._submittedFields[h] = t.value), this.partialSubmit(h, f);
                                                    };
                                                    const s = o.createElement("label");
                                                    (s.innerText = t.label), s.prepend(i), e.appendChild(s);
                                                }),
                                                this._inputElements.push(e),
                                                c.appendChild(e),
                                                this.renderErrorMessage(e, m);
                                        } else {
                                            const e = o.createElement("select", [`${t}-value`]),
                                                i = o.createElement("option"),
                                                s = {};
                                            o.setAttributes(e, { id: h, required: u, errorMsg: g }),
                                                (e.style.backgroundImage = `url("data:image/svg+xml;utf8,${encodeURI(K)}")`),
                                                (i.hidden = !0),
                                                (i.label = p),
                                                e.appendChild(i),
                                                a.options.forEach((t) => {
                                                    const i = o.createElement("option");
                                                    o.setAttributes(i, { label: t.label, value: t.label, selected: t.value === v }), (s[t.label] = t.value), e.appendChild(i);
                                                }),
                                                (e.onchange = () => {
                                                    (this._submittedFields[h] = s[e.value]), this.partialSubmit(h, f);
                                                }),
                                                this._inputElements.push(e),
                                                c.appendChild(e),
                                                this.renderErrorMessage(e, m);
                                        }
                                        break;
                                    case dt.a.MultiSelect:
                                        const r = e;
                                        if (((v = r.defaultValue), (this._submittedFields[h] = v || []), "checkboxes" === r.layoutStyle)) {
                                            const e = o.createElement("form", [`${t}-value`, "form-container", "col"]);
                                            o.setAttributes(e, { id: h, ariaLabel: d, errorMsg: g, ariaRequired: u ? "true" : "" }),
                                                r.options.forEach((t) => {
                                                    const i = o.createInputElement({ type: "checkbox", name: h, value: t.label, checked: null == v ? void 0 : v.includes(t.value), required: u }, ["radio-input"]),
                                                        s = o.createElement("label");
                                                    (s.innerText = t.label),
                                                        s.prepend(i),
                                                        (i.onchange = () => {
                                                            if (i.checked) this._submittedFields[h].push(t.value);
                                                            else {
                                                                const e = this._submittedFields[h];
                                                                e.splice(e.indexOf(t.value), 1);
                                                            }
                                                            this.partialSubmit(h, f);
                                                        }),
                                                        e.appendChild(s);
                                                }),
                                                this._inputElements.push(e),
                                                c.appendChild(e),
                                                this.renderErrorMessage(e, m);
                                        } else {
                                            const e = o.createDiv([`${t}-value`, "text-field-container"]),
                                                i = o.createElement("ul", ["selected-options"]),
                                                s = o.createElement("ul", ["popup", "multi-select-list"]);
                                            e.setAttribute("aria-expanded", "false"),
                                                (e.onclick = () => {
                                                    var t;
                                                    "true" === e.getAttribute("aria-expanded")
                                                        ? (e.setAttribute("aria-expanded", "false"), o.removeCSSClass(s, "expand"))
                                                        : (e.setAttribute("aria-expanded", "true"), o.addCSSClass(s, "expand"), null === (t = s.firstElementChild) || void 0 === t || t.focus());
                                                }),
                                                e.setAttribute("aria-required", u ? "true" : ""),
                                                e.setAttribute("data-error", g),
                                                r.options.forEach((t) => {
                                                    const n = (e) => {
                                                            const n = o.createDiv(["multi-select-option"]);
                                                            n.innerText = t.label;
                                                            const a = o.createImageIcon({ icon: X, title: "optClose", iconCss: ["opt-close"] });
                                                            (a.onclick = (o) => {
                                                                o.stopPropagation(), i.removeChild(n), s.appendChild(e);
                                                                const a = this._submittedFields[h];
                                                                a.splice(a.indexOf(t.value), 1);
                                                            }),
                                                                n.appendChild(a),
                                                                (n.onclick = (e) => {
                                                                    e.stopPropagation();
                                                                }),
                                                                i.appendChild(n);
                                                        },
                                                        a = o.createListItem(t.label, t.label, t.label, "", "", (i) => {
                                                            let a = i.target;
                                                            "LI" !== a.tagName && (a = a.parentElement),
                                                                e.removeAttribute("aria-expanded"),
                                                                o.removeCSSClass(s, "expand"),
                                                                s.removeChild(a),
                                                                this._submittedFields[h].push(t.value),
                                                                n(a),
                                                                this.partialSubmit(h, f);
                                                        });
                                                    (a.onkeydown = (t) => {
                                                        this.onMenuClick(t, a, s, e);
                                                    }),
                                                        (null == v ? void 0 : v.includes(t.value)) ? n(a) : s.appendChild(a);
                                                }),
                                                e.appendChild(i),
                                                this._inputElements.push(e),
                                                c.appendChild(e),
                                                c.appendChild(s),
                                                this.renderErrorMessage(e, m);
                                        }
                                        break;
                                    case dt.a.Toggle:
                                        const l = e,
                                            w = o.createElement("label", [`${t}-value`, "toggle"]);
                                        b = o.createInputElement({ id: h, placeholder: p, required: u, type: "checkbox", checked: l.defaultValue === l.valueOn, errorMsg: g, valueOn: l.valueOn, valueOff: l.valueOff });
                                        const x = l.labelOn || l.valueOn,
                                            C = l.labelOff || l.valueOff;
                                        b.setAttribute("aria-label", b.checked ? x : C),
                                            this.renderErrorMessage(b.parentElement, m),
                                            (b.oninput = () => {
                                                b.setAttribute("aria-label", b.checked ? x : C), this.partialSubmit(h, f);
                                            }),
                                            w.appendChild(b),
                                            w.appendChild(o.createDiv(["round-slider"])),
                                            c.appendChild(w);
                                        break;
                                    case dt.a.DatePicker:
                                        const S = e;
                                        b = o.createInputElement({ type: "date", id: h, placeholder: p, required: u, defaultValue: S.defaultValue, min: S.minDate, max: S.maxDate, errorMsg: g }, [`${t}-value`]);
                                        break;
                                    case dt.a.TimePicker:
                                        const y = e;
                                        b = o.createInputElement({ type: "time", id: h, placeholder: p, required: u, defaultValue: y.defaultValue, min: y.minTime, max: y.maxTime, errorMsg: g }, [`${t}-value`]);
                                        break;
                                    case dt.a.TextInput:
                                        const k = e;
                                        if (k.multiLine) {
                                            const e = o.createElement("textarea", [`${t}-value`]);
                                            o.setAttributes(e, { id: h, required: u, minLength: k.minLength, maxLength: k.maxLength, defaultValue: k.defaultValue, placeholder: k.placeholder, errorMsg: g }),
                                                (e.oninput = () => {
                                                    (e.style.height = "auto"), (e.style.height = `${e.scrollHeight}px`), this.partialSubmit(h, f);
                                                }),
                                                c.appendChild(e),
                                                this._inputElements.push(e),
                                                this.renderErrorMessage(e, m);
                                        } else
                                            b = o.createInputElement(
                                                {
                                                    type: k.inputStyle || "text",
                                                    id: h,
                                                    placeholder: p,
                                                    required: u,
                                                    defaultValue: k.defaultValue,
                                                    errorMsg: g,
                                                    minLength: k.minLength,
                                                    maxLength: k.maxLength,
                                                    pattern: k.validationRegularExpression,
                                                },
                                                [`${t}-value`]
                                            );
                                        break;
                                    case dt.a.NumberInput:
                                        const _ = e;
                                        b = o.createInputElement(
                                            {
                                                type: "number",
                                                id: h,
                                                placeholder: p,
                                                required: u,
                                                defaultValue: null === (i = _.defaultValue) || void 0 === i ? void 0 : i.toString(),
                                                min: null === (s = _.minValue) || void 0 === s ? void 0 : s.toString(),
                                                max: null === (n = _.maxValue) || void 0 === n ? void 0 : n.toString(),
                                                errorMsg: g,
                                            },
                                            [`${t}-value`]
                                        );
                                }
                                return b && ("checkbox" !== b.type && (c.appendChild(b), this.renderErrorMessage(b, m), f && (b.oninput = () => this.partialSubmit(h, f))), this._inputElements.push(b)), c;
                            }
                            onMenuClick(e, t, i, s) {
                                var n, o, a, r;
                                let c = !1;
                                if (!(e.ctrlKey || e.altKey || e.metaKey)) {
                                    if (e.shiftKey && e.code === Se.KeyCode.Tab) s.click();
                                    else
                                        switch (e.code) {
                                            case Se.KeyCode.Return:
                                            case Se.KeyCode.Space:
                                                t.click(), (c = !0);
                                                break;
                                            case Se.KeyCode.Esc:
                                            case Se.KeyCode.Tab:
                                                s.click(), e.code === Se.KeyCode.Esc && (s.focus(), (c = !0));
                                                break;
                                            case Se.KeyCode.Up:
                                                null === (n = t.previousElementSibling || i.lastElementChild) || void 0 === n || n.focus(), (c = !0);
                                                break;
                                            case Se.KeyCode.Down:
                                                null === (o = t.nextElementSibling || i.firstElementChild) || void 0 === o || o.focus(), (c = !0);
                                                break;
                                            case Se.KeyCode.Home:
                                            case Se.KeyCode.PageUp:
                                                null === (a = i.firstElementChild) || void 0 === a || a.focus(), (c = !0);
                                                break;
                                            case Se.KeyCode.End:
                                            case Se.KeyCode.PageDown:
                                                null === (r = i.lastElementChild) || void 0 === r || r.focus(), (c = !0);
                                        }
                                    c && (e.stopPropagation(), e.preventDefault());
                                }
                            }
                            partialSubmit(e, t) {
                                t &&
                                    this._submitFormAction.getEventPayload().then((t) => {
                                        const i = (0, T.o)(Object.assign(Object.assign({}, t), { submittedFields: this.getSubmittedFields(), partialSubmitField: e, type: T.i.FormSubmission }));
                                        this._options.webCore.sendMessage(i, { sdkMetadata: { version: U } }).then(() => {
                                            "none" !== this.settings.disablePastActions && this.disableActions();
                                        });
                                    });
                            }
                            renderErrorMessage(e, t, i = !1) {
                                if (t) {
                                    const s = this.util.createElement("span", ["field-error", i ? "form-error" : ""]),
                                        n = this.util.createImageIcon({ icon: te, title: "error", iconCss: ["form-error-icon"] }),
                                        o = this.util.createElement("span", ["error-text"]);
                                    (o.innerText = t), s.appendChild(n), s.appendChild(o), i || e.parentElement.classList.add(`${this.cssPrefix}-error`), e.parentElement.appendChild(s), this._errorElems.push(s);
                                }
                            }
                        }
                        const bt = 100;
                        class vt extends pt {
                            getContent() {
                                const e = this.util,
                                    t = this._payload,
                                    i = xt(t.headings),
                                    s = "table-message",
                                    n = e.createDiv([`${s}-wrapper`]),
                                    o = e.createElement("table", [s]);
                                n.appendChild(o);
                                const a = e.createElement("tr", [`${s}-headings`]);
                                return (
                                    i.forEach((t) => {
                                        const i = wt(e, [`${s}-heading`], t.width, t.alignment);
                                        (i.innerText = t.label), a.appendChild(i);
                                    }),
                                    o.appendChild(a),
                                    t.rows.forEach((t) => {
                                        const n = e.createElement("tr", [`${s}-row`]);
                                        t.fields.forEach((t, o) => {
                                            const a = wt(e, [`${s}-item`], i[o].width, t.alignment);
                                            if ("link" === t.displayType) {
                                                const i = t,
                                                    s = e.createDiv(),
                                                    n = e.createElement("a", i.linkLabel ? [] : ["ellipsis"]);
                                                (n.href = t.value),
                                                    (n.innerText = i.linkLabel || b(t.value) || ""),
                                                    n.setAttribute("target", "_blank"),
                                                    s.appendChild(n),
                                                    this.settings.linkHandler ? g(s, this.settings.linkHandler) : this.settings.openLinksInNewWindow && m(s),
                                                    a.appendChild(n);
                                            } else a.innerText = t.value || "";
                                            n.appendChild(a);
                                        }),
                                            o.appendChild(n);
                                    }),
                                    super.getContent(n)
                                );
                            }
                        }
                        function wt(e, t, i, s) {
                            const n = e.createElement("td", t);
                            return (n.style.textAlign = s), (n.style.width = `${i}%`), n;
                        }
                        function xt(e) {
                            let t;
                            if (e.every((e) => !e.width || (e.width >= 0 && e.width <= bt))) {
                                let i = 0,
                                    s = 0;
                                if (
                                    (e.forEach((e) => {
                                        e.width ? (s += e.width) : i++;
                                    }),
                                    i)
                                )
                                    if (s < bt) {
                                        const n = (bt - s) / i;
                                        t = e.map((e) => (e.width || (e.width = n), e));
                                    } else t = Ct(e);
                                else if (s === bt) t = e;
                                else {
                                    const i = bt / s;
                                    t = e.map((e) => ((e.width = e.width * i), e));
                                }
                            } else t = Ct(e);
                            return t;
                        }
                        function Ct(e) {
                            const t = bt / e.length;
                            return e.map((e) => ((e.width = t), e));
                        }
                        class St extends pt {
                            getContent() {
                                const e = this.util,
                                    t = this._payload;
                                t.headings.push({ alignment: "center", label: "" });
                                const i = xt(t.headings),
                                    s = "table-message",
                                    n = e.createDiv([`${s}-wrapper`]),
                                    o = e.createElement("table", [s, "tableform-message"]);
                                n.appendChild(o);
                                const a = e.createElement("tr", [`${s}-headings`]);
                                return (
                                    i.forEach((t) => {
                                        const i = wt(e, [`${s}-heading`], t.width, t.alignment);
                                        (i.innerText = t.label), a.appendChild(i);
                                    }),
                                    o.appendChild(a),
                                    (a.lastElementChild.style.width = "32px"),
                                    t.rows.forEach((n, a) => {
                                        const r = e.createElement("tr", [`${s}-row`]);
                                        n.fields.forEach((t, n) => {
                                            const o = wt(e, [`${s}-item`], i[n].width, t.alignment);
                                            if ("link" === t.displayType) {
                                                const i = t,
                                                    s = e.createElement("a", i.linkLabel ? [] : ["ellipsis"]);
                                                (s.href = t.value), (s.innerText = i.linkLabel || b(t.value) || ""), o.appendChild(s);
                                            } else o.innerText = t.value || "";
                                            r.appendChild(o);
                                        }),
                                            t.formColumns > 2 && (t.formColumns = 2);
                                        const c = t.forms[a],
                                            l = wt(e, [`${s}-item`, "button-cell"]),
                                            h = e.createIconButton({ css: [`${s}-item`, `${s}-item-form-toggle`], icon: K, iconCss: [], title: c.title || "" });
                                        l.appendChild(h), r.appendChild(l);
                                        const d = "none",
                                            p = "rotate-180",
                                            [u, g] = gt(e, c, t.formColumns, this.settings, this.handleOnActionClick.bind(this), this._options);
                                        (this._actions = this._actions.concat(g)), e.addCSSClass(u, d);
                                        let m = !1;
                                        (r.onclick = () => {
                                            m ? (e.addCSSClass(u, d), e.removeCSSClass(h, p)) : (e.removeCSSClass(u, d), e.addCSSClass(h, p)), (m = !m);
                                        }),
                                            o.appendChild(r),
                                            o.appendChild(u);
                                    }),
                                    super.getContent(n)
                                );
                            }
                        }
                        function yt(e) {
                            return !!e.source;
                        }
                        function kt(e) {
                            if (e.msgId) return e.msgId;
                            const t = e.messagePayload;
                            let i = t.type;
                            switch (t.type) {
                                case T.i.Text:
                                    i = `${i}${t.text.substring(0, 10)}`;
                                    break;
                                case T.i.Card:
                                    i = `${i}${t.cards[0].title.substring(0, 10)}`;
                                    break;
                                case T.i.Attachment:
                                    i = `${i}${t.attachment.url.substring(0, 20)}`;
                                    break;
                                case T.i.Location:
                                    const e = t.location;
                                    i = `${i}${e.latitude}${e.latitude}`;
                            }
                            return i;
                        }
                        class _t {
                            static fromMessage(e, t, i, s) {
                                let n, o;
                                yt(i) ? ((n = _.LEFT), (o = i.source || T.l.Bot)) : ((n = _.RIGHT), i.messagePayload.type === T.i.Postback && (i = (0, T.o)({ text: i.messagePayload.text, type: T.i.Text })));
                                const a = i.messagePayload;
                                switch (a.type) {
                                    case T.i.Text:
                                        return a.channelExtensions && "stars" === a.channelExtensions.displayType ? new ht(e, t, a, n, o, s) : new lt(e, t, a, n, o, s);
                                    case T.i.Attachment:
                                        return new nt(e, t, a, n, o, s);
                                    case T.i.Card:
                                        return new at(e, t, a, n, o, s);
                                    case T.i.Location:
                                        return new rt(e, t, a, n, o, s);
                                    case T.i.Table:
                                        return new vt(e, t, a, n, o, s);
                                    case T.i.Form:
                                        return new ut(e, t, a, n, o, s);
                                    case T.i.TableForm:
                                        return new St(e, t, a, n, o, s);
                                    case T.i.EditForm:
                                        return new ft(e, t, a, n, o, s);
                                    case T.i.Raw:
                                        return new ct(e, t, a, n, o, s);
                                    default:
                                        throw Error(`Wrong message payload type:${a.type}`);
                                }
                            }
                        }
                        class Tt {
                            constructor(e) {
                                this.util = e;
                            }
                            render() {
                                const e = this.util.createDiv(["spinner"]);
                                return (e.innerHTML = '<svg viewBox="0 0 64 64"><circle transform="translate(32,32)" r="26"></circle></svg>'), e;
                            }
                        }
                        class It {
                            constructor(e, t, i, s) {
                                (this.text = e), (this.side = t), (this.settings = i), (this.util = s);
                            }
                            render() {
                                const e = this.util,
                                    t = this.settings.icons,
                                    i = e.createDiv(["attachment"]),
                                    s = this.side === _.LEFT ? t.avatarBot : t.avatarUser,
                                    n = e.createDiv(["attachment-footer", "flex"]),
                                    o = e.createDiv(["attachment-title"]);
                                (o.innerText = this.text), n.appendChild(o);
                                const a = e.createDiv(["attachment-placeholder", "flex"]);
                                return a.appendChild(new Tt(e).render()), i.appendChild(a), i.appendChild(n), (this._element = e.getMessageBlock(this.side, i, s)), this._element;
                            }
                            remove() {
                                this._element.remove();
                            }
                        }
                        class At {
                            constructor(e, t, i, s, n, o = !0) {
                                (this.title = e), (this.text = t), (this.side = i), (this.settings = s), (this.util = n), (this.isError = o);
                            }
                            render(e) {
                                const t = this.util,
                                    i = this.settings.icons,
                                    s = "message",
                                    n = t.createDiv([`${s}-content`]),
                                    o = this.side === _.LEFT ? i.avatarBot : i.avatarUser;
                                if (e) {
                                    t.addCSSClass(n, `${s}-with-icon`);
                                    const i = t.createImageIcon({ icon: e, title: "" }),
                                        o = t.createDiv([`${s}-icon`]);
                                    o.appendChild(i), n.appendChild(o);
                                }
                                const a = t.createDiv([`${s}-text`]),
                                    r = t.createDiv([`${s}-title`]),
                                    c = t.createDiv([`${s}-description`]);
                                return (r.innerText = this.title), (c.innerText = this.text), a.appendChild(r), a.appendChild(c), n.appendChild(a), t.getMessageBlock(this.side, n, o, this.isError);
                            }
                        }
                        class Et {
                            constructor(e, t, i) {
                                (this.side = e), (this.settings = t), (this.util = i), (this.element = this.render()), (this.visible = !1);
                            }
                            append(e) {
                                this.isVisible() ||
                                    (e.appendChild(this.element),
                                    (this.visible = !0),
                                    this.timeoutID && clearTimeout(this.timeoutID),
                                    (this.timeoutID = window.setTimeout(() => {
                                        this.remove();
                                    }, 1e3 * this.settings.typingIndicatorTimeout)));
                            }
                            remove() {
                                this.isVisible() && (this.element.remove(), (this.visible = !1));
                            }
                            isVisible() {
                                return this.visible;
                            }
                            render() {
                                const e = this.util,
                                    t = this.settings,
                                    i = e.createDiv(["typing-cue-wrapper"]),
                                    s = t.icons.avatarBot;
                                if (t.icons.typingIndicator) {
                                    const s = t.icons.typingIndicator,
                                        n = t.i18n[t.locale].typingIndicator,
                                        o = e.createImageIcon({ icon: s, title: n });
                                    (o.style.height = t.chatBubbleIconHeight || o.style.height), (o.style.width = t.chatBubbleIconWidth || o.style.width), i.appendChild(o);
                                } else {
                                    const t = e.createDiv(["typing-cue"]);
                                    i.appendChild(t);
                                }
                                return e.getMessageBlock(this.side, i, s);
                            }
                            updateTypingCueIcon(e) {
                                const t = this.element.querySelector("svg") || this.element.querySelector("img");
                                t && ("img" === t.localName ? (t.alt = e) : t.setAttribute("aria-label", e));
                            }
                            setAgentTypingCue(e) {
                                (e.style.marginTop = "0px"), this.element.firstChild.replaceWith(e);
                            }
                        }
                        const Mt = ["no-referrer", "no-referrer-when-downgrade", "origin", "origin-when-cross-origin", "same-origin", "strict-origin", "strict-origin-when-cross-origin", "unsafe-url"],
                            Lt = [
                                "allow-downloads-without-user-activation",
                                "allow-downloads",
                                "allow-forms",
                                "allow-modals",
                                "allow-orientation-lock",
                                "allow-pointer-lock",
                                "allow-popups",
                                "allow-popups-to-escape-sandbox",
                                "allow-presentation",
                                "allow-same-origin",
                                "allow-scripts",
                                "allow-storage-access-by-user-activation",
                                "allow-top-navigation",
                                "allow-top-navigation-by-user-activation",
                            ],
                            Pt = "none",
                            Dt = "webview-container",
                            Ot = `${Dt}-open`,
                            Rt = `${Dt}-close`;
                        class Bt {
                            constructor(e, t, i) {
                                (this.util = t),
                                    (this.settings = i),
                                    (this.heightRatio = 0.8),
                                    (this.props = { closeButtonIcon: X, closeButtonType: "icon", errorInfoBar: !0, referrerPolicy: "no-referrer-when-downgrade", sandbox: [], size: "tall" }),
                                    (this.isOpen = !1),
                                    (this.isErrorViewOpen = !1),
                                    this.setProps(e || {}),
                                    (this.cssPrefix = i.name);
                            }
                            setProps(e) {
                                Array.isArray(e.sandbox) && e.sandbox.length && (e.sandbox = e.sandbox.map((e) => e.toLowerCase()).filter((e) => Lt.indexOf(e) >= 0));
                                const t = Object.assign(Object.assign({}, this.props), e);
                                var i;
                                t.closeButtonIcon || (t.closeButtonIcon = this.props.closeButtonIcon),
                                    t.closeButtonType || (t.closeButtonType = "icon"),
                                    t.size || (t.size = "tall"),
                                    (i = t.referrerPolicy),
                                    Mt.indexOf(null == i ? void 0 : i.toLowerCase()) >= 0 || (t.referrerPolicy = "no-referrer-when-downgrade"),
                                    "full" === t.size && (this.heightRatio = 1),
                                    (this.props = t),
                                    (this.isOpen = !1),
                                    (this.isErrorViewOpen = !1);
                            }
                            open(e) {
                                if (this.component) {
                                    const t = this.util,
                                        i = 100;
                                    (this.component.style.height = i * this.heightRatio + "%"),
                                        t.removeCSSClass(this.component, Rt, Pt),
                                        t.addCSSClass(this.component, Ot),
                                        this.component.insertBefore(this.loadingIndicator, this.webView),
                                        (this.webView.onload = () => {
                                            this.loadingIndicator.remove(), t.removeCSSClass(this.webView, Pt);
                                        }),
                                        this.props.title || (this.title.textContent = e),
                                        this.props.errorInfoBar &&
                                            setTimeout(() => {
                                                this.isOpen &&
                                                    !this.isErrorViewOpen &&
                                                    ((this.errorView = this.createErrorView()),
                                                    e && (this.errorAltLink.href = e),
                                                    t.removeCSSClass(this.errorView, Pt),
                                                    this.component.appendChild(this.errorView),
                                                    (this.isErrorViewOpen = !0));
                                            }, 1e3),
                                        (this.isOpen = !0);
                                }
                            }
                            close() {
                                const e = this.util;
                                (this.isOpen = !1),
                                    e.removeCSSClass(this.component, Ot),
                                    e.addCSSClass(this.component, Rt),
                                    this.removeErrorView(),
                                    this.webView.setAttribute("src", ""),
                                    setTimeout(() => {
                                        e.addCSSClass(this.component, Pt), e.removeCSSClass(this.webView, Pt);
                                    }, 400);
                            }
                            render() {
                                const e = this.util,
                                    t = this.props;
                                return (
                                    (this.component = e.createDiv(["webview-container"])),
                                    (this.header = e.createDiv(["header", "webview-header", "flex"])),
                                    (this.title = e.createDiv(["title", "webview-title", "ellipsis"])),
                                    (this.closeButton = e.createIconButton({ css: ["header-button", "webview-button-close"], icon: t.closeButtonIcon, iconCss: [], title: t.closeButtonLabel })),
                                    (this.closeButton.id = `${this.cssPrefix}-webview-button-close`),
                                    (this.loadingIndicator = this.createLoadingIndicator()),
                                    (this.webView = e.createElement("iframe", ["webview"])),
                                    (this.webView.name = `${this.settings.name}-webview`),
                                    (this.webView.title = t.accessibilityTitle),
                                    t.title && (this.title.textContent = t.title),
                                    "label" === t.closeButtonType
                                        ? (this.closeButton.classList.add(`${this.cssPrefix}-label-only`), this.closeButton.appendChild(document.createTextNode(t.closeButtonLabel)))
                                        : "iconWithLabel" === t.closeButtonType && (this.closeButton.classList.add(`${this.cssPrefix}-with-label`), this.closeButton.appendChild(document.createTextNode(t.closeButtonLabel))),
                                    this.webView.setAttribute("referrerpolicy", t.referrerPolicy),
                                    this.props.sandbox.length &&
                                        this.props.sandbox.forEach((e) => {
                                            this.webView.sandbox.add(e);
                                        }),
                                    (this.closeButton.title = t.closeButtonLabel),
                                    e.addCSSClass(this.component, Pt),
                                    (this.closeButton.onclick = () => {
                                        this.close();
                                    }),
                                    this.header.appendChild(this.title),
                                    this.header.appendChild(this.closeButton),
                                    this.component.appendChild(this.header),
                                    this.component.appendChild(this.webView),
                                    this.component
                                );
                            }
                            createLoadingIndicator() {
                                return new Tt(this.util).render();
                            }
                            createErrorView() {
                                const e = this.util,
                                    t = e.createDiv(["webview-error", "flex"]);
                                (this.errorInfoText = e.createDiv(["webview-error-text"])), t.appendChild(this.errorInfoText), this.setErrorTextWithLink(this.props.errorInfoText);
                                const i = e.createIconButton({ css: ["webview-error-button-close"], icon: this.props.closeButtonIcon, iconCss: [], title: this.props.errorInfoDismissLabel });
                                return (i.onclick = this.removeErrorView.bind(this)), t.appendChild(i), t;
                            }
                            setErrorTextWithLink(e) {
                                var t;
                                const i = this.util,
                                    s = u(e);
                                let n;
                                const o = /\{0\}(.*)\{\/0\}/g,
                                    a = null === (t = o.exec(s)) || void 0 === t ? void 0 : t[1];
                                if (a) {
                                    const e = i.createAnchor("", a, ["webview-alt-link"]);
                                    n = s.replace(d(o), e.outerHTML);
                                } else n = i.createAnchor("", s, ["webview-alt-link"]).outerHTML;
                                (this.errorInfoText.innerHTML = n), (this.errorAltLink = this.errorInfoText.querySelector("a"));
                            }
                            removeErrorView() {
                                const e = this.util;
                                this.isErrorViewOpen &&
                                    (e.addCSSClass(this.errorView, Pt),
                                    setTimeout(() => {
                                        this.component.removeChild(this.errorView), (this.isErrorViewOpen = !1);
                                    }, 600));
                            }
                        }
                        const Vt = window.setTimeout,
                            Nt = window.setInterval,
                            zt = 36e5,
                            Ft = 864e5,
                            $t = "relTimeNow",
                            Ut = "relTimeMoment",
                            Ht = "relTimeMin",
                            jt = "relTimeHr";
                        class Wt {
                            constructor(e, t) {
                                (this.util = t), (this.i18n = e.i18n[e.locale]);
                                const i = e.icons,
                                    s = e.name,
                                    n = "-has-message-icon";
                                (this.cssPrefix = s), (this.cssSkill = `${s}-left ${i.avatarBot ? `${s}${n}` : ""}`), (this.cssUser = `${s}-right ${i.avatarUser ? `${s}${n}` : ""}`);
                            }
                            render() {
                                const e = this.util;
                                let t = this.element;
                                return t ? (t.setAttribute("aria-live", "off"), t.setAttribute("aria-hidden", "true")) : (t = e.createDiv()), (t.className = `${this.cssPrefix}-relative-timestamp ${this.css}`), (this.element = t), t;
                            }
                            setLocale(e) {
                                if (((this.i18n = e), this.key))
                                    switch (this.key) {
                                        case $t:
                                        case Ut:
                                            this.setTime(this.i18n[this.key]);
                                            break;
                                        case Ht:
                                        case jt:
                                            this.setTime(this.i18n[this.key].replace("{0}", `${this.counter}`));
                                    }
                            }
                            setRelativeTime(e) {
                                const t = new Date().getTime() - e.getTime(),
                                    i = Math.floor(t / 1e3),
                                    s = Math.floor(i / 60),
                                    n = Math.floor(s / 60),
                                    o = Math.floor(n / 24),
                                    a = Math.floor(o / 30),
                                    r = Math.floor(a / 12);
                                r > 0 ? this.setYears(r) : a > 0 ? this.setMonths(a) : o > 0 ? this.setDays(o) : n > 0 ? this.setHours(n) : s > 0 ? this.setMinutes(s) : this.setMoment(i);
                            }
                            refresh(e) {
                                (this.css = e === T.k.Skill ? this.cssSkill : this.cssUser), (this.element.className = `${this.cssPrefix}-relative-timestamp ${this.css}`), this.setNow();
                            }
                            remove() {
                                var e;
                                (null === (e = this.element) || void 0 === e ? void 0 : e.parentElement) && this.element.remove();
                            }
                            setNow() {
                                this.runTimeout($t, 1e4, this.setMoment.bind(this));
                            }
                            setMoment(e = 10) {
                                (e *= 1e3), this.runTimeout(Ut, 6e4 - e, this.setMinutes.bind(this));
                            }
                            setMinutes(e = 1) {
                                this.runTimer(this.i18n, Ht, 6e4, 60, this.setHours.bind(this), e);
                            }
                            setHours(e = 1) {
                                this.runTimer(this.i18n, jt, zt, 24, this.setDays.bind(this), e);
                            }
                            setDays(e = 1) {
                                this.runTimer(this.i18n, "relTimeDay", Ft, 30, this.setMonths.bind(this), e);
                            }
                            setMonths(e = 1) {
                                this.runTimer(this.i18n, "relTimeMon", 2592e6, 12, this.setYears.bind(this), e);
                            }
                            setYears(e = 1) {
                                this.runTimer(this.i18n, "relTimeYr", 31536e6, 60, () => {}, e);
                            }
                            runTimeout(e, t, i) {
                                this.resetTimer(),
                                    this.setTime(this.i18n[e]),
                                    (this.key = e),
                                    (this.updateTimer = Vt(() => {
                                        i();
                                    }, t));
                            }
                            runTimer(e, t, i, s, n, o = 1) {
                                this.resetTimer(),
                                    this.setTime(e[t].replace("{0}", `${o}`)),
                                    (this.key = t),
                                    (this.counter = o),
                                    (this.updateTimer = Nt(() => {
                                        o++, (this.counter = o), o > s ? (clearInterval(this.updateTimer), n()) : this.setTime(e[t].replace("{0}", `${o}`));
                                    }, i));
                            }
                            setTime(e) {
                                this.element.innerText = e;
                            }
                            resetTimer() {
                                clearTimeout(this.updateTimer), clearInterval(this.updateTimer);
                            }
                        }
                        class Gt {
                            constructor(e, t) {
                                let i, s;
                                if (
                                    ((this.config = t),
                                    (this.isTTSEnabled = !0),
                                    (this.isVoiceEnabled = !0),
                                    (this.renderAsListItem = !1),
                                    (this.recognitionLocaleMap = {}),
                                    (this.synthesisLocaleVoiceMap = {}),
                                    (this.supportedLangList = []),
                                    (this.core = t.webCore),
                                    (this.settings = t.settings),
                                    (this.localizedText = this.settings.i18n[this.settings.locale]),
                                    (this.cssPrefix = t.settings.name),
                                    e &&
                                        ((this.langOptions = Object.assign(Object.assign({}, e), { supportedLangs: e.supportedLangs ? [...e.supportedLangs] : [] })),
                                        (i = this.langOptions.supportedLangs),
                                        (s = this.langOptions.primary),
                                        "string" == typeof s && (this.langOptions.primary = s.toLowerCase())),
                                    i && i.length)
                                )
                                    if (
                                        (i.forEach((e) => {
                                            e.lang = e.lang.toLowerCase();
                                        }),
                                        i.length > 1 ? this.langOptions.primary || (this.langOptions.primary = null) : (this.langOptions.primary = i[0].lang),
                                        (this.supportedLangList = i.map((e) => e.lang)),
                                        this.settings.enableBotAudioResponse)
                                    ) {
                                        const e = t.synthesisVoices;
                                        if (e && e.length) {
                                            const t = {};
                                            i.forEach((i) => {
                                                const s = e.find((e) => e.lang.indexOf(i.lang) >= 0);
                                                s && (t[i.lang] = s);
                                            }),
                                                (this.synthesisLocaleVoiceMap = t);
                                        }
                                    } else this.updateSynthesis = () => {};
                                if (this.settings.enableSpeech) {
                                    const e = {};
                                    a(T.j).forEach((t) => {
                                        (e[t.substring(0, 2)] = t), (e[t] = t);
                                    }),
                                        Kt(T.j.EN_GB, e),
                                        Kt(T.j.EN_AU, e),
                                        Kt(T.j.EN_IN, e),
                                        (this.recognitionLocaleMap = e);
                                } else this.updateRecognition = () => {};
                            }
                            render(e) {
                                const t = this.config.util,
                                    i = this.cssPrefix,
                                    s = "language-selection",
                                    n = `${i}-${s}-button`,
                                    o = `${i}-${s}-menu`,
                                    a = this.langOptions;
                                let r;
                                if (((this.renderAsListItem = e), !(a && a.supportedLangs && a.supportedLangs.length >= 2))) return null;
                                if (!this.component) {
                                    const i = this.settings.icons.language || ae,
                                        c = t.createIconButton({ css: ["header-button", "button-lang"], icon: i, iconCss: [], title: this.localizedText.languageSelectDropdown }),
                                        l = t.createListItem("action-menu-option-lang", this.localizedText.languageSelectDropdown, "lang", i, "action-item", null, !0),
                                        h = a.supportedLangs.map((e) => {
                                            const i = e.label,
                                                n = e.lang;
                                            return t.createListItem(`${s}-option-${n}`, i, n, "", `${s}-option`, (e) => {
                                                let t = e.target;
                                                "LI" !== t.tagName && (t = t.parentElement);
                                                const i = t.dataset.value;
                                                this.selectLanguage(i);
                                            });
                                        }),
                                        d = t.getMenu({ menuId: o, menuClassList: [`${s}-menu`], menuItems: h, buttonId: n, menuButton: e ? l : c });
                                    if (e) {
                                        r = t.getMenuButton({ button: l, menuId: o, menu: d });
                                        const e = t.createDiv(["arrow-icon"]),
                                            i = t.createImageIcon({
                                                icon:
                                                    '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M6 9L11.9746 15L18 9H6Z" fill="#161513"/></svg>',
                                                title: "",
                                            });
                                        e.appendChild(i), r.appendChild(e), this.config.chatWidget.chatWidgetDiv.appendChild(d);
                                    } else {
                                        r = t.createDiv();
                                        const e = t.getMenuButton({ button: c, menuId: o, menu: d });
                                        r.appendChild(e), r.appendChild(d), (c.id = n);
                                    }
                                    this.disableComponent(!1);
                                }
                                return (this.component = r), r;
                            }
                            setLocale(e) {
                                this.component &&
                                    this.langOptions.supportedLangs.forEach((t) => {
                                        const i = t.lang,
                                            s = document.getElementById(`language-selection-option-${i}`),
                                            n = s.querySelector("span"),
                                            o = t.label || e[`language_${"und" === i ? "detect" : i}`] || t.lang;
                                        (s.title = o), (n.innerText = o);
                                    });
                            }
                            setTag(e, t = !0) {
                                let i = "";
                                null !== e && (i = e.toLowerCase()), this.supportedLangList.length && (i = this.supportedLangList.indexOf(i) >= 0 ? i : null), this.selectLanguage(i, t);
                            }
                            disableComponent(e) {
                                if (this.component) {
                                    const t = this.config.util,
                                        i = this.component;
                                    if (this.renderAsListItem) {
                                        const s = "disable";
                                        e ? t.addCSSClass(i, s) : t.removeCSSClass(i, s);
                                    } else i.querySelector("button").disabled = e;
                                }
                            }
                            selectLanguage(e, t = !0) {
                                let i = e;
                                (this.localizedText = this.settings.i18n[i]),
                                    this.component && this.updateActiveLocale(i),
                                    "und" === i && (i = null),
                                    t && (this.updateProfile(i), this.config.storageService.setItem(qt(this.settings), i)),
                                    this.updateSynthesis(i),
                                    this.updateRecognition(i),
                                    this.config.chatWidget.onLanguageUpdate(i, t),
                                    this.currentTag !== i && ((this.currentTag = i), this.config.eventDispatcher.trigger(s.CHAT_LANG, i));
                            }
                            updateProfile(e) {
                                if (this.core.isConnected()) {
                                    const t = { profile: { languageTag: e } };
                                    e || (t.profile.locale = e), this.core.updateUser(t, { sdkMetadata: { version: U } });
                                }
                            }
                            updateSynthesis(e) {
                                const t = this.config.chatWidget;
                                if (e) {
                                    if ((this.isTTSEnabled || (t.enableSpeechSynthesisService(!0), (this.isTTSEnabled = !0)), this.settings.enableBotAudioResponse)) {
                                        const t = this.synthesisLocaleVoiceMap[e] || { lang: e };
                                        this.core.setTTSVoice([t]);
                                    }
                                } else (this.isTTSEnabled = !1), this.settings.enableBotAudioResponse && this.core.cancelTTS(), t.enableSpeechSynthesisService(!1);
                            }
                            updateRecognition(e) {
                                const t = this.config,
                                    i = this.recognitionLocaleMap[e],
                                    s = t.chatWidget;
                                i
                                    ? (this.isVoiceEnabled || (s.setVoiceRecognitionService(!0), (this.isVoiceEnabled = !0)), this.core.setRecognitionLocale(i))
                                    : ((this.isVoiceEnabled = !1), this.core.stopRecognition(), this.core.setRecognitionLocale(null), s.setVoiceRecognitionService(!1));
                            }
                            updateActiveLocale(e) {
                                const t = this.config.util,
                                    i = e || "und",
                                    s = document.getElementById(`${this.cssPrefix}-language-selection-menu`),
                                    n = "active";
                                if (s) {
                                    const e = s.querySelector(`li.${this.cssPrefix}-${n}`);
                                    e && t.removeCSSClass(e, n);
                                    const o = s.querySelector(`[data-value="${i}"]`);
                                    o && t.addCSSClass(o, n);
                                }
                            }
                            initLanguage() {
                                const { primary: e } = this.langOptions || {},
                                    t = this.config.storageService.getItem(qt(this.settings));
                                let i = e;
                                t && (i = "null" === t ? null : t), void 0 !== i && this.setTag(i);
                            }
                        }
                        function qt(e) {
                            return `${e.name}-${e.channelId}-${e.userId}`;
                        }
                        function Kt(e, t) {
                            navigator.language.toLowerCase() === e && (t[e.substring(0, 2)] = e);
                        }
                        class Yt {
                            constructor(e) {
                                (this.getItem = (e) => (!this.cache[e] && this.isStorage && (this.cache[e] = this.storage.getItem(e)), this.cache[e])),
                                    (this.setItem = (e, t) => {
                                        this.isStorage ? (this.storage.setItem(e, t), delete this.cache[e]) : (this.cache[e] = t);
                                    }),
                                    (this.removeItem = (e) => {
                                        this.isStorage && this.storage.removeItem(e), delete this.cache[e];
                                    }),
                                    (this.cache = {}),
                                    n(e) ? ((this.isStorage = !0), (this.storage = window[e])) : (this.isStorage = !1);
                            }
                        }
                        const Jt = window.BroadcastChannel,
                            Zt = "collapsed",
                            Xt = "expanded",
                            Qt = "none",
                            ei = window.setTimeout;
                        class ti extends Ve {
                            constructor(e, t, i, s, n, o, a, r, c, l, h, d) {
                                var p, u;
                                super(),
                                    (this.settings = e),
                                    (this.util = t),
                                    (this.connect = i),
                                    (this.openChat = s),
                                    (this.closeChat = n),
                                    (this.handleSessionEnd = o),
                                    (this.receivedMessage = a),
                                    (this.sentMessage = r),
                                    (this.getUnreadMessagesCount = c),
                                    (this.onConnectionStatusChange = l),
                                    (this._core = h),
                                    (this._eventDispatcher = d),
                                    (this.FINAL_RESULT_DISPLAY_TIMEOUT = 200),
                                    (this._logger = new R("ChatComponent")),
                                    (this._attachmentDivs = []),
                                    (this._unreadMsgCount = 0),
                                    (this._latestSkillMessages = []),
                                    (this._skillMessages = []),
                                    (this._isNewMessage = !0),
                                    (this.isTTSMute = !0),
                                    (this.isInitMessageSent = !1),
                                    (this.isExpanded = !1),
                                    (this.isFirstMessage = !0),
                                    (this.isResponseReceived = !1),
                                    (this.messageIDs = []),
                                    (this.cssPrefix = e.name),
                                    (this.currentLocale = e.locale),
                                    (this._localeText = e.i18n[e.locale]),
                                    (this.isOpen = !1),
                                    (this.isExpanded = "init" === (null === (p = e.initMessageOptions) || void 0 === p ? void 0 : p.sendAt) || e.openChatOnLoad || e.embedded),
                                    (this.isInitMessageSent = e.enableHeadless),
                                    (this._isFirstConnect = !0),
                                    (this.enableDefaultBotResponse = this.settings.enableDefaultClientResponse),
                                    this._configureStorage(),
                                    (this.lastMessageHasGlobalAction = !1);
                                const g = this.storageService.getItem(this._userAvatarStorageId);
                                if ((g && (e.icons.avatarUser = g), this.settings.enableEndConversation)) {
                                    const e = this._localeText;
                                    (this.endConversationPrompt = t.getBanner(
                                        {
                                            text: e.endConversationConfirmMessage || "",
                                            description: e.endConversationDescription || "",
                                            actions: [
                                                { label: e.noText, handler: this.closePrompt },
                                                { label: e.yesText, handler: this.endConversation, type: "filled" },
                                            ],
                                        },
                                        this
                                    )),
                                        t.addCSSClass(this.endConversationPrompt, "end-conversation-prompt");
                                }
                                this.settings.enableTabsSync || (this._initBroadcaster = () => {}),
                                    this._core.on(T.f.Open, () => this._sendInitMessages()),
                                    this._core.on(T.f.State, (e) => this._onChatServerStatusChange(e)),
                                    this._core.on(T.f.MessageReceived, (e) => this._onMessageReceived(e)),
                                    (this.element = this._createElement()),
                                    this.settings.enableBotAudioResponse && (this.isTTSMute = this.settings.initBotAudioMuted),
                                    this.settings.multiLangChat && this._initMultiLangChat(),
                                    "function" != typeof l && (this.onConnectionStatusChange = () => {}),
                                    this.settings.showTypingIndicator && (this.typingIndicator = new Et(_.LEFT, e, t)),
                                    !this.settings.enableTimestamp || ("relative" !== this.settings.timestampMode && "default" !== this.settings.timestampMode)
                                        ? ((this.setTimestampHeaderIfNewDate = () => {}), (this.updateRelativeTimestamp = () => {}))
                                        : (this.relativeTimestamp = new Wt(e, t)),
                                    "action" !== (null === (u = this.settings.focusOnNewMessage) || void 0 === u ? void 0 : u.toLowerCase()) && (this.focusMessageFirstAction = () => {});
                                const m = this.storageService.getItem(this._agentNameStorageId);
                                m && ((this.agentSession = JSON.parse(m)), this.setAgentTypingCue());
                            }
                            render(e) {
                                this._logger.info("Widget render", e);
                            }
                            embedInElement(e) {
                                const t = document.getElementById(e);
                                if (!t) throw new Error("Can not embed chat widget.");
                                this.util.addCSSClass(t, "wrapper", this.settings.theme, "embedded"), this.appendToElement(t);
                            }
                            showChat() {
                                if (!this.isOpen) {
                                    const e = this.util;
                                    e.removeCSSClass(this.element, Zt),
                                        e.addCSSClass(this.element, Xt),
                                        e.removeCSSClass(this.chatWidgetDiv, Qt),
                                        this.settings.embedded ||
                                            ei(() => {
                                                e.addCSSClass(this._botButton, Qt);
                                            }, 250),
                                        (this.isOpen = !0),
                                        (this.isExpanded = !0),
                                        this.updateNotificationBadge(0),
                                        this._scrollToBottom(),
                                        this.footer.focusTextArea(),
                                        this._sendInitMessages();
                                }
                            }
                            onClose() {
                                if (this.isOpen) {
                                    const e = this.util;
                                    this._ttsCancel(),
                                        e.removeCSSClass(this.element, Xt),
                                        e.addCSSClass(this.element, Zt),
                                        this.settings.embedded ||
                                            (e.removeCSSClass(this._botButton, Qt),
                                            ei(() => {
                                                e.addCSSClass(this.chatWidgetDiv, Qt), this._botButton.focus();
                                            }, 250),
                                            this.updateNotificationBadge(this.getUnreadMessagesCount())),
                                        (this.isOpen = !1);
                                }
                            }
                            sendExitEvent() {
                                const e = { messagePayload: { type: T.i.CloseSession }, userId: this.settings.userId };
                                if (this.settings.delegate && this.settings.delegate.beforeEndConversation && (0, Se.isFunction)(this.settings.delegate.beforeEndConversation))
                                    try {
                                        this.settings.delegate.beforeEndConversation(e).then((e) => {
                                            e && this.sendMessage(e, { hidden: !0, delegate: !1 });
                                        });
                                    } catch (e) {
                                        this._logger.error(e);
                                    }
                                else this.sendMessage(e, { hidden: !0, delegate: !1 });
                                this.isInitMessageSent = !1;
                            }
                            updateNotificationBadge(e) {
                                var t;
                                (this._unreadMsgCount = e),
                                    e > 0
                                        ? ((this._botNotificationBadge.innerText = `${e}`), this._botButton.appendChild(this._botNotificationBadge))
                                        : (null === (t = this._botNotificationBadge) || void 0 === t ? void 0 : t.parentElement) && this._botNotificationBadge.remove();
                            }
                            onToggleNarration(e) {
                                this._toggleNarration(e), this._eventDispatcher.trigger(s.CLICK_AUDIO_RESPONSE_TOGGLE, e);
                            }
                            remove() {
                                super.remove(), this.settings.embedded && window.removeEventListener("resize", this.resizeEventListener);
                            }
                            clearConversationHistory() {
                                this.clearMessages(this.settings.userId),
                                    this._clearChatPane(),
                                    this._broadcastAction({ type: "actionClearHistory" }),
                                    (this.lastMessageSenderType = null),
                                    this._stopDefaultMessages(),
                                    this.updateNotificationBadge(0);
                            }
                            clearMessages(e, t) {
                                const i = `${this.settings.name}-${e}-messages`;
                                (t ? window[t] : this.storageService).getItem(i) && this.storageService.removeItem(i);
                            }
                            clearAllMessage() {
                                const e = null === window || void 0 === window ? void 0 : window.localStorage,
                                    t = (null == e ? void 0 : e.length) || 0;
                                if (t) {
                                    const i = /oda-chat-.*-messages/g;
                                    for (let s = 0; s < t; s++) {
                                        const t = e.key(s);
                                        (null == t ? void 0 : t.match(i)) && e.removeItem(t);
                                    }
                                }
                            }
                            setUserInputMessage(e) {
                                this.footer.setUserInputText(e);
                            }
                            setUserInputPlaceholder(e) {
                                this.footer.setUserInputPlaceholder(e);
                            }
                            getWebViewComponent() {
                                return this.webViewComponent;
                            }
                            refreshWebView(e) {
                                this.webViewComponent.setProps(e), this.webViewElem.remove(), (this.webViewElem = this.webViewComponent.render()), this.chatWidgetDiv.appendChild(this.webViewElem);
                            }
                            onMessageActionClicked(e) {
                                switch ((this.onSpeechToggle(!1), e.type)) {
                                    case T.a.Postback:
                                        this._scrollToBottom(),
                                            e.getPayload().then((t) => {
                                                const i = (0, T.o)({ postback: t, text: e.label, type: T.i.Postback });
                                                this.sendMessage(i);
                                            });
                                        break;
                                    case T.a.Location:
                                        this._shareUserLocation();
                                        break;
                                    case T.a.Share:
                                        navigator.share
                                            ? e.getPayload().then((t) => {
                                                  navigator.share({ text: t, title: e.label }).then(() => this._disablePastActions([e.messageComponent]));
                                              })
                                            : this._showBanner(this._localeText.shareFailureMessage);
                                        break;
                                    case T.a.SubmitForm:
                                        const t = e.messageComponent;
                                        if (!t.validateForm()) break;
                                        this._scrollToBottom(),
                                            e.getPayload().then((e) => {
                                                const i = (0, T.o)(Object.assign(Object.assign({}, e), { submittedFields: t.getSubmittedFields(), type: T.i.FormSubmission }));
                                                this.sendMessage(i, { hidden: !0 });
                                            });
                                }
                            }
                            applyDelegates(e) {
                                var t;
                                const i = [T.i.Text, T.i.Location, T.i.Attachment, T.i.FormSubmission];
                                let s;
                                return (
                                    (s = "string" == typeof e ? (0, T.p)(e, null === (t = this.speechFinalResult) || void 0 === t ? void 0 : t.speechId) : (0, T.z)(e) ? (0, T.m)(e) : (0, T.y)(e) ? (0, T.o)(e) : e),
                                    i.indexOf(s.messagePayload.type) >= 0 && this.settings.delegate.beforeSend && (0, Se.isFunction)(this.settings.delegate.beforeSend)
                                        ? (s = this._executeSendDelegate(s, this.settings.delegate.beforeSend))
                                        : s.messagePayload.type === T.i.Postback &&
                                          this.settings.delegate.beforePostbackSend &&
                                          (0, Se.isFunction)(this.settings.delegate.beforePostbackSend) &&
                                          (s = this._executeSendDelegate(s, this.settings.delegate.beforePostbackSend)),
                                    s
                                );
                            }
                            sendMessage(e, t) {
                                return (
                                    this._stopDefaultMessages(),
                                    !this.settings.enableSpeechAutoSend &&
                                        this.speechFinalResult &&
                                        "string" == typeof e &&
                                        e.toLowerCase().indexOf(this.speechFinalResult.text.toLowerCase()) >= 0 &&
                                        (e = (0, T.p)(e, this.speechFinalResult.speechId)),
                                    this.footer.focusTextArea(),
                                    this._ttsCancel(),
                                    void 0 === (t = t || {}).delegate && (t.delegate = !0),
                                    t.delegate && this.settings.delegate && (e = this.applyDelegates(e)),
                                    e &&
                                        this._core.sendMessage(e, { sdkMetadata: { version: U } }).then((i) => {
                                            this._logger.debug("onMessageSent", e),
                                                this.getAgentDetails() || this.showTypingIndicator(),
                                                this.sentMessage(i),
                                                this._onSendMessage(),
                                                (this.isResponseReceived = !1),
                                                this.enableDefaultBotResponse && this.startDefaultResponseTimer(),
                                                (this.speechFinalResult = null),
                                                (null == t ? void 0 : t.hidden) ? (this.lastMessageSenderType = T.k.User) : this._onMessageSent(i);
                                        })
                                );
                            }
                            uploadFile(e, t) {
                                const i = this._localeText;
                                this._ttsCancel(), this._onSendMessage();
                                const s = new Promise((s, n) => {
                                    var o, a;
                                    if (this.settings.enableHeadless)
                                        this._core
                                            .uploadAttachment(e, { sdkMetadata: { version: U } })
                                            .then((e) => this._core.sendMessage(this.settings.delegate ? this.applyDelegates(e) : e, { sdkMetadata: { version: U } }))
                                            .then((e) => {
                                                s(e);
                                            })
                                            .catch((e) => {
                                                n(e);
                                            });
                                    else {
                                        this._scrollToBottom();
                                        const r = `${null === (o = e.name) || void 0 === o ? void 0 : o.replace(/[\s:'"\\/[\]~,.;^`()@#%*+=$&!{}?<>|]/g, "")}${Math.floor(1e4 + 9e4 * Math.random())}${Date.now() % 1e5}`,
                                            c = this.util.createDiv();
                                        (c.id = r), this._attachmentDivs.push({ divId: r, fileName: e.name }), this.setTimestampHeaderIfNewDate(new Date()), this._appendMessageToConversation(c);
                                        const l = t ? t.maxSize : j;
                                        if (e.size > l) {
                                            this._scrollToBottom();
                                            const t = l / 1048576;
                                            let s = t.toString();
                                            ("number" == typeof (a = t) && isFinite(a) && Math.floor(a) === a) || (s = t.toFixed(3));
                                            const o = `${e.name} - ${i.uploadFailed}`,
                                                c = i.uploadFileSizeLimitExceeded.replace("{0}", s);
                                            this._displayUploadError(o, c, r), this.updateRelativeTimestamp(T.k.User), n(new Error(c));
                                        } else if (0 === e.size) {
                                            this._scrollToBottom();
                                            const t = `${e.name} - ${i.uploadFailed}`,
                                                s = i.uploadFileSizeZeroByte;
                                            this._displayUploadError(t, s, r), this.updateRelativeTimestamp(T.k.User), n(new Error(s));
                                        } else {
                                            const t = new It(e.name, _.RIGHT, this.settings, this.util);
                                            this.updateRelativeTimestamp(T.k.User),
                                                c.appendChild(t.render()),
                                                this._scrollToBottom(),
                                                this._core
                                                    .uploadAttachment(e, { sdkMetadata: { version: U } })
                                                    .then((e) => this._core.sendMessage(this.settings.delegate ? this.applyDelegates(e) : e, { sdkMetadata: { version: U } }))
                                                    .then((t) => {
                                                        (t.messagePayload.attachment.title = e.name),
                                                            c.remove(),
                                                            (this._attachmentDivs = this._attachmentDivs.filter((e) => e.divId !== r)),
                                                            (this.isFirstMessage = !1),
                                                            this.sentMessage(t),
                                                            this._onMessageSent(t),
                                                            s(t);
                                                    })
                                                    .catch((t) => {
                                                        this._handleUploadError(e.name, t.message, r), n(t);
                                                    });
                                        }
                                    }
                                });
                                return (
                                    s.catch((e) => {
                                        this._logger.error(e);
                                    }),
                                    s
                                );
                            }
                            refreshTTS() {
                                this.header.showTTSButton(!!this.settings.ttsService);
                            }
                            getSuggestions(e) {
                                if (!this.settings.enableAutocompleteClientCache || (this.settings.enableAutocompleteClientCache && !this.footer.getSuggestionsValid()))
                                    return this._core.getSuggestions(e).then((e) => (this.footer.displaySuggestions(e), Promise.resolve(e)));
                                const t = this._filterSuggestions(this.footer.getSuggestions(), e);
                                return null !== this.footer && this.footer.displaySuggestions(t), Promise.resolve(t);
                            }
                            getUnreadMsgsCount() {
                                return this._unreadMsgCount;
                            }
                            getMessages() {
                                const e = this.storageService.getItem(this._chatStorageId);
                                return e ? JSON.parse(e).map((e) => Object.assign({}, e)) : [];
                            }
                            loadChat() {
                                const e = this.getMessages();
                                e.length && this.storageService.setItem(this._chatStorageId, JSON.stringify(e));
                            }
                            getAgentDetails() {
                                return this.agentSession;
                            }
                            setAgentDetails(e) {
                                (this.agentSession = Object.assign(Object.assign({}, this.agentSession), e)), this.setAgentTypingCue(), this.storageService.setItem(this._agentNameStorageId, JSON.stringify(this.agentSession));
                            }
                            setUserAvatar(e) {
                                (this.settings.icons.avatarUser = e),
                                    this.storageService.setItem(this._userAvatarStorageId, e),
                                    document.querySelectorAll(`.${this.cssPrefix}-right .${this.cssPrefix}-message-icon`).forEach((t) => {
                                        t.parentElement.replaceWith(this.getAvatar(e, this._localeText.avatarUser));
                                    });
                            }
                            _saveMessage(e) {
                                const t = this.getMessages();
                                t.length >= this.settings.messageCacheSizeLimit && t.splice(0, t.length - (this.settings.messageCacheSizeLimit - 1));
                                let i = JSON.stringify(e).substring(1, JSON.stringify(e).length - 1);
                                (i = `{${i}, "date":"${new Date()}"}`), t.push(JSON.parse(i)), this.storageService.setItem(this._chatStorageId, JSON.stringify(t));
                            }
                            _configureStorage() {
                                const e = this.settings;
                                e.userId ? e.storageType !== Ne.LOCAL && e.storageType !== Ne.SESSION && (e.storageType = Ne.LOCAL) : (e.storageType = Ne.SESSION),
                                    (this._chatStorageId = `${e.name}-${e.userId}-messages`),
                                    (this._agentNameStorageId = `${e.name}-${e.userId}-agent-details`),
                                    (this._userAvatarStorageId = `${e.name}-${e.userId}-user-avatar`),
                                    (this.storageService = new Yt(e.storageType));
                            }
                            setVoiceRecognitionService(e) {
                                this.footer.disableVoiceModeButton(!e, { src: "lang" });
                            }
                            enableSpeechSynthesisService(e) {
                                this.header.disableTTSButton(!e);
                            }
                            onShareLocation() {
                                this._shareUserLocation();
                            }
                            setPrimaryChatLanguage(e) {
                                this.multiLangChat.setTag(e);
                            }
                            onLanguageUpdate(e, t = !0) {
                                const i = this.settings.i18n,
                                    s = Object.assign(Object.assign(Object.assign({}, i.en), i[this.settings.locale]), i[e]);
                                t && this._broadcastAction({ type: "actionLanguage", tag: e }),
                                    (this.currentLocale = e),
                                    (this._botButton.title = s.chatButtonTitle || s.chatTitle),
                                    this.header.setLocale(s),
                                    this.footer.setLocale(s),
                                    this.util.setLocale(s),
                                    this.typingIndicator.updateTypingCueIcon(s.avatarBot),
                                    document.querySelectorAll(`.${this.cssPrefix}-message-icon`).forEach((e) => {
                                        const t = e.parentElement.parentElement.className.indexOf(`${this.cssPrefix}-left`) < 0 ? s.avatarUser : s.avatarBot;
                                        "img" === e.localName ? (e.alt = t) : e.setAttribute("aria-label", t);
                                    }),
                                    this.webViewComponent.setProps({
                                        accessibilityTitle: s.webViewAccessibilityTitle,
                                        closeButtonLabel: s.webViewClose,
                                        errorInfoDismissLabel: s.webViewErrorInfoDismiss,
                                        errorInfoText: s.webViewErrorInfoText,
                                    }),
                                    this.multiLangChat && this.multiLangChat.setLocale(s),
                                    this.relativeTimestamp && this.relativeTimestamp.setLocale(s),
                                    (this._localeText = s);
                            }
                            showTypingIndicator() {
                                const e = document.getElementById(`${this.cssPrefix}-connection-error`);
                                e && e.remove(), this.settings.showTypingIndicator && (this.typingIndicator.append(this._conversationContainer), this._scrollToBottom());
                            }
                            hideTypingIndicator() {
                                this.settings.showTypingIndicator && this.typingIndicator.remove();
                            }
                            showConnectionError() {
                                const e = { type: T.i.Text, text: this._localeText.connectionFailureMessage, globalActions: [{ type: T.a.Postback, label: this._localeText.connectionRetryLabel }] },
                                    t = _t.fromMessage(this.settings, this.util, { messagePayload: e });
                                (t.onActionClick = () => {
                                    this.connect();
                                }),
                                    this.showMessage(`${this.cssPrefix}-connection-error`, t);
                            }
                            showMessage(e, t) {
                                var i;
                                const s = this.util.wrapMessageBlock(t.render(), this.settings.icons.avatarBot, _.LEFT);
                                (s.id = e), this._conversationContainer.appendChild(s), (null === (i = this.typingIndicator) || void 0 === i ? void 0 : i.isVisible()) && this.hideTypingIndicator();
                            }
                            showEndConversationPrompt() {
                                Re(this.chatPane.element, this.endConversationPrompt);
                            }
                            updateDefaultResponse(e) {
                                if (((this.isFirstMessage = !1), !this.isResponseReceived)) {
                                    const t = { source: T.l.Bot, messagePayload: { type: T.i.Text, text: e }, userId: this.settings.userId, msgId: `${Date.now()}` };
                                    this._saveMessage(t), this._renderMessagesAndScroll([t]);
                                }
                            }
                            startDefaultResponseTimer() {
                                const e = this._localeText;
                                this.defaultResponseTimer = ei(() => {
                                    this.isFirstMessage && this.updateDefaultResponse(e.defaultGreetingMessage),
                                        (this.defaultResponseInterval = window.setInterval(() => {
                                            this.updateDefaultResponse(e.defaultWaitMessage);
                                        }, this.settings.defaultWaitMessageInterval * W)),
                                        (this.waitMessageClearTimer = ei(() => {
                                            window.clearInterval(this.defaultResponseInterval);
                                        }, (this.settings.typingIndicatorTimeout - 1) * W)),
                                        (this.defaultResponseTimer = ei(() => {
                                            this.hideTypingIndicator(), this.updateDefaultResponse(e.defaultSorryMessage);
                                        }, this.settings.typingIndicatorTimeout * W));
                                }, this.settings.defaultGreetingTimeout * W);
                            }
                            endConversation() {
                                this.sendExitEvent(), this.closePrompt();
                            }
                            closePrompt() {
                                this.endConversationPrompt.querySelector(`.${this.cssPrefix}-prompt-banner-close-button`).click();
                            }
                            _onChatServerStatusChange(e) {
                                if ((this._isFirstConnect && (this._loadPreviousConversations(), (this._isFirstConnect = !1)), Number.isInteger(e) && e !== T.d.Open)) {
                                    this._stopBroadcaster(),
                                        this.footer.isDisabled() || (this.footer.disable(), this.header.disable(), this._logger.debug("WebSocket not open, send message button disabled")),
                                        this._onDisconnection(),
                                        e === T.d.Connecting ? this.showTypingIndicator() : this.hideTypingIndicator();
                                    for (const e of this._attachmentDivs) this._handleUploadError(e.fileName, T.e.UploadNetworkFail, e.divId);
                                    this.multiLangChat && this.multiLangChat.disableComponent(!0);
                                } else
                                    (this.lastMessageTime = void 0),
                                        this.hideTypingIndicator(),
                                        this._initBroadcaster(),
                                        this.footer.isDisabled() && (this.footer.disable(!1), this.header.disable(!1), this._logger.debug("Connection established, send message button enabled")),
                                        this._onConnection();
                                this.onConnectionStatusChange(e);
                            }
                            _initMultiLangChat() {
                                const e = this.settings;
                                (this.multiLangChat = new Gt(e.multiLangChat, {
                                    webCore: this._core,
                                    chatWidget: this,
                                    eventDispatcher: this._eventDispatcher,
                                    settings: e,
                                    synthesisVoices: e.skillVoices,
                                    storageService: new Yt(e.storageType),
                                    util: this.util,
                                })),
                                    this.header.addLanguageSelect(this.multiLangChat);
                            }
                            _shareUserLocation() {
                                const e = this._localeText;
                                if (navigator && navigator.geolocation) {
                                    const t = new It(e.requestLocation, _.RIGHT, this.settings, this.util);
                                    this._appendMessageToConversation(t.render()),
                                        this._scrollToBottom(),
                                        (0, T.q)().then(
                                            (e) => {
                                                const i = (0, T.o)({ location: { latitude: e.latitude, longitude: e.longitude, title: void 0 }, type: T.i.Location });
                                                t.remove(), this.sendMessage(i);
                                            },
                                            (i) => {
                                                let s;
                                                switch (i.code) {
                                                    case i.PERMISSION_DENIED:
                                                        s = e.requestLocationDeniedPermission;
                                                        break;
                                                    case i.POSITION_UNAVAILABLE:
                                                        s = e.requestLocationDeniedUnavailable;
                                                        break;
                                                    case i.TIMEOUT:
                                                        s = e.requestLocationDeniedTimeout;
                                                        break;
                                                    default:
                                                        s = e.requestLocationDeniedPermission;
                                                }
                                                this._showBanner(s), t.remove();
                                            }
                                        );
                                } else this._showBanner(e.requestLocationDeniedUnavailable);
                            }
                            _filterSuggestions(e, t) {
                                const i = [];
                                for (const s of e) s.search(new RegExp(t, "i")) >= 0 && i.push(s);
                                return i;
                            }
                            _handleUploadError(e, t, i) {
                                const s = this._localeText,
                                    n = `${e} - ${s.uploadFailed}`;
                                let o = "";
                                switch (t) {
                                    case T.e.UploadMaxSize:
                                        o = s.uploadFileSizeLimitExceeded.replace("{0}", "25");
                                        break;
                                    case T.e.UploadZeroSize:
                                        o = s.uploadFileSizeZeroByte;
                                        break;
                                    case T.e.UploadBadFile:
                                        o = s.uploadUnsupportedFileType;
                                }
                                this._displayUploadError(n, o, i);
                            }
                            _executeSendDelegate(e, t) {
                                var i;
                                const s = JSON.parse(JSON.stringify(e));
                                let n,
                                    o = JSON.parse(JSON.stringify(e));
                                e.messagePayload.type === T.i.Text && (null === (i = e.sdkMetadata) || void 0 === i ? void 0 : i.speechId) && (n = (e.messagePayload.text || "").toLowerCase());
                                try {
                                    o = t(s);
                                } catch (e) {
                                    this._logger.error(e);
                                }
                                if (((o && o.messagePayload) || (o = null), o && !(0, T.D)(o) && (this._logger.error("The generated delegate message is invalid. Sending original message instead."), (o = e)), n && o))
                                    if (o.messagePayload)
                                        if (o.messagePayload.type === T.i.Text) {
                                            const e = o.messagePayload.text;
                                            (null == e ? void 0 : e.toLowerCase().indexOf(n)) < 0 && delete o.sdkMetadata;
                                        } else delete o.sdkMetadata;
                                    else delete o.sdkMetadata;
                                return o;
                            }
                            _displayUploadError(e, t, i) {
                                const s = new At(e, t, _.RIGHT, this.settings, this.util, !0),
                                    n = document.getElementById(i);
                                n.firstElementChild && n.removeChild(n.firstElementChild), (this._attachmentDivs = this._attachmentDivs.filter((e) => e.divId !== i));
                                const o = this.settings.icons.error || te;
                                n.appendChild(s.render(o));
                            }
                            _makeButtonDraggable(e, t) {
                                const i = this.util;
                                let s,
                                    n,
                                    o = !1,
                                    a = !1,
                                    r = 0,
                                    c = 0,
                                    l = 0,
                                    h = 0,
                                    d = 0,
                                    p = 0;
                                const u = (e) => {
                                        let t, i;
                                        const s = e.target.classList;
                                        for (let n = 0; n < s.length; n++)
                                            s[n].indexOf("button-drag-handle") &&
                                                ("touchstart" === e.type ? ((t = e.touches[0].clientX), (i = e.touches[0].clientY)) : ((t = e.clientX), (i = e.clientY)), (r = t - l), (c = i - h), (d = t), (p = i), (o = !0));
                                    },
                                    g = (u) => {
                                        let g, m;
                                        if (o) {
                                            "touchmove" === u.type ? ((g = u.touches[0].clientX), (m = u.touches[0].clientY)) : ((g = u.clientX), (m = u.clientY));
                                            const o = g - d,
                                                f = m - p;
                                            (s = g - r),
                                                (n = m - c),
                                                (l = s),
                                                (h = n),
                                                (o >= 5 || f >= 5 || o <= -5 || f <= -5) && (i.addCSSClass(e, "drag"), (t.style.transform = `translate3d(${s}px, ${n}px, 0)`), (t.onclick = null), (a = !0));
                                        }
                                    },
                                    m = () => {
                                        a &&
                                            (ei(() => {
                                                t.onclick = this.openChat.bind(this);
                                            }, 10),
                                            t.focus(),
                                            (a = !1)),
                                            (o = !1);
                                    },
                                    f = i.createDiv(["button-drag-handle"]);
                                t.appendChild(f),
                                    t.addEventListener("touchstart", u),
                                    document.addEventListener("touchmove", g),
                                    t.addEventListener("touchend", m),
                                    t.addEventListener("mousedown", u),
                                    document.addEventListener("mousemove", g),
                                    t.addEventListener("mouseup", m);
                            }
                            _createElement() {
                                var e, t, i, s, n;
                                const o = this.settings,
                                    a = this.util,
                                    r = this._localeText,
                                    c = a.createDiv(o.embedded ? [] : ["wrapper", o.theme, o.enableHeadless ? "none" : ""]);
                                (this.chatWidgetDiv = a.createDiv(["widget", "flex", "col"])),
                                    this.chatWidgetDiv.setAttribute("role", "region"),
                                    this.chatWidgetDiv.setAttribute("aria-labelledby", `${this.cssPrefix}-title`),
                                    (this.header = new Ze(o, a, this.closeChat.bind(this), this.clearConversationHistory.bind(this), this.onToggleNarration.bind(this), this._core, this.showEndConversationPrompt.bind(this))),
                                    this.chatWidgetDiv.appendChild(this.header.element),
                                    o.embedTopStickyId && this.addCustomBanner(o.embedTopStickyId, this.chatWidgetDiv, ["embed-sticky-top"]),
                                    (this.chatPane = new Xe(a)),
                                    (this._scrollContent = a.createDiv(["conversation-pane", this.settings.icons.avatarBot ? "bot-icon" : "", this.settings.icons.avatarUser ? "user-icon" : ""])),
                                    "bottom" === o.conversationBeginPosition && (this._scrollContent.style.marginTop = "auto"),
                                    o.embedTopScrollId && this.addCustomBanner(o.embedTopScrollId, this._scrollContent, ["embed-scroll-top"]),
                                    (this._conversationContainer = a.createDiv(["conversation-container"])),
                                    this._conversationContainer.setAttribute("role", "log"),
                                    this._conversationContainer.setAttribute("aria-live", "polite"),
                                    this._conversationContainer.setAttribute("aria-atomic", "false"),
                                    this._scrollContent.appendChild(this._conversationContainer),
                                    this.chatPane.element.appendChild(this._scrollContent),
                                    o.embedBottomScrollId && this.addCustomBanner(o.embedBottomScrollId, this.chatPane.element, ["embed-scroll-bottom"]),
                                    this.chatWidgetDiv.appendChild(this.chatPane.element),
                                    o.embedBottomStickyId && this.addCustomBanner(o.embedBottomStickyId, this.chatWidgetDiv, ["embed-sticky-bottom"]),
                                    (this.footer = new We(
                                        a,
                                        this.sendMessage.bind(this),
                                        this.uploadFile.bind(this),
                                        o,
                                        this.getSuggestions.bind(this),
                                        this.onSpeechToggle.bind(this),
                                        this._shareUserLocation.bind(this),
                                        this.sendUserTypingStatusMessage.bind(this),
                                        this._eventDispatcher,
                                        this
                                    )),
                                    this.chatWidgetDiv.appendChild(this.footer.element),
                                    (e = o.webViewConfig).accessibilityTitle || (e.accessibilityTitle = r.webViewAccessibilityTitle),
                                    (t = o.webViewConfig).closeButtonLabel || (t.closeButtonLabel = r.webViewClose),
                                    (i = o.webViewConfig).errorInfoDismissLabel || (i.errorInfoDismissLabel = r.webViewErrorInfoDismiss),
                                    (s = o.webViewConfig).errorInfoText || (s.errorInfoText = r.webViewErrorInfoText),
                                    (n = o.webViewConfig).closeButtonIcon || (n.closeButtonIcon = o.icons.close),
                                    (this.webViewComponent = new Bt(o.webViewConfig, a, o)),
                                    (this.webViewElem = this.webViewComponent.render()),
                                    this.chatWidgetDiv.appendChild(this.webViewElem);
                                const l = this.webViewComponent,
                                    h = `${this.cssPrefix}-webview`;
                                if (
                                    ((this.webviewLinkHandler = {
                                        target: h,
                                        onclick: function () {
                                            l.open(this.href);
                                        },
                                    }),
                                    o.linkHandler && o.linkHandler.target === h && (o.linkHandler = this.webviewLinkHandler),
                                    c.appendChild(this.chatWidgetDiv),
                                    o.embedded)
                                )
                                    (this.isOpen = !0), a.addCSSClass(c, "open");
                                else {
                                    const e = o.icons.launch || (o.colors && o.colors.branding ? re.replace("#025e7e", o.colors.branding) : re),
                                        t = "button",
                                        i = a.createIconButton({ css: [t], icon: e, iconCss: [`${t}-icon`], title: r.chatButtonTitle || r.chatTitle });
                                    i.classList.remove(`${this.cssPrefix}-icon`),
                                        (this._botButton = i),
                                        (this._botButton.onclick = this.openChat.bind(this)),
                                        (this._botNotificationBadge = a.createDiv(["notification-badge"])),
                                        c.appendChild(i),
                                        o.enableDraggableButton && this._makeButtonDraggable(c, i),
                                        o.openChatOnLoad || a.addCSSClass(c, Zt),
                                        a.addCSSClass(this.chatWidgetDiv, Qt);
                                }
                                return c;
                            }
                            _appendMessageToConversation(e) {
                                var t;
                                this._conversationContainer.appendChild(e), (null === (t = this.typingIndicator) || void 0 === t ? void 0 : t.isVisible()) && (this.hideTypingIndicator(), this.showTypingIndicator());
                            }
                            _scrollToBottom() {
                                const e = this.chatPane.element;
                                ei(() => {
                                    e && (e.scrollTop = e.scrollHeight);
                                }, $.CHAT_SCROLL_DELAY);
                            }
                            _renderMessagesAndScroll(e) {
                                return (null == e ? void 0 : e.length)
                                    ? new Promise((t) => {
                                          this.settings.clientAuthEnabled && this.settings.enableAttachmentSecurity
                                              ? this._core
                                                    .getAuthToken()
                                                    .then((i) => {
                                                        this._renderMessages(e, i.token), t(), this._scrollToBottom();
                                                    })
                                                    .catch(() => {
                                                        this._renderMessages(e), t(), this._scrollToBottom();
                                                    })
                                              : (this._renderMessages(e), t(), this._scrollToBottom());
                                      })
                                    : (this._renderMessages(e), Promise.resolve());
                            }
                            getAgentNameDiv(e, t) {
                                var i;
                                const s = this.settings.icons;
                                (null === (i = e.messagePayload.channelExtensions) || void 0 === i ? void 0 : i.agentSession) ||
                                    (e.messagePayload.channelExtensions ? (e.messagePayload.channelExtensions.agentSession = this.agentSession) : (e.messagePayload.channelExtensions = { agentSession: this.agentSession })),
                                    !this.agentSession.avatarImage && s.avatarBot && t.appendChild(this.getAgentIcon());
                                const n = this.util.createDiv(["agent-name"]);
                                return (
                                    (n.title = this.agentSession.name), (n.innerHTML = this.agentSession.name), n.setAttribute("aria-hidden", "true"), this.agentSession.nameTextColor && (n.style.color = this.agentSession.nameTextColor), n
                                );
                            }
                            getAgentIcon() {
                                const e = this.agentSession.name.split(" ").filter((e) => e);
                                let t = e[0][0];
                                return e.length > 1 && (t += e[e.length - 1][0]), this.getAvatar(t.toUpperCase(), this.agentSession.name, !0);
                            }
                            setAgentTypingCue() {
                                if (this.settings.showTypingIndicator) {
                                    const e = this.settings.icons,
                                        t = this._localeText;
                                    e.avatarBot &&
                                        (!this.agentSession.avatarImage && this.agentSession.name
                                            ? this.typingIndicator.setAgentTypingCue(this.getAgentIcon())
                                            : this.typingIndicator.setAgentTypingCue(this.getAvatar(this.agentSession.avatarImage || e.avatarBot, t.avatarAgent || t.avatarBot)));
                                }
                            }
                            getAvatar(e, t, i = !1) {
                                const s = this.util;
                                let n;
                                const o = s.createDiv(["icon-wrapper", i ? "agent-avatar" : ""]);
                                return (
                                    i
                                        ? ((n = s.createDiv(["agent-icon"])),
                                          (n.innerText = e),
                                          this.agentSession.avatarTextColor && (n.style.color = this.agentSession.avatarTextColor),
                                          this.agentSession.avatarBackgroundColor && (o.style.background = this.agentSession.avatarBackgroundColor))
                                        : (n = s.createImageIcon({ icon: e, iconCss: ["message-icon"], title: t })),
                                    o.appendChild(n),
                                    o
                                );
                            }
                            getTime() {
                                const e = new Date(),
                                    t = (0, Se.formatDate)(e, { pattern: this.settings.timestampFormat, locale: this.settings.locale }),
                                    i = this.util.createDiv(["message-date"]);
                                return i.setAttribute("aria-live", "off"), i.setAttribute("aria-hidden", "true"), (i.innerText = `${t}`), i;
                            }
                            _renderMessages(e, t) {
                                const i = this.util,
                                    s = { locale: this.currentLocale, webviewLinkHandler: this.webviewLinkHandler, webCore: this._core };
                                (null == t ? void 0 : t.length) && ((s.authToken = t), (s.uri = this.settings.URI)),
                                    e.forEach((e) => {
                                        var t, n, o, a, r, c;
                                        const l = yt(e) ? T.k.Skill : T.k.User,
                                            h = this.shouldMergeMessages(e, l);
                                        let d;
                                        (this.lastMessageSenderType = l),
                                            (this.lastMessageTime = Date.now()),
                                            (this.lastMessageHasGlobalAction = e.messagePayload.globalActions && 0 !== e.messagePayload.globalActions.length),
                                            (this.lastMessageSenderName = (null === (n = null === (t = e.messagePayload.channelExtensions) || void 0 === t ? void 0 : t.agentSession) || void 0 === n ? void 0 : n.name) || ""),
                                            yt(e) && (this.lastMessageSenderSource = e.source),
                                            h || ((d = i.createDiv(["message-block", "flex"])), (this.lastMessageBlock = d));
                                        const p = _t.fromMessage(this.settings, this.util, e, s);
                                        if (((p.onActionClick = this.onMessageActionClicked.bind(this)), void 0 !== p.ratingId && (this.pendingFeedback = p), yt(e))) {
                                            this._isNewMessage ? this._onReceiveMessage(p) : this._skillMessages.push(p);
                                            const t = kt(e);
                                            if (this.messageIDs.indexOf(t) >= 0) return;
                                            this.messageIDs.push(t),
                                                e.source === T.l.Agent
                                                    ? ((null === (o = e.messagePayload.channelExtensions) || void 0 === o ? void 0 : o.agentName) &&
                                                          this.setAgentDetails({
                                                              name: e.messagePayload.channelExtensions.agentName,
                                                              avatarImage: this.settings.icons.avatarAgent,
                                                              nameTextColor: null,
                                                              avatarTextColor: null,
                                                              avatarBackgroundColor: null,
                                                          }),
                                                      (null === (a = e.messagePayload.channelExtensions) || void 0 === a ? void 0 : a.agentSession) && this.setAgentDetails(e.messagePayload.channelExtensions.agentSession))
                                                    : (this.storageService.removeItem(this._agentNameStorageId), (this.agentSession = null)),
                                                this.focusMessageFirstAction(p);
                                        } else if (this.pendingFeedback) {
                                            const t = e;
                                            if (t.messagePayload.type === T.i.Text || t.messagePayload.type === T.i.Postback) {
                                                const e = t.messagePayload;
                                                this.pendingFeedback.highlightRating(e.text);
                                            }
                                            this.pendingFeedback = null;
                                        }
                                        this.setTimestampHeaderIfNewDate(e.date || new Date()), d && (this.createMessageBlock(e, d), this._appendMessageToConversation(d));
                                        const u = this.lastMessageBlock.querySelector('[class*="message-list"]'),
                                            g = this._renderMessage(e, p, u);
                                        if (g) {
                                            if (e.messagePayload.type === T.i.Card) {
                                                const e = u.querySelectorAll('[class*="message-bubble"]');
                                                e.length && e[e.length - 1].classList.add(`${this.cssPrefix}-before-card`);
                                            }
                                            e.messagePayload.type === T.i.EditForm && (null === (r = e.messagePayload.channelExtensions) || void 0 === r ? void 0 : r.replaceMessage) && u.lastElementChild
                                                ? null === (c = u.lastElementChild) || void 0 === c || c.replaceWith(g)
                                                : u.appendChild(g);
                                        }
                                        this.updateRelativeTimestamp(l);
                                    });
                            }
                            shouldMergeMessages(e, t) {
                                var i, s, n, o, a;
                                const r = null === (i = e.messagePayload.channelExtensions) || void 0 === i ? void 0 : i.replaceMessage;
                                if (
                                    (!0 === r || (r && "true" === (null === (s = r) || void 0 === s ? void 0 : s.toLowerCase()))) &&
                                    (null === (n = this.lastMessageBlock) || void 0 === n ? void 0 : n.className.includes(`${this.cssPrefix}-left`))
                                )
                                    return !0;
                                if (!(Date.now() - this.lastMessageTime < 1e4)) return !1;
                                if (yt(e) && e.source === T.l.Agent && (null === (o = e.messagePayload.channelExtensions) || void 0 === o ? void 0 : o.agentSession)) {
                                    const t = null === (a = e.messagePayload.channelExtensions) || void 0 === a ? void 0 : a.agentSession;
                                    return this.lastMessageSenderName === t.name;
                                }
                                return !(this.lastMessageSenderType !== t || (yt(e) && e.source !== this.lastMessageSenderSource) || this.lastMessageHasGlobalAction);
                            }
                            createMessageBlock(e, t) {
                                const i = this.settings.icons,
                                    s = this._localeText,
                                    n = this.util;
                                let o, a, r;
                                if (yt(e)) {
                                    if (
                                        (e.source === T.l.Agent
                                            ? ((o = this.agentSession.name && this.getAgentNameDiv(e, t)),
                                              (a = i.avatarBot && (this.agentSession.avatarImage || !this.agentSession.name) && (this.agentSession.avatarImage || i.avatarBot)),
                                              (r = s.agentMessage.replace("{0}", `${this.agentSession.name || s.agent}`)))
                                            : (this.settings.showTypingIndicator && (this.typingIndicator.remove(), (this.typingIndicator = new Et(_.LEFT, this.settings, this.util))), (a = i.avatarBot), (r = s.skillMessage)),
                                        n.addCSSClass(t, "left"),
                                        a)
                                    ) {
                                        const i = this.getAvatar(a, (e.source === T.l.Agent && s.avatarAgent) || s.avatarBot);
                                        (i.style.marginTop = e.source === T.l.Agent && this.agentSession.name && "16px"), t.appendChild(i);
                                    }
                                } else n.addCSSClass(t, "right"), (r = s.userMessage), i.avatarUser && t.appendChild(this.getAvatar(i.avatarUser, s.avatarUser));
                                const c = n.createDiv(["messages-wrapper", "flex", "col"]);
                                o && c.appendChild(o);
                                const l = this.util.createElement("span", ["screen-reader-only"]);
                                (l.innerText = r), c.appendChild(l);
                                const h = n.createDiv(["message-list", "flex", "col"]);
                                if ((c.appendChild(h), this.settings.enableTimestamp && "absolute" === this.settings.timestampMode)) {
                                    const e = this.getTime();
                                    c.appendChild(e);
                                }
                                t.appendChild(c);
                            }
                            _renderMessage(e, t, i) {
                                const s = this.settings.delegate;
                                if (s && s.render) {
                                    const t = this.util.createDiv(["message"]);
                                    if (((t.id = e.msgId), (t.lang = this.settings.locale), i.appendChild(t), s.render(e))) return null;
                                    t.remove();
                                }
                                return t.render();
                            }
                            setTimestampHeaderIfNewDate(e) {
                                (0, Se.isSameDay)(this.currTimestampHeader, e) || ((this.currTimestampHeader = new Date(e)), this._appendMessageToConversation(this.createTimestampHeader(this.currTimestampHeader)));
                            }
                            createTimestampHeader(e) {
                                const t = this.util.createDiv(["timestamp-header"]);
                                return (t.textContent = (0, Se.formatDate)(e, { pattern: this.settings.timestampFormat, locale: this.currentLocale || this.settings.locale })), t;
                            }
                            updateRelativeTimestamp(e) {
                                this.relativeTimestampElement || (this.relativeTimestampElement = this.relativeTimestamp.render()),
                                    this.relativeTimestampElement.remove(),
                                    this.relativeTimestamp.refresh(e),
                                    this._appendMessageToConversation(this.relativeTimestampElement);
                            }
                            focusMessageFirstAction(e) {
                                e.hasActions() &&
                                    ei(() => {
                                        e.focusFirstAction();
                                    }, 290);
                            }
                            addCustomBanner(e, t, i) {
                                const s = document.querySelector(`#${e}`);
                                if (s) {
                                    const e = this.util.createDiv(i);
                                    e.appendChild(s), t.appendChild(e);
                                } else this._logger.error(`Could not find element with ID '${e}'. No element embedded to the chat conversation pane.`);
                            }
                            onSpeechToggle(e) {
                                const t = (function (e) {
                                        const t = document.querySelector(".oda-chat-wrapper");
                                        return getComputedStyle(t).getPropertyValue(e);
                                    })("--color-visualizer"),
                                    i = this._localeText;
                                this._ttsCancel(),
                                    this._eventDispatcher.trigger(s.CLICK_VOICE_TOGGLE, e),
                                    this.settings.enableSpeech &&
                                        (e
                                            ? (this._hideBanner(),
                                              this.settings.speechLocale && !(0, T.B)(this.settings.speechLocale)
                                                  ? this._showBanner(i.errorSpeechUnsupportedLocale)
                                                  : this._core
                                                        .startRecognition({
                                                            onRecognitionText: this.onSpeechRecognition.bind(this),
                                                            onVisualData: (e) => {
                                                                this.footer.updateVisualizer(e, t);
                                                            },
                                                        })
                                                        .then(() => {
                                                            this.footer.setVoiceRecording(!0), this._scrollToBottom();
                                                        })
                                                        .catch((e) => {
                                                            this.footer.setVoiceRecording(!1);
                                                            let t = "";
                                                            switch (e.message) {
                                                                case T.e.RecognitionMultipleConnection:
                                                                    t = i.errorSpeechMultipleConnection;
                                                                    break;
                                                                case T.e.RecognitionNotReady:
                                                                    t = i.errorSpeechInvalidUrl;
                                                                    break;
                                                                case T.e.RecognitionProcessingFailure:
                                                                    t = i.errorSpeechTooMuchTimeout;
                                                                    break;
                                                                default:
                                                                    t = i.errorSpeechUnavailable;
                                                            }
                                                            this._showBanner(t);
                                                        }))
                                            : (this._core.stopRecognition(), this.footer.setVoiceRecording(!1)));
                            }
                            onSpeechRecognition(e) {
                                if (e)
                                    switch (e.type) {
                                        case "error":
                                            this._logger.error("Failed to recognize voice", e.text),
                                                e.text === T.e.RecognitionTooMuchSpeechTimeout && this._showBanner(this._localeText.errorSpeechTooMuchTimeout),
                                                this.footer.setVoiceRecording(!1);
                                            break;
                                        case "final":
                                            let t = e.text;
                                            t.length > 0
                                                ? (this.speechFinalResult && (t = `${this.speechFinalResult.text} ${t}`),
                                                  this.footer.setUserInputText(t),
                                                  this.settings.enableSpeechAutoSend
                                                      ? ei(() => {
                                                            const i = (0, T.p)(t, e.requestId);
                                                            this.sendMessage(i).then(() => {
                                                                this.footer.setUserInputText("");
                                                            });
                                                        }, this.FINAL_RESULT_DISPLAY_TIMEOUT)
                                                      : (this.speechFinalResult = { speechId: e.requestId, text: t }),
                                                  this.footer.setVoiceRecording(!1))
                                                : this.footer.setUserInputText(this.speechFinalResult.text);
                                            break;
                                        case "partial":
                                            let i = e.text;
                                            i.length > 0 && (this.speechFinalResult && (i = `${this.speechFinalResult.text} ${i}`), this.footer.setUserInputText(i));
                                    }
                            }
                            _disablePastActions(e) {
                                switch (this.settings.disablePastActions) {
                                    case "all":
                                        e.forEach((e) => {
                                            e.disableActions();
                                        });
                                        break;
                                    case "postback":
                                        e.forEach((e) => {
                                            e.disablePostbacks();
                                        });
                                }
                            }
                            _onLoadPreviousMessages() {
                                this._disablePastActions(this._skillMessages);
                            }
                            _onReceiveMessage(e) {
                                ("none" === this.settings.disablePastActions ? this._skillMessages : this._latestSkillMessages).push(e);
                            }
                            _onSendMessage() {
                                this._disablePastActions(this._latestSkillMessages), (this._latestSkillMessages = []);
                            }
                            _onConnection() {
                                ("none" === this.settings.disablePastActions ? this._skillMessages : this._latestSkillMessages).forEach((e) => {
                                    e.enablePostbacks();
                                });
                            }
                            _onDisconnection() {
                                ("none" === this.settings.disablePastActions ? this._skillMessages : this._latestSkillMessages).forEach((e) => {
                                    e.disablePostbacks();
                                });
                            }
                            _clearChatPane() {
                                var e;
                                let t = !1;
                                for ((null === (e = this.typingIndicator) || void 0 === e ? void 0 : e.isVisible()) && ((t = !0), this.hideTypingIndicator()); this._conversationContainer.firstChild; )
                                    this._conversationContainer.removeChild(this._conversationContainer.lastChild);
                                t && this.showTypingIndicator(), this._renderMessagesAndScroll([]), (this.isFirstMessage = !0), (this.currTimestampHeader = null), this._ttsCancel(), this._eventDispatcher.trigger(s.CLICK_ERASE);
                            }
                            _initBroadcaster() {
                                const { userId: e, channelId: t } = this.settings;
                                Jt && (this._stopBroadcaster(), (this.broadcaster = new Jt(`${e}-${t}`)), (this.broadcaster.onmessage = this._onBroadcastMessage.bind(this)));
                            }
                            _stopBroadcaster() {
                                this.broadcaster && (this.broadcaster.close(), (this.broadcaster = null));
                            }
                            _broadcast(e) {
                                if (this.broadcaster) {
                                    const t = { type: "message", message: e };
                                    if (yt(e)) {
                                        const i = kt(e);
                                        if (this.messageIDs.indexOf(i) >= 0) return;
                                        t.digest = i;
                                    }
                                    this.broadcaster.postMessage(t);
                                }
                            }
                            _broadcastAction(e) {
                                this.broadcaster && this.broadcaster.postMessage(e);
                            }
                            _onBroadcastMessage(e) {
                                const t = e.data;
                                switch (t.type) {
                                    case "message":
                                        const e = t.message.messagePayload;
                                        if (e.type === T.i.Status) {
                                            const t = e;
                                            return void ("RESPONDING" === t.status ? this.showTypingIndicator() : "LISTENING" === t.status && this.hideTypingIndicator());
                                        }
                                        if (e.type === T.i.SessionClosed) return void this.handleSessionEnd();
                                        if (t.digest) {
                                            if (this.messageIDs.indexOf(t.digest) >= 0) return;
                                            this.receivedMessage(t.message);
                                        } else this.sentMessage(t.message), this._onSendMessage(), this.showTypingIndicator();
                                        this.hideTypingIndicator(), this._renderMessagesAndScroll([t.message]);
                                        break;
                                    case "actionClearHistory":
                                        this._clearChatPane();
                                        break;
                                    case "actionLanguage":
                                        this.multiLangChat.setTag(t.tag, !1);
                                }
                            }
                            _showBanner(e) {
                                Re(this.chatPane.element, this.util.getBanner({ icon: we, text: e, closeText: this._localeText.webViewErrorInfoDismiss, closeIcon: this.settings.icons.close, autoClose: !0 }));
                            }
                            _hideBanner() {
                                document.querySelectorAll(`.${this.cssPrefix}-prompt-banner-close-button`).forEach((e) => {
                                    e.click();
                                });
                            }
                            _stopDefaultMessages() {
                                window.clearTimeout(this.defaultResponseTimer), window.clearInterval(this.defaultResponseInterval), window.clearTimeout(this.waitMessageClearTimer), this.hideTypingIndicator();
                            }
                            _onMessageReceived(e) {
                                if (
                                    (this._logger.debug("onMessageReceived", e),
                                    this._stopDefaultMessages(),
                                    this._scrollToBottom(),
                                    (this.isResponseReceived = !0),
                                    (this.isFirstMessage = !1),
                                    this.settings.enableDefaultClientResponse && (e.source === T.l.Agent ? (this.enableDefaultBotResponse = !1) : this.enableDefaultBotResponse || (this.enableDefaultBotResponse = !0)),
                                    e)
                                ) {
                                    if (this.settings.delegate && this.settings.delegate.beforeDisplay && (0, Se.isFunction)(this.settings.delegate.beforeDisplay)) {
                                        let t = JSON.parse(JSON.stringify(e));
                                        try {
                                            t = this.settings.delegate.beforeDisplay(t);
                                        } catch (e) {
                                            this._logger.error(e);
                                        }
                                        if (!t) return;
                                        (0, T.D)(t) ? (e = t) : this._logger.error("The generated delegate message is invalid. Displaying original message instead.");
                                    }
                                    switch ((this.receivedMessage(e), this._broadcast(e), e.messagePayload.type)) {
                                        case T.i.Status: {
                                            const t = e.messagePayload;
                                            "RESPONDING" === t.status ? this.showTypingIndicator() : "LISTENING" === t.status && this.hideTypingIndicator();
                                            break;
                                        }
                                        case T.i.SessionClosed:
                                            this.handleSessionEnd();
                                            break;
                                        default:
                                            this._renderMessagesAndScroll([e]), this.isTTSMute || this._core.speakTTS(e, this._localeText), this._saveMessage(e), this.isOpen || this.updateNotificationBadge(++this._unreadMsgCount);
                                    }
                                }
                            }
                            _onMessageSent(e) {
                                this._saveMessage(e),
                                    this._scrollToBottom(),
                                    e &&
                                        (this._broadcast(e),
                                        e.messagePayload &&
                                            [T.i.Suggest, T.i.SessionClosed, T.i.CloseSession, T.i.Status].indexOf(e.messagePayload.type) < 0 &&
                                            (this.isOpen || this.updateNotificationBadge(++this._unreadMsgCount), this._renderMessagesAndScroll([e])));
                            }
                            _toggleNarration(e) {
                                e || this._ttsCancel(), (this.isTTSMute = !e);
                            }
                            _loadPreviousConversations() {
                                if (this.settings.enableLocalConversationHistory) {
                                    this.loadChat();
                                    const e = this.getMessages();
                                    e.length &&
                                        ((this._isNewMessage = !1),
                                        this._renderMessagesAndScroll(e.slice()).then(() => {
                                            if (
                                                ((this._isNewMessage = !0),
                                                this._onLoadPreviousMessages(),
                                                this.relativeTimestamp &&
                                                    (this.relativeTimestamp.setRelativeTime(new Date(e[e.length - 1].date)),
                                                    (this.relativeTimestampElement = this.relativeTimestamp.render()),
                                                    this._appendMessageToConversation(this.relativeTimestampElement)),
                                                this.settings.showPrevConvStatus)
                                            ) {
                                                const e = this.util.createElement("div", ["hr", "flex"]);
                                                (e.innerText = this._localeText.previousChats), this._appendMessageToConversation(e);
                                            }
                                        }));
                                }
                            }
                            _sendInitMessages() {
                                var e;
                                if (this._core.isConnected() && this.isExpanded && (this.multiLangChat && (this.multiLangChat.disableComponent(!1), this.multiLangChat.initLanguage()), !this.isInitMessageSent)) {
                                    const t = this.settings.initUserProfile;
                                    if (
                                        (t &&
                                            this._core.updateUser(t, { sdkMetadata: { version: U } }).then(() => {
                                                this.isInitMessageSent = !0;
                                            }),
                                        this.settings.initUserHiddenMessage)
                                    ) {
                                        const e = this.settings.initUserHiddenMessage;
                                        this.sendMessage(e, { hidden: !0, delegate: !1 }).then(() => {
                                            this.isInitMessageSent = !0;
                                        });
                                    }
                                    (null === (e = this.settings.deviceToken) || void 0 === e ? void 0 : e.length) &&
                                        this._core.sendDeviceToken(this.settings.deviceToken).then(() => {
                                            this.isInitMessageSent = !0;
                                        });
                                }
                            }
                            _ttsCancel() {
                                this._core.cancelTTS();
                            }
                            sendUserTypingStatusMessage(e, t) {
                                this.getAgentDetails() && this._core.sendUserTypingStatus(e, t);
                            }
                        }
                    },
                    49: function (e, t, i) {
                        i.r(t),
                            i.d(t, {
                                redwoodStyles: function () {
                                    return s;
                                },
                            });
                        const s =
                            '@keyframes scale-in-center{0%{opacity:1;transform:scale(0)}100%{opacity:1;transform:scale(1)}}@keyframes scale-out-center{0%{display:flex;opacity:1;transform:scale(1)}100%{display:none;opacity:1;transform:scale(0)}}@keyframes scale-in-br{0%{opacity:1;transform:scale(0);transform-origin:100% 100%}100%{opacity:1;transform:scale(1);transform-origin:100% 100%}}@keyframes scale-in-bl{0%{opacity:1;transform:scale(0);transform-origin:0 100%}100%{opacity:1;transform:scale(1);transform-origin:0 100%}}@keyframes scale-in-tl{0%{opacity:1;transform:scale(0);transform-origin:0 0}100%{opacity:1;transform:scale(1);transform-origin:0 0}}@keyframes scale-in-tr{0%{opacity:1;transform:scale(0);transform-origin:100% 0}100%{opacity:1;transform:scale(1);transform-origin:100% 0}}@keyframes scale-out-br{0%{opacity:1;transform:scale(1);transform-origin:100% 100%}99%{opacity:1;transform:scale(0.01);transform-origin:100% 100%}100%{display:none;opacity:1;transform:scale(0);transform-origin:100% 100%}}@keyframes scale-out-bl{0%{opacity:1;transform:scale(1);transform-origin:0 100%}99%{opacity:1;transform:scale(0.01);transform-origin:0 100%}100%{display:none;opacity:1;transform:scale(0);transform-origin:0 100%}}@keyframes popup-suggestion{0%{box-shadow:0 0 0 0 rgba(0,0,0,0),0 0 0 0 rgba(0,0,0,0);transform:scaleY(0.4);transform-origin:0 100%}100%{box-shadow:0 -12px 15px -12px rgba(0,0,0,.35);transform:scaleY(1);transform-origin:0 100%}}@keyframes spin{from{transform:rotate(0)}to{transform:rotate(360deg)}}@keyframes banner-in{0%{transform:translateY(-20px);opacity:0}100%{transform:translateY(0);opacity:1}}@keyframes banner-out{0%{transform:translateY(0);opacity:1}100%{transform:translateY(-20px);opacity:0}}@keyframes typing-cue{0%{opacity:1}30%{opacity:.1}50%{opacity:1}100%{opacity:.1}}@keyframes oda-chat-webview-slide-out-bottom{0%{transform:translateY(0);opacity:1}95%{opacity:1}100%{transform:translateY(100%);opacity:0}}@keyframes oda-chat-webview-slide-in-bottom{0%{transform:translateY(100%);opacity:0}1%{opacity:1}100%{transform:translateY(0%);opacity:1}}.flex{display:flex;justify-content:space-between;align-items:center}.col{flex-direction:column}.none{display:none}.wrapper{--color-branding: #c0533f;--color-launch-icon-background: #c0533f;--color-text: #161513;--color-text-light: #161513;--color-header-background: #F1EFED;--color-header-button-fill: #161513;--color-header-text: #161513;--color-header-button-background-hover: rgba(22, 21, 19, 0.04);--color-header-button-fill-hover: #161513;--color-conversation-background: #F5F4F2;--color-timestamp: rgba(22, 21, 19, 0.65);--color-typing-indicator: #161513;--color-bot-message-background: #FFFFFF;--color-bot-text: #161513;--color-user-message-background: #E4E1DD;--color-user-text: #161513;--color-error-message-background: #FFF8F7;--color-error-border: #DC5C5E;--color-error-title: #D63B25;--color-error-text: #161513;--color-card-background: #FFFFFF;--color-card-nav-button: #FFF;--color-card-nav-button-focus: #FBF9F8;--color-card-nav-button-hover: #FBF9F8;--color-actions-background: #fff;--color-actions-background-focus: rgba(22, 21, 19, 0.04);--color-actions-background-hover: rgba(22, 21, 19, 0.04);--color-actions-border: rgba(22, 21, 19, 0.5);--color-actions-text: #161513;--color-actions-text-focus: #161513;--color-actions-text-hover: #161513;--color-global-actions-background: transparent;--color-global-actions-background-focus: rgba(22, 21, 19, 0.04);--color-global-actions-background-hover: rgba(22, 21, 19, 0.04);--color-global-actions-border: rgba(22, 21, 19, 0.5);--color-global-actions-text: #161513;--color-global-actions-text-focus: #161513;--color-global-actions-text-hover: #161513;--color-links: #c0533f;--color-user-links: #c0533f;--color-rating-star: #ececec;--color-rating-star-fill: #f0cc71;--color-agent-initials: #FFFFFF;--color-agent-avatar-background: #A890B6;--color-agent-name: rgba(22, 21, 19, 0.65);--color-horizontal-rule-background: #cbc5bf;--color-attachment-placeholder: #e3e1dc;--color-attachment-footer: #fff;--color-attachment-text: #161513;--color-footer-background: #fff;--color-footer-button-fill: #161513;--color-footer-button-background-hover: rgba(22, 21, 19, 0.04);--color-footer-button-fill-hover: #161513;--color-input-background: #fff;--color-input-border: #fff;--color-input-text: #161513;--color-recognition-view-text: #fff;--color-visualizer: #161513;--color-visualizer-container-background: #fff;--color-notification-badge-background: #312d2a;--color-notification-badge-text: #fff;--color-popup-background: #fff;--color-popup-text: #161513;--color-popup-button-background: #fff;--color-popup-button-text: #161513;--color-popup-horizontal-rule: #cbc5bf;--color-popup-item-background-hover: rgba(22, 21, 19, 0.04);--color-popup-input-text: #161513;--color-popup-input-background: #fff;--color-popup-input-border: #161513;--color-popup-input-border-error: #f00;--color-table-header-background: #f1efec;--color-table-background: #fff;--color-table-text: #161513;--color-table-separator: rgba(22, 21, 19, 0.1);--color-row-item-background-hover: rgba(22, 21, 19, 0.04);--color-form-input-border: rgba(22, 21, 19, 0.5);--color-form-label: rgba(22, 21, 19, 0.65);--color-form-error: rgba(179,49,31);--color-form-error-text: rgba(22, 21, 19, 0.65);--color-form-actions-background-hover: rgba(22, 21, 19, 0.04);--color-form-actions-border: rgba(22, 21, 19, 0.5);--color-form-actions-text: #161513;--width-full-screen: 375px;--position-top: 0;--position-left: 0;--position-right: 20px;--position-bottom: 20px;position:fixed;bottom:var(--position-bottom);left:var(--position-left);top:var(--position-top);right:var(--position-right);box-sizing:border-box;text-transform:none;z-index:10000;color:var(--color-text);font-size:16px;font-family:"Oracle Sans",-apple-system,BlinkMacSystemFont,"Segoe UI","Helvetica Neue",sans-serif;transition:all .25s ease-in-out;-webkit-font-smoothing:antialiased}.wrapper.classic{--color-branding: #025e7e;--color-launch-icon-background: #025e7e;--color-text: #161513;--color-text-light: #3a3631;--color-header-background: #025e7e;--color-header-button-fill: #fff;--color-header-button-fill-hover: #fff;--color-header-text: #fff;--color-conversation-background: #fff;--color-timestamp: #5b5652;--color-typing-indicator: #227e9e;--color-bot-message-background: #e5f1ff;--color-user-message-background: #ececec;--color-card-background: #e5f1ff;--color-card-nav-button: #4190ac;--color-card-nav-button-focus: #5fa2ba;--color-card-nav-button-hover: #0e7295;--color-actions-background: #025e7e;--color-actions-background-focus: #053242;--color-actions-background-hover: #06485f;--color-actions-border: #025e7e;--color-actions-text: #fff;--color-actions-text-focus: #fff;--color-actions-text-hover: #fff;--color-global-actions-background: #fff;--color-global-actions-background-focus: #053242;--color-global-actions-background-hover: #025e7e;--color-global-actions-border: #0e7295;--color-global-actions-text: #0e7295;--color-global-actions-text-focus: #fff;--color-global-actions-text-hover: #fff;--color-links: #0e7295;--color-user-links: #0e7295;--color-agent-name: #5b5652;--color-attachment-footer: #e5f1ff;--color-footer-background: #fff;--color-footer-button-fill: #161513;--color-footer-button-fill-hover: #025e7e;--color-visualizer: #025e7e;--color-notification-badge-background: #9a0007;--color-notification-badge-text: #fff;--color-popup-button-text: #025e7e}.wrapper.redwood-dark{--color-branding: #c0533f;--color-launch-icon-background: #c0533f;--color-text: #161513;--color-text-light: #fcfbfa;--color-header-background: #201e1c;--color-header-button-fill: #fff;--color-header-button-fill-hover: #fff;--color-header-button-background-hover: rgba(255, 255, 255, 0.04);--color-header-text: #fff;--color-conversation-background: #3a3631;--color-timestamp: #fcfbfa;--color-typing-indicator: #fff;--color-bot-message-background: #655f5c;--color-bot-text: #fff;--color-user-message-background: #fff;--color-user-text: #161513;--color-card-background: #655f5c;--color-card-nav-button: #d5b364;--color-card-nav-button-focus: #f7e0a1;--color-card-nav-button-hover: #b39554;--color-actions-background: #655f5c;--color-actions-background-focus: rgba(22, 21, 19, 0.5);--color-actions-background-hover: rgba(22, 21, 19, 0.3);--color-actions-border: #fff;--color-actions-text: #fff;--color-actions-text-focus: #fff;--color-actions-text-hover: #fff;--color-global-actions-background: #3a3631;--color-global-actions-background-focus: rgba(22, 21, 19, 0.3);--color-global-actions-background-hover: rgba(22, 21, 19, 0.3);--color-global-actions-border: #fff;--color-global-actions-text: #fff;--color-global-actions-text-focus: #fff;--color-global-actions-text-hover: #fff;--color-links: #f7e0a1;--color-user-links: #c0533f;--color-agent-name: #fcfbfa;--color-footer-background: #fff;--color-footer-button-fill: #161513;--color-input-background: #fff;--color-input-text: #161513;--color-recognition-view-text: #fff;--color-visualizer-container-background: #fff;--color-notification-badge-background: #312d2a;--color-notification-badge-text: #fff;--color-popup-button-text: #201e1c}.wrapper *{box-sizing:border-box}.wrapper b{font-weight:700}.wrapper .widget{position:absolute;bottom:calc(var(--position-bottom) * -1);border-radius:6px 6px 0 0;box-shadow:0px -4px 32px rgba(0,0,0,.1);right:calc(var(--position-right) * -1);width:100vw;max-width:100vw;height:85vh;max-height:calc(100vh - 60px);margin:0;overflow:hidden;text-decoration:none;text-transform:none;z-index:10000;align-items:stretch;background:var(--color-conversation-background)}.wrapper .widget .alert-wrapper{position:absolute;top:48px;width:100%}.wrapper .widget .alert-wrapper .alert-prompt{position:relative;left:0;right:0;width:auto;margin:6px;padding:10px;border-radius:10px;z-index:11}.wrapper .widget .msg-icon{padding:5px 10px 0 0}.wrapper .widget .msg{flex-grow:1}.wrapper button{position:relative;max-width:100%;padding:9px 16px;margin:0 0 8px;min-height:36px;line-height:16px;font-size:13.75px;font-weight:600;font-family:inherit;border-radius:4px;border-width:thin;border-style:solid;cursor:pointer;overflow:hidden;word-break:break-word;flex-shrink:0}.wrapper button:disabled{opacity:.5;cursor:not-allowed}.wrapper button.icon{width:36px;height:36px;padding:8px;margin:0;margin-inline-start:4px;border:none;border-radius:4px;color:var(--color-text);background-color:transparent;justify-content:center}.wrapper button.icon.with-label{width:auto;max-width:200px}.wrapper button.icon.with-label svg,.wrapper button.icon.with-label img{margin-right:4px}.wrapper button.icon.label-only{width:auto;max-width:200px}.wrapper button.icon.label-only svg,.wrapper button.icon.label-only img{display:none}.wrapper button svg,.wrapper button img{width:20px;height:20px;flex-shrink:0}.wrapper button .action-image{margin-inline-end:10px}.wrapper .button{position:absolute;right:0;bottom:0;height:48px;width:48px;max-width:unset;padding:0;margin:0;border:none;background-position:center center;background-repeat:no-repeat;cursor:pointer;justify-content:center;align-items:center;z-index:10000;color:var(--color-text);background-color:var(--color-launch-icon-background);border-radius:0;overflow:visible}.wrapper .button svg,.wrapper .button img{height:unset;width:unset;max-width:100%;max-height:100%}.wrapper .button:not(:disabled):hover,.wrapper .button:not(:disabled):focus,.wrapper .button:not(:disabled):active{background-color:var(--color-launch-icon-background)}@media screen and (min-width: 769px){.wrapper .button{height:64px;width:64px}}.wrapper .header{height:56px;padding:0 8px;background-color:var(--color-header-background);color:var(--color-header-text)}.wrapper .header .logo{flex:0 0 auto;width:36px;max-width:100px;height:36px;max-height:36px;overflow:hidden;padding:0}.wrapper .header .header-info-wrapper{flex-direction:column;flex-wrap:nowrap;width:100%;min-width:0;padding:0;margin:0 8px}.wrapper .header .header-info-wrapper .title{max-width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-size:1.125em;font-weight:700}.wrapper .header .header-info-wrapper .subtitle{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.wrapper .header .header-info-wrapper .connection-status{font-weight:bold;font-size:10px;justify-content:center;padding:0;margin:0;text-transform:uppercase;text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.wrapper .header .header-gap{flex:auto}.wrapper .header-actions{flex:1 0 auto;justify-content:flex-end;flex-direction:inherit}.wrapper .header-button svg>path{fill:var(--color-header-button-fill)}.wrapper .header-button:not(:disabled):hover,.wrapper .header-button:not(:disabled):focus{background-color:var(--color-header-button-background-hover)}.wrapper .header-button:not(:disabled):hover svg>path,.wrapper .header-button:not(:disabled):focus svg>path{fill:var(--color-header-button-fill-hover)}.wrapper .conversation{display:flex;flex:1;-webkit-box-orient:vertical;-webkit-box-direction:normal;flex-direction:column;overflow-x:hidden;overflow-y:auto;scroll-behavior:smooth;width:100%;padding:16px}.wrapper .conversation .conversation-pane .message-date,.wrapper .conversation .conversation-pane .relative-timestamp{font-size:12px;margin:8px 0 8px;color:var(--color-timestamp);text-align:start}.wrapper .conversation .conversation-pane .message-date.right,.wrapper .conversation .conversation-pane .relative-timestamp.right{text-align:end}.wrapper .conversation .conversation-pane.bot-icon .message.card-message-horizontal{margin-inline-start:-56px}.wrapper .conversation .conversation-pane.bot-icon .message.card-message-horizontal .message-header,.wrapper .conversation .conversation-pane.bot-icon .message.card-message-horizontal .message-footer,.wrapper .conversation .conversation-pane.bot-icon .message.card-message-horizontal .message-global-actions{margin-inline-start:56px}.wrapper .conversation .conversation-pane.bot-icon .message.card-message-horizontal .card-message-content .card-message-cards{padding-inline-start:56px}.wrapper .conversation .conversation-pane.bot-icon .relative-timestamp.left{margin-inline-start:40px}.wrapper .conversation .conversation-pane.user-icon .relative-timestamp.right{margin-inline-end:40px}.wrapper .conversation .conversation-pane.bot-icon .message-block .messages-wrapper,.wrapper .conversation .conversation-pane.user-icon .message-block .messages-wrapper{max-width:calc(0.9 * (100% - 40px))}.wrapper .conversation .conversation-pane.bot-icon .message-block .messages-wrapper .message.card-message-horizontal .message-header,.wrapper .conversation .conversation-pane.bot-icon .message-block .messages-wrapper .message.card-message-horizontal .message-footer,.wrapper .conversation .conversation-pane.bot-icon .message-block .messages-wrapper .message.card-message-horizontal .message-global-actions,.wrapper .conversation .conversation-pane.user-icon .message-block .messages-wrapper .message.card-message-horizontal .message-header,.wrapper .conversation .conversation-pane.user-icon .message-block .messages-wrapper .message.card-message-horizontal .message-footer,.wrapper .conversation .conversation-pane.user-icon .message-block .messages-wrapper .message.card-message-horizontal .message-global-actions{max-width:calc(0.9 * (100% - 72px))}.wrapper .conversation .conversation-pane.user-icon.bot-icon .message-block .messages-wrapper{max-width:calc(0.9 * (100% - 80px))}.wrapper .conversation .conversation-pane.user-icon.bot-icon .message-block .messages-wrapper .message.card-message-horizontal .message-header,.wrapper .conversation .conversation-pane.user-icon.bot-icon .message-block .messages-wrapper .message.card-message-horizontal .message-footer,.wrapper .conversation .conversation-pane.user-icon.bot-icon .message-block .messages-wrapper .message.card-message-horizontal .message-global-actions{max-width:calc(0.9 * (100% - 112px))}.wrapper .timestamp-header{text-align:center;font-size:12px;font-weight:700;color:var(--color-timestamp);margin:16px 0}.wrapper .hr{margin:24px 0;font-size:12px;color:var(--color-horizontal-rule-background)}.wrapper .hr:before{content:"";background-color:var(--color-horizontal-rule-background);height:1px;flex-grow:1;margin-right:10px}.wrapper .hr:after{content:"";background-color:var(--color-horizontal-rule-background);height:1px;flex-grow:1;margin-left:10px}.wrapper .card-actions,.wrapper .form-actions,.wrapper .message-actions,.wrapper .message-global-actions{margin-top:6px;display:flex;align-items:flex-start;justify-content:flex-start;flex-wrap:wrap}.wrapper .card-actions.form-message-actions-col,.wrapper .form-actions.form-message-actions-col,.wrapper .message-actions.form-message-actions-col,.wrapper .message-global-actions.form-message-actions-col{flex-basis:100%;max-width:100%}.wrapper .card-actions:not(.col) .action-postback,.wrapper .form-actions:not(.col) .action-postback,.wrapper .message-actions:not(.col) .action-postback,.wrapper .message-global-actions:not(.col) .action-postback{margin-right:8px}.wrapper .card-actions:not(.col) .action-postback:last-child,.wrapper .form-actions:not(.col) .action-postback:last-child,.wrapper .message-actions:not(.col) .action-postback:last-child,.wrapper .message-global-actions:not(.col) .action-postback:last-child{margin-right:0}.wrapper .action-postback{background:var(--color-actions-background);color:var(--color-actions-text);border-color:var(--color-actions-border);text-align:left}.wrapper .action-postback:not(:disabled):hover{color:var(--color-actions-text-hover);background-color:var(--color-actions-background-hover)}.wrapper .action-postback:not(:disabled):hover svg>path{fill:var(--color-actions-text-hover)}.wrapper .action-postback:not(:disabled):focus,.wrapper .action-postback:not(:disabled):active{background-color:var(--color-actions-background-focus);color:var(--color-actions-text-focus)}.wrapper .action-postback:not(:disabled):focus svg>path,.wrapper .action-postback:not(:disabled):active svg>path{fill:var(--color-actions-text-focus)}.wrapper .form-actions .action-postback{background:transparent;color:var(--color-form-actions-text);border-color:var(--color-form-actions-border)}.wrapper .form-actions .action-postback:not(:disabled):hover,.wrapper .form-actions .action-postback:not(:disabled):focus,.wrapper .form-actions .action-postback:not(:disabled):active{color:var(--color-form-actions-text);background-color:var(--color-form-actions-background-hover)}.wrapper .form-actions .action-postback:not(:disabled):hover svg>path,.wrapper .form-actions .action-postback:not(:disabled):focus svg>path,.wrapper .form-actions .action-postback:not(:disabled):active svg>path{fill:var(--color-form-actions-text)}.wrapper .message-global-actions{margin-top:8px}.wrapper .message-global-actions.stars{display:block}.wrapper .message-global-actions button{background:var(--color-global-actions-background);color:var(--color-global-actions-text);border-color:var(--color-global-actions-border)}.wrapper .message-global-actions button:not(:disabled):hover{background-color:var(--color-global-actions-background-hover);color:var(--color-global-actions-text-hover)}.wrapper .message-global-actions button:not(:disabled):hover svg>path{fill:var(--color-global-actions-text-hover)}.wrapper .message-global-actions button:not(:disabled):focus,.wrapper .message-global-actions button:not(:disabled):active{background-color:var(--color-global-actions-background-focus);color:var(--color-global-actions-text-focus)}.wrapper .message-global-actions button:not(:disabled):focus svg>path,.wrapper .message-global-actions button:not(:disabled):active svg>path{fill:var(--color-global-actions-text-focus)}.wrapper .message-bubble{position:relative;display:flex;flex-direction:column;align-items:flex-start;margin:0;padding:6px 16px;color:var(--color-bot-text);background:var(--color-bot-message-background);overflow:hidden;min-height:32px;line-height:20px;overflow-wrap:break-word;max-width:100%;border-radius:2px 10px 10px 2px;margin-top:2px}.wrapper .message-bubble>*{width:100%}.wrapper .message-bubble.before-card{border-radius:2px 10px 10px 10px}.wrapper .message-bubble .youtube-wrapper{margin:-6px -16px -11px}.wrapper .message-bubble .ovh-wrapper{width:100%;max-width:100%}.wrapper .message-bubble.error{background-color:var(--color-error-message-background);color:var(--color-error-text);border:1px dashed var(--color-error-border)}.wrapper .message-bubble.error .message-icon path{fill:var(--color-error-title)}.wrapper .message-bubble.error .message-title{color:var(--color-error-title)}.wrapper .message-bubble .message-with-icon{display:flex;align-items:flex-start;justify-content:space-between}.wrapper .message-bubble .message-with-icon .message-icon{width:24px;height:24px;align-items:center;margin-inline-end:16px}.wrapper .message-bubble .message-with-icon .message-text{word-break:break-word}.wrapper .message-bubble.message-header{margin-bottom:2px}.wrapper .message-bubble.message-footer{margin-top:2px}.wrapper .messages-wrapper{max-width:90%;align-items:flex-start}.wrapper .messages-wrapper .agent-name{position:relative;bottom:3px;max-width:calc(100%/0.9);height:16px;font-size:12px;line-height:16px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;color:var(--color-agent-name)}.wrapper .messages-wrapper .screen-reader-only{height:1px;left:-20000px;overflow:hidden;position:absolute;top:auto;width:1px}.wrapper .messages-wrapper .message-list{width:100%;align-items:flex-start}.wrapper .messages-wrapper .message-list .message{width:100%;white-space:pre-wrap}.wrapper .messages-wrapper .message-list .message a{color:var(--color-links)}.wrapper .messages-wrapper .message-list .message button.anchor-btn{padding:0}.wrapper .messages-wrapper .message-list .message button.anchor-btn a{display:block;text-decoration:inherit;color:inherit;padding:10px 20px}.wrapper .messages-wrapper .message-list .message button:last-child{margin-bottom:0}.wrapper .messages-wrapper .message-list .message .message-wrapper{display:flex;align-items:flex-start;flex-direction:column;width:100%;max-width:100%}.wrapper .messages-wrapper .message-list .message:first-child .message-bubble:not(.message-footer){margin-top:0}.wrapper .messages-wrapper .message-list .message:first-child .card-message-content:first-child .card-message-cards{margin-top:0}.wrapper .messages-wrapper .message-list .message:last-child .message-bubble:last-child{border-radius:2px 10px 10px 10px}.wrapper .messages-wrapper .message-list .message:last-child .card-message-content:last-child .card-message-cards{margin-bottom:-8px}.wrapper .messages-wrapper .message-list .message.card-message-horizontal{margin-inline-start:-16px;width:100vw}.wrapper .messages-wrapper .message-list .message.card-message-horizontal .message-header,.wrapper .messages-wrapper .message-list .message.card-message-horizontal .message-footer,.wrapper .messages-wrapper .message-list .message.card-message-horizontal .message-global-actions{margin-inline-start:16px;max-width:calc(0.9 * (100% - 32px))}.wrapper .messages-wrapper .message-list .message.card-message-horizontal .message-header{border-radius:2px 10px 10px 10px}.wrapper .messages-wrapper .message-list .message.card-message-horizontal .card-message-cards{flex-direction:row;overflow-x:auto;padding:0 56px 0 16px}.wrapper .messages-wrapper .message-list .message.card-message-horizontal .card{margin-inline-end:8px}.wrapper .messages-wrapper .message-list .message.card-message-horizontal .next-wrapper,.wrapper .messages-wrapper .message-list .message.card-message-horizontal .prev-wrapper{position:absolute;height:100%;top:0;width:52px;z-index:1}.wrapper .messages-wrapper .message-list .message.card-message-horizontal .next-wrapper{right:0;background:linear-gradient(90deg, rgba(255, 255, 255, 0), var(--color-conversation-background) 60%)}.wrapper .messages-wrapper .message-list .message.card-message-horizontal .prev-wrapper{left:0;background:linear-gradient(90deg, var(--color-conversation-background) 40%, rgba(255, 255, 255, 0))}.wrapper .messages-wrapper .message-list .message.card-message-horizontal .next,.wrapper .messages-wrapper .message-list .message.card-message-horizontal .previous{position:absolute;z-index:10;width:36px;height:36px;left:8px;padding:0;overflow:hidden;background-color:var(--color-card-nav-button);border:none;box-shadow:0px 2px 4px rgba(0,0,0,.1);top:calc(50% - 18px);justify-content:center}.wrapper .messages-wrapper .message-list .message.card-message-horizontal .next:hover,.wrapper .messages-wrapper .message-list .message.card-message-horizontal .previous:hover{background-color:var(--color-card-nav-button-hover)}.wrapper .messages-wrapper .message-list .message.card-message-horizontal .next:focus,.wrapper .messages-wrapper .message-list .message.card-message-horizontal .next:active,.wrapper .messages-wrapper .message-list .message.card-message-horizontal .previous:focus,.wrapper .messages-wrapper .message-list .message.card-message-horizontal .previous:active{background-color:var(--color-card-nav-button-focus)}.wrapper .message-block{justify-content:flex-start;align-items:flex-start;margin-bottom:8px}.wrapper .message-block.right{flex-direction:row-reverse}.wrapper .message-block.right .icon-wrapper{margin:unset;margin-inline-start:8px}.wrapper .message-block.right .messages-wrapper{align-items:flex-end}.wrapper .message-block.right .messages-wrapper .message a{color:var(--color-user-links)}.wrapper .message-block.right .messages-wrapper .message .message-wrapper{align-items:flex-end}.wrapper .message-block.right .messages-wrapper .message .message-bubble{border-radius:10px 2px 2px 10px}.wrapper .message-block.right .messages-wrapper .message .message-bubble:not(.error){color:var(--color-user-text);background:var(--color-user-message-background)}.wrapper .message-block.right .messages-wrapper .message:last-child .message-bubble:last-child{border-radius:10px 2px 10px 10px}.wrapper .message-block.right .message-date{text-align:right}.wrapper .icon-wrapper{margin-inline-end:8px;width:32px;min-width:32px;height:32px;border-radius:4px;overflow:hidden;z-index:1}.wrapper .icon-wrapper.agent-avatar{background:var(--color-agent-avatar-background);margin-top:16px}.wrapper .icon-wrapper .message-icon{height:32px;max-height:32px;max-width:32px;width:32px;color:var(--color-timestamp);overflow:hidden;text-overflow:ellipsis}.wrapper .icon-wrapper .agent-icon{position:relative;width:20px;height:20px;left:6px;top:6px;font-weight:700;font-size:16px;line-height:20px;text-align:center;color:var(--color-agent-initials)}.wrapper .attachment{width:100%}.wrapper .attachment .attachment-placeholder{background-color:var(--color-attachment-placeholder);max-width:calc(100% + 32px);min-width:228px;min-height:88px;max-height:230px;margin:-6px -16px 0;justify-content:center;overflow:hidden}.wrapper .attachment .attachment-placeholder>*{max-width:100%}.wrapper .attachment .attachment-placeholder .attachment-icon{height:48px;width:48px}.wrapper .attachment .attachment-placeholder .attachment-icon svg{height:48px;width:48px}.wrapper .attachment .attachment-placeholder .attachment-icon img{width:100%}.wrapper .attachment .attachment-placeholder .attachment-audio{height:50px;width:100%}.wrapper .attachment .attachment-placeholder .attachment-audio::-webkit-media-controls-enclosure{background-color:transparent}.wrapper .attachment .attachment-footer{background-color:var(--color-attachment-footer);color:var(--color-attachment-text);margin:0 -16px -6px;height:50px;padding:16px}.wrapper .attachment .attachment-footer.with-actions{border-bottom:thin solid rgba(22,21,19,.1);margin-bottom:6px}.wrapper .attachment .attachment-footer .attachment-title{flex-grow:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.wrapper .card{width:252px;border-radius:6px;padding:16px;margin-block-end:8px;justify-content:flex-start;flex-shrink:0;color:var(--color-bot-text);background:var(--color-card-background);overflow:hidden}.wrapper .card .card-image{display:block;width:calc(100% + 32px);margin:-16px -16px 10px;min-height:88px;background-color:var(--color-attachment-placeholder)}.wrapper .card .card-title{line-height:20px;margin:0 0 4px;font-weight:700;word-break:break-word}.wrapper .card .card-description{margin-bottom:16px;color:var(--color-text-light)}.wrapper .card-message-content{width:100%;position:relative}.wrapper .card-message-content .card-message-cards{width:100%;align-items:stretch;display:flex;scroll-behavior:smooth;overflow-x:visible;flex-direction:column;margin:8px 0 0;scrollbar-width:none}.wrapper .card-message-content .card-message-cards::-webkit-scrollbar{display:none}.wrapper .message-bubble-tabular-message{width:calc(1.11 * 100%);max-width:unset;border-radius:0 8px 8px 8px;padding:0;overflow:hidden;background-color:var(--color-table-background);color:var(--color-table-text);border:1px solid var(--color-table-header-background)}.wrapper .message-bubble-tabular-message~.message-footer{margin-top:8px}.wrapper .form-message-field,.wrapper .table-message-heading,.wrapper .table-message-item{overflow:hidden;overflow-wrap:break-word;word-break:break-word}.wrapper .table-message-wrapper{overflow:auto;background-color:#fff}.wrapper .table-message-wrapper .table-message{min-width:100%;max-width:200%;border-collapse:collapse}.wrapper .table-message-wrapper .table-message .table-message-headings{align-items:center;background-color:var(--color-table-header-background);display:flex}.wrapper .table-message-wrapper .table-message .table-message-headings .table-message-heading{color:rgba(22,21,19,.65);font-size:12px;font-weight:600;line-height:16px;padding:16px;min-width:120px}.wrapper .table-message-wrapper .table-message .table-message-row{border-top:1px solid var(--color-table-separator);display:flex;align-items:center}.wrapper .table-message-wrapper .table-message .table-message-row .table-message-item{color:var(--color-table-text);font-size:16px;line-height:20px;min-width:120px;padding:10px 16px}.wrapper .form-message-header{align-items:center;background-color:var(--color-table-header-background);color:var(--color-table-text);display:flex;font-weight:700;line-height:20px;padding:16px;text-align:start}.wrapper .form-message-item{display:flex;flex-flow:row wrap;justify-content:space-between;padding:16px 16px}.wrapper .form-message-item.with-border{border-bottom:1px solid var(--color-table-separator)}.wrapper .form-message-item .form-message-key{color:var(--color-form-label);font-size:12px;line-height:16px;font-weight:600}.wrapper .form-message-item .form-message-key.with-margin{margin-bottom:8px}.wrapper .form-message-item .form-message-field{margin-bottom:16px}.wrapper .form-message-item .form-message-field.form-message-field-col-1{flex-basis:100%;max-width:100%}.wrapper .form-message-item .form-message-field.edit-form-message-field{display:flex;flex-direction:column}.wrapper .form-message-item .form-message-field.edit-form-message-field input.form-message-value,.wrapper .form-message-item .form-message-field.edit-form-message-field select.form-message-value,.wrapper .form-message-item .form-message-field.edit-form-message-field textarea.form-message-value{border-radius:4px;border:1px solid var(--color-form-input-border);font-size:16px}.wrapper .form-message-item .form-message-field.edit-form-message-field.error input,.wrapper .form-message-item .form-message-field.edit-form-message-field.error select,.wrapper .form-message-item .form-message-field.edit-form-message-field.error textarea,.wrapper .form-message-item .form-message-field.edit-form-message-field.error .text-field-container{border-color:var(--color-form-error)}.wrapper .form-message-item .form-message-field.edit-form-message-field input.form-message-value{height:42px;padding:0 12px}.wrapper .form-message-item .form-message-field.edit-form-message-field input.form-message-value[type=date]::-webkit-calendar-picker-indicator,.wrapper .form-message-item .form-message-field.edit-form-message-field input.form-message-value[type=time]::-webkit-calendar-picker-indicator,.wrapper .form-message-item .form-message-field.edit-form-message-field input.form-message-value[type=number]::-webkit-inner-spin-button{cursor:pointer;width:20px;height:20px;margin-right:-8px}.wrapper .form-message-item .form-message-field.edit-form-message-field select.form-message-value{height:42px;padding:0 12px;appearance:none;background-position-x:calc(100% - 4px);background-position-y:50%}.wrapper .form-message-item .form-message-field.edit-form-message-field textarea.form-message-value{overflow:hidden;padding:11px 12px;resize:none}.wrapper .form-message-item .form-message-field.edit-form-message-field .form-container{display:flex}.wrapper .form-message-item .form-message-field.edit-form-message-field .form-container label{display:flex;min-height:36px;align-items:center;padding:7.5px 0;border-bottom:1px solid transparent}.wrapper .form-message-item .form-message-field.edit-form-message-field .form-container .radio-input{margin-right:8px}.wrapper .form-message-item .form-message-field.edit-form-message-field .text-field-container{border-radius:4px;border:1px solid var(--color-form-input-border);display:flex;min-height:44px;flex-direction:row;cursor:text}.wrapper .form-message-item .form-message-field.edit-form-message-field .text-field-container .selected-options{padding:0 12px 5px}.wrapper .form-message-item .form-message-field.edit-form-message-field .text-field-container .selected-options .multi-select-option{float:left;line-height:16px;display:flex;align-items:center;cursor:default;border-radius:4px;border:1px solid var(--color-form-input-border);color:#161513;background-clip:padding-box;font-size:12px;margin-inline-end:6px;margin-top:5px;padding-inline-end:4px;padding-inline-start:6px}.wrapper .form-message-item .form-message-field.edit-form-message-field .text-field-container .selected-options .multi-select-option .opt-close{cursor:pointer;height:16px;width:16px}.wrapper .form-message-item .form-message-field.edit-form-message-field .multi-select-list{position:relative;max-height:400px;animation:none;background-color:var(--color-popup-item-background-hover);z-index:3}.wrapper .form-message-item .form-message-field.edit-form-message-field .toggle{position:relative;width:36px;height:36px}.wrapper .form-message-item .form-message-field.edit-form-message-field .toggle input{display:none}.wrapper .form-message-item .form-message-field.edit-form-message-field .toggle input:checked+.round-slider{background-color:#227e9e;border-color:#227e9e}.wrapper .form-message-item .form-message-field.edit-form-message-field .toggle input:checked+.round-slider:before{right:1px;left:auto;transition:height .3s cubic-bezier(0, 0, 0.2, 1),width .3s cubic-bezier(0, 0, 0.2, 1),right .3s cubic-bezier(0, 0, 0.2, 1)}.wrapper .form-message-item .form-message-field.edit-form-message-field .toggle .round-slider{position:absolute;cursor:pointer;background-color:#8b8580;transition:background-color .2s linear .1s,opacity .2s linear .1s,border-color .2s linear .1s;top:8px;border:1px solid transparent;border-radius:4px;height:20px;width:36px}.wrapper .form-message-item .form-message-field.edit-form-message-field .toggle .round-slider:before{border-radius:4px;width:16px;height:16px;left:1px;right:auto;position:absolute;content:"";bottom:1px;background-color:var(--color-table-background);transition:height .3s cubic-bezier(0, 0, 0.2, 1),width .3s cubic-bezier(0, 0, 0.2, 1),left .3s cubic-bezier(0, 0, 0.2, 1)}.wrapper .form-message-item .form-message-field.form-message-field-col-2{flex-basis:calc(50% - 12px);max-width:calc(50% - 12px)}.wrapper .form-message-item span.field-error{display:flex;margin-top:2px;line-height:16px}.wrapper .form-message-item span.field-error .error-text{color:var(--color-form-error-text);font-size:12px;margin-left:4px}.wrapper .form-message-item span.field-error svg.form-error-icon{position:relative;height:16px;width:16px;fill:var(--color-form-error);flex-shrink:0}.wrapper .form-message-item span.field-error.form-error{padding:8px;background:var(--color-error-message-background);border-radius:4px;margin:16px 0;border:thin dashed var(--color-error-border)}.wrapper .form-message-item span.field-error.form-error svg.form-error-icon{top:0}.wrapper .form-message-item span.field-error.form-error .error-text{font-weight:600;color:var(--color-error-title);margin-left:8px;font-size:14px}.wrapper .tableform-message .table-message-row{cursor:pointer}.wrapper .tableform-message .table-message-row:hover{background-color:var(--color-row-item-background-hover)}.wrapper .tableform-message .table-message-row button:hover,.wrapper .tableform-message .table-message-row button:active,.wrapper .tableform-message .table-message-row button:focus{background-color:unset}.wrapper .tableform-message .table-message-headings .table-message-heading:last-child,.wrapper .tableform-message .table-message-row .table-message-item:last-child{min-width:unset;padding:0}.wrapper .tableform-message .table-message-headings .table-message-heading:last-child button,.wrapper .tableform-message .table-message-row .table-message-item:last-child button{margin:0 2px;transition:transform .25s ease-in-out}.wrapper .tableform-message .table-message-headings .table-message-heading:last-child button.rotate-180,.wrapper .tableform-message .table-message-row .table-message-item:last-child button.rotate-180{transform:rotate3d(0, 0, 1, 180deg)}.wrapper .tableform-message .form-message-item{background-color:#fbf9f8;margin:0;padding:16px;transition:all .25s ease-in-out;border-bottom:none}.wrapper .tableform-message .form-message-item.none{display:none}.wrapper .tableform-message .form-message-item:last-child{border-top:1px solid var(--color-table-bottom)}.wrapper .results-page-status{align-items:center;background-color:#fff;color:#161513;display:flex;flex-direction:row;font-size:13.75px;justify-content:flex-end;line-height:16px;padding:12px 16px;border-top:1px solid var(--color-table-separator)}.wrapper .footer{max-width:100%;padding:0;background-color:var(--color-footer-background);z-index:3;box-shadow:0px -1px 4px 0px #0000001a;border-top:1px solid rgba(22,21,19,.1)}.wrapper .footer .footer-mode-keyboard{min-height:44px;margin:5px;background-color:var(--color-input-background);color:var(--color-input-text);border:1px solid var(--color-input-border);border-radius:6px}.wrapper .footer .footer-mode-voice{height:60px;padding:14px 0;background:var(--color-visualizer-container-background);justify-content:center}.wrapper .footer .footer-mode-voice .footer-visualizer-wrapper{max-width:296px;height:32px}.wrapper .footer .audio-text-wrapper{width:100%}.wrapper .footer .audio-text-wrapper .audio-text{flex-grow:1;height:34px;margin:0px 5px;border:none;outline:none;font-size:1em;background-color:transparent;color:var(--color-recognition-view-text)}.wrapper .footer.mode-keyboard .button-switch-kbd{display:none}.wrapper .footer.mode-keyboard .footer-mode-voice{display:none}.wrapper .footer.mode-voice .button-switch-voice{display:none}.wrapper .user-input{flex-grow:1;min-height:44px;padding:10px;margin:0;font-size:1em;font-family:inherit;line-height:24px;outline:none;resize:none;border:none;border-radius:6px;background-color:transparent;color:var(--color-input-text)}.wrapper .footer-actions{padding-inline-end:4px}.wrapper .footer-button.button-send{background-color:var(--color-footer-button-fill);border-radius:50%}.wrapper .footer-button.button-send svg>path{fill:var(--color-input-background)}.wrapper .footer-button.button-send:not(:disabled):hover{background-color:var(--color-footer-button-fill-hover)}.wrapper .footer-button.button-send:not(:disabled):hover svg>path{fill:var(--color-input-background)}.wrapper .footer-button svg>path{fill:var(--color-footer-button-fill)}.wrapper .footer-button:not(:disabled):hover,.wrapper .footer-button:not(:disabled):focus{background-color:var(--color-footer-button-background-hover)}.wrapper .footer-button:not(:disabled):hover svg>path,.wrapper .footer-button:not(:disabled):focus svg>path{fill:var(--color-footer-button-fill-hover)}.wrapper .autocomplete-items{position:absolute;bottom:56px;width:100%;max-height:calc(100% - 56px);overflow-y:auto;background-color:var(--color-input-background);box-shadow:0px -1px 4px 0px #0000001a;padding:8px 0}.wrapper .autocomplete-items>div{min-height:40px;padding:8px 16px;cursor:pointer}.wrapper .autocomplete-items>div:hover,.wrapper .autocomplete-items>div.autocomplete-active{background-color:var(--color-card-nav-button-hover)}.wrapper .autocomplete-items>div strong{font-weight:700}.wrapper .dialog-wrapper{position:absolute;top:0;left:0;right:0;width:100%;height:100%}.wrapper .dialog-wrapper .prompt-banner-background{position:fixed;background:rgba(0,0,0,.2);height:100%;width:100%;z-index:5}.wrapper .dialog-wrapper .prompt-banner{align-items:center;box-shadow:rgba(0,0,0,.16) 0px 4px 8px 0px;border-radius:6px;display:flex;flex-direction:row;position:absolute;max-width:450px;min-height:48px;max-height:60%;top:30%;left:0;right:0;padding:8px 16px;margin:8px auto;width:calc(100% - 16px);z-index:5;animation:banner-in .2s cubic-bezier(0.22, 0.45, 0.42, 0.92) both;background-color:var(--color-popup-background);flex-direction:column;align-items:flex-start;overflow-y:auto}.wrapper .dialog-wrapper .prompt-banner.prompt-banner-out{animation:banner-out .2s cubic-bezier(0.5, 0.07, 0.68, 0.48) both}.wrapper .dialog-wrapper .prompt-banner .prompt-banner-main-content{margin:16px 0;align-items:flex-start}.wrapper .dialog-wrapper .prompt-banner .prompt-banner-main-content .prompt-banner-icon{margin:4px 16px 0 0}.wrapper .dialog-wrapper .prompt-banner .prompt-banner-main-content .prompt-banner-text{margin:0 28px 0 0;font-size:18px;font-weight:bold;color:var(--color-popup-text)}.wrapper .dialog-wrapper .prompt-banner .prompt-banner-main-content .prompt-banner-description{color:var(--color-popup-text);opacity:.6;font-size:13px;margin:8px 28px 0 0}.wrapper .dialog-wrapper .prompt-banner .prompt-banner-main-content .prompt-banner-label{color:var(--color-popup-text);font-size:large}.wrapper .dialog-wrapper .prompt-banner .prompt-banner-main-content .prompt-banner-input{font-size:medium;min-height:36px;width:100%;margin-bottom:10px;padding:10px;color:var(--color-popup-text);background-color:var(--color-popup-input-background);border:1px solid var(--color-popup-input-border);border-radius:4px}.wrapper .dialog-wrapper .prompt-banner .prompt-banner-close-button{position:absolute;border:none;right:16px}.wrapper .dialog-wrapper .prompt-banner .action-wrapper{width:100%;margin:16px 0 6px}.wrapper .dialog-wrapper .prompt-banner .action-wrapper .popup-action{background-color:var(--color-popup-button-background);border-color:var(--color-popup-button-text);color:var(--color-popup-button-text);border-style:solid;margin:0;height:34px;justify-content:center;width:49%}.wrapper .dialog-wrapper .prompt-banner .action-wrapper .popup-action:hover{background-color:var(--color-footer-button-background-hover)}.wrapper .dialog-wrapper .prompt-banner .action-wrapper .popup-action:last-child{margin:0}.wrapper .dialog-wrapper .prompt-banner .action-wrapper .popup-action.filled{background-color:var(--color-popup-button-text);color:var(--color-popup-button-background)}.wrapper .dialog-wrapper .prompt-banner .action-wrapper .popup-action.filled:hover{opacity:.9}.wrapper .dialog-wrapper.end-conversation-prompt .prompt-banner-close-button{display:none}.wrapper.embedded .open{width:100%;height:100%}.wrapper.embedded .open .widget{border-radius:0;width:100%;height:100%;position:inherit;box-shadow:none;max-height:unset}@media(min-width: 1024px){.wrapper.embedded .conversation .conversation-pane .message-bubble{padding:16px 24px}.wrapper.embedded .conversation .conversation-pane .message-bubble .attachment .attachment-placeholder{margin:-16px -24px 0;max-width:calc(100% + 48px)}.wrapper.embedded .conversation .conversation-pane .message-bubble .attachment .attachment-footer{margin:0 -24px -16px}.wrapper.embedded .conversation .conversation-pane.bot-icon .message-block .messages-wrapper,.wrapper.embedded .conversation .conversation-pane.user-icon .message-block .messages-wrapper{max-width:780px}.wrapper.embedded .conversation .conversation-pane.bot-icon .message-block .messages-wrapper .message-header,.wrapper.embedded .conversation .conversation-pane.bot-icon .message-block .messages-wrapper .message-footer,.wrapper.embedded .conversation .conversation-pane.user-icon .message-block .messages-wrapper .message-header,.wrapper.embedded .conversation .conversation-pane.user-icon .message-block .messages-wrapper .message-footer{max-width:780px}.wrapper.embedded .conversation .conversation-pane.bot-icon.bot-icon .message-block .messages-wrapper,.wrapper.embedded .conversation .conversation-pane.user-icon.bot-icon .message-block .messages-wrapper{max-width:780px}.wrapper.embedded .conversation .conversation-pane.bot-icon.bot-icon .message-block .messages-wrapper .message.card-message-horizontal .message-header,.wrapper.embedded .conversation .conversation-pane.bot-icon.bot-icon .message-block .messages-wrapper .message.card-message-horizontal .message-footer,.wrapper.embedded .conversation .conversation-pane.user-icon.bot-icon .message-block .messages-wrapper .message.card-message-horizontal .message-header,.wrapper.embedded .conversation .conversation-pane.user-icon.bot-icon .message-block .messages-wrapper .message.card-message-horizontal .message-footer{max-width:780px}.wrapper.embedded button:not(.icon){height:44px}}@media(min-width: 900px)and (max-width: 1023px){.wrapper.embedded .conversation .conversation-pane .message-bubble{padding:8px 16px}.wrapper.embedded .conversation .conversation-pane .message-bubble .attachment .attachment-placeholder{margin:-8px -16px 0}.wrapper.embedded .conversation .conversation-pane .message-bubble .attachment .attachment-footer{margin:0 -16px -8px}.wrapper.embedded .conversation .conversation-pane.bot-icon .message-block .messages-wrapper,.wrapper.embedded .conversation .conversation-pane.user-icon .message-block .messages-wrapper{max-width:680px}.wrapper.embedded .conversation .conversation-pane.bot-icon .message-block .messages-wrapper .message.card-message-horizontal .message-header,.wrapper.embedded .conversation .conversation-pane.bot-icon .message-block .messages-wrapper .message.card-message-horizontal .message-footer,.wrapper.embedded .conversation .conversation-pane.user-icon .message-block .messages-wrapper .message.card-message-horizontal .message-header,.wrapper.embedded .conversation .conversation-pane.user-icon .message-block .messages-wrapper .message.card-message-horizontal .message-footer{max-width:680px}.wrapper.embedded .conversation .conversation-pane.bot-icon.bot-icon .message-block .messages-wrapper,.wrapper.embedded .conversation .conversation-pane.user-icon.bot-icon .message-block .messages-wrapper{max-width:680px}.wrapper.embedded .conversation .conversation-pane.bot-icon.bot-icon .message-block .messages-wrapper .message.card-message-horizontal .message-bubble,.wrapper.embedded .conversation .conversation-pane.user-icon.bot-icon .message-block .messages-wrapper .message.card-message-horizontal .message-bubble{padding:16px 24px}.wrapper.embedded .conversation .conversation-pane.bot-icon.bot-icon .message-block .messages-wrapper .message.card-message-horizontal .message-header,.wrapper.embedded .conversation .conversation-pane.bot-icon.bot-icon .message-block .messages-wrapper .message.card-message-horizontal .message-footer,.wrapper.embedded .conversation .conversation-pane.user-icon.bot-icon .message-block .messages-wrapper .message.card-message-horizontal .message-header,.wrapper.embedded .conversation .conversation-pane.user-icon.bot-icon .message-block .messages-wrapper .message.card-message-horizontal .message-footer{max-width:680px}.wrapper.embedded button:not(.icon){height:44px}}.wrapper .full-screen-modal{position:fixed;top:0;left:0;width:100%;height:100vh;z-index:1000000;background-color:rgba(0,0,0,.8)}.wrapper .modal-header{background:linear-gradient(180deg, rgba(0, 0, 0, 0.5), transparent);color:#fff;display:flex;justify-content:space-between;position:relative;padding:10px 20px;z-index:1000001}.wrapper .modal-header .close-btn{border:none;background:transparent;cursor:pointer}.wrapper .full-screen-image{position:absolute;max-width:100vw;max-height:100vh;margin:auto;top:0;bottom:0;left:0;right:0}.wrapper .typing-cue-wrapper{width:32px;margin:auto}.wrapper .typing-cue-wrapper .typing-cue{position:relative;left:0;right:0;margin:auto;width:8px;height:8px;border-radius:50%;background-color:var(--color-typing-indicator);animation:typing-cue 1550ms infinite linear alternate;animation-delay:250ms;opacity:.1}.wrapper .typing-cue-wrapper .typing-cue::before,.wrapper .typing-cue-wrapper .typing-cue::after{content:"";display:inline-block;position:absolute;width:8px;height:8px;border-radius:50%;background-color:var(--color-typing-indicator);animation:typing-cue 1550ms infinite linear alternate;opacity:.1}.wrapper .typing-cue-wrapper .typing-cue::before{left:-12px;animation-delay:0s}.wrapper .typing-cue-wrapper .typing-cue::after{left:12px;animation-delay:500ms}.wrapper .hidden{border:0;clip:rect(0 0 0 0);height:1px;margin:-1px;overflow:hidden;padding:0;position:absolute;width:1px}.wrapper .rating-root{display:flex}.wrapper [dir=rtl] .rating-root{flex-direction:row-reverse}.wrapper .rating-wrapper{display:flex;margin-top:8px}.wrapper [dir=rtl] .rating-wrapper{flex-direction:row-reverse}.wrapper .rating-hidden{border:0;clip:rect(0 0 0 0);height:1px;margin:-1px;overflow:hidden;padding:0;position:absolute;width:1px}.wrapper .star-label{background-color:transparent;border:0;cursor:pointer;padding:0}.wrapper .star-label>svg>path{fill:var(--color-rating-star)}.wrapper .star-input.active+label>svg>path{fill:var(--color-rating-star-fill)}.wrapper .star-input:disabled+.star-label{cursor:not-allowed;filter:brightness(0.8)}.wrapper .rating-star-icon{height:32px;width:32px}.wrapper.expanded .widget{animation:scale-in-br .25s cubic-bezier(0.25, 0.46, 0.45, 0.94) .2s both}.wrapper.expanded:not(.drag) .button{animation:scale-out-center .25s cubic-bezier(0.55, 0.085, 0.68, 0.53) forwards}.wrapper.collapsed .widget{animation:scale-out-br .25s cubic-bezier(0.55, 0.085, 0.68, 0.53) forwards}.wrapper.collapsed .notification-badge{background-color:var(--color-notification-badge-background);color:var(--color-notification-badge-text);right:-5px;top:-5px;align-items:center;border-radius:24px;display:flex;font-size:14px;height:24px;justify-content:center;position:absolute;text-align:center;width:32px}.wrapper.collapsed:not(.drag) .button{animation:scale-in-center .25s cubic-bezier(0.25, 0.46, 0.45, 0.94) .2s both}.wrapper.pos-left .widget{right:unset;left:calc(var(--position-left) * -1);max-width:100vw}.wrapper.pos-left.expanded .widget{animation:scale-in-bl .25s cubic-bezier(0.25, 0.46, 0.45, 0.94) .2s both}.wrapper.pos-left.collapsed .widget{animation:scale-out-bl .25s cubic-bezier(0.55, 0.085, 0.68, 0.53) forwards}.wrapper .ellipsis{display:inline-block;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.wrapper .popup{position:absolute;background-color:var(--color-popup-background);color:var(--color-popup-text);min-width:140px;max-height:calc(100% - 128px);display:none;padding:4px 0;border-radius:6px;box-shadow:rgba(0,0,0,.16) 0px 4px 8px 0px;overflow-y:auto;z-index:5}.wrapper .popup li{display:flex;align-items:center;height:48px;margin:4px 0;cursor:pointer;overflow:hidden;color:var(--color-popup-button-text)}.wrapper .popup li svg>path{fill:var(--color-popup-text)}.wrapper .popup li#action-menu-option-lang{border-top:1px solid var(--color-popup-horizontal-rule)}.wrapper .popup li.disable{pointer-events:none;cursor:not-allowed;opacity:.5}.wrapper .popup li:hover,.wrapper .popup li:focus,.wrapper .popup li.active{background-color:var(--color-popup-item-background-hover)}.wrapper .popup li .icon{margin-inline-start:16px;height:20px;width:20px}.wrapper .popup li .text{padding:0 16px 0 16px}.wrapper .popup.expand{display:block;-webkit-animation:scale-in-br .25s cubic-bezier(0.25, 0.46, 0.45, 0.94) .2s both;animation:scale-in-br .25s cubic-bezier(0.25, 0.46, 0.45, 0.94) .2s both}.wrapper .popup.action-menu,.wrapper .popup.language-selection-menu{top:50px;bottom:unset}.wrapper .popup.action-menu.expand,.wrapper .popup.language-selection-menu.expand{display:block;-webkit-animation:scale-in-tr .25s cubic-bezier(0.25, 0.46, 0.45, 0.94) .2s both;animation:scale-in-tr .25s cubic-bezier(0.25, 0.46, 0.45, 0.94) .2s both}.wrapper .popup.language-selection-menu{max-height:calc(100% - 280px)}.wrapper .popup.share-popup-list{position:fixed;bottom:50px;left:unset}.wrapper .spinner{height:48px;width:48px}.wrapper .spinner svg{animation-duration:750ms;-webkit-animation:spin 1s linear infinite;animation:spin 1s linear infinite}.wrapper .spinner svg circle{fill:transparent;stroke:var(--color-user-text);stroke-width:2px;stroke-dasharray:128px;stroke-dashoffset:82px}.wrapper .webview-container{position:absolute;width:100%;height:80%;bottom:0;box-shadow:0px -4px 32px rgba(0,0,0,.1);z-index:10}.wrapper .webview-container .webview-header svg{fill:var(--color-actions-text)}.wrapper .webview-container .webview-header button{color:var(--color-actions-text)}.wrapper .webview-container .spinner{position:absolute;margin:auto;left:0;right:0;top:40%}.wrapper .webview-container iframe{width:100%;height:100%;background:var(--color-conversation-background);border:none}.wrapper .webview-container .webview-error{position:absolute;bottom:0;background:var(--color-popup-background);width:calc(100% - 32px);margin:10px 16px;padding:6px 16px;border-radius:6px;display:flex;align-items:center;box-shadow:0px -4px 32px rgba(0,0,0,.1)}.wrapper .webview-container .webview-error .webview-error-button-close{border:none}.wrapper .webview-container.webview-container-close{animation:oda-chat-webview-slide-out-bottom .4s cubic-bezier(0.55, 0.085, 0.68, 0.53) both}.wrapper .webview-container.webview-container-open{animation:oda-chat-webview-slide-in-bottom .4s cubic-bezier(0.25, 0.46, 0.45, 0.94) both}.button-drag-handle{position:absolute;width:100%;height:100%}.image-preview-wrapper{background:rgba(0,0,0,.8);height:100%;position:fixed;top:0;left:0;width:100%;z-index:10000}.image-preview-wrapper .image-preview-header{align-items:center;background:linear-gradient(180deg, rgba(0, 0, 0, 0.5), transparent);color:#fff;display:flex;justify-content:space-between;position:relative;padding:10px 20px;z-index:1000001}.image-preview-wrapper .image-preview-header .image-preview-close{background:transparent;border:none;cursor:pointer;height:36px;width:36px}.image-preview-wrapper .image-preview-header .image-preview-close .image-preview-close-icon{fill:#fff;height:100%;width:100%}.image-preview-wrapper .image-preview{bottom:0;left:0;margin:auto;max-height:100vh;max-width:100vw;position:absolute;right:0;top:0}.arrow-icon{margin-inline-end:2px;width:32px;height:32px;display:flex;align-items:center;flex-shrink:0}@media screen and (min-width: 426px){.wrapper .widget{width:var(--width-full-screen);height:620px;bottom:0;right:0}.wrapper .messages-wrapper .message-list .message.card-message-horizontal{width:var(--width-full-screen)}.wrapper.pos-left .widget{left:0}.wrapper:not(.embedded) .widget{max-width:calc(100vw - var(--position-right))}.wrapper:not(.embedded).pos-left .widget{max-width:calc(100vw - var(--position-left))}}@media(prefers-reduced-motion){.open{animation:none}.close{animation:none}}[dir=rtl] *:not(.card-message-horizontal .message-wrapper *){direction:rtl}[dir=rtl] .card-message-horizontal .message-wrapper .card{direction:rtl}[dir=rtl] .card-message-horizontal .message-wrapper .card *{direction:rtl}[dir=rtl] .wrapper{text-align:right}[dir=rtl] .wrapper .widget.open{animation:scale-in-bl .25s cubic-bezier(0.25, 0.46, 0.45, 0.94) .2s both}[dir=rtl] .wrapper .widget.close{animation:scale-out-bl .25s cubic-bezier(0.55, 0.085, 0.68, 0.53) forwards}[dir=rtl] .wrapper .message-bubble{border-radius:10px 2px 2px 10px}[dir=rtl] .wrapper .message-block .message:last-child .message-bubble:last-child{border-radius:10px 2px 10px 10px}[dir=rtl] .wrapper .message-block.right .messages-wrapper .message .message-bubble{border-radius:2px 10px 10px 2px}[dir=rtl] .wrapper .message-block.right .messages-wrapper .message:last-child .message-bubble:last-child{border-radius:2px 10px 10px 10px}[dir=rtl] .wrapper .button{left:0;right:unset}[dir=rtl] .wrapper .popup.expand{-webkit-animation:scale-in-bl .25s cubic-bezier(0.25, 0.46, 0.45, 0.94) .2s both;animation:scale-in-bl .25s cubic-bezier(0.25, 0.46, 0.45, 0.94) .2s both}[dir=rtl] .wrapper .popup.action-menu.expand,[dir=rtl] .wrapper .popup.language-selection-menu.expand{-webkit-animation:scale-in-tl .25s cubic-bezier(0.25, 0.46, 0.45, 0.94) .2s both;animation:scale-in-tl .25s cubic-bezier(0.25, 0.46, 0.45, 0.94) .2s both}';
                    },
                    24: function (e, t, i) {
                        function s() {
                            let e = {};
                            return {
                                bind: (t, i) => {
                                    t && i && W(i) && (Object.prototype.hasOwnProperty.call(e, t) ? e[t].push(i) : (e[t] = [i]));
                                },
                                trigger: (t, ...i) => {
                                    if (Object.prototype.hasOwnProperty.call(e, t)) {
                                        const s = null != i ? i : [];
                                        e[t].forEach((e) => {
                                            try {
                                                e.call(null, ...s);
                                            } catch (e) {
                                                console.error(`${t} listener error`, e);
                                            }
                                        });
                                    }
                                },
                                unbind: (t, i) => {
                                    t ? (i || !Object.prototype.hasOwnProperty.call(e, t) ? e[t] && (e[t] = e[t].filter((e) => e !== i)) : e[t].splice(0, e[t].length)) : (e = {});
                                },
                            };
                        }
                        var n, o, a;
                        i.r(t),
                            i.d(t, {
                                AuthError: function () {
                                    return a;
                                },
                                AuthTokenService: function () {
                                    return l;
                                },
                                Deferred: function () {
                                    return f;
                                },
                                JWT: function () {
                                    return r;
                                },
                                KeyCode: function () {
                                    return n;
                                },
                                ShareCategory: function () {
                                    return o;
                                },
                                buildURL: function () {
                                    return Z;
                                },
                                drawVisualizer: function () {
                                    return J;
                                },
                                formatDate: function () {
                                    return Y;
                                },
                                generateEventDispatcher: function () {
                                    return s;
                                },
                                getLongPollURL: function () {
                                    return Q;
                                },
                                getWebSocketURL: function () {
                                    return X;
                                },
                                isAndroid: function () {
                                    return G;
                                },
                                isApple: function () {
                                    return q;
                                },
                                isFunction: function () {
                                    return W;
                                },
                                isMobile: function () {
                                    return K;
                                },
                                isSameDay: function () {
                                    return ee;
                                },
                                startTimer: function () {
                                    return H;
                                },
                                supportedLang: function () {
                                    return j;
                                },
                            }),
                            (function (e) {
                                (e.Return = "Enter"),
                                    (e.Esc = "Escape"),
                                    (e.Space = "Space"),
                                    (e.Left = "ArrowLeft"),
                                    (e.Up = "ArrowUp"),
                                    (e.Right = "ArrowRight"),
                                    (e.Down = "ArrowDown"),
                                    (e.Tab = "Tab"),
                                    (e.PageDown = "PageDown"),
                                    (e.PageUp = "PageUp"),
                                    (e.Home = "Home"),
                                    (e.End = "End"),
                                    (e.Backspace = "Backspace");
                            })(n || (n = {})),
                            (function (e) {
                                (e.Audio = "audio"), (e.File = "file"), (e.Location = "location"), (e.Visual = "visual");
                            })(o || (o = {})),
                            (function (e) {
                                (e.AuthExpiredToken = "AuthExpiredToken"),
                                    (e.AuthNoToken = "AuthNoToken"),
                                    (e.AuthNoChannelId = "AuthNochannelId"),
                                    (e.AuthNoUserId = "AuthNouserId"),
                                    (e.AuthNoExp = "AuthNoexp"),
                                    (e.AuthNoIat = "AuthNoiat"),
                                    (e.AuthInvalidChannelId = "AuthInvalidchannelId"),
                                    (e.AuthInvalidUserId = "AuthInvaliduserId"),
                                    (e.AuthInvalidExp = "AuthInvalidexp"),
                                    (e.AuthInvalidIat = "AuthInvalidiat"),
                                    (e.AuthEmptyChannelIdClaim = "AuthInvalidchannelId"),
                                    (e.AuthEmptyUserIdClaim = "AuthInvaliduserId"),
                                    (e.AuthNegativeExp = "AuthNegativeexp"),
                                    (e.AuthNegativeIat = "AuthNegativeiat"),
                                    (e.AuthExpLessThanIat = "AuthExpLessThanIat");
                            })(a || (a = {}));
                        class r {
                            constructor(e) {
                                this.token = e;
                                const t = this.token.split(".");
                                this.payload = JSON.parse(atob(t[1]));
                            }
                            getClaim(e) {
                                return this.payload[e];
                            }
                        }
                        const c = Promise;
                        class l {
                            static getInstance() {
                                return this.service || (this.service = new l()), this.service;
                            }
                            get() {
                                return this.jws && u(this.jws)
                                    ? c.resolve(this.jws)
                                    : new c((e, t) => {
                                          c.resolve(this.fetch()).then((i) => {
                                              this.jws = new r(i);
                                              try {
                                                  if (
                                                      ((function (e) {
                                                          e || m(a.AuthNoToken);
                                                          const t = "iat",
                                                              i = e.getClaim(t);
                                                          g(t, d, i);
                                                          const s = e.getClaim(p);
                                                          g(p, d, s), s <= i && m(a.AuthExpLessThanIat);
                                                          const n = "channelId",
                                                              o = e.getClaim(n);
                                                          g(n, h, o);
                                                          const r = "userId",
                                                              c = e.getClaim(r);
                                                          g(r, h, c);
                                                      })(this.jws),
                                                      u(this.jws))
                                                  )
                                                      return void e(this.jws);
                                                  m(a.AuthExpiredToken);
                                              } catch (e) {
                                                  t(e);
                                              }
                                          });
                                      });
                            }
                            reset() {
                                this.jws = void 0;
                            }
                            setFetch(e) {
                                if (!W(e)) throw new Error("'generateAuthToken' is not a function. Create a function that returns a Promise that resolves to a new JWT when called.");
                                (this.fetch = e), this.reset();
                            }
                        }
                        const h = "string",
                            d = "number",
                            p = "exp";
                        function u(e) {
                            const t = Math.floor((Date.now() + 2e4) / 1e3);
                            return e.getClaim(p) > t;
                        }
                        function g(e, t, i) {
                            null == i && m(`AuthNo${e}`), typeof i !== t && m(`AuthInvalid${e}`), "number" == typeof i ? i <= 0 && m(`AuthNegative${e}`) : i.length || m(`AuthEmpty${e}`);
                        }
                        function m(e) {
                            throw Error(e);
                        }
                        class f {
                            constructor() {
                                (this.promise = new Promise((e, t) => {
                                    (this.resolve = e), (this.reject = t);
                                })),
                                    Object.freeze(this);
                            }
                        }
                        var b = /d{1,4}|M{1,4}|YY(?:YY)?|S{1,3}|Do|ZZ|Z|([HhMsDm])\1?|[aA]|"[^"]*"|'[^']*'/g,
                            v = /\[([^]*?)\]/gm;
                        function w(e, t) {
                            for (var i = [], s = 0, n = e.length; s < n; s++) i.push(e[s].substr(0, t));
                            return i;
                        }
                        var x = function (e) {
                            return function (t, i) {
                                var s = i[e].map(function (e) {
                                        return e.toLowerCase();
                                    }),
                                    n = s.indexOf(t.toLowerCase());
                                return n > -1 ? n : null;
                            };
                        };
                        function C(e) {
                            for (var t = [], i = 1; i < arguments.length; i++) t[i - 1] = arguments[i];
                            for (var s = 0, n = t; s < n.length; s++) {
                                var o = n[s];
                                for (var a in o) e[a] = o[a];
                            }
                            return e;
                        }
                        var S = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                            y = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
                            k = w(y, 3),
                            _ = {
                                dayNamesShort: w(S, 3),
                                dayNames: S,
                                monthNamesShort: k,
                                monthNames: y,
                                amPm: ["am", "pm"],
                                DoFn: function (e) {
                                    return e + ["th", "st", "nd", "rd"][e % 10 > 3 ? 0 : ((e - (e % 10) != 10 ? 1 : 0) * e) % 10];
                                },
                            },
                            T = C({}, _),
                            I = function (e, t) {
                                for (void 0 === t && (t = 2), e = String(e); e.length < t; ) e = "0" + e;
                                return e;
                            },
                            A = {
                                D: function (e) {
                                    return String(e.getDate());
                                },
                                DD: function (e) {
                                    return I(e.getDate());
                                },
                                Do: function (e, t) {
                                    return t.DoFn(e.getDate());
                                },
                                d: function (e) {
                                    return String(e.getDay());
                                },
                                dd: function (e) {
                                    return I(e.getDay());
                                },
                                ddd: function (e, t) {
                                    return t.dayNamesShort[e.getDay()];
                                },
                                dddd: function (e, t) {
                                    return t.dayNames[e.getDay()];
                                },
                                M: function (e) {
                                    return String(e.getMonth() + 1);
                                },
                                MM: function (e) {
                                    return I(e.getMonth() + 1);
                                },
                                MMM: function (e, t) {
                                    return t.monthNamesShort[e.getMonth()];
                                },
                                MMMM: function (e, t) {
                                    return t.monthNames[e.getMonth()];
                                },
                                YY: function (e) {
                                    return I(String(e.getFullYear()), 4).substr(2);
                                },
                                YYYY: function (e) {
                                    return I(e.getFullYear(), 4);
                                },
                                h: function (e) {
                                    return String(e.getHours() % 12 || 12);
                                },
                                hh: function (e) {
                                    return I(e.getHours() % 12 || 12);
                                },
                                H: function (e) {
                                    return String(e.getHours());
                                },
                                HH: function (e) {
                                    return I(e.getHours());
                                },
                                m: function (e) {
                                    return String(e.getMinutes());
                                },
                                mm: function (e) {
                                    return I(e.getMinutes());
                                },
                                s: function (e) {
                                    return String(e.getSeconds());
                                },
                                ss: function (e) {
                                    return I(e.getSeconds());
                                },
                                S: function (e) {
                                    return String(Math.round(e.getMilliseconds() / 100));
                                },
                                SS: function (e) {
                                    return I(Math.round(e.getMilliseconds() / 10), 2);
                                },
                                SSS: function (e) {
                                    return I(e.getMilliseconds(), 3);
                                },
                                a: function (e, t) {
                                    return e.getHours() < 12 ? t.amPm[0] : t.amPm[1];
                                },
                                A: function (e, t) {
                                    return e.getHours() < 12 ? t.amPm[0].toUpperCase() : t.amPm[1].toUpperCase();
                                },
                                ZZ: function (e) {
                                    var t = e.getTimezoneOffset();
                                    return (t > 0 ? "-" : "+") + I(100 * Math.floor(Math.abs(t) / 60) + (Math.abs(t) % 60), 4);
                                },
                                Z: function (e) {
                                    var t = e.getTimezoneOffset();
                                    return (t > 0 ? "-" : "+") + I(Math.floor(Math.abs(t) / 60), 2) + ":" + I(Math.abs(t) % 60, 2);
                                },
                            },
                            E =
                                (x("monthNamesShort"),
                                x("monthNames"),
                                {
                                    default: "ddd MMM DD YYYY HH:mm:ss",
                                    shortDate: "M/D/YY",
                                    mediumDate: "MMM D, YYYY",
                                    longDate: "MMMM D, YYYY",
                                    fullDate: "dddd, MMMM D, YYYY",
                                    isoDate: "YYYY-MM-DD",
                                    isoDateTime: "YYYY-MM-DDTHH:mm:ssZ",
                                    shortTime: "HH:mm",
                                    mediumTime: "HH:mm:ss",
                                    longTime: "HH:mm:ss.SSS",
                                }),
                            M = function (e, t, i) {
                                if ((void 0 === t && (t = E.default), void 0 === i && (i = {}), "number" == typeof e && (e = new Date(e)), "[object Date]" !== Object.prototype.toString.call(e) || isNaN(e.getTime())))
                                    throw new Error("Invalid Date pass to format");
                                var s = [];
                                t = (t = E[t] || t).replace(v, function (e, t) {
                                    return s.push(t), "@@@";
                                });
                                var n = C(C({}, T), i);
                                return (t = t.replace(b, function (t) {
                                    return A[t](e, n);
                                })).replace(/@@@/g, function () {
                                    return s.shift();
                                });
                            };
                        const L = window.setInterval,
                            P = window.setTimeout,
                            D = 36e5,
                            O = 864e5;
                        let R;
                        const B = () => {
                                clearTimeout(R), clearInterval(R);
                            },
                            V = (e, t, i, s, n, o) => {
                                var a;
                                let r = 1;
                                B(),
                                    e((null === (a = t[n]) || void 0 === a ? void 0 : a.replace("{0}", `${r}`)) || ""),
                                    (R = L(() => {
                                        var s;
                                        r++, i && o && r >= i ? o(e, t) : e((null === (s = t[n]) || void 0 === s ? void 0 : s.replace("{0}", `${r}`)) || "");
                                    }, s));
                            },
                            N = (e, t) => {
                                V(e, t, 60, 6e4, "relTimeMin", z);
                            },
                            z = (e, t) => {
                                V(e, t, 24, D, "relTimeHr", F);
                            },
                            F = (e, t) => {
                                V(e, t, 30, O, "relTimeDay", $);
                            },
                            $ = (e, t) => {
                                V(e, t, 12, 2592e6, "relTimeMon", U);
                            },
                            U = (e, t) => {
                                V(e, t, 0, 31536e6, "relTimeYr");
                            },
                            H = (e, t) => {
                                B(),
                                    e(t.relTimeNow || ""),
                                    (R = P(() => {
                                        ((e, t) => {
                                            B(),
                                                e(t.relTimeMoment || ""),
                                                (R = P(() => {
                                                    N(e, t);
                                                }, 5e4));
                                        })(e, t);
                                    }, 1e4));
                            },
                            j = { ar: "العربية", de: "Deutsch", en: "English", es: "Español", fr: "Français", it: "Italiano", nl: "Nederlands", bt: "Português", hi: "हिंदी" },
                            W = (e) => e instanceof Function,
                            G = () => /Android/i.test(navigator.userAgent),
                            q = () => /iPhone|iPad/i.test(navigator.userAgent),
                            K = () => G() || q();
                        function Y(e, { pattern: t, locale: i }) {
                            let s;
                            s = "string" == typeof e ? new Date(e) : e;
                            const n = `${s.toLocaleDateString(i, { weekday: "short", month: "short", day: "numeric" }).replace(/,/g, "")}, ${s.toLocaleTimeString(i, { hour: "numeric", minute: "numeric", hour12: !0 })}`;
                            if ("string" == typeof t)
                                try {
                                    return M(s, t);
                                } catch (e) {
                                    return n;
                                }
                            return "object" == typeof t && null !== t ? s.toLocaleString(i, t) : n;
                        }
                        function J(e, t, i = "#000") {
                            const s = t.height,
                                n = t.width,
                                o = Math.floor(s / 2);
                            let a = (function (e, t) {
                                const i = Math.ceil(t / 2),
                                    s = e.length / i,
                                    n = [],
                                    o = [];
                                for (let t = 0; t < e.length; t += s) {
                                    const i =
                                        e
                                            .slice(t, t + s)
                                            .map((e) => e * e)
                                            .reduce((e, t) => e + t, 0) / s;
                                    n.push(i), o.unshift(i);
                                }
                                return n.splice(0, 1), o.concat(n);
                            })(e, 31);
                            a = (function (e, t) {
                                return e.map((e) => e * t);
                            })(a, s / 255);
                            const r = t.getContext("2d");
                            if (r) {
                                (r.fillStyle = i), r.clearRect(0, 0, n, s), r.save();
                                let e = 0;
                                a.forEach((t) => {
                                    const i = Math.ceil(t / 2) + 1;
                                    r.fillRect(e, o - i, 2, 2 * i), (e += 8);
                                }),
                                    r.save();
                            }
                        }
                        function Z(e, t, i, s) {
                            return (function (e, t) {
                                const i = Object.keys(t).map((e) => `${e}=${t[e]}`);
                                return i.length ? `${e}?${i.join("&")}` : e;
                            })(`${e}${t}${s}`, i);
                        }
                        function X(e, t, i = !0, s = "websdk") {
                            return Z(`ws${i ? "s" : ""}://`, e, t, `/chat/v1/chats/sockets/${s}`);
                        }
                        function Q(e, t, i = !0) {
                            return Z(`http${i ? "s" : ""}://`, e, t, "/chat/v1/chats/message");
                        }
                        const ee = (e, t) => {
                            const i = new Date(e),
                                s = new Date(t);
                            return i.getDate() === s.getDate() && i.getMonth() === s.getMonth() && i.getFullYear() === s.getFullYear();
                        };
                    },
                    473: function (e, t, i) {
                        Object.defineProperty(t, "__esModule", { value: !0 }), (t.defaultSettings = void 0);
                        var s = i(930),
                            n = i(532),
                            o = "Please try sharing it again, or else type it in.";
                        t.defaultSettings = {
                            badgePosition: { right: "-5px", top: "-5px" },
                            clientAuthEnabled: !1,
                            conversationBeginPosition: "bottom",
                            disablePastActions: "all",
                            displayActionsAsPills: !1,
                            embedded: !1,
                            embeddedVideo: !0,
                            enableAgentSneakPreview: !1,
                            enableAttachment: !0,
                            enableAttachmentSecurity: !1,
                            enableHeaderActionCollapse: !0,
                            enableAutocomplete: !1,
                            enableAutocompleteClientCache: !1,
                            enableBotAudioResponse: !1,
                            enableDefaultClientResponse: !1,
                            enableClearMessage: !1,
                            enableEndConversation: !0,
                            enableHeadless: !1,
                            enableLocalConversationHistory: !1,
                            enableLongPolling: !1,
                            enableSendTypingStatus: !1,
                            enableSecureConnection: !0,
                            enableSpeech: !1,
                            enableSpeechAutoSend: !0,
                            enableTabsSync: !0,
                            enableTimestamp: !0,
                            focusOnNewMessage: "input",
                            height: "620px",
                            i18n: {
                                en: {
                                    agent: "Agent",
                                    agentMessage: "{0} says",
                                    attachment_audio: "Audio attachment",
                                    attachment_file: "File attachment",
                                    attachment_image: "Image attachment",
                                    attachment_video: "Video attachment",
                                    attachmentAudioFallback: "Your browser does not support embedded audio. However you can {0}download it{/0}.",
                                    attachmentVideoFallback: "Your browser does not support embedded video. However you can {0}download it{/0}.",
                                    audioResponseOff: "Turn audio response on",
                                    audioResponseOn: "Turn audio response off",
                                    avatarAgent: "Agent icon",
                                    avatarBot: "Bot icon",
                                    avatarUser: "User icon",
                                    card: "Card {0}",
                                    cardImagePlaceholder: "Card image",
                                    cardNavNext: "Next card",
                                    cardNavPrevious: "Previous card",
                                    chatTitle: "Chat",
                                    clear: "Clear conversation",
                                    close: "Close widget",
                                    closing: "Closing",
                                    connected: "Connected",
                                    connecting: "Connecting",
                                    connectionFailureMessage: "Sorry, the assistant is unavailable right now. If the issue persists, contact your help desk.",
                                    connectionRetryLabel: "Try Again",
                                    defaultGreetingMessage: "Hey, Nice to meet you! Allow me a moment to get back to you.",
                                    defaultWaitMessage: "I'm still working on your request. Thank you for your patience!",
                                    defaultSorryMessage: "I'm sorry. I can't get you the right content. Please try again.",
                                    disconnected: "Disconnected",
                                    download: "Download",
                                    editFormErrorMessage: "Some of the fields need your attention",
                                    endConversation: "End Conversation",
                                    endConversationConfirmMessage: "Are you sure you want to end the conversation?",
                                    endConversationDescription: "This will also clear your conversation history.",
                                    errorSpeechInvalidUrl: "ODA URL for connection is not set. Please pass 'URI' parameter during SDK initialization.",
                                    errorSpeechMultipleConnection: "Another voice recognition is ongoing. Can't start a new one.",
                                    errorSpeechTooMuchTimeout: "The voice message is too long to recognize and generate text.",
                                    errorSpeechUnavailable: "To allow voice messaging, update your browser settings to enable access to your microphone.",
                                    errorSpeechUnsupportedLocale: "The locale set for voice recognition is not supported. Please use a valid locale in 'speechLocale' setting.",
                                    inputPlaceholder: "Type a message",
                                    imageViewerClose: "Close image viewer",
                                    imageViewerOpen: "Open image viewer",
                                    itemIterator: "Item {0}",
                                    language_ar: "Arabic",
                                    language_de: "German",
                                    language_detect: "Detect Language",
                                    language_en: "English",
                                    language_hi: "Hindi",
                                    language_es: "Spanish",
                                    language_fr: "French",
                                    language_it: "Italian",
                                    language_nl: "Dutch",
                                    language_pt: "Portuguese",
                                    languageSelectDropdown: "Select chat language",
                                    linkField: "Click on the highlighted text to open Link for {0}",
                                    noSpeechTimeout: "The voice could not be detected to perform recognition.",
                                    noText: "No",
                                    openMap: "Open Map",
                                    previousChats: "End of previous conversation",
                                    ratingStar: "Rate {0} star",
                                    recognitionTextPlaceholder: "Speak your message",
                                    relTimeDay: "{0}d ago",
                                    relTimeHr: "{0}hr ago",
                                    relTimeMin: "{0}min ago",
                                    relTimeMoment: "A few seconds ago",
                                    relTimeMon: "{0}mth ago",
                                    relTimeNow: "Now",
                                    relTimeYr: "{0}yr ago",
                                    requestLocation: "Requesting location",
                                    requestLocationDeniedPermission: "To allow sharing your location, update your browser settings to enable access to your location. You can also type in the location instead.",
                                    requestLocationDeniedTimeout: "It is taking too long to get your location. " + o,
                                    requestLocationDeniedUnavailable: "Your current location is unavailable. " + o,
                                    retryMessage: "Try again",
                                    send: "Send message",
                                    shareAudio: "Share Audio",
                                    shareFailureMessage: "Sorry, sharing is not available on this device.",
                                    shareFile: "Share File",
                                    shareLocation: "Share Location",
                                    shareVisual: "Share Image/Video",
                                    skillMessage: "Skill says",
                                    showOptions: "Show Options",
                                    speak: "Speak a message",
                                    typingIndicator: "Waiting for response",
                                    upload: "Share popup",
                                    uploadFailed: "Upload Failed.",
                                    uploadFileSizeLimitExceeded: "File size should not be more than {0}MB.",
                                    uploadFileSizeZeroByte: "Files of size zero bytes can't be uploaded.",
                                    uploadUnsupportedFileType: "Unsupported file type.",
                                    userMessage: "I say",
                                    utteranceGeneric: "Message from skill.",
                                    webViewAccessibilityTitle: "In-widget WebView to display links",
                                    webViewClose: "Done",
                                    webViewErrorInfoDismiss: "Dismiss",
                                    webViewErrorInfoText: "Don’t see the page? {0}Click here{/0} to open it in a browser.",
                                    yesText: "Yes",
                                },
                            },
                            initBotAudioMuted: !0,
                            initMessageOptions: { sendAt: "expand" },
                            isDebugMode: !1,
                            locale: "en",
                            messageCacheSizeLimit: 2e3,
                            name: "oda-chat",
                            openChatOnLoad: !1,
                            openLinksInNewWindow: !1,
                            readMark: "✓",
                            reconnectInterval: 5,
                            reconnectMaxAttempts: 5,
                            shareMenuItems: [n.ShareCategory.AUDIO, n.ShareCategory.FILE, n.ShareCategory.LOCATION, n.ShareCategory.VISUAL],
                            showConnectionStatus: !1,
                            showPrevConvStatus: !0,
                            showTypingIndicator: !0,
                            speechLocale: s.RecognitionLocale.EN_US,
                            theme: n.WidgetTheme.DEFAULT,
                            timestampMode: "default",
                            defaultGreetingTimeout: 5,
                            defaultWaitMessageInterval: 5,
                            typingIndicatorTimeout: 30,
                            typingStatusInterval: 3,
                            upgradeToWebSocketInterval: 300,
                            webViewConfig: {},
                            width: "375px",
                            actionsLayout: "vertical",
                            globalActionsLayout: "vertical",
                            cardActionsLayout: "vertical",
                            formActionsLayout: "vertical",
                        };
                    },
                    424: function (e, t, i) {
                        var s =
                            (this && this.__assign) ||
                            function () {
                                return (
                                    (s =
                                        Object.assign ||
                                        function (e) {
                                            for (var t, i = 1, s = arguments.length; i < s; i++) for (var n in (t = arguments[i])) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
                                            return e;
                                        }),
                                    s.apply(this, arguments)
                                );
                            };
                        Object.defineProperty(t, "__esModule", { value: !0 });
                        var n = i(930),
                            o = i(532),
                            a = i(24),
                            r = i(49),
                            c = i(473),
                            l = {
                                avatarAgent: "agentAvatar",
                                avatarBot: "botIcon",
                                avatarUser: "personIcon",
                                fileAudio: "audioIcon",
                                fileImage: "imageIcon",
                                fileGeneric: "fileIcon",
                                fileVideo: "videoIcon",
                                clearHistory: "clearMessageIcon",
                                close: void 0,
                                collapse: "closeIcon",
                                download: "downloadIcon",
                                error: "errorIcon",
                                expandImage: "expandImageIcon",
                                keyboard: "keyboardIcon",
                                logo: "logoIcon",
                                launch: "botButtonIcon",
                                mic: "micIcon",
                                rating: void 0,
                                send: "sendIcon",
                                shareMenu: "attachmentIcon",
                                shareMenuAudio: void 0,
                                shareMenuFile: void 0,
                                shareMenuLocation: void 0,
                                shareMenuVisual: void 0,
                                ttsOff: "audioResponseOffIcon",
                                ttsOn: "audioResponseOnIcon",
                                typingIndicator: "chatBubbleIcon",
                            };
                        function h(e) {
                            for (var t = {}, i = 0, s = Object.keys(e); i < s.length; i++) {
                                var n = s[i];
                                t[n.toLowerCase()] = e[n];
                            }
                            return t;
                        }
                        function d(e, t) {
                            var i = s(s({}, e), t);
                            if (t.i18n && Object.keys(t.i18n).length) {
                                (e.i18n = h(e.i18n)), (t.i18n = h(t.i18n));
                                var n = new Set();
                                Object.keys(e.i18n).forEach(function (e) {
                                    n.add(e);
                                }),
                                    Object.keys(t.i18n).forEach(function (e) {
                                        n.add(e);
                                    }),
                                    (i.i18n = {}),
                                    n.forEach(function (n) {
                                        i.i18n[n] = s(s(s({}, e.i18n.en), e.i18n[n]), t.i18n[n]);
                                    });
                            }
                            if (
                                ((i.colors = s(s({}, e.colors), t.colors)),
                                (i.userId = t.userId || "user" + Math.floor(1e4 + 9e4 * Math.random()) + (Date.now() % 1e5)),
                                (i.icons = (function (e) {
                                    var t = e.icons || {};
                                    for (var i in l) {
                                        var s = l[i];
                                        s in e && (t[i] = e[s]);
                                    }
                                    return t;
                                })(i)),
                                (i.locale = o.configureLocale(i.locale, i.i18n)),
                                t.typingStatusInterval && t.typingStatusInterval < e.typingStatusInterval && (i.typingStatusInterval = e.typingStatusInterval),
                                !i.position)
                            ) {
                                var a = "rtl" === window.getComputedStyle(document.body).direction;
                                i.position = a ? { left: "20px", bottom: "20px" } : { right: "20px", bottom: "20px" };
                            }
                            return i;
                        }
                        function p(e, t, i) {
                            var s = Math.floor(window.innerWidth / 2),
                                n = e.offsetLeft;
                            n < 0 ? (e.style.left = "10px") : n > window.innerWidth && (e.style.right = "10px"), n < s && i.addCSSClass(e, "pos-left");
                        }
                        function u(e, t, i) {
                            if (t) {
                                var s = e.replace(/(\.)([a-zA-Z_-]+)(?=[^}]+{)/gi, "$1" + i + "-$2");
                                t.innerText = t.innerText + s;
                            }
                        }
                        function g(e, t) {
                            var i,
                                s,
                                l,
                                h,
                                b = this,
                                v = d(c.defaultSettings, e),
                                w = a.generateEventDispatcher(),
                                x = !1,
                                C = v.name,
                                S = new o.DOMUtil(v);
                            (o.Logger.logLevel = v.isDebugMode ? o.Logger.LOG_LEVEL.DEBUG : o.Logger.LOG_LEVEL.ERROR), (o.Logger.appName = v.name), (o.Logger.appVersion = o.SDK_VERSION);
                            var y = new o.Logger("main"),
                                k = new n.WebCore({
                                    URI: v.URI,
                                    channelId: v.channelId,
                                    userId: v.userId,
                                    isTLS: v.enableSecureConnection,
                                    channel: v.channel,
                                    enableAttachment: v.enableAttachment,
                                    enableAttachmentSecurity: v.enableAttachmentSecurity,
                                    isLongPoll: v.enableLongPolling,
                                    isTTS: v.enableBotAudioResponse,
                                    TTSService: v.ttsService,
                                    tokenGenerator: v.clientAuthEnabled ? t : null,
                                    recognitionLocale: v.speechLocale,
                                    retryInterval: v.reconnectInterval,
                                    retryMaxAttempts: v.reconnectMaxAttempts,
                                });
                            if (v.enableBotAudioResponse)
                                try {
                                    v.ttsService || (v.ttsService = k.getTTSService()), v.skillVoices && k.setTTSVoice(v.skillVoices);
                                } catch (e) {
                                    y.error("Failed to initialize TTS");
                                }
                            var _ = o.getValues(o.RecognitionLocale),
                                T = function (e) {
                                    for (var t = [], i = 1; i < arguments.length; i++) t[i - 1] = arguments[i];
                                    1 === t.length
                                        ? y.error("Parameter " + t + " was not passed for " + e + " call. No action processed.")
                                        : y.error("Parameters " + t.join(", ") + " were not passed for " + e + " call. No action processed.");
                                },
                                I = function (e) {
                                    w.trigger(o.ChatEvent.MESSAGE_SENT, e), w.trigger(o.ChatEvent.MESSAGE, e);
                                },
                                A = function (e) {
                                    w.trigger(o.ChatEvent.MESSAGE_RECEIVED, e), w.trigger(o.ChatEvent.MESSAGE, e);
                                },
                                E = function (e) {
                                    w.trigger(o.ChatEvent.NETWORK, e);
                                },
                                M = function (e) {
                                    var t = h.innerText;
                                    h.innerText = o.updateCSSVar(t, e, "--width-full-screen");
                                },
                                L = function (e) {
                                    var t = h.innerText;
                                    (t = o.updateCSSVar(t, e.top || "unset", "--position-top")),
                                        (t = o.updateCSSVar(t, e.left || "unset", "--position-left")),
                                        (t = o.updateCSSVar(t, e.right || "unset", "--position-right")),
                                        (t = o.updateCSSVar(t, e.bottom || "unset", "--position-bottom")),
                                        (h.innerText = t);
                                },
                                P = function (e) {
                                    if (((i = new o.WidgetComponent(v, S, b.connect.bind(b), b.openChat.bind(b), b.closeChat.bind(b), R.bind(b), A.bind(b), I.bind(b), b.getUnreadMessagesCount.bind(b), E.bind(b), k, w)), e))
                                        try {
                                            var t = document.getElementById(v.targetElement);
                                            i.embedInElement(v.targetElement),
                                                M(t.clientWidth + "px"),
                                                window.addEventListener(
                                                    "resize",
                                                    o.debounce(function () {
                                                        M(t.clientWidth + "px");
                                                    }, 500)
                                                );
                                        } catch (e) {
                                            y.error("Target Element not specified", e);
                                        }
                                    else {
                                        i.appendToElement(document.body);
                                        var n = i.element;
                                        p(n, 0, S),
                                            window.addEventListener(
                                                "resize",
                                                o.debounce(function () {
                                                    p(n, 0, S);
                                                }, 500)
                                            );
                                    }
                                    s = i.chatWidgetDiv;
                                    var a = v.width,
                                        r = v.height;
                                    e || (a && b.setWidth(a), r && b.setHeight(r)),
                                        v.openChatOnLoad &&
                                            setTimeout(function () {
                                                b.openChat();
                                            }, 0);
                                },
                                D = function (e) {
                                    var t = v.colors;
                                    return (
                                        t &&
                                            (["headerBackground", "visualizer", "ratingStarFill"].forEach(function (e) {
                                                t[e] = t[e] || t.branding;
                                            }),
                                            ["botText", "userText"].forEach(function (e) {
                                                t[e] = t[e] || t.text;
                                            }),
                                            Object.keys(t).forEach(function (i) {
                                                var s = t[i];
                                                if (s)
                                                    if ("shareMenuText" === i) e = o.updateCSSVar(e, s, "--color-popup-button-text");
                                                    else {
                                                        var n = "--color-" + i.replace(/([A-Z&])/g, "-$1").toLowerCase();
                                                        e = o.updateCSSVar(e, s, n);
                                                    }
                                            })),
                                        e
                                    );
                                },
                                O = function () {
                                    w.trigger(o.ChatEvent.READY), (O = function () {});
                                };
                            (this.connect = function (e) {
                                var t,
                                    s = void 0 === e ? {} : e,
                                    n = s.URI,
                                    o = s.channelId,
                                    a = s.userId;
                                return (
                                    n || o || a
                                        ? ((function (e, t, i) {
                                              "string" == typeof e && e.length && (v.URI = e), "string" == typeof t && t.length && (v.channelId = t), "string" == typeof i && i.length && (v.userId = i);
                                          })(n, o, a),
                                          (t = k.connect({ URI: n, channelId: o, userId: a })))
                                        : (t = k.connect()),
                                    t
                                        .then(
                                            function () {
                                                y.debug("Connection ready");
                                            },
                                            function () {
                                                y.debug("Connection timeout"), i.showConnectionError();
                                            }
                                        )
                                        .finally(function () {
                                            O();
                                        }),
                                    t
                                );
                            }),
                                (this.disconnect = function () {
                                    return v.enableSpeech && b.stopVoiceRecording(), v.enableBotAudioResponse && b.cancelTTS(), k.disconnect();
                                }),
                                (this.isConnected = function () {
                                    return k.isConnected();
                                }),
                                (this.openChat = function () {
                                    i.isOpen || (i.showChat(), x && (b.connect(), (x = !1))), w.trigger(o.ChatEvent.WIDGET_OPENED);
                                }),
                                (this.closeChat = function () {
                                    i.isOpen && i.onClose(), w.trigger(o.ChatEvent.WIDGET_CLOSED);
                                }),
                                (this.endChat = function () {
                                    b.isConnected() && i.sendExitEvent();
                                });
                            var R = function () {
                                i.isOpen && b.closeChat(), b.disconnect(), b.clearConversationHistory(), (x = !0), w.trigger(o.ChatEvent.CHAT_END);
                            };
                            (this.isChatOpened = function () {
                                return i.isOpen;
                            }),
                                (this.destroy = function () {
                                    for (var e in (b.disconnect(), b.closeChat(), i.remove(), document && h && h.remove(), w.trigger(o.ChatEvent.DESTROY), b.off(), b)) b[e] && delete b[e];
                                }),
                                (this.on = function (e, t) {
                                    w.bind(e, t);
                                }),
                                (this.off = function (e, t) {
                                    w.unbind(e, t);
                                }),
                                (this.sendAttachment = function (e) {
                                    return e ? i.uploadFile(e) : (T("sendAttachment", "file"), Promise.reject(new Error("Invalid Parameter")));
                                }),
                                (this.sendMessage = function (e, t) {
                                    return e ? i.sendMessage(e, t) : (T("sendMessage", "message"), Promise.reject(new Error("Invalid Parameter")));
                                }),
                                (this.sendUserTypingStatus = function (e, t) {
                                    return e ? k.sendUserTypingStatus(e, t) : (T("sendUserTypingStatus", "status"), Promise.reject(new Error("Invalid Parameter")));
                                }),
                                (this.updateUser = function (e) {
                                    return e
                                        ? k.updateUser(e, { sdkMetadata: { version: o.SDK_VERSION } }).then(function (e) {
                                              return I(e);
                                          })
                                        : (T("updateUser", "userDetails"), Promise.reject(new Error("Invalid Parameter")));
                                }),
                                (this.setUserAvatar = function (e) {
                                    e ? i.setUserAvatar(e) : T("setUserAvatar", "userAvatar");
                                }),
                                (this.setAgentDetails = function (e) {
                                    e ? i.setAgentDetails(e) : T("setAgentDetails", "agentDetails");
                                }),
                                (this.getAgentDetails = function () {
                                    return i.getAgentDetails();
                                }),
                                (this.setSkillVoices = function (e) {
                                    if (!v.ttsService) return f();
                                    var t = [];
                                    return e && !Array.isArray(e) && "string" == typeof (null == e ? void 0 : e.lang) ? (t = [e]) : Array.isArray(e) && (t = e), b.setTTSVoice(t);
                                }),
                                (this.setTTSService = function (e) {
                                    var t = (function (e) {
                                            return e && a.isFunction(e.speak) && a.isFunction(e.cancel) && a.isFunction(e.getVoice) && a.isFunction(e.getVoices) && a.isFunction(e.setVoice);
                                        })(e),
                                        s = v.ttsService;
                                    s && (null == s || s.cancel()),
                                        t
                                            ? ((v.ttsService = e),
                                              k.setTTSService(e),
                                              (v.enableBotAudioResponse = !0),
                                              o.isAnyVoiceAvailable(e, v.skillVoices).then(function (t) {
                                                  t || (v.skillVoices = []);
                                                  var i = o.syncTTSLocaleIfUnavailable({ hasRecognition: v.enableSpeech, hasSynthesis: v.enableBotAudioResponse, recognitionLocale: v.speechLocale, synthesisLocales: v.skillVoices });
                                                  e.setVoice(i), (v.skillVoices = i);
                                              }))
                                            : (v.ttsService = null),
                                        i && i.refreshTTS();
                                }),
                                (this.getTTSVoices = function () {
                                    return k.getTTSVoices();
                                }),
                                (this.setTTSVoice = function (e) {
                                    var t = v.ttsService;
                                    return t
                                        ? o.isAnyVoiceAvailable(t, v.skillVoices).then(function (t) {
                                              return (
                                                  (v.skillVoices = o.syncTTSLocaleIfUnavailable({
                                                      hasRecognition: v.enableSpeech,
                                                      hasSynthesis: v.enableBotAudioResponse,
                                                      isReset: t,
                                                      recognitionLocale: v.speechLocale,
                                                      synthesisLocales: e,
                                                  })),
                                                  k.setTTSVoice(e).catch(function () {
                                                      return f();
                                                  })
                                              );
                                          })
                                        : f();
                                }),
                                (this.getTTSVoice = function () {
                                    try {
                                        return k.getTTSVoice();
                                    } catch (e) {
                                        throw Error(m);
                                    }
                                }),
                                (this.speakTTS = function (e) {
                                    k.speakTTS(e, v.i18n[v.locale]);
                                }),
                                (this.cancelTTS = function () {
                                    k.cancelTTS();
                                }),
                                (this.setPrimaryChatLanguage = function (e) {
                                    if (null !== e && "string" != typeof e) throw Error("Please pass a language string or null as argument");
                                    b.isConnected() ? i.setPrimaryChatLanguage(e) : y.error("Not connected. Can not call setPrimaryChatLanguage.");
                                }),
                                (this.setDelegate = function (e) {
                                    v.delegate = e;
                                }),
                                (this.getConversationHistory = function () {
                                    var e = i.getMessages();
                                    return { messages: e, messagesCount: e.length, unreadCount: b.getUnreadMessagesCount(), userId: v.userId };
                                }),
                                (this.clearConversationHistory = function (e, t) {
                                    void 0 === t && (t = !0),
                                        e && "string" != typeof e
                                            ? y.error("Argument passed in clearConversationHistory() is not of type string. Returning without execution.")
                                            : ((e && 0 !== e.length) || (e = v.userId), t && e === v.userId ? i.clearConversationHistory() : i.clearMessages(e, o.StorageType.LOCAL));
                                }),
                                (this.clearAllConversationsHistory = function (e) {
                                    void 0 === e && (e = !0), i.clearAllMessage(), e && i.clearConversationHistory();
                                }),
                                (this.getSuggestions = function (e) {
                                    return v.enableAutocomplete
                                        ? e
                                            ? "string" != typeof e && "number" != typeof e
                                                ? Promise.reject("Invalid query parameter type passed for the getSuggestions call.")
                                                : i.getSuggestions(e)
                                            : Promise.reject("No query parameter passed for the getSuggestions call.")
                                        : Promise.reject("Autocomplete suggestions not enabled.");
                                }),
                                (this.startVoiceRecording = function (e, t, i) {
                                    return v.enableSpeech
                                        ? e
                                            ? t
                                                ? k.startRecognition({
                                                      onRecognitionText: function (t) {
                                                          e(t.message);
                                                      },
                                                      onAnalyserReady: null == i ? void 0 : i.onAnalyserReady,
                                                      onVisualData: null == i ? void 0 : i.onAnalyserFrequencies,
                                                      onSpeechNetworkChange: t,
                                                  })
                                                : Promise.reject(new Error("Second callback parameter, onSpeechNetworkChange not provided. Can not start recording"))
                                            : Promise.reject(new Error("First callback parameter, onSpeechRecognition not provided. Can not start recording."))
                                        : Promise.reject(new Error("Speech-to-text feature is not enabled. Initialize the widget with enableSpeech: true to use the service."));
                                }),
                                (this.stopVoiceRecording = function () {
                                    if (!v.enableSpeech) throw new Error("Speech-to-text feature is not enabled. Speech recognition service is not running.");
                                    return k.stopRecognition();
                                }),
                                (this.setSpeechLocale = function (e) {
                                    if (!v.enableSpeech) return !1;
                                    e = e.toLowerCase();
                                    var t = _.indexOf(e) >= 0;
                                    if (((v.speechLocale = e), k.setRecognitionLocale(e), i.setVoiceRecognitionService(t), t && v.enableBotAudioResponse)) {
                                        var s = o.syncTTSLocaleIfUnavailable({ hasRecognition: v.enableSpeech, hasSynthesis: v.enableBotAudioResponse, recognitionLocale: v.speechLocale, synthesisLocales: v.skillVoices });
                                        s !== v.skillVoices && ((v.skillVoices = s), s.length && k.setTTSVoice(s));
                                    }
                                    return t;
                                }),
                                (this.getUnreadMessagesCount = function () {
                                    if (v.enableHeadless) return 0;
                                    var e = i.getUnreadMsgsCount();
                                    return e !== l && ((l = e), w.trigger(o.ChatEvent.UNREAD, e)), e;
                                }),
                                (this.setAllMessagesAsRead = function () {
                                    v.enableHeadless || (b.getUnreadMessagesCount(), i.updateNotificationBadge(0));
                                }),
                                (this.showTypingIndicator = function () {
                                    if (!v.showTypingIndicator) throw new Error("Typing indicator is configured not to be shown.");
                                    if (v.enableHeadless) throw new Error("Typing indicator cannot be shown in headless mode.");
                                    b.isConnected() && i.showTypingIndicator();
                                }),
                                (this.setWebViewConfig = function (e) {
                                    if (v.enableHeadless) throw new Error("WebView cannot be configured in headless mode.");
                                    i.refreshWebView(e);
                                }),
                                (this.setUserInputMessage = function (e) {
                                    if (v.enableHeadless) throw new Error("User input cannot be set in headless mode.");
                                    i.setUserInputMessage(e);
                                }),
                                (this.setUserInputPlaceholder = function (e) {
                                    if (v.enableHeadless) throw new Error("Placeholder cannot be set in headless mode.");
                                    e ? i.setUserInputPlaceholder(e) : T("setUserInputPlaceholder", "placeholder text");
                                }),
                                (this.setHeight = function (e) {
                                    e ? s && ((s.style.height = e), (v.height = e)) : T("setHeight", "height");
                                }),
                                (this.setWidth = function (e) {
                                    e ? s && ((s.style.width = e), (v.width = e), M(e)) : T("setWidth", "width");
                                }),
                                (this.setSize = function (e, t) {
                                    if (e || t) {
                                        var i = s;
                                        i && ((i.style.width = e), (i.style.height = t), (v.width = e), (v.height = t), M(e));
                                    } else T("setSize", "width", "height");
                                }),
                                (this.setMessagePadding = function (e) {
                                    if (e) for (var t = 0, i = document.getElementsByClassName(C + "-message-bubble"); t < i.length; t++) (i[t].style.padding = e), (v.messagePadding = e);
                                    else T("setMessagePadding", "padding");
                                }),
                                (this.setChatBubbleIconHeight = function (e) {
                                    if (e) for (var t = 0, i = document.getElementsByClassName(C + "-chat-bubble"); t < i.length; t++) (i[t].style.height = e), (v.height = e);
                                    else T("setChatBubbleIconHeight", "height");
                                }),
                                (this.setChatBubbleIconWidth = function (e) {
                                    if (e) for (var t = 0, i = document.getElementsByClassName(C + "-chat-bubble"); t < i.length; t++) (i[t].style.width = e), (v.width = e);
                                    else T("setChatBubbleIconWidth", "width");
                                }),
                                (this.setChatBubbleIconSize = function (e, t) {
                                    if (e || !t)
                                        for (var i = 0, s = document.getElementsByClassName(C + "-chat-bubble"); i < s.length; i++) {
                                            var n = s[i];
                                            (n.style.width = e), (n.style.height = t), (v.width = e), (v.height = t);
                                        }
                                    else T("setChatBubbleIconSize", "width", "height");
                                });
                            var B = ".wrapper";
                            (this.setFont = function (e) {
                                e ? (u(B + "{font:" + e + "}", h, C), (v.font = e)) : T("setFont", "font");
                            }),
                                (this.setFontFamily = function (e) {
                                    e ? (u(B + "{font-family:" + e + "}", h, C), (v.fontFamily = e)) : T("setFontFamily", "fontFamily");
                                }),
                                (this.setFontSize = function (e) {
                                    e ? u(B + "{font-size:" + e + "}", h, C) : T("setFontSize", "fontSize");
                                }),
                                (this.setTextColor = function (e) {
                                    if (e) {
                                        var t = h.innerText;
                                        (t = o.updateCSSVar(t, e, "--color-bot-text")), (t = o.updateCSSVar(t, e, "--color-user-text")), (h.innerText = t);
                                    } else T("setTextColor", "color");
                                }),
                                (this.setTextColorLight = function (e) {
                                    if (e) {
                                        var t = h.innerText;
                                        (t = o.updateCSSVar(t, e, "--color-text-light")), (h.innerText = t), (v.colors.textLight = e);
                                    } else T("setTextColorLight", "color");
                                }),
                                (function () {
                                    if ((y.debug("onLoad", "load chat widget"), "undefined" != typeof window)) {
                                        var e = !1,
                                            t = document.head.children,
                                            i = document.createElement("style");
                                        i.appendChild(document.createTextNode(D(r.redwoodStyles.replace(/(\.)([a-zA-Z_-]+)(?=[^}]+{)/gi, "$1" + C + "-$2")))), (h = i), L(v.position);
                                        for (var s = 0; s < t.length; s++) {
                                            var n = t.item(s);
                                            if ("style" === n.nodeName.toLowerCase()) {
                                                document.head.insertBefore(i, n), (e = !0);
                                                break;
                                            }
                                        }
                                        e || document.head.appendChild(i), v.font && b.setFont(v.font), v.fontFamily && b.setFontFamily(v.fontFamily), v.fontSize && b.setFontSize(v.fontSize);
                                    }
                                    P(v.embedded);
                                })(),
                                o.setObjectReadOnly(this);
                            var V = window;
                            V && "function" == typeof V.define && V.define.amd && (V.WebSDK = g);
                        }
                        t.default = g;
                        var m = "Text-to-speech is not available.";
                        function f() {
                            return (e = m), Promise.reject(Error(e));
                            var e;
                        }
                        (g.EVENT = o.ChatEvent), (g.SPEECH_LOCALE = o.RecognitionLocale), (g.THEME = o.WidgetTheme), (g.Version = o.SDK_VERSION), o.deepFreeze(g);
                    },
                },
                t = {};
            function i(s) {
                var n = t[s];
                if (void 0 !== n) return n.exports;
                var o = (t[s] = { exports: {} });
                return e[s].call(o.exports, o, o.exports, i), o.exports;
            }
            (i.d = function (e, t) {
                for (var s in t) i.o(t, s) && !i.o(e, s) && Object.defineProperty(e, s, { enumerable: !0, get: t[s] });
            }),
                (i.o = function (e, t) {
                    return Object.prototype.hasOwnProperty.call(e, t);
                }),
                (i.r = function (e) {
                    "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(e, "__esModule", { value: !0 });
                });
            var s = i(424);
            return (s = s.default);
        })();
    }),
    "object" == typeof exports && "object" == typeof module
        ? (module.exports = factory())
        : "function" == typeof define && define.amd
        ? define("WebSDK", [], factory)
        : "object" == typeof exports
        ? (exports.WebSDK = factory())
        : (e.WebSDK = factory());
self.WebSDK = factory();
