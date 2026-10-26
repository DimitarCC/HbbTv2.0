/* WPE: no fade in/out animations. Runs before the page's own scripts. Every step of a fade is a frame that has to be read back from the
 * GPU and shown by enigma2 (and the end of a fade is where the layer blinks), so the fades are made (nearly) instant. Set NO_FADE to false
 * to get the application's own animations back.
 *   - CSS transitions/animations last 1 ms: not "none", so that transitionend/animationend still fire and applications waiting for them
 *     do not hang
 *   - Element.animate() (Web Animations) with a finite run lasts 1 ms; endless ones (spinners) are left alone
 *   - jQuery: jQuery.fx.off = true (fadeIn/fadeOut/animate/slideDown ... set the end state at once; their callbacks still run)
 * Fades done by an application's own timer or requestAnimationFrame loop cannot be recognised and stay. */
(function () {
    var NO_FADE = true;
    if (!NO_FADE) {
        return;
    }
    try {
        var css = '*, *::before, *::after { transition-duration: 1ms !important; transition-delay: 0s !important; ' +
            'animation-duration: 1ms !important; animation-delay: 0s !important; }';
        var addStyle = function () {
            if (!document.documentElement) {
                return false;
            }
            var style = document.createElement('style');
            style.setAttribute('data-wpe', 'no-fade');
            style.textContent = css;
            document.documentElement.appendChild(style);
            return true;
        };
        if (!addStyle()) {
            var waiter = new MutationObserver(function () {
                if (addStyle()) {
                    waiter.disconnect();
                }
            });
            waiter.observe(document, { childList: true });
        }
    } catch (e) {
        console.log('no-fade: css failed: ' + e);
    }
    try {
        if (window.Element && Element.prototype.animate) {
            var nativeAnimate = Element.prototype.animate;
            Element.prototype.animate = function (keyframes, options) {
                var o = options;
                if (typeof o === 'number') {
                    o = 1;
                } else if (o && typeof o === 'object') {
                    if (o.iterations !== Infinity) {
                        o = Object.assign({}, o, { duration: 1, delay: 0, endDelay: 0 });
                    }
                } else if (o === undefined) {
                    o = 1;
                }
                return nativeAnimate.call(this, keyframes, o);
            };
        }
    } catch (e) {
        console.log('no-fade: animate failed: ' + e);
    }
    try {
        var jq = window.jQuery;
        if (jq && jq.fx) {
            jq.fx.off = true;
        }
        Object.defineProperty(window, 'jQuery', {
            configurable: true,
            enumerable: true,
            get: function () {
                return jq;
            },
            set: function (value) {
                jq = value;
                try {
                    if (value && value.fx) {
                        value.fx.off = true;
                    }
                } catch (e) {
                    // not jQuery
                }
            },
        });
    } catch (e) {
        console.log('no-fade: jquery failed: ' + e);
    }
})();
/*
 * ORB Software. Copyright (c) 2022 Ocean Blue Software Limited
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */(function() {

    "use strict";
    let hbbtv = {};

    const defaultEntities = {
        URL: URL,
        Map: Map
    };/**
 * @license ORB Software. Copyright (c) 2026 Ocean Blue Software Limited
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

hbbtv.languageCodes = {
    ISO639_2_to_ISO639_1: {
        aar: 'aa',
        abk: 'ab',
        ave: 'ae',
        afr: 'af',
        aka: 'ak',
        amh: 'am',
        arg: 'an',
        ara: 'ar',
        asm: 'as',
        ava: 'av',
        aym: 'ay',
        aze: 'az',
        bak: 'ba',
        bel: 'be',
        bul: 'bg',
        bih: 'bh',
        bis: 'bi',
        bam: 'bm',
        ben: 'bn',
        tib: 'bo',
        bod: 'bo',
        bre: 'br',
        bos: 'bs',
        cat: 'ca',
        che: 'ce',
        cha: 'ch',
        cos: 'co',
        cre: 'cr',
        cze: 'cs',
        ces: 'cs',
        chu: 'cu',
        chv: 'cv',
        wel: 'cy',
        cym: 'cy',
        dan: 'da',
        ger: 'de',
        deu: 'de',
        div: 'dv',
        dzo: 'dz',
        ewe: 'ee',
        gre: 'el',
        ell: 'el',
        eng: 'en',
        epo: 'eo',
        spa: 'es',
        est: 'et',
        baq: 'eu',
        eus: 'eu',
        per: 'fa',
        fas: 'fa',
        ful: 'ff',
        fin: 'fi',
        fij: 'fj',
        fao: 'fo',
        fre: 'fr',
        fra: 'fr',
        fry: 'fy',
        gle: 'ga',
        gla: 'gd',
        glg: 'gl',
        grn: 'gn',
        guj: 'gu',
        glv: 'gv',
        hau: 'ha',
        heb: 'he',
        hin: 'hi',
        hmo: 'ho',
        hrv: 'hr',
        hat: 'ht',
        hun: 'hu',
        arm: 'hy',
        hye: 'hy',
        her: 'hz',
        ina: 'ia',
        ind: 'id',
        ile: 'ie',
        ibo: 'ig',
        iii: 'ii',
        ipk: 'ik',
        ido: 'io',
        ice: 'is',
        isl: 'is',
        ita: 'it',
        iku: 'iu',
        jpn: 'ja',
        jav: 'jv',
        geo: 'ka',
        kat: 'ka',
        kon: 'kg',
        kik: 'ki',
        kua: 'kj',
        kaz: 'kk',
        kal: 'kl',
        khm: 'km',
        kan: 'kn',
        kor: 'ko',
        kau: 'kr',
        kas: 'ks',
        kur: 'ku',
        kom: 'kv',
        cor: 'kw',
        kir: 'ky',
        lat: 'la',
        ltz: 'lb',
        lug: 'lg',
        lim: 'li',
        lin: 'ln',
        lao: 'lo',
        lit: 'lt',
        lub: 'lu',
        lav: 'lv',
        mlg: 'mg',
        mah: 'mh',
        mao: 'mi',
        mri: 'mi',
        mac: 'mk',
        mkd: 'mk',
        mal: 'ml',
        mon: 'mn',
        mar: 'mr',
        may: 'ms',
        msa: 'ms',
        mlt: 'mt',
        bur: 'my',
        mya: 'my',
        nau: 'na',
        nob: 'nb',
        nde: 'nd',
        nep: 'ne',
        ndo: 'ng',
        dut: 'nl',
        nld: 'nl',
        nno: 'nn',
        nor: 'no',
        nbl: 'nr',
        nav: 'nv',
        nya: 'ny',
        oci: 'oc',
        oji: 'oj',
        orm: 'om',
        ori: 'or',
        oss: 'os',
        pan: 'pa',
        pli: 'pi',
        pol: 'pl',
        pus: 'ps',
        por: 'pt',
        que: 'qu',
        roh: 'rm',
        run: 'rn',
        rum: 'ro',
        ron: 'ro',
        rus: 'ru',
        kin: 'rw',
        san: 'sa',
        srd: 'sc',
        snd: 'sd',
        sme: 'se',
        sag: 'sg',
        sin: 'si',
        slo: 'sk',
        slk: 'sk',
        slv: 'sl',
        smo: 'sm',
        sna: 'sn',
        som: 'so',
        alb: 'sq',
        sqi: 'sq',
        srp: 'sr',
        ssw: 'ss',
        sot: 'st',
        sun: 'su',
        swe: 'sv',
        swa: 'sw',
        tam: 'ta',
        tel: 'te',
        tgk: 'tg',
        tha: 'th',
        tir: 'ti',
        tuk: 'tk',
        tgl: 'tl',
        tsn: 'tn',
        ton: 'to',
        tur: 'tr',
        tso: 'ts',
        tat: 'tt',
        twi: 'tw',
        tah: 'ty',
        uig: 'ug',
        ukr: 'uk',
        urd: 'ur',
        uzb: 'uz',
        ven: 've',
        vie: 'vi',
        vol: 'vo',
        wln: 'wa',
        wol: 'wo',
        xho: 'xh',
        yid: 'yi',
        yor: 'yo',
        zha: 'za',
        chi: 'zh',
        zho: 'zh',
        zul: 'zu',
    },
    makeReverseMapping : function() {
        return Object.fromEntries(
            Object.entries(this.ISO639_2_to_ISO639_1).map(([key, value]) => [value, key])
          );
    },
    /**
     * Map a comma-separated ISO 639-2 list to BCP-47 primary language subtags
     * (ISO 639-1 where the mapping exists). Already-2-letter or unmapped tags
     * are passed through so preferredUILanguage47 stays consistent with
     * preferredUILanguage.
     */
    iso639_2ListToBcp47: function(list) {
        if (typeof list !== 'string' || list.length === 0) {
            return '';
        }
        return list.split(',').map((code) => {
            const trimmed = code.trim();
            if (!trimmed) {
                return '';
            }
            return this.ISO639_2_to_ISO639_1[trimmed.toLowerCase()] || trimmed;
        }).filter((code) => code.length > 0).join(',');
    }
};
/**
 * @fileOverview Common utiltiies used by objects.
 * @license ORB Software. Copyright (c) 2022 Ocean Blue Software Limited
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

hbbtv.utils = (function() {
    const HAS_WEAKREF_SUPPORT = (function() {
        try {
            const test = new WeakRef({});
            return true;
        } catch (e) {
            console.log(
                'Warning: For development on non-production browsers only (WeakRef unsupported)'
            );
        }
        return false;
    })();

    function weakRef(ref) {
        return ref ? (HAS_WEAKREF_SUPPORT ? new WeakRef(ref) : ref) : ref;
    }

    function weakDeref(ref) {
        return ref ? (HAS_WEAKREF_SUPPORT ? ref.deref() : ref) : ref;
    }

    function createFinalizationRegistry(callback) {
        return HAS_WEAKREF_SUPPORT ?
            new FinalizationRegistry(callback) : {
                register: () => {},
                unregister: () => {},
            };
    }

    function runOnMainLooper(thiz, runnable) {
        setTimeout(runnable.bind(thiz), 0);
    }

    function defineConstantProperties(prototype, constants) {
        for (const [key, value] of Object.entries(constants)) {
            Object.defineProperty(prototype, key, {
                value: value,
            });
        }
    }

    function defineGetterProperties(prototype, getters) {
        for (const [key, getter] of Object.entries(getters)) {
            Object.defineProperty(prototype, key, {
                get: getter,
            });
        }
    }

    function defineGetterSetterProperties(prototype, props) {
        for (const [key, prop] of Object.entries(props)) {
            Object.defineProperty(prototype, key, {
                set: prop.set,
                get: prop.get,
            });
        }
    }

    function preventDefaultMediaHandling(target) {
        const parent = target.parentNode;
        target.setAttribute('classid', 'hbbtv');
        if (parent) {
            // Chrome ignores classid changes once object is already in the tree, so remove and add it back
            const sibling = target.nextSibling;
            parent.removeChild(target);
            if (sibling) {
                parent.insertBefore(target, sibling);
            } else {
                parent.appendChild(target);
            }
        }
    }

    function base64Encode(str) {
        if (str === undefined) {
            str = '';
        }
        const table = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
        let result = '';
        let length = str.length;
        let i = 0;
        while (i < length) {
            let output0 = (str.charCodeAt(i) & 0b11111100) >> 2;
            let output1 = (str.charCodeAt(i) & 0b00000011) << 4;
            let output2 = 64;
            let output3 = 64;
            if (++i < length) {
                output1 |= (str.charCodeAt(i) & 0b11110000) >> 4;
                output2 = (str.charCodeAt(i) & 0b00001111) << 2;
                if (++i < length) {
                    output2 |= (str.charCodeAt(i) & 0b11000000) >> 6;
                    output3 = str.charCodeAt(i) & 0b00111111;
                    ++i;
                }
            }
            result += table[output0];
            result += table[output1];
            result += table[output2];
            result += table[output3];
        }
        return result;
    }

    function base64Decode(str) {
        return atob(str);
    }

    function insertAfter(thiz, child, sibling) {
        if (thiz) {
            const nextSibling = sibling.nextSibling;
            if (nextSibling) {
                thiz.insertBefore(child, nextSibling);
            } else {
                thiz.appendChild(child);
            }
        }
    }

    function matchElementStyle(thiz, element) {
        if (thiz) {
            const style = window.getComputedStyle(element);
            Array.from(style).forEach((key) =>
                thiz.style.setProperty(
                    key,
                    style.getPropertyValue(key),
                    style.getPropertyPriority(key)
                )
            );
            if (thiz.style.position !== 'fixed') {
                thiz.style.left = element.offsetLeft + 'px';
                thiz.style.top = element.offsetTop + 'px';
                thiz.style.margin = 0;
                thiz.style.position = 'absolute';
            }

            /**
             * WPE-2.28 Uses object-fit: contain by default, which results into the video
             * presenting with an offset on the y-axis. We need to override this default style
             * in order for the video to present in the correct y-position.
             */
            if (hbbtv.native.name === "rdk") {
                thiz.style.objectFit = "fill";
            }
        }
    }

    const gListenerFinalization = createFinalizationRegistry(({
        target,
        type,
        wrapper
    }) => {
        target.removeEventListener(type, wrapper);
    });

    class EventDispatcher {
        constructor(target) {
            this.delegate = document.createDocumentFragment();
            this.wrappers = {};
            this.count = 0;
            this.shadow = {};
            this.target = target;
        }

        /**
         * Add a listener that will be called for this event type, unless it was collected.
         *
         * This method does not create a strong reference from the EventDispatcher to the listener,
         * so the listener (and its references) can be collected once they become otherwise
         * unreachable. Useful for events where no explicit removal method is guaranteed to be called
         * later.
         *
         * Note: Passing in an anonymous function (for example) will probably result in listener being
         * collected immediately! A reference to listener needs to be held by the caller, for example
         * in an object with an associated lifetime.
         */
        addWeakEventListener(type, listener) {
            if (!HAS_WEAKREF_SUPPORT) {
                return this.addEventListener(type, listener);
            }

            if (!(type in this.wrappers)) {
                this.wrappers[type] = new WeakMap();
            }
            if (!this.wrappers[type].has(listener)) {
                const weak = new WeakRef(listener);
                const wrapper = (event) => {
                    const listener = weak.deref();
                    if (listener) {
                        listener(event);
                    }
                };
                this.wrappers[type].set(listener, wrapper);
                gListenerFinalization.register(listener, {
                    target: this,
                    type,
                    wrapper,
                });
                this.addEventListener(type, wrapper);
            }
        }

        /**
         * Remove a previously added weak event listener.
         */
        removeWeakEventListener(type, listener) {
            if (!HAS_WEAKREF_SUPPORT) {
                return this.removeEventListener(type, listener);
            }

            if (type in this.wrappers) {
                const wrapper = this.wrappers[type].get(listener);
                if (wrapper) {
                    this.wrappers[type].delete(listener);
                    gListenerFinalization.unregister(listener);
                    this.removeEventListener(type, wrapper);
                }
            }
        }

        /**
         * Add a counted listener that will be called for this event type.
         *
         * Returns the total number of counted listeners currently added to this EventDispatcher.
         */
        addCountedEventListener(type, listener) {
            this.addEventListener(type, listener);
            if (!(type in this.shadow)) {
                this.shadow[type] = new WeakSet([listener]);
                this.count++;
            } else if (!this.shadow[type].has(listener)) {
                this.shadow[type].add(listener);
                this.count++;
            }
            return this.count;
        }

        /**
         * Remove a previously added counted listener.
         *
         * Returns the total number of counted listeners currently added to this EventDispatcher.
         */
        removeCountedEventListener(type, listener) {
            this.removeEventListener(type, listener);
            if (type in this.shadow) {
                if (this.shadow[type].has(listener)) {
                    this.shadow[type].delete(listener);
                    this.count--;
                }
            }
            return this.count;
        }

        addEventListener(type, listener) {
            this.delegate.addEventListener(type, listener);
        }

        removeEventListener(type, listener) {
            this.delegate.removeEventListener(type, listener);
        }

        dispatchEvent(event) {
            if (this.target) {
                Object.defineProperty(event, 'target', {
                    writable: false,
                    value: this.target,
                });
            }
            this.delegate.dispatchEvent(event);
        }
    }

    return {
        HAS_WEAKREF_SUPPORT: HAS_WEAKREF_SUPPORT,
        weakRef: weakRef,
        weakDeref: weakDeref,
        createFinalizationRegistry: createFinalizationRegistry,
        runOnMainLooper: runOnMainLooper,
        defineConstantProperties: defineConstantProperties,
        defineGetterProperties: defineGetterProperties,
        defineGetterSetterProperties: defineGetterSetterProperties,
        preventDefaultMediaHandling: preventDefaultMediaHandling,
        base64Encode: base64Encode,
        base64Decode: base64Decode,
        insertAfter: insertAfter,
        matchElementStyle: matchElementStyle,
        EventDispatcher: EventDispatcher,
    };
})();/**
 * @fileOverview Service configuration and point of entry for initialisation.
 * @license ORB Software. Copyright (c) 2022 Ocean Blue Software Limited
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

hbbtv.core = (function() {
    function initialise() {
        hbbtv.native.initialise();
        hbbtv.bridge.initialise();
        hbbtv.objectManager.initialise();
        hbbtv.orbDebug.polyfill();
        hbbtv.drmManager.initialise();
    }
    return {
        initialise: initialise,
    };
})();/**
 * @fileOverview Native-agnostic interface to outside the browser context (e.g. to the broadcast stack).
 * @license ORB Software. Copyright (c) 2022 Ocean Blue Software Limited
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * ORB internal interface: system-agnostic bridge to native.
 *
 * @name bridge
 * @class
 * @constructor
 */
hbbtv.bridge = (function() {
    const exported = {};

    const gEventDispatcher = new hbbtv.utils.EventDispatcher();

    /**
     * Initialise the bridge.
     *
     * @method
     * @memberof bridge#
     */
    exported.initialise = function() {
        hbbtv.native.setDispatchEventCallback((type, properties) => {
            gEventDispatcher.dispatchEvent(Object.assign(new Event(type), properties));
        });
    };

    /**
     * The `listenerCallback` is called when an event is received.
     *
     * @callback listenerCallback
     * @param {Event} event An Event object that contains the received properties.
     */

    /**
     * Add a "strong" event listener to the bridge that will be called when an event of the given
     * type is received.
     *
     * This method creates a strong reference from the bridge to the listener, which will prevent
     * the listener and its references from being collected.
     *
     * @param {string} type The event type to receive.
     * @param {listenerCallback} callback The callback that is called when the event is received.
     *
     * @method
     * @memberof bridge#
     */
    exported.addStrongEventListener = function(type, callback) {
        gEventDispatcher.addEventListener(type, callback);
    };

    /**
     * Remove a previously added "strong" event listener.
     *
     * @param {string} type The previously added event type.
     * @param {listenerCallback} callbackThe The previously added callback.
     *
     * @method
     * @memberof bridge#
     */
    exported.removeStrongEventListener = function(type, callback) {
        gEventDispatcher.removeEventListener(type, callback);
    };

    /**
     * Add a "weak" event listener to the bridge that will be called when an event of the given type
     * is received, until the event listener is collected.
     *
     * This method creates a weak reference from the bridge to the listener, so that the listener
     * and its references can be collected when they become otherwise unreachable.
     *
     * Note: Passing in an anonymous function (for example) will probably result in listener being
     * collected immediately! A reference to listener needs to be held by the caller, for example
     * in an object with an associated lifetime.
     *
     * @param {string} type The event type to subcribe to.
     * @param {listenerCallback} callback The callback that is called when the event is received.
     *
     * @method
     * @memberof bridge#
     */
    exported.addWeakEventListener = function(type, callback) {
        gEventDispatcher.addWeakEventListener(type, callback);
    };

    /**
     * Remove a previously added "weak" event listener.
     *
     * @param {string} type The previously added event type.
     * @param {listenerCallback} callbackThe The previously added callback.
     *
     * @method
     * @memberof bridge#
     */
    exported.removeWeakEventListener = function(type, callback) {
        gEventDispatcher.removeWeakEventListener(type, callback);
    };

    return exported;
})();

/**
 * ORB internal interface: system-agnostic bridge to native broadcast.
 *
 * @name bridge.broadcast
 * @class
 * @constructor
 */
hbbtv.bridge.broadcast = (function() {
    const exported = {};

    /**
     * Set the size and position of the broadcast video.
     *
     * Values in pixels are relative to a 1280x720 logical coordinate system and should be scaled to
     * the actual width and height of the browser.
     *
     * @param {number} x The X position in pixels.
     * @param {number} y The Y position in pixels.
     * @param {number} width The width in pixels.
     * @param {number} height The height in pixels.
     *
     * @method
     * @memberof bridge.broadcast#
     */
    exported.setVideoRectangle = function(x, y, width, height, fullScreen) {
        hbbtv.native.request('Broadcast.setVideoRectangle', {
            x: x,
            y: y,
            width: width,
            height: height,
        });
    };

    /**
     * Get the current broadcast channel.
     *
     * Security: FOR_BROADCAST_APP_ONLY.
     *
     * @returns {Channel} A Channel object representing the current broadcast channel; or null if
     *    not available.
     *
     * @method
     * @memberof bridge.broadcast#
     */
    exported.getCurrentChannel = function() {
        let currentChannel = hbbtv.native.request('Broadcast.getCurrentChannel').result;
        if (currentChannel.idType === hbbtv.objects.Channel.prototype.ID_DVB_SI_DIRECT) {
            currentChannel.dsd = hbbtv.utils.base64Decode(currentChannel.dsd);
        }
        return currentChannel;
    };

    /**
     * Get the current broadcast channel.
     *
     * This method can be called while transitioning to broadcast-related, allowing certain events to
     * be implemented.
     *
     * Security: FOR_BROADCAST_OR_TRANSITIONING_APP_ONLY.
     *
     * @returns {Channel} A Channel object representing the current broadcast channel; or null if not
     *    available.
     *
     * @method
     * @memberof bridge.broadcast#
     */
    exported.getCurrentChannelForEvent = function() {
        let getCurrentChannelForEvent = hbbtv.native.request('Broadcast.getCurrentChannelForEvent').result;
        if (getCurrentChannelForEvent.idType === hbbtv.objects.Channel.prototype.ID_DVB_SI_DIRECT) {
            getCurrentChannelForEvent.dsd = hbbtv.utils.base64Decode(getCurrentChannelForEvent.dsd);
        }
        return getCurrentChannelForEvent;
    };

    /**
     * Get the broadcast channel list.
     *
     * Security: FOR_BROADCAST_APP_ONLY.
     *
     * @returns {Array.<Channel>} A list of Channel objects representing the broadcast channel list;
     *    or an empty list if not available.
     *
     * @method
     * @memberof bridge.broadcast#
     */
    exported.getChannelList = function() {
        let channelList = hbbtv.native.request('Broadcast.getChannelList').result;
        channelList.forEach(channel => {
            if (channel.idType === hbbtv.objects.Channel.prototype.ID_DVB_SI_DIRECT) {
                channel.dsd = hbbtv.utils.base64Decode(channel.dsd);
            }
        });
        return channelList;
    };

    /**
     * Select a logically null broadcast channel (e.g. tune off).
     *
     * When a logically null broadcast channel is selected, the Application Manager must transition
     * the running application to broadcast-independent or kill it, depending on the signalling.
     *
     * Security: FOR_RUNNING_APP_ONLY.
     *
     *
     * @returns {number} A CHANNEL_STATUS_* code (on success, the code has a value less than 0).
     *
     * @method
     * @memberof bridge.broadcast#
     */
    exported.setChannelToNull = function(quiet) {
        return hbbtv.native.request('Broadcast.setChannelToNull').result;
    };

    /**
     * Returns the actual volume level set.
     *
     * @returns {number} Integer value between 0 up to and including 100 to indicate volume level.
     *
     * @method
     * @memberof bridge.broadcast#
     */
    exported.getVolume = function() {
        return hbbtv.native.request('Broadcast.getVolume').result;
    };

    /**
     * Adjusts the volume of the currently playing media to the volume as indicated by volume.
     *
     * @param {number} volume Integer value between 0 up to and including 100 to indicate volume level.
     * @returns {Boolean} true if the volume has changed. false if the volume has not changed.
     *
     * @method
     * @memberof bridge.broadcast#
     */
    exported.setVolume = function(volume) {
        return hbbtv.native.request('Broadcast.setVolume', {volume: volume}).result;
    };

    /**
     * Select the broadcast channel (e.g. tune) with the given CCID.
     *
     * Security: FOR_RUNNING_APP_ONLY.
     *
     * @param {string} ccid The CCID of the channel to set.
     * @param {boolean} trickplay True if the application has optionally hinted trickplay resources
     *    are required; or false otherwise. Does not affect the success of this operation.
     * @param {string} contentAccessDescriptorURL Optionally, additional information for
     *    DRM-protected IPTV  broadcasts; or an empty string otherwise.
     * @param {number} quiet Type of channel change: 0 for normal; 1 for normal, no UI; 2 for quiet
     *    (HbbTV A.2.4.3.2).
     *
     * @returns {number} A CHANNEL_STATUS_* code (on success, the code has a value less than 0).
     *
     * @method
     * @memberof bridge.broadcast#
     */
    exported.setChannelToCcid = function(ccid, trickplay, contentAccessDescriptorURL, quiet) {
        return hbbtv.native.request('Broadcast.setChannelToCcid', {
            ccid: ccid,
            trickplay: trickplay,
            contentAccessDescriptorURL: contentAccessDescriptorURL,
            quiet: quiet,
        }).result;
    };

    /**
     * Select the given broadcast channel (e.g. tune) with the given triplet and information.
     *
     * Security: FOR_RUNNING_APP_ONLY.
     *
     * @param {number} idType The type of the channel to set (ID_* code).
     * @param {number} onid The original network ID of the channel to set.
     * @param {number} tsid The transport stream ID of the channel to set.
     * @param {number} sid The service ID of the channel to set.
     * @param {number} sourceID Optionally, the ATSC source_ID of the channel to set; or -1
     *    otherwise.
     * @param {string} ipBroadcastID Optionally, the DVB textual service ID of the (IP broadcast)
     *    channel to set; or an empty string otherwise.
     * @param {boolean} trickplay True if the application has optionally hinted trickplay resources
     *    are required; or false otherwise. Does not affect the success of this operation.
     * @param {string} contentAccessDescriptorURL Optionally, additional information for
     *    DRM-protected IPTV broadcasts; or an empty string otherwise.
     * @param {number} quiet Type of channel change: 0 for normal, 1 for normal no UI, 2 for quiet
     *    (HbbTV A.2.4.3.2).
     *
     * @returns {number} A CHANNEL_STATUS_* code (on success, the code has a value less than 0).
     *
     * @method
     * @memberof bridge.broadcast#
     */
    exported.setChannelToTriplet = function(
        idType,
        onid,
        tsid,
        sid,
        sourceID,
        ipBroadcastID,
        trickplay,
        contentAccessDescriptorURL,
        quiet
    ) {
        return hbbtv.native.request('Broadcast.setChannelToTriplet', {
            idType: idType,
            onid: onid,
            tsid: tsid,
            sid: sid,
            sourceID: sourceID,
            ipBroadcastID: ipBroadcastID,
            trickplay: trickplay,
            contentAccessDescriptorURL: contentAccessDescriptorURL,
            quiet: quiet,
        }).result;
    };

    /**
     * Select the broadcast channel with the given DSD. 8 Security: FOR_RUNNING_APP_ONLY.
     *
     * @param {string} dsd The DSD of the channel to set.
     * @param {number} sid The service ID of the channel to set.
     * @param {boolean} trickplay True if the application has optionally hinted trickplay resources
     *    are  required; or false otherwise. Does not affect the success of this operation.
     * @param {string} contentAccessDescriptorURL Optionally, additional information for
     *    DRM-protected IPTV broadcasts; or an empty string otherwise.
     * @param {number} quiet Type of channel change: 0 for normal, 1 for normal no UI, 2 for quiet
     *    (HbbTV A.2.4.3.2).
     *
     * @returns {number} A CHANNEL_STATUS_* code (on success, the code has a value less than 0).
     *
     * @method
     * @memberof bridge.broadcast#
     */
    exported.setChannelToDsd = function(dsd, sid, trickplay, contentAccessDescriptorURL, quiet) {
        return hbbtv.native.request('Broadcast.setChannelToDsd', {
            dsd: dsd,
            sid: sid,
            trickplay: trickplay,
            contentAccessDescriptorURL: contentAccessDescriptorURL,
            quiet: quiet,
        }).result;
    };

    /**
     * Get the programme list for the given broadcast channel.
     *
     * Security: FOR_BROADCAST_APP_ONLY.
     *
     * @param {string} ccid The CCID of the broadcast channel.
     *
     * @returns {Array.<Programme>} A list of Programme objects available for the broadcast channel;
     *    or an empty list if not available.
     *
     * @method
     * @memberof bridge.broadcast#
     */
    exported.getProgrammes = function(ccid) {
        return hbbtv.native.request('Broadcast.getProgrammes', {
            ccid: ccid,
        }).result;
    };

    /**
     * Get the component list for the given broadcast channel.
     *
     * Security: FOR_BROADCAST_APP_ONLY.
     *
     * @param {string} ccid The CCID of the broadcast channel.
     * @param {number} type Optionally the component type (COMPONENT_TYPE_* code); or -1 otherwise.
     *
     * @returns {Array.<Component>} A list of Component objects available for the broadcast channel;
     *    or an empty list if not available.
     *
     * @method
     * @memberof bridge.broadcast#
     */
    exported.getComponents = function(ccid, type) {
        return hbbtv.native.request('Broadcast.getComponents', {
            ccid: ccid,
            type: type,
        }).result;
    };

    /**
     * Get a private audio component in the selected channel.
     *
     * Security: FOR_BROADCAST_APP_ONLY.
     *
     * @param {string} componentTag The component_tag of the component.
     *
     * @returns {Component} The private component with the specified component_tag in the PMT of the
     * currently selected broadcast channel; or null if unavailable or the component is not
     * private (i.e. the stream type is audio, video or subtitle).
     *
     * Mandatory properties: id, pid and encrypted. The id property shall be usable with the
     * overrideComponentSelection method to select the component as an audio track. Other Component
     * properties are not required.
     *
     * @method
     * @memberof bridge.broadcast#
     */
    exported.getPrivateAudioComponent = function(componentTag) {
        return hbbtv.native.request('Broadcast.getPrivateAudioComponent', {
            componentTag: componentTag,
        }).result;
    };

    /**
     * Get a private video component in the selected channel.
     *
     * Security: FOR_BROADCAST_APP_ONLY.
     *
     * @param {string} componentTag The component_tag of the stream.
     *
     * @returns {Component} The private component with the specified component_tag in the PMT of the
     * currently selected broadcast channel; or null if unavailable or the component is not
     * private (i.e. the stream type is audio, video or subtitle).
     *
     * Mandatory properties: id, pid and encrypted. The id property shall be usable with the
     * overrideComponentSelection method to select the component as a video track. Other Component
     * properties are not required.
     *
     * @method
     * @memberof bridge.broadcast#
     */
    exported.getPrivateVideoComponent = function(componentTag) {
        return hbbtv.native.request('Broadcast.getPrivateVideoComponent', {
            componentTag: componentTag,
        }).result;
    };

    /**
     * Override the default component selection of the terminal for the specified type.
     *
     * If id is empty, no component shall be selected for presentation (presentation is explicitly
     * disabled). Otherwise, the specified component shall be selected for presentation.
     *
     * If playback has already started, the presented component shall be updated.
     *
     * Default component selection shall be restored (revert back to the control of the terminal)
     * when: (1) the application terminates, (2) the channel is changed, (3) presentation has not
     * been explicitly disabled and the user selects another track in the terminal UI, or (4) the
     * restoreComponentSelection method is called.
     *
     * Security: FOR_BROADCAST_APP_ONLY.
     *
     * @param {number} type Type of component selection to override (COMPONENT_TYPE_* code).
     * @param {string} id A platform-defined component id or an empty string to disable presentation.
     *
     * @method
     * @memberof bridge.broadcast#
     */
    exported.overrideComponentSelection = function(type, id) {
        hbbtv.native.request('Broadcast.overrideComponentSelection', {
            type: type,
            id: id,
        });
    };

    /**
     * Restore the default component selection of the terminal for the specified type.
     *
     * If playback has already started, the presented component shall be updated.
     *
     * Security: FOR_BROADCAST_APP_ONLY.
     *
     * @param {number} type Type of component selection to restore (COMPONENT_TYPE_* code).
     *
     * @method
     * @memberof bridge.broadcast#
     */
    exported.restoreComponentSelection = function(type) {
        hbbtv.native.request('Broadcast.restoreComponentSelection', {
            type: type,
        });
    };

    /**
     * Start a metadata search.
     *
     * When the result is ready, it is dispatched to the bridge as a MetadataSearch event.
     *
     * Security: FOR_BROADCAST_APP_ONLY.
     *
     * @param {string} query A string that represents the query the application wants to carry out.
     * @param {number} offset Offset into the total result set.
     * @param {number} count Maximum number of items to include in the result from the offset.
     * @param {Array.<string>} channelConstraintList Optionally, a list of strings describing
     *    constraints the application wants applied to the query; or an empty list otherwise.
     *
     * @method
     * @memberof bridge.broadcast#
     */
    exported.startSearch = function(query, offset, count, channelConstraints) {
        hbbtv.native.request('Broadcast.startSearch', {
            channelConstraints: channelConstraints,
            count: count,
            offset: offset,
            query: query,
        });
    };

    /**
     * Abort a started metadata search.
     *
     * Security: FOR_BROADCAST_APP_ONLY.
     *
     * @param {number} queryId The ID from the query string that started the search.
     *
     * @method
     * @memberof bridge.broadcast#
     */
    exported.abortSearch = function(queryId) {
        hbbtv.native.request('Broadcast.abortSearch', {
            queryId: queryId,
        });
    };

    /**
     * Add a stream event listener subscribed to a DSM-CC event.
     *
     * When an event is transmitted, it is dispatched to the bridge as a StreamEvent event.
     *
     * @param {string} targetURL Optionally, the DSM-CC StreamEvent object URL; or an empty string
     *    otherwise.
     * @param {string} eventName The event name to subscribe to.
     * @param {number} componentTag If no targetURL is provided, the component tag; or -1 otherwise.
     * @param {number} streamEventId If no targetURL is provided, the event ID; or -1 otherwise.
     *
     * @returns {number} The listener ID. Associated StreamEvent events shall include this ID.
     *
     * @method
     * @memberof bridge.broadcast#
     */
    exported.addStreamEventListener = function(targetURL, eventName, componentTag, streamEventId) {
        return hbbtv.native.request('Broadcast.addStreamEventListener', {
            targetURL: targetURL,
            eventName: eventName,
            componentTag: componentTag,
            streamEventId: streamEventId,
        }).result;
    };

    /**
     * Remove the given stream event listener.
     *
     * @param {number} id The listener ID to remove.
     *
     * @method
     * @memberof bridge.broadcast#
     */
    exported.removeStreamEventListener = function(id) {
        hbbtv.native.request('Broadcast.removeStreamEventListener', {
            id: id,
        });
    };

    /**
     * Set whether the broadcast presentation should be suspended.
     *
     * Presentation of broadcast components such as audio, video and text tracks should be suspended
     * or resumed, with the component selections preserved. The channel should remain logically
     * selected (e.g. tuned).
     *
     * Security: FOR_BROADCAST_APP_ONLY.
     *
     * @param {boolean} presentationSuspended True if the broadcast presentation should be suspended;
     *    false otherwise.
     *
     * @method
     * @memberof bridge.broadcast#
     */
    exported.setPresentationSuspended = function(presentationSuspended) {
        try {
            hbbtv.native.request('Broadcast.setPresentationSuspended', {
                presentationSuspended: presentationSuspended,
            });
        } catch (e) {
            // A broadcast-independent application has no broadcast presentation to suspend or resume: that is not an
            // error for the caller. Letting the SecurityError escape broke A/V control stop() (and with it applications
            // that stop a preview before starting the film, e.g. the ZDFmediathek: "MediaLibrary Error 666").
            if (e.name !== 'SecurityError') {
                throw e;
            }
        }
    };

    return exported;
})();

/**
 * ORB internal interface: system-agnostic bridge to native programme information.
 *
 * TODO Move to bridge.broadcast
 *
 * @name bridge.programme
 * @class
 * @constructor
 */
hbbtv.bridge.programme = (function() {
    const exported = {};

    /**
     * Get the parental rating of the current broadcast programme.
     *
     * @return {ParentalRating} A ParentalRating object representing the parental rating; or null if
     *    not available.
     *
     * @method
     * @memberof bridge.programme#
     */
    exported.getParentalRating = function() {
        return hbbtv.native.request('Programme.getParentalRating').result;
    };

    /**
     * Get a list of the raw SI descriptor data for a programme.
     *
     * @param {string} ccid The CCID (channel ID) of the programme.
     * @param {string} programmeID The ID of the programme.
     * @param {number} descriptorTag The descriptor tag ID of the data to get.
     * @param {number} descriptorTagExtension Optionally, the extended descriptor tag ID of the data
     *    to get; -1 otherwise.
     * @param {number} privateDataSpecifier Optionally, the private data specifier of the data to be
     *    returned; 0 otherwise.
     *
     * @return {Array.<string>} A list of SI descriptor data. If there are multiple descriptors with
     *    the same tag ID, they will all be returned.
     *
     * @method
     * @memberof bridge.programme#
     */
    exported.getSIDescriptors = function(
        ccid,
        programmeID,
        descriptorTag,
        descriptorTagExtension,
        privateDataSpecifier
    ) {
        return hbbtv.native.request('Programme.getSIDescriptors', {
            ccid: ccid,
            programmeID: programmeID,
            descriptorTag: descriptorTag,
            descriptorTagExtension: descriptorTagExtension,
            privateDataSpecifier: privateDataSpecifier,
        }).result;
    };

    return exported;
})();

/**
 * ORB internal interface: system-agnostic bridge to native application manager.
 *
 * @name bridge.manager
 * @class
 * @constructor
 */
hbbtv.bridge.manager = (function() {
    const exported = {};

    /**
     * Create and run a new application.
     *
     * The calling application is identified by the token associated with the request, to check
     * whether it is allowed to create and run a new application.
     *
     * @param {string} url A HTTP/HTTPS or DVB URL.
     *
     *    A HTTP/HTTPS URL may refer to the entry page or XML AIT of a broadcast-independent app.
     *
     *    A DVB URL may refer to a broadcast-related app signalled in the current service AIT. This
     *    will result in the signalled URL being loaded, which may be HTTP/HTTPS for broadband or DVB
     *    for carousel.
     *
     * @return {boolean} True if the application can be created; false otherwise.
     *
     * @method
     * @memberof bridge.manager#
     */
    exported.createApplication = function(url) {
        return hbbtv.native.request('Manager.createApplication', {
            url: url,
        }).result;
    };

    /**
     * Destroy the calling application.
     *
     * The calling application is identified by the token associated with the request.
     *
     * @method
     * @memberof bridge.manager#
     */
    exported.destroyApplication = function() {
        hbbtv.native.request('Manager.destroyApplication');
    };

    /**
     * Show the calling application.
     *
     * The calling application is identified by the token associated with the request.
     *
     * @method
     * @memberof bridge.manager#
     */
    exported.showApplication = function() {
        hbbtv.native.request('Manager.showApplication');
    };

    /**
     * Hide the calling application.
     *
     * The calling application is identified by the token associated with the request.
     *
     * @method
     * @memberof bridge.manager#
     */
    exported.hideApplication = function() {
        hbbtv.native.request('Manager.hideApplication');
    };

    /**
     * Get the free memory available to the application.
     *
     * @returns {number} The free memory in bytes.
     *
     * @method
     * @memberof bridge.manager#
     */
    exported.getFreeMem = function() {
        return hbbtv.native.request('Manager.getFreeMem').result;
    };

    /**
     * Get the keyset for this application.
     *
     * The calling application is identified by the token associated with the request.
     *
     * @return {number} The keyset for this application.
     *
     * @method
     * @memberof bridge.manager#
     */
    exported.getKeyValues = function() {
        return hbbtv.native.request('Manager.getKeyValues').result;
    };

    /**
     * Get the other for this application.
     *
     * The calling application is identified by the token associated with the request.
     *
     * @return {number} The other keys for this application.
     *
     * @method
     * @memberof bridge.manager#
     */
    exported.getOtherKeyValues = function() {
        return hbbtv.native.request('Manager.getOtherKeyValues').result;
    };

    /**
     * Get the maximum keyset available to applications.
     *
     * @return {number} }he maximum keyset available to applications.
     *
     * @method
     * @memberof bridge.manager#
     */
    exported.getKeyMaximumValue = function() {
        return hbbtv.native.request('Manager.getKeyMaximumValue').result;
    };

    /**
     * Get the maximum other keys available to applications.
     *
     * @return {number} The maximum other keys available to applications.
     *
     * @method
     * @memberof bridge.manager#
     */
    exported.getKeyMaximumValue = function() {
        return hbbtv.native.request('Manager.getKeyMaximumOtherKeys').result;
    };

    /**
     * Set the keyset for this application.
     *
     * The calling application is identified by the token associated with the request.
     *
     * @param {number} value The keyset to set for this application.
     *
     * @return {number} The keyset for this application.
     *
     * @method
     * @memberof bridge.manager#
     */
    exported.setKeyValue = function(value, otherKeys) {
        return hbbtv.native.request('Manager.setKeyValue', {
            value: value,
            otherKeys: otherKeys,
        }).result;
    };

    /**
     * Get the URL of an icon that represents the given key.
     *
     * @param {number} code The code of the key to get an icon for (VK_ code).
     *
     * @return {string} A URL of an icon that represents the given key; or null if not available.
     *
     * @method
     * @memberof bridge.manager#
     */
    exported.getKeyIcon = function(code) {
        return hbbtv.native.request('Manager.getKeyIcon', {
            code: code,
        }).result;
    };

    exported.getApplicationScheme = function() {
        return hbbtv.native.request('Manager.getApplicationScheme').result;
    };

    /**
     * HbbTV A.2.20.6 ApplicationPrivateData.applicationHowRelatedHref.
     *
     * @return {string|undefined} Current DVB-I HowRelated href, or undefined.
     *
     * @method
     * @memberof bridge.manager#
     */
    exported.getApplicationHowRelatedHref = function() {
        const response = hbbtv.native.request('Manager.getApplicationHowRelatedHref');
        if (!response || response.result == null || response.result === '') {
            return undefined;
        }
        return response.result;
    };

    return exported;
})();

/**
 * ORB internal interface: system-agnostic bridge to native parental control.
 *
 * TODO Move to bridge.configuration.
 *
 * @name bridge.parentalControl
 * @class
 * @constructor
 */
hbbtv.bridge.parentalControl = (function() {
    const exported = {};

    /**
     * Get a list of rating schemes supported by this integration.
     *
     * @return {Array.<ParentalRatingScheme>} A list of ParentalRatingScheme objects representing the
     *    supported parental rating schemes; or an empty list of not available.
     *
     * @method
     * @memberof bridge.parentalControl#
     */
    exported.getRatingSchemes = function() {
        return hbbtv.native.request('ParentalControl.getRatingSchemes').result;
    };

    /**
     * Get the parental rating threshold currently set on the system for the given scheme.
     *
     * @param {string} schemeName The name of the scheme to get the threshold of.
     *
     * @return {ParentalRating} A ParentalRating object representing the threshold.
     *
     * @method
     * @memberof bridge.parentalControl#
     */
    exported.getThreshold = function(schemeName) {
        return hbbtv.native.request('ParentalControl.getThreshold', {
            scheme: schemeName,
        }).result;
    };

    /**
     * Test whether the rating is blocked for the given scheme, region and value.
     *
     * @param {string} scheme The name of the scheme to test.
     * @param {string} region The code of the region to test (ISO 3166-1 alpha-3 codes).
     * @param {number} value The value to test.
     *
     * @return {boolean} True if the rating is blocked; or false otherwise.
     *
     * @method
     * @memberof bridge.parentalControl#
     */
    exported.isRatingBlocked = function(rating) {
        return hbbtv.native.request('ParentalControl.isRatingBlocked', rating).result;
    };

    /**
     * Get the parental PIN length (HbbTV A.2.31 parentalPINLength).
     *
     * @return {number} digit count, 0 if disabled / no PIN, or -1 for non-PIN auth
     */
    exported.getPINLength = function() {
        return hbbtv.native.request('ParentalControl.getPINLength').result;
    };

    /**
     * Verify the parental control PIN (OIPF 7.9.1.2).
     *
     * @param {string} pin PIN to verify
     * @return {number} 0 correct, 1 incorrect, 2 PIN entry locked
     */
    exported.verifyPIN = function(pin) {
        return hbbtv.native.request('ParentalControl.verifyPIN', {
            pin: pin == null ? '' : String(pin),
        }).result;
    };

    /**
     * Request terminal parental approval UI. Result arrives as parentalcontrolapproval event.
     *
     * @param {Object|null} context optional language→name map
     */
    exported.requestApproval = function(context) {
        hbbtv.native.request('ParentalControl.requestApproval', {
            context: context || null,
        });
    };

    return exported;
})();

/**
 * ORB internal interface: system-agnostic bridge to native configuration.
 *
 * @name bridge.configuration
 * @class
 * @constructor
 */
hbbtv.bridge.configuration = (function() {
    const exported = {};

    /**
     * @typedef {Object} Capabilities Create a capabilities type that describes the current
     * capabilities of the terminal.
     *
     * @property {Array.<string>} optionStrings A list of HbbTV option strings supported by the
     * terminal.
     * Valid values as defined by HBBTV 10.2.4.8 table 13.
     * @property {Array.<string>} profileNameFragments A list of OIPF UI Profile Name Fragments
     * supported by the terminal; this shall always include trick mode ("+TRICKMODE"), any supported
     * broadcast delivery systems (e.g. "+DVB_S") and no other values.
     * Valid values as defined by OIPF DAE table 16.
     * @property {Array.<string>} parentalSchemes A list of parental scheme names registered with
     * the platform.
     * Valid values are usable as scheme names with other parental APIs.
     * @property {Array.<string>|null} graphicsLevels A list of graphics performance levels supported
     * by the terminal
     * (required if any of the graphics levels are supported, null to omit).
     * Valid values as defined by HBBTV 10.2.4.7 table 12c.
     * @property {Array.<string>|null} broadcastUrns A list of URNs for each supported broadcast
     * technology (required if any broadcast delivery is supported, null to omit).
     * Valid values as defined in HBBTV 10.2.4.7 for broadcast element value.
     * @property {string} displaySizeWidth The current width of the primary display in centimetres.
     * Valid values as defined by HBBTV 10.2.4.7 for display_size width.
     * @property {string} displaySizeHeight The current height of the primary display in centimetres.
     * Valid values as defined by HBBTV 10.2.4.7 for display_size height.
     * @property {string} displaySizeMeasurementType The measurement type.
     * Valid values as defined by HBBTV 10.2.4.7 for display_size measurement_type.
     * @property {string|null} audioOutputFormat The current multi-channel audio capabilities
     * (required where terminals support multi-channel audio, null to omit).
     * Valid values as defined by HBBTV 10.2.4.7 for audio_system audio_output_format.
     * @property {boolean|null} passThroughStatus True when the terminal's audio outputs are
     * operating in a pass-through mode in which broadcast or broadband audio bitstreams are output
     * directly by the terminal without modification. False otherwise.
     * @property {string|null} html5MediaVariableRateMin Minimum supported forward playback rate
     * (required where terminals support a playbackRate with a MediaSource object other than "1.0",
     * null to omit).
     * Valid values as defined by HBBTV 10.2.4.7 for html5_media_variable_rate min.
     * @property {string|null} html5MediaVariableRateMax Maximum supported forward playback rate
     * (required where terminals support a playbackRate with a MediaSource object other than "1.0",
     * null to omit).
     * Valid values as defined by HBBTV 10.2.4.7 for html5_media_variable_rate max.
     * @property {string|null} jsonRpcServerUrl The URL of the JSON RPC WebSocket server
     * (required where terminals support HbbTV 204, null to omit).
     * @property {string|null} jsonRpcServerVersion The version of the JSON RPC WebSocket server
     * (required where terminals support HbbTV 204, null to omit).
     */

    /**
     * @typedef {Object} AudioProfile Create an AudioProfile type that describes an audio profile,
     * valid combinations are as defined by HBBTV 10.2.4.7 for the audio_profile element.
     *
     * @property {string} name Name of profile (required).
     * Valid values as defined by OIPF DAE 9.3.11 for audio_profile name.
     * @property {string} type MIME type of profile (required).
     * Valid values as defined by OIPF DAE 9.3.11 for audio_profile type.
     * @property {string|null} transport Space separated list of supported protocol names (optional,
     * null to omit).
     * Valid values as defined by OIPF DAE 9.3.11 for audio_profile transport and HBBTV 10.2.4.7.
     * @property {string|null} syncTl Space separated list of timeline types (optional, null to
     * omit).
     * Valid values as defined by HBBTV 10.2.4.7 table 12a.
     * @property {string|null} drmSystemId Space separated list of DRM system IDs (optional, null to
     * omit).
     * Valid values as defined by OIPF DAE 9.3.11 for audio_profile DRMSystemID.
     */

    /**
     * @typedef {Object} VideoProfile Create a VideoProfile type that describes a video profile,
     * valid combinations are as defined by HBBTV 10.2.4.7 for the video_profile element.
     *
     * @property {string} name Name of profile (required).
     * Valid values as defined by OIPF DAE 9.3.11 for video_profile name.
     * @property {string} type MIME type of profile (required).
     * Valid values as defined by OIPF DAE 9.3.11 for video_profile type.
     * @property {string} transport Space separated list of supported protocol names (optional, null
     * to omit).
     * Valid values as defined by OIPF DAE 9.3.11 for video_profile transport and HBBTV 10.2.4.7.
     * @property {string|null} syncTl Space separated list of timeline types (optional, null to
     * omit).
     * Valid values as defined by HBBTV 10.2.4.7 table 12a.
     * @property {string|null} drmSystemId Space separated list of DRM system IDs (optional, null to
     * omit).
     * Valid values as defined by OIPF DAE 9.3.11 for video_profile DRMSystemID.
     * @property {string|null} hdr URI of HDR technology (optional, null to omit).
     * Valid values as defined by HBBTV 10.2.4.7 table 12b.
     */

    /**
     * @typedef {Object} VideoDisplayFormat Create a VideoDisplayFormat type that describes a video
     * display format, valid combinations are as defined by HBBTV 10.2.4.7 for the
     * video_display_format element.
     *
     * @property {number} width Width of the video content (required).
     * Valid values as defined by HBBTV 10.2.4.7 for video_display_format name.
     * @property {number} height Height of the video content (required).
     * Valid values as defined by HBBTV 10.2.4.7 for video_display_format height.
     * @property {number} frameRate Frame rate of the video content (required).
     * Valid values as defined by HBBTV 10.2.4.7 for video_display_format frame_rate.
     * @property {number} bitDepth Bit depth of the video content (required).
     * Valid values as defined by HBBTV 10.2.4.7 for video_display_format bit_depth.
     * @property {string} colorimetry A space separated list of colorimetry strings (required).
     * Valid values as defined by HBBTV 10.2.4.7 for video_display_format colorimetry.
     */

    /**
     * Get the current capabilities of the terminal.
     *
     * @return {Capabilities} A Capabilities object.
     *
     * @method
     * @memberof bridge.configuration#
     */
    exported.getCapabilities = function() {
        return hbbtv.native.request('Configuration.getCapabilities', {}).result;
    };

    /**
     * Get a list of audio profiles supported by the terminal, as defined by HBBTV 10.2.4.7 for
     * the audio_profile element.
     *
     * @return {Array.<AudioProfile>} A list of audio profiles supported by the terminal.
     *
     * @method
     * @memberof bridge.configuration#
     */
    exported.getAudioProfiles = function() {
        return hbbtv.native.request('Configuration.getAudioProfiles', {}).result;
    };

    /**
     * Get a list of video profiles supported by the terminal, as defined by HBBTV 10.2.4.7 for
     * the video_profile element.
     *
     * @return {Array.<VideoProfile>} A list of video profiles supported by the terminal.
     *
     * @method
     * @memberof bridge.configuration#
     */
    exported.getVideoProfiles = function() {
        return hbbtv.native.request('Configuration.getVideoProfiles', {}).result;
    };

    /**
     * If the terminal supports UHD, get a list that describes the highest quality video format the
     * terminal supports, as defined by HBBTV 10.2.4.7 for the video_display_format element;
     * otherwise get an empty list.
     *
     * Note: If the terminal changes its display format based on the content being played, multiple
     * elements may be included in the list when multiple frame rate families are usable or the
     * highest resolution does not support each highest quality parameter.
     *
     * @return {Array.<VideoDisplayFormat>} A list that describes the highest quality video format.
     *
     * @method
     * @memberof bridge.configuration#
     */
    exported.getVideoDisplayFormats = function() {
        return hbbtv.native.request('Configuration.getVideoDisplayFormats', {}).result;
    };

    /**
     * Get the current number of additional media streams containing SD video accompanied by audio
     * that can be decoded and presented by an A/V control object or HTML5 media element.
     *
     * @return {number} The current number of additional media streams. If the value is non-zero,
     * then a call to play an A/V control object, HTML5 media element or video/broadcast object
     * shall not fail due to lack of resources for SD media.
     *
     * @method
     * @memberof bridge.configuration#
     */
    exported.getExtraSDVideoDecodes = function() {
        return hbbtv.native.request('Configuration.getExtraSDVideoDecodes', {}).result;
    };

    /**
     * Get the current number of additional media streams containing HD video accompanied by audio
     * that can be decoded and presented by an A/V control object or HTML5 media element.
     *
     * @return {number} The current number of additional media streams. If the value is non-zero,
     * then a call to play an A/V control object, HTML5 media element or video/broadcast object
     * shall not fail due to lack of resources for HD media.
     *
     * @method
     * @memberof bridge.configuration#
     */
    exported.getExtraHDVideoDecodes = function() {
        return hbbtv.native.request('Configuration.getExtraHDVideoDecodes', {}).result;
    };

    /**
     * Get the current number of additional media streams containing UHD video accompanied by audio
     * that can be decoded and presented by an A/V control object or HTML5 media element.
     *
     * @return {number} The current number of additional media streams. If the value is non-zero,
     * then a call to play an A/V control object, HTML5 media element or video/broadcast object
     * shall not fail due to lack of resources for UHD media.
     *
     * @method
     * @memberof bridge.configuration#
     */
    exported.getExtraUHDVideoDecodes = function() {
        return hbbtv.native.request('Configuration.getExtraUHDVideoDecodes', {}).result;
    };

    /**
     * Get the maximum (static) broadband media decoding capabilities for the indicated decoder.
     * This method is defined in HBBTV-TA-1 v1.1.1 A.2.2.
     *
     * Media decoders are numbered from 1 increasing in steps of 1 up to the total number of
     * media decoders in the terminal. Decoders are ordered in decreasing capabilities (UHD before
     * HD, HD before SD). If decoderIndex is greater than the number of media decoders then null
     * shall be returned.
     *
     * @param {number} decoderIndex - The decoder index (1-based, starting from 1)
     * @return {Array.<string>|null} An array of video profile names (strings) for the decoder,
     *                               or null if decoderIndex is greater than the number of decoders.
     *                               Each string shall be one of the video_profile elements returned
     *                               by xmlCapabilities.
     *
     * @method
     * @memberof bridge.configuration#
     */
    exported.getBroadbandCapabilities = function(decoderIndex) {
        return hbbtv.native.request('Configuration.getBroadbandCapabilities', {
            decoderIndex: decoderIndex,
        }).result;
    };

    /**
     * Get the maximum (static) broadcast media decoding capabilities for the indicated decoder.
     * This method is defined in HBBTV-TA-1 v1.1.1 A.2.2.
     *
     * Media decoders are numbered from 1 increasing in steps of 1 up to the total number of
     * media decoders in the terminal. Decoders are ordered in decreasing capabilities (UHD before
     * HD, HD before SD). If decoderIndex is greater than the number of media decoders then null
     * shall be returned.
     *
     * @param {number} decoderIndex - The decoder index (1-based, starting from 1)
     * @return {Array.<string>|null} An array of URN strings for the decoder, or null if
     *                               decoderIndex is greater than the number of decoders.
     *                               Each string shall be one of the URNs returned as the value
     *                               of a <broadcast> element returned by xmlCapabilities.
     *
     * @method
     * @memberof bridge.configuration#
     */
    exported.getBroadcastCapabilities = function(decoderIndex) {
        return hbbtv.native.request('Configuration.getBroadcastCapabilities', {
            decoderIndex: decoderIndex,
        }).result;
    };

    /**
     * Get certain immutable information about the system.
     *
     * @return {SystemInformation} A SystemInformation object.
     *
     * @method
     * @memberof bridge.configuration#
     */
    exported.getLocalSystem = function() {
        return hbbtv.native.request('Configuration.getLocalSystem').result;
    };

    /**
     * Get preferred languages to be used for audio playback on this system.
     *
     * @return {string} Comma separated string of languages (ISO 639-2 codes), in order of
     *    preference.
     *
     * @method
     * @memberof bridge.configuration#
     */
    exported.getPreferredAudioLanguage = function() {
        return hbbtv.native.request('Configuration.getPreferredAudioLanguage').result;
    };

    /**
     * Get preferred languages to be used for audio playback on this system.
     *
     * @return {string} Comma separated string of languages (IETF BCP47 codes), in order of
     *    preference.
     *
     * @method
     * @memberof bridge.configuration#
     */
    exported.getPreferredAudioLanguage47 = function() {
        return hbbtv.native.request('Configuration.getPreferredAudioLanguage47').result;
    };

    /**
     * Get preferred languages to be used for the user-interface on this system.
     *
     * @return {string} Comma separated string of languages (ISO 639-2 codes), in order of
     *    preference.
     *
     * @method
     * @memberof bridge.configuration#
     */
    exported.getPreferredSubtitleLanguage = function() {
        return hbbtv.native.request('Configuration.getPreferredSubtitleLanguage').result;
    };

    /**
     * Get preferred languages to be used for the user-interface on this system.
     *
     * @return {string} Comma separated string of languages (IETF BCP47 codes), in order of
     *    preference.
     *
     * @method
     * @memberof bridge.configuration#
     */
    exported.getPreferredSubtitleLanguage47 = function() {
        return hbbtv.native.request('Configuration.getPreferredSubtitleLanguage47').result;
    };

    /**
     * Get preferred languages to be used for the user-interface on this system.
     *
     *
     * @return {string} Comma separated string of languages (ISO 639-2 codes), in order of
     *    preference.
     *
     * @method
     * @memberof bridge.configuration#
     */
    exported.getPreferredUILanguage = function() {
        return hbbtv.native.request('Configuration.getPreferredUILanguage').result;
    };

    /**
     * Get a string containing the three character country code identifying the country this system
     * is deployed.
     *
     * @return {string} Country code the receiver is deployed (ISO 3166-1 alpha-3 code).
     *
     * @method
     * @memberof bridge.configuration#
     */
    exported.getCountryId = function() {
        return hbbtv.native.request('Configuration.getCountryId').result;
    };

    /**
     * Get whether subtitles are enabled on this system.
     *
     * @return {boolean} True if subtitles are enabled; or false otherwise.
     *
     * @method
     * @memberof bridge.configuration#
     */
    exported.getSubtitlesEnabled = function() {
        return hbbtv.native.request('Configuration.getSubtitlesEnabled').result;
    };

    /**
     * Get whether audio description is enabled on this system.
     *
     * @return {boolean} True if audio description is enabled; or false otherwise.
     *
     * @method
     * @memberof bridge.configuration#
     */
    exported.getAudioDescriptionEnabled = function() {
        return hbbtv.native.request('Configuration.getAudioDescriptionEnabled').result;
    };

    /**
     * Get whether clean audio is enabled on this system.
     *
     * @return {boolean} True if clean audio is enabled; or false otherwise.
     *
     * @method
     * @memberof bridge.configuration#
     */
    exported.getCleanAudioEnabled = function() {
        return hbbtv.native.request('Configuration.getCleanAudioEnabled').result;
    };

    /**
     * Get the DVB network IDs of the channels in the broadcast channel list.
     *
     * @return {Array.<String>} A list of DVB network IDs; or an empty list of not available.
     *
     * @method
     * @memberof bridge.configuration#
     */
    exported.getDttNetworkIds = function() {
        return hbbtv.native.request('Configuration.getDttNetworkIds').result;
    };

    /**
     * Get a distinctive identifier for this terminal and calling origin; or a status code if not
     * available. To get access to a distinctive identifier, the calling origin must have previously
     * called Configuration_requestAccessToDistinctiveIdentifier.
     *
     * The calling origin is identified by the token associated with the request.
     *
     * Integrators should check HbbTV 12.1.5 for requirements about distinctive identifiers.
     *
     * @return {string} A distinctive identifier, uniquely generated for this terminal and calling
     *    origin; or a status code (DISTINCTIVE_IDENTIFIER_STATUS_ code).
     *
     * @method
     * @memberof bridge.configuration#
     */
    exported.getDeviceId = function() {
        return hbbtv.native.request('Configuration.getDeviceId').result;
    };

    /**
     * Request distinctive identifier access for this calling origin.
     *
     * The calling origin is identified by the token associated with the request.
     *
     * The client application should display a dialog for the user to allow or deny this. When the
     * result is ready, it is dispatched to the bridge as a accesstodistinctiveidentifier event.
     *
     * @method
     * @memberof bridge.configuration#
     */
    exported.requestAccessToDistinctiveIdentifier = function() {
        hbbtv.native.request('Configuration.requestAccessToDistinctiveIdentifier');
    };

    /**
     * Get the primary display info from the system.
     *
     * @return {DisplayInfo} A DisplayInfo object.
     *
     * @method
     * @memberof bridge.configuration#
     */
    exported.getPrimaryDisplay = function() {
        return hbbtv.native.request('Configuration.getPrimaryDisplay').result;
    };

    return exported;
})();

/**
 * ORB internal interface: system-agnostic bridge to native media sync.
 *
 * TODO All these methods need to be commented.
 *
 * @name bridge.mediaSync
 * @class
 * @constructor
 */
hbbtv.bridge.mediaSync = (function() {
    const exported = {};

    /**
     *
     * @return {number}
     *
     * @method
     * @memberof bridge.mediaSync#
     */
    exported.instantiate = function() {
        return hbbtv.native.request('MediaSynchroniser.instantiate').result;
    };

    /**
     * @param {number} id
     * @param {boolean} isMasterBroadcast
     *
     * @return {boolean}
     *
     * @method
     * @memberof bridge.mediaSync#
     */
    exported.initialise = function(id, isMasterBroadcast) {
        return hbbtv.native.request('MediaSynchroniser.initialise', {
            id: id,
            isMasterBroadcast: isMasterBroadcast,
        }).result;
    };

    /**
     * @param {number} id
     *
     * @method
     * @memberof bridge.mediaSync#
     */
    exported.destroy = function(id) {
        hbbtv.native.request('MediaSynchroniser.destroy', {
            id: id,
        });
    };

    /**
     * @param {number} id
     *
     * @method
     * @memberof bridge.mediaSync#
     */
    exported.enableInterDeviceSync = function(id) {
        hbbtv.native.request('MediaSynchroniser.enableInterDeviceSync', {
            id: id,
        });
    };

    /**
     * @param {number} id
     *
     * @method
     * @memberof bridge.mediaSync#
     */
    exported.disableInterDeviceSync = function(id) {
        hbbtv.native.request('MediaSynchroniser.disableInterDeviceSync', {
            id: id,
        });
    };

    /**
     * @param {number} id
     *
     * @return {number}
     *
     * @method
     * @memberof bridge.mediaSync#
     */
    exported.nrOfSlaves = function(id) {
        return hbbtv.native.request('MediaSynchroniser.nrOfSlaves', {
            id: id,
        }).result;
    };

    /**
     * @param {number} id
     *
     * @return {boolean}
     *
     * @method
     * @memberof bridge.mediaSync#
     */
    exported.interDeviceSyncEnabled = function(id) {
        return hbbtv.native.request('MediaSynchroniser.interDeviceSyncEnabled', {
            id: id,
        }).result;
    };

    /**
     * @param {number} id
     *
     * @return {string}
     *
     * @method
     * @memberof bridge.mediaSync#
     */
    exported.getContentIdOverride = function(id) {
        return hbbtv.native.request('MediaSynchroniser.getContentIdOverride', {
            id: id,
        }).result;
    };

    /**
     * @param {number} id
     * @param {Object} timeline
     *
     * @return {number}
     *
     * @method
     * @memberof bridge.mediaSync#
     */
    exported.startTimelineMonitoring = function(id, timelineSelector, isMaster) {
        return hbbtv.native.request('MediaSynchroniser.startTimelineMonitoring', {
            id: id,
            timelineSelector: timelineSelector,
            isMaster: isMaster,
        }).result;
    };

    /**
     * @param {number} id
     * @param {number} timelineId
     *
     * @method
     * @memberof bridge.mediaSync#
     */
    exported.stopTimelineMonitoring = function(id, timelineSelector, forceStop) {
        hbbtv.native.request('MediaSynchroniser.stopTimelineMonitoring', {
            id: id,
            timelineSelector: timelineSelector,
            forceStop: forceStop,
        });
    };

    /**
     * @param {number} timelineSelector
     *
     * @method
     * @memberof bridge.mediaSync#
     */
    exported.getBroadcastCurrentTime = function(timelineSelector) {
        return hbbtv.native.request('MediaSynchroniser.getBroadcastCurrentTime', {
            timelineSelector: timelineSelector,
        }).result;
    };

    /**
     * @param {number} id
     * @param {string} contentIdOverride
     *
     * @method
     * @memberof bridge.mediaSync#
     */
    exported.setContentIdOverride = function(id, contentIdOverride) {
        hbbtv.native.request('MediaSynchroniser.setContentIdOverride', {
            id: id,
            contentIdOverride: contentIdOverride,
        });
    };

    /**
     * @param {number} id
     * @param {number} contentTime
     * @param {number} speed
     *
     * @method
     * @memberof bridge.mediaSync#
     */
    exported.setContentTimeAndSpeed = function(id, timelineSelector, contentTime, speed) {
        const re = new RegExp(/:temi:|:pts$/);
        if (!re.test(timelineSelector)) {
            hbbtv.native.request('MediaSynchroniser.setContentTimeAndSpeed', {
                id: id,
                timelineSelector: timelineSelector,
                contentTime: contentTime,
                speed: speed,
            });
        }
    };

    /**
     * @param {number} id
     * @param {Object} properties
     *
     * @method
     * @memberof bridge.mediaSync#
     */
    exported.updateCssCiiProperties = function(
        id,
        contentId,
        presentationStatus,
        contentIdStatus,
        mrsUrl
    ) {
        hbbtv.native.request('MediaSynchroniser.updateCssCiiProperties', {
            id: id,
            contentId: contentId,
            presentationStatus: presentationStatus,
            contentIdStatus: contentIdStatus,
            mrsUrl: mrsUrl,
        });
    };

    /**
     * @param {number} id
     * @param {Object} properties
     *
     * @method
     * @memberof bridge.mediaSync#
     */
    exported.setTimelineAvailability = function(id, timelineSelector, isAvailable, ticks, speed) {
        const re = new RegExp(/:temi:|:pts$/);
        if (!re.test(timelineSelector)) {
            return hbbtv.native.request('MediaSynchroniser.setTimelineAvailability', {
                id: id,
                timelineSelector: timelineSelector,
                isAvailable: isAvailable,
                ticks: ticks || 0,
                speed: speed || 0,
            }).result;
        }
        return false;
    };

    return exported;
})();

/**
 * ORB internal interface: system-agnostic bridge to native media switcher.
 *
 * @name bridge.mediaSwitcher
 * @class
 * @constructor
 */
hbbtv.bridge.mediaSwitcher = (function() {
    const exported = {};

    /**
     * Instantiate a new MediaSwitcher instance.
     *
     * @return {number} The ID of the new MediaSwitcher instance.
     *
     * @method
     * @memberof bridge.mediaSwitcher#
     */
    exported.instantiate = function() {
        return hbbtv.native.request('MediaSwitcher.instantiate').result;
    };

    /**
     * Destroy a MediaSwitcher instance.
     *
     * @param {number} id The ID of the MediaSwitcher instance.
     *
     * @method
     * @memberof bridge.mediaSwitcher#
     */
    exported.destroy = function(id) {
        hbbtv.native.request('MediaSwitcher.destroy', {
            id: id,
        });
    };

    /**
     * Request a media switch.
     *
     * @param {number} id The ID of the MediaSwitcher instance.
     * @param {Object} params The switch parameters.
     *
     * @return {boolean} True if the switch request was accepted.
     *
     * @method
     * @memberof bridge.mediaSwitcher#
     */
    exported.switchMediaPresentation = function(id, params) {
        return hbbtv.native.request('MediaSwitcher.switchMediaPresentation', {
            id: id,
            params: params,
        }).result;
    };

    /**
     * Start monitoring a timeline for a switch.
     *
     * @param {number} id The ID of the MediaSwitcher instance.
     * @param {string} timelineSelector The timeline selector.
     * @param {boolean} timelineSource True if timeline is from originalMediaObject.
     *
     * @return {boolean} True if monitoring started successfully.
     *
     * @method
     * @memberof bridge.mediaSwitcher#
     */
    exported.startTimelineMonitoring = function(id, timelineSelector, timelineSource) {
        return hbbtv.native.request('MediaSwitcher.startTimelineMonitoring', {
            id: id,
            timelineSelector: timelineSelector,
            timelineSource: timelineSource,
        }).result;
    };

    /**
     * Stop monitoring a timeline.
     *
     * @param {number} id The ID of the MediaSwitcher instance.
     * @param {string} timelineSelector The timeline selector.
     *
     * @method
     * @memberof bridge.mediaSwitcher#
     */
    exported.stopTimelineMonitoring = function(id, timelineSelector) {
        hbbtv.native.request('MediaSwitcher.stopTimelineMonitoring', {
            id: id,
            timelineSelector: timelineSelector,
        });
    };

    /**
     * Get the current time on a timeline.
     *
     * @param {string} timelineSelector The timeline selector.
     *
     * @return {number} The current time in seconds, or NaN if unavailable.
     *
     * @method
     * @memberof bridge.mediaSwitcher#
     */
    exported.getTimelineCurrentTime = function(timelineSelector) {
        return hbbtv.native.request('MediaSwitcher.getTimelineCurrentTime', {
            timelineSelector: timelineSelector,
        }).result;
    };

    return exported;
})();

hbbtv.bridge.csManager = (function() {
    const exported = {};

    /**
     *
     * @return {string}
     */
    exported.getApp2AppLocalBaseURL = function() {
        return hbbtv.native.request('CSManager.getApp2AppLocalBaseURL').result;
    };

    /**
     *
     * @return {string}
     */
    exported.getInterDevSyncURL = function() {
        return hbbtv.native.request('CSManager.getInterDevSyncURL').result;
    };

    /**
     *
     * @return {string}
     */
    exported.getApp2AppRemoteBaseURL = function() {
        return hbbtv.native.request('CSManager.getApp2AppRemoteBaseURL').result;
    };

    return exported;
})();

hbbtv.bridge.drm = (function() {
    const exported = {};

    exported.getSupportedDRMSystemIDs = function() {
        return hbbtv.native.request('Drm.getSupportedDRMSystemIDs').result;
    };

    exported.sendDRMMessage = function(msgID, msgType, msg, DRMSystemID, block) {
        return hbbtv.native.request('Drm.sendDRMMessage', {
            msgID: msgID,
            msgType: msgType,
            msg: msg,
            DRMSystemID: DRMSystemID,
            block: block ? true : false,
        });
    };

    exported.canPlayContent = function(DRMPrivateData, DRMSystemID) {
        return hbbtv.native.request('Drm.canPlayContent', {
            DRMPrivateData: DRMPrivateData,
            DRMSystemID: DRMSystemID,
        }).result;
    };

    exported.canRecordContent = function(DRMPrivateData, DRMSystemID) {
        return hbbtv.native.request('Drm.canRecordContent', {
            DRMPrivateData: DRMPrivateData,
            DRMSystemID: DRMSystemID,
        }).result;
    };

    exported.setActiveDRM = function(DRMSystemID) {
        return hbbtv.native.request('Drm.setActiveDRM', {
            DRMSystemID: DRMSystemID,
        }).result;
    };

    return exported;
})();

hbbtv.bridge.orbDebug = (function() {
    const exported = {};

    /**
     * Publish a test report (debug build only).
     *
     * @param {string} testSuite A unique test suite name.
     * @param {string} xml The XML test report.
     */
    exported.publishTestReport = function(testSuite, xml) {
        return hbbtv.native.request('OrbDebug.publishTestReport', {
            testSuite: testSuite,
            xml: xml,
        });
    };

    return exported;
})();
/**
 * @fileOverview Utiltiies for hole punching.
 * @license ORB Software. Copyright (c) 2022 Ocean Blue Software Limited
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

 hbbtv.holePuncher = (function() {
    let gRect = {
        x: 0,
        y: 0,
        width: 1280,
        height: 720,
        fullScreen: false,
    };

    let gObject = null;
    let gObjectInDocument = false;
    let gFullscreen = false;

    const gPunchHoleObserver = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.attributeName === 'style' || mutation.attributeName === 'class') {
                matchVideoRectangleToObject(mutation.target);
            }
        });
    });

    function observeObject(object) {
        gPunchHoleObserver.observe(object, {
            attributes: true,
            attributeFilter: ['style', 'class'],
        });
    }

    function unobserveObject(object) {
        gPunchHoleObserver.disconnect();
    }

    function setVideoRectangle(x, y, width, height, widescreen, fullScreen) {
        if (
            gRect.x == x &&
            gRect.y == y &&
            gRect.width == width &&
            gRect.height == height &&
            gRect.fullScreen == fullScreen
        ) {
            return;
        }
        gRect = {
            x,
            y,
            width,
            height,
            fullScreen,
        };

        const w = Math.min(width, (height / (widescreen ? 9 : 3)) * (widescreen ? 16 : 4));
        const h = Math.min(height, (width / (widescreen ? 16 : 4)) * (widescreen ? 9 : 3));
        x = x + (width - w) / 2;
        y = y + (height - h) / 2;

        if (fullScreen) {
            hbbtv.bridge.broadcast.setVideoRectangle(0, 0, 1280, 720);
        } else {
            hbbtv.bridge.broadcast.setVideoRectangle(
                Math.round(x),
                Math.round(y),
                Math.round(w),
                Math.round(h)
            );
        }
    }

    // WPE: an object that exists but is not really on screen must not cut a hole for the video / move the video plane: not sized 0,
    // not display:none / visibility:hidden, not invisible through an ancestor (opacity 0), not clipped away by an ancestor with overflow
    // hidden, not outside the page.
    function wpeVisibleRect(o) {
      var b = o.getBoundingClientRect();
      if (!(b.width > 1 && b.height > 1)) return null;
      var cs = getComputedStyle(o);
      if (cs.visibility === 'hidden' || cs.display === 'none') return null;
      var l = b.left, t = b.top, r = b.right, bt = b.bottom, opacity = parseFloat(cs.opacity), pos = cs.position;
      var clipping = pos !== 'absolute';
      if (pos === 'fixed') clipping = false;
      var e = o.parentElement, p, ps;
      while (e && e !== document.body && e !== document.documentElement) {
        ps = getComputedStyle(e);
        if (ps.display === 'none') return null;
        opacity *= parseFloat(ps.opacity);
        if (!clipping && ps.position !== 'static' && pos === 'absolute') clipping = true;
        if (clipping && (ps.overflowX !== 'visible' || ps.overflowY !== 'visible')) {
          p = e.getBoundingClientRect();
          if (p.width > 1 && p.height > 1) {
            l = Math.max(l, p.left); t = Math.max(t, p.top); r = Math.min(r, p.right); bt = Math.min(bt, p.bottom);
          }
        }
        e = e.parentElement;
      }
      if (opacity < 0.05) return null;
      l = Math.max(l, 0); t = Math.max(t, 0);
      r = Math.min(r, window.innerWidth || 1280); bt = Math.min(bt, window.innerHeight || 720);
      if (r - l <= 1 || bt - t <= 1) return null;
      return b;
    }

    function matchVideoRectangleToObject(object) {
        if (object.fullScreen) {
            object.style.position = 'absolute';
            object.style.left = '0px';
            object.style.top = '0px';
            object.style.width = '1280px';
            object.style.height = '720px';
            setVideoRectangle(0, 0, 1280, 720, false, true);
            gFullscreen = true;
            return;
        } else {
            // remove the fullscreen style
            if (gFullscreen === true) {
                object.style.removeProperty('position');
                object.style.removeProperty('left');
                object.style.removeProperty('top');
                object.style.removeProperty('width');
                object.style.removeProperty('height');
                gFullscreen = false;
            }
        }

        if (!(gObjectInDocument || object.offsetWidth || object.offsetHeight)) {
            hideVideoRectangle();
            return;
        }

        if (!wpeVisibleRect(object)) {
            hideVideoRectangle();
            return;
        }

        const bounds = object.getBoundingClientRect();
        const rect = {
            top: bounds.top,
            right: bounds.right,
            bottom: bounds.bottom,
            left: bounds.left,
        };
        const style = window.getComputedStyle(object);
        for (const side in rect) {
            rect[side] =
                rect[side] -
                (parseFloat(style.getPropertyValue('padding-' + side)) +
                    parseFloat(style.getPropertyValue('border-' + side + '-width')));
        }
        const width = rect.right - rect.left;
        const height = rect.bottom - rect.top;
        setVideoRectangle(rect.left, rect.top, width, height, object.widescreen, false);
    }

    function hideVideoRectangle() {
        setVideoRectangle(-1280, -720, 1280, 720, true, false);
    }

    function skipWindowPunch() {
        try {
            if (typeof androidBridge !== 'undefined' &&
                    androidBridge.skipBroadcastWindowPunch) {
                return !!androidBridge.skipBroadcastWindowPunch();
            }
        } catch (e) {}
        return !!window.__orbSkipWindowPunch;
    }

    function startPunchHole(object) {
        if (skipWindowPunch()) {
            // Type 1.1: DASH is in DvbIView. noshade punches the overlay window
            // to TvView (empty DTVKit green) and skips the sibling WebView.
            object.removeAttribute('noshade');
            object.style.background = 'transparent';
        } else {
            object.setAttribute('noshade', true);
        }
        if (hbbtv.native.name === 'rdk') {
            let video = hbbtv.objectManager.createRdkVideoElement();
            let source = document.createElement('source');
            video.setAttribute('style', 'transform: scale(1); width:100%; height:100%');
            video.setAttribute('id', 'vid_elem');
            source.setAttribute('src', '/var/www/html/LayoutTests/media/content/long-test.mp4');
            source.setAttribute('type', 'video/holepunch');
            source.setAttribute('id', 'src_elem');
            video.appendChild(source);
            // Workaround: Ensure parent object display is set to "block" to allow correct results for getBoundingClientRect()
            // as default is "inline"
            object.style.display="block";
            object.appendChild(video);

            // remove any absolute positioning - as this offsets the image by -320 px
            object.style.removeProperty('position');
        }
        if (object.parentNode) {
            observeObject(object);
            gObjectInDocument = true;
        } else {
            gObjectInDocument = false;
        }
        matchVideoRectangleToObject(object);
    }

    function stopPunchHole(object) {
        object.removeAttribute('noshade');
        if (hbbtv.native.name === 'rdk') {
            let video = document.getElementById('vid_elem');
            let source = document.getElementById('src_elem');
            video.removeChild(source);
            object.removeChild(video);
        }
        unobserveObject(object);
        setVideoRectangle(0, 0, 1280, 720, true, false);
    }

    function setBroadcastVideoObject(object) {
        const oldObject = hbbtv.utils.weakDeref(gObject);
        if (object != null) {
            if (oldObject != null) {
                if (oldObject == object) {
                    return;
                }
                stopPunchHole(oldObject);
            }
            gObject = hbbtv.utils.weakRef(object);
            startPunchHole(object);
        } else {
            if (oldObject != null) {
                stopPunchHole(oldObject);
            }
            gObject = null;
        }
    }

    function notifyFullScreenChanged(object) {
        const activeObject = hbbtv.utils.weakDeref(gObject);
        if (object != null && object == activeObject) {
            matchVideoRectangleToObject(activeObject);
        }
    }

    function notifyObjectAddedToDocument(objectAdded) {
        if (!objectAdded.hasAttribute('noshade')) {
            return;
        }
        const object = hbbtv.utils.weakDeref(gObject);
        if (object == objectAdded) {
            observeObject(object);
            gObjectInDocument = true;
            matchVideoRectangleToObject(object);
        }
    }

    function notifyObjectRemovedFromDocument(objectRemoved) {
        if (!objectRemoved.hasAttribute('noshade')) {
            return;
        }
        const object = hbbtv.utils.weakDeref(gObject);
        if (object == objectRemoved) {
            unobserveObject(object);
            gObjectInDocument = false;
            matchVideoRectangleToObject(object);
        }
    }

    return {
        setBroadcastVideoObject: setBroadcastVideoObject,
        notifyFullScreenChanged: notifyFullScreenChanged,
        notifyObjectAddedToDocument: notifyObjectAddedToDocument,
        notifyObjectRemovedFromDocument: notifyObjectRemovedFromDocument,
    };
})();
/**
 * @fileOverview Monitors the document and certain JavaScript mechanisms for objects. Builds or
 * upgrades those objects if there is a registered handler.
 * @license ORB Software. Copyright (c) 2022 Ocean Blue Software Limited
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

hbbtv.objects = {};

hbbtv.objectManager = (function() {
    const __createElement = document.createElement;
    const __getElementById = document.getElementById;

    let objectMimeTypeTable = [];
    let objectFactoryMethodTable = [];
    let objectUpgradeHandlers = [];

    function initialise() {
        // Override getElementById while app is loading to upgrade HbbTV objects before they are used.
        // This is a WORKAROUND for apps that incorrectly use 'getElementById' before 'window.onload'.
        document.getElementById = getElementByIdOverride;

        addMetaViewportElement();
        addOipfObjectFactory();
        addHTMLManipulationIntercept(function(manipulatedElement) {
            upgradeDescendantObjects(manipulatedElement);
        });
        addCreateElementTypeIntercept(function(object, type) {
            upgradeObject(object, type);
        });
        addMutationIntercept(
            function(addedObject) {
                hbbtv.holePuncher.notifyObjectAddedToDocument(addedObject);
                upgradeObject(addedObject, addedObject.getAttribute('type'));
            },
            function(removedObject) {
                hbbtv.holePuncher.notifyObjectRemovedFromDocument(removedObject);
            }
        );
        upgradeDescendantObjects(document);
        document.addEventListener('DOMContentLoaded', function() {
            if (document.getElementById === getElementByIdOverride) {
                document.getElementById = __getElementById;
            }
            upgradeDescendantObjects(document);
        });
    }

    function registerObject(options) {
        //console.debug("Register object " + options.name + " with mime types " + options.mimeTypes);
        for (const mimeType of options.mimeTypes) {
            objectMimeTypeTable[mimeType] = options.name;
        }
        if (options.oipfObjectFactoryMethodName.length > 0) {
            objectFactoryMethodTable[options.oipfObjectFactoryMethodName] = options.name;
        }
        objectUpgradeHandlers[options.name] = options.upgradeObject;
    }

    function resolveMimeType(mimeType) {
        if (mimeType in objectMimeTypeTable) {
            return objectMimeTypeTable[mimeType];
        }
        console.debug('Could not resolve mime type ' + mimeType);
        return undefined;
    }

    function upgradeDescendantObjects(target) {
        for (const object of target.getElementsByTagName('object')) {
            if (object.hasAttribute('type')) {
                upgradeObject(object, object.getAttribute('type'));
            }
        }
    }

    function upgradeObject(object, mimeType) {
        if (!mimeType) {
            return;
        }
        mimeType = mimeType.toLowerCase();
        if (object.hasAttribute('__mimeType') && object.getAttribute('__mimeType') === mimeType) {
            // Already done
            return;
        }
        const objectName = resolveMimeType(mimeType);
        if (objectName !== undefined) {
            let mimeTypeChanged = false;
            if (object.hasAttribute('__objectType')) {
                if (object.getAttribute('__objectType') !== objectName) {
                    // Ignore changes to the object type (but not the MIME type) [OIPF 5 4.4.4]
                    return;
                }
                mimeTypeChanged = true;
            }
            object.setAttribute('__mimeType', mimeType);
            object.setAttribute('__objectType', objectName);
            if (mimeTypeChanged) {
                // TODO
            } else {
                objectUpgradeHandlers[objectName](object);
            }
        }
    }

    // Mutation observer
    function addMutationIntercept(callbackObjectAdded, callbackObjectRemoved) {
        const observer = new MutationObserver(function(mutationsList) {
            for (const mutation of mutationsList) {
                if (mutation.type === 'childList') {
                    for (const node of mutation.addedNodes) {
                        if (node.nodeName && node.nodeName.toLowerCase() === 'object') {
                            callbackObjectAdded(node);
                        }
                    }
                    for (const node of mutation.removedNodes) {
                        if (node.nodeName && node.nodeName.toLowerCase() === 'object') {
                            callbackObjectRemoved(node);
                        }
                    }
                }
            }
        });
        const config = {
            childList: true,
            subtree: true,
        };
        observer.observe(document.documentElement || document.body, config);
    }

    // Override createElement install a proxy to monitor and intercept objects. Needed for the
    // case where a page script creates and uses an object before adding it to the document.
    function addCreateElementTypeIntercept(callbackTypeSet) {
        const ownProperty = Object.getOwnPropertyDescriptor(HTMLObjectElement.prototype, 'type');
        Object.defineProperty(HTMLObjectElement.prototype, 'type', {
            set(val) {
                this.setAttribute('type', val);
            },
            get() {
                return ownProperty.get.call(this);
            },
        });

        HTMLObjectElement.prototype.setAttribute = function(name, value) {
            if (name === 'type') {
                callbackTypeSet(this, value);
            }
            Element.prototype.setAttribute.apply(this, arguments);
        };

        document.createElement = function(tagname, options) {
            let element = __createElement.apply(document, arguments);
            return element;
        };
    }

    // The native innerHTML/outerHTML/insertAdjacentHTML throw SyntaxError ("The string did not match the expected pattern") for markup that
    // is not well-formed XML when the document is parsed as XHTML (HbbTV pages often are), which an HTML parser would accept. Parse such
    // markup as HTML and insert the nodes by hand, instead of letting the exception stop the application.
    function markupNodes(html) {
        const doc = new DOMParser().parseFromString('<!DOCTYPE html><html><body>' + html + '</body></html>', 'text/html');
        return Array.from(doc.body.childNodes).map((node) => document.importNode(node, true));
    }

    function setMarkup(element, name, ownProperty, val) {
        try {
            ownProperty.set.call(element, val);
        } catch (e) {
            if (e.name !== 'SyntaxError') {
                throw e;
            }
            const nodes = markupNodes(String(val));
            if (name === 'innerHTML') {
                while (element.firstChild) {
                    element.removeChild(element.firstChild);
                }
                nodes.forEach((node) => element.appendChild(node));
            } else if (element.parentNode) {
                nodes.forEach((node) => element.parentNode.insertBefore(node, element));
                element.parentNode.removeChild(element);
            }
        }
    }

    function insertMarkup(element, position, text) {
        try {
            return Element.prototype.insertAdjacentHTML.call(element, position, text);
        } catch (e) {
            if (e.name !== 'SyntaxError') {
                throw e;
            }
            const nodes = markupNodes(String(text));
            const parent = element.parentNode;
            switch (String(position).toLowerCase()) {
                case 'beforebegin':
                    if (parent) {
                        nodes.forEach((node) => parent.insertBefore(node, element));
                    }
                    break;
                case 'afterbegin': {
                    const first = element.firstChild;
                    nodes.forEach((node) => element.insertBefore(node, first));
                    break;
                }
                case 'beforeend':
                    nodes.forEach((node) => element.appendChild(node));
                    break;
                case 'afterend':
                    if (parent) {
                        const next = element.nextSibling;
                        nodes.forEach((node) => parent.insertBefore(node, next));
                    }
                    break;
                default:
                    throw e;
            }
        }
    }

    // Intercept direct HTML manipulation. Needed for the (possibly esoteric) case where a page
    // script directly modifies the HTML to create an object and immediately uses it (i.e. before
    // the event loop processes mutation events).
    function addHTMLManipulationIntercept(interceptCallback) {
        Object.defineProperty(HTMLElement.prototype, 'innerHTML', {
            set: function(val) {
                const ownProperty = Object.getOwnPropertyDescriptor(Element.prototype, 'innerHTML');
                setMarkup(this, 'innerHTML', ownProperty, val);
                interceptCallback(this);
            },
            get: function() {
                const ownProperty = Object.getOwnPropertyDescriptor(Element.prototype, 'innerHTML');
                return ownProperty.get.call(this);
            },
        });
        Object.defineProperty(HTMLElement.prototype, 'outerHTML', {
            set: function(val) {
                const parent = this.parentElement;
                const ownProperty = Object.getOwnPropertyDescriptor(Element.prototype, 'outerHTML');
                setMarkup(this, 'outerHTML', ownProperty, val);
                interceptCallback(parent);
            },
            get: function() {
                const ownProperty = Object.getOwnPropertyDescriptor(Element.prototype, 'outerHTML');
                return ownProperty.get.call(this);
            },
        });
        HTMLElement.prototype.insertAdjacentHTML = function(position, text) {
            const result = insertMarkup(this, position, text);
            interceptCallback(this.parentElement);
            return result;
        };
    }

    function addOipfObjectFactory() {
        if (window.oipfObjectFactory !== undefined) {
            console.error('Cannot redefine oipfObjectFactory!');
            return;
        }

        window.oipfObjectFactory = {
            isObjectSupported: function(objectType) {
                return resolveMimeType(objectType.toLowerCase()) !== undefined;
            },
        };

        for (let objectFactoryMethod in objectFactoryMethodTable) {
            console.log(objectFactoryMethod);
            const objectName = objectFactoryMethodTable[objectFactoryMethod];
            window.oipfObjectFactory[objectFactoryMethod] = function() {
                const object = __createElement.call(document, 'object');
                object.setAttribute('type', objectName);
                objectUpgradeHandlers[objectName](object);
                return object;
            };
        }
    }

    function createRdkVideoElement() {
        console.log('[RDK] Creating video element for holepunch');
        const video = __createElement.call(document, 'video');
        video._rdkHolepunch = true;
        return video;
    }

    function addMetaViewportElement() {
        if (!document.querySelector('meta[name=viewport]')) {
            let meta = document.createElement('meta');
            meta.name = 'viewport';
            meta.content = 'width=device-width, initial-scale=1.0';
            document.getElementsByTagName('head')[0] ?.appendChild(meta);
        }
    }

    function getElementByIdOverride(id) {
        const element = __getElementById.call(document, id);
        if (element) {
            const objectType = element.getAttribute('type');
            if (objectType) {
                upgradeObject(element, objectType);
            }
        }
        return element;
    }

    return {
        initialise: initialise,
        registerObject: registerObject,
        createRdkVideoElement: createRdkVideoElement,
    };
})();
/**
 * @fileOverview DRM Manager.
 * @license ORB Software. Copyright (c) 2023 Ocean Blue Software Limited
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

hbbtv.drmManager = (function() {
    const privates = new WeakMap();

    const Result = Object.freeze({
        STATUS_READY: 0,
        STATUS_UNKNOWN: 1,
        STATUS_INITIALISING: 2,
        STATUS_ERROR: 3,

        MSG_SUCCESSFUL: 0,
        MSG_UNKNOWN_ERROR: 1,
        MSG_CANNOT_PROCESS_REQUEST: 2,
        MSG_UNKNOWN_MIME_TYPE: 3,
        MSG_USER_CONSENT_NEEDED: 4,
        MSG_UNKNOWN_DRM_SYSTEM: 5,
        MSG_WRONG_FORMAT: 6,
    });
    const DRM_SYSTEM_CIPLUS = 'CIPLUS';
    const CIPLUS_MSG_TYPE_SAS_CONNECT_REQUEST = 'SAS_connect_rqst';
    const CIPLUS_MSG_TYPE_SAS_ASYNC_MSG = 'SAS_async_msg';
    const CIPLUS_MSG_TYPE_SAS_CONNECT_REQUEST_TIMEOUT = 5000;
    const OIPF_APPLICATION_ID_v2_2 = '0108113101190000';
    const OIPF_APPLICATION_ID_v2_3 = '0108113101190001';
    const CIPLUS_OIPF_APPLICATION_IDS = [OIPF_APPLICATION_ID_v2_2, OIPF_APPLICATION_ID_v2_3];

    const CIPLUS_MIME_TYPE = 'application/vnd.oipf.cspg-hexbinary';
    const DrmMimeTypes = Object.freeze([
        'application/vnd.marlin.drm.actiontoken+xml',
        'application/vnd.oipf.mippvcontrolmessage+xml',
        CIPLUS_MIME_TYPE,
        'application/vnd.marlin.drm.actiontoken2+xml',
    ]);

    let gMsgIdCounter = 0;
    let gCiplusTransactionId = 0;

    // Internal listeners
    function addBridgeEventListeners() {
        const p = privates.get(this);

        p.onDRMSystemStatusChange = (event) => {
            console.log('Received onDRMSystemStatusChange ' + JSON.stringify(event));
            const p = privates.get(this);
            const prevCSPGCIPlusDiscovered = p.CSPGCIPlusDiscovered;
            console.log('prevCSPGCIPlusDiscovered=', prevCSPGCIPlusDiscovered);
            /* Contains DRMSystemIDs to notify with p.oipfDrmAgent.dispatchDRMSystemStatusChange */
            let DRMSystemStatusChanges;
            if (p.drmSystemMap.has(event.DRMSystem)) {
                const prevStatus = p.drmSystemMap.get(event.DRMSystem);
                if (event.status === Result.STATUS_UNKNOWN) {
                    /* Delete from maps, and signal events */
                    DRMSystemStatusChanges = prevStatus.DRMSystemIDs;
                    for (const DRMSystemID of prevStatus.DRMSystemIDs) {
                        p.drmSystemIdStatusMap.delete(event.DRMSystemID);
                    }
                    p.drmSystemMap.delete(event.DRMSystem);
                    if (event.DRMSystem === DRM_SYSTEM_CIPLUS) {
                        p.CSPGCIPlusDiscovered = false;
                    }
                    /* TODO: Delete messages from common queue */
                } else {
                    DRMSystemStatusChanges = prevStatus.DRMSystemIDs.filter(
                        (x) => !event.DRMSystemIDs.includes(x)
                    ).concat(
                        event.DRMSystemIDs.filter((x) => !prevStatus.DRMSystemIDs.includes(x))
                    );

                    /* Update status, and keep internal stuff */
                    const prevStatusStatus = prevStatus.status;
                    prevStatus.DRMSystemIDs = event.DRMSystemIDs;
                    prevStatus.status = event.status;
                    prevStatus.protectionGateways = event.protectionGateways;
                    prevStatus.supportedFormats = event.supportedFormats;
                    if (event.DRMSystem === DRM_SYSTEM_CIPLUS) {
                        p.CSPGCIPlusDiscovered =
                            event.status === Result.STATUS_READY &&
                            event.protectionGateways !== undefined &&
                            event.protectionGateways.includes('ci+');
                        if (
                            event.status === Result.STATUS_READY &&
                            event.status !== prevStatusStatus &&
                            event.protectionGateways === undefined
                        ) {
                            console.log('Initiating SAS_connect_rqst() #1');
                            tryNextAppId(p, null, prevStatus);
                        }
                    }
                }
            } else if (event.status !== Result.STATUS_UNKNOWN) {
                DRMSystemStatusChanges = event.DRMSystemIDs;
                const status = {
                    DRMSystem: event.DRMSystem,
                    DRMSystemIDs: event.DRMSystemIDs,
                    status: event.status,
                    protectionGateways: event.protectionGateways,
                    supportedFormats: event.supportedFormats,
                };
                p.drmSystemMap.set(event.DRMSystem, status);
                for (const DRMSystemID of event.DRMSystemIDs) {
                    p.drmSystemIdStatusMap.set(DRMSystemID, status);
                }
                if (event.DRMSystem === DRM_SYSTEM_CIPLUS) {
                    status.ciplusMessages = new defaultEntities.Map();
                    p.CSPGCIPlusDiscovered =
                        event.status === Result.STATUS_READY &&
                        event.protectionGateways !== undefined &&
                        event.protectionGateways.includes('ci+');
                    if (
                        event.status === Result.STATUS_READY &&
                        event.protectionGateways === undefined
                    ) {
                        console.log('Initiating SAS_connect_rqst() #2');
                        tryNextAppId(p, null, status);
                    }
                }
            }
            if (prevCSPGCIPlusDiscovered != p.CSPGCIPlusDiscovered) {
                if (p.oipfGatewayInfo) {
                    console.log(
                        'Has oipfGatewayInfo, prevCSPGCIPlusDiscovered=' +
                        prevCSPGCIPlusDiscovered +
                        ' p.CSPGCIPlusDiscovered=' +
                        p.CSPGCIPlusDiscovered
                    );
                    p.oipfGatewayInfo.dispatchDiscoverCSPGCIPlusEvent.call(p.oipfGatewayInfo.obj);
                }
            }
            console.log('DRMSystemStatusChanges=' + DRMSystemStatusChanges);
            if (p.oipfDrmAgent && DRMSystemStatusChanges) {
                for (const DRMSystemID of DRMSystemStatusChanges) {
                    p.oipfDrmAgent.dispatchDRMSystemStatusChange.call(
                        p.oipfDrmAgent.obj,
                        DRMSystemID
                    );
                }
            }
        };
        hbbtv.bridge.addWeakEventListener('DRMSystemStatusChange', p.onDRMSystemStatusChange);

        p.onDRMMessageResult = (event) => {
            console.log('Received onDRMMessageResult ' + JSON.stringify(event));
            const p = privates.get(this);
            let raise = false;

            if (p.drmMessages.has(event.msgID)) {
                /* Message in the common queue */
                const msg = p.drmMessages.get(event.msgID);
                if (msg.timeout) {
                    clearTimeout(msg.timeout);
                    msg.timeout = null;
                }
                p.drmMessages.delete(event.msgID);
                if (p.drmSystemIdStatusMap.has(msg.DRMSystemID)) {
                    const status = p.drmSystemIdStatusMap.get(msg.DRMSystemID);
                    if (status.DRMSystem === DRM_SYSTEM_CIPLUS) {
                        /* If CI+, demux between normal messages and SAS_connect_rqst */
                        if (msg.msgType === CIPLUS_MSG_TYPE_SAS_CONNECT_REQUEST) {
                            console.log(
                                'Received SAS_connect_cnf status=' + JSON.stringify(event.resultMsg)
                            );
                            console.log(JSON.stringify(status));
                            if (event.resultMsg === '0') {
                                status.oipfAppId = msg.msg;
                                p.CSPGCIPlusDiscovered = true;
                                if (p.oipfGatewayInfo) {
                                    p.oipfGatewayInfo.dispatchDiscoverCSPGCIPlusEvent.call(
                                        p.oipfGatewayInfo.obj
                                    );
                                }
                            } else {
                                console.log(
                                    'SAS_connect_rqst for ' +
                                    msg.msg +
                                    ' failed status=' +
                                    event.resultMsg
                                );
                                tryNextAppId(p, msg.msg, status);
                            }
                        } else {
                            console.error(DRM_SYSTEM_CIPLUS + ' unhandled onDRMMessageResult');
                        }
                    } else {
                        /* Non-CI+ DRM system (e.g. PlayReady, Widevine): deliver the
                           terminal's response (the licence, or an error code) to the
                           application against the msgId returned by sendDRMMessage. */
                        if (p.oipfDrmAgent) {
                            p.oipfDrmAgent.dispatchDRMMessageResult.call(
                                p.oipfDrmAgent.obj,
                                msg.msgId2 || msg.msgId,
                                event.resultMsg,
                                event.resultCode !== undefined ?
                                event.resultCode :
                                Result.MSG_SUCCESSFUL
                            );
                        }
                    }
                } else {
                    console.error('DRMSystemID ' + msg.DRMSystemID + ' not found');
                }
            } else {
                /* Custom DRM system message */
                console.error('msgId ' + event.msgID + ' not found');
                if (event.msgID === DRM_SYSTEM_CIPLUS) {
                    console.error('CI+ specific message!');
                    handleCiPlusMessage(p, event);
                }
            }

            if (p.oipfDrmAgent && raise) {
                p.oipfDrmAgent.dispatchDRMMessageResult.call(
                    p.oipfDrmAgent.obj,
                    event.msgID,
                    event.resultMsg,
                    event.resultCode
                );
            }
        };
        hbbtv.bridge.addWeakEventListener('DRMMessageResult', p.onDRMMessageResult);

        p.onDRMSystemMessage = (event) => {
            console.log('Received onDRMSystemMessage ' + JSON.stringify(event));

            const p = privates.get(this);
            if (p.oipfDrmAgent && p.drmSystemIdStatusMap.has(event.DRMSystemID)) {
                /* Forward an unsolicited DRM system message (e.g. a PlayReady
                   individualisation/renewal request from the terminal) to the
                   application listening on the oipfDrmAgent object. */
                p.oipfDrmAgent.dispatchDRMSystemMessage.call(
                    p.oipfDrmAgent.obj,
                    event.msg,
                    event.DRMSystemID
                );
            }
        };
        hbbtv.bridge.addWeakEventListener('DRMSystemMessage', p.onDRMSystemMessage);

        p.onDRMRightsError = (event) => {
            console.log('Received DRMRightsError ' + JSON.stringify(event));
            p.videoBroadcast.dispatchDRMRightsError.call(
                p.videoBroadcast.obj,
                event.errorState,
                event.contentID,
                event.DRMSystemID,
                event.rightsIssuerURL
            );
        };
        hbbtv.bridge.addWeakEventListener('DRMRightsError', p.onDRMRightsError);
    }

    function initialise() {
        privates.set(this, {});
        const p = privates.get(this);

        p.CSPGCIPlusDiscovered = false;

        /* Associates msgId with Message data */
        p.drmMessages = new defaultEntities.Map();
        /* Associates DRMSystem with status */
        p.drmSystemMap = new defaultEntities.Map();
        /* Associates DRMSystemID with status */
        p.drmSystemIdStatusMap = new defaultEntities.Map();
        const sysIds = hbbtv.bridge.drm.getSupportedDRMSystemIDs();
        if (sysIds.length != 0) {
            console.log('Current DRM System IDs:');
            console.log(JSON.stringify(sysIds));
            for (const status of sysIds) {
                if (status.DRMSystem === DRM_SYSTEM_CIPLUS) {
                    /* Associates transaction_id with Message data */
                    status.ciplusMessages = new defaultEntities.Map();
                    p.drmSystemMap.set(status.DRMSystem, status);
                    for (const DRMSystemID of status.DRMSystemIDs) {
                        console.log('Associating ' + DRMSystemID + ' to ' + status.DRMSystem);
                        p.drmSystemIdStatusMap.set(DRMSystemID, status);
                    }
                    if (status.protectionGateways !== undefined) {
                        if (status.protectionGateways.includes('ci+')) {
                            console.log('SAS_connect_rqst() SUCCESSFUL');
                            p.CSPGCIPlusDiscovered = true;
                        } else {
                            console.log('SAS_connect_rqst() FAILED');
                        }
                    } else {
                        console.log("SAS_connect_rqst() hasn't been tried");
                        tryNextAppId(p, null, status);
                    }
                } else {
                    /* Non-CI+ DRM system (e.g. PlayReady, Widevine): track it so that
                       oipfDrmAgent messaging (sendDRMMessage) and status queries
                       (DRMSystemStatus) work for it. Unlike CI+ these systems need no
                       SAS handshake, so we just record their status here. */
                    p.drmSystemMap.set(status.DRMSystem, status);
                    for (const DRMSystemID of status.DRMSystemIDs) {
                        console.log('Associating ' + DRMSystemID + ' to ' + status.DRMSystem);
                        p.drmSystemIdStatusMap.set(DRMSystemID, status);
                    }
                }
            }
        }
        addBridgeEventListeners.call(this);
    }

    function registerOipfGatewayInfo(obj, dispatchDiscoverCSPGCIPlusEvent) {
        privates.get(this).oipfGatewayInfo = {
            obj: obj,
            dispatchDiscoverCSPGCIPlusEvent: dispatchDiscoverCSPGCIPlusEvent,
        };
    }

    function registerOipfDrmAgent(
        obj,
        dispatchDRMSystemStatusChange,
        dispatchDRMMessageResult,
        dispatchDRMSystemMessage
    ) {
        privates.get(this).oipfDrmAgent = {
            obj: obj,
            dispatchDRMSystemStatusChange: dispatchDRMSystemStatusChange,
            dispatchDRMMessageResult: dispatchDRMMessageResult,
            dispatchDRMSystemMessage: dispatchDRMSystemMessage,
        };
    }

    function registerVideoBroadcast(
        obj,
        dispatchParentalRatingChange,
        dispatchParentalRatingError,
        dispatchDRMRightsError
    ) {
        privates.get(this).videoBroadcast = {
            obj: obj,
            dispatchParentalRatingChange: dispatchParentalRatingChange,
            dispatchParentalRatingError: dispatchParentalRatingError,
            dispatchDRMRightsError: dispatchDRMRightsError,
        };
    }

    function isCSPGCIPlusDiscovered() {
        return privates.get(this).CSPGCIPlusDiscovered;
    }

    function getCSPGCIPlusStatus() {
        const p = privates.get(this);
        if (p.drmSystemMap.has(DRM_SYSTEM_CIPLUS)) {
            return p.drmSystemMap.get(DRM_SYSTEM_CIPLUS);
        }
        return null;
    }

    /**
     * Returns every DRM system reported by the terminal (e.g. PlayReady, Widevine, CI+), not just
     * CI+. Used for capability advertising (oipfCapabilities <drm> elements). The internal
     * drmSystemMap only tracks CI+ (it drives the CI+ SAS handshake), so query the bridge directly.
     *
     * @returns {Array} Array of DRM system status objects, or an empty array.
     */
    function getSupportedDRMSystems() {
        try {
            return hbbtv.bridge.drm.getSupportedDRMSystemIDs() || [];
        } catch (e) {
            console.warn('drmManager.getSupportedDRMSystems failed: ' + e);
            return [];
        }
    }

    function sendDRMMessage(msgType, msg, DRMSystemID) {
        const p = privates.get(this);
        gMsgIdCounter++;
        const msgId = gMsgIdCounter.toString();
        console.log('sendDRMMessage msgId=' + msgId + ' type=' + msgType);
        let result = null;
        if (!p.drmSystemIdStatusMap.has(DRMSystemID)) {
            result = Result.MSG_UNKNOWN_DRM_SYSTEM;
        } else {
            const status = p.drmSystemIdStatusMap.get(DRMSystemID);
            if (status.DRMSystem === DRM_SYSTEM_CIPLUS) {
                if (msgType === CIPLUS_MIME_TYPE) {
                    const base64Data = serializeCiplusMessage(DRMSystemID, 0x01, 0x01, msg);
                    commonSendDRMMessage(
                        status.ciplusMessages,
                        'ci+' + gCiplusTransactionId,
                        msgId,
                        CIPLUS_MSG_TYPE_SAS_ASYNC_MSG,
                        base64Data,
                        DRMSystemID
                    );
                } else {
                    result = Result.MSG_UNKNOWN_MIME_TYPE;
                }
            } else {
                /* Non-CI+ DRM system (e.g. PlayReady, Widevine): per DAE 7.6.1 the
                   message type is "defined by the DRM system", so forward the message -
                   typically a licence challenge - to the terminal DRM stack unchanged
                   (rather than restricting it to the CI+/Marlin MIME types) and route the
                   terminal's asynchronous response back to the application via the
                   DRMMessageResult event (handled in onDRMMessageResult). */
                if (!DrmMimeTypes.includes(msgType)) {
                    console.log('sendDRMMessage: forwarding DRM-system-defined msgType ' + msgType);
                }
                p.drmMessages.set(msgId, {
                    msgId: msgId,
                    msgId2: msgId,
                    msgType: msgType,
                    msg: msg,
                    DRMSystemID: DRMSystemID,
                });
                hbbtv.bridge.drm.sendDRMMessage(msgId, msgType, msg, DRMSystemID, false);
            }
        }
        if (result) {
            Promise.resolve().then(() =>
                p.oipfDrmAgent.dispatchDRMMessageResult.call(
                    p.oipfDrmAgent.obj,
                    msgId,
                    null,
                    result
                )
            );
        }
        return msgId;
    }

    function canPlayContent(DRMPrivateData, DRMSystemID) {
        const p = privates.get(this);
        if (p.drmSystemIdStatusMap.has(DRMSystemID)) {
            const status = p.drmSystemIdStatusMap.get(DRMSystemID);
            if (status.DRMSystem === DRM_SYSTEM_CIPLUS) {
                console.log('CI+ oipfAppId=' + status.oipfAppId);
                if (status.oipfAppId === OIPF_APPLICATION_ID_v2_3) {
                    const base64Data = serializeCiplusMessage(
                        DRMSystemID,
                        0x06,
                        0x09,
                        DRMPrivateData
                    );
                    const response = hbbtv.bridge.drm.sendDRMMessage(
                        'ci+' + gCiplusTransactionId,
                        CIPLUS_MSG_TYPE_SAS_ASYNC_MSG,
                        base64Data,
                        DRMSystemID,
                        true
                    );
                    console.log('Response is ' + JSON.stringify(response));
                    return handleCiPlusMessage(response);
                }
            } else {
                /* Non-CI+ DRM system (e.g. PlayReady, Widevine): let the terminal
                   decide whether the protected content can be played. */
                return hbbtv.bridge.drm.canPlayContent(DRMPrivateData, DRMSystemID);
            }
        }
        return false;
    }

    function canRecordContent(DRMPrivateData, DRMSystemID) {
        const p = privates.get(this);
        if (p.drmSystemIdStatusMap.has(DRMSystemID)) {
            const status = p.drmSystemIdStatusMap.get(DRMSystemID);
            if (status.DRMSystem === DRM_SYSTEM_CIPLUS) {
                console.log('CI+ oipfAppId=' + status.oipfAppId);
                if (status.oipfAppId === OIPF_APPLICATION_ID_v2_3) {
                    const base64Data = serializeCiplusMessage(
                        DRMSystemID,
                        0x08,
                        0x09,
                        DRMPrivateData
                    );
                    const response = hbbtv.bridge.drm.sendDRMMessage(
                        'ci+' + gCiplusTransactionId,
                        CIPLUS_MSG_TYPE_SAS_ASYNC_MSG,
                        base64Data,
                        DRMSystemID,
                        true
                    );
                    console.log('Response is ' + JSON.stringify(response));
                    return handleCiPlusMessage(response);
                }
            } else {
                console.warn('Unhandled DRMSystemID ' + DRMSystemID);
            }
        }
        return false;
    }

    function getDRMSystemStatus(DRMSystemID) {
        const p = privates.get(this);
        if (p.drmSystemIdStatusMap.has(DRMSystemID)) {
            return p.drmSystemIdStatusMap.get(DRMSystemID).status;
        }
        return Result.STATUS_UNKNOWN;
    }

    function setActiveDRM() {
        /* Note: Not sure this needs to go into the bridge */
        return hbbtv.bridge.drm.setActiveDRM(DRMSystemID);
    }

    /* msgId2 is used to know the real msgId corresponding to an internal DRM system msgId */
    function commonSendDRMMessage(queue, msgId, msgId2, msgType, msg, DRMSystemID) {
        const queue_msg = {
            msgId: msgId,
            msgId2: msgId2,
            msgType: msgType,
            msg: msg,
            DRMSystemID: DRMSystemID,
        };
        queue.set(msgId, queue_msg);

        hbbtv.bridge.drm.sendDRMMessage(msgId, msgType, msg, DRMSystemID, false);
        return queue_msg;
    }

    function tryNextAppId(p, msg, status) {
        /* Check lower ID if possible */
        let index =
            msg === null ?
            CIPLUS_OIPF_APPLICATION_IDS.length :
            CIPLUS_OIPF_APPLICATION_IDS.indexOf(msg);
        if (index != -1 && index > 0) {
            index--;
            gMsgIdCounter++;
            /* Try next private_host_application_ID */
            console.log(
                'SAS_connect_rqst(id=' +
                gMsgIdCounter.toString() +
                ') for ' +
                CIPLUS_OIPF_APPLICATION_IDS[index]
            );
            const msg = commonSendDRMMessage(
                p.drmMessages,
                gMsgIdCounter.toString(),
                null,
                CIPLUS_MSG_TYPE_SAS_CONNECT_REQUEST,
                CIPLUS_OIPF_APPLICATION_IDS[index],
                status.DRMSystemIDs[0]
            );
            msg.timeout = setTimeout(
                function() {
                    p.drmMessages.delete(msg.msgId);
                    if (p.drmSystemIdStatusMap.has(msg.DRMSystemID)) {
                        /* DRM System hasn't been removed */
                        tryNextAppId(p, msg.msg, status);
                    }
                },
                CIPLUS_MSG_TYPE_SAS_CONNECT_REQUEST_TIMEOUT,
                msg,
                p,
                status
            );
        } else {
            console.log('No more AppIds for SAS_connect_rqst');
        }
    }

    function extractDataTypes(decodedData) {
        const send_datatype_nbr = decodedData.charCodeAt(7);
        let index = 8;
        console.log('send_datatype_nbr=0x' + send_datatype_nbr.toString(16));
        let dataTypes = new defaultEntities.Map();
        for (let i = 0; i < send_datatype_nbr; i++) {
            const datatype_id = decodedData.charCodeAt(index);
            console.log('datatype_id=0x' + datatype_id.toString(16));
            const datatype_length =
                (decodedData.charCodeAt(index + 1) << 8) + decodedData.charCodeAt(index + 2);
            console.log('datatype_length=' + datatype_length);
            index += 3;

            let datatype = null;
            switch (datatype_id) {
                case 0x01:
                    console.log('oipf_ca_vendor_specific_information');
                    datatype = '';
                    for (let x = 0; x < datatype_length; x++) {
                        datatype += ('0' + decodedData.charCodeAt(x + index).toString(16)).slice(
                            -2
                        );
                    }
                    break;
                case 0x02:
                    console.log('oipf_country_code');
                    datatype = [decodedData.charCodeAt(index), decodedData.charCodeAt(index + 1)];
                    break;
                case 0x03:
                    console.log('oipf_parental_control_url');
                    if (datatype_length != 0) {
                        datatype = decodedData.substring(index, index + datatype_length);
                    }
                    break;
                case 0x04:
                    console.log('oipf_rating_type');
                    datatype = decodedData.charCodeAt(index);
                    break;
                case 0x05:
                    console.log('oipf_rating_value');
                    datatype = decodedData.charCodeAt(index);
                    break;
                case 0x06:
                    console.log('oipf_rights_issuer_url');
                    if (datatype_length != 0) {
                        datatype = decodedData.substring(index, index + datatype_length);
                    }
                    break;
                case 0x07:
                    console.log('oipf_access_status');
                    datatype = decodedData.charCodeAt(index);
                    break;
                case 0x08:
                    console.log('oipf_status');
                    datatype = decodedData.charCodeAt(index);
                    break;
                    /*case 0x09:
                  console.log("oipf_drm_private_data");
                  break;
               case 0x0a:
                  console.log("oipf_can_play_status");
                  break;
               case 0x0b:
                  console.log("oipf_can_record_status");
                  break;*/
                default:
                    if (datatype_id >= 0x0c) {
                        if (datatype_id < 0x80) {
                            console.log('Reserved datatype_id 0x' + command_id.toString(16));
                        } else {
                            console.log('User defined datatype_id 0x' + command_id.toString(16));
                        }
                    } else {
                        console.log('Unhandled datatype_id 0x' + command_id.toString(16));
                    }
            }
            console.log('datatype=' + datatype);

            const value = dataTypes.get(datatype_id);
            if (value) {
                value.push(datatype);
            } else {
                dataTypes.set(datatype_id, [datatype]);
            }

            index += datatype_length;
        }
        return dataTypes;
    }

    function handleCiPlusMessage(p, event) {
        const status = p.drmSystemMap.get(DRM_SYSTEM_CIPLUS);
        if (!status) return; /* Safeguard */
        console.log('Inside handleCiPlusMessage. Parsing message.');
        const decodedData = atob(event.resultMsg);
        console.log('decodedData.length=' + decodedData.length);
        const command_id = decodedData.charCodeAt(0);
        const ca_system_id =
            'urn:dvb:casystemid:' + ((decodedData.charCodeAt(1) << 8) + decodedData.charCodeAt(2));
        const transaction_id =
            'ci+' +
            ((decodedData.charCodeAt(3) << 24) +
                (decodedData.charCodeAt(4) << 16) +
                (decodedData.charCodeAt(5) << 8) +
                decodedData.charCodeAt(6));
        console.log('command_id=0x' + command_id.toString(16));
        console.log('ca_system_id=' + ca_system_id);
        console.log('transaction_id=' + transaction_id.toString(16));

        switch (command_id) {
            /*case 0x01: console.log("send_msg");
            break;
         case 0x06: console.log("can_play_content_req");
            break;
         case 0x08: console.log("can_record_content_req");
            break;*/
            case 0x02:
                console.log('reply_msg for transaction_id=' + transaction_id);
                const replyMsg = status.ciplusMessages.get(transaction_id);
                if (replyMsg) {
                    console.log('CI+ Message found ' + transaction_id);
                    if (p.oipfDrmAgent) {
                        const dataTypes = extractDataTypes(decodedData);
                        const oipf_status = dataTypes.get(0x08);
                        if (oipf_status) {
                            const oipf_ca_vendor_specific_information = dataTypes.get(0x01);
                            let oipf_status_fixed = oipf_status[0];
                            if (oipf_status_fixed < 0 || oipf_status_fixed > 5) {
                                oipf_status_fixed = 1;
                            } else if (oipf_status_fixed === 3) {
                                oipf_status_fixed = 6;
                            }
                            p.oipfDrmAgent.dispatchDRMMessageResult.call(
                                p.oipfDrmAgent.obj,
                                replyMsg.msgId2,
                                oipf_ca_vendor_specific_information[0],
                                oipf_status_fixed
                            );
                        }
                    }
                    status.ciplusMessages.delete(transaction_id);
                } else {
                    console.log('CI+: Unknown transaction_id: ' + transaction_id);
                }
                break;
            case 0x03:
                console.log('parental_control_info');
                if (p.videoBroadcast) {
                    const dataTypes = extractDataTypes(decodedData);
                    const oipf_access_status = dataTypes.get(0x07);
                    const oipf_rating_type = dataTypes.get(0x04);
                    const oipf_rating_value = dataTypes.get(0x05);
                    const oipf_country_code = dataTypes.get(0x02);
                    if (oipf_access_status && oipf_rating_type && oipf_rating_value) {
                        const ratings = [{
                            value: oipf_rating_value[0],
                            labels: 0,
                            region: String.fromCharCode(
                                oipf_country_code[0][0],
                                oipf_country_code[0][1]
                            ),
                        }, ];
                        if (oipf_rating_type[0] === 0) {
                            ratings[0].scheme = 'dvb-si';
                            ratings[0].name = oipf_rating_value[0].toString();
                            p.videoBroadcast.dispatchParentalRatingChange.call(
                                p.videoBroadcast.obj,
                                null,
                                ratings,
                                ca_system_id,
                                oipf_access_status[0] === 0 /* blocked */
                            );
                        } else {
                            p.videoBroadcast.dispatchParentalRatingError.call(
                                p.videoBroadcast.obj,
                                null,
                                ratings,
                                ca_system_id
                            );
                        }
                    }
                }
                break;
            case 0x04:
                console.log('rights_info');
                if (p.videoBroadcast) {
                    const dataTypes = extractDataTypes(decodedData);
                    const oipf_access_status = dataTypes.get(0x07);
                    const oipf_rights_issuer_url = dataTypes.get(0x06);
                    if (oipf_access_status && oipf_rights_issuer_url) {
                        const errorState = oipf_access_status[0] === 1 ? 2 : 0;
                        p.videoBroadcast.dispatchDRMRightsError.call(
                            p.videoBroadcast.obj,
                            errorState,
                            null,
                            ca_system_id,
                            oipf_rights_issuer_url[0]
                        );
                    }
                }
                break;
            case 0x05:
                console.log('system_info');
                if (p.oipfDrmAgent) {
                    const dataTypes = extractDataTypes(decodedData);
                    const value = dataTypes.get(0x01);
                    if (value) {
                        for (const dataType of value) {
                            p.oipfDrmAgent.dispatchDRMSystemMessage.call(
                                p.oipfDrmAgent.obj,
                                dataType.datatype,
                                ca_system_id
                            );
                        }
                    }
                }
                break;
            case 0x07:
                console.log('can_play_content_reply');
                const canPlayMsg = status.ciplusMessages.get(transaction_id);
                if (canPlayMsg) {
                    console.log('CI+ Can Play Message found ' + transaction_id);
                    if (p.oipfDrmAgent) {
                        const dataTypes = extractDataTypes(decodedData);
                        const oipf_can_play_status = dataTypes.get(0x0a);
                        console.log('oipf_can_play_status=' + oipf_can_play_status);
                        if (oipf_can_play_status) {
                            return oipf_can_play_status[0] === 1;
                        }
                    }
                    status.ciplusMessages.delete(transaction_id);
                } else {
                    console.log('CI+: Unknown transaction_id: ' + transaction_id);
                }
                return false;
            case 0x09:
                console.log('can_record_content_reply');
                const canRecordMsg = status.ciplusMessages.get(transaction_id);
                if (canRecordMsg) {
                    console.log('CI+ Can Record Message found ' + transaction_id);
                    if (p.oipfDrmAgent) {
                        const dataTypes = extractDataTypes(decodedData);
                        const oipf_can_record_status = dataTypes.get(0x0b);
                        console.log('oipf_can_record_status=' + oipf_can_record_status);
                        if (oipf_can_record_status) {
                            return oipf_can_record_status[0] === 1;
                        }
                    }
                    status.ciplusMessages.delete(transaction_id);
                } else {
                    console.log('CI+: Unknown transaction_id: ' + transaction_id);
                }
                return false;
            default:
                if (command_id >= 0x0a) {
                    if (command_id < 0x80) {
                        console.log('Reserved command_id 0x' + command_id.toString(16));
                    } else {
                        console.log('User defined command_id 0x' + command_id.toString(16));
                    }
                } else {
                    console.log('Unhandled command_id 0x' + command_id.toString(16));
                }
        }
    }

    function urnToInt(urn) {
        return parseInt(urn.substring(urn.lastIndexOf(':') + 1));
    }

    function serializeCiplusMessage(DRMSystemID, command_id, datatype_id, data) {
        const message_bytes = [];
        message_bytes.push(command_id); //command_id
        const iDRMSystemID = urnToInt(DRMSystemID);
        message_bytes.push((iDRMSystemID >> 8) & 0xff); //ca_system_id
        message_bytes.push(iDRMSystemID & 0xff);
        gCiplusTransactionId = (gCiplusTransactionId + 1) & 0xffffffff; //modulo 2**32
        message_bytes.push((gCiplusTransactionId >> 24) & 0xff); //transaction_id
        message_bytes.push((gCiplusTransactionId >> 16) & 0xff);
        message_bytes.push((gCiplusTransactionId >> 8) & 0xff);
        message_bytes.push(gCiplusTransactionId & 0xff);
        message_bytes.push(1); //send_datatype_nbr = 1
        message_bytes.push(datatype_id); //datatype_id
        const len = data.length / 2;
        message_bytes.push((len >> 8) & 0xff); //datatype_length
        message_bytes.push(len & 0xff);
        for (let i = 0; i < data.length; i += 2) {
            message_bytes.push(parseInt(data.substring(i, i + 2), 16));
        }
        return btoa(String.fromCharCode.apply(null, message_bytes));
    }

    return {
        initialise: initialise,
        /* oipfGatewayInfo */
        registerOipfGatewayInfo: registerOipfGatewayInfo,
        isCSPGCIPlusDiscovered: isCSPGCIPlusDiscovered,
        /* oipfCapabilities and oipfGatewayInfo */
        getCSPGCIPlusStatus: getCSPGCIPlusStatus,
        getSupportedDRMSystems: getSupportedDRMSystems,
        /* oipfDrmAgent */
        registerOipfDrmAgent: registerOipfDrmAgent,
        sendDRMMessage: sendDRMMessage,
        canPlayContent: canPlayContent,
        canRecordContent: canRecordContent,
        getDRMSystemStatus: getDRMSystemStatus,
        setActiveDRM: setActiveDRM,
        /* VideoBroadcast */
        registerVideoBroadcast: registerVideoBroadcast,
    };
})();
/**
 * @license ORB Software. Copyright (c) 2026 Ocean Blue Software Limited
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// RDK/Linux native
hbbtv.native = {
    name: 'rdk',
    media: undefined,
    mediaProxy: undefined,
    dashProxy: undefined,
    proprietary: false,
    orb_timeShiftBufferDepthReceived: undefined,
    currentPeriod: undefined,
    currentRepresentation: undefined,
    pausedDelta: false,
    initialise: function() {
        this.token = Object.assign({}, document.token);
    },
    // setters
    setMedia: function(media) {
        console.log('[RDK-Native::setMedia]');
        console.log(media);
        this.media = media;
    },
    setMediaProxy: function(mediaProxy) {
        console.log('[RDK-Native::setMediaProxy]');
        console.log(mediaProxy);
        this.mediaProxy = mediaProxy;
    },
    setDashProxy: function(dashProxy) {
        console.log('[RDK-Native::setDashProxy]');
        console.log(dashProxy);
        this.dashProxy = dashProxy;
    },
    setProprietary: function(proprietary) {
        console.log('[RDK-Native::setProprietary]');
        console.log(proprietary);
        this.proprietary = proprietary;
    },
    getProprietary: function() {
        console.log('[RDK-Native::getProprietary]');
        console.log(this.proprietary);
        return this.proprietary;
    },
    setPausedDelta: function(pausedDelta) {
        console.log(`[RDK-Native::getProprietary] PausedDelta = ${this.pausedDelta}`);
        this.pausedDelta = pausedDelta;
    },
    request: function(method, params) {
        const body = {
            token: this.token,
            method: method,
            params: params || {},
        };
        const responseText = wpeBridge.request(JSON.stringify(body));
        if (typeof responseText !== 'string') {
            console.debug('Invalid response');
            return false;
        }
        const response = JSON.parse(responseText);
        if (response.error !== undefined) {
            if (response.error === 'SecurityError') {
                throw new DOMException('', 'SecurityError');
            }
            console.debug('Error response from ' + method + ': ' + response.error);
            return false;
        }
        //console.log("Response from " + method + ": " + JSON.stringify(response));
        return response;
    },
    setDispatchEventCallback: function(callback) {
        // TEMPORARY Dispatch an event and properties. TODO Replace me in events part 2!
        document.dispatchBridgeEvent = (type, properties) => {
            callback(type, properties);
        };
    },
    isDebugBuild: function() {
        return true; // TODO Move up. Note: This needs to be enabled to disable dash-scheme
    },
    isFeatureEnabled(name) {
        if (name === 'dash-scheme') {
            return false;
        }
        return false;
    },
    // private methods used for internal logic
    /**
     * This method will return:
     *     -1     if the key argument was removed in the latest mpd period/representation received
     *      0     if the key argument remains
     *      1     if the key argument was added in the latest mpd period/representation received
     */
    metadataDelta: function({periodData, representationData} = {}, key) {
        console.log('[RDK-Native::metadataDelta]');
        let result = 0;

        // latest mpd period or representation
        let currentObj;
        if (periodData !== undefined) {
            currentObj = this.currentPeriod;
        }
        else {
            currentObj = this.currentRepresentation;
        }

        // new mpd period or representation
        let searchObj =
            periodData !== undefined ? periodData : representationData;

        // check for delta
        if (currentObj !== undefined
            && currentObj.hasOwnProperty(key)
            && !searchObj.hasOwnProperty(key))
        {
            console.log(`RDK-Native::metadataDelta] ${key} Removed`);
            result = -1;
        }
        else if (currentObj !== undefined
            && !currentObj.hasOwnProperty(key)
            && searchObj.hasOwnProperty(key))
        {
            console.log(`RDK-Native::metadataDelta] ${key} Removed`);
            result = 1;
        }

        // finally, store the period or representation as the latest
        if (periodData !== undefined) {
            this.currentPeriod = periodData;
        } if (representationData !== undefined) {
            this.currentRepresentation = representationData;
        }

        return result;
    },
    // optional method to add native specific event listeners on mediamanager
    addMediaNativeListeners: function() {
        console.log('[RDK-Native::addMediaNativeListeners] Adding media native listeners');
        // in case of dynamic mpd, update the seekable property based on timeupdate
        // dashjs will update the seekable property based on the dvr property continuously.
        // we will need to filter the diff and see if it exceeds MPD@timeShiftBufferDepth
        this.media.addEventListener('__orb_timeShiftBufferDepthReceived__', (e) => {
            console.log('[RDK-Native::__orb_timeShiftBufferDepthReceived__]');
            this.orb_timeShiftBufferDepthReceived = e;
        });
        console.log('[RDK-Native::addMediaNativeListeners] Added __orb_timeShiftBufferDepthReceived__ listener');

        this.media.addEventListener('__orb_eventStreamReceived__', (e) => {
            console.log('[RDK-Native::__orb_eventStreamReceived__]');
            this.media.removeTrackEvent();
        });
        console.log('[RDK-Native::addMediaNativeListeners] Added __orb_eventStreamReceived__ listener');

        this.media.addEventListener('__orb_inbandEventStreamReceived__', (e) => {
            console.log('[RDK-Native::__orb_inbandEventStreamReceived__]');
            console.log(e);
            if (e.delta === -1) {
                console.log('[RDK-Native::addMediaNativeListeners] Dispatching RemoveTrack for Representation');
                this.media.removeTrackEvent();
            } else if (e.delta === 1) {
                console.log('[RDK-Native::addMediaNativeListeners] Dispatching AddTrack for Representation');
                this.media.addTrackEvent();
            }
        });
        console.log('[RDK-Native::addMediaNativeListeners] Added __orb_inbandEventStreamReceived__ listener');
    },

    // optional methods to dispatch native specific events
    /**
     * This method is called each time the manifest is received
     */
    dispatchManifestNativeEvents: function(e) {
        // dispatch __orb_timeShiftBufferDepthReceived__ event for seekable property in case of rdk native

        if (e.data.type === 'dynamic') {
            const timeShiftEvt = new Event('__orb_timeShiftBufferDepthReceived__');
            if (e.data.hasOwnProperty('timeShiftBufferDepth')) {
                Object.assign(timeShiftEvt, {
                    timeShiftBufferDepth: e.data.timeShiftBufferDepth,
                });
            } else {
                Object.assign(timeShiftEvt, {
                    firstPeriodStart: e.data.Period_asArray[0].start,
                });
            }
            console.log('[RDK-Native] Dipsatching __orb_timeShiftBufferDepthReceived__');
            this.dashProxy.dispatchEvent(timeShiftEvt);
        }

        // check for event stream state
        if (this.metadataDelta({periodData: e.data.Period_asArray[0]}, 'EventStream')  === -1) {
            const eventStreamReceivedEvt = new Event('__orb_eventStreamReceived__');
            console.log('[RDK-Native] Dipsatching __orb_eventStreamReceived__');
            this.dashProxy.dispatchEvent(eventStreamReceivedEvt);
        }
    },

    /**
     * This method is called each time the representation is changed
     */
    dispatchRepresentationNativeEvents: function(representation) {
        const inbandEventStreamEvt = new Event('__orb_inbandEventStreamReceived__');
        Object.assign(inbandEventStreamEvt, {
            delta: this.metadataDelta({representationData: representation}, 'InbandEventStream')
        });
        console.log('[RDK-Native] Dipsatching __orb_inbandEventStreamReceived__');
        this.dashProxy.dispatchEvent(inbandEventStreamEvt);
    },

    // Polling events
    getSeekablePollingEvent: function() {
        return 'timeupdate';
    },
    getBufferedPollingEvent: function() {
        return 'timeupdate';
    },

    // Event handlers
    updateSeekable: function(e) {
        const ranges = [];
        const media = this.media;
        const mediaProxy = this.mediaProxy;
        const MEDIA_PROXY_ID = 'HTMLMediaElement';
        const data = this.orb_timeShiftBufferDepthReceived;

        for (let i = 0; i < media.seekable.length; ++i) {
            const seekableEnd = media.seekable.end(i);

            /**
             * call with MPD@timeShiftBufferDepth set. Will need to adjust
             * the seekable ranges so that the diff is not exceeding timeShiftBufferDepth.
             * Progress seekableStart accordingly
             */
            if (data !== undefined && data.hasOwnProperty('timeShiftBufferDepth')) {
                let seekableStart = media.seekable.start(i);
                if (seekableEnd - media.seekable.start(i) > data.timeShiftBufferDepth) {
                    seekableStart = seekableEnd - data.timeShiftBufferDepth;
                }
                ranges.push({
                    start: seekableStart,
                    end: seekableEnd,
                });
            }
            /**
             * The seekable parameter reflected the removal of a period when MPD@timeShiftBufferDepth is not present
             * MPD@timeShiftBufferDepth was not present and MPD@type was dynamic.
             * The seekable start should be equal to the removed period duration.
             */
            else if (data !== undefined && data.hasOwnProperty('firstPeriodStart')){
                ranges.push({
                    start: data.firstPeriodStart,
                    end: media.currentTime,
                });
            }
            else {
                ranges.push({
                    start: media.seekable.start(i),
                    end: media.seekable.end(i),
                });
            }
        }

        /**
         * Cover cases where the MPD is dynamic and the media element is paused until the start is greater than currentTime.
         * In this case, an error event should be generated of type MEDIA_ERR_NETWORK (error.code = 2). DashProxy will dispatch
         * this error event.
         */
        if (this.pausedDelta && this.media.currentTime < ranges[0].start) {
            const e = new Event('error');
            e.error = {};
            e.error.code = 2;
            e.error.message = '';
            this.dashProxy.dispatchEvent(e);
            this.pausedDelta = false;
        }

        // console.log(`CT = ${media.currentTime}`);
        // console.log(`RANGE = ${ranges[0].start} ${ranges[0].end}`);

        // make sure to dispatch the event with defined data
        mediaProxy.callObserverMethod(MEDIA_PROXY_ID, 'setSeekable', [ranges]);
        mediaProxy.dispatchEvent(MEDIA_PROXY_ID, data !== undefined ? data : e);
    }
};
/**
 * @fileOverview XHR polyfill
 * @license ORB Software. Copyright (c) 2022 Ocean Blue Software Limited
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

(function() {
    const _getResponseHeader = window.XMLHttpRequest.prototype.getResponseHeader;
    window.XMLHttpRequest.prototype.getResponseHeader = function(headerName) {
        return new defaultEntities.URL(this.responseURL).protocol === 'dvb:' ?
            null :
            _getResponseHeader.call(this, headerName);
    };
    const _getAllResponseHeaders = window.XMLHttpRequest.prototype.getAllResponseHeaders;
    window.XMLHttpRequest.prototype.getAllResponseHeaders = function() {
        return new defaultEntities.URL(this.responseURL).protocol === 'dvb:' ?
            '' :
            _getAllResponseHeaders.call(this);
    };

    if (hbbtv.native.name === "rdk") {
        const _open = window.XMLHttpRequest.prototype.open;
        window.XMLHttpRequest.prototype.open = function(method, url, async, user, password) {
            const baseUrl = (window.document.getElementsByTagName('base')[0] ?? document.createElement('base')).href;
            if(baseUrl.length > 0) {
                if(url.startsWith("dvb:/") && !url.startsWith("dvb://")) {
                    let newbase;
                    const dvbTag="dvb:";
                    if(baseUrl.startsWith("dvb://")) {
                        newbase = baseUrl.substring(0, baseUrl.lastIndexOf("/"));
                        url = newbase + url.substring(dvbTag.length);
                    } else {
                        const dvburlTag = "dvburl=";
                        const urlIdx = baseUrl.lastIndexOf(dvburlTag);
                        if(urlIdx) {
                            newbase = baseUrl.substring(urlIdx + dvburlTag.length);
                            url = newbase + url.substring(dvbTag.length);
                        }
                    }
                    arguments[1] = url;
                }
            }
            return _open.apply(this, arguments);
        };
    }
})();
/**
 * @fileOverview Window close polyfill
 * @license ORB Software. Copyright (c) 2022 Ocean Blue Software Limited
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

(function() {
    // Override window.close()
    window.close = function() {
        hbbtv.bridge.manager.destroyApplication();
    };
})();/**
 * @fileOverview Debug polyfill
 * See: {@link https://web.archive.org/web/20200219165053/http://www.oipf.tv/web-spec/volume5.html#debug-print-api}
 * @license ORB Software. Copyright (c) 2022 Ocean Blue Software Limited
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

(function() {
    if (typeof window.debug === 'undefined') {
        window.debug = function(arg) {
            console.debug(arg);
        };
    }
})();/**
 * @fileOverview KeyEvent polyfill
 * @license ORB Software. Copyright (c) 2022 Ocean Blue Software Limited
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

(function() {
    // Create or extend KeyEvent object
    if (typeof window.KeyEvent === 'undefined') {
        window.KeyEvent = {};
    }
    const keys = {
        VK_RED: 403,
        VK_GREEN: 404,
        VK_YELLOW: 405,
        VK_BLUE: 406,
        VK_LEFT: 37,
        VK_UP: 38,
        VK_RIGHT: 39,
        VK_DOWN: 40,
        VK_ENTER: 13,
        VK_BACK: 461,
        VK_0: 48,
        VK_1: 49,
        VK_2: 50,
        VK_3: 51,
        VK_4: 52,
        VK_5: 53,
        VK_6: 54,
        VK_7: 55,
        VK_8: 56,
        VK_9: 57,
        VK_STOP: 413,
        VK_PLAY: 415,
        VK_PAUSE: 19,
        VK_PLAY_PAUSE: 402,
        VK_FAST_FWD: 417,
        VK_REWIND: 412,
        VK_RECORD: 416,
    };
    for (const key in keys) {
        if (!window.KeyEvent.hasOwnProperty(key)) {
            Object.defineProperty(window.KeyEvent, key, {
                value: keys[key],
                writable: false,
                enumerable: true,
            });
        }
    }

    const keyLabels = {
        VK_BACK: "BrowserBack",
        VK_EXIT: "Exit",
        VK_CHANNELS: "ChannelList",
        VK_PLAY_PAUSE: "MediaPlayPause",
        VK_RED: "ColorF0Red",
        VK_GREEN: "ColorF1Green",
        VK_YELLOW: "ColorF2Yellow",
        VK_BLUE: "ColorF3Blue",
        VK_STOP: "MediaStop",
        VK_PLAY: "MediaPlay",
        VK_PAUSE: "MediaPause",
        VK_FAST_FWD: "MediaFastForward",
        VK_REWIND: "MediaRewind",
        VK_RECORD: "MediaRecord",
        VK_0: "Digit0",
        VK_1: "Digit1",
        VK_2: "Digit2",
        VK_3: "Digit3",
        VK_4: "Digit4",
        VK_5: "Digit5",
        VK_6: "Digit6",
        VK_7: "Digit7",
        VK_8: "Digit8",
        VK_9: "Digit9",
        VK_CHANNEL_UP: "ChannelUp",
        VK_CHANNEL_DOWN: "ChannelDown",
        VK_SUBTITLE: "Subtitle",
        VK_GUIDE: "Guide",
        VK_CHANNELS: "ChannelList",
        VK_INFO: "Info",
        VK_LEFT: "ArrowLeft",
        VK_RIGHT: "ArrowRight",
        VK_UP: "ArrowUp",
        VK_DOWN: "ArrowDown",
        VK_ENTER: "Enter",
        VK_MUTE: "AudioVolumeMute",
        VK_VOLUME_UP: "AudioVolumeUp",
        VK_VOLUME_DOWN: "AudioVolumeDown",
    };

    function keyHandler(originalEvent) {
        if(originalEvent.code === "") {
            originalEvent.preventDefault();
            originalEvent.stopImmediatePropagation();
            const keyLabel = Object.keys(keys).find(key => keys[key] === originalEvent.keyCode);
            const newEvent = new KeyboardEvent(originalEvent.type, Object.assign({}, originalEvent, {
                keyCode: originalEvent.keyCode,
                code: keyLabels[keyLabel] || "0",
                bubbles: true,
            }));

            originalEvent.target.dispatchEvent(newEvent);
        }
    }

    window.addEventListener('keydown', keyHandler);
    window.addEventListener('keyup', keyHandler);
    window.addEventListener('keypress', keyHandler);
})();
/**
 * @fileOverview Special ORB methods for debug builds.
 * @license ORB Software. Copyright (c) 2022 Ocean Blue Software Limited
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

hbbtv.orbDebug = (function() {
    const exported = {};

    exported.polyfill = function() {
        if (!hbbtv.native.isDebugBuild()) {
            return;
        }
        window.orbDebug = {};
        window.orbDebug.publishTestReport = function(testSuite, xml) {
            hbbtv.bridge.orbDebug.publishTestReport(testSuite, xml);
        };
        window.orbDebug.isFeatureEnabled = function(name) {
            return hbbtv.native.isFeatureEnabled(name);
        };
    };

    return exported;
})();/**
 * @fileOverview Collection class
 * @license ORB Software. Copyright (c) 2022 Ocean Blue Software Limited
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

hbbtv.objects.Collection = (function() {
    const prototype = {};
    const privates = new WeakMap();

    Object.defineProperty(prototype, 'length', {
        get() {
            return privates.get(this).collection.length;
        },
    });

    prototype.item = function(index) {
        return privates.get(this).collection[index];
    };

    function initialise(items) {
        privates.set(this, {});
        const p = privates.get(this);
        p.collection = Array.isArray(items) ? items : [];
        p.collection.forEach((e) => Object.freeze(e));
    }

    return {
        prototype: prototype,
        initialise: initialise,
    };
})();

hbbtv.objects.CollectionProxy = {
    get: function(target, name) {
        if (name in target) {
            if (typeof target[name] === 'function') {
                return target[name].bind(target);
            }
            return target[name];
        }
        if (typeof name === 'string' || name instanceof String) {
            const index = parseInt(name);
            if (!isNaN(index)) {
                return target.item(index);
            }
        }
    },
};

hbbtv.objects.createCollection = function(items) {
    const collection = Object.create(hbbtv.objects.Collection.prototype);
    hbbtv.objects.Collection.initialise.call(collection, items);
    return new Proxy(collection, hbbtv.objects.CollectionProxy);
};/**
 * @fileOverview AdioTrackList class
 * @license ORB Software. Copyright (c) 2022 Ocean Blue Software Limited
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
hbbtv.objects.AudioTrackList = (function() {
    const AUDIO_TRACK_KEY_PREFIX = 'AudioTrack_';
    const listProto = {};
    const trackProto = {};
    const privates = new WeakMap();
    const events = ['change', 'addtrack', 'removetrack'];
    const evtTargetMethods = ['addEventListener', 'removeEventListener', 'dispatchEvent'];
    const trackProps = [
        'index',
        'id',
        'kind',
        'label',
        'language',
        'encoding',
        'encrypted',
        'numChannels',
    ];

    Object.defineProperty(listProto, 'length', {
        get() {
            return privates.get(this).length;
        },
    });

    for (const key of events) {
        Object.defineProperty(listProto, 'on' + key, {
            set(callback) {
                const p = privates.get(this);
                if (p['on' + key]) {
                    p.eventTarget.removeEventListener(key, p['on' + key]);
                }

                if (callback instanceof Object) {
                    p['on' + key] = callback;
                    if (callback) {
                        p.eventTarget.addEventListener(key, callback);
                    }
                } else {
                    p['on' + key] = null;
                }
            },
            get() {
                return privates.get(this)['on' + key];
            },
        });
    }

    function makeEventTargetMethod(name) {
        return function() {
            EventTarget.prototype[name].apply(privates.get(this).eventTarget, arguments);
        };
    }

    for (const func of evtTargetMethods) {
        listProto[func] = makeEventTargetMethod(func);
    }

    for (const key of trackProps) {
        Object.defineProperty(trackProto, key, {
            get() {
                return privates.get(this).properties[key];
            },
        });
    }

    Object.defineProperty(trackProto, 'enabled', {
        get() {
            return privates.get(this).properties.enabled;
        },
        set(value) {
            const p = privates.get(this);
            if (value !== p.properties.enabled) {
                if (value) {
                    for (let track of p.trackList) {
                        if (track.enabled && track !== this) {
                            track.enabled = false;
                            break;
                        }
                    }
                }
                p.properties.enabled = !!value;
                p.trackList.dispatchEvent(new Event('change'));
            }
        },
    });

    listProto.getTrackById = function(id) {
        for (const track of this) {
            if (track.id === id.toString()) {
                return track;
            }
        }
    };

    listProto[Symbol.iterator] = function*() {
        for (let i = 0; i < this.length; ++i) {
            yield this[i];
        }
    };

    listProto.orb_setTrackList = function(trackList) {
        let p = privates.get(this);
        let preferredAudioLanguageTrack = null;
        let cleanAudioTrack = null;
        for (let i = trackList.length; i < this.length; ++i) {
            p.proxy.unregisterObserver(AUDIO_TRACK_KEY_PREFIX + i);
            delete this[i];
        }

        for (let i = 0; i < trackList.length; ++i) {
            this[i] = makeAudioTrack(this, i, trackList[i]);
            if (p.defaultAudioLanguage) {
                let trackLanguage = this[i].language.includes('-') ? this[i].language.split('-')[0] : this[i].language;
                if (trackLanguage === p.defaultAudioLanguage ||
                    hbbtv.languageCodes.ISO639_2_to_ISO639_1[trackLanguage] === p.defaultAudioLanguage ||
                    hbbtv.languageCodes.ISO639_2_to_ISO639_1[p.defaultAudioLanguage] === trackLanguage) {
                    preferredAudioLanguageTrack = this[i];
                }
            }
            if (this[i].kind === "alternative" && trackList[i].accessibility === 2) {
                cleanAudioTrack = this[i];
            }
        }

        privates.get(this).length = trackList.length;

        if (preferredAudioLanguageTrack) {
            preferredAudioLanguageTrack.enabled = true;
            p.defaultAudioLanguage = null; // the property is valid only during first playback
        }

        if (p.cleanAudioEnabled && cleanAudioTrack) {
            cleanAudioTrack.enabled = true;
        } else if (!p.cleanAudioEnabled && cleanAudioTrack !== null) {
            cleanAudioTrack.enabled = false;
        }
    };

    listProto.orb_appendTrack = function(track) {
        const p = privates.get(this);
        const t = makeAudioTrack(this, p.length, track);
        this[p.length++] = t;
        p.eventTarget.dispatchEvent(new TrackEvent('addtrack'));
    };

    listProto.orb_removeTrackAt = function(index) {
        const p = privates.get(this);
        if (index >= 0 && index < p.length) {
            // TODO: update all tracks indexes and keys with the iframe proxy
            for (let i = index + 1; i < p.length; i++) {
                this[i - 1] = this[i];
            }
            delete this[--p.length];
            p.eventTarget.dispatchEvent(new TrackEvent('removetrack'));
        }
    };

    function makeAudioTrack(trackList, index, properties) {
        const track = Object.create(trackProto);
        const proxy = privates.get(trackList).proxy;
        proxy.registerObserver(AUDIO_TRACK_KEY_PREFIX + index, track);
        privates.set(track, {
            trackList,
            properties,
        });

        // We create a new Proxy object which we return in order to avoid ping-pong calls
        // between the iframe and the main window when the user requests a property update
        // or a function call.
        const trackProxy = new Proxy(track, {
            get: (target, property) => {
                return target[property];
            },
            set: (target, property, value) => {
                if (property === 'enabled') {
                    proxy.updateObserverProperties(AUDIO_TRACK_KEY_PREFIX + index, {
                        [property]: value,
                    });
                }
                target[property] = value;
                return true;
            },
        });
        return trackProxy;
    }

    function initialise(proxy) {
        const AUDIO_TRACK_LIST_KEY = 'AudioTrackList';
        const prefLang = hbbtv.bridge.configuration.getPreferredAudioLanguage();

        privates.set(this, {
            length: 0,
            eventTarget: document.createDocumentFragment(),
            defaultAudioLanguage: prefLang.includes(',') ? prefLang.split(',')[0] : prefLang,
            cleanAudioEnabled: hbbtv.bridge.configuration.getCleanAudioEnabled(),
            proxy,
        });
        proxy.registerObserver(AUDIO_TRACK_LIST_KEY, this);

        // We create a new Proxy object which we return in order to avoid ping-pong calls
        // between the iframe and the main window when the user requests a property update
        // or a function call.
        const tracksProxy = new Proxy(this, {
            get: (target, property) => {
                if (typeof target[property] === 'function') {
                    if (!evtTargetMethods.includes(property)) {
                        return function() {
                            proxy.callObserverMethod(
                                AUDIO_TRACK_LIST_KEY,
                                property,
                                Array.from(arguments)
                            );
                            return target[property].apply(target, arguments);
                        };
                    }
                    return target[property].bind(target);
                }
                return target[property];
            },
            set: (target, property, value) => {
                if (typeof target[property] !== 'function') {
                    proxy.updateObserverProperties(AUDIO_TRACK_LIST_KEY, {
                        [property]: value,
                    });
                }
                target[property] = value;
                return true;
            },
        });
        return tracksProxy;
    }

    return {
        prototype: listProto,
        initialise: initialise,
    };
})();

hbbtv.objects.createAudioTrackList = function(proxy) {
    const trackList = Object.create(hbbtv.objects.AudioTrackList.prototype);
    return hbbtv.objects.AudioTrackList.initialise.call(trackList, proxy);
};/**
 * @fileOverview VideoTrackList class
 * @license ORB Software. Copyright (c) 2022 Ocean Blue Software Limited
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
hbbtv.objects.VideoTrackList = (function() {
    const listProto = {};
    const trackProto = {};
    const privates = new WeakMap();
    const events = ['change', 'addtrack', 'removetrack'];
    const evtTargetMethods = ['addEventListener', 'removeEventListener', 'dispatchEvent'];
    const trackProps = ['index', 'id', 'kind', 'label', 'language', 'encoding', 'encrypted'];
    const VIDEO_TRACK_KEY_PREFIX = 'VideoTrack_';

    Object.defineProperty(listProto, 'length', {
        get() {
            return privates.get(this).length;
        },
    });

    for (const key of events) {
        Object.defineProperty(listProto, 'on' + key, {
            set(callback) {
                const p = privates.get(this);
                if (p['on' + key]) {
                    p.eventTarget.removeEventListener(key, p['on' + key]);
                }

                if (callback instanceof Object) {
                    p['on' + key] = callback;
                    if (callback) {
                        p.eventTarget.addEventListener(key, callback);
                    }
                } else {
                    p['on' + key] = null;
                }
            },
            get() {
                return privates.get(this)['on' + key];
            },
        });
    }

    function makeEventTargetMethod(name) {
        return function() {
            EventTarget.prototype[name].apply(privates.get(this).eventTarget, arguments);
        };
    }

    for (const func of evtTargetMethods) {
        listProto[func] = makeEventTargetMethod(func);
    }

    for (const key of trackProps) {
        Object.defineProperty(trackProto, key, {
            get() {
                return privates.get(this).properties[key];
            },
        });
    }

    Object.defineProperty(listProto, 'selectedIndex', {
        get() {
            for (const track of this) {
                if (track.selected) {
                    return track.index;
                }
            }
            return -1;
        },
    });

    Object.defineProperty(trackProto, 'selected', {
        get() {
            return privates.get(this).properties.selected;
        },
        set(value) {
            const p = privates.get(this);
            if (value !== p.properties.selected) {
                if (value) {
                    for (let track of p.trackList) {
                        if (track.selected && track !== this) {
                            track.selected = false;
                            break;
                        }
                    }
                }
                p.properties.selected = !!value;
                p.trackList.dispatchEvent(new Event('change'));
            }
        },
    });

    listProto[Symbol.iterator] = function*() {
        for (let i = 0; i < this.length; ++i) {
            yield this[i];
        }
    };

    listProto.getTrackById = function(id) {
        for (const track of this) {
            if (track.id === id.toString()) {
                return track;
            }
        }
    };

    listProto.orb_setTrackList = function(trackList) {
        const p = privates.get(this);
        for (let i = trackList.length; i < this.length; ++i) {
            p.proxy.unregisterObserver(VIDEO_TRACK_KEY_PREFIX + i);
            delete this[i];
        }
        for (let i = 0; i < trackList.length; ++i) {
            this[i] = makeVideoTrack(this, i, trackList[i]);
        }
        privates.get(this).length = trackList.length;
    };

    listProto.orb_appendTrack = function(track) {
        const p = privates.get(this);
        const t = makeVideoTrack(this, p.length, track);
        this[p.length++] = t;
        p.eventTarget.dispatchEvent(new TrackEvent('addtrack'));
    };

    listProto.orb_removeTrackAt = function(index) {
        const p = privates.get(this);
        if (index >= 0 && index < p.length) {
            // TODO: update all tracks indexes and keys with the iframe proxy
            for (let i = index + 1; i < p.length; i++) {
                this[i - 1] = this[i];
            }
            delete this[--p.length];
            p.eventTarget.dispatchEvent(new TrackEvent('removetrack'));
        }
    };

    function makeVideoTrack(trackList, index, properties) {
        const track = Object.create(trackProto);
        const proxy = privates.get(trackList).proxy;
        proxy.registerObserver(VIDEO_TRACK_KEY_PREFIX + index, track);
        privates.set(track, {
            trackList,
            properties,
        });

        // We create a new Proxy object which we return in order to avoid ping-pong calls
        // between the iframe and the main window when the user requests a property update
        // or a function call.
        const trackProxy = new Proxy(track, {
            get: (target, property) => {
                return target[property];
            },
            set: (target, property, value) => {
                if (property === 'selected') {
                    proxy.updateObserverProperties(VIDEO_TRACK_KEY_PREFIX + index, {
                        [property]: value,
                    });
                }
                target[property] = value;
                return true;
            },
        });
        return trackProxy;
    }

    function initialise(proxy) {
        const VIDEO_TRACK_LIST_KEY = 'VideoTrackList';
        privates.set(this, {
            length: 0,
            eventTarget: document.createDocumentFragment(),
            proxy,
        });
        proxy.registerObserver(VIDEO_TRACK_LIST_KEY, this);

        // We create a new Proxy object which we return in order to avoid ping-pong calls
        // between the iframe and the main window when the user requests a property update
        // or a function call.
        const tracksProxy = new Proxy(this, {
            get: (target, property) => {
                if (typeof target[property] === 'function') {
                    if (!evtTargetMethods.includes(property)) {
                        return function() {
                            proxy.callObserverMethod(
                                VIDEO_TRACK_LIST_KEY,
                                property,
                                Array.from(arguments)
                            );
                            return target[property].apply(target, arguments);
                        };
                    }
                    return target[property].bind(target);
                }
                return target[property];
            },
            set: (target, property, value) => {
                if (typeof target[property] !== 'function') {
                    proxy.updateObserverProperties(VIDEO_TRACK_LIST_KEY, {
                        [property]: value,
                    });
                }
                target[property] = value;
                return true;
            },
        });
        return tracksProxy;
    }

    return {
        prototype: listProto,
        initialise: initialise,
    };
})();

hbbtv.objects.createVideoTrackList = function(proxy) {
    const trackList = Object.create(hbbtv.objects.VideoTrackList.prototype);
    return hbbtv.objects.VideoTrackList.initialise.call(trackList, proxy);
};/**
 * @fileOverview TextTrackList class
 * @license ORB Software. Copyright (c) 2022 Ocean Blue Software Limited
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
hbbtv.objects.TextTrackList = (function() {
    const prototype = Object.create(TextTrackList.prototype);
    const privates = new WeakMap();
    const events = ['change', 'addtrack', 'removetrack'];
    const evtTargetMethods = ['addEventListener', 'removeEventListener', 'dispatchEvent'];

    Object.defineProperty(prototype, 'length', {
        get() {
            return privates.get(this).length;
        },
    });

    for (const key of events) {
        Object.defineProperty(prototype, 'on' + key, {
            set(callback) {
                const p = privates.get(this);
                if (p['on' + key]) {
                    p.eventTarget.removeEventListener(key, p['on' + key]);
                }

                if (callback instanceof Object) {
                    p['on' + key] = callback;
                    if (callback) {
                        p.eventTarget.addEventListener(key, callback);
                    }
                } else {
                    p['on' + key] = null;
                }
            },
            get() {
                return privates.get(this)['on' + key];
            },
        });
    }

    function makeEventTargetMethod(name) {
        return function() {
            EventTarget.prototype[name].apply(privates.get(this).eventTarget, arguments);
        };
    }

    for (const func of evtTargetMethods) {
        prototype[func] = makeEventTargetMethod(func);
    }

    prototype[Symbol.iterator] = function*() {
        for (let i = 0; i < this.length; ++i) {
            yield this[i];
        }
    };

    prototype.getTrackById = function(id) {
        for (const track of this) {
            if (track.id === id.toString()) {
                return track;
            }
        }
    };

    prototype.orb_addTextTrack = function(kind, label, language, mode) {
        const p = privates.get(this);

        for (let i = 0; i < p.length; i++) {
            const track = this[i];
            if ((track.kind === kind) && (track.label === label) && (track.language === language)) {
                if (track.mode === 'showing') {
                    track.mode = track.mode;
                }
                return track;
            }
        }
        const track = hbbtv.objects.createTextTrack(
            p.mediaElement,
            p.proxy,
            label !== undefined ? label.toString() : '',
            kind,
            label,
            language,
            mode
        );
        this[p.length++] = track;
        const evt = new TrackEvent('addtrack');
        Object.defineProperty(evt, 'track', {
            value: track,
            writable: false,
        });
        p.eventTarget.dispatchEvent(evt);
        return track;
    };

    prototype.orb_removeTrackAt = function(index) {
        const p = privates.get(this);
        if (index >= 0 && index < p.length) {
            this[i].orb_finalize();
            for (let i = index + 1; i < p.length; i++) {
                // TODO: update track indexes and registration with the proxy
                this[i - 1] = this[i];
            }
            delete this[--p.length];
            p.eventTarget.dispatchEvent(new TrackEvent('removetrack'));
        }
    };

    // helper methods for addtrack, removetrack events
    prototype.orb_addTrackEvent = function() {
        const p = privates.get(this);
        p.eventTarget.dispatchEvent(new TrackEvent('addtrack'));
    };

    prototype.orb_removeTrackEvent = function() {
        const p = privates.get(this);
        p.eventTarget.dispatchEvent(new TrackEvent('removetrack'));
    };

    function initialise(mediaElement, proxy) {
        const TEXT_TRACK_LIST_KEY = 'TextTrackList';
        privates.set(this, {
            length: 0,
            eventTarget: document.createDocumentFragment(),
            proxy,
            mediaElement,
        });

        for (let i = 0; i < mediaElement.textTracks.length; i++) {
            const track = mediaElement.textTracks[i];
            this.orb_addTextTrack(track.kind, track.id, track.language, track.mode);
        }
        proxy.registerObserver(TEXT_TRACK_LIST_KEY, this);

        // We create a new Proxy object which we return in order to avoid ping-pong calls
        // between the iframe and the main window when the user requests a property update
        // or a function call.
        const tracksProxy = new Proxy(this, {
            get: (target, property) => {
                if (typeof target[property] === 'function') {
                    if (!evtTargetMethods.includes(property)) {
                        return function() {
                            proxy.callObserverMethod(
                                TEXT_TRACK_LIST_KEY,
                                property,
                                Array.from(arguments)
                            );
                            return target[property].apply(target, arguments);
                        };
                    }
                    return target[property].bind(target);
                }
                return target[property];
            },
            set: (target, property, value) => {
                if (typeof target[property] !== 'function') {
                    proxy.updateObserverProperties(TEXT_TRACK_LIST_KEY, {
                        [property]: value,
                    });
                }
                target[property] = value;
                return true;
            },
        });
        return tracksProxy;
    }

    return {
        prototype: prototype,
        initialise: initialise,
    };
})();

hbbtv.objects.createTextTrackList = function(mediaElement, proxy) {
    const trackList = Object.create(hbbtv.objects.TextTrackList.prototype);
    return hbbtv.objects.TextTrackList.initialise.call(trackList, mediaElement, proxy);
};/**
 * @fileOverview TextTrack class
 * @license ORB Software. Copyright (c) 2022 Ocean Blue Software Limited
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
hbbtv.objects.TextTrack = (function() {
    const prototype = Object.create(TextTrack.prototype);
    const privates = new WeakMap();
    const events = ['cuechange'];
    const evtTargetMethods = ['addEventListener', 'removeEventListener', 'dispatchEvent'];
    const roProps = ['kind', 'label', 'language', 'activeCues', 'cues', 'id'];
    const props = ['isTTML', 'isEmbedded', 'inBandMetadataTrackDispatchType', 'renderingType'];
    const TRACK_MODE_SHOWING = 'showing';
    const TRACK_MODE_HIDDEN = 'hidden';
    const TRACK_MODE_DISABLED = 'disabled';

    for (const key of events) {
        Object.defineProperty(prototype, 'on' + key, {
            set(callback) {
                const p = privates.get(this);
                if (p['on' + key]) {
                    p.eventTarget.removeEventListener(key, p['on' + key]);
                }

                if (callback instanceof Object) {
                    p['on' + key] = callback;
                    if (callback) {
                        p.eventTarget.addEventListener(key, callback);
                    }
                } else {
                    p['on' + key] = null;
                }
            },
            get() {
                return privates.get(this)['on' + key];
            },
        });
    }

    for (const key of roProps) {
        Object.defineProperty(prototype, key, {
            get() {
                return privates.get(this).properties[key];
            },
        });
    }

    for (const key of props) {
        Object.defineProperty(prototype, key, {
            set(value) {
                privates.get(this).properties[key] = value;
            },
            get() {
                return privates.get(this).properties[key];
            },
        });
    }

    Object.defineProperty(prototype, 'mode', {
        set(value) {
            const p = privates.get(this);
            if (
                value !== p.properties.mode && [TRACK_MODE_DISABLED, TRACK_MODE_HIDDEN, TRACK_MODE_SHOWING].includes(value) &&
                hbbtv.bridge.configuration.getSubtitlesEnabled()
            ) {
                if (value !== TRACK_MODE_DISABLED) {
                    for (let track of p.mediaElement.textTracks) {
                        if (track.mode === TRACK_MODE_SHOWING && track !== p.trackProxy) {
                            track.mode = TRACK_MODE_HIDDEN;
                            break;
                        }
                    }
                    p.onTimeUpdate();
                    p.mediaElement.addEventListener('timeupdate', p.onTimeUpdate, true);
                } else {
                    p.properties.activeCues.orb_clear();
                    p.mediaElement.removeEventListener('timeupdate', p.onTimeUpdate, true);
                }
                console.log("Updated mode property value to", value);
                p.properties.mode = value;
                p.mediaElement.textTracks.dispatchEvent(new Event('change'));
            }
        },
        get() {
            return privates.get(this).properties.mode;
        },
    });

    Object.defineProperty(prototype, 'default', {
        set(value) {
            privates.get(this).properties.default = !!value;
            if (value) {
                this.mode = TRACK_MODE_SHOWING;
            }
        },
        get() {
            return privates.get(this).properties.default;
        },
    });

    function makeEventTargetMethod(name) {
        return function() {
            EventTarget.prototype[name].apply(privates.get(this).eventTarget, arguments);
        };
    }

    for (const func of evtTargetMethods) {
        prototype[func] = makeEventTargetMethod(func);
    }

    prototype.addCue = function(cue) {
        const p = privates.get(this);
        p.properties.cues.orb_addCue(cue);
    };

    prototype.removeCue = function(cue) {
        const p = privates.get(this);
        p.properties.cues.orb_removeCue(cue);
        p.properties.activeCues.orb_removeCue(cue);
    };

    prototype.orb_finalize = function() {
        const p = privates.get(this);
        p.proxy.unregisterObserver(p.observerId);
        p.activeCues.orb_clear();
        p.cues.orb_clear();
        p.mediaElement.removeEventListener('timeupdate', p.onTimeUpdate, true);
        privates.delete(this);
    };

    function initialise(mediaElement, proxy, id, kind, label, language, mode) {
        const thiz = this;
        const observerId = 'TextTrack_' + id;
        const properties = {
            id,
            kind,
            label,
            language,
            renderingType: 'html',
            cues: hbbtv.objects.createTextTrackCueList(),
            activeCues: hbbtv.objects.createTextTrackCueList(),
            mode: TRACK_MODE_DISABLED,
            default: false,
        };

        proxy.registerObserver(observerId, this);

        // We create a new Proxy object which we return in order to avoid ping-pong calls
        // between the iframe and the main window when the user requests a property update
        // or a function call.
        const trackProxy = new Proxy(this, {
            get: (target, property) => {
                if (typeof target[property] === 'function') {
                    if (!evtTargetMethods.includes(property)) {
                        return function() {
                            let args = [];
                            if (property !== 'addCue') {
                                args = Array.from(arguments);
                            } else {
                                const cueObj = {};
                                for (const key in arguments[0]) {
                                    let cueProp = arguments[0][key];
                                    if (typeof cueProp !== 'function') {
                                        if (key === 'data' && cueProp) {
                                            cueProp = [...Object.keys(cueProp).map(k => cueProp[k])];
                                        }
                                        cueObj[key] = cueProp;
                                    }
                                }
                                args.push(cueObj);
                            }
                            proxy.callObserverMethod(observerId, property, args);
                            return target[property].apply(target, arguments);
                        };
                    }
                    return target[property].bind(target);
                }
                return target[property];
            },
            set: (target, property, value) => {
                if (typeof target[property] !== 'function') {
                    proxy.updateObserverProperties(observerId, {
                        [property]: value,
                    });
                }
                target[property] = value;
                return true;
            },
        });

        privates.set(this, {
            length: 0,
            initialized: true,
            eventTarget: document.createDocumentFragment(),
            onTimeUpdate: (e) => {
                const time = mediaElement.currentTime;
                let changed = false;
                for (let i = properties.activeCues.length - 1; i >= 0; --i) {
                    const cue = properties.activeCues[i];
                    if (cue.endTime < time || cue.startTime > time) {
                        properties.activeCues.orb_removeCueAt(i);
                        if (typeof cue.onexit === 'function') {
                            cue.onexit();
                        }
                        changed = true;
                    }
                }
                for (const cue of properties.cues) {
                    if (
                        cue.endTime >= time &&
                        cue.startTime <= time &&
                        properties.activeCues.orb_indexOf(cue) < 0
                    ) {
                        properties.activeCues.orb_addCue(cue);
                        if (typeof cue.onenter === 'function') {
                            cue.onenter();
                        }
                        changed = true;
                    }
                }
                if (changed) {
                    thiz.dispatchEvent(new Event('cuechange'));
                }
            },
            properties,
            mediaElement,
            observerId,
            proxy,
            trackProxy,
        });

        this.mode = mode;
        return trackProxy;
    }

    return {
        prototype,
        initialise,
    };
})();

hbbtv.objects.createTextTrack = function(mediaElement, proxy, index, kind, label, language, mode) {
    const track = Object.create(hbbtv.objects.TextTrack.prototype);
    return hbbtv.objects.TextTrack.initialise.call(
        track,
        mediaElement,
        proxy,
        index,
        kind,
        label,
        language,
        mode
    );
};/**
 * @fileOverview TextTrackCueList class
 * @license ORB Software. Copyright (c) 2022 Ocean Blue Software Limited
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
hbbtv.objects.TextTrackCueList = (function() {
    const prototype = Object.create(TextTrackCueList.prototype);
    const privates = new WeakMap();

    Object.defineProperty(prototype, 'length', {
        get() {
            return privates.get(this).length;
        },
    });

    prototype[Symbol.iterator] = function*() {
        for (let i = 0; i < this.length; ++i) {
            yield this[i];
        }
    };

    prototype.getCueById = function(id) {
        for (const cue of this) {
            if (cue.id === id.toString()) {
                return cue;
            }
        }
    };

    prototype.orb_addCue = function(cue) {
        for (const c of this) {
            if (cue === c) {
                return;
            }
        }
        const p = privates.get(this);
        
        // cue data needs to be an array of char codes
        if (Array.isArray(cue.data)) {
            cue.data = cue.data.map((e) => {
                if (typeof e === 'number') {
                    return e;
                }
                else {
                    return e.charCodeAt();
                }
            });
        }
        this[p.length] = cue;
        ++p.length;
    };

    prototype.orb_removeCue = function(cue) {
        const p = privates.get(this);
        let found = false;
        for (let i = 0; i < p.length; ++i) {
            if (found) {
                this[i - 1] = this[i];
            } else if (cue === this[i]) {
                found = true;
            }
        }
        if (found) {
            delete this[--p.length];
        }
    };

    prototype.orb_removeCueAt = function(index) {
        const p = privates.get(this);
        for (let i = index + 1; i < p.length; ++i) {
            this[i - 1] = this[i];
        }
        if (index >= 0 && index < p.length) {
            delete this[--p.length];
        }
    };

    prototype.orb_indexOf = function(cue) {
        for (let i = 0; i < this.length; ++i) {
            if (cue === this[i]) {
                return i;
            }
        }
        return -1;
    };

    prototype.orb_clear = function() {
        const p = privates.get(this);
        for (let i = 0; i < p.length; ++i) {
            delete this[i];
        }
        p.length = 0;
    };

    function initialise() {
        privates.set(this, {
            length: 0,
        });
        return this;
    }

    return {
        prototype: prototype,
        initialise: initialise,
    };
})();

hbbtv.objects.createTextTrackCueList = function() {
    const cueList = Object.create(hbbtv.objects.TextTrackCueList.prototype);
    return hbbtv.objects.TextTrackCueList.initialise.call(cueList);
};/**
 * @fileOverview OIPF Channel class
 * See: {@link https://web.archive.org/web/20200219165053/http://www.oipf.tv/web-spec/volume5.html#channel-class}
 * @license ORB Software. Copyright (c) 2022 Ocean Blue Software Limited
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

hbbtv.objects.Channel = (function() {
    const prototype = {};
    const privates = new WeakMap();

    hbbtv.utils.defineConstantProperties(prototype, {
        TYPE_TV: 0,
        TYPE_RADIO: 1,
        TYPE_OTHER: 2,
        TYPE_ALL: 128,
        TYPE_HBBTV_DATA: 256,
        ID_ANALOG: 0,
        ID_DVB_C: 10,
        ID_DVB_S: 11,
        ID_DVB_T: 12,
        ID_DVB_SI_DIRECT: 13,
        ID_DVB_C2: 14,
        ID_DVB_S2: 15,
        ID_DVB_T2: 16,
        ID_ISDB_C: 20,
        ID_ISDB_S: 21,
        ID_ISDB_T: 22,
        ID_ATSC_T: 30,
        ID_IPTV_SDS: 40,
        ID_IPTV_URI: 41,
        ID_DVB_I: 50,
        ID_DVB_DASH: 51,
        ID_OTHER: 52,
    });

    hbbtv.utils.defineGetterProperties(prototype, {
        channelType() {
            const p = privates.get(this);
            return p.channelData.channelType;
        },
        ccid() {
            const p = privates.get(this);
            return p.channelData.ccid;
        },
        dsd() {
            const p = privates.get(this);
            return p.channelData.dsd;
        },
        idType() {
            const p = privates.get(this);
            return p.channelData.idType;
        },
        nid() {
            const p = privates.get(this);
            return p.channelData.nid;
        },
        onid() {
            const p = privates.get(this);
            return p.channelData.onid;
        },
        tsid() {
            const p = privates.get(this);
            return p.channelData.tsid;
        },
        sid() {
            const p = privates.get(this);
            return p.channelData.sid;
        },
        name() {
            const p = privates.get(this);
            return p.channelData.name;
        },
        majorChannel() {
            const p = privates.get(this);
            return p.channelData.majorChannel;
        },
        terminalChannel() {
            const p = privates.get(this);
            return p.channelData.terminalChannel;
        },
        sourceID() {
            const p = privates.get(this);
            return p.channelData.sourceID;
        },
        ipBroadcastID() {
            const p = privates.get(this);
            return p.channelData.ipBroadcastID;
        },
        serviceInstances() {
            const p = privates.get(this);
            return p.serviceInstances;
        },
        parentService() {
            const p = privates.get(this);
            return p.channelData.parentService;
        },
    });

    // Initialise an instance of prototype
    function initialise(channelData) {
        privates.set(this, {});
        const p = privates.get(this);
        p.channelData = channelData; // Hold reference to caller's object
        if (channelData && channelData.serviceInstances) {
            for (const instance of channelData.serviceInstances) {
                instance.parentService = this;
            }
            p.serviceInstances = hbbtv.objects.createChannelList(channelData.serviceInstances);
        }
    }

    // Private method to get a copy of the channel data
    function cloneChannelData() {
        return Object.assign({}, privates.get(this).channelData);
    }

    prototype.toString = function() {
        return JSON.stringify(privates.get(this).channelData);
    };

    return {
        prototype: prototype,
        initialise: initialise,
        cloneChannelData: cloneChannelData,
    };
})();

hbbtv.objects.createChannel = function(channelData) {
    // Create new instance of hbbtv.objects.Channel.prototype
    const channel = Object.create(hbbtv.objects.Channel.prototype);
    hbbtv.objects.Channel.initialise.call(channel, channelData);
    return channel;
};/**
 * @fileOverview OIPF Programme class
 * See: {@link https://web.archive.org/web/20200219165053/http://www.oipf.tv/web-spec/volume5.html#programme-class}
 * @license ORB Software. Copyright (c) 2022 Ocean Blue Software Limited
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

hbbtv.objects.Programme = (function() {
    const prototype = {};
    const privates = new WeakMap();

    hbbtv.utils.defineConstantProperties(prototype, {
        ID_TVA_CRID: 0,
        ID_DVB_EVENT: 1,
        ID_TVA_GROUP_CRID: 2,
    });

    /* readonly properties */
    hbbtv.utils.defineGetterProperties(prototype, {
        parentalRatings() {
            return privates.get(this).programmeData.parentalRatings;
        },
    });

    hbbtv.utils.defineGetterSetterProperties(prototype, {
        name: {
            get: function() {
                return privates.get(this).programmeData.name;
            },
            set: function(val) {
                privates.get(this).programmeData.name = val;
            },
        },
        description: {
            get: function() {
                return privates.get(this).programmeData.description;
            },
            set: function(val) {
                privates.get(this).programmeData.description = val;
            },
        },
        longDescription: {
            get: function() {
                return privates.get(this).programmeData.longDescription;
            },
            set: function(val) {
                privates.get(this).programmeData.longDescription = val;
            },
        },
        startTime: {
            get: function() {
                return privates.get(this).programmeData.startTime;
            },
            set: function(val) {
                privates.get(this).programmeData.startTime = val;
            },
        },
        duration: {
            get: function() {
                return privates.get(this).programmeData.duration;
            },
            set: function(val) {
                privates.get(this).programmeData.duration = val;
            },
        },
        channelID: {
            get: function() {
                return privates.get(this).programmeData.channelID;
            },
            set: function(val) {
                privates.get(this).programmeData.channelID = val;
            },
        },
        programmeID: {
            get: function() {
                return privates.get(this).programmeData.programmeID;
            },
            set: function(val) {
                privates.get(this).programmeData.programmeID = val;
            },
        },
        programmeIDType: {
            get: function() {
                return privates.get(this).programmeData.programmeIDType;
            },
            set: function(val) {
                privates.get(this).programmeData.programmeIDType = val;
            },
        },
    });

    prototype.getSIDescriptors = function(
        descriptorTag,
        descriptorTagExtension = -1,
        privateDataSpecifier = 0
    ) {
        const result = hbbtv.bridge.programme.getSIDescriptors(
            privates.get(this).programmeData.channelID,
            privates.get(this).programmeData.programmeID,
            descriptorTag,
            descriptorTagExtension,
            privateDataSpecifier
        );
        return result.length > 0 ? hbbtv.objects.createCollection(result) : null;
    };

    // Initialise an instance of prototype
    function initialise(programmeData) {
        privates.set(this, {});
        const p = privates.get(this);
        p.programmeData = programmeData; // Hold reference to caller's object
    }

    // Private method to get a copy of the programme data
    function cloneProgrammeData() {
        return Object.assign({}, privates.get(this).programmeData);
    }

    /*prototype.toString = function() {
      return JSON.stringify(privates.get(this).programmeData);
   }*/

    return {
        prototype: prototype,
        initialise: initialise,
        cloneProgrammeData: cloneProgrammeData,
    };
})();

hbbtv.objects.createProgramme = function(programmeData) {
    // Create new instance of hbbtv.objects.Programme.prototype
    const programme = Object.create(hbbtv.objects.Programme.prototype);
    hbbtv.objects.Programme.initialise.call(programme, programmeData);
    return programme;
};
/**
 * @license ORB Software. Copyright (c) 2026 Ocean Blue Software Limited
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

hbbtv.objects.DASHEvent = (function() {
    const prototype = { };
    const privates = new WeakMap();

    function utf8StringToUpperHex(str) {
        const u8 = new TextEncoder().encode(str);
        let hex = "";
        for (let i = 0; i < u8.length; i += 1) {
            hex += ("0" + u8[i].toString(16)).slice(-2);
        }
        return hex.toUpperCase();
    }

    hbbtv.utils.defineGetterProperties(prototype, {
        pauseOnExit() {
            return false;
        },
        id() {
            return privates.get(this).eventData.id || "";
        },
        startTime() {
            return privates.get(this).eventData.startTime || 0;
        },
        endTime() {
            return privates.get(this).eventData.duration + this.startTime || Number.MAX_VALUE;
        },
        data() {
            return privates.get(this).eventData.data;
        }
    });

    // Initialise an instance of prototype
    function initialise(streamEvent) {
        const raw = streamEvent.DASHEvent;
        console.log(
            '[ORB-DASHEvent] initialise: raw id=' + (raw && raw.id) +
                ' startTime=' + (raw && raw.startTime) +
                ' duration=' + (raw && raw.duration) +
                ' textType=' + typeof streamEvent.text
        );
        privates.set(this, {
            eventData: streamEvent.DASHEvent,
        });
        const data = streamEvent.text;
        if (typeof(data) === "string") {
            /* TS 102 796 §9.3.2.2: DataCue.data is UTF-8 bytes in ArrayBuffer, not XMLDocument. */
            try {
                const textEncoder = new TextEncoder();
                const u8 = textEncoder.encode(data);
                streamEvent.DASHEvent.data = u8.buffer.slice(
                    u8.byteOffset,
                    u8.byteOffset + u8.byteLength);
                streamEvent.data = utf8StringToUpperHex(data);
            }
            catch(e) {
                console.warn(e.message);
            }
        }
        streamEvent.DASHEvent = this;
        console.log(
            '[ORB-DASHEvent] initialise: after wrap id=' + streamEvent.DASHEvent.id +
                ' startTime=' + streamEvent.DASHEvent.startTime +
                ' endTime=' + streamEvent.DASHEvent.endTime
        );
    }

    return {
        prototype: prototype,
        initialise: initialise
    };
})();

hbbtv.objects.createDASHEvent = function(streamEvent) {
    const obj = Object.create(hbbtv.objects.DASHEvent.prototype);
    hbbtv.objects.DASHEvent.initialise.call(obj, streamEvent);
    return obj;
};
/**
 * @fileOverview OIPF ChannelList class
 * See: {@link https://web.archive.org/web/20200219165053/http://www.oipf.tv/web-spec/volume5.html#channellist-class}
 * @license ORB Software. Copyright (c) 2022 Ocean Blue Software Limited
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

hbbtv.objects.ChannelList = (function() {
    const prototype = {};
    const privates = new WeakMap();

    Object.defineProperty(prototype, 'length', {
        get() {
            const p = privates.get(this);
            return p.channelDataList.length;
        },
    });

    // We lazily create Channel instances when they are accessed. As Channel does not modify the
    // data (or allow its consumers to) we pass a reference to the object rather a clone

    prototype.item = function(index) {
        const p = privates.get(this);
        if (index < 0 || p.channelDataList.length <= index) {
            return undefined;
        }
        return hbbtv.objects.createChannel(p.channelDataList[index]);
    };

    prototype.getChannel = function(channelID) {
        const p = privates.get(this);
        
        // Debug: Log what we're searching for and what's available
        console.log('[ChannelList.getChannel] Searching for channelID:', channelID);
        const channelInfo = [];
        for (let i = 0; i < p.channelDataList.length; i++) {
            const ch = p.channelDataList[i];
            channelInfo.push('Channel ' + i + ': ccid="' + (ch.ccid || '') + '", ipBroadcastID="' + (ch.ipBroadcastID || '') + '", name="' + (ch.name || '') + '"');
        }
        console.log('[ChannelList.getChannel] Available channels (' + p.channelDataList.length + '):', channelInfo.join('; '));
        
        const channelData = p.channelDataList
            .filter((channel) => {
                return (channel.ccid && channel.ccid === channelID) ||
                    (channel.ipBroadcastID && channel.ipBroadcastID === channelID);
            })
            .pop();
        if (channelData) {
            console.log('[ChannelList.getChannel] Found channel:', {
                ccid: channelData.ccid,
                ipBroadcastID: channelData.ipBroadcastID,
                name: channelData.name
            });
            return hbbtv.objects.createChannel(channelData);
        }
        console.warn('[ChannelList.getChannel] No channel found for channelID:', channelID);
        return null;
    };

    prototype.getChannelByTriplet = function(onid, tsid, sid, nid) {
        return this.findChannel({
            onid: onid,
            tsid: tsid,
            sid: sid,
            nid: nid,
        });
    };

    // Note: non enumerable function for internal use
    Object.defineProperty(prototype, 'findChannel', {
        writable: false,
        value: function(props) {
            function isMatch(channel) {
                for (let key in props) {
                    if (props[key] != undefined && props[key] !== channel[key]) {
                        return false;
                    }
                }
                return true;
            }
            const p = privates.get(this);
            // HbbTV TS 102 796 clause O.5.2: getChannelByTriplet shall prefer DVB-I
            // Channel objects over classic RF when both are present in the ChannelList:
            //  1) DVB-I service (IdentifierTriplet) -> return that service
            //  2) DVB-I service instance (RF triplet) -> return that instance
            //  3) If both 1 and 2 apply -> return the service
            // Classic RF / other Channel objects are used only when neither applies.
            let serviceMatch = undefined;
            let instanceMatch = undefined;
            let otherMatch = undefined;
            for (let channel of p.channelDataList) {
                if (channel.serviceInstances) {
                    if (!serviceMatch && isMatch(channel)) {
                        serviceMatch = channel;
                    }
                    if (!instanceMatch) {
                        for (let instance of channel.serviceInstances) {
                            if (isMatch(instance)) {
                                instance.parentService = channel;
                                instanceMatch = instance;
                                break;
                            }
                        }
                    }
                    if (serviceMatch && instanceMatch) {
                        break;
                    }
                } else if (!otherMatch && isMatch(channel)) {
                    otherMatch = channel;
                }
            }
            const channelData = serviceMatch || instanceMatch || otherMatch;
            if (channelData) {
                return hbbtv.objects.createChannel(channelData);
            }
            return null;
        },
    });

    function initialise(data) {
        privates.set(this, {});
        const p = privates.get(this);
        if (!data) {
            // Keeps reference to channel data
            getChannelList(p, false);
        } else {
            p.channelDataList = data;
        }
    }

    function getChannelList(p, thrw) {
        try {
            p.channelDataList = hbbtv.bridge.broadcast.getChannelList();
        } catch (e) {
            if (e.name === 'SecurityError') {
                /* App is broadcast independent, SecurityError will be thrown later */
                p.channelDataList = null;
            }
            if (thrw) {
                throw e;
            }
        }
    }

    return {
        prototype: prototype,
        initialise: initialise,
    };
})();

hbbtv.objects.ChannelListProxy = {
    get: function(target, name, receiver) {
        if (name in target) {
            const origMethod = target[name];
            if (origMethod instanceof Function) {
                return function(...args) {
                    return origMethod.apply(target, args);
                };
            }
            return target[name];
        }
        if (typeof name === 'string' || name instanceof String) {
            const index = parseInt(name);
            if (!isNaN(index)) {
                return target.item(index);
            }
        }
    },
};

hbbtv.objects.createChannelList = function(data) {
    const channelList = Object.create(hbbtv.objects.ChannelList.prototype);
    hbbtv.objects.ChannelList.initialise.call(channelList, data);
    return new Proxy(channelList, hbbtv.objects.ChannelListProxy);
};/**
 * @fileOverview OIPF ChannelConfig class
 * See: {@link https://web.archive.org/web/20200219165053/http://www.oipf.tv/web-spec/volume5.html#channelconfig-class}
 * @license ORB Software. Copyright (c) 2022 Ocean Blue Software Limited
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

hbbtv.objects.ChannelConfig = (function() {
    const prototype = {};
    const privates = new WeakMap();

    Object.defineProperty(prototype, 'channelList', {
        get() {
            const p = privates.get(this);
            if (!p.isBroadcastRelated) {
                throw new DOMException('', 'SecurityError');
            }
            return p.channelList;
        },
    });

    function initialise() {
        privates.set(this, {});
        const p = privates.get(this);
        p.isBroadcastRelated = true;
        p.channelList = hbbtv.objects.createChannelList();
    }

    function setIsBroadcastRelated(value) {
        const p = privates.get(this);
        p.isBroadcastRelated = value;
    }

    return {
        prototype: prototype,
        initialise: initialise,
        setIsBroadcastRelated: setIsBroadcastRelated,
    };
})();

hbbtv.objects.createChannelConfig = function() {
    const channelConfig = Object.create(hbbtv.objects.ChannelConfig.prototype);
    hbbtv.objects.ChannelConfig.initialise.call(channelConfig);
    return channelConfig;
};/**
 * @fileOverview OIPF configuration object.
 * See: {@link https://web.archive.org/web/20200219165053/http://www.oipf.tv/web-spec/volume5.html#application-oipfconfiguration}
 * @license ORB Software. Copyright (c) 2022 Ocean Blue Software Limited
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

hbbtv.objects.OipfConfiguration = (function() {
    const prototype = Object.create(HTMLObjectElement.prototype);
    const privates = new WeakMap();

    Object.defineProperty(prototype, 'configuration', {
        get() {
            return privates.get(this).configuration;
        },
    });

    Object.defineProperty(prototype, 'localSystem', {
        get() {
            return privates.get(this).localSystem;
        },
    });

    function initialise() {
        privates.set(this, {});
        const p = privates.get(this);
        p.configuration = hbbtv.objects.createConfiguration();
        p.localSystem = hbbtv.objects.createLocalSystem();
    }

    return {
        prototype: prototype,
        initialise: initialise,
    };
})();

hbbtv.objects.upgradeToOipfConfiguration = function(object) {
    Object.setPrototypeOf(object, hbbtv.objects.OipfConfiguration.prototype);
    hbbtv.objects.OipfConfiguration.initialise.call(object);
};

hbbtv.objectManager.registerObject({
    name: 'application/oipfconfiguration',
    mimeTypes: ['application/oipfconfiguration'],
    oipfObjectFactoryMethodName: 'createConfigurationObject',
    upgradeObject: function(object) {
        hbbtv.objects.upgradeToOipfConfiguration(object);
    },
});/**
 * @fileOverview Configuration class
 * See: {@link https://web.archive.org/web/20200219165053/http://www.oipf.tv/web-spec/volume5.html#configuration-class}
 * @license ORB Software. Copyright (c) 2022 Ocean Blue Software Limited
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

hbbtv.objects.Configuration = (function() {
    const prototype = {};
    let gIsPendingAccessCallback = false;

    hbbtv.utils.defineGetterProperties(prototype, {
        preferredAudioLanguage: hbbtv.bridge.configuration.getPreferredAudioLanguage,
        // preferredAudioLanguage47 only supported since 2.0.4
        preferredAudioLanguage47: hbbtv.bridge.configuration.getPreferredAudioLanguage47,
        preferredSubtitleLanguage: hbbtv.bridge.configuration.getPreferredSubtitleLanguage,
        // preferredSubtitleLanguage47 only supported since 2.0.4
        preferredSubtitleLanguage47: hbbtv.bridge.configuration.getPreferredSubtitleLanguage47,
        preferredUILanguage: hbbtv.bridge.configuration.getPreferredUILanguage,
        // preferredUILanguage47: HbbTV A.2.20.6; BCP-47, same order as preferredUILanguage
        preferredUILanguage47() {
            return hbbtv.languageCodes.iso639_2ListToBcp47(
                hbbtv.bridge.configuration.getPreferredUILanguage()
            );
        },
        countryId: hbbtv.bridge.configuration.getCountryId,
        subtitlesEnabled: hbbtv.bridge.configuration.getSubtitlesEnabled,
        audioDescriptionEnabled: hbbtv.bridge.configuration.getAudioDescriptionEnabled,
        cleanAudioEnabled: hbbtv.bridge.configuration.getCleanAudioEnabled,
        timeShiftSynchronized() {
            return false; // PVR
        },
        dtt_network_ids: hbbtv.bridge.configuration.getDttNetworkIds,
        deviceId: hbbtv.bridge.configuration.getDeviceId,
    });

    prototype.requestAccessToDistinctiveIdentifier = function(callback) {
        const wrapper = (event) => {
            // One shot event
            hbbtv.bridge.removeStrongEventListener('accesstodistinctiveidentifier', wrapper);
            callback(event.allowAccess);
            gIsPendingAccessCallback = false;
        };
        hbbtv.bridge.addStrongEventListener('accesstodistinctiveidentifier', wrapper);
        if (!gIsPendingAccessCallback) {
            gIsPendingAccessCallback = true;
            hbbtv.bridge.configuration.requestAccessToDistinctiveIdentifier();
        }
    };

    function initialise() {}

    return {
        prototype: prototype,
        initialise: initialise,
    };
})();

hbbtv.objects.createConfiguration = function() {
    const configuration = Object.create(hbbtv.objects.Configuration.prototype);
    hbbtv.objects.Configuration.initialise.call(configuration);
    return configuration;
};
/**
 * @fileOverview LocalSystem class
 * See: {@link https://web.archive.org/web/20200219165053/http://www.oipf.tv/web-spec/volume5.html#localsystem-class}
 * @license ORB Software. Copyright (c) 2022 Ocean Blue Software Limited
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

hbbtv.objects.LocalSystem = (function() {
    const prototype = {};
    let gLocalSystem = null;

    Object.defineProperty(prototype, 'modelName', {
        get() {
            return getLocalSystem().modelName;
        },
    });

    Object.defineProperty(prototype, 'vendorName', {
        get() {
            return getLocalSystem().vendorName;
        },
    });

    Object.defineProperty(prototype, 'softwareVersion', {
        get() {
            return getLocalSystem().softwareVersion;
        },
    });

    Object.defineProperty(prototype, 'hardwareVersion', {
        get() {
            return getLocalSystem().hardwareVersion;
        },
    });

    function initialise() {}

    function getLocalSystem() {
        if (gLocalSystem === null) {
            gLocalSystem = hbbtv.bridge.configuration.getLocalSystem();
        }
        return gLocalSystem;
    }

    return {
        prototype: prototype,
        initialise: initialise,
    };
})();

hbbtv.objects.createLocalSystem = function() {
    const localSystem = Object.create(hbbtv.objects.LocalSystem.prototype);
    hbbtv.objects.LocalSystem.initialise.call(localSystem);
    return localSystem;
};/**
 * @fileOverview application/oipfcapabilities embedded object.
 * @license ORB Software. Copyright (c) 2022 Ocean Blue Software Limited
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * HbbTV programming interface: application/oipfcapabilities embedded object.
 *
 * Specifiations:
 * HBBTV.
 * <p>
 * Important sections, in brief:
 * HBBTV A.1 (Detailed section-by-section definition for volume 5);
 * OIPF DAE 7.15.3 (The application/oipfCapabilities embedded object);
 * HBBTV 10.2.4 (HbbTV reported capabilities and option strings);
 * HBBTV A.2.15 (Extensions to the OIPF-defined capability negotiation mechanism);
 * OIPF DAE (9.3 Client capability description);
 * HBBTV A.2.30 (Extensions and clarifications to the application/oipfCapabilities embedded object);
 * HBBTV A.2.1 (Resource management).
 *
 * @name OipfCapabilities
 * @class
 * @constructor
 */
hbbtv.objects.OipfCapabilities = (function() {
    const prototype = Object.create(HTMLObjectElement.prototype);

    let gSharedProfileNames = null;

    /**
     * Specifications:
     * HBBTV A.1/OIPF DAE 7.15.3 (The application/oipfCapabilities embedded object);
     * HBBTV 10.2.4 (HbbTV reported capabilities and option strings);
     * HBBTV A.2.15 (Extensions to the OIPF-defined capability negotiation mechanism);
     * OIPF DAE (9.3 Client capability description).
     * <p>
     * Security: none.
     *
     * @returns {Document}
     *
     * @name xmlCapabilities
     * @readonly
     * @memberof OipfCapabilities#
     */
    Object.defineProperty(prototype, 'xmlCapabilities', {
        get: function() {
            return createXmlCapabilities();
        },
    });

    /**
     * Specifications:
     * HBBTV A.1/OIPF DAE 7.15.3 (The application/oipfCapabilities embedded object);
     * HBBTV A.2.30 (Extensions and clarifications to the application/oipfCapabilities embedded
     *    object);
     * HBBTV A.2.1 (Resource management).
     * <p>
     * Security: none.
     *
     * @returns {number}
     *
     * @name extraSDVideoDecodes
     * @readonly
     * @memberof OipfCapabilities#
     */
    Object.defineProperty(prototype, 'extraSDVideoDecodes', {
        get: function() {
            return hbbtv.bridge.configuration.getExtraSDVideoDecodes();
        },
    });

    /**
     * Specifications:
     * HBBTV A.1/OIPF DAE 7.15.3 (The application/oipfCapabilities embedded object);
     * HBBTV A.2.30 (Extensions and clarifications to the application/oipfCapabilities embedded
     *    object);
     * HBBTV A.2.1 (Resource management).
     * <p>
     * Security: none.
     *
     * @returns {number}
     *
     * @name extraHDVideoDecodes
     * @readonly
     * @memberof OipfCapabilities#
     */
    Object.defineProperty(prototype, 'extraHDVideoDecodes', {
        get: function() {
            return hbbtv.bridge.configuration.getExtraHDVideoDecodes();
        },
    });

    /**
     * Specifications:
     * HBBTV A.1/OIPF DAE 7.15.3 (The application/oipfCapabilities embedded object);
     * HBBTV A.2.30 (Extensions and clarifications to the application/oipfCapabilities embedded
     *    object).
     * <p>
     * Security: none.
     *
     * @returns {number}
     *
     * @name extraUHDVideoDecodes
     * @readonly
     * @memberof OipfCapabilities#
     */
    Object.defineProperty(prototype, 'extraUHDVideoDecodes', {
        get: function() {
            return hbbtv.bridge.configuration.getExtraUHDVideoDecodes();
        },
    });

    /**
     * Specifications:
     * HBBTV A.1/OIPF DAE 7.13.1 (The video/broadcast embedded object);
     * HBBTV A.2.4 (Extensions to the video/broadcast object);
     * OIPF DAE 9.3 (Client capability description).
     * <p>
     * Security: none.
     *
     * @returns {boolean}
     *
     * @method
     * @memberof OipfCapabilities#
     */
    prototype.hasCapability = function(profileName) {
        if (gSharedProfileNames === null) {
            const capabilities = hbbtv.bridge.configuration.getCapabilities();
            gSharedProfileNames = ['OITF_HD_UIPROF'];
            gSharedProfileNames = gSharedProfileNames.concat(capabilities.optionStrings);
            gSharedProfileNames = gSharedProfileNames.concat(capabilities.profileNameFragments);
            Object.freeze(gSharedProfileNames);
        }
        return gSharedProfileNames.includes(profileName);
    };

    /**
     * Specifications:
     * HBBTV-TA-1 v1.1.1 A.2.2 (StringCollection broadbandCapabilities( Number decoderIndex )).
     * <p>
     * Returns the maximum (static) broadband media decoding capabilities for the indicated decoder.
     * These may not be available at a particular moment in time. A dynamic indication of what is
     * available is provided by the properties extraSDVideoDecodes, extraHDVideoDecodes and
     * extraUHDVideoDecodes. This method shall only return stream decoding capabilities and shall
     * ignore a terminal's capabilities to output streams simultaneously.
     * <p>
     * Media decoders shall be numbered from 1 increasing in steps of 1 up to the total number of
     * media decoders in the terminal. If decoderIndex is greater than the number of media decoders
     * then null shall be returned. Decoders shall be ordered in decreasing capabilities, i.e. decoders
     * supporting UHD shall be listed before those not supporting UHD and decoders supporting HD
     * shall be listed before those not supporting HD.
     * <p>
     * Each String returned shall be one of the &lt;video_profile&gt; elements returned by the
     * xmlCapabilities property.
     * <p>
     * Security: none.
     *
     * @param {number} decoderIndex - The decoder index (1-based, starting from 1)
     * @returns {Object|null} A StringCollection of XML strings representing video_profile elements
     *                        for the decoder, or null if decoderIndex is greater than the number of decoders
     *
     * @method
     * @memberof OipfCapabilities#
     */
    prototype.broadbandCapabilities = function(decoderIndex) {
        if (typeof decoderIndex !== 'number' || decoderIndex < 1 || !Number.isInteger(decoderIndex)) {
            return null;
        }

        const profileXmlStrings = hbbtv.bridge.configuration.getBroadbandCapabilities(decoderIndex);
        if (profileXmlStrings === null || profileXmlStrings === undefined) {
            return null;
        }

        // Convert array of XML strings to StringCollection
        return hbbtv.objects.createCollection(profileXmlStrings);
    };

    /**
     * Specifications:
     * HBBTV-TA-1 v1.1.1 A.2.2 (StringCollection broadcastCapabilities( Number decoderIndex )).
     * <p>
     * Returns the maximum (static) broadcast media decoding capabilities for the indicated decoder.
     * These may not be available at a particular moment in time. A dynamic indication of what is
     * available is provided by the properties extraSDVideoDecodes, extraHDVideoDecodes and
     * extraUHDVideoDecodes. This method shall only return stream decoding capabilities and shall
     * ignore a terminal's capabilities to output streams simultaneously.
     * <p>
     * Media decoders shall be numbered from 1 increasing in steps of 1 up to the total number of
     * media decoders in the terminal. If decoderIndex is greater than the number of media decoders
     * then null shall be returned. Decoders shall be ordered in decreasing capabilities, i.e. decoders
     * supporting UHD shall be listed before those not supporting UHD and decoders supporting HD
     * shall be listed before those not supporting HD.
     * <p>
     * Each String returned shall be one of the URNs returned as the value of a &lt;broadcast&gt;
     * element returned by the xmlCapabilities property.
     * <p>
     * Security: none.
     *
     * @param {number} decoderIndex - The decoder index (1-based, starting from 1)
     * @returns {Object|null} A StringCollection of URN strings for the decoder, or null if
     *                        decoderIndex is greater than the number of decoders
     *
     * @method
     * @memberof OipfCapabilities#
     */
    prototype.broadcastCapabilities = function(decoderIndex) {
        if (typeof decoderIndex !== 'number' || decoderIndex < 1 || !Number.isInteger(decoderIndex)) {
            return null;
        }

        const urnStrings = hbbtv.bridge.configuration.getBroadcastCapabilities(decoderIndex);
        if (urnStrings === null || urnStrings === undefined) {
            return null;
        }

        // Convert array of URN strings to StringCollection
        return hbbtv.objects.createCollection(urnStrings);
    };

    function createXmlCapabilities() {
        const capabilities = hbbtv.bridge.configuration.getCapabilities();
        const audioProfiles = hbbtv.bridge.configuration.getAudioProfiles();
        const videoProfiles = hbbtv.bridge.configuration.getVideoProfiles();
        console.log('createXmlCapabilities videoProfiles');
        console.log(videoProfiles);
        console.log(JSON.stringify(videoProfiles));

        const videoDisplayFormats = hbbtv.bridge.configuration.getVideoDisplayFormats();

        const ns = 'urn:hbbtv:config:oitf:oitfCapabilities:2017-1';
        const doc = document.implementation.createDocument(ns, 'profilelist', null);
        doc.documentElement.setAttribute('xmlns:xsi', 'http://www.w3.org/2001/XMLSchema-instance');
        doc.documentElement.setAttribute(
            'xsi:schemaLocation',
            'urn:hbbtv:config:oitf:oitfCapabilities:2017-1 ' + 'config-hbbtv-oitfCapabilities.xsd'
        );

        // ui_profile
        const uiProfileElement = doc.createElementNS(ns, 'ui_profile');

        let uiProfileNames = ['OITF_HD_UIPROF'];
        uiProfileNames.push.apply(uiProfileNames, capabilities.optionStrings);
        uiProfileNames.push.apply(uiProfileNames, capabilities.profileNameFragments);
        uiProfileElement.setAttribute('name', uiProfileNames.join(''));
        doc.documentElement.appendChild(uiProfileElement);

        // ext
        const extElement = doc.createElementNS(ns, 'ext');
        uiProfileElement.appendChild(extElement);

        // parentalcontrol
        const parentalcontrolElement = doc.createElementNS(ns, 'parentalcontrol');
        parentalcontrolElement.setAttribute('schemes', capabilities.parentalSchemes.join(' '));
        parentalcontrolElement.append('true');
        extElement.appendChild(parentalcontrolElement);

        // clientMetadata
        const clientMetadataElement = doc.createElementNS(ns, 'clientMetadata');
        clientMetadataElement.setAttribute('type', 'dvb-si');
        clientMetadataElement.append('true');
        extElement.appendChild(clientMetadataElement);

        // temporalClipping
        const temporalClippingElement = doc.createElementNS(ns, 'temporalClipping');
        extElement.appendChild(temporalClippingElement);

        // ta (Test Application profiles for HbbTV-TA)
        const taElement = doc.createElementNS(ns, 'ta');
        taElement.setAttribute('version', '1.1.1');
        
        // Add profile 2019:1 (basic profile)
        const profile1Element = doc.createElementNS(ns, 'profile');
        profile1Element.appendChild(doc.createTextNode('urn:hbbtv:ta:profile:2019:1'));
        taElement.appendChild(profile1Element);
        
        // Add profile 2019:2 (enhanced profile)
        const profile2Element = doc.createElementNS(ns, 'profile');
        profile2Element.appendChild(doc.createTextNode('urn:hbbtv:ta:profile:2019:2'));
        taElement.appendChild(profile2Element);
        
        extElement.appendChild(taElement);

        // graphicsPerformance
        if (typeof capabilities.graphicsLevels === 'object') {
            const graphicsPerformanceElement = doc.createElementNS(ns, 'graphicsPerformance');
            graphicsPerformanceElement.setAttribute('level', capabilities.graphicsLevels.join(' '));
            extElement.appendChild(graphicsPerformanceElement);
        }

        // audio_profile
        audioProfiles.forEach(function(profile) {
            const element = doc.createElementNS(ns, 'audio_profile');
            element.setAttribute('name', profile.name);
            element.setAttribute('type', profile.type);
            if (typeof profile.transport === 'string') {
                element.setAttribute('transport', profile.transport);
            }
            if (typeof profile.syncTl === 'string') {
                element.setAttribute('sync_tl', profile.syncTl);
            }
            if (typeof profile.drmSystemId === 'string') {
                element.setAttribute('DRMSystemID', profile.drmSystemId);
            }
            doc.documentElement.appendChild(element);
        });

        // video_profile
        videoProfiles.forEach(function(profile) {
            const element = doc.createElementNS(ns, 'video_profile');
            element.setAttribute('name', profile.name);
            element.setAttribute('type', profile.type);
            if (typeof profile.transport === 'string') {
                element.setAttribute('transport', profile.transport);
            }
            if (typeof profile.syncTl === 'string') {
                element.setAttribute('sync_tl', profile.syncTl);
            }
            if (typeof profile.drmSystemId === 'string') {
                element.setAttribute('DRMSystemID', profile.drmSystemId);
            }
            if (typeof profile.hdr === 'string') {
                element.setAttribute('hdr', profile.hdr);
            }
            doc.documentElement.appendChild(element);
        });

        // drm (CI+ - uses the live status kept by drmManager for the SAS handshake)
        const status = hbbtv.drmManager.getCSPGCIPlusStatus();
        if (status) {
            status.DRMSystemIDs.forEach((value) => {
                const drm = doc.createElementNS(ns, 'drm');
                drm.setAttribute('DRMSystemID', value);
                if (status.protectionGateways) {
                    drm.setAttribute('protectionGateways', status.protectionGateways);
                }
                if (status.supportedFormats) {
                    drm.append(status.supportedFormats);
                }
                extElement.appendChild(drm);
            });
        }

        // drm (other DRM systems reported by the terminal, e.g. PlayReady, Widevine).
        // CI+ is already emitted above, so skip it here to avoid duplicate <drm> elements.
        hbbtv.drmManager.getSupportedDRMSystems().forEach((system) => {
            if (system.DRMSystem === 'CIPLUS' || !system.DRMSystemIDs) {
                return;
            }
            system.DRMSystemIDs.forEach((value) => {
                const drm = doc.createElementNS(ns, 'drm');
                drm.setAttribute('DRMSystemID', value);
                if (system.protectionGateways) {
                    drm.setAttribute('protectionGateways', system.protectionGateways);
                }
                if (system.supportedFormats) {
                    drm.append(system.supportedFormats);
                }
                extElement.appendChild(drm);
            });
        });

        // html5_media
        const html5MediaElement = doc.createElementNS(ns, 'html5_media');
        html5MediaElement.append('true');
        doc.documentElement.appendChild(html5MediaElement);

        // broadcast
        if (typeof capabilities.broadcastUrns === 'object') {
            capabilities.broadcastUrns.forEach(function(urn) {
                const element = doc.createElementNS(ns, 'broadcast');
                element.append(urn);
                extElement.appendChild(element);
            });
        }

        // video_display_format
        if (typeof videoDisplayFormats === 'object') {
            videoDisplayFormats.forEach(function(format) {
                const element = doc.createElementNS(ns, 'video_display_format');
                element.setAttribute('width', format.width);
                element.setAttribute('height', format.height);
                element.setAttribute('frame_rate', format.frameRate);
                element.setAttribute('bit_depth', format.bitDepth);
                element.setAttribute('colorimetry', format.colorimetry);
                extElement.appendChild(element);
            });
        }

        // display_size
        const displaySizeElement = doc.createElementNS(ns, 'display_size');
        displaySizeElement.setAttribute('width', capabilities.displaySizeWidth);
        displaySizeElement.setAttribute('height', capabilities.displaySizeHeight);
        displaySizeElement.setAttribute(
            'measurement_type',
            capabilities.displaySizeMeasurementType
        );
        extElement.appendChild(displaySizeElement);

        // audio_system
        if (typeof capabilities.audioOutputFormat === 'string') {
            const element = doc.createElementNS(ns, 'audio_system');
            element.setAttribute('audio_output_format', capabilities.audioOutputFormat);
            if (typeof capabilities.passThroughStatus === 'boolean') {
                element.setAttribute('pass_through', capabilities.passThroughStatus);
            }
            extElement.appendChild(element);
        }

        // html5_media_variable_rate
        if (
            typeof capabilities.html5MediaVariableRateMin === 'string' &&
            typeof capabilities.html5MediaVariableRateMax === 'string'
        ) {
            const element = doc.createElementNS(ns, 'html5_media_variable_rate');
            element.setAttribute('min', capabilities.html5MediaVariableRateMin);
            element.setAttribute('max', capabilities.html5MediaVariableRateMax);
            extElement.appendChild(element);
        }

        // json_rpc_server
        if (
            typeof capabilities.jsonRpcServerUrl === 'string' &&
            typeof capabilities.jsonRpcServerVersion === 'string'
        ) {
            const element = doc.createElementNS(ns, 'json_rpc_server');
            element.setAttribute('url', capabilities.jsonRpcServerUrl);
            element.setAttribute('version', capabilities.jsonRpcServerVersion);
            extElement.appendChild(element);
        }

        return doc;
    }

    function initialise() {}

    return {
        prototype: prototype,
        initialise: initialise,
    };
})();

hbbtv.objects.upgradeToOipfCapabilities = function(object) {
    Object.setPrototypeOf(object, hbbtv.objects.OipfCapabilities.prototype);
    hbbtv.objects.OipfCapabilities.initialise.call(object);
};

hbbtv.objectManager.registerObject({
    name: 'application/oipfcapabilities',
    mimeTypes: ['application/oipfcapabilities'],
    oipfObjectFactoryMethodName: 'createCapabilitiesObject',
    upgradeObject: hbbtv.objects.upgradeToOipfCapabilities,
});/**
 * @fileOverview video/broadcast embedded object
 * @license ORB Software. Copyright (c) 2022 Ocean Blue Software Limited
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * HbbTV programming interface: video/broadcast embedded object.
 *
 * Specifiations:
 * HBBTV.
 * <p>
 * Important sections, in brief:
 * HBBTV A.1 (Detailed section-by-section definition for volume 5);
 * OIPF DAE 7.13.1 (The video/broadcast embedded object);
 * OIPF DAE 7.13.3 (Extensions to video/broadcast for access to EIT p/f);
 * OIPF DAE 7.13.4 (Extensions to video/broadcast for playback of selected components);
 * OIPF DAE 7.13.5 (Extensions to video/broadcast for parental ratings errors);
 * OIPF DAE 7.13.7 (Extensions to video/broadcast for current channel information);
 * HBBTV 8.2.1.1 (Adding and removing stream event listeners);
 * HBBTV 9.7.1 (Synchronization and video objects);
 * HBBTV 10.2.7 (Component selection);
 * HBBTV A.2.1 (Resource management);
 * HBBTV A.2.4 (Extensions to the video/broadcast object);
 * HBBTV A.2.14 (Modifications to clause H.2 "Interaction with the video/broadcast and ...");
 * HBBTV A.2.17 (Notification of change of components).
 *
 * @name VideoBroadcast
 * @class
 * @constructor
 */
hbbtv.objects.VideoBroadcast = (function() {
    const prototype = Object.create(HTMLObjectElement.prototype);
    const privates = new WeakMap();

    const PLAY_STATE_UNREALIZED = 0;
    const PLAY_STATE_CONNECTING = 1;
    const PLAY_STATE_PRESENTING = 2;
    const PLAY_STATE_STOPPED = 3;

    const CHANNEL_STATUS_UNREALIZED = -4;
    const CHANNEL_STATUS_PRESENTING = -3;
    const CHANNEL_STATUS_CONNECTING = -2;
    const CHANNEL_STATUS_CONNECTING_RECOVERY = -1;
    const CHANNEL_STATUS_WRONG_TUNER = 0;
    const CHANNEL_STATUS_NO_SIGNAL = 1;
    const CHANNEL_STATUS_TUNER_IN_USE = 2;
    const CHANNEL_STATUS_PARENTAL_LOCKED = 3;
    const CHANNEL_STATUS_ENCRYPTED = 4;
    const CHANNEL_STATUS_UNKNOWN_CHANNEL = 5;
    const CHANNEL_STATUS_INTERRUPTED = 6;
    const CHANNEL_STATUS_RECORDING_IN_PROGRESS = 7;
    const CHANNEL_STATUS_CANNOT_RESOLVE_URI = 8;
    const CHANNEL_STATUS_INSUFFICIENT_BANDWIDTH = 9;
    const CHANNEL_STATUS_CANNOT_BE_CHANGED = 10;
    const CHANNEL_STATUS_INSUFFICIENT_RESOURCES = 11;
    const CHANNEL_STATUS_CHANNEL_NOT_IN_TS = 12;
    const CHANNEL_STATUS_UNKNOWN_ERROR = 100;

    const COMPONENT_TYPE_ANY = -1;
    const COMPONENT_TYPE_VIDEO = 0;
    const COMPONENT_TYPE_AUDIO = 1;
    const COMPONENT_TYPE_SUBTITLE = 2;

    const ERROR_TUNER_UNAVAILABLE = 2;
    const ERROR_UNKNOWN_CHANNEL = 5;
    const LINKED_APP_SCHEME_1_1 = "urn:dvb:metadata:cs:LinkedApplicationCS:2019:1.1";

    let gActiveStateOwner = null;
    let gBroadbandAvInUse = false;
    const gGarbageCollectionBlocked = new Set();

    const gObjectFinalizedWhileActive = hbbtv.utils.createFinalizationRegistry(() => {
        setVideoRectangle(0, 0, 1280, 720, true, false);
        hbbtv.bridge.broadcast.setPresentationSuspended(gBroadbandAvInUse);
        gActiveStateOwner = null;
    });

    // Constants

    /**
     * Specifications:
     * HBBTV A.1/OIPF DAE 7.13.4 (Extensions to video/broadcast for playback of selected components);
     * HBBTV A.2.17 (Notification of change of components).
     *
     * @returns {number}
     *
     * @name COMPONENT_TYPE_VIDEO
     * @constant
     * @memberof VideoBroadcast#
     */
    Object.defineProperty(prototype, 'COMPONENT_TYPE_VIDEO', {
        value: COMPONENT_TYPE_VIDEO,
    });

    /**
     * Specifications:
     * HBBTV A.1/OIPF DAE 7.13.4 (Extensions to video/broadcast for playback of selected components);
     * HBBTV A.2.17 (Notification of change of components).
     *
     * @returns {number}
     *
     * @name COMPONENT_TYPE_AUDIO
     * @constant
     * @memberof VideoBroadcast#
     */
    Object.defineProperty(prototype, 'COMPONENT_TYPE_AUDIO', {
        value: COMPONENT_TYPE_AUDIO,
    });

    /**
     * Specifications:
     * HBBTV A.1/OIPF DAE 7.13.4 (Extensions to video/broadcast for playback of selected components);
     * HBBTV A.2.17 (Notification of change of components).
     *
     * @returns {number}
     *
     * @name COMPONENT_TYPE_SUBTITLE
     * @constant
     * @memberof VideoBroadcast#
     */
    Object.defineProperty(prototype, 'COMPONENT_TYPE_SUBTITLE', {
        value: COMPONENT_TYPE_SUBTITLE,
    });

    // Properties

    /**
     * Specifications:
     * HBBTV A.1/OIPF DAE 7.13.1 (The video/broadcast embedded object);
     * HBBTV A.2.4 (Extensions to the video/broadcast object).
     * <p>
     * Security: none.
     *
     * @returns {boolean}
     *
     * @name fullScreen
     * @readonly
     * @memberof VideoBroadcast#
     */
    Object.defineProperty(prototype, 'fullScreen', {
        get: function() {
            return privates.get(this).fullScreen;
        },
    });

    /**
     * Specifications:
     * HBBTV A.1/OIPF DAE 7.13.1 (The video/broadcast embedded object);
     * HBBTV A.2.4 (Extensions to the video/broadcast object).
     * <p>
     * Security: none.
     *
     * @returns {number}
     *
     * @name playState
     * @readonly
     * @memberof VideoBroadcast#
     */
    Object.defineProperty(prototype, 'playState', {
        get: function() {
            return privates.get(this).playState;
        },
    });

    /**
     * Specifications:
     * HBBTV A.1/OIPF DAE 7.13.1 (The video/broadcast embedded object);
     * HBBTV A.2.4 (Extensions to the video/broadcast object).
     * <p>
     * Security: none.
     *
     * @returns {string}
     *
     * @name data
     * @readonly
     * @memberof VideoBroadcast#
     */
    Object.defineProperty(prototype, 'data', {
        get: function() {
            return '';
        },
        set: function() {},
    });

    /**
     * Specifications:
     * HBBTV A.1/OIPF DAE 7.13.1 (The video/broadcast embedded object);
     * HBBTV A.2.4 (Extensions to the video/broadcast object).
     * <p>
     * Security: none.
     *
     * @returns {number}
     *
     * @name height
     * @readonly
     * @memberof VideoBroadcast#
     */
    Object.defineProperty(prototype, 'height', {
        get: function() {
            return this.offsetHeight;
        },
        set: function(val) {
            if (this.fullScreen) {
                throw new TypeError('"height" is read-only');
            } else {
                this.style.height = val;
            }
        },
    });

    /**
     * Specifications:
     * HBBTV A.1/OIPF DAE 7.13.1 (The video/broadcast embedded object);
     * HBBTV A.2.4 (Extensions to the video/broadcast object).
     * <p>
     * Security: none.
     *
     * @returns {number}
     *
     * @name width
     * @readonly
     * @memberof VideoBroadcast#
     */
    Object.defineProperty(prototype, 'width', {
        get: function() {
            return this.offsetWidth;
        },
        set: function(val) {
            if (this.fullScreen) {
                throw new TypeError('"width" is read-only');
            } else {
                this.style.width = val;
            }
        },
    });

    /**
     * Specifications:
     * HBBTV A.1/OIPF DAE 7.13.1 (The video/broadcast embedded object);
     * HBBTV A.2.4 (Extensions to the video/broadcast object).
     * <p>
     * Security: none.
     *
     * @returns {function}
     *
     * @name onfocus
     * @readonly
     * @memberof VideoBroadcast#
     */
    Object.defineProperty(prototype, 'onfocus', {
        get() {
            return privates.get(this).onfocusDomLevel0;
        },
        set(listener) {
            const p = privates.get(this);
            if (p.onfocusDomLevel0) {
                this.removeEventListener('focus', p.onfocusDomLevel0);
            }
            p.onfocusDomLevel0 = listener;
            if (listener) {
                this.addEventListener('focus', p.onfocusDomLevel0);
            }
        },
    });

    /**
     * Specifications:
     * HBBTV A.1/OIPF DAE 7.13.1 (The video/broadcast embedded object);
     * HBBTV A.2.4 (Extensions to the video/broadcast object).
     * <p>
     * Security: none.
     *
     * @returns {function}
     *
     * @name onblur
     * @readonly
     * @memberof VideoBroadcast#
     */
    Object.defineProperty(prototype, 'onblur', {
        get() {
            return privates.get(this).onblurDomLevel0;
        },
        set(listener) {
            const p = privates.get(this);
            if (p.onblurDomLevel0) {
                this.removeEventListener('blur', p.onblurDomLevel0);
            }
            p.onblurDomLevel0 = listener;
            if (listener) {
                this.addEventListener('blur', p.onblurDomLevel0);
            }
        },
    });

    /**
     * Specifications:
     * HBBTV A.1/OIPF DAE 7.13.1 (The video/broadcast embedded object);
     * HBBTV A.2.4 (Extensions to the video/broadcast object).
     * <p>
     * Security: none.
     *
     * @returns {function}
     *
     * @name onFullScreenChange
     * @readonly
     * @memberof VideoBroadcast#
     */
    Object.defineProperty(prototype, 'onFullScreenChange', {
        get() {
            return privates.get(this).onFullScreenChangeDomLevel0;
        },
        set(listener) {
            const p = privates.get(this);
            if (p.onFullScreenChangeDomLevel0) {
                this.removeEventListener('FullScreenChange', p.onFullScreenChangeDomLevel0);
            }
            p.onFullScreenChangeDomLevel0 = listener;
            if (listener) {
                this.addEventListener('FullScreenChange', p.onFullScreenChangeDomLevel0);
            }
        },
    });

    /**
     * Specifications:
     * HBBTV A.1/OIPF DAE 7.13.1 (The video/broadcast embedded object);
     * HBBTV A.2.4 (Extensions to the video/broadcast object).
     * <p>
     * Security: none.
     *
     * @returns {function}
     *
     * @name onChannelChangeError
     * @readonly
     * @memberof VideoBroadcast#
     */
    Object.defineProperty(prototype, 'onChannelChangeError', {
        get() {
            return privates.get(this).onChannelChangeErrorDomLevel0;
        },
        set(listener) {
            const p = privates.get(this);
            if (p.onChannelChangeErrorDomLevel0) {
                this.removeEventListener('ChannelChangeError', p.onChannelChangeErrorWrapper);
                p.onChannelChangeErrorWrapper = null;
            }
            p.onChannelChangeErrorDomLevel0 = listener;
            if (listener) {
                p.onChannelChangeErrorWrapper = (ev) => {
                    listener(ev.channel, ev.errorState);
                };
                this.addEventListener('ChannelChangeError', p.onChannelChangeErrorWrapper);
            }
        },
    });

    /**
     * Specifications:
     * HBBTV A.1/OIPF DAE 7.13.1 (The video/broadcast embedded object);
     * HBBTV A.2.4 (Extensions to the video/broadcast object).
     * <p>
     * Security: none.
     *
     * @returns {function}
     *
     * @name onChannelChangeSucceeded
     * @readonly
     * @memberof VideoBroadcast#
     */
    Object.defineProperty(prototype, 'onChannelChangeSucceeded', {
        get() {
            return privates.get(this).onChannelChangeSucceededDomLevel0;
        },
        set(listener) {
            const p = privates.get(this);
            if (p.onChannelChangeSucceededDomLevel0) {
                this.removeEventListener(
                    'ChannelChangeSucceeded',
                    p.onChannelChangeSucceededWrapper
                );
                p.onChannelChangeSucceededWrapper = null;
            }
            p.onChannelChangeSucceededDomLevel0 = listener;
            if (listener) {
                p.onChannelChangeSucceededWrapper = (ev) => {
                    listener(ev.channel);
                };
                this.addEventListener('ChannelChangeSucceeded', p.onChannelChangeSucceededWrapper);
            }
        },
    });

    /**
     * Specifications:
     * HBBTV A.1/OIPF DAE 7.13.1 (The video/broadcast embedded object);
     * HBBTV A.2.4 (Extensions to the video/broadcast object).
     * <p>
     * Security: none.
     *
     * @returns {function}
     *
     * @name onPlayStateChange
     * @readonly
     * @memberof VideoBroadcast#
     */
    Object.defineProperty(prototype, 'onPlayStateChange', {
        get() {
            return privates.get(this).onPlayStateChangeDomLevel0;
        },
        set(listener) {
            const p = privates.get(this);
            if (p.onPlayStateChangeDomLevel0) {
                this.removeEventListener('PlayStateChange', p.onPlayStateChangeWrapper);
                p.onPlayStateChangeWrapper = null;
            }
            p.onPlayStateChangeDomLevel0 = listener;
            if (listener) {
                p.onPlayStateChangeWrapper = (ev) => {
                    listener(ev.state, ev.error);
                };
                this.addEventListener('PlayStateChange', p.onPlayStateChangeWrapper);
            }
        },
    });

    /**
     * Specifications:
     * HBBTV A.1/OIPF DAE 7.13.3 (Extensions to video/broadcast for access to EIT p/f).
     * <p>
     * Security: none.
     *
     * @returns {ProgrammeCollection}
     *
     * @name programmes
     * @readonly
     * @memberof VideoBroadcast#
     */
    Object.defineProperty(prototype, 'programmes', {
        get: function() {
            const p = privates.get(this);
            mandatoryBroadcastRelatedSecurityCheck(p);
            if (!p.currentChannelProgrammes) {
                let programmes = hbbtv.bridge.broadcast.getProgrammes(p.currentChannelData.ccid);
                programmes.forEach(function(item, index) {
                    item.parentalRatings = hbbtv.objects.createParentalRatingCollection(
                        item.parentalRatings
                    );
                    programmes[index] = hbbtv.objects.createProgramme(item);
                });
                p.currentChannelProgrammes = programmes;
            }
            return hbbtv.objects.createCollection(p.currentChannelProgrammes);
        },
    });

    /**
     * Specifications:
     * HBBTV A.1/OIPF DAE 7.13.3 (Extensions to video/broadcast for access to EIT p/f).
     * <p>
     * Security: none.
     *
     * @returns {function}
     *
     * @name onProgrammesChanged
     * @readonly
     * @memberof VideoBroadcast#
     */
    Object.defineProperty(prototype, 'onProgrammesChanged', {
        get() {
            return privates.get(this).onProgrammesChangedDomLevel0;
        },
        set(listener) {
            const p = privates.get(this);
            if (p.onProgrammesChangedDomLevel0) {
                this.removeEventListener('ProgrammesChanged', p.onProgrammesChangedDomLevel0);
            }
            p.onProgrammesChangedDomLevel0 = listener;
            if (listener) {
                this.addEventListener('ProgrammesChanged', p.onProgrammesChangedDomLevel0);
            }
        },
    });

    /**
     * Specifications:
     * HBBTV A.1/OIPF DAE 7.13.4 (Extensions to video/broadcast for playback of selected components);
     * HBBTV A.2.17 (Notification of change of components).
     * <p>
     * Security: none.
     *
     * @returns {function}
     *
     * @name onSelectedComponentChanged
     * @readonly
     * @memberof VideoBroadcast#
     */
    Object.defineProperty(prototype, 'onSelectedComponentChanged', {
        get() {
            return privates.get(this).onSelectedComponentChangedDomLevel0;
        },
        set(listener) {
            const p = privates.get(this);
            if (p.onSelectedComponentChangedDomLevel0) {
                this.removeEventListener(
                    'SelectedComponentChanged',
                    p.onSelectedComponentChangedWrapper
                );
                p.onSelectedComponentChangedWrapper = null;
            }
            p.onSelectedComponentChangedDomLevel0 = listener;
            if (listener) {
                p.onSelectedComponentChangedWrapper = (ev) => {
                    listener(ev.componentType);
                };
                this.addEventListener(
                    'SelectedComponentChanged',
                    p.onSelectedComponentChangedWrapper
                );
            }
        },
    });

    /**
     * Specifications:
     * HBBTV A.1/OIPF DAE 7.13.4 (Extensions to video/broadcast for playback of selected components);
     * HBBTV A.2.17 (Notification of change of components).
     * <p>
     * Security: none.
     *
     * @returns {function}
     *
     * @name onComponentChanged
     * @readonly
     * @memberof VideoBroadcast#
     */
    Object.defineProperty(prototype, 'onComponentChanged', {
        get() {
            return privates.get(this).onComponentChangedDomLevel0;
        },
        set(listener) {
            const p = privates.get(this);
            if (p.onComponentChangedDomLevel0) {
                this.removeEventListener('ComponentChanged', p.onComponentChangedWrapper);
                p.onComponentChangedWrapper = null;
            }
            p.onComponentChangedDomLevel0 = listener;
            if (listener) {
                p.onComponentChangedWrapper = (ev) => {
                    // For COMPONENT_TYPE_ANY (more than 1 component changed) use undefined.
                    let componentType = undefined;
                    if (ev.componentType != COMPONENT_TYPE_ANY) {
                        componentType = ev.componentType;
                    }
                    listener(componentType);
                };
                this.addEventListener('ComponentChanged', p.onComponentChangedWrapper);
            }
        },
    });

    /**
     * Specifications:
     * HBBTV A.1/OIPF DAE 7.13.5 (Extensions to video/broadcast for parental ratings errors)
     * <p>
     * Security: none.
     *
     * @returns {function}
     *
     * @name onParentalRatingChange
     * @readonly
     * @memberof VideoBroadcast#
     */
    Object.defineProperty(prototype, 'onParentalRatingChange', {
        get() {
            return privates.get(this).onParentalRatingChangeDomLevel0;
        },
        set(listener) {
            const p = privates.get(this);
            if (p.onParentalRatingChangeDomLevel0) {
                this.removeEventListener('ParentalRatingChange', p.onParentalRatingChangeWrapper);
                p.onParentalRatingChangeWrapper = null;
            }
            p.onParentalRatingChangeDomLevel0 = listener;
            if (listener) {
                p.onParentalRatingChangeWrapper = (ev) => {
                    listener(ev.contentID, ev.ratings, ev.DRMSystemID, ev.blocked);
                };
                this.addEventListener('ParentalRatingChange', p.onParentalRatingChangeWrapper);
            }
        },
    });

    /**
     * Specifications:
     * HBBTV A.1/OIPF DAE 7.13.5 (Extensions to video/broadcast for parental ratings errors)
     * <p>
     * Security: none.
     *
     * @returns {function}
     *
     * @name onParentalRatingError
     * @readonly
     * @memberof VideoBroadcast#
     */
    Object.defineProperty(prototype, 'onParentalRatingError', {
        get() {
            return privates.get(this).onParentalRatingErrorDomLevel0;
        },
        set(listener) {
            const p = privates.get(this);
            if (p.onParentalRatingErrorDomLevel0) {
                this.removeEventListener('ParentalRatingError', p.onParentalRatingErrorWrapper);
                p.onParentalRatingErrorWrapper = null;
            }
            p.onParentalRatingErrorDomLevel0 = listener;
            if (listener) {
                p.onParentalRatingErrorWrapper = (ev) => {
                    listener(ev.contentID, ev.ratings, ev.DRMSystemID);
                };
                this.addEventListener('ParentalRatingError', p.onParentalRatingErrorWrapper);
            }
        },
    });

    /**
     * Specifications:
     * HBBTV A.1/OIPF DAE 7.13.7 (Extensions to video/broadcast for current channel information).
     * <p>
     * Security: none.
     *
     * @returns {Channel}
     *
     * @name currentChannel
     * @readonly
     * @memberof VideoBroadcast#
     */
    Object.defineProperty(prototype, 'currentChannel', {
        get: function() {
            if (!privates.get(this).isBroadcastRelated) {
                return null;
            }
            return privates.get(this).currentChannelData;
        },
    });

    Object.defineProperty(prototype, 'currentServiceInstance', {
        get: function() {
            const p = privates.get(this);
            if (!p.isBroadcastRelated || isNaN(p.currentInstanceIndex) ||
                    !p.currentChannelData || !p.currentChannelData.serviceInstances) {
                return null;
            }
            return p.currentChannelData.serviceInstances.item(p.currentInstanceIndex);
        },
    });

    Object.defineProperty(prototype, 'onDRMRightsError', {
        get() {
            return privates.get(this).onDRMRightsErrorDomLevel0;
        },
        set(listener) {
            const p = privates.get(this);
            if (p.onDRMRightsErrorDomLevel0) {
                this.removeEventListener('DRMRightsError', p.onDRMRightsErrorWrapper);
                p.onDRMRightsErrorWrapper = null;
            }
            p.onDRMRightsErrorDomLevel0 = listener;
            if (listener) {
                p.onDRMRightsErrorWrapper = (ev) => {
                    listener(ev.errorState, ev.contentID, ev.DRMSystemID, ev.rightsIssuerURL);
                };
                this.addEventListener('DRMRightsError', p.onDRMRightsErrorWrapper);
            }
        },
    });

    // Methods

    /**
     * Specifications:
     * HBBTV A.1/OIPF DAE 7.13.1 (The video/broadcast embedded object);
     * HBBTV A.2.4 (Extensions to the video/broadcast object).
     * <p>
     * Security: broadcast-related.
     *
     * @returns {ChannelConfig}
     *
     * @method
     * @memberof VideoBroadcast#
     */
    prototype.getChannelConfig = function() {
        const p = privates.get(this);
        mandatoryBroadcastRelatedSecurityCheck(p);
        return p.channelConfig;
    };

    /**
     * Specifications:
     * HBBTV A.1/OIPF DAE 7.13.1 (The video/broadcast embedded object);
     * HBBTV A.2.4 (Extensions to the video/broadcast object).
     * <p>
     * Security: broadcast-related.
     *
     * @returns {Channel}
     *
     * @method
     * @memberof VideoBroadcast#
     */
    prototype.bindToCurrentChannel = function() {
        const p = privates.get(this);
        mandatoryBroadcastRelatedSecurityCheck(p);
        if (p.playState === PLAY_STATE_UNREALIZED || p.playState === PLAY_STATE_STOPPED) {
            let tmpChannelData;
            let channelData;
            try {
                channelData = hbbtv.bridge.broadcast.getCurrentChannel()
                tmpChannelData = hbbtv.objects.createChannel(
                    channelData
                );
            } catch (e) {
                if (e.name === 'SecurityError') {
                    console.log(
                        'bindToCurrentChannel, unexpected condition: app appears broadcast-independent.'
                    );
                }
                throw e;
            }
            if (tmpChannelData !== false) {
                if (acquireActiveState.call(this)) {
                    console.log('Control DVB presentation!');
                    // A.2.4.1 / ERRATA0700–0720: binding v/b while HTML5/AV
                    // still holds decoders must not unsuspend native presentation.
                    if (!gBroadbandAvInUse) {
                        hbbtv.bridge.broadcast.setPresentationSuspended(false);
                    }
                    hbbtv.holePuncher.setBroadcastVideoObject(this);
                    const applicationScheme = hbbtv.bridge.manager.getApplicationScheme();
                    let wasPlayStateStopped = false;
                    if (p.playState === PLAY_STATE_UNREALIZED && applicationScheme === LINKED_APP_SCHEME_1_1) {
                        /* DAE vol5 Table 8 state transition #7 — PRESENTING when media is available.
                         * O.5.4 / ERRATA0400: a selected DVB-I DASH instance is already presented
                         * by the native player and does not expose RF-style getComponents. Do not
                         * wait for an empty component list. A.2.4.1 / ERRATA0700–0720: if HTML5
                         * still holds the decoders, stay CONNECTING. For RF, wait until SI
                         * components are known. */
                        let present = false;
                        if (gBroadbandAvInUse) {
                            present = false;
                        } else if (
                            isSelectedDashInstance(
                                channelData,
                                channelData.currentInstanceIndex
                            )
                        ) {
                            present = true;
                        } else {
                            const components = hbbtv.bridge.broadcast.getComponents(
                                channelData.ccid,
                                -1
                            );
                            present = !!(components && components.length > 0);
                        }
                        p.playState = present
                            ? PLAY_STATE_PRESENTING
                            : PLAY_STATE_CONNECTING;
                    } else {
                        /* PLAY_STATE_STOPPED */
                        /* DAE vol5 Table 8 state transition #17 with HbbTV 2.0.3 modification */
                        p.playState = PLAY_STATE_CONNECTING;
                        wasPlayStateStopped = applicationScheme === LINKED_APP_SCHEME_1_1;
                    }
                    addBridgeEventListeners.call(this);
                    dispatchPlayStateChangeEvent.call(this, p.playState);
                    if (wasPlayStateStopped) {
                        /* For PLAY_STATE_STOPPED: extra step to go into Presenting State */
                        /* DAE vol5 Table 8 state transition #17 with HbbTV 2.0.3 modification. */
                        p.playState = PLAY_STATE_PRESENTING;
                        dispatchPlayStateChangeEvent.call(this, p.playState);
                    }
                } else {
                    if (p.playState === PLAY_STATE_STOPPED) {
                        /* DAE vol5 Table 8 state transition #17 with HbbTV 2.0.3 modification */
                        dispatchPlayStateChangeEvent.call(this, p.playState);
                    } else {
                        /* DAE vol5 Table 8 state transition #8 - binding fails */
                        unregisterAllStreamEventListeners(p);
                        p.playState = PLAY_STATE_UNREALIZED;
                        dispatchPlayStateChangeEvent.call(
                            this,
                            p.playState,
                            ERROR_TUNER_UNAVAILABLE
                        );
                    }
                }
                p.currentChannelData = tmpChannelData;
                p.currentInstanceIndex = channelData.currentInstanceIndex;
            } else {
                /* DAE vol5 Table 8 state transition #8 - no channel being presented */
                unregisterAllStreamEventListeners(p);
                p.playState = PLAY_STATE_UNREALIZED;
                dispatchPlayStateChangeEvent.call(this, p.playState, ERROR_UNKNOWN_CHANNEL);
            }
        }
        if (p.currentChannelData) {
            return p.currentChannelData;
        }
    };

    /**
     * Specifications:
     * HBBTV A.1/OIPF DAE 7.13.1 (The video/broadcast embedded object);
     * HBBTV A.2.4 (Extensions to the video/broadcast object).
     * <p>
     * Security: none.
     *
     * @param {number} idType
     * @param {string|number} dsdOrOnid
     * @param {number} sidOrTsid
     * @param {number} sid
     * @param {number} sourceID
     * @param {string} ipBroadcastID
     *
     * @returns {Channel}
     *
     * @method
     * @memberof VideoBroadcast#
     */
    prototype.createChannelObject = function(
        idType,
        dsdOrOnid,
        sidOrTsid,
        sid,
        sourceID,
        ipBroadcastID
    ) {
        if (idType == 13) {
            // createChannelObject(idType, dsd, tsid)
            return hbbtv.objects.createChannel({
                idType: idType,
                dsd: dsdOrOnid,
                sid: sidOrTsid,
            });
        } else {
            // createChannelObject(idType, onid, tsid, sid, sourceID, ipBroadcastID)
            let channel = {
                idType: idType,
                onid: dsdOrOnid,
                tsid: sidOrTsid,
                sid: sid,
                sourceID: sourceID,
                ipBroadcastID: ipBroadcastID,
            };
            const p = privates.get(this);
            if (p.isBroadcastRelated) {
                let foundChannel = p.channelConfig ?
                    p.channelConfig.channelList.findChannel(channel) :
                    null;
                if (foundChannel !== null) {
                    return foundChannel;
                }
            }
            return hbbtv.objects.createChannel(channel);
        }
    };

    /**
     * Specifications:
     * HBBTV A.1/OIPF DAE 7.13.1 (The video/broadcast embedded object);
     * HBBTV A.2.4 (Extensions to the video/broadcast object).
     * <p>
     * Security: none.
     *
     * @param {Channel} channel
     * @param {boolean} trickplay
     * @param {string} contentAccessDescriptorURL
     * @param {number} quiet
     *
     * @method
     * @memberof VideoBroadcast#
     */
    prototype.setChannel = function(
        channel,
        trickplay = false,
        contentAccessDescriptorURL = '',
        quiet = 0
    ) {
        const p = privates.get(this);
        const appScheme = hbbtv.bridge.manager.getApplicationScheme();
        let releaseOnError = false;
        // TODO Check state transitions table. Disallow if not connecting or presenting or stopped.
        if (channel === null) {
            this.release();
            setIsBroadcastRelated.call(this, false);
            const errorState = hbbtv.bridge.broadcast.setChannelToNull(
                trickplay,
                contentAccessDescriptorURL,
                quiet
            );
            if (errorState < 0) {
                dispatchChannelChangeSucceededEvent.call(this, null);
            }
            return;
        }

        // Acquire active state if required
        if (p.playState === PLAY_STATE_UNREALIZED || p.playState === PLAY_STATE_STOPPED) {
            if (!acquireActiveState.call(this)) {
                hbbtv.bridge.broadcast.setPresentationSuspended(false);
                /* DAE vol5 Table 8 state transition #2 & #6 - no suitable tuner is available */
                dispatchChannelChangeErrorEvent.call(this, channel, ERROR_TUNER_UNAVAILABLE);
                return;
            }
            addBridgeEventListeners.call(this);
            releaseOnError = true;
        }
        // Change channel
        p.isTransitioningToBroadcastRelated = true;
        p.quiet = quiet;
        let errorState = 0;
        if (channel.idType == 13) {
            // ID_DVB_SI_DIRECT
            if (channel.dsd !== undefined && channel.sid !== undefined) {
                errorState = hbbtv.bridge.broadcast.setChannelToDsd(
                    hbbtv.utils.base64Encode(channel.dsd),
                    channel.sid,
                    trickplay,
                    contentAccessDescriptorURL,
                    quiet
                );
            }
        } else {
            if (channel.ccid !== undefined) {
                errorState = hbbtv.bridge.broadcast.setChannelToCcid(
                    channel.ccid,
                    trickplay,
                    contentAccessDescriptorURL,
                    quiet
                );
            } else {
                if (
                    channel.onid !== undefined &&
                    channel.tsid !== undefined &&
                    channel.sid !== undefined
                ) {
                    errorState = hbbtv.bridge.broadcast.setChannelToTriplet(
                        channel.idType,
                        channel.onid,
                        channel.tsid,
                        channel.sid,
                        typeof channel.sourceID !== 'undefined' ? channel.sourceID : -1,
                        typeof channel.ipBroadcastID !== 'undefined' ? channel.ipBroadcastID : '',
                        trickplay,
                        contentAccessDescriptorURL,
                        quiet
                    );
                }
            }
        }

        if (errorState >= 0) {
            p.isTransitioningToBroadcastRelated = false;
            if (releaseOnError) {
                removeBridgeEventListeners.call(this);
                hbbtv.holePuncher.setBroadcastVideoObject(null);
                releaseActiveState();
            }
            /* DAE vol5 Table 8 state transition #2 - combination of channel properties is invalid */
            /*                                      - channel type is not supported */
            // TODO Handle permanent errors consistently. Should all permanent errors set the play state to unrealized here,
            // so that it is correct when ChannelChangeErrorEvent is received?
            if (errorState === CHANNEL_STATUS_CHANNEL_NOT_IN_TS) {
                p.playState = PLAY_STATE_UNREALIZED;
                dispatchPlayStateChangeEvent.call(this, p.playState);
            }
            dispatchChannelChangeErrorEvent.call(this, channel, errorState);
            return;
        }

        if (p.isBroadcastRelated && quiet !== 2) {
            try {
                // Keep the Channel the application passed. getCurrentChannel() returns the
                // DVB-I *service* object even after setChannel to an instance CCID (…iN),
                // which would leave currentChannel.idType as ID_DVB_I (ERRATA0400 / O.5.4).
                p.currentChannelData = channel;
                if (channel.serviceInstances) {
                    const channelData = hbbtv.bridge.broadcast.getCurrentChannel();
                    p.currentInstanceIndex = channelData.currentInstanceIndex;
                } else {
                    p.currentInstanceIndex = NaN;
                }
                if (p.channelConfig === null) {
                    p.channelConfig = hbbtv.objects.createChannelConfig();
                }
            } catch (e) {
                if (e.name === 'SecurityError') {
                    console.log(
                        'setChannel, unexpected condition: app appears broadcast-independent.'
                    );
                }
                throw e;
            }
        }

        /* DAE vol5 Table 8 state transition #1 */
        console.log('DEBUG_CHANNEL_STATUS: setChannel called - transitioning to CONNECTING state');
        unregisterAllStreamEventListeners(p);
        p.playState = PLAY_STATE_CONNECTING;
        p.waitingPlayStateConnectingConfirm = appScheme === LINKED_APP_SCHEME_1_1;
        p.pendingChannelChangeSucceeded = true;
        p.pendingInstanceIndex = parseDvbiInstanceIndexFromCcid(channel.ccid);
        // DASH instances share the DVB-I service triplet, so leftover CONNECTING/
        // PRESENTING from the previous DASH instance must not complete CCS
        // (ERRATA0400 / ERRATA0900 re-lock). Wait for ServiceInstanceChanged.
        p.pendingDashInstanceConfirmed = !isDashInstanceChannel(channel);
        dispatchPlayStateChangeEvent.call(this, p.playState);
    };

    /**
     * Specifications:
     * HBBTV A.1/OIPF DAE 7.13.1 (The video/broadcast embedded object);
     * HBBTV A.2.4 (Extensions to the video/broadcast object).
     * <p>
     * Security: broadcast-related.
     *
     * @method
     * @memberof VideoBroadcast#
     */
    prototype.prevChannel = function() {
        const p = privates.get(this);
        mandatoryBroadcastRelatedSecurityCheck(p);
        cycleChannel.call(this, -1);
    };

    /**
     * Specifications:
     * HBBTV A.1/OIPF DAE 7.13.1 (The video/broadcast embedded object);
     * HBBTV A.2.4 (Extensions to the video/broadcast object).
     * <p>
     * Security: broadcast-related.
     *
     * @method
     * @memberof VideoBroadcast#
     */
    prototype.nextChannel = function() {
        const p = privates.get(this);
        mandatoryBroadcastRelatedSecurityCheck(p);
        cycleChannel.call(this, 1);
    };

    /**
     * Specifications:
     * HBBTV A.1/OIPF DAE 7.13.1 (The video/broadcast embedded object);
     * HBBTV A.2.4 (Extensions to the video/broadcast object).
     * <p>
     * Security: none.
     *
     * @param {boolean} fullScreen
     *
     * @method
     * @memberof VideoBroadcast#
     */
    prototype.setFullScreen = function(val) {
        const p = privates.get(this);
        /** Broadcast-independent applications: setFullScreen() shall have no effect */
        if (!p.isBroadcastRelated) {
            return;
        }
        p.fullScreen = val;
        hbbtv.holePuncher.notifyFullScreenChanged(this);
        dispatchFullScreenChangeEvent.call(this);
    };

    /**
     * Specifications:
     * HBBTV A.1/OIPF DAE 7.13.1 (The video/broadcast embedded object);
     * HBBTV 10.2.12 Audio level adjustment for audio mixing
     * <p>
     * Security: none.
     *
     * @returns {number} Integer value between 0 up to and including 100 to indicate volume level.
     *
     * @method
     * @memberof VideoBroadcast#
     */
    prototype.getVolume = function() {
        return hbbtv.bridge.broadcast.getVolume();
    }

    /**
     * Specifications:
     * HBBTV A.1/OIPF DAE 7.13.1 (The video/broadcast embedded object);
     * HBBTV 10.2.12 Audio level adjustment for audio mixing
     * <p>
     * Security: none.
     *
     * @param {number} volume Integer value between 0 up to and including 100 to indicate volume level.
     *
     * @returns {boolean} true if the volume has changed. false if the volume has not changed.
     *
     * @method
     * @memberof VideoBroadcast#
     */
    prototype.setVolume = function(volume) {
        return hbbtv.bridge.broadcast.setVolume(volume);
    }

    /**
     * Specifications:
     * HBBTV A.1/OIPF DAE 7.13.1 (The video/broadcast embedded object);
     * HBBTV A.2.4 (Extensions to the video/broadcast object).
     * <p>
     * Security: none.
     *
     * @returns {integer}
     *
     * @method
     * @memberof VideoBroadcast#
     */
    prototype.release = function() {
        const p = privates.get(this);
        /** Broadcast-independent applications: release() shall have no effect */
        if (!p.isBroadcastRelated) {
            return; // TODO Really?
        }
        removeBridgeEventListeners.call(this);
        if (p.playState !== PLAY_STATE_UNREALIZED) {
            /* DAE vol5 Table 8 state transition #12 */
            p.currentChannelData = null;
            p.currentInstanceIndex = null;
            p.currentNonQuietChannelData = null;
            p.currentChannelProgrammes = null;
            p.currentChannelComponents = null;
            unregisterAllStreamEventListeners(p);
            p.playState = PLAY_STATE_UNREALIZED;
            hbbtv.holePuncher.setBroadcastVideoObject(null);
            releaseActiveState.call(this);
            dispatchPlayStateChangeEvent.call(this, p.playState);
            /* TODO: If app has modified the set of components, they continue to be presented */
        }
    };

    /**
     * Specifications:
     * HBBTV A.1/OIPF DAE 7.13.1 (The video/broadcast embedded object);
     * HBBTV A.2.4 (Extensions to the video/broadcast object).
     * <p>
     * Security: none.
     *
     * @method
     * @memberof VideoBroadcast#
     */
    prototype.stop = function() {
        const p = privates.get(this);
        /** Broadcast-independent applications: stop() shall have no effect */
        if (!p.isBroadcastRelated) {
            return;
        }
        if (p.playState === PLAY_STATE_CONNECTING || p.playState === PLAY_STATE_PRESENTING) {
            /* DAE vol5 Table 8 state transition #14 */
            p.playState = PLAY_STATE_STOPPED;
            hbbtv.bridge.broadcast.setPresentationSuspended(true);
            if (hbbtv.native.name === 'rdk' && hbbtv.native.getProprietary()) {
                // support poorly implemented portals by delaying the event dispatch
                setTimeout(() => {dispatchPlayStateChangeEvent.call(this, p.playState);}, 0);
            }
            else {
                dispatchPlayStateChangeEvent.call(this, p.playState);
            }
        }
    };

    /**
     * Specifications:
     * HBBTV A.2.4.6 (Support for creating audio and video components),
     * <p>
     * Security: none.
     *
     * @param {number} componentType
     *
     * @return {AVComponentCollection}
     *
     * @method
     * @memberof VideoBroadcast#
     */
    prototype.createAVAudioComponent = function(
        componentTag,
        language,
        audioDescription,
        audioChannels,
        encoding
    ) {
        const p = privates.get(this);
        if (!p.isBroadcastRelated) {
            return null;
        }
        const component = hbbtv.bridge.broadcast.getPrivateAudioComponent(componentTag);
        if (component !== null) {

            // update the currentChannelComponents with the new component
            if (!p.currentChannelComponents) {
                p.currentChannelComponents = hbbtv.bridge.broadcast.getComponents(
                    p.currentChannelData.ccid,
                    -1
                );
            }
            p.currentChannelComponents.push(component);

            return hbbtv.objects.createAVAudioComponent({
                id: component.id,
                type: COMPONENT_TYPE_AUDIO,
                componentTag: componentTag,
                language: language,
                audioDescription: audioDescription,
                audioChannels: audioChannels,
                encoding: encoding,
            });
        }
        return null;
    };

    /**
     * Specifications:
     * HBBTV A.2.4.6 (Support for creating audio and video components),
     * <p>
     * Security: none.
     *
     * @param {number} componentType
     *
     * @return {AVComponentCollection}
     *
     * @method
     * @memberof VideoBroadcast#
     */
    prototype.createAVVideoComponent = function(componentTag, aspectRatio, encoding) {
        const p = privates.get(this);
        if (!p.isBroadcastRelated) {
            return null;
        }
        const component = hbbtv.bridge.broadcast.getPrivateVideoComponent(componentTag);
        if (component !== null) {

            // update the currentChannelComponents with the new component
            if (!p.currentChannelComponents) {
                p.currentChannelComponents = hbbtv.bridge.broadcast.getComponents(
                    p.currentChannelData.ccid,
                    -1
                );
            }
            p.currentChannelComponents.push(component);

            return hbbtv.objects.createAVVideoComponent({
                id: component.id,
                type: COMPONENT_TYPE_VIDEO,
                pid: component.pid,
                encrypted: component.encrypted,
                componentTag: componentTag,
                aspectRatio: aspectRatio,
                encoding: encoding,
            });
        }
        return null;
    };

    /**
     * Specifications:
     * HBBTV A.1/OIPF DAE 7.13.4 (Extensions to video/broadcast for playback of selected components);
     * HBBTV A.2.17 (Notification of change of components).
     * <p>
     * Security: broadcast-related.
     *
     * @param {number} componentType
     *
     * @return {AVComponentCollection}
     *
     * @method
     * @memberof VideoBroadcast#
     */
    prototype.getComponents = function(componentType) {
        const p = privates.get(this);
        mandatoryBroadcastRelatedSecurityCheck(p);
        if (!p.currentChannelComponents) {
            p.currentChannelComponents = hbbtv.bridge.broadcast.getComponents(
                p.currentChannelData.ccid,
                -1
            );
        }
        let result;
        if (componentType === null || componentType === undefined) {
            result = p.currentChannelComponents.filter((component) => {
                return !component.hidden;
            });
        } else {
            result = p.currentChannelComponents.filter((component) => {
                return component.type === componentType && !component.hidden;
            });
        }
        return avComponentArrayToCollection.call(this, result);
    };

    /**
     * Specifications:
     * HBBTV A.1/OIPF DAE 7.13.4 (Extensions to video/broadcast for playback of selected components);
     * HBBTV A.2.17 (Notification of change of components).
     * <p>
     * Security: broadcast-related.
     *
     * @param {number} componentType
     *
     * @return {AVComponentCollection}
     *
     * @method
     * @memberof VideoBroadcast#
     */
    prototype.getCurrentActiveComponents = function(componentType) {
        const p = privates.get(this);
        mandatoryBroadcastRelatedSecurityCheck(p);
        if (!p.currentChannelComponents) {
            p.currentChannelComponents = hbbtv.bridge.broadcast.getComponents(
                p.currentChannelData.ccid,
                -1
            );
        }
        if (componentType === null || componentType === undefined) {
            let result = p.currentChannelComponents.filter((component) => {
                return component.active;
            });
            return avComponentArrayToCollection.call(this, result);
        } else {
            let result = p.currentChannelComponents.filter((component) => {
                return component.type === componentType && component.active;
            });
            return avComponentArrayToCollection.call(this, result);
        }
    };

    /**
     * Specifications:
     * HBBTV A.1/OIPF DAE 7.13.4 (Extensions to video/broadcast for playback of selected components);
     * HBBTV A.2.17 (Notification of change of components).
     * <p>
     * Security: broadcast-related.
     *
     * @param {AVComponent|number} component
     *
     * @method
     * @memberof VideoBroadcast#
     */
    prototype.selectComponent = function(component) {
        const p = privates.get(this);
        mandatoryBroadcastRelatedSecurityCheck(p);
        if (!p.currentChannelComponents) {
            p.currentChannelComponents = hbbtv.bridge.broadcast.getComponents(
                p.currentChannelData.ccid,
                -1
            );
        }
        if (!p.currentChannelComponents || p.currentChannelComponents.length === 0) {
            throw new DOMException('', 'InvalidStateError');
        }
        if (isNaN(component)) {
            const componentId = getComponentId(component);
            if (componentId !== null) {
                hbbtv.bridge.broadcast.overrideComponentSelection(component.type, componentId);
            }
        } else {
            // Select the default component
            hbbtv.bridge.broadcast.restoreComponentSelection(component);
        }
    };

    /**
     * Specifications:
     * HBBTV A.1/OIPF DAE 7.13.4 (Extensions to video/broadcast for playback of selected components);
     * HBBTV A.2.17 (Notification of change of components).
     * <p>
     * Security: broadcast-related.
     *
     * @param {AVComponent|number} component
     *
     * @method
     * @memberof VideoBroadcast#
     */
    prototype.unselectComponent = function(component) {
        const p = privates.get(this);
        mandatoryBroadcastRelatedSecurityCheck(p);
        if (isNaN(component)) {
            p.currentChannelComponents = hbbtv.bridge.broadcast.getComponents(
                p.currentChannelData.ccid,
                -1
            );
            const componentId = getComponentId(component);
            const found = p.currentChannelComponents.find((item) => {
                return componentId !== null && componentId === item.id;
            });
            if (found.active) {
                if (
                    component.type == this.COMPONENT_TYPE_AUDIO ||
                    component.type == this.COMPONENT_TYPE_SUBTITLE
                ) {
                    // Select the default component
                    hbbtv.bridge.broadcast.restoreComponentSelection(component.type);
                } else {
                    // Suspend video
                    hbbtv.bridge.broadcast.overrideComponentSelection(component.type, '');
                }
            }
        } else {
            // Suspend this component type
            hbbtv.bridge.broadcast.overrideComponentSelection(component, '');
        }
    };

    /**
     * Specifications:
     * HBBTV 8.2.1 (Acquisition of DSM-CC stream events).
     * <p>
     * Security: none.
     *
     * @param {string} targetURL
     * @param {string} eventName
     * @param {EventListener} listener
     *
     * @method
     * @memberof VideoBroadcast#
     */
    prototype.addStreamEventListener = function(targetURL, eventName, listener) {
        /* Extensions to video/broadcast for synchronization: No security restrictions specified */
        const p = privates.get(this);
        if (p.playState == PLAY_STATE_PRESENTING || p.playState == PLAY_STATE_STOPPED) {
            if (targetURL.startsWith('dsmcc:') || targetURL.endsWith('.xse')) {
                let found = false;
                let componentTag, streamEventId;
                let request = new XMLHttpRequest();
                request.addEventListener('loadend', () => {
                    if (request.status == 200) {
                        let dsmcc_objects =
                            request.responseXML.getElementsByTagName('dsmcc:dsmcc_object');
                        if (dsmcc_objects.length == 0) {
                            dsmcc_objects =
                                request.responseXML.getElementsByTagName('dsmcc_object');
                        }
                        for (let x = 0; x < dsmcc_objects.length && !found; x++) {
                            let stream_events =
                                dsmcc_objects[x].getElementsByTagName('dsmcc:stream_event');
                            if (stream_events.length == 0) {
                                stream_events =
                                    dsmcc_objects[x].getElementsByTagName('stream_event');
                            }
                            for (var y = 0; y < stream_events.length; y++) {
                                let streamEventName =
                                    stream_events[y].getAttribute('dsmcc:stream_event_name');
                                if (streamEventName == null) {
                                    streamEventName =
                                        stream_events[y].getAttribute('stream_event_name');
                                }
                                if (streamEventName === eventName) {
                                    found = true;
                                    componentTag =
                                        dsmcc_objects[x].getAttribute('dsmcc:component_tag');
                                    if (componentTag == null) {
                                        componentTag =
                                            dsmcc_objects[x].getAttribute('component_tag');
                                    }
                                    streamEventId =
                                        stream_events[y].getAttribute('dsmcc:stream_event_id');
                                    if (streamEventId == null) {
                                        streamEventId =
                                            stream_events[y].getAttribute('stream_event_id');
                                    }
                                    break;
                                }
                            }
                        }
                    }

                    if (found) {
                        registerStreamEventListener(
                            p,
                            targetURL,
                            eventName,
                            listener,
                            componentTag,
                            streamEventId
                        );
                    } else {
                        console.error(
                            'Failed to find Stream Event for: ' +
                            targetURL +
                            ', on event:' +
                            eventName +
                            ', request status: ' +
                            request.status
                        );
                        raiseStreamEventError(eventName, listener);
                    }
                });
                request.open('GET', targetURL);
                request.send();
            }
            else {
                registerStreamEventListener(p, targetURL, eventName, listener);
            }
        }
    };

    /**
     * Specifications:
     * HBBTV 8.2.1 (Acquisition of DSM-CC stream events).
     * <p>
     * Security: none.
     *
     * @param {string} targetURL
     * @param {string} eventName
     * @param {EventListener} listener
     *
     * @method
     * @memberof VideoBroadcast#
     */
    prototype.removeStreamEventListener = function(targetURL, eventName, listener) {
        /* Extensions to video/broadcast for synchronization: No security restrictions specified */
        const p = privates.get(this);
        const streamEventID = getStreamEventID(targetURL, eventName);
        const streamEventInternalID = p.streamEventListenerIdMap.get(streamEventID);
        if (streamEventInternalID) {
            const streamEventListeners = p.streamEventListenerMap.get(streamEventInternalID);
            if (streamEventListeners) {
                const index = streamEventListeners.indexOf(listener);
                if (index != -1) {
                    streamEventListeners.splice(index, 1);
                    if (streamEventListeners.length == 0) {
                        p.streamEventListenerIdMap.delete(streamEventID);
                        p.streamEventListenerMap.delete(streamEventInternalID);
                        hbbtv.bridge.broadcast.removeStreamEventListener(streamEventInternalID);
                    }
                }
            } else {
                console.error(
                    'Unconsistent state, ' +
                    streamEventID +
                    '(' +
                    streamEventInternalID +
                    ') has no listeners.'
                );
            }
        } else {
            console.error('Unexisting Stream Event Listener ' + streamEventID);
        }
    };

    prototype.addEventListener = function(type, listener) {
        if (privates.get(this).eventDispatcher.addCountedEventListener(type, listener) > 0) {
            gGarbageCollectionBlocked.add(this);
        }
    };

    prototype.removeEventListener = function(type, listener) {
        if (privates.get(this).eventDispatcher.removeCountedEventListener(type, listener) == 0) {
            gGarbageCollectionBlocked.delete(this);
        }
    };

    // Internal implementation

    /**
     * True if ChannelStatusChanged belongs to the Channel targeted by setChannel.
     * A DVB-I *service* Channel uses the service identity (e.g. 6,16590,1) while
     * RF instance delivery uses a different triplet (e.g. 99,1,12). Instance
     * Channels do not expose serviceInstances, so stale RF status is still
     * ignored during DASH instance lock.
     */
    function channelStatusEventMatchesChannel(event, channelData, instanceIndex) {
        if (!channelData) {
            return false;
        }
        if (
            event.servId == channelData.sid &&
            event.onetId == channelData.onid &&
            event.transId == channelData.tsid
        ) {
            return true;
        }
        if (!channelData.serviceInstances || isNaN(instanceIndex)) {
            return false;
        }
        const inst = channelData.serviceInstances.item(instanceIndex);
        return (
            inst &&
            event.servId == inst.sid &&
            event.onetId == inst.onid &&
            event.transId == inst.tsid
        );
    }

    function parseDvbiInstanceIndexFromCcid(ccid) {
        if (typeof ccid !== 'string') {
            return NaN;
        }
        const match = /i(\d+)$/.exec(ccid);
        return match ? parseInt(match[1], 10) : NaN;
    }

    function isDashInstanceChannel(channel) {
        // Service Channels (ccid:6590) may still carry ipBroadcastID from a prior
        // DASH lock. The DASH-target CCS wait is only for instance CCIDs (…iN).
        return !!(
            channel &&
            channel.ipBroadcastID &&
            !isNaN(parseDvbiInstanceIndexFromCcid(channel.ccid))
        );
    }

    function isSelectedDashInstance(channel, instanceIndex) {
        const DASH = hbbtv.objects.Channel.prototype.ID_DVB_DASH;
        if (!channel) {
            return false;
        }
        if (channel.idType === DASH) {
            return true;
        }
        if (typeof instanceIndex !== 'number' || isNaN(instanceIndex) || instanceIndex < 0) {
            return false;
        }
        const instances = channel.serviceInstances;
        if (!instances) {
            return false;
        }
        const inst =
            typeof instances.item === 'function'
                ? instances.item(instanceIndex)
                : instances[instanceIndex];
        return !!(inst && inst.idType === DASH);
    }

    /**
     * setChannel onto a native DASH instance CCID (…iN). CONNECTING and
     * ApplicationSchemeUpdated must not complete CCS: leftover status from the
     * previous MPD (ERRATA0900 step 5) can fire while playState is still
     * CONNECTING. Wait for CHANNEL_STATUS_PRESENTING of the new instance.
     * App-only 1.2 (no DASH idType) still completes CCS on CONNECTING.
     */
    function dashInstanceLockWaitsForPresenting(p) {
        return !!(
            p.pendingChannelChangeSucceeded &&
            isDashInstanceChannel(p.currentChannelData) &&
            p.pendingDashInstanceConfirmed &&
            isSelectedDashInstance(p.currentChannelData, p.currentInstanceIndex)
        );
    }

    function addBridgeEventListeners() {
        const p = privates.get(this);
        if (!p.onChannelStatusChanged) {
            p.onChannelStatusChanged = (event) => {
                const p = privates.get(this);
                console.log(
                    'DEBUG_CHANNEL_STATUS: Received ChannelStatusChanged (' +
                    event.onetId +
                    ',' +
                    event.transId +
                    ',' +
                    event.servId +
                    '), statusCode: ' +
                    event.statusCode +
                    ' (CHANNEL_STATUS_PRESENTING=-3, CHANNEL_STATUS_CONNECTING=-2, CHANNEL_STATUS_PARENTAL_LOCKED=3)' +
                    ', current playState: ' +
                    p.playState +
                    ' (CONNECTING=1, PRESENTING=2)' +
                    ', permanentError: ' +
                    event.permanentError
                );
                if (p.playState == PLAY_STATE_CONNECTING) {
                    // ERRATA0900: stale RF CONNECTING/PRESENTING for a previous
                    // triplet must not complete setChannel onto a DVB-I DASH instance.
                    // Do not treat the selected RF instance of a DVB-I *service*
                    // Channel as stale (setChannel(service) auto-selects RF).
                    if (
                        p.pendingChannelChangeSucceeded &&
                        p.currentChannelData &&
                        !channelStatusEventMatchesChannel(
                            event,
                            p.currentChannelData,
                            p.currentInstanceIndex
                        )
                    ) {
                        console.log(
                            'DEBUG_CHANNEL_STATUS: ignoring ChannelStatusChanged for previous triplet during setChannel'
                        );
                        return;
                    }
                    if (
                        p.pendingChannelChangeSucceeded &&
                        isDashInstanceChannel(p.currentChannelData) &&
                        !p.pendingDashInstanceConfirmed
                    ) {
                        console.log(
                            'DEBUG_CHANNEL_STATUS: ignoring ChannelStatusChanged until target DASH instance is selected'
                        );
                        return;
                    }
                    switch (event.statusCode) {
                        case CHANNEL_STATUS_PRESENTING:
                            /* DAE vol5 Table 8 state transition #9 */
                            // A.2.4.1 / ERRATA0720: while the app still holds
                            // video/audio decoders, CONNECTING is a transient
                            // error and must not become PRESENTING.
                            if (gBroadbandAvInUse) {
                                console.log(
                                    'DEBUG_CHANNEL_STATUS: CHANNEL_STATUS_PRESENTING deferred; app holds decoders'
                                );
                                break;
                            }
                            // For media-in-parallel linked apps on DVB-I RF, components may lag PLAYING.
                            // Stay CONNECTING until getComponents is non-empty (see maybePresentWhenComponentsReady).
                            // Exceptions: setChannel onto a DVB-I *instance* (O.5.4 / ERRATA0400) and
                            // bind/PRESENTING of a selected DASH instance, which never exposes RF tracks.
                            if (
                                hbbtv.bridge.manager.getApplicationScheme() === LINKED_APP_SCHEME_1_1
                                && !p.pendingChannelChangeSucceeded
                                && !isSelectedDashInstance(
                                    p.currentChannelData,
                                    p.currentInstanceIndex
                                )
                            ) {
                                try {
                                    const ccid =
                                        p.currentChannelData && p.currentChannelData.ccid;
                                    const components = ccid
                                        ? hbbtv.bridge.broadcast.getComponents(ccid, -1)
                                        : [];
                                    if (!components || components.length === 0) {
                                        console.log(
                                            'DEBUG_CHANNEL_STATUS: CHANNEL_STATUS_PRESENTING deferred until components ready'
                                        );
                                        break;
                                    }
                                } catch (e) {
                                    console.log(
                                        'DEBUG_CHANNEL_STATUS: CHANNEL_STATUS_PRESENTING deferred (component query failed)'
                                    );
                                    break;
                                }
                            }
                            console.log('DEBUG_CHANNEL_STATUS: CHANNEL_STATUS_PRESENTING received while in CONNECTING state - transitioning to PRESENTING');
                            hbbtv.holePuncher.setBroadcastVideoObject(this);
                            p.playState = PLAY_STATE_PRESENTING;
                            if (p.pendingChannelChangeSucceeded) {
                                console.log('DEBUG_CHANNEL_STATUS: playState set to PRESENTING (2), dispatching ChannelChangeSucceeded and PlayStateChange events');
                                dispatchChannelChangeSucceededEvent.call(this, p.currentChannelData);
                            } else {
                                console.log('DEBUG_CHANNEL_STATUS: playState set to PRESENTING (2), dispatching PlayStateChange');
                            }
                            dispatchPlayStateChangeEvent.call(this, p.playState);
                            break;

                        case CHANNEL_STATUS_CONNECTING:
                            console.log('DEBUG_CHANNEL_STATUS: CHANNEL_STATUS_CONNECTING received while in CONNECTING state');
                            if (dashInstanceLockWaitsForPresenting(p)) {
                                console.log(
                                    'DEBUG_CHANNEL_STATUS: native DASH instance lock; ignore CONNECTING CCS until PRESENTING'
                                );
                                break;
                            }
                            if (
                                p.currentChannelData == null ||
                                !channelStatusEventMatchesChannel(
                                    event,
                                    p.currentChannelData,
                                    p.currentInstanceIndex
                                )
                            ) {
                                try {
                                    const channelData = hbbtv.bridge.broadcast.getCurrentChannelForEvent();
                                    p.currentChannelData = hbbtv.objects.createChannel(
                                        channelData
                                    );
                                    p.currentInstanceIndex = channelData.currentInstanceIndex;
                                    if (p.quiet !== 2) {
                                        p.currentNonQuietChannelData = p.currentChannelData;
                                    }
                                } catch (e) {
                                    if (e.name === 'SecurityError') {
                                        console.log(
                                            'Unexpected condition: app appears broadcast-independent.'
                                        );
                                    }
                                    throw e;
                                }
                            }
                            if (p.waitingPlayStateConnectingConfirm) {
                                console.log('DEBUG_CHANNEL_STATUS: waitingPlayStateConnectingConfirm TRUE. Ignore event');
                            } else {
                                /* DAE vol5 Table 8 state transition #10, or possibly, a user initiated channel change */
                                /* Terminal connected to the broadcast or IP multicast stream but presentation blocked */
                                console.log('DEBUG_CHANNEL_STATUS: Staying in CONNECTING state, dispatching ChannelChangeSucceeded');
                                p.playState = PLAY_STATE_CONNECTING;
                                dispatchChannelChangeSucceededEvent.call(
                                    this,
                                    p.currentChannelData
                                );
                                dispatchPlayStateChangeEvent.call(this, p.playState);
                            }
                            break;

                        case CHANNEL_STATUS_CONNECTING_RECOVERY:
                            /* DAE vol5 Table 8 state transition #11 */
                            /* Recovery from transient error */
                            p.playState = PLAY_STATE_PRESENTING;
                            dispatchPlayStateChangeEvent.call(this, p.playState);
                            break;

                        default:
                            if (event.permanentError) {
                                /* DAE vol5 Table 8 state transition #13 */
                                unregisterAllStreamEventListeners(p);
                                p.playState = PLAY_STATE_UNREALIZED;
                                dispatchPlayStateChangeEvent.call(this, p.playState);
                            } /* else DAE vol5 Table 8 state transition #2 */
                            dispatchChannelChangeErrorEvent.call(
                                this,
                                p.currentChannelData,
                                event.statusCode
                            );
                    }
                    p.waitingPlayStateConnectingConfirm = false;
                } else if (p.playState == PLAY_STATE_PRESENTING) {
                    if (event.permanentError) {
                        /* DAE vol5 Table 8 state transition #16A */
                        unregisterAllStreamEventListeners(p);
                        p.playState = PLAY_STATE_UNREALIZED;
                        dispatchPlayStateChangeEvent.call(this, p.playState);
                    } else if (event.statusCode == CHANNEL_STATUS_CONNECTING) {
                        /* Possibly a user initiated channel change (with app not bound to service) */
                        p.playState = PLAY_STATE_CONNECTING;
                        if (
                            p.currentChannelData == null ||
                            event.servId != p.currentChannelData.sid ||
                            event.onetId != p.currentChannelData.onid ||
                            event.transId != p.currentChannelData.tsid
                        ) {
                            try {
                                const channelData = hbbtv.bridge.broadcast.getCurrentChannelForEvent();
                                p.currentNonQuietChannelData = p.currentChannelData = hbbtv.objects.createChannel(
                                    channelData
                                );
                                p.currentInstanceIndex = channelData.currentInstanceIndex;
                            } catch (e) {
                                if (e.name === 'SecurityError') {
                                    console.log(
                                        'onChannelStatusChanged, unexpected condition: app appears broadcast-independent.'
                                    );
                                }
                                throw e;
                            }
                            dispatchChannelChangeSucceededEvent.call(this, p.currentChannelData);
                        }
                        dispatchPlayStateChangeEvent.call(this, p.playState);
                    } else if (event.statusCode == CHANNEL_STATUS_PRESENTING) {
                        /* Same stream still presenting (e.g. setChannel onto the already-playing
                         * DVB-I DASH instance). Do not treat this as a transient error. */
                        if (
                            p.pendingChannelChangeSucceeded &&
                            (!isDashInstanceChannel(p.currentChannelData) ||
                                p.pendingDashInstanceConfirmed)
                        ) {
                            dispatchChannelChangeSucceededEvent.call(this, p.currentChannelData);
                        }
                    } /* temporary error */
                    else {
                        /* DAE vol5 Table 8 state transition #15 */
                        p.playState = PLAY_STATE_CONNECTING;
                        dispatchPlayStateChangeEvent.call(this, p.playState);
                    }
                } else if (p.playState == PLAY_STATE_STOPPED && event.permanentError) {
                    /* DAE vol5 Table 8 state transition #16B */
                    unregisterAllStreamEventListeners(p);
                    p.playState = PLAY_STATE_UNREALIZED;
                    dispatchPlayStateChangeEvent.call(this, p.playState);
                } else if (p.playState == PLAY_STATE_STOPPED) {
                    // The VBO is stopped and the channel is changed externally (e.g., ch+)
                    if (event.statusCode == CHANNEL_STATUS_CONNECTING) {
                        if (
                            p.currentChannelData != null &&
                            (event.servId != p.currentChannelData.sid ||
                                event.onetId != p.currentChannelData.onid ||
                                event.transId != p.currentChannelData.tsid)
                        ) {
                            try {
                                const channelData = hbbtv.bridge.broadcast.getCurrentChannelForEvent();
                                p.currentChannelData = hbbtv.objects.createChannel(
                                    channelData
                                );
                                p.currentInstanceIndex = channelData.currentInstanceIndex;
                                p.playState = PLAY_STATE_CONNECTING;
                                dispatchChannelChangeSucceededEvent.call(
                                    this,
                                    p.currentChannelData
                                );
                                dispatchPlayStateChangeEvent.call(this, p.playState);
                            } catch (e) {
                                // Ignored
                            }
                        }
                    }
                } else {
                    console.log(
                        'Unhandled state transition. Current playState ' + p.playState + ', event:'
                    );
                    console.log(event);
                }
            };

            if (!p.onServiceInstanceChanged) {
                p.onServiceInstanceChanged = (event) => {
                    const p = privates.get(this);
                    console.log('Received onServiceInstanceChanged');
                    console.log(event);
                    p.currentInstanceIndex = event.serviceInstanceIndex;
                    if (
                        p.pendingChannelChangeSucceeded &&
                        isDashInstanceChannel(p.currentChannelData) &&
                        !isNaN(p.pendingInstanceIndex) &&
                        event.serviceInstanceIndex === p.pendingInstanceIndex
                    ) {
                        p.pendingDashInstanceConfirmed = true;
                        console.log(
                            'DEBUG_CHANNEL_STATUS: target DASH instance selected; ChannelChangeSucceeded waits for PRESENTING'
                        );
                    }
                };
            }

            hbbtv.bridge.addWeakEventListener('ChannelStatusChanged', p.onChannelStatusChanged);
            hbbtv.bridge.addWeakEventListener('ServiceInstanceChanged', p.onServiceInstanceChanged);
        }

        if (!p.onProgrammesChanged) {
            p.onProgrammesChanged = (event) => {
                console.log('Received ProgrammesChanged');
                console.log(event);
                dispatchProgrammesChanged.call(this);
            };

            hbbtv.bridge.addWeakEventListener('ProgrammesChanged', p.onProgrammesChanged);
        }

        if (!p.onParentalRatingChange) {
            p.onParentalRatingChange = (event) => {
                console.log('DEBUG_CHANNEL_STATUS: Received ParentalRatingChange - blocked=' + event.blocked + 
                    ', current playState=' + p.playState + ', waitingPlayStateConnectingConfirm=' + p.waitingPlayStateConnectingConfirm);
                console.log(event);
                if (event.blocked && p.waitingPlayStateConnectingConfirm) {
                    console.log('DEBUG_CHANNEL_STATUS: ParentalRatingChange blocked=true and waitingPlayStateConnectingConfirm=true - setting playState to CONNECTING');
                    p.playState = PLAY_STATE_CONNECTING;
                    dispatchChannelChangeSucceededEvent.call(
                        this,
                        p.currentChannelData
                    );
                    dispatchPlayStateChangeEvent.call(this, p.playState);
                }
                dispatchParentalRatingChange.call(
                    this,
                    event.contentID,
                    event.ratings,
                    event.DRMSystemID,
                    event.blocked
                );
            };

            hbbtv.bridge.addWeakEventListener('ParentalRatingChange', p.onParentalRatingChange);
        }

        if (!p.onParentalRatingError) {
            p.onParentalRatingError = (event) => {
                console.log('Received ParentalRatingError');
                console.log(event);

                dispatchParentalRatingError.call(
                    this,
                    event.contentID,
                    hbbtv.objects.createCollection(event.ratings),
                    event.DRMSystemID
                );
            };

            hbbtv.bridge.addWeakEventListener('ParentalRatingError', p.onParentalRatingError);
        }

        if (!p.onSelectedComponentChanged) {
            p.onSelectedComponentChanged = (event) => {
                const p = privates.get(this);
                try {
                    p.currentChannelComponents = null;
                    maybePresentWhenComponentsReady.call(this);
                    dispatchSelectedComponentChanged.call(this, event.componentType);
                } catch (e) {
                    if (e.name === 'SecurityError') {
                        console.log(
                            'onSelectedComponentChanged, unexpected condition: app appears broadcast-independent.'
                        );
                    }
                    throw e;
                }
            };

            hbbtv.bridge.addWeakEventListener(
                'SelectedComponentChanged',
                p.onSelectedComponentChanged
            );
        }

        if (!p.onComponentChanged) {
            p.onComponentChanged = (event) => {
                const p = privates.get(this);
                /* Update internal state */
                try {
                    p.currentChannelComponents = null;
                    maybePresentWhenComponentsReady.call(this);
                    // For COMPONENT_TYPE_ANY (more than 1 component changed) use undefined.
                    let componentType = undefined;
                    if (event.componentType != COMPONENT_TYPE_ANY) {
                        componentType = event.componentType;
                    }
                    dispatchComponentChanged.call(this, componentType);
                } catch (e) {
                    if (e.name === 'SecurityError') {
                        console.log(
                            'onComponentChanged, unexpected condition: app appears broadcast-independent.'
                        );
                    }
                    throw e;
                }
            };

            hbbtv.bridge.addWeakEventListener('ComponentChanged', p.onComponentChanged);
        }

        if (!p.onStreamEvent) {
            p.onStreamEvent = (event) => {
                console.log('Received StreamEvent');
                console.log(JSON.stringify(event));
                dispatchStreamEvent.call(
                    this,
                    event.id,
                    event.name,
                    event.data,
                    event.text,
                    event.status,
                    event.DASHEvent
                );
            };

            hbbtv.bridge.addWeakEventListener('StreamEvent', p.onStreamEvent);
        }

        if (!p.onTransitionedToBroadcastRelated) {
            p.onTransitionedToBroadcastRelated = (event) => {
                const p = privates.get(this);
                if (p.isTransitioningToBroadcastRelated) {
                    p.isTransitioningToBroadcastRelated = false;
                    setIsBroadcastRelated.call(this, true);
                    try {
                        const channelData = hbbtv.bridge.broadcast.getCurrentChannel();
                        p.currentNonQuietChannelData = p.currentChannelData = hbbtv.objects.createChannel(
                            channelData
                        );
                        p.currentInstanceIndex = channelData.currentInstanceIndex;
                        if (p.channelConfig === null) {
                            p.channelConfig = hbbtv.objects.createChannelConfig();
                        }
                    } catch (e) {
                        if (e.name === 'SecurityError') {
                            console.log(
                                'onTransitionedToBroadcastRelated, unexpected condition: app appears broadcast-independent.'
                            );
                        }
                        throw e;
                    }
                }
            };
        }

        hbbtv.bridge.addWeakEventListener(
            'TransitionedToBroadcastRelated',
            p.onTransitionedToBroadcastRelated
        );

        if (!p.onApplicationSchemeUpdated) {
            p.onApplicationSchemeUpdated = (event) => {
                if (event.scheme !== LINKED_APP_SCHEME_1_1) {
                    // ERRATA0900: a delayed XML AIT from the previous instance must not
                    // complete setChannel onto a DVB-I DASH instance. Wait for
                    // ServiceInstanceChanged (HowRelated is published there first).
                    if (
                        p.pendingChannelChangeSucceeded &&
                        isDashInstanceChannel(p.currentChannelData) &&
                        !p.pendingDashInstanceConfirmed
                    ) {
                        console.log(
                            'DEBUG_CHANNEL_STATUS: ignoring ApplicationSchemeUpdated until target DASH instance is selected'
                        );
                        return;
                    }
                    if (dashInstanceLockWaitsForPresenting(p)) {
                        console.log(
                            'DEBUG_CHANNEL_STATUS: ignoring ApplicationSchemeUpdated until DASH PRESENTING'
                        );
                        return;
                    }
                    dispatchChannelChangeSucceededEvent.call(this, p.currentChannelData);
                }
            }

            hbbtv.bridge.addWeakEventListener(
                "ApplicationSchemeUpdated",
                p.onApplicationSchemeUpdated
            );
        }
    }

    function removeBridgeEventListeners() {
        const p = privates.get(this);
        if (p.onChannelStatusChanged != null) {
            hbbtv.bridge.removeWeakEventListener('ChannelStatusChanged', p.onChannelStatusChanged);
            p.onChannelStatusChanged = null;
        }
        if (p.onServiceInstanceChanged != null) {
            hbbtv.bridge.removeWeakEventListener('ServiceInstanceChanged', p.onServiceInstanceChanged);
            p.onServiceInstanceChanged = null;
        }
        if (p.onProgrammesChanged != null) {
            hbbtv.bridge.removeWeakEventListener('ProgrammesChanged', p.onProgrammesChanged);
            p.onProgrammesChanged = null;
        }
        if (p.onParentalRatingChange != null) {
            hbbtv.bridge.removeWeakEventListener('ParentalRatingChange', p.onParentalRatingChange);
            p.onParentalRatingChange = null;
        }
        if (p.onParentalRatingError != null) {
            hbbtv.bridge.removeWeakEventListener('ParentalRatingError', p.onParentalRatingError);
            p.onParentalRatingError = null;
        }
        if (p.onSelectedComponentChanged != null) {
            hbbtv.bridge.removeWeakEventListener(
                'SelectedComponentChanged',
                p.onSelectedComponentChanged
            );
            p.onSelectedComponentChanged = null;
        }
        if (p.onComponentChanged != null) {
            hbbtv.bridge.removeWeakEventListener('ComponentChanged', p.onComponentChanged);
            p.onComponentChanged = null;
        }
        if (p.onStreamEvent != null) {
            hbbtv.bridge.removeWeakEventListener('StreamEvent', p.onStreamEvent);
            p.onStreamEvent = null;
        }
        if (p.onTransitionedToBroadcastRelated != null) {
            hbbtv.bridge.removeWeakEventListener(
                'TransitionedToBroadcastRelated',
                p.onTransitionedToBroadcastRelated
            );
            p.onTransitionedToBroadcastRelated = null;
        }
        if (p.onDRMRightsError != null) {
            hbbtv.bridge.removeWeakEventListener('DRMRightsError', p.onDRMRightsError);
            p.onDRMRightsError = null;
        }
        if (p.onApplicationSchemeUpdated != null) {
            hbbtv.bridge.removeWeakEventListener('ApplicationSchemeUpdated', p.onApplicationSchemeUpdated);
            p.onApplicationSchemeUpdated = null;
        }
    }

    function cycleChannel(delta) {
        const p = privates.get(this);
        if (!p.isBroadcastRelated) {
            throw new DOMException('', 'SecurityError');
        }
        if (p.playState === PLAY_STATE_UNREALIZED || p.channelConfig.channelList.length < 2) {
            dispatchChannelChangeErrorEvent.call(
                this,
                p.currentNonQuietChannelData,
                CHANNEL_STATUS_CANNOT_BE_CHANGED
            );
            return;
        }
        let i;
        for (i = 0; i < p.channelConfig.channelList.length; i++) {
            if (p.channelConfig.channelList.item(i).ccid === p.currentNonQuietChannelData.ccid) {
                /* DAE vol5 Table 8 state transition #3 happens in setChannel() */
                let n = p.channelConfig.channelList.length;
                this.setChannel(p.channelConfig.channelList.item((i + delta + n) % n));
                return;
            }
        }
        if (p.playState === PLAY_STATE_CONNECTING) {
            /* DAE vol5 Table 8 state transition #4 */
            unregisterAllStreamEventListeners(p);
            p.playState = PLAY_STATE_UNREALIZED;
            /* Note: playState is updated first, so it is already correct for the ChannelChangeErrorEvent */
            dispatchChannelChangeErrorEvent.call(
                this,
                p.currentNonQuietChannelData,
                CHANNEL_STATUS_CANNOT_BE_CHANGED
            );
            dispatchPlayStateChangeEvent.call(this, p.playState, CHANNEL_STATUS_CANNOT_BE_CHANGED);
        } else {
            /* Either Presenting or Stopped */
            /* DAE vol5 Table 8 state transition #5 */
            dispatchChannelChangeErrorEvent.call(
                this,
                p.currentNonQuietChannelData,
                CHANNEL_STATUS_CANNOT_BE_CHANGED
            );
        }
    }

    /** Broadcast-independent applications: shall throw a "Security Error" */
    function mandatoryBroadcastRelatedSecurityCheck(p) {
        if (!p.isBroadcastRelated) {
            throw new DOMException('', 'SecurityError');
        }
    }

    function raiseStreamEventError(name, listener) {
        const event = new Event('StreamEvent');
        Object.assign(event, {
            name: name,
            data: '',
            text: '',
            status: 'error',
        });
        hbbtv.utils.runOnMainLooper(this, function() {
            listener(event);
        });
    }

    function registerStreamEventListener(
        p,
        targetURL,
        eventName,
        listener,
        componentTag = -1,
        streamEventId = -1
    ) {
        //Check whether it is already added
        const streamEventID = getStreamEventID(targetURL, eventName);
        const streamEventInternalID = p.streamEventListenerIdMap.get(streamEventID);
        console.log('add Stream Event Listener with: ' + targetURL + ', on event:' + eventName);
        if (streamEventInternalID) {
            const streamEventListeners = p.streamEventListenerMap.get(streamEventInternalID);
            if (streamEventListeners) {
                if (!streamEventListeners.includes(listener)) {
                    streamEventListeners.push(listener);
                }
            } else {
                console.error(
                    'Unconsistent state, ' +
                    streamEventID +
                    '(' +
                    streamEventInternalID +
                    ') has no listeners.'
                );
            }
        } else {
            let resultId = hbbtv.bridge.broadcast.addStreamEventListener(
                targetURL,
                eventName,
                componentTag,
                streamEventId
            );
            if (resultId == -1) {
                console.error(
                    'Failed to add Stream Event Listener with: ' +
                    targetURL +
                    ', on event:' +
                    eventName
                );
                raiseStreamEventError(eventName, listener);
            } else {
                p.streamEventListenerIdMap.set(streamEventID, resultId);
                p.streamEventListenerMap.set(resultId, new Array(listener));
            }
        }
    }

    function unregisterAllStreamEventListeners(p) {
        p.streamEventListenerMap.clear();
        p.streamEventListenerIdMap.forEach(function(value, key) {
            hbbtv.bridge.broadcast.removeStreamEventListener(value);
        });
        p.streamEventListenerIdMap.clear();
    }

    function acquireActiveState() {
        if (gActiveStateOwner !== null) {
            const owner = hbbtv.utils.weakDeref(gActiveStateOwner);
            if (JSON.stringify(owner) !== JSON.stringify(this)) {
                return false;
            }
        }
        gActiveStateOwner = hbbtv.utils.weakRef(this);
        gObjectFinalizedWhileActive.register(this);
        return true;
    }

    function releaseActiveState() {
        if (gActiveStateOwner !== null) {
            const owner = hbbtv.utils.weakDeref(gActiveStateOwner);
            if (owner === this) {
                gObjectFinalizedWhileActive.unregister(this);
                hbbtv.bridge.broadcast.setPresentationSuspended(gBroadbandAvInUse);
                gActiveStateOwner = null;
            }
        }
    }

    function dispatchFocusEvent() {
        const event = new Event('focus');
        privates.get(this).eventDispatcher.dispatchEvent(event);
    }

    function dispatchBlurEvent() {
        const event = new Event('blur');
        privates.get(this).eventDispatcher.dispatchEvent(event);
    }

    function dispatchFullScreenChangeEvent() {
        const event = new Event('FullScreenChange');
        privates.get(this).eventDispatcher.dispatchEvent(event);
    }

    function dispatchChannelChangeErrorEvent(channel, errorState) {
        const event = new Event('ChannelChangeError');
        Object.assign(event, {
            channel: channel,
            errorState: errorState,
        });
        privates.get(this).eventDispatcher.dispatchEvent(event);
    }

    function dispatchChannelChangeSucceededEvent(channel) {
        const p = privates.get(this);
        p.pendingChannelChangeSucceeded = false;
        console.log('DEBUG_CHANNEL_STATUS: dispatchChannelChangeSucceededEvent called - current playState=' + p.playState + 
            ' (CONNECTING=1, PRESENTING=2), channel=' + (channel ? (channel.onid + ',' + channel.tsid + ',' + channel.sid) : 'null'));
        const event = new Event('ChannelChangeSucceeded');
        Object.assign(event, {
            channel: channel,
        });
        privates.get(this).eventDispatcher.dispatchEvent(event);
    }

    /**
     * Linked-application "media in parallel" may bind while DVB-I RF components are still loading.
     * Complete CONNECTING → PRESENTING once components are available, or immediately for a
     * selected DVB-I DASH instance (O.5.4 / ERRATA0400).
     */
    function maybePresentWhenComponentsReady() {
        const p = privates.get(this);
        if (p.playState !== PLAY_STATE_CONNECTING || !p.currentChannelData) {
            return;
        }
        if (gBroadbandAvInUse) {
            return;
        }
        if (hbbtv.bridge.manager.getApplicationScheme() !== LINKED_APP_SCHEME_1_1) {
            return;
        }
        if (
            p.pendingChannelChangeSucceeded &&
            isDashInstanceChannel(p.currentChannelData) &&
            !p.pendingDashInstanceConfirmed
        ) {
            return;
        }
        try {
            const dashReady = isSelectedDashInstance(
                p.currentChannelData,
                p.currentInstanceIndex
            );
            let ready = dashReady;
            if (!ready) {
                const components = hbbtv.bridge.broadcast.getComponents(
                    p.currentChannelData.ccid,
                    -1
                );
                ready = !!(components && components.length > 0);
            }
            if (ready) {
                p.playState = PLAY_STATE_PRESENTING;
                if (p.pendingChannelChangeSucceeded) {
                    dispatchChannelChangeSucceededEvent.call(this, p.currentChannelData);
                }
                dispatchPlayStateChangeEvent.call(this, p.playState);
            }
        } catch (e) {
            // Ignore; remain CONNECTING until a later component update or channel status.
        }
    }

    function dispatchPlayStateChangeEvent(state, error) {
        const stateNames = {
            0: 'UNREALIZED',
            1: 'CONNECTING',
            2: 'PRESENTING',
            3: 'STOPPED'
        };
        console.log('DEBUG_CHANNEL_STATUS: dispatchPlayStateChangeEvent called - playState=' + state + ' (' + (stateNames[state] || 'UNKNOWN') + '), error=' + error);
        const event = new Event('PlayStateChange');
        Object.assign(event, {
            state: state,
            error: error,
        });
        privates.get(this).eventDispatcher.dispatchEvent(event);
    }

    function dispatchProgrammesChanged() {
        const p = privates.get(this);
        mandatoryBroadcastRelatedSecurityCheck(p);
        const event = new Event('ProgrammesChanged');
        p.eventDispatcher.dispatchEvent(event);
    }

    function dispatchParentalRatingChange(contentID, ratings, DRMSystemID, blocked) {
        const p = privates.get(this);
        mandatoryBroadcastRelatedSecurityCheck(p);
        const event = new Event('ParentalRatingChange');
        Object.assign(event, {
            contentID: contentID,
            ratings: ratings,
            DRMSystemID: DRMSystemID,
            blocked: blocked,
        });
        p.eventDispatcher.dispatchEvent(event);
    }

    function dispatchParentalRatingError(contentID, ratings, DRMSystemID) {
        const p = privates.get(this);
        mandatoryBroadcastRelatedSecurityCheck(p);
        const event = new Event('ParentalRatingError');
        Object.assign(event, {
            contentID: contentID,
            ratings: ratings,
            DRMSystemID: DRMSystemID,
        });
        p.eventDispatcher.dispatchEvent(event);
    }

    function dispatchSelectedComponentChanged(componentType) {
        const p = privates.get(this);
        mandatoryBroadcastRelatedSecurityCheck(p);
        const event = new Event('SelectedComponentChanged');
        Object.assign(event, {
            componentType: componentType,
        });
        p.eventDispatcher.dispatchEvent(event);
        const event2 = new Event('SelectedComponentChange');
        Object.assign(event2, {
            componentType: componentType,
        });
        p.eventDispatcher.dispatchEvent(event2);
    }

    function dispatchComponentChanged(componentType) {
        const p = privates.get(this);
        mandatoryBroadcastRelatedSecurityCheck(p);
        const event = new Event('ComponentChanged');
        Object.assign(event, {
            componentType: componentType,
        });
        p.eventDispatcher.dispatchEvent(event);
    }

    function dispatchDRMRightsError(errorState, contentID, DRMSystemID, rightsIssuerURL) {
        const p = privates.get(this);
        mandatoryBroadcastRelatedSecurityCheck(p);
        const event = new Event('DRMRightsError');
        Object.assign(event, {
            errorState: errorState,
            contentID: contentID,
            DRMSystemID: DRMSystemID,
            rightsIssuerURL: rightsIssuerURL,
        });
        p.eventDispatcher.dispatchEvent(event);
    }

    function dispatchStreamEvent(id, name, data, text, status, dashEventData) {
        const p = privates.get(this);
        mandatoryBroadcastRelatedSecurityCheck(p);
        const event = new Event('StreamEvent');
        const eventData = {
            name: name,
            data: data,
            text: text,
            status: status,
            DASHEvent: dashEventData
        };
        if (dashEventData) {
            // update the eventData reference
            hbbtv.objects.createDASHEvent(eventData);
        }
        Object.assign(event, eventData);
        const listeners = p.streamEventListenerMap.get(id);
        if (listeners) {
            listeners.forEach((listener) =>
                hbbtv.utils.runOnMainLooper(this, function() {
                    listener(event);
                })
            );
            if (status === 'error') {
                p.streamEventListenerMap.delete(id);
                for (let [key, value] of p.streamEventListenerIdMap) {
                    if (value === id) {
                        p.streamEventListenerIdMap.delete(key);
                        break;
                    }
                }
            }
        }
    }

    function setIsBroadcastRelated(value) {
        const p = privates.get(this);
        p.isBroadcastRelated = value;
        if (p.channelConfig !== null) {
            hbbtv.objects.ChannelConfig.setIsBroadcastRelated.call(p.channelConfig, value);
        }
    }

    function avComponentArrayToCollection(avArray) {
        let result = [];
        avArray.forEach(function(item, index) {
            switch (item.type) {
                case COMPONENT_TYPE_VIDEO:
                    result[index] = hbbtv.objects.createAVVideoComponent(item);
                    break;
                case COMPONENT_TYPE_AUDIO:
                    result[index] = hbbtv.objects.createAVAudioComponent(item);
                    break;
                case COMPONENT_TYPE_SUBTITLE:
                    result[index] = hbbtv.objects.createAVSubtitleComponent(item);
                    break;
                default:
                    result[index] = hbbtv.objects.createAVComponent(item);
            }
        }, this);
        return hbbtv.objects.createCollection(result);
    }

    function getComponentId(component) {
        let id = null;
        if (
            component.type == COMPONENT_TYPE_VIDEO &&
            hbbtv.objects.AVVideoComponent.prototype.isPrototypeOf(component)
        ) {
            id = hbbtv.objects.AVVideoComponent.getId.call(component);
        } else if (
            component.type == COMPONENT_TYPE_AUDIO &&
            hbbtv.objects.AVAudioComponent.prototype.isPrototypeOf(component)
        ) {
            id = hbbtv.objects.AVAudioComponent.getId.call(component);
        } else if (
            component.type == COMPONENT_TYPE_SUBTITLE &&
            hbbtv.objects.AVSubtitleComponent.prototype.isPrototypeOf(component)
        ) {
            id = hbbtv.objects.AVSubtitleComponent.getId.call(component);
        }
        if (id === undefined) {
            id = null;
        }
        return id;
    }

    function getStreamEventID(targetURL, eventName) {
        return targetURL + '::' + eventName;
    }

    function notifyBroadbandAvInUse(broadbandAvInUse) {
        // This is a "static" method that does not use a "this" variable. Call this method like:
        // hbbtv.objects.VideoBroadcast.notifyBroadbandAvInUse(true).
        if (gBroadbandAvInUse !== broadbandAvInUse) {
            gBroadbandAvInUse = broadbandAvInUse;
            // Always tell the terminal. A.2.4.1 / ERRATA0700–0720: while the app holds
            // decoders, native DASH/RF must stay suspended even if a v/b object is realized.
            hbbtv.bridge.broadcast.setPresentationSuspended(broadbandAvInUse);
            if (!broadbandAvInUse && gActiveStateOwner !== null) {
                const owner = hbbtv.utils.weakDeref(gActiveStateOwner);
                if (owner) {
                    maybePresentWhenComponentsReady.call(owner);
                }
            }
        }
    }

    function initialise() {
        /* TODO: the video/broadcast embedded object (...) SHALL adhere to the tuner related security
         * requirements in section 10.1.3.1. => TLS handshake through a valid X.509v3 certificate */
        privates.set(this, {});
        const p = privates.get(this);
        p.eventDispatcher = new hbbtv.utils.EventDispatcher(this);
        /* Associates targetURL::eventName with internal ID */
        p.streamEventListenerIdMap = new defaultEntities.Map();
        /* Associates internal ID with registered listeners */
        p.streamEventListenerMap = new defaultEntities.Map();
        p.playState = PLAY_STATE_UNREALIZED;
        p.waitingPlayStateConnectingConfirm = false;
        p.fullScreen = false;
        p.x = 0;
        p.y = 0;
        p.width = 1280;
        p.height = 720;
        this.widescreen = true; // TODO
        p.display_none = this.style.display === 'none';

        // The application either starts off broadcast-independent or becomes broadcast-independent
        // when setChannel(null, ...) is called on the realized v/b object. Here we set we are
        // broadcast-related unless getCurrentChannel() throws SecurityError.
        p.currentChannelData = null;
        p.currentInstanceIndex = null;
        p.currentNonQuietChannelData = null;
        p.channelConfig = null;
        p.isTransitioningToBroadcastRelated = false;
        p.quiet = 0;
        setIsBroadcastRelated.call(this, true);
        try {
            const channelData = hbbtv.bridge.broadcast.getCurrentChannel();
            p.currentNonQuietChannelData = p.currentChannelData = hbbtv.objects.createChannel(
                channelData
            );
            p.currentInstanceIndex = channelData.currentInstanceIndex;
            p.channelConfig = hbbtv.objects.createChannelConfig();
        } catch (e) {
            if (e.name === 'SecurityError') {
                p.currentInstanceIndex = p.currentNonQuietChannelData = p.currentChannelData = null;
                setIsBroadcastRelated.call(this, false);
            } else {
                throw e;
            }
        }

        hbbtv.drmManager.registerVideoBroadcast(
            this,
            dispatchParentalRatingChange,
            dispatchParentalRatingError,
            dispatchDRMRightsError
        );
    }

    return {
        prototype: prototype,
        notifyBroadbandAvInUse: notifyBroadbandAvInUse,
        initialise: initialise,
    };
})();

hbbtv.objects.upgradeToVideoBroadcast = function(object) {
    /* TODO: Support only one active v/b object HbbTV 2.0.3 A.2.4.2 */
    Object.setPrototypeOf(object, hbbtv.objects.VideoBroadcast.prototype);
    hbbtv.objects.VideoBroadcast.initialise.call(object);
};

hbbtv.objectManager.registerObject({
    name: 'video/broadcast',
    mimeTypes: ['video/broadcast'],
    oipfObjectFactoryMethodName: 'createVideoBroadcastObject',
    upgradeObject: hbbtv.objects.upgradeToVideoBroadcast,
});
/**
 * @fileOverview OIPF AVComponent class
 * @license ORB Software. Copyright (c) 2022 Ocean Blue Software Limited
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

hbbtv.objects.AVComponent = (function() {
    const prototype = {};
    const privates = new WeakMap();
    const publicProperties = ['componentTag', 'pid', 'type', 'encoding', 'encrypted'];

    hbbtv.utils.defineGetterProperties(prototype, {
        componentTag() {
            const p = privates.get(this);
            return p.avComponentData.componentTag;
        },
        pid() {
            const p = privates.get(this);
            return p.avComponentData.pid;
        },
        type() {
            const p = privates.get(this);
            return p.avComponentData.type;
        },
        encoding() {
            const p = privates.get(this);
            return p.avComponentData.encoding;
        },
        encrypted() {
            const p = privates.get(this);
            return p.avComponentData.encrypted;
        },
    });

    // Initialise an instance of prototype
    function initialise(avComponentData, vb) {
        console.log('AVComponent initialise');
        privates.set(this, {});
        const p = privates.get(this);
        p.avComponentData = avComponentData; // Hold reference to caller's object
        p.vb = vb && hbbtv.utils.HAS_WEAKREF_SUPPORT ? new WeakRef(vb) : vb;
    }

    // Private method to get a copy of the AVComponent data
    /*function cloneAVComponentData() {
      return Object.assign({}, privates.get(this).avComponentData);
   }*/

    prototype.toString = function() {
        return JSON.stringify(privates.get(this).avComponentData, publicProperties);
    };

    return {
        prototype: prototype,
        initialise: initialise,
        //cloneAVComponentData: cloneAVComponentData
    };
})();

hbbtv.objects.createAVComponent = function(avComponentData) {
    // Create new instance of hbbtv.objects.Channel.prototype
    const avComponent = Object.create(hbbtv.objects.AVComponent.prototype);
    hbbtv.objects.AVComponent.initialise.call(avComponent, avComponentData);
    return avComponent;
};/**
 * @fileOverview OIPF AVVideoComponent class
 * @license ORB Software. Copyright (c) 2022 Ocean Blue Software Limited
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

hbbtv.objects.AVVideoComponent = (function() {
    const prototype = {};
    const privates = new WeakMap();
    const publicProperties = [
        'componentTag',
        'pid',
        'type',
        'encoding',
        'encrypted',
        'aspectRatio',
    ];

    hbbtv.utils.defineGetterProperties(prototype, {
        componentTag() {
            const p = privates.get(this);
            return p.avComponentData.componentTag;
        },
        pid() {
            const p = privates.get(this);
            return p.avComponentData.pid;
        },
        type() {
            const p = privates.get(this);
            return p.avComponentData.type;
        },
        encoding() {
            const p = privates.get(this);
            return p.avComponentData.encoding;
        },
        encrypted() {
            const p = privates.get(this);
            return p.avComponentData.encrypted;
        },
        aspectRatio() {
            const p = privates.get(this);
            let aspectRatio = p.avComponentData.aspectRatio;
            if (aspectRatio !== undefined) {
                if (aspectRatio === 0) {
                    aspectRatio = 1.33; // 4:3
                } else {
                    aspectRatio = 1.78; // 16:9
                }
            }
            return aspectRatio;
        },
    });

    // Initialise an instance of prototype
    function initialise(avVideoComponentData, vb) {
        privates.set(this, {});
        const p = privates.get(this);
        p.avComponentData = avVideoComponentData; // Hold reference to caller's object
    }

    function getId() {
        const p = privates.get(this);
        return p.avComponentData.id;
    }

    prototype.toString = function() {
        return JSON.stringify(privates.get(this).avComponentData, publicProperties);
    };

    return {
        prototype: prototype,
        initialise: initialise,
        getId: getId,
    };
})();

hbbtv.objects.createAVVideoComponent = function(avVideoComponentData) {
    // Create new instance of hbbtv.objects.AVVideoComponent.prototype
    const avVideoComponent = Object.create(hbbtv.objects.AVVideoComponent.prototype);
    hbbtv.objects.AVVideoComponent.initialise.call(avVideoComponent, avVideoComponentData);
    return avVideoComponent;
};/**
 * @fileOverview OIPF AVAudioComponent class
 * @license ORB Software. Copyright (c) 2022 Ocean Blue Software Limited
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

hbbtv.objects.AVAudioComponent = (function() {
    const prototype = {};
    const privates = new WeakMap();
    const publicProperties = [
        'componentTag',
        'pid',
        'type',
        'encoding',
        'encrypted',
        'language',
        'audioDescription',
        'audioChannels',
    ];

    hbbtv.utils.defineGetterProperties(prototype, {
        componentTag() {
            const p = privates.get(this);
            return p.avComponentData.componentTag;
        },
        pid() {
            const p = privates.get(this);
            return p.avComponentData.pid;
        },
        type() {
            const p = privates.get(this);
            return p.avComponentData.type;
        },
        encoding() {
            const p = privates.get(this);
            return p.avComponentData.encoding;
        },
        encrypted() {
            const p = privates.get(this);
            return p.avComponentData.encrypted;
        },
        language() {
            const p = privates.get(this);
            return p.avComponentData.language;
        },
        audioDescription() {
            const p = privates.get(this);
            return p.avComponentData.audioDescription;
        },
        audioChannels() {
            const p = privates.get(this);
            return p.avComponentData.audioChannels;
        },
    });

    // Initialise an instance of prototype
    function initialise(avAudioComponentData) {
        privates.set(this, {});

        const p = privates.get(this);
        p.avComponentData = avAudioComponentData; // Hold reference to caller's object
    }

    function getId() {
        const p = privates.get(this);
        return p.avComponentData.id;
    }

    prototype.toString = function() {
        return JSON.stringify(privates.get(this).avComponentData, publicProperties);
    };

    return {
        prototype: prototype,
        initialise: initialise,
        getId: getId,
    };
})();

hbbtv.objects.createAVAudioComponent = function(avAudioComponentData) {
    // Create new instance of hbbtv.objects.AVAudioComponent.prototype
    const avAudioComponent = Object.create(hbbtv.objects.AVAudioComponent.prototype);
    hbbtv.objects.AVAudioComponent.initialise.call(avAudioComponent, avAudioComponentData);
    return avAudioComponent;
};/**
 * @fileOverview OIPF AVSubtitleComponent class
 * @license ORB Software. Copyright (c) 2022 Ocean Blue Software Limited
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

hbbtv.objects.AVSubtitleComponent = (function() {
    const prototype = {};
    const privates = new WeakMap();
    const publicProperties = [
        'componentTag',
        'pid',
        'type',
        'encoding',
        'encrypted',
        'language',
        'hearingImpaired',
        'label',
    ];

    hbbtv.utils.defineGetterProperties(prototype, {
        componentTag() {
            const p = privates.get(this);
            return p.avComponentData.componentTag;
        },
        pid() {
            const p = privates.get(this);
            return p.avComponentData.pid;
        },
        type() {
            const p = privates.get(this);
            return p.avComponentData.type;
        },
        encoding() {
            const p = privates.get(this);
            return p.avComponentData.encoding;
        },
        encrypted() {
            const p = privates.get(this);
            return p.avComponentData.encrypted;
        },
        language() {
            const p = privates.get(this);
            return p.avComponentData.language;
        },
        hearingImpaired() {
            const p = privates.get(this);
            return p.avComponentData.hearingImpaired;
        },
        label() {
            const p = privates.get(this);
            return p.avComponentData.label;
        },
    });

    // Initialise an instance of prototype
    function initialise(avSubtitleComponentData) {
        privates.set(this, {});
        const p = privates.get(this);
        p.avComponentData = avSubtitleComponentData; // Hold reference to caller's object
    }

    function getId() {
        const p = privates.get(this);
        return p.avComponentData.id;
    }

    prototype.toString = function() {
        return JSON.stringify(privates.get(this).avComponentData, publicProperties);
    };

    return {
        prototype: prototype,
        initialise: initialise,
        getId: getId,
    };
})();

hbbtv.objects.createAVSubtitleComponent = function(avSubtitleComponentData) {
    // Create new instance of hbbtv.objects.AVSubtitleComponent.prototype
    const avSubtitleComponent = Object.create(hbbtv.objects.AVSubtitleComponent.prototype);
    hbbtv.objects.AVSubtitleComponent.initialise.call(avSubtitleComponent, avSubtitleComponentData);
    return avSubtitleComponent;
};/**
 * @fileOverview keyset class
 * See: {@link https://web.archive.org/web/20200219165053/http://www.oipf.tv/web-spec/volume5.html#keyset-class}
 * @license ORB Software. Copyright (c) 2022 Ocean Blue Software Limited
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

hbbtv.objects.KeySet = (function() {
    const prototype = {};
    const privates = new WeakMap();

    hbbtv.utils.defineConstantProperties(prototype, {
        RED: 0x1,
        GREEN: 0x2,
        YELLOW: 0x4,
        BLUE: 0x8,
        NAVIGATION: 0x10,
        VCR: 0x20,
        SCROLL: 0x40,
        INFO: 0x80,
        NUMERIC: 0x100,
        ALPHA: 0x200,
        OTHER: 0x400,
    });

    Object.defineProperty(prototype, 'value', {
        get() {
            if (privates.get(this).disabled) {
                return 0;
            }
            return hbbtv.bridge.manager.getKeyValues();
        },
    });

    Object.defineProperty(prototype, 'otherKeys', {
        get() {
            if (privates.get(this).disabled) {
                return [];
            }
            return hbbtv.bridge.manager.getOtherKeyValues();
        },
    });

    Object.defineProperty(prototype, 'maximumValue', {
        get() {
            return hbbtv.bridge.manager.getKeyMaximumValue();
        },
    });

    Object.defineProperty(prototype, 'maximumOtherKeys', {
        get() {
            return hbbtv.bridge.manager.getKeyMaximumOtherKeys();
        },
    });

    Object.defineProperty(prototype, 'supportsPointer', {
        get() {
            return false; // Not currently supported.
        },
        set(ignored) {
        }
    });

    prototype.setValue = function(value, otherKeys) {
        if (privates.get(this).disabled) {
            return 0;
        }
        return hbbtv.bridge.manager.setKeyValue(value, otherKeys);
    };

    prototype.getKeyIcon = function(code) {
        if (privates.get(this).disabled) {
            return '';
        }
        return hbbtv.bridge.manager.getKeyIcon(code);
    };

    function initialise(data) {
        privates.set(this, {});
        const p = privates.get(this);
        p.disabled = data.disabled;
    }

    return {
        prototype: prototype,
        initialise: initialise,
    };
})();

hbbtv.objects.createKeySet = function(data) {
    const keyset = Object.create(hbbtv.objects.KeySet.prototype);
    hbbtv.objects.KeySet.initialise.call(keyset, data);
    return keyset;
};/**
 * @fileOverview ApplicationPrivateData class
 * See: {@link https://web.archive.org/web/20200219165053/http://www.oipf.tv/web-spec/volume5.html#applicationprivatedata-class}
 * @license ORB Software. Copyright (c) 2022 Ocean Blue Software Limited
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

hbbtv.objects.PrivateData = (function() {
    const prototype = {};
    const privates = new WeakMap();

    Object.defineProperty(prototype, 'currentChannel', {
        get() {
            if (privates.get(this).disabled) {
                return null;
            }
            return hbbtv.objects.createChannel(hbbtv.bridge.broadcast.getCurrentChannel());
        },
    });

    Object.defineProperty(prototype, 'keyset', {
        get() {
            return privates.get(this).keySet;
        },
    });

    Object.defineProperty(prototype, 'applicationHowRelatedHref', {
        get() {
            if (privates.get(this).disabled) {
                return undefined;
            }
            return hbbtv.bridge.manager.getApplicationHowRelatedHref();
        },
    });

    prototype.getFreeMem = function() {
        if (privates.get(this).disabled) {
            return 0;
        }
        return hbbtv.bridge.manager.getFreeMem();
    };

    function initialise(data) {
        privates.set(this, {});
        const p = privates.get(this);
        p.disabled = data.disabled;
        p.keySet = hbbtv.objects.createKeySet({
            disabled: p.disabled,
        });
    }

    return {
        prototype: prototype,
        initialise: initialise,
    };
})();

hbbtv.objects.createPrivateData = function(data) {
    const privateData = Object.create(hbbtv.objects.PrivateData.prototype);
    hbbtv.objects.PrivateData.initialise.call(privateData, data);
    return privateData;
};/**
 * @fileOverview OIPF Application class
 * See: {@link https://web.archive.org/web/20200219165053/http://www.oipf.tv/web-spec/volume5.html#application-class}
 * @license ORB Software. Copyright (c) 2022 Ocean Blue Software Limited
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

hbbtv.objects.Application = (function() {
    const prototype = {};
    const privates = new WeakMap();

    prototype.createApplication = function(uri) {
        if (privates.get(this).disabled) {
            return null;
        }
        const url = new defaultEntities.URL(uri, document.location.href);
        if (hbbtv.bridge.manager.createApplication(url.href) === true) {
            return hbbtv.objects.createApplication({
                disabled: true,
            });
        }
        return null;
    };

    prototype.destroyApplication = function() {
        if (privates.get(this).disabled) {
            return;
        }
        hbbtv.bridge.manager.destroyApplication();
    };

    prototype.show = function() {
        if (privates.get(this).disabled) {
            return;
        }
        try {
            hbbtv.bridge.manager.showApplication();
        } catch (e) {
            if (e.message !== 'NotRunning') {
                throw e;
            }
        }
    };

    prototype.hide = function() {
        if (privates.get(this).disabled) {
            return;
        }
        try {
            hbbtv.bridge.manager.hideApplication();
        } catch (e) {
            if (e.message !== 'NotRunning') {
                throw e;
            }
        }
    };

    Object.defineProperty(prototype, 'privateData', {
        get() {
            return privates.get(this).privateData;
        },
    });

    function initialise(data) {
        privates.set(this, {});
        const p = privates.get(this);
        p.disabled = data.disabled;
        p.privateData = hbbtv.objects.createPrivateData({
            disabled: p.disabled,
        });
    }

    return {
        prototype: prototype,
        initialise: initialise,
    };
})();

hbbtv.objects.createApplication = function(data) {
    // Create new instance of hbbtv.objects.Application
    const application = Object.create(hbbtv.objects.Application.prototype);
    hbbtv.objects.Application.initialise.call(application, data);
    return application;
};
/**
 * @fileOverview OIPF application manager object.
 * See: {@link https://web.archive.org/web/20200219165053/http://www.oipf.tv/web-spec/volume5.html#application-oipfApplicationManager}
 * @license ORB Software. Copyright (c) 2022 Ocean Blue Software Limited
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

hbbtv.objects.ApplicationManager = (function() {
    // Create new instance that extends HTMLObjectElement
    const prototype = Object.create(HTMLObjectElement.prototype);
    const privates = new WeakMap();
    const gGarbageCollectionBlocked = new Set();
    const LINKED_APP_SCHEME_1_2 = "urn:dvb:metadata:cs:LinkedApplicationCS:2019:1.2";
    const LINKED_APP_SCHEME_2 = "urn:dvb:metadata:cs:LinkedApplicationCS:2019:2";
    const LINKED_APP_SCHEME_4_1 = "urn:dvb:metadata:cs:LinkedApplicationCS:2019:4.1";
    const LINKED_APP_SCHEME_4_2 = "urn:dvb:metadata:cs:LinkedApplicationCS:2019:4.2";
    const LINKED_APP_SCHEME_4_3 = "urn:dvb:metadata:cs:LinkedApplicationCS:2019:4.3";

    prototype.getOwnerApplication = function(page) {
        return hbbtv.objects.createApplication({
            disabled: false,
        });
    };

    // DOM level 1 event methods
    prototype.addEventListener = function(type, listener) {
        if (privates.get(this).eventDispatcher.addCountedEventListener(type, listener) > 0) {
            gGarbageCollectionBlocked.add(this);
        }
    };

    prototype.removeEventListener = function(type, listener) {
        if (privates.get(this).eventDispatcher.removeCountedEventListener(type, listener) == 0) {
            gGarbageCollectionBlocked.delete(this);
        }
    };

    // DOM level 0 event properties
    Object.defineProperty(prototype, 'onLowMemory', {
        get() {
            return privates.get(this).onLowMemoryDomLevel0;
        },
        set(listener) {
            const p = privates.get(this);
            if (p.onLowMemoryDomLevel0) {
                this.removeEventListener('LowMemory', p.onLowMemoryDomLevel0);
            }
            p.onLowMemoryDomLevel0 = listener;
            if (listener) {
                this.addEventListener('LowMemory', p.onLowMemoryDomLevel0);
            }
        },
    });

    Object.defineProperty(prototype, 'onApplicationLoadError', {
        get() {
            return privates.get(this).onApplicationLoadErrorDomLevel0;
        },
        set(listener) {
            const p = privates.get(this);
            if (p.onApplicationLoadErrorDomLevel0) {
                this.removeEventListener('ApplicationLoadError', p.onApplicationLoadErrorDomLevel0);
            }
            p.onApplicationLoadErrorDomLevel0 = listener;
            if (listener) {
                this.addEventListener('ApplicationLoadError', p.onApplicationLoadErrorDomLevel0);
            }
        },
    });

    // Internal listeners
    function addBridgeEventListeners() {
        const p = privates.get(this);
        p.onLowMemory = (event) => {
            console.log('The system is running low on memory!');
            const lowMemoryevent = new Event('LowMemory');
            privates.get(this).eventDispatcher.dispatchEvent(lowMemoryevent);
        };
        hbbtv.bridge.addWeakEventListener('LowMemory', p.onLowMemory);

        p.onApplicationLoadError = (event) => {
            console.log('Application load error!');
            const ev = new Event('ApplicationLoadError');
            Object.assign(ev, {
                appl: hbbtv.objects.createApplication({
                    disabled: true,
                }),
            });
            privates.get(this).eventDispatcher.dispatchEvent(ev);
        };
        hbbtv.bridge.addWeakEventListener('ApplicationLoadError', p.onApplicationLoadError);

        p.onApplicationSchemeUpdated = (event) => {
            console.log('onApplicationSchemeUpdated', event.scheme);
            const currentURL = new URL(window.location.href);
            switch (event.scheme) {
                case LINKED_APP_SCHEME_1_2:
                    currentURL.searchParams.set("lloc", "service");
                    break;
                case LINKED_APP_SCHEME_2:
                    currentURL.searchParams.set("lloc", "availability");
                    break;
                case LINKED_APP_SCHEME_4_1:
                    currentURL.searchParams.set("lloc", "install");
                    break;
                case LINKED_APP_SCHEME_4_2:
                    currentURL.searchParams.set("lloc", "withdrawal-of-agreement");
                    break;
                case LINKED_APP_SCHEME_4_3:
                    currentURL.searchParams.set("lloc", "renewal-of-agreement");
                    break;
                default:
                    return;
            }
            window.history.replaceState(null, null, currentURL);
        };
        hbbtv.bridge.addWeakEventListener('ApplicationSchemeUpdated', p.onApplicationSchemeUpdated);
    }

    function initialise() {
        privates.set(this, {});
        const p = privates.get(this);
        p.eventDispatcher = new hbbtv.utils.EventDispatcher(this);
        addBridgeEventListeners.call(this);
    }

    return {
        prototype: prototype,
        initialise: initialise,
    };
})();

hbbtv.objects.upgradeToApplicationManager = function(object) {
    Object.setPrototypeOf(object, hbbtv.objects.ApplicationManager.prototype);
    hbbtv.objects.ApplicationManager.initialise.call(object);
};

hbbtv.objectManager.registerObject({
    name: 'application/oipfapplicationmanager',
    mimeTypes: ['application/oipfapplicationmanager'],
    oipfObjectFactoryMethodName: 'createApplicationManagerObject',
    upgradeObject: function(object) {
        hbbtv.objects.upgradeToApplicationManager(object);
    },
});
/**
 * @fileOverview OIPF A/V Control object.
 * See: {@link https://web.archive.org/web/20200219165053/http://www.oipf.tv/web-spec/volume5.html#av-control-object}
 * @license ORB Software. Copyright (c) 2022 Ocean Blue Software Limited
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
hbbtv.objects.AVControl = (function() {
    const PLAY_STATE_STOPPED = 0;
    const PLAY_STATE_PLAYING = 1;
    const PLAY_STATE_PAUSED = 2;
    const PLAY_STATE_CONNECTING = 3;
    const PLAY_STATE_BUFFERING = 4;
    const PLAY_STATE_FINISHED = 5;
    const PLAY_STATE_ERROR = 6;

    const playStates = {
        [PLAY_STATE_STOPPED]: 1,
        [PLAY_STATE_PLAYING]: 2,
        [PLAY_STATE_PAUSED]: 4,
        [PLAY_STATE_CONNECTING]: 8,
        [PLAY_STATE_BUFFERING]: 16,
        [PLAY_STATE_FINISHED]: 32,
        [PLAY_STATE_ERROR]: 64,
    };
    Object.freeze(playStates);

    const prototype = Object.create(HTMLObjectElement.prototype);
    const privates = new WeakMap();
    const avsInUse = new Set();
    const __bindToCurrentChannel = hbbtv.objects.VideoBroadcast.prototype.bindToCurrentChannel;
    const NONIFY_BROADBAND_TIMEOUT = 250;
    let bindtoCurrentChannelTimeoutId = -1;

    const observer = new MutationObserver(function(mutationsList) {
        for (const mutation of mutationsList) {
            for (const node of mutation.removedNodes) {
                if (node.nodeName && node.nodeName.toLowerCase() === 'object') {
                    const p = privates.get(node);
                    if (p && p.videoElement.parentNode) {
                        p.videoElement.parentNode.removeChild(p.videoElement);
                        updateMutationObservers.call(node);
                    }
                }
            }
            for (const node of mutation.addedNodes) {
                if (node.nodeName && node.nodeName.toLowerCase() === 'object') {
                    const p = privates.get(node);
                    if (p && p.videoElement.parentNode !== node.parentNode) {
                        hbbtv.utils.insertAfter(node.parentNode, p.videoElement, node);
                        hbbtv.utils.matchElementStyle(p.videoElement, node);
                        updateMutationObservers.call(node);
                    }
                }
            }
        }
    });
    observer.observe(document.documentElement || document.body, {
        childList: true,
        subtree: true,
    });

    hbbtv.utils.defineConstantProperties(prototype, {
        COMPONENT_TYPE_VIDEO: 0,
        COMPONENT_TYPE_AUDIO: 1,
        COMPONENT_TYPE_SUBTITLE: 2,
    });

    hbbtv.utils.defineGetterSetterProperties(prototype, {
        data: {
            set(val) {
                this.setAttribute('data', val);
            },
            get() {
                return this.getAttribute('data');
            },
        },
        width: {
            set(val) {
                this.setAttribute('width', val);
            },
            get() {
                return this.getAttribute('width');
            },
        },
        height: {
            set(val) {
                this.setAttribute('height', val);
            },
            get() {
                return this.getAttribute('height');
            },
        },
    });

    hbbtv.utils.defineGetterProperties(prototype, {
        fullscreen() {
            return privates.get(this).fullscreen;
        },
        playState() {
            return privates.get(this).playState;
        },
        playPosition() {
            const priv = privates.get(this);
            if (priv.seekPos !== undefined) {
                return priv.seekPos;
            }
            if (playStates[priv.playState] & 65) {
                // stopped and error
                return 0;
            }
            return Math.floor(priv.videoElement.currentTime * 1000);
        },
        playTime() {
            return privates.get(this).playTime;
        },
        speed() {
            return privates.get(this).speed;
        },
        error() {
            return privates.get(this).error;
        },
    });

    prototype.getAttribute = function(name) {
        if (name === 'data') {
            return privates.get(this).data;
        }
        return Element.prototype.getAttribute.apply(this, arguments);
    };

    prototype.setAttribute = function(name, value) {
        const priv = privates.get(this);
        if (name === 'width' || name === 'height') {
            if (!priv.fullscreen) {
                // first set the attribute and then update video dimensions
                HTMLObjectElement.prototype.setAttribute.apply(this, arguments);
                hbbtv.utils.matchElementStyle(priv.videoElement, this);
            }
            return;
        } else if (name === 'data') {
            if (value !== priv.data) {
                if (priv.playState !== PLAY_STATE_STOPPED) {
                    this.stop();
                }
                priv.data = value;
                priv.seekPos = undefined;
                priv.connected = false;
                setMediaSettings.call(this, priv.MediaSettingsConfiguration);
            }
        }
        HTMLObjectElement.prototype.setAttribute.apply(this, arguments);
    };

    prototype.removeAttribute = function(name) {
        if (name === 'data') {
            const priv = privates.get(this);
            if (priv.playState !== PLAY_STATE_STOPPED) {
                this.stop();
            }
            if (priv.data !== undefined) {
                delete priv.data;
                priv.seekPos = undefined;
                priv.connected = false;
                setMediaSettings.call(this, priv.MediaSettingsConfiguration);
            }
        }
        Element.prototype.removeAttribute.apply(this, arguments);
    };

    prototype.play = function(speed) {
        const priv = privates.get(this);
        const videoElement = priv.videoElement;
        console.log('A/V Control: Play title ' + this.data + ' with speed ' + speed);
        if (speed === undefined) speed = 1;

        function updateCurrentTime(speed) {
            const elapsed = new Date().getTime() - priv.rewindStartSystemTime;
            videoElement.currentTime = Math.max(
                priv.rewindStartVideoTime - (elapsed * -speed) / 1000.0,
                0
            );
        }

        if ((playStates[priv.playState] & 97) && (speed !== 0)) {
            // stopped, finished or error
            if (priv.playState !== PLAY_STATE_FINISHED) {
                priv.loop = priv.params.loop ? priv.params.loop[0] : false;
            }

            function populateTracks(track, id) {
                const ttmlUrl = track.split('src:').pop().trim().split(' ').shift();
                const lang = track.split('srclang:').pop().trim().split(' ').shift();
                const ext = ttmlUrl.split('.').pop();
                if (ext === 'ttml' || ext === 'xml') {
                    videoElement.innerHTML +=
                        "<track kind='subtitles' id='" +
                        id +
                        "' src='" +
                        ttmlUrl +
                        "' srclang='" +
                        lang +
                        "'/>";
                }
            }

            videoElement.innerHTML = '';
            let idCounter = 0;
            if (priv.params.captions) {
                for (const caption of priv.params.captions) {
                    populateTracks(caption, idCounter++);
                }
            }
            if (priv.params.subtitles) {
                for (const subtitle of priv.params.subtitles) {
                    populateTracks(subtitle, idCounter++);
                }
            }
            if (isStateTransitionValid.call(this, priv.playState, PLAY_STATE_CONNECTING)) {
                transitionToState.call(this, PLAY_STATE_CONNECTING);
                priv.xhr.open('HEAD', this.data);
                priv.xhr.send();
            }
        } else if (playStates[priv.playState] & 24 && speed === 0) {
            // buffering or connecting
            priv.xhr.abort();
            transitionToState.call(this, PLAY_STATE_PAUSED);
        } else if ((priv.playState === PLAY_STATE_PAUSED || (priv.playState === PLAY_STATE_STOPPED)) && !priv.connected) {
            if (speed !== 0) {
                transitionToState.call(this, PLAY_STATE_CONNECTING);
                priv.xhr.open('HEAD', this.data);
                priv.xhr.send();
            } else {
                transitionToState.call(this, PLAY_STATE_PAUSED);
            }
        } else if (playStates[priv.playState] & 6) {
            // playing or paused
            clearInterval(priv.rewindInterval);
            if (priv.targetSpeed < 0 && speed >= 0) {
                // add the pause event listener in case the requested speed
                // is greater than or equal to 0, and we are currently in
                // rewind mode, because it was removed when we first
                // entered that mode
                videoElement.onpause = priv.onPauseHandler;
            }
            if (speed > 0) {
                videoElement.playbackRate = speed;
                if (videoElement.paused) {
                    videoElement.play();
                } else {
                    transitionToState.call(this, PLAY_STATE_PLAYING);
                }
            } else if (speed == 0) {
                videoElement.pause();
                if (priv.targetSpeed <= 0) {
                    updateCurrentTime(priv.targetSpeed);
                    // here, because we are in rewind mode or stopped, the videoElement is already
                    // in paused state, and because of that the event listener will not
                    // be triggered, so we call explicitly transitionToState.call(thiz, PLAY_STATE_PAUSED);
                    transitionToState.call(this, PLAY_STATE_PAUSED);
                } else {
                    priv.onPauseHandler();
                }
            } else {
                // simulate rewind
                priv.rewindStartSystemTime = new Date().getTime();
                priv.rewindStartVideoTime = videoElement.currentTime;

                // remove the pause event handler as it dispatches pause event
                // on the following call to pause(), setting falsely the state to paused
                videoElement.onpause = undefined;
                videoElement.pause();

                priv.rewindInterval = setInterval(() => {
                    if (videoElement.currentTime == 0) {
                        // when on video reaches currentTime == 0,
                        // return to paused state
                        this.play(0);
                    } else {
                        updateCurrentTime(speed);
                    }
                }, 1000);

                priv.speed = speed;
                transitionToState.call(this, PLAY_STATE_PLAYING);
                dispatchEvent.call(this, 'PlaySpeedChanged', { speed: speed });
            }
        }
        priv.targetSpeed = speed;
        return true;
    };

    prototype.stop = function() {
        const priv = privates.get(this);
        priv.xhr.abort();
        if (transitionToState.call(this, PLAY_STATE_STOPPED)) {
            _internalStop.call(this);
            unloadSource.call(this);
        }

        if (priv.mediaSourceQueue.length !== 0) {
            while (priv.mediaSourceQueue.length) {
                priv.mediaSourceQueue.pop();
            }
        }
        return true;
    };

    prototype.queue = function(url) {
        const priv = privates.get(this);
        const videoElement = priv.videoElement;
        if (!url || url.length === 0) {
            priv.mediaSourceQueue.shift();
            return true;
        }

        if (
            priv.mediaSourceQueue.indexOf(url) >= 0 ||
            (this.data === url && playStates[priv.playState] & 30)
        ) {
            // playing, paused, connecting or buffering
            return false;
        }

        if (
            (priv.playState === PLAY_STATE_STOPPED && !this.data) ||
            playStates[priv.playState] & 96
        ) {
            // finished or error
            this.data = url;
            this.play(1);
        } else {
            priv.mediaSourceQueue.push(url);
        }

        return true;
    };

    prototype.seek = function(position) {
        const priv = privates.get(this);
        console.log('A/V Control: Seek to', position);
        if (
            priv.playState === PLAY_STATE_PLAYING ||
            (priv.playState === PLAY_STATE_PAUSED && priv.connected)
        ) {
            if (
                !isNaN(priv.videoElement.duration) &&
                position > 0 &&
                priv.videoElement.duration > position / 1000.0
            ) {
                if (priv.startDate) { /* dynamic DASH MPD */
                    priv.videoElement.currentTime = (priv.startDate + position) / 1000.0;
                } else {
                    priv.videoElement.currentTime = position / 1000.0;
                }

                // needed in case we are in rewind mode
                priv.rewindStartSystemTime = new Date().getTime();
                priv.rewindStartVideoTime = priv.videoElement.currentTime;
            } else {
                dispatchEvent.call(this, 'PlayPositionChanged', {
                    position: priv.videoElement.currentTime * 1000,
                });
            }
        } else {
            priv.seekPos = position;
        }
        return true;
    };

    prototype.setFullScreen = function(fullscreen) {
        const priv = privates.get(this);
        const videoWrapper = priv.videoElement;

        if (fullscreen) {
            if (!priv.fullscreen) {
                const bounds = this.getBoundingClientRect();
                videoWrapper.style.cssText =
                    `
               width: 1280px;
               height: 720px;
               left: ${this.offsetLeft - bounds.left}px;
               top: ${this.offsetTop - bounds.top}px;
               position: absolute;
               z-index:
            ` + (this.style.zIndex ? this.style.zIndex : 1);
                priv.fullscreen = true;
                dispatchEvent.call(this, 'FullScreenChange');
            }
        } else {
            if (priv.fullscreen) {
                hbbtv.utils.matchElementStyle(videoWrapper, this);
                priv.fullscreen = false;
                dispatchEvent.call(this, 'FullScreenChange');
            }
        }
    };

    prototype.focus = function() {
        privates.get(this).videoElement.focus();
    };

    prototype.setVolume = function(volume) {
        console.log('A/V Control: Setting volume to ', volume);
        if (volume < 0 || volume > 100) {
            console.log('A/V Control: Invalid volume value.');
            return false;
        }

        privates.get(this).videoElement.volume = volume / 100;
        return true;
    };

    prototype.getComponents = function(componentType) {
        return extractComponents.call(this, componentType, false);
    };

    prototype.getCurrentActiveComponents = function(componentType) {
        return extractComponents.call(this, componentType, true);
    };

    prototype.selectComponent = function(component) {
        const priv = privates.get(this);
        let enableComponent = true;
        if (component !== null) {
            if (typeof component === 'object') {
                if (playStates[priv.playState] & 6) {
                    // playing or paused
                    let selectedmediaSettings = createCustomMediaSettings.call(
                        this,
                        component,
                        enableComponent
                    );
                    setMediaSettings.call(this, selectedmediaSettings);
                } else {
                    priv.MediaSettingsConfiguration = createCustomMediaSettings.call(
                        this,
                        component,
                        enableComponent
                    );
                }
            } else if (typeof component === 'number') {
                if (playStates[priv.playState] & 6) {
                    // playing or paused
                    let preferredMediaSettings = createPreferedMediaSettings.call(this, component);
                    setMediaSettings.call(this, preferredMediaSettings);
                } else {
                    priv.MediaSettingsConfiguration = createPreferedMediaSettings.call(
                        this,
                        component
                    );
                }
            }
        }
    };

    prototype.unselectComponent = function(component) {
        const priv = privates.get(this);
        const videoElement = priv.videoElement;

        function stopRenderingComponent(componentType) {
            let tracks;
            switch (componentType) {
                case this.COMPONENT_TYPE_VIDEO:
                    videoElement.hidden = true;
                    tracks = videoElement.videoTracks;
                    if (tracks) {
                        for (const track of tracks) {
                            track.selected = false;
                        }
                    }
                    break;

                case this.COMPONENT_TYPE_AUDIO:
                    videoElement.muted = true;
                    tracks = videoElement.audioTracks;
                    if (tracks) {
                        for (const track of tracks) {
                            track.enabled = false;
                        }
                    }
                    break;

                case this.COMPONENT_TYPE_SUBTITLE:
                    if (hbbtv.bridge.configuration.getSubtitlesEnabled()) {
                        tracks = videoElement.textTracks;
                        if (tracks) {
                            for (const track of tracks) {
                                track.mode = 'hidden';
                            }
                        }
                    }
                    break;
            }
        }
        if (component !== null) {
            if (typeof component === 'object') {
                if (playStates[priv.playState] & 6) {
                    // playing or paused
                    if (component.type === this.COMPONENT_TYPE_VIDEO) {
                        for (const track of videoElement.videoTracks) {
                            if (track.id === component.componentTag) {
                                track.selected = false;
                                break;
                            }
                        }
                    } else {
                        let preferredMediaSettings = createPreferedMediaSettings.call(
                            this,
                            component.type
                        );
                        let tracksChanged = setMediaSettings.call(this, preferredMediaSettings);

                        if (tracksChanged === false) {
                            stopRenderingComponent.call(this, component.type);
                        }
                    }
                    dispatchComponentChangedEvent.call(this, component.type);
                }
            } else if (typeof component === 'number') {
                if (playStates[priv.playState] & 6) {
                    // playing or paused
                    stopRenderingComponent.call(this, component);
                    dispatchComponentChangedEvent.call(this, component);
                } else {
                    let isEnabled = false;
                    let componentDisabled = {};
                    componentDisabled.type = component;

                    priv.MediaSettingsConfiguration = createCustomMediaSettings.call(
                        this,
                        componentDisabled,
                        isEnabled
                    );
                }
            }
        }
    };

    prototype.addEventListener = function(type, listener) {
        privates.get(this).eventTarget.addEventListener(type, listener);
    };

    prototype.removeEventListener = function(type, listener) {
        privates.get(this).eventTarget.removeEventListener(type, listener);
    };

    function _internalStop() {
        const priv = privates.get(this);
        const videoElement = priv.videoElement;
        console.log('A/V Control: Stopping playback of ' + this.data);
        // remove the onpause event as it will be triggered when this
        // function is called
        videoElement.onpause = undefined;
        videoElement.pause();
        videoElement.currentTime = 0;
        clearInterval(priv.rewindInterval);
    }

    // helper function due to unclear event names between spec versions
    function dispatchComponentChangedEvent(type) {
        dispatchEvent.call(this, 'ComponentChanged', {
            componentType: type,
        });
        dispatchEvent.call(this, 'SelectedComponentChanged', {
            componentType: type,
        });
        dispatchEvent.call(this, 'SelectedComponentChange', {
            componentType: type,
        });
    }

    function extractComponents(componentType, onlyActive) {
        const priv = privates.get(this);
        const videoElement = priv.videoElement;
        let components = [];
        let returnAllComponentTypes = false;

        if (componentType === null || componentType === undefined) {
            returnAllComponentTypes = true;
        }
        //TODO propably not all codec & lang strings are oipf profile compatible
        if (playStates[priv.playState] & 22) {
            // playing or paused or buffering
            const videoTracks = videoElement.videoTracks;
            if (
                (returnAllComponentTypes || componentType === this.COMPONENT_TYPE_VIDEO) &&
                videoTracks
            ) {
                for (let i = 0; i < videoTracks.length; ++i) {
                    const videoTrack = videoTracks[i];
                    if (!onlyActive || videoTrack.selected) {
                        components.push({
                            // AVComponent properties
                            componentTag: parseInt(videoTrack.id),
                            pid: parseInt(videoTrack.id),
                            type: this.COMPONENT_TYPE_VIDEO,
                            encoding: videoTrack.encoding ?
                                videoTrack.encoding.split('"')[1] : undefined,
                            encrypted: videoTrack.encrypted,
                            aspectRatio: (
                                videoElement.videoWidth / videoElement.videoHeight
                            ).toFixed(2),
                        });
                    }
                }
            }

            const audioTracks = videoElement.audioTracks;

            function isMPEG4HEAAC(codecString) {
                if (codecString) {
                    const parts = codecString.split('.');
                    const codecFamily = parts[0];
                    const mpeg4Audio = parts[1];
                    const objectType = parts[2];
                    if (codecFamily === 'mp4a' && mpeg4Audio === '40') {
                        const heAacTypes = ['02', '05', '29']; // common HE-AAC object types for MPEG-4
                        return heAacTypes.includes(objectType);
                    }
                }
                return false;
            }

            function isEAC3(codecString) {
                if (codecString) {
                    const eac3Identifiers = ['ec-3', 'dd+', 'ddp', 'e-ac-3']; // common identifiers for E-AC-3
                    const normalizedCodecString = codecString.toLowerCase();
                    return eac3Identifiers.includes(normalizedCodecString);
                }
                return false;
            }

            if (
                (returnAllComponentTypes || componentType === this.COMPONENT_TYPE_AUDIO) &&
                audioTracks
            ) {
                for (let i = 0; i < audioTracks.length; ++i) {
                    const audioTrack = audioTracks[i];
                    if (!onlyActive || audioTrack.enabled) {
                        let trackEncoding = audioTrack.encoding ? audioTrack.encoding.split('"')[1] : undefined;
                        if (isMPEG4HEAAC(trackEncoding)) {
                            trackEncoding = "HEAAC";
                        } else if (isEAC3(trackEncoding)) {
                            trackEncoding = "E-AC3";
                        }

                        let language = 'und';
                        if (audioTrack.language) {
                            let lang;
                            if ((this.type !== 'application/dash+xml') &&
                                (lang = priv.ISO639_1_to_ISO639_2[audioTrack.language])) {
                                    language = lang;
                            } else {
                                language = audioTrack.language;
                            }
                        }

                        components.push({
                            // AVComponent properties
                            componentTag: audioTrack.id,
                            pid: parseInt(audioTrack.id),
                            type: this.COMPONENT_TYPE_AUDIO,
                            encoding: trackEncoding,
                            encrypted: audioTrack.encrypted,
                            // AVAudioComponent properties
                            language: language,
                            audioDescription: audioTrack.kind === 'alternate' ||
                                audioTrack.kind === 'alternative',
                            audioChannels: audioTrack.numChannels,
                        });
                    }
                }
            }

            const textTracks = videoElement.textTracks;
            if (
                (returnAllComponentTypes || componentType === this.COMPONENT_TYPE_SUBTITLE) &&
                textTracks
            ) {
                for (let i = 0; i < textTracks.length; ++i) {
                    const textTrack = textTracks[i];
                    if (!onlyActive || textTrack.mode === 'showing') {
                        components.push({
                            // AVComponent properties
                            componentTag: textTrack.id,
                            pid: parseInt(textTrack.id),
                            type: this.COMPONENT_TYPE_SUBTITLE,
                            encoding: textTrack.encoding ?
                                textTrack.encoding : 'application/ttml+xml',
                            encrypted: false,
                            language: textTrack.language,
                            hearingImpaired: textTrack.kind === 'captions',
                            label: textTrack.label,
                        });
                    }
                }
            }
        }

        // if (components.length == 0) {
        //    return undefined;
        // }

        return hbbtv.objects.createCollection(components);
    }

    // helper function for dispatching events
    function dispatchEvent(event, contextInfo) {
        const evt = new Event(event);
        if (contextInfo) {
            Object.assign(evt, contextInfo);
        }
        privates.get(this).eventTarget.dispatchEvent(evt);
        hbbtv.utils.runOnMainLooper(this, function() {
            if (typeof this['on' + event] === 'function') {
                if (contextInfo) {
                    this['on' + event](...Object.values(contextInfo));
                } else {
                    this['on' + event]();
                }
            }
        });
    }

    function createPreferedMediaSettings(componentType) {
        let audioSettings = {};
        let subSettings = {};
        let videoSettings = {};

        if (componentType === undefined || componentType === this.COMPONENT_TYPE_AUDIO) {
            let audioDescriptionEnabled = hbbtv.bridge.configuration.getAudioDescriptionEnabled();
            let preferredAudioLanguage = hbbtv.bridge.configuration.getPreferredAudioLanguage();
            audioSettings.isEnabled = true;
            audioSettings.lang = [];
            if (preferredAudioLanguage) {
                audioSettings.lang = preferredAudioLanguage.replace(/\s+/g, '').split(',');
            }

            if (audioDescriptionEnabled === true) {
                audioSettings.roles = 'alternate';
            }
        }

        if (componentType === undefined || componentType === this.COMPONENT_TYPE_SUBTITLE) {
            let preferredSubtitleLanguage =
                hbbtv.bridge.configuration.getPreferredSubtitleLanguage();
            let subtitlesEnabled = hbbtv.bridge.configuration.getSubtitlesEnabled();

            if (subtitlesEnabled === true) {
                subSettings.isEnabled = true;
                subSettings.lang = [];
                if (preferredSubtitleLanguage) {
                    subSettings.lang = preferredSubtitleLanguage.replace(/\s+/g, '').split(',');
                }
            }
        }

        if (componentType === undefined || componentType === this.COMPONENT_TYPE_VIDEO) {
            videoSettings.isEnabled = true;
            videoSettings.kind = ['main', ''];
        }

        return {
            audio: audioSettings,
            subtitles: subSettings,
            video: videoSettings,
        };
    }

    function createCustomMediaSettings(component, enableComponent) {
        let confSubtitlesEnabled = hbbtv.bridge.configuration.getSubtitlesEnabled();
        let audioSettings = {};
        let subSettings = {};
        let videoSettings = {};

        if (component) {
            if (component.type === this.COMPONENT_TYPE_AUDIO) {
                if (enableComponent) {
                    audioSettings.lang = [component.language];
                    audioSettings.audioChannels = component.audioChannels;
                    audioSettings.roles = component.audioDescription ? 'alternate' : 'main';
                    if (typeof component === 'object') {
                        audioSettings.id = component.componentTag;
                    }
                }
                audioSettings.isEnabled = enableComponent;
            } else if (component.type === this.COMPONENT_TYPE_SUBTITLE) {
                if (enableComponent) {
                    if (confSubtitlesEnabled === true) {
                        subSettings.lang = [component.language];
                        subSettings.roles = component.hearingImpaired ? 'captions' : 'subtitle';
                        if (typeof component === 'object') {
                            subSettings.id = component.componentTag;
                        }
                    }
                }
                subSettings.isEnabled = enableComponent;
            } else if (component.type === this.COMPONENT_TYPE_VIDEO) {
                if (enableComponent) {
                    videoSettings.kind = [component.kind];
                    if (typeof component === 'object') {
                        videoSettings.id = component.componentTag;
                    }
                }
                videoSettings.isEnabled = enableComponent;
            }
        }

        return {
            audio: audioSettings,
            subtitles: subSettings,
            video: videoSettings,
        };
    }

    function setMediaSettings(mediaSettings) {
        const priv = privates.get(this);
        const videoElement = priv.videoElement;
        let trackChanged = false;

        if (
            mediaSettings.audio &&
            Object.keys(mediaSettings.audio).length !== 0 &&
            mediaSettings.audio.isEnabled
        ) {
            let audioTracks = videoElement.audioTracks;
            if (audioTracks) {
                let index = -1;
                const languages = mediaSettings.audio.lang;
                if (languages) {
                    for (const lang of languages) {
                        for (let i = 0; i < audioTracks.length; ++i) {
                            const track = audioTracks[i];
                            let trackLanguage = track.language.includes('-') ? track.language.split('-')[0] : track.language;
                            if (
                                mediaSettings.audio.id === track.id ||
                                ((trackLanguage === lang ||
                                        hbbtv.languageCodes.ISO639_2_to_ISO639_1[trackLanguage] ===
                                        lang ||
                                        hbbtv.languageCodes.ISO639_2_to_ISO639_1[lang] ===
                                        trackLanguage) &&
                                    (!track.kind ||
                                        track.kind ===
                                        (mediaSettings.audio.roles ?
                                            mediaSettings.audio.roles :
                                            track.kind)) &&
                                    track.numChannels ===
                                    (mediaSettings.audio.audioChannels ?
                                        mediaSettings.audio.audioChannels :
                                        track.numChannels))
                            ) {
                                index = i;
                                break;
                            }
                        }
                        if (index !== -1) {
                            break;
                        }
                    }
                }
                if (index !== -1) {
                    audioTracks[index].enabled = true;
                    videoElement.muted = false;
                    trackChanged = true;
                    dispatchComponentChangedEvent.call(this, this.COMPONENT_TYPE_AUDIO);
                }
            }
        }

        if (
            mediaSettings.subtitles &&
            Object.keys(mediaSettings.subtitles).length !== 0 &&
            mediaSettings.subtitles.isEnabled
        ) {
            let textTracks = videoElement.textTracks;
            if (textTracks) {
                let index = -1;
                const languages = mediaSettings.subtitles.lang;

                if (languages) {
                    for (const lang of languages) {
                        for (let i = 0; i < textTracks.length; ++i) {
                            const track = textTracks[i];
                            if (
                                mediaSettings.subtitles.id === track.id ||
                                ((track.language === lang ||
                                        hbbtv.languageCodes.ISO639_2_to_ISO639_1[track.language] ===
                                        lang ||
                                        hbbtv.languageCodes.ISO639_2_to_ISO639_1[lang] ===
                                        track.language) &&
                                    track.kind ===
                                    (mediaSettings.subtitles.roles ?
                                        mediaSettings.subtitles.roles :
                                        track.kind))
                            ) {
                                index = i;
                                break;
                            }
                        }
                        if (index !== -1) {
                            break;
                        }
                    }

                    if (textTracks.length > 0 && index === -1 && languages.includes('***')) {
                        index = 0;
                    }
                    if (index !== -1) {
                        textTracks[index].mode = 'showing';
                        trackChanged = true;
                        dispatchComponentChangedEvent.call(this, this.COMPONENT_TYPE_SUBTITLE);
                    }
                }
            }
        }

        if (
            mediaSettings.video &&
            Object.keys(mediaSettings.video).length !== 0 &&
            mediaSettings.video.isEnabled
        ) {
            let videoTracks = videoElement.videoTracks;
            if (videoTracks && videoTracks.length > 0) {
                let index = -1;
                for (let i = 0; i < videoTracks.length; ++i) {
                    const track = videoTracks[i];
                    if (
                        mediaSettings.video.id === parseInt(track.id) ||
                        mediaSettings.video.kind.includes(track.kind)
                    ) {
                        index = i;
                        break;
                    }
                }
                if (index !== -1) {
                    videoTracks[index].selected = true;
                    trackChanged = true;
                    videoElement.hidden = false;
                    dispatchComponentChangedEvent.call(this, this.COMPONENT_TYPE_VIDEO);
                }
            }
        }

        return trackChanged;
    }

    function isStateTransitionValid(currentState, targetState) {
        switch (currentState) {
            case PLAY_STATE_STOPPED:
                return !!(playStates[targetState] & 13); // stopped, paused or connecting
            case PLAY_STATE_PLAYING:
                return !!(playStates[targetState] & 119); // playing, error, stopped, buffering, finished or paused
            case PLAY_STATE_PAUSED:
                return !!(playStates[targetState] & 31); // playing, paused, connecting, buffering or stopped
            case PLAY_STATE_CONNECTING:
                return !!(playStates[targetState] & 93); // connecting, paused, stopped, error or buffering
            case PLAY_STATE_BUFFERING:
                return !!(playStates[targetState] & 95); // buffering, paused, connecting, playing, stopped or error
            case PLAY_STATE_FINISHED:
            case PLAY_STATE_ERROR: // intentional fall-through
                return !!(playStates[targetState] & 9); // connecting or stopped
            default:
                break;
        }
        return false;
    }

    function transitionToState(targetState) {
        let priv = privates.get(this);
        if (isStateTransitionValid(priv.playState, targetState)) {
            console.log(
                'A/V Control: Transitioned from state ' + priv.playState + ' to ' + targetState
            );
            if (priv.playState !== targetState || (priv.playState === targetState) && (targetState === 1)) {
                priv.playState = targetState;

                dispatchEvent.call(this, 'PlayStateChange', {
                    state: targetState,
                });
            }
            return true;
        }
        console.warn(
            'A/V Control: Invalid transition from state ' + priv.playState + ' to ' + targetState
        );
        return false;
    }

    function bindToCurrentChannel() {
        if (avsInUse.size <= 0 && bindtoCurrentChannelTimeoutId === -1) {
            hbbtv.objects.VideoBroadcast.prototype.bindToCurrentChannel = __bindToCurrentChannel;
            return __bindToCurrentChannel.apply(this, arguments);
        } else {
            setTimeout(hbbtv.objects.VideoBroadcast.prototype.bindToCurrentChannel.bind(this, ...Array.from(arguments)), NONIFY_BROADBAND_TIMEOUT);
        }
    }

    function notifyBroadbandAvInUse(broadbandAvInUse) {
        //let priv = privates.get(this);
        if (broadbandAvInUse) {
            console.log('A/V control: AV in use');
            avsInUse.add(this);
            try {
                hbbtv.objects.VideoBroadcast.notifyBroadbandAvInUse(true);
                // we override bindToCurrentChannel to compensate the case where the
                // user calls it immediately after broacast is stopped, and as a result
                // the call to notifyBroadbandAvInUse(false) is missed
                hbbtv.objects.VideoBroadcast.prototype.bindToCurrentChannel = bindToCurrentChannel;
                //priv.videoElement.hidden = false;
            } catch (e) {
                console.warn('A/V Control: ' + e);
            }
        } else {
            console.log('A/V control: AV NOT in use (notification waiting 0.25s)');
            avsInUse.delete(this);
            bindtoCurrentChannelTimeoutId = setTimeout(() => {
                if (avsInUse.size <= 0) {
                    bindtoCurrentChannelTimeoutId = -1;
                    console.log('A/V control: AV NOT in use (notification dispatched)');
                    try {
                        hbbtv.objects.VideoBroadcast.notifyBroadbandAvInUse(false);
                        //priv.videoElement.hidden = true;
                    } catch (e) {
                        console.warn('A/V Control: ' + e);
                    }
                } else {
                    console.log('A/V control: Another AV is in use.');
                }
            }, NONIFY_BROADBAND_TIMEOUT);
        }
    }

    function unloadSource() {
        const priv = privates.get(this);
        priv.connected = false;
        priv.seekPos = undefined;
        priv.targetSpeed = priv.speed = 0;
        priv.videoElement.orb_unload();
        priv.unrealized = true;
    }

    function updateMutationObservers() {
        console.log("A/V Control: Updating ancestors' mutation observers...");
        const p = privates.get(this);
        // whenever there is a change on an ancestor style,
        // update the iframe style as well
        const ancestors = [];
        let parent = this.parentNode;
        while (parent) {
            ancestors.push(parent);
            parent = parent.parentNode;
        }

        for (const observer of p.styleObservers) {
            observer.disconnect();
        }
        p.styleObservers = [];

        const observerCallback = () => {
            hbbtv.utils.matchElementStyle(p.videoElement, this);
        };
        for (const ancestor of ancestors) {
            const styleObserver = new MutationObserver(observerCallback);
            styleObserver.observe(ancestor, {
                attributes: true,
                attributeFilter: ['style', 'class'],
            });
            p.styleObservers.push(styleObserver);
        }
    }

    function initialise() {
        let startPlaying = false;
        let seeking = false;
        let priv = privates.get(this);
        if (priv) {
            return; // already initialised
        }
        privates.set(this, {});
        priv = privates.get(this);
        priv.unrealized = true;
        priv.styleObservers = [];
        priv.playState = PLAY_STATE_STOPPED;
        priv.xhr = new XMLHttpRequest();
        const thiz = this;

        priv.ISO639_1_to_ISO639_2 = hbbtv.languageCodes.makeReverseMapping();
        priv.data = Element.prototype.getAttribute.call(this, 'data');

        function onPlayHandler() {
            transitionToState.call(thiz, PLAY_STATE_PLAYING);
            if (priv.seekPos !== undefined) {
                const seekPos = priv.seekPos;
                priv.seekPos = undefined;
                thiz.seek(seekPos);
            }
        }

        priv.onPauseHandler = () => {
            // this condition is used to compensate the situation where the
            // video element dispatches pause AND ended events (instead of just
            // the ended event) when playback is finished, messing up the state
            // machine pipeline
            if (!videoElement.ended && thiz.playState !== PLAY_STATE_PAUSED) {
                transitionToState.call(thiz, PLAY_STATE_PAUSED);
            }
        };

        // Create a new video element that will be used as a playback backend 'video/mp4' objects.
        const mimetype = this.type || '';
        let videoElement = document.createElement(mimetype.startsWith('audio') ? 'audio' : 'video');

        videoElement.autoplay = false;
        //videoElement.hidden = true;
        priv.videoElement = videoElement;
        if (this.parentNode) {
            hbbtv.utils.insertAfter(this.parentNode, videoElement, this);
            hbbtv.utils.matchElementStyle(videoElement, this);
            updateMutationObservers.call(this);
        }

        // parse param nodes and store their values
        priv.params = {};
        for (let node of this.getElementsByTagName('param')) {
            if (node.hasAttribute('name')) {
                const paramName = node.getAttribute('name');
                if (!priv.params[paramName]) {
                    priv.params[paramName] = [];
                }
                priv.params[paramName].push(window.decodeURIComponent(node.getAttribute('value')));
            }
        }
        priv.connected = false;
        priv.seekPos = undefined;
        priv.playTime = 0;
        priv.targetSpeed = priv.speed = 0;
        priv.eventTarget = document.createDocumentFragment();
        priv.mediaSourceQueue = [];
        priv.MediaSettingsConfiguration = createPreferedMediaSettings.call(this);
        priv.loop = 1;
        priv.fullscreen = false;

        this.addEventListener('PlayStateChange', (e) => {
            switch (e.state) {
                case PLAY_STATE_ERROR:
                case PLAY_STATE_STOPPED:
                case PLAY_STATE_FINISHED:
                    notifyBroadbandAvInUse.call(this, false);
                    break;
                default:
                    notifyBroadbandAvInUse.call(this, true);
                    break;
            }
        });

        // add a timeout to the XMLHTTPRequest to compensate the case where
        // a server side script intentionally delays the request.
        priv.xhr.timeout = 5000;

        priv.xhr.onreadystatechange = function() {
            if (priv.xhr.readyState != 4) return;
            // if status is 0, then the request timed out, but the resource requested exists,
            // so we skip the error state
            if (priv.xhr.status !== 0 && priv.xhr.status != 200 && priv.xhr.status != 304) {
                priv.error = 1;
                unloadSource.call(thiz);
                transitionToState.call(thiz, PLAY_STATE_ERROR);
                return;
            }
            //transitionToState.call(thiz, PLAY_STATE_BUFFERING);
            videoElement.src = thiz.data;
        };

        videoElement.addEventListener('loadeddata', () => {
            if (!videoElement.src) {
                return;
            }

            // we add here the onpause handler as there will be no way to be added
            // in case the user changes the media source when we are in rewind mode
            videoElement.onpause = priv.onPauseHandler;
            videoElement.playbackRate = priv.targetSpeed;
            priv.connected = true;
            if (priv.targetSpeed > 0) {
                videoElement.play();
            } else {
                priv.onPauseHandler();
            }
        });

        videoElement.addEventListener('loadedmetadata', () =>
            {
                transitionToState.call(this, PLAY_STATE_BUFFERING);
                setMediaSettings.call(this, priv.MediaSettingsConfiguration);
            }
        );

        videoElement.addEventListener('waiting', () => {
            transitionToState.call(thiz, PLAY_STATE_BUFFERING);
            if (!seeking) {
                videoElement.oncanplaythrough = () => {
                    videoElement.oncanplaythrough = undefined;
                    priv.unrealized = false;
                    startPlaying = true;
                };
            }
        });

        videoElement.addEventListener('play', () => {
            priv.unrealized = false;
            startPlaying = true;
        });

        videoElement.addEventListener('seeking', () => {
            if (!priv.unrealized && !startPlaying && !seeking) {
                seeking = true;
            }
        });

        videoElement.addEventListener('seeked', () => {
            if (seeking && (priv.targetSpeed > 0)) {
                transitionToState.call(thiz, PLAY_STATE_PLAYING);
                seeking = false;
            }
        });

        videoElement.addEventListener('durationchange', () => {
            console.log('A/V Control: Received event ondurationchange ', videoElement.duration);
            priv.playTime = videoElement.duration * 1000;
        });

        videoElement.addEventListener('timeupdate', () => {
            if (startPlaying) {
                onPlayHandler();
                startPlaying = false;
            } else if (!seeking) {
                dispatchEvent.call(thiz, 'PlayPositionChanged', {
                    position: thiz.playPosition,
                });
            }
        });

        videoElement.addEventListener('ended', () => {
            if (priv.params.loop) {
                if (priv.loop === 'infinite' || --priv.loop > 0) {
                    videoElement.play();
                } else if (transitionToState.call(thiz, PLAY_STATE_FINISHED)) {
                    unloadSource.call(thiz);
                }
            } else if (transitionToState.call(thiz, PLAY_STATE_FINISHED)) {
                if (priv.mediaSourceQueue.length !== 0) {
                    _internalStop.call(thiz);
                    priv.data = priv.mediaSourceQueue.shift();
                    thiz.play(1);
                } else {
                    unloadSource.call(thiz);
                }
            }
        });

        videoElement.addEventListener('__orb_startDateUpdated__', (e) => {
            priv.startDate = e.startDate;
        });

        videoElement.addEventListener('__orb_onerror__', (e) => {
            console.log('A/V Control: __orb_onerror__: ', e.error.message);
            if (transitionToState.call(thiz, PLAY_STATE_ERROR)) {
                unloadSource.call(thiz);
                priv.error = e.error.code;
            }

            if (priv.mediaSourceQueue.length !== 0) {
                while (priv.mediaSourceQueue.length) {
                    priv.mediaSourceQueue.pop();
                }
            }
        });

        videoElement.addEventListener('__orb_onplayspeedchanged__', (e) => {
            /* Rely on videoElement.onpause to trigger PlaySpeedChanged. It is undefined when simulating rewind. */
            if (videoElement.onpause) {
                priv.speed = e.speed;
                if (e.speed) {
                    priv.targetSpeed = e.speed;
                }
                dispatchEvent.call(this, 'PlaySpeedChanged', {
                    speed: e.speed,
                });
            }
        });

        videoElement.addEventListener('__orb_onparentalratingchange__', (e) => {
            console.log('A/V Control: __orb_onparentalratingchange__: ', e.blocked);
            dispatchEvent.call(thiz, 'ParentalRatingChange', {
                contentID: e.contentID,
                ratings: e.ratings,
                DRMSystemID: e.DRMSystemID,
                blocked: e.blocked,
            });
        });

        // Mutation observer
        (function() {
            const observer = new MutationObserver(function(mutationsList) {
                for (const mutation of mutationsList) {
                    if (mutation.type === 'childList') {
                        for (const node of mutation.removedNodes) {
                            if (
                                node.nodeName &&
                                node.nodeName.toLowerCase() === 'param' &&
                                node.hasAttribute('name')
                            ) {
                                // remove stored params
                                priv.params[node.getAttribute('name')] = undefined;
                            }
                        }
                        for (const node of mutation.addedNodes) {
                            if (
                                node.nodeName &&
                                node.nodeName.toLowerCase() === 'param' &&
                                node.hasAttribute('name')
                            ) {
                                // add params as they come
                                if (!priv.params[node.getAttribute('name')]) {
                                    priv.params[node.getAttribute('name')] = [];
                                }
                                priv.params[node.getAttribute('name')].push(
                                    window.decodeURIComponent(node.getAttribute('value'))
                                );
                            }
                        }
                    } else if (mutation.type === 'attributes') {
                        // if we are in fullscreen mode when the style of the AV Control
                        // object changes, switch to non-fullscreen mode
                        if (priv.fullscreen) {
                            priv.fullscreen = false;
                            dispatchEvent.call(thiz, 'FullScreenChange');
                        }
                        hbbtv.utils.matchElementStyle(videoElement, thiz);
                    }
                }
            });

            observer.observe(thiz, {
                childList: true,
                attributes: true,
                attributeFilter: ['style', 'class'],
            });
        })();

        console.log('A/V Control: initialised');
    }

    return {
        prototype: prototype,
        initialise: initialise,
    };
})();

hbbtv.objectManager.registerObject({
    name: 'video/mpeg',
    mimeTypes: ['video/mp4', 'application/dash+xml', 'audio/mp4', 'audio/mpeg', 'video/mpeg'],
    oipfObjectFactoryMethodName: 'createVideoMpegObject',
    upgradeObject: function(object) {
        Object.setPrototypeOf(object, hbbtv.objects.AVControl.prototype);
        hbbtv.objects.AVControl.initialise.call(object);
        hbbtv.utils.preventDefaultMediaHandling(object);
    },
});/**
 * @fileOverview OIPF Gateway Info object
 * @license ORB Software. Copyright (c) 2022 Ocean Blue Software Limited
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

hbbtv.objects.OipfGatewayInfo = (function() {
    const prototype = Object.create(HTMLObjectElement.prototype);
    const privates = new WeakMap();
    const gGarbageCollectionBlocked = new Set();

    /* readonly properties */
    hbbtv.utils.defineGetterProperties(prototype, {
        isIGDiscovered() {
            return false;
        },
        isAGDiscovered() {
            return false;
        },
        isCSPGCIPlusDiscovered() {
            return hbbtv.drmManager.isCSPGCIPlusDiscovered();
        },
        isCSPGDTCPDiscovered() {
            return false;
        },
        igURL() {
            return 'igURL';
        },
        agURL() {
            return 'agURL';
        },
        cspgDTCPURL() {
            return 'cspgDTCPURL';
        },
        interval() {
            return 30;
        },
        isIGSupported() {
            return false;
        },
        isAGSupported() {
            return false;
        },
        isCSPGCIPlusSupported() {
            return true;
        },
        isCSPGDTCPSupported() {
            return false;
        },
        CSPGCIPlusDRMType() {
            let result = [];
            const status = hbbtv.drmManager.getCSPGCIPlusStatus();
            if (status) {
                status.DRMSystemIDs.forEach((value) => {
                    result.push(value.DRMSystemID);
                });
            }
            return result;
        },
    });

    prototype.isIGSupportedMethod = function(methodName) {
        return false;
    };

    // DOM level 1 event methods
    prototype.addEventListener = function(type, listener) {
        if (privates.get(this).eventDispatcher.addCountedEventListener(type, listener) > 0) {
            gGarbageCollectionBlocked.add(this);
        }
    };

    prototype.removeEventListener = function(type, listener) {
        if (privates.get(this).eventDispatcher.removeCountedEventListener(type, listener) == 0) {
            gGarbageCollectionBlocked.delete(this);
        }
    };

    // DOM level 0 event properties
    Object.defineProperty(prototype, 'onDiscoverIG', {
        get() {
            return privates.get(this).onDiscoverIGDomLevel0;
        },
        set(listener) {
            const p = privates.get(this);
            if (p.onDiscoverIGDomLevel0) {
                this.removeEventListener('DiscoverIG', p.onDiscoverIGWrapper);
                p.onDiscoverIGWrapper = null;
            }
            p.onDiscoverIGDomLevel0 = listener;
            if (listener) {
                p.onDiscoverIGWrapper = (ev) => {
                    listener(ev.channel, ev.errorState);
                };
                this.addEventListener('DiscoverIG', p.onDiscoverIGWrapper);
            }
        },
    });

    Object.defineProperty(prototype, 'onDiscoverAG', {
        get() {
            return privates.get(this).onDiscoverAGDomLevel0;
        },
        set(listener) {
            const p = privates.get(this);
            if (p.onDiscoverAGDomLevel0) {
                this.removeEventListener('DiscoverAG', p.onDiscoverAGWrapper);
                p.onDiscoverAGWrapper = null;
            }
            p.onDiscoverAGDomLevel0 = listener;
            if (listener) {
                p.onDiscoverAGWrapper = (ev) => {
                    listener(ev.channel, ev.errorState);
                };
                this.addEventListener('DiscoverAG', p.onDiscoverAGWrapper);
            }
        },
    });

    Object.defineProperty(prototype, 'onDiscoverCSPGDTCP', {
        get() {
            return privates.get(this).onDiscoverCSPGDTCPDomLevel0;
        },
        set(listener) {
            const p = privates.get(this);
            if (p.onDiscoverCSPGDTCPDomLevel0) {
                this.removeEventListener('DiscoverCSPGDTCP', p.onDiscoverCSPGDTCPWrapper);
                p.onDiscoverCSPGDTCPWrapper = null;
            }
            p.onDiscoverCSPGDTCPDomLevel0 = listener;
            if (listener) {
                p.onDiscoverCSPGDTCPWrapper = (ev) => {
                    listener(ev.channel, ev.errorState);
                };
                this.addEventListener('DiscoverCSPGDTCP', p.onDiscoverCSPGDTCPWrapper);
            }
        },
    });

    Object.defineProperty(prototype, 'onDiscoverCSPGCIPlus', {
        get() {
            return privates.get(this).onDiscoverCSPGCIPlusDomLevel0;
        },
        set(listener) {
            const p = privates.get(this);
            if (p.onDiscoverCSPGCIPlusDomLevel0) {
                this.removeEventListener('DiscoverCSPGCIPlus', p.onDiscoverCSPGCIPlusWrapper);
                p.onDiscoverCSPGCIPlusWrapper = null;
            }
            p.onDiscoverCSPGCIPlusDomLevel0 = listener;
            if (listener) {
                p.onDiscoverCSPGCIPlusWrapper = (ev) => {
                    listener(ev.channel, ev.errorState);
                };
                this.addEventListener('DiscoverCSPGCIPlus', p.onDiscoverCSPGCIPlusWrapper);
            }
        },
    });

    function dispatchDiscoverIGEvent() {
        const event = new Event('DiscoverIG');
        privates.get(this).eventDispatcher.dispatchEvent(event);
    }

    function dispatchDiscoverAGEvent() {
        const event = new Event('DiscoverAG');
        privates.get(this).eventDispatcher.dispatchEvent(event);
    }

    function dispatchDiscoverCSPGDTCPEvent() {
        const event = new Event('DiscoverCSPGDTCP');
        privates.get(this).eventDispatcher.dispatchEvent(event);
    }

    function dispatchDiscoverCSPGCIPlusEvent() {
        const event = new Event('DiscoverCSPGCIPlus');
        privates.get(this).eventDispatcher.dispatchEvent(event);
    }

    function initialise() {
        privates.set(this, {});
        const p = privates.get(this);
        p.eventDispatcher = new hbbtv.utils.EventDispatcher(this);
        hbbtv.drmManager.registerOipfGatewayInfo(this, dispatchDiscoverCSPGCIPlusEvent);
    }

    return {
        prototype: prototype,
        initialise: initialise,
    };
})();

hbbtv.objects.upgradeToOipfGatewayInfo = function(object) {
    Object.setPrototypeOf(object, hbbtv.objects.OipfGatewayInfo.prototype);
    hbbtv.objects.OipfGatewayInfo.initialise.call(object);
};

hbbtv.objectManager.registerObject({
    name: 'application/oipfgatewayinfo',
    mimeTypes: ['application/oipfgatewayinfo'],
    oipfObjectFactoryMethodName: 'createGatewayInfoObject',
    upgradeObject: hbbtv.objects.upgradeToOipfGatewayInfo,
});/**
 * @fileOverview OIPF DRM Agent object.
 * @license ORB Software. Copyright (c) 2022 Ocean Blue Software Limited
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

hbbtv.objects.OipfDrmAgent = (function() {
    const prototype = Object.create(HTMLObjectElement.prototype);
    const privates = new WeakMap();
    const gGarbageCollectionBlocked = new Set();

    prototype.sendDRMMessage = function(msgType, msg, DRMSystemID) {
        return hbbtv.drmManager.sendDRMMessage(msgType, msg, DRMSystemID);
    };

    prototype.DRMSystemStatus = function(DRMSystemID) {
        return hbbtv.drmManager.getDRMSystemStatus(DRMSystemID);
    };

    prototype.canPlayContent = function(DRMPrivateData, DRMSystemID) {
        return hbbtv.drmManager.canPlayContent(DRMPrivateData, DRMSystemID);
    };

    prototype.canRecordContent = function(DRMPrivateData, DRMSystemID) {
        return hbbtv.drmManager.canRecordContent(DRMPrivateData, DRMSystemID);
    };

    prototype.setActiveDRM = function(DRMSystemID) {
        return hbbtv.drmManager.setActiveDRM(DRMSystemID);
    };

    // DOM level 1 event methods
    prototype.addEventListener = function(type, listener) {
        if (privates.get(this).eventDispatcher.addCountedEventListener(type, listener) > 0) {
            gGarbageCollectionBlocked.add(this);
        }
    };

    prototype.removeEventListener = function(type, listener) {
        if (privates.get(this).eventDispatcher.removeCountedEventListener(type, listener) == 0) {
            gGarbageCollectionBlocked.delete(this);
        }
    };

    // DOM level 0 event properties
    Object.defineProperty(prototype, 'onDRMSystemStatusChange', {
        get() {
            return privates.get(this).onDRMSystemStatusChangeDomLevel0;
        },
        set(listener) {
            const p = privates.get(this);
            if (p.onDRMSystemStatusChangeDomLevel0) {
                this.removeEventListener('DRMSystemStatusChange', p.onDRMSystemStatusChangeWrapper);
                p.onDRMSystemStatusChangeWrapper = null;
            }
            p.onDRMSystemStatusChangeDomLevel0 = listener;
            if (listener) {
                p.onDRMSystemStatusChangeWrapper = (ev) => {
                    listener(ev.DRMSystemID);
                };
                this.addEventListener('DRMSystemStatusChange', p.onDRMSystemStatusChangeWrapper);
            }
        },
    });

    Object.defineProperty(prototype, 'onDRMMessageResult', {
        get() {
            return privates.get(this).onDRMMessageResultDomLevel0;
        },
        set(listener) {
            const p = privates.get(this);
            if (p.onDRMMessageResultDomLevel0) {
                this.removeEventListener('DRMMessageResult', p.onDRMMessageResultWrapper);
                p.onDRMMessageResultWrapper = null;
            }
            p.onDRMMessageResultDomLevel0 = listener;
            if (listener) {
                p.onDRMMessageResultWrapper = (ev) => {
                    listener(ev.msgID, ev.resultMsg, ev.resultCode);
                };
                this.addEventListener('DRMMessageResult', p.onDRMMessageResultWrapper);
            }
        },
    });

    Object.defineProperty(prototype, 'onDRMSystemMessage', {
        get() {
            return privates.get(this).onDRMSystemMessageDomLevel0;
        },
        set(listener) {
            const p = privates.get(this);
            if (p.onDRMSystemMessageDomLevel0) {
                this.removeEventListener('DRMSystemMessage', p.onDRMSystemMessageWrapper);
                p.onDRMSystemMessageWrapper = null;
            }
            p.onDRMSystemMessageDomLevel0 = listener;
            if (listener) {
                p.onDRMSystemMessageWrapper = (ev) => {
                    listener(ev.msg, ev.DRMSystemID);
                };
                this.addEventListener('DRMSystemMessage', p.onDRMSystemMessageWrapper);
            }
        },
    });

    function dispatchDRMSystemStatusChange(DRMSystemID) {
        const event = new Event('DRMSystemStatusChange');
        Object.assign(event, {
            DRMSystemID: DRMSystemID,
        });
        privates.get(this).eventDispatcher.dispatchEvent(event);
    }

    function dispatchDRMMessageResult(msgID, resultMsg, resultCode) {
        const ev = new Event('DRMMessageResult');
        Object.assign(ev, {
            msgID: msgID,
            resultMsg: resultMsg,
            resultCode: resultCode,
        });
        privates.get(this).eventDispatcher.dispatchEvent(ev);
    }

    function dispatchDRMSystemMessage(msg, DRMSystemID) {
        const ev = new Event('DRMSystemMessage');
        Object.assign(ev, {
            msg: msg,
            DRMSystemID: DRMSystemID,
        });
        privates.get(this).eventDispatcher.dispatchEvent(ev);
    }

    function initialise() {
        privates.set(this, {});
        const p = privates.get(this);
        p.eventDispatcher = new hbbtv.utils.EventDispatcher(this);

        hbbtv.drmManager.registerOipfDrmAgent(
            this,
            dispatchDRMSystemStatusChange,
            dispatchDRMMessageResult,
            dispatchDRMSystemMessage
        );
    }

    return {
        prototype: prototype,
        initialise: initialise,
    };
})();

hbbtv.objects.upgradeToOipfDrmAgent = function(object) {
    Object.setPrototypeOf(object, hbbtv.objects.OipfDrmAgent.prototype);
    hbbtv.objects.OipfDrmAgent.initialise.call(object);
};

hbbtv.objectManager.registerObject({
    name: 'application/oipfdrmagent',
    mimeTypes: ['application/oipfdrmagent'],
    oipfObjectFactoryMethodName: 'createDrmAgentObject',
    upgradeObject: hbbtv.objects.upgradeToOipfDrmAgent,
});/**
 * @fileOverview OIPF application/oipfParentalControlManager object
 * See: {@link https://web.archive.org/web/20200219165053/http://www.oipf.tv/web-spec/volume5.html#application-oipfparentalcontrolmanager}
 * HbbTV 2.0.5 A.2.31: parentalPINLength, requestParentalControlApproval
 * OIPF 7.9.1.2 / HbbTV A.1 (Annex O): verifyParentalControlPIN
 * @license ORB Software. Copyright (c) 2022 Ocean Blue Software Limited
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

hbbtv.objects.OipfParentalControlManager = (function() {
    const prototype = Object.create(HTMLObjectElement.prototype);
    const privates = new WeakMap();
    let gIsPendingApproval = false;

    Object.defineProperty(prototype, 'parentalRatingSchemes', {
        get() {
            return privates.get(this).parentalRatingSchemes;
        },
    });

    /**
     * HbbTV A.2.31: number of digits in the terminal PIN, 0 if disabled, -1 if non-PIN auth.
     */
    Object.defineProperty(prototype, 'parentalPINLength', {
        get() {
            return hbbtv.bridge.parentalControl.getPINLength();
        },
    });

    /**
     * OIPF 7.9.1.2 / HbbTV A.1: verify the parental control PIN.
     *
     * @param {string} pcPIN PIN to verify
     * @return {number} 0 correct, 1 incorrect, 2 PIN entry locked
     */
    prototype.verifyParentalControlPIN = function(pcPIN) {
        return hbbtv.bridge.parentalControl.verifyPIN(
            pcPIN == null ? '' : String(pcPIN));
    };

    /**
     * HbbTV A.2.31: run terminal parental approval; resolves "approved" or "notApproved".
     *
     * @param {Object|null} context optional BCP-47 language → content name map
     * @return {Promise<string>}
     */
    prototype.requestParentalControlApproval = function(context) {
        return new Promise((resolve) => {
            if (gIsPendingApproval) {
                resolve('notApproved');
                return;
            }
            gIsPendingApproval = true;
            const wrapper = (event) => {
                hbbtv.bridge.removeStrongEventListener('parentalcontrolapproval', wrapper);
                gIsPendingApproval = false;
                resolve(event.approved ? 'approved' : 'notApproved');
            };
            hbbtv.bridge.addStrongEventListener('parentalcontrolapproval', wrapper);
            hbbtv.bridge.parentalControl.requestApproval(context);
        });
    };

    function initialise() {
        privates.set(this, {});
        const p = privates.get(this);
        p.parentalRatingSchemes = hbbtv.objects.createParentalRatingSchemeCollection();
    }

    return {
        prototype: prototype,
        initialise: initialise,
    };
})();

hbbtv.objects.upgradeToOipfParentalControlManager = function(object) {
    Object.setPrototypeOf(object, hbbtv.objects.OipfParentalControlManager.prototype);
    hbbtv.objects.OipfParentalControlManager.initialise.call(object);
};

hbbtv.objectManager.registerObject({
    name: 'application/oipfparentalcontrolmanager',
    mimeTypes: ['application/oipfparentalcontrolmanager'],
    oipfObjectFactoryMethodName: 'createParentalControlManagerObject',
    upgradeObject: function(object) {
        hbbtv.objects.upgradeToOipfParentalControlManager(object);
    },
});
/**
 * @fileOverview ParentalRatingScheme class
 * See: {@link https://web.archive.org/web/20200219165053/http://www.oipf.tv/web-spec/volume5.html#parentalratingscheme-class}
 * @license ORB Software. Copyright (c) 2022 Ocean Blue Software Limited
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

hbbtv.objects.ParentalRatingScheme = (function() {
    const prototype = {};
    const privates = new WeakMap();

    hbbtv.utils.defineGetterProperties(prototype, {
        length() {
            // in case the rating scheme is dvb-si, the returned
            // length should be always 0
            if (this.name.toLowerCase() === 'dvb-si') {
                return 0;
            }
            return privates.get(this).ratings.length;
        },
        name() {
            return privates.get(this).name;
        },
        threshold() {
            return hbbtv.objects.createParentalRating(
                hbbtv.bridge.parentalControl.getThreshold(this.name)
            );
        },
    });

    prototype.item = function(index) {
        return privates.get(this).ratings.item(index);
    };

    prototype.indexOf = function(ratingValue) {
        const p = privates.get(this);
        for (let i = 0; i < p.ratings.length; ++i) {
            if (p.ratings.item(i).name === ratingValue) {
                return i;
            }
        }
        return -1;
    };

    prototype.iconUri = function(index) {
        return null;
    };

    function initialise(schemeName, ratings) {
        privates.set(this, {});
        const p = privates.get(this);

        p.name = schemeName;
        p.ratings = hbbtv.objects.createCollection(ratings);
    }

    return {
        prototype: prototype,
        initialise: initialise,
    };
})();

hbbtv.objects.createParentalRatingScheme = function(schemeName, ratings) {
    const parentalRatingScheme = Object.create(hbbtv.objects.ParentalRatingScheme.prototype);
    hbbtv.objects.ParentalRatingScheme.initialise.call(parentalRatingScheme, schemeName, ratings);
    return parentalRatingScheme;
};/**
 * @fileOverview ParentalRatingSchemeCollection class
 * See: {@link https://web.archive.org/web/20200219165053/http://www.oipf.tv/web-spec/volume5.html#parentalratingschemecollection-class}
 * @license ORB Software. Copyright (c) 2022 Ocean Blue Software Limited
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

hbbtv.objects.ParentalRatingSchemeCollection = (function() {
    const prototype = {};
    const privates = new WeakMap();

    Object.defineProperty(prototype, 'length', {
        get() {
            return privates.get(this).parentalRatingSchemes.length;
        },
    });

    prototype.item = function(index) {
        return privates.get(this).parentalRatingSchemes[index];
    };

    prototype.getParentalRatingScheme = function(name) {
        return privates.get(this).parentalRatingSchemes.find((scheme) => scheme.name === name);
    };

    function initialise() {
        privates.set(this, {});
        const p = privates.get(this);
        p.parentalRatingSchemes = [];
        const schemes = hbbtv.bridge.parentalControl.getRatingSchemes();
        for (const scheme of schemes) {
            p.parentalRatingSchemes.push(
                hbbtv.objects.createParentalRatingScheme(scheme.name, scheme.ratings)
            );
        }
    }

    return {
        prototype: prototype,
        initialise: initialise,
    };
})();

hbbtv.objects.createParentalRatingSchemeCollection = function() {
    const parentalRatingSchemeCollection = Object.create(
        hbbtv.objects.ParentalRatingSchemeCollection.prototype
    );
    hbbtv.objects.ParentalRatingSchemeCollection.initialise.call(parentalRatingSchemeCollection);
    return parentalRatingSchemeCollection;
};/**
 * @fileOverview ParentalRating class
 * See: {@link https://web.archive.org/web/20200219165053/http://www.oipf.tv/web-spec/volume5.html#parentalrating-class}
 * @license ORB Software. Copyright (c) 2022 Ocean Blue Software Limited
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

hbbtv.objects.ParentalRating = (function() {
    const prototype = {};
    const privates = new WeakMap();

    hbbtv.utils.defineGetterProperties(prototype, {
        name() {
            return privates.get(this).parentalRatingData.name;
        },
        scheme() {
            return privates.get(this).parentalRatingData.scheme;
        },
        value() {
            return privates.get(this).parentalRatingData.value;
        },
        labels() {
            return privates.get(this).parentalRatingData.labels;
        },
        region() {
            return privates.get(this).parentalRatingData.region;
        },
    });

    // Initialise an instance of prototype
    function initialise(parentalRatingData) {
        privates.set(this, {});
        const p = privates.get(this);
        p.parentalRatingData = parentalRatingData; // Hold reference to caller's object
    }

    // Private method to get a copy of the parental rating data
    /*function cloneParentalRatingData() {
      return Object.assign({}, privates.get(this).parentalRatingData);
   }*/

    /*prototype.toString = function() {
      return JSON.stringify(privates.get(this).parentalRatingData);
   }*/

    return {
        prototype: prototype,
        initialise: initialise,
        //cloneParentalRatingData: cloneParentalRatingData
    };
})();

hbbtv.objects.createParentalRating = function(parentalRatingData) {
    // Create new instance of hbbtv.objects.ParentalRating.prototype
    const pr = Object.create(hbbtv.objects.ParentalRating.prototype);
    hbbtv.objects.ParentalRating.initialise.call(pr, parentalRatingData);
    return pr;
};/**
 * @fileOverview ParentalRatingCollection class
 * @license ORB Software. Copyright (c) 2022 Ocean Blue Software Limited
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

hbbtv.objects.ParentalRatingCollection = (function() {
    const prototype = {};
    const privates = new WeakMap();

    Object.defineProperty(prototype, 'length', {
        get() {
            return privates.get(this).collection.length;
        },
    });

    prototype.item = function(index) {
        return privates.get(this).collection[index];
    };

    prototype.addParentalRating = function(scheme, name, value, labels, region) {
        privates.get(this).collection.push(
            hbbtv.objects.createParentalRating({
                scheme: scheme,
                name: name,
                value: value,
                labels: labels,
                region: region,
            })
        );
    };

    function initialise(items) {
        privates.set(this, {});
        const p = privates.get(this);
        const source = Array.isArray(items) ? items : [];
        p.collection = source.map(function(item) {
            return hbbtv.objects.createParentalRating(item);
        });
        p.collection.forEach((e) => Object.freeze(e));
    }

    return {
        prototype: prototype,
        initialise: initialise,
    };
})();

hbbtv.objects.ParentalRatingCollectionProxy = {
    get: function(target, name) {
        if (name in target) {
            const origMethod = target[name];
            if (origMethod instanceof Function) {
                return function(...args) {
                    return origMethod.apply(target, args);
                };
            }
            return target[name];
        }
        if (typeof name === 'string' || name instanceof String) {
            const index = parseInt(name, 10);
            if (!isNaN(index)) {
                return target.item(index);
            }
        }
    },
};

hbbtv.objects.createParentalRatingCollection = function(items) {
    const collection = Object.create(hbbtv.objects.ParentalRatingCollection.prototype);
    hbbtv.objects.ParentalRatingCollection.initialise.call(collection, items);
    return new Proxy(collection, hbbtv.objects.ParentalRatingCollectionProxy);
};/**
 * @fileOverview The application/oipfSearchManager embedded object.
 * See: {@link https://web.archive.org/web/20200219165053/http://www.oipf.tv/web-spec/volume5.html#application-oipfsearchmanager}
 * @license ORB Software. Copyright (c) 2022 Ocean Blue Software Limited
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

hbbtv.objects.OipfSearchManager = (function() {
    const prototype = Object.create(HTMLObjectElement.prototype);
    const privates = new WeakMap();
    const gGarbageCollectionBlocked = new Set();

    Object.defineProperty(prototype, 'broadcastIndependent', {
        enumerable: false,
        configurable: false,
        get() {
            return privates.get(this).broadcastIndependent;
        },
        set(broadcastIndependent) {
            privates.get(this).broadcastIndependent = broadcastIndependent;
        },
    });

    prototype.createSearch = function(searchTarget) {
        const p = privates.get(this);
        mandatoryBroadcastRelatedSecurityCheck(p);
        if (searchTarget !== 1) {
            return undefined;
        } else {
            return hbbtv.objects.createMetadataSearch(this, searchTarget);
        }
    };

    prototype.getChannelConfig = function() {
        const p = privates.get(this);
        mandatoryBroadcastRelatedSecurityCheck(p);
        if (p.channelConfig == null) {
            try {
                p.channelConfig = hbbtv.objects.createChannelConfig();
            } catch (e) {
                if (e.name === 'SecurityError') {
                    p.broadcastIndependent = true;
                }
                throw e;
            }
        }
        return p.channelConfig;
    };

    // DOM level 1 event methods
    prototype.addEventListener = function(type, listener) {
        noRestrictionSecurityCheck();
        if (privates.get(this).eventDispatcher.addCountedEventListener(type, listener) > 0) {
            gGarbageCollectionBlocked.add(this);
        }
    };

    prototype.removeEventListener = function(type, listener) {
        noRestrictionSecurityCheck();
        if (privates.get(this).eventDispatcher.removeCountedEventListener(type, listener) == 0) {
            gGarbageCollectionBlocked.delete(this);
        }
    };

    // DOM level 0 event properties
    Object.defineProperty(prototype, 'onMetadataSearch', {
        get() {
            return privates.get(this).onMetadataSearchDomLevel0;
        },
        set(listener) {
            const p = privates.get(this);
            if (p.onMetadataSearchDomLevel0) {
                this.removeEventListener('MetadataSearch', p.onMetadataSearchWrapper);
                p.onMetadataSearchWrapper = null;
            }
            p.onMetadataSearchDomLevel0 = listener;
            if (listener) {
                p.onMetadataSearchWrapper = (ev) => {
                    listener(ev.search, ev.state);
                };
                this.addEventListener('MetadataSearch', p.onMetadataSearchWrapper);
            }
        },
    });

    /** Broadcast-independent applications: shall throw a "Security Error" */
    function mandatoryBroadcastRelatedSecurityCheck(p) {
        if (p.broadcastIndependent) {
            throw new DOMException('', 'SecurityError');
        }
    }

    /** Broadcast-independent applications: shall have no restrictions */
    function noRestrictionSecurityCheck() {
        /* noop */
    }

    function dispatchMetadataSearch(search, state) {
        const p = privates.get(this);
        mandatoryBroadcastRelatedSecurityCheck(p);
        const event = new Event('MetadataSearch');
        Object.assign(event, {
            search: search,
            state: state,
        });
        p.eventDispatcher.dispatchEvent(event);
    }

    function initialise() {
        /* TODO: Follow security model of section 10 (in particular section 10.1.3.6) => TLS handshake
         * through a valid X.509v3 certificate */
        privates.set(this, {});
        const p = privates.get(this);
        /* Note: We asume App is broadcast related until proven wrong with a SecurityError */
        p.broadcastIndependent = false;
        p.eventDispatcher = new hbbtv.utils.EventDispatcher(this);
        p.channelConfig = this.getChannelConfig();
    }

    return {
        prototype: prototype,
        initialise: initialise,
        dispatchMetadataSearch: dispatchMetadataSearch,
    };
})();

hbbtv.objects.upgradeToOipfSearchManager = function(object) {
    Object.setPrototypeOf(object, hbbtv.objects.OipfSearchManager.prototype);
    hbbtv.objects.OipfSearchManager.initialise.call(object);
};

hbbtv.objectManager.registerObject({
    name: 'application/oipfsearchmanager',
    mimeTypes: ['application/oipfsearchmanager'],
    oipfObjectFactoryMethodName: 'createSearchManagerObject',
    upgradeObject: function(object) {
        hbbtv.objects.upgradeToOipfSearchManager(object);
    },
});/**
 * @fileOverview MetadataSearch class
 * @license ORB Software. Copyright (c) 2022 Ocean Blue Software Limited
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/*jshint esversion: 6 */

hbbtv.objects.MetadataSearch = (function() {
    const prototype = {};
    const privates = new WeakMap();

    const State = Object.freeze({
        IDLE: 0,
        SEARCHING: 1,
        FOUND: 2,
    });

    hbbtv.utils.defineGetterProperties(prototype, {
        searchTarget() {
            const p = privates.get(this);
            mandatoryBroadcastRelatedSecurityCheck(p);
            return p.searchTarget;
        },
        result() {
            const p = privates.get(this);
            mandatoryBroadcastRelatedSecurityCheck(p);
            return p.result;
        },
    });

    prototype.setQuery = function(query) {
        const p = privates.get(this);
        mandatoryBroadcastRelatedSecurityCheck(p);
        internalSetQuery.call(this, query, p);
    };

    prototype.addChannelConstraint = function(channel) {
        const p = privates.get(this);
        mandatoryBroadcastRelatedSecurityCheck(p);
        if (channel === null) {
            p.channelConstraints = [];
        } else {
            if (p.channelConstraints.indexOf(channel.ccid) === -1) {
                p.channelConstraints.push(channel.ccid);
            }
        }
        internalSetQuery.call(this, p.currentQuery, p);
    };

    prototype.createQuery = function(field, comparison, value) {
        const p = privates.get(this);
        mandatoryBroadcastRelatedSecurityCheck(p);
        switch (field) {
            case 'Programme.startTime':
            case 'Programme.endTime':
            case 'Programme.name':
            case 'Programme.programmeID':
                break;
            default:
                console.error('Unsupported field to compare: ' + field);
                return null;
        }
        return hbbtv.objects.createQuery(field, comparison, value);
    };

    prototype.findProgrammesFromStream = function(channel, startTime, count) {
        const p = privates.get(this);
        mandatoryBroadcastRelatedSecurityCheck(p);
        /* HbbTV 2.0.3: The count parameter is not included. */
        p.channelConstraints = [channel.ccid];
        /* OIPF DAE §7.12.2.2: null startTime → now. Inclusive “showing at”
         * window: P.startTime <= startTime < P.startTime + P.duration. */
        if (startTime == null) {
            startTime = Date.now() / 1000;
        }
        startTime = Math.round(Number(startTime));
        const CMP_MORE = 2; /* endTime > startTime */
        const CMP_LESS_EQL = 5; /* startTime <= query start */
        const qShowing = hbbtv.objects
            .createQuery('Programme.startTime', CMP_LESS_EQL, startTime)
            .and(hbbtv.objects.createQuery('Programme.endTime', CMP_MORE, startTime));
        internalSetQuery.call(this, qShowing, p);
    };

    function initialise(searchManager, searchTarget) {
        privates.set(this, {});
        const p = privates.get(this);
        p.searchManager =
            searchManager && hbbtv.utils.HAS_WEAKREF_SUPPORT ?
            new WeakRef(searchManager) :
            searchManager;
        p.searchTarget = searchTarget;
        p.internalState = State.IDLE;
        p.channelConstraints = [];
        p.result = hbbtv.objects.createSearchResults({
                empty: true,
            },
            this
        );

        p.onMetadataSearch = (event) => {
            console.log('Received MetadataSearch');
            console.log(event);

            if (p.currentQuery.queryId() !== event.search) {
                /* Ignore this search event */
                return;
            }
            dispatchMetadataSearch.call(
                this,
                event.search,
                event.status,
                event.programmeList,
                event.offset,
                event.totalSize
            );
        };
        hbbtv.bridge.addWeakEventListener('MetadataSearch', p.onMetadataSearch);
    }

    function internalSetQuery(query, p) {
        if (p.currentQuery) {
            if (p.internalState != State.IDLE && p.result) {
                p.result.abort();
            }
        }

        p.currentQuery = query;
        p.result = hbbtv.objects.createSearchResults({
                query: query,
            },
            this
        );
        p.internalState = State.IDLE;
    }

    function dispatchMetadataSearch(search, state, programmeList, offset, totalSize) {
        const p = privates.get(this);

        if (p.currentQuery.queryId() !== search) {
            /* Ignore this search event */
            return;
        }

        let handled = false;
        if (p.internalState == State.IDLE) {
            if (state === -1) {
                hbbtv.bridge.broadcast.startSearch(
                    p.currentQuery,
                    offset,
                    totalSize,
                    p.channelConstraints
                );
                handled = true;
                p.internalState = State.SEARCHING;
            }
        } else if (p.internalState == State.SEARCHING) {
            if (state === 0) {
                handled = true;
                p.internalState = State.FOUND;
            } else if (state === 3 || state === 4) {
                handled = true;
                p.internalState = State.IDLE;
            }
        } else if (p.internalState == State.FOUND) {
            if (state === -1) {
                hbbtv.bridge.broadcast.startSearch(
                    p.currentQuery,
                    offset,
                    totalSize,
                    p.channelConstraints
                );
                handled = true;
                p.internalState = State.SEARCHING;
            } else if (state === 3) {
                handled = true;
                p.internalState = State.IDLE;
            }
        }
        if (!handled) {
            console.error(
                'Received MetadataSearch state=' +
                state +
                ' Event while ' +
                p.internalState +
                '. programmeList='
            );
            console.error(programmeList);
            return;
        }
        if (programmeList) {
            p.result.setResults(programmeList, offset, totalSize);
        }
        if (state != -1) {
            /* Pass down the event to the searchManager */
            const searchManager =
                p.searchManager && hbbtv.utils.HAS_WEAKREF_SUPPORT ?
                p.searchManager.deref() :
                p.searchManager;
            hbbtv.objects.OipfSearchManager.dispatchMetadataSearch.call(searchManager, this, state);
        }
    }

    /** Broadcast-independent applications: shall throw a "Security Error" */
    function mandatoryBroadcastRelatedSecurityCheck(p) {
        const bi =
            p.searchManager && hbbtv.utils.HAS_WEAKREF_SUPPORT ?
            p.searchManager.deref() :
            p.searchManager;
        if (bi && bi.broadcastIndependent) {
            throw new DOMException('', 'SecurityError');
        }
    }

    return {
        prototype: prototype,
        initialise: initialise,
        dispatchMetadataSearch: dispatchMetadataSearch,
    };
})();

hbbtv.objects.createMetadataSearch = function(searchManager, searchTarget) {
    const metadataSearch = Object.create(hbbtv.objects.MetadataSearch.prototype);
    hbbtv.objects.MetadataSearch.initialise.call(metadataSearch, searchManager, searchTarget);
    return metadataSearch;
};/**
 * @fileOverview Query class
 * @license ORB Software. Copyright (c) 2022 Ocean Blue Software Limited
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
let queryIdCounter = 0;
hbbtv.objects.Query = (function() {
    const prototype = {};
    const privates = new WeakMap();

    prototype.and = function(query) {
        return createAndQuery(this, query);
    };

    prototype.or = function(query) {
        return createOrQuery(this, query);
    };

    prototype.not = function() {
        return createNotQuery(this);
    };

    prototype.toJSON = function(recursive) {
        const p = privates.get(this);
        let result;
        if (p.queryData.operation === 'IDENTITY') {
            result = {
                comparison: p.queryData.op1.comparison,
                field: p.queryData.op1.field,
                value: p.queryData.op1.value,
            };
        } else if (p.queryData.operation === 'NOT') {
            result = {
                arguments: [p.queryData.op1.toJSON(true)],
                operation: p.queryData.operation,
            };
        } else {
            result = {
                arguments: [p.queryData.op1.toJSON(true), p.queryData.op2.toJSON(true)],
                operation: p.queryData.operation,
            };
        }

        if (recursive !== true) {
            result.queryId = p.queryId;
        }
        return result;
    };

    prototype.queryId = function() {
        return privates.get(this).queryId;
    };

    // Private method to get a copy of the query data
    function cloneQueryData() {
        return Object.assign({}, privates.get(this).queryData);
    }

    function initialise(queryData) {
        privates.set(this, {});
        const p = privates.get(this);
        p.queryId = queryIdCounter++;
        p.queryData = queryData;
    }

    function createAndQuery(op1, op2) {
        const query = Object.create(hbbtv.objects.Query.prototype);
        hbbtv.objects.Query.initialise.call(query, {
            operation: 'AND',
            op1: hbbtv.objects.createQuery(op1),
            op2: hbbtv.objects.createQuery(op2),
        });
        return query;
    }

    function createOrQuery(op1, op2) {
        const query = Object.create(hbbtv.objects.Query.prototype);
        hbbtv.objects.Query.initialise.call(query, {
            operation: 'OR',
            op1: hbbtv.objects.createQuery(op1),
            op2: hbbtv.objects.createQuery(op2),
        });
        return query;
    }

    function createNotQuery(op1) {
        const query = Object.create(hbbtv.objects.Query.prototype);
        hbbtv.objects.Query.initialise.call(query, {
            operation: 'NOT',
            op1: hbbtv.objects.createQuery(op1),
        });
        return query;
    }

    return {
        prototype: prototype,
        initialise: initialise,
        cloneQueryData: cloneQueryData,
    };
})();

hbbtv.objects.createQuery = function(field, comparison, value) {
    const query = Object.create(hbbtv.objects.Query.prototype);
    if (typeof field === 'string') {
        hbbtv.objects.Query.initialise.call(query, {
            operation: 'IDENTITY',
            op1: {
                field: field,
                comparison: comparison,
                value: value,
            },
        });
    } else {
        hbbtv.objects.Query.initialise.call(query, hbbtv.objects.Query.cloneQueryData.call(field));
    }
    return query;
};/**
 * @fileOverview SearchResults class
 * @license ORB Software. Copyright (c) 2022 Ocean Blue Software Limited
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

hbbtv.objects.SearchResults = (function() {
    const prototype = {};
    const privates = new WeakMap();

    hbbtv.utils.defineGetterProperties(prototype, {
        length() {
            return privates.get(this).searchResultsData.results.length;
        },
        offset() {
            return privates.get(this).searchResultsData.offset;
        },
        totalSize() {
            return privates.get(this).searchResultsData.totalSize;
        },
    });

    prototype.item = function(index) {
        const p = privates.get(this);
        if (index < 0 || p.searchResultsData.results.length <= index) {
            return undefined;
        }
        const data = Object.assign({}, p.searchResultsData.results[index]);
        /* HbbTV O.6.2.2: longDescription is undefined for DVB-I DASH (TVA CRID). */
        if (data.programmeIDType === hbbtv.objects.Programme.prototype.ID_TVA_CRID) {
            delete data.longDescription;
        }
        data.parentalRatings = hbbtv.objects.createParentalRatingCollection(
            Array.isArray(data.parentalRatings) ? data.parentalRatings : []
        );
        return hbbtv.objects.createProgramme(data);
    };

    prototype.getResults = function(offset, count) {
        const p = privates.get(this);
        p.searchResultsData.results = [];
        if (offset == null) {
            offset = 0;
        }
        if (count == null) {
            count = -1;
        }
        const metadataSearch =
            p.metadataSearch && hbbtv.utils.HAS_WEAKREF_SUPPORT ?
            p.metadataSearch.deref() :
            p.metadataSearch;
        /* Note: state -1 means the search has been started */
        hbbtv.objects.MetadataSearch.dispatchMetadataSearch.call(
            metadataSearch,
            p.searchResultsData.query.queryId(),
            -1,
            null,
            offset,
            count
        );
        return false;
    };

    prototype.abort = function() {
        const p = privates.get(this);
        hbbtv.bridge.broadcast.abortSearch(p.searchResultsData.query.queryId());
        p.searchResultsData.results = [];
        const metadataSearch =
            p.metadataSearch && hbbtv.utils.HAS_WEAKREF_SUPPORT ?
            p.metadataSearch.deref() :
            p.metadataSearch;
        /* Note: state 3 means the search has been aborted */
        hbbtv.objects.MetadataSearch.dispatchMetadataSearch.call(
            metadataSearch,
            p.searchResultsData.query.queryId(),
            3,
            null
        );
    };

    function initialise(searchResultsData, metadataSearch) {
        privates.set(this, {});
        const p = privates.get(this);
        p.searchResultsData = searchResultsData;
        p.searchResultsData.results = [];
        p.searchResultsData.offset = 0;
        p.searchResultsData.totalSize = 0;
        p.metadataSearch =
            metadataSearch && hbbtv.utils.HAS_WEAKREF_SUPPORT ?
            new WeakRef(metadataSearch) :
            metadataSearch;
    }

    function setResults(results, offset, totalSize) {
        const p = privates.get(this);
        p.searchResultsData.results = results;
        p.searchResultsData.offset = offset;
        p.searchResultsData.totalSize = totalSize;
    }

    return {
        prototype: prototype,
        initialise: initialise,
        setResults: setResults,
    };
})();

hbbtv.objects.SearchResultsProxy = {
    get: function(target, name, receiver) {
        if (name === 'setResults') {
            const origMethod = hbbtv.objects.SearchResults.setResults;
            return function(...args) {
                return origMethod.apply(target, args);
            };
        }
        if (name in target) {
            const origMethod = target[name];
            if (origMethod instanceof Function) {
                return function(...args) {
                    return origMethod.apply(target, args);
                };
            }
            return target[name];
        }
        if (typeof name === 'string' || name instanceof String) {
            const index = parseInt(name);
            if (!isNaN(index)) {
                return target.item(index);
            }
        }
    },
};

hbbtv.objects.createSearchResults = function(searchResultsData, metadataSearch) {
    const searchResults = Object.create(hbbtv.objects.SearchResults.prototype);
    hbbtv.objects.SearchResults.initialise.call(searchResults, searchResultsData, metadataSearch);
    return new Proxy(searchResults, hbbtv.objects.SearchResultsProxy);
};/**
 * @fileOverview application/hbbtvMediaSynchroniser object
 * @license ORB Software. Copyright (c) 2022 Ocean Blue Software Limited
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

hbbtv.objects.MediaSynchroniser = (function() {
    const prototype = Object.create(HTMLObjectElement.prototype);
    const privates = new WeakMap();
    let mediaSyncs = {};
    let lastMediaSync = undefined;
    const MEDIA_ERROR_LOOKUP = {
        [MediaError.MEDIA_ERR_ABORTED]: 16,
        [MediaError.MEDIA_ERR_DECODE]: 16,
        [MediaError.MEDIA_ERR_NETWORK]: 14,
        [MediaError.MEDIA_ERR_SRC_NOT_SUPPORTED]: 16,
    };

    window.addEventListener('beforeunload', () => {
        for (let id in mediaSyncs) {
            hbbtv.bridge.mediaSync.destroy(id);
        }
    });

    hbbtv.utils.defineGetterProperties(prototype, {
        lastError() {
            return privates.get(this).lastError;
        },
        lastErrorSource() {
            return privates.get(this).lastErrorSource;
        },
        nrOfSlaves() {
            const nr = hbbtv.bridge.mediaSync.nrOfSlaves(privates.get(this).id);
            return nr == -1 ? null : nr;
        },
        interDeviceSyncEnabled() {
            return hbbtv.bridge.mediaSync.interDeviceSyncEnabled(privates.get(this).id);
        },
        maxBroadbandStreamsWithBroadcast() {
            return 1;
        },
        maxBroadbandStreamsNoBroadcast() {
            return 1;
        },
        currentTime() {
            const p = privates.get(this);
            if (!p.mediaObserver) {
                return NaN;
            }
            return p.mediaObserver.contentTime;
        },
    });

    hbbtv.utils.defineGetterSetterProperties(prototype, {
        contentIdOverride: {
            get() {
                return hbbtv.bridge.mediaSync.getContentIdOverride(privates.get(this).id);
            },
            set(val) {
                hbbtv.bridge.mediaSync.setContentIdOverride(privates.get(this).id, val || '');
            },
        },
    });

    prototype.initMediaSynchroniser = async function(mediaObject, timelineSelector) {
        const p = privates.get(this);
        const isBroadcast = mediaObject.getAttribute('__mimeType') === 'video/broadcast';

        if (p.inPermanentErrorState) {
            dispatchErrorEvent.call(this, 13, null); // in permanent error state (transient)
        } else if (lastMediaSync === this) {
            dispatchErrorEvent.call(this, 17, null); // already initialised (transient)
        } else if (
            !isBroadcast &&
            (mediaObject.readyState < HTMLMediaElement.HAVE_CURRENT_DATA || mediaObject.ended)
        ) {
            setToPermanentErrorState.call(this);
            dispatchErrorEvent.call(this, 16, mediaObject); // mediaobject not in suitable state (permanent)
        } else if (!hbbtv.bridge.mediaSync.initialise(p.id, isBroadcast)) {
            console.warn('MediaSynchroniser: Failed to initialise Media Sync object.'); // this should never happen
            setToPermanentErrorState.call(this);
            dispatchErrorEvent.call(this, 13, null); // in permanent error state (transient)
        } else if (!hbbtv.bridge.mediaSync.startTimelineMonitoring(p.id, timelineSelector, true)) {
            setToPermanentErrorState.call(this);
            dispatchErrorEvent.call(this, 15, null); // unavailable/unsupported timeline selector (permanent)
        } else {
            function refreshContentId() {
                let params = [];
                return mediaObject
                    .orb_getCurrentPeriod()
                    .then((curPeriod) => {
                        if (curPeriod) {
                            if (curPeriod.id) {
                                params.push('period=' + curPeriod.id);
                            }
                            if (curPeriod.ciAncillaryData) {
                                params.push(
                                    'period_ci_ancillary=' + curPeriod.ciAncillaryData.__text
                                );
                            }
                        }
                        return mediaObject.orb_getCiAncillaryData();
                    })
                    .then((ciAncData) => {
                        if (ciAncData) {
                            params.push('mpd_ci_ancillary=' + ciAncData);
                        }
                    })
                    .finally(() => {
                        p.contentId = mediaObject.src;
                        if (params.length > 0) {
                            p.contentId += '#' + params.join('&');
                        }
                    });
            }

            p.timelineUnavailableHandler = (e) => {
                console.log(
                    "MediaSynchroniser: Timeline with selector '" +
                    e.timelineSelector +
                    "' is unavailable."
                );
                if (
                    e.timelineSelector === timelineSelector &&
                    setToPermanentErrorState.call(this)
                ) {
                    dispatchErrorEvent.call(this, 15, mediaObject); // unsupported timeline selector (permanent)
                }
            };

            p.timelineAvailableHandler = (e) => {
                console.log(
                    "MediaSynchroniser: Timeline with selector '" +
                    e.timeline.timelineSelector +
                    "' is now available."
                );
                if (e.timeline.timelineSelector === timelineSelector) {
                    if (p.mediaObserver) {
                        p.mediaObserver.timeline = e.timeline;
                    }
                    if (!p.synchroniserInitialised) {
                        p.synchroniserInitialised = true;
                        dispatchEvent.call(this, 'SynchroniserInitialised');
                    }
                }
            };
            hbbtv.bridge.addWeakEventListener('TimelineUnavailable', p.timelineUnavailableHandler);
            hbbtv.bridge.addWeakEventListener('TimelineAvailable', p.timelineAvailableHandler);

            if (lastMediaSync && !privates.get(lastMediaSync).inPermanentErrorState) {
                // invalidate previously initilised media synchroniser
                setToPermanentErrorState.call(lastMediaSync);
                dispatchErrorEvent.call(lastMediaSync, 18, mediaObject); // replaced by a new media synchroniser (permanent)
            }

            if (!isBroadcast) {
                p.moPrototype = Object.getPrototypeOf(mediaObject);
                const overridePrototype = () => {
                    const moPrototypeOverride = Object.create(p.moPrototype);
                    moPrototypeOverride.load = () => {
                        p.moPrototype.load.call(mediaObject);
                        dispatchErrorEvent.call(this, 16, mediaObject); // not in suitable state for sync (permanent)
                    };
                    mediaObject.removeEventListener('loaded', overridePrototype);
                    Object.setPrototypeOf(mediaObject, moPrototypeOverride);
                }
                p.overridePrototype = overridePrototype;
                if (mediaObject.readyState >= HTMLMediaElement.HAVE_METADATA) {
                    p.overridePrototype();
                } else {
                    mediaObject.addEventListener('loaded', p.overridePrototype);
                }
            }

            p.masterMediaObject = mediaObject;

            lastMediaSync = this;

            if (isBroadcast) {
                if (
                    mediaObject.playState ===
                    hbbtv.objects.BroadcastObserver.prototype.PLAY_STATE_UNREALIZED ||
                    mediaObject.playState ===
                    hbbtv.objects.BroadcastObserver.prototype.PLAY_STATE_STOPPED
                ) {
                    errorHandler();
                    return;
                }
                p.mediaObserver = hbbtv.objects.createBroadcastObserver(mediaObject);
            } else {
                p.mediaObserver = hbbtv.objects.createMediaElementObserver(mediaObject);
                await refreshContentId();
                const mrsUrl = await extractMrsUrl(mediaObject);
                hbbtv.bridge.mediaSync.updateCssCiiProperties(
                    p.id,
                    p.contentId,
                    mediaObject.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA ?
                    'okay' :
                    'transitioning',
                    'final',
                    mrsUrl
                );
            }

            if (p.mediaObserver.start()) {
                let relIndex = timelineSelector.indexOf(':rel:');
                let curPeriod = undefined;
                let timelines = {};

                p.onPeriodChangedHandler = async (e) => {
                    if (curPeriod && e.data.id !== curPeriod) {
                        //make available timeline based on e.data.id
                        let currentTimelineSelector = timelineSelector.replace(
                            curPeriod,
                            e.data.id
                        );
                        relIndex = currentTimelineSelector.indexOf(':rel:');

                        if (relIndex >= 0) {
                            console.warn(
                                'MediaSynchroniser: DASH period id changed from ' +
                                curPeriod +
                                ' to ' +
                                e.data.id
                            );
                            hbbtv.bridge.mediaSync.setTimelineAvailability(
                                p.id,
                                timelines[curPeriod],
                                false,
                                0,
                                0
                            );
                            curPeriod = currentTimelineSelector
                                .substring(relIndex + 5)
                                .split(':')[1];
                            if (curPeriod) {
                                if (timelines[curPeriod] !== currentTimelineSelector) {
                                    timelines[curPeriod] = currentTimelineSelector;
                                    // in case timelineSelector of master media changes (i.e. period change)
                                    timelineSelector = currentTimelineSelector;
                                    hbbtv.bridge.mediaSync.startTimelineMonitoring(
                                        p.id,
                                        currentTimelineSelector,
                                        true
                                    );
                                }
                                hbbtv.bridge.mediaSync.setTimelineAvailability(
                                    p.id,
                                    currentTimelineSelector,
                                    true,
                                    p.mediaObserver.contentTicks,
                                    p.mediaObserver.timelineSpeedMultiplier
                                );
                            }
                        }
                        await refreshContentId();
                        const mrsUrl = await extractMrsUrl(p.masterMediaObject);
                        hbbtv.bridge.mediaSync.updateCssCiiProperties(
                            p.id,
                            p.contentId,
                            p.masterMediaObject.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA ?
                            'okay' :
                            'transitioning',
                            'final',
                            mrsUrl
                        );
                    }
                };

                p.onStreamUpdatedHandler = async (e) => {
                    const periods = await mediaObject.orb_getPeriods();
                    if (periods) {
                        let periodIds = Object.keys(timelines);
                        periodIds = periodIds.filter((pid) => {
                            for (const period of periods) {
                                if (period.id === pid) {
                                    return false;
                                }
                            }
                            return true;
                        });
                        for (const pid of periodIds) {
                            hbbtv.bridge.mediaSync.stopTimelineMonitoring(
                                p.id,
                                timelines[pid],
                                true
                            );
                            delete timelines[pid];
                        }
                    }
                };

                p.mediaObserver.addEventListener('MediaUpdated', mediaUpdatedHandler);
                p.mediaObserver.addEventListener('Error', errorHandler);

                if (relIndex >= 0) {
                    mediaObject.addEventListener(
                        '__orb_onstreamupdated__',
                        p.onStreamUpdatedHandler
                    );
                    mediaObject.addEventListener(
                        '__orb_onperiodchanged__',
                        p.onPeriodChangedHandler
                    );
                    curPeriod = timelineSelector.substring(relIndex + 5).split(':')[1];
                    if (curPeriod) {
                        const curPeriodInfo = await mediaObject.orb_getCurrentPeriod();
                        if (curPeriodInfo && curPeriodInfo.id !== curPeriod) {
                            // while starting mediasync, dash is streaming with a different timelineselector
                            hbbtv.bridge.mediaSync.stopTimelineMonitoring(
                                p.id,
                                timelineSelector,
                                true
                            );
                        } else {
                            timelines[curPeriod] = timelineSelector;
                            hbbtv.bridge.mediaSync.setTimelineAvailability(
                                p.id,
                                timelineSelector,
                                true,
                                p.mediaObserver.contentTicks,
                                p.mediaObserver.timelineSpeedMultiplier
                            );
                        }
                    } else {
                        hbbtv.bridge.mediaSync.setTimelineAvailability(
                            p.id,
                            timelineSelector,
                            true,
                            p.mediaObserver.contentTicks,
                            p.mediaObserver.timelineSpeedMultiplier
                        );
                    }
                } else {
                    hbbtv.bridge.mediaSync.setTimelineAvailability(
                        p.id,
                        timelineSelector,
                        true,
                        p.mediaObserver.contentTicks,
                        p.mediaObserver.timelineSpeedMultiplier
                    );
                }
            } else {
                errorHandler();
            }
        }
    };

    prototype.addMediaObject = function(
        mediaObject,
        timelineSelector,
        correlationTimestamp,
        tolerance,
        multiDecoderMode
    ) {
        const p = privates.get(this);
        if (correlationTimestamp === undefined) {
            correlationTimestamp = {
                tlvMaster: 0,
                tlvOther: 0,
            };
        }
        if (isNaN(tolerance) || tolerance < 0) {
            tolerance = 0;
        }

        if (p.inPermanentErrorState) {
            dispatchErrorEvent.call(this, 13, null); // in permanent error state (transient)
        } else if (lastMediaSync !== this) {
            dispatchErrorEvent.call(this, 7, null); // not yet initialised (transient)
        } else if (p.masterMediaObject === mediaObject || p.mediaObjects.has(mediaObject)) {
            dispatchErrorEvent.call(this, 4, mediaObject); // media object already added (transient)
        } else if (0) {
            // TODO: check streams combination support
            dispatchErrorEvent.call(this, 20, mediaObject); // unsupported combination of streams (transient)
        } else if (
            correlationTimestamp === null ||
            isNaN(correlationTimestamp.tlvMaster) ||
            isNaN(correlationTimestamp.tlvOther)
        ) {
            dispatchErrorEvent.call(this, 5, mediaObject); // invalid correlation timestamp (transient)
        } else if (mediaObject.error) {
            dispatchErrorEvent.call(this, 2, mediaObject); // failure in presentation of the media object (transient)
        } else if (mediaObject.readyState < HTMLMediaElement.HAVE_CURRENT_DATA) {
            dispatchErrorEvent.call(this, 9, mediaObject); // not in suitable state for sync (transient)
        } else if (!hbbtv.bridge.mediaSync.startTimelineMonitoring(p.id, timelineSelector, false)) {
            dispatchErrorEvent.call(this, 3, mediaObject); // unavailable/unsupported timeline selector (transient)
        } else {
            p.mediaObjects.add(mediaObject);

            if (mediaObject.getAttribute('__mimeType') !== 'video/broadcast') {
                privates.set(mediaObject, {
                    tsClient: hbbtv.objects.createMediaElementTsClient(
                        mediaObject,
                        timelineSelector,
                        correlationTimestamp,
                        tolerance,
                        multiDecoderMode,
                        p.mediaObserver,
                        p.id
                    ),
                    onAudioTrackChanged: onAudioTrackChanged.bind(mediaObject),
                    timelineSelector: timelineSelector,
                });
            } else {
                // TODO: implement TS client for broadcast if needed
            }
            const priv = privates.get(mediaObject);
            mediaObject.audioTracks.addEventListener('change', priv.onAudioTrackChanged);
            priv.tsClient.addEventListener('SyncNowAchievable', () =>
                dispatchEvent.call(this, 'SyncNowAchievable', {
                    mediaObject: mediaObject,
                })
            );
            priv.tsClient.addEventListener('Error', (e) => {
                dispatchErrorEvent.call(this, e.errorCode, mediaObject);
                if (e.errorCode === 2 || e.errorCode === 9) {
                    this.removeMediaObject(mediaObject);
                }
            });
            dispatchEvent.call(this, 'MediaObjectAdded', {
                mediaObject: mediaObject,
            });
        }
    };

    prototype.removeMediaObject = function(mediaObject) {
        const p = privates.get(this);

        if (p.inPermanentErrorState) {
            dispatchErrorEvent.call(this, 13, null); // in permanent error state (transient)
        } else if (lastMediaSync !== this) {
            dispatchErrorEvent.call(this, 7, null); // not yet initialised (transient)
        } else if (mediaObject === p.masterMediaObject) {
            setToPermanentErrorState.call(this);
            dispatchErrorEvent.call(this, 18, mediaObject); // replaced by a new media synchroniser (permanent)
        } else if (!p.mediaObjects.has(mediaObject)) {
            dispatchErrorEvent.call(this, 8, mediaObject); // media object was not found (transient)
        } else {
            const priv = privates.get(mediaObject);
            mediaObject.audioTracks.removeEventListener('change', priv.onAudioTrackChanged);
            hbbtv.bridge.mediaSync.stopTimelineMonitoring(p.id, priv.timelineSelector, false);
            priv.tsClient.destroy();
            p.mediaObjects.delete(mediaObject);
            privates.delete(mediaObject);
            p.mediaObserver.muted = false;
            mediaObject.pause();
            console.log('MediaSynchroniser: Removed media object from media synchroniser.');
        }
    };

    prototype.updateCorrelationTimestamp = function(mediaObject, correlationTimestamp) {
        const p = privates.get(this);
        if (correlationTimestamp === undefined) {
            correlationTimestamp = {
                tlvMaster: 0,
                tlvOther: 0,
            };
        }

        if (lastMediaSync !== this) {
            dispatchErrorEvent.call(this, 7, null); // not yet initialised (transient)
        } else if (p.inPermanentErrorState) {
            dispatchErrorEvent.call(this, 13, null); // in permanent error state (transient)
        } else if (!p.mediaObjects.has(mediaObject)) {
            dispatchErrorEvent.call(this, 8, mediaObject); // media object has not been added (transient)
        } else if (
            !correlationTimestamp ||
            isNaN(correlationTimestamp.tlvMaster) ||
            isNaN(correlationTimestamp.tlvOther)
        ) {
            dispatchErrorEvent.call(this, 5, mediaObject); // invalid correlation timestamp (transient)
        } else {
            privates.get(mediaObject).tsClient.correlationTimestamp = correlationTimestamp;
        }
    };

    prototype.enableInterDeviceSync = function(callback) {
        const p = privates.get(this);
        const thiz = this;

        const enableInterDeviceSync = function() {
            if (!p.inPermanentErrorState) {
                if (typeof callback === 'function') {
                    const cb = (e) => {
                        hbbtv.bridge.removeWeakEventListener('InterDeviceSyncEnabled', cb);
                        if (e.id == p.id) {
                            callback();
                        }
                    };
                    hbbtv.bridge.addWeakEventListener('InterDeviceSyncEnabled', cb);
                }
                hbbtv.bridge.mediaSync.enableInterDeviceSync(p.id);
                console.log('MediaSynchroniser: Enabled inter-device synchronisation.');
            }
            thiz.removeEventListener('SynchroniserInitialised', enableInterDeviceSync);
        };

        if (p.inPermanentErrorState) {
            dispatchErrorEvent.call(this, 13, null); // in permanent error state (transient)
        } else if (lastMediaSync !== this) {
            dispatchErrorEvent.call(this, 7, null); // not yet initialised (transient)
        } else {
            if (p.synchroniserInitialised) {
                enableInterDeviceSync();
            } else {
                this.addEventListener('SynchroniserInitialised', enableInterDeviceSync);
            }
        }
    };

    prototype.disableInterDeviceSync = function(callback) {
        const p = privates.get(this);
        const thiz = this;

        const disableInterDeviceSync = function() {
            if (!p.inPermanentErrorState) {
                if (typeof callback === 'function') {
                    const cb = (e) => {
                        hbbtv.bridge.removeWeakEventListener('InterDeviceSyncDisabled', cb);
                        if (e.id == p.id) {
                            callback();
                        }
                    };
                    hbbtv.bridge.addWeakEventListener('InterDeviceSyncDisabled', cb);
                }
                hbbtv.bridge.mediaSync.disableInterDeviceSync(p.id);
                console.log('MediaSynchroniser: Disabled inter-device synchronisation.');
            }
            thiz.removeEventListener('SynchroniserInitialised', disableInterDeviceSync);
        };

        if (p.inPermanentErrorState) {
            dispatchErrorEvent.call(this, 13, null); // in permanent error state (transient)
        } else if (lastMediaSync !== this) {
            dispatchErrorEvent.call(this, 7, null); // not yet initialised (transient)
        } else {
            if (p.synchroniserInitialised) {
                disableInterDeviceSync();
            } else {
                this.addEventListener('SynchroniserInitialised', disableInterDeviceSync);
            }
        }
    };

    prototype.addEventListener = function(type, listener) {
        privates.get(this).eventTarget.addEventListener(type, listener);
    };

    prototype.removeEventListener = function(type, listener) {
        privates.get(this).eventTarget.removeEventListener(type, listener);
    };

    async function mediaUpdatedHandler(e) {
        const p = privates.get(lastMediaSync);
        if (p.masterMediaObject.getAttribute('__mimeType') !== 'video/broadcast') {
            const mrsUrl = await extractMrsUrl(p.masterMediaObject);
            hbbtv.bridge.mediaSync.updateCssCiiProperties(
                p.id,
                p.contentId,
                p.masterMediaObject.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA ?
                'okay' :
                'transitioning',
                'final',
                mrsUrl
            );
            if (p.mediaObserver.timeline && p.mediaObserver.timeline.timelineSelector) {
                hbbtv.bridge.mediaSync.setContentTimeAndSpeed(
                    p.id,
                    p.mediaObserver.timeline.timelineSelector,
                    p.mediaObserver.contentTicks,
                    p.mediaObserver.timelineSpeedMultiplier
                );
            }
        }
    }

    async function errorHandler() {
        const p = privates.get(lastMediaSync);
        if (p.masterMediaObject.getAttribute('__mimeType') !== 'video/broadcast') {
            const mrsUrl = await extractMrsUrl(p.masterMediaObject);
            hbbtv.bridge.mediaSync.updateCssCiiProperties(
                p.id,
                p.contentId,
                'fault',
                'final',
                mrsUrl
            );
        }
        if (setToPermanentErrorState.call(lastMediaSync)) {
            if (p.masterMediaObject.getAttribute('__mimeType') !== 'video/broadcast') {
                console.log('MediaSynchroniser: Media element error:', p.masterMediaObject.error);
                if (
                    p.masterMediaObject.error &&
                    MEDIA_ERROR_LOOKUP[p.masterMediaObject.error.code] !== undefined
                ) {
                    dispatchErrorEvent.call(
                        lastMediaSync,
                        MEDIA_ERROR_LOOKUP[p.masterMediaObject.error.code],
                        p.masterMediaObject
                    );
                } else {
                    dispatchErrorEvent.call(lastMediaSync, 16, p.masterMediaObject); // not in suitable state for sync (permanent)
                }
            } else {
                if (p.masterMediaObject.playState === hbbtv.objects.BroadcastObserver.prototype.PLAY_STATE_STOPPED) {
                    dispatchErrorEvent.call(lastMediaSync, 16, p.masterMediaObject); // The presentation of the master media failed (permanent)
                } else {
                    dispatchErrorEvent.call(lastMediaSync, 14, p.masterMediaObject); // The presentation of the master media failed (permanent)
                }
            }
        }
    }

    function extractMrsUrl(mediaObject) {
        return mediaObject.orb_getMrsUrl().then((mrsUrl) => (mrsUrl ? mrsUrl : ''));
    }

    function onAudioTrackChanged() {
        let muteMasterMedia = false;
        for (const audioTrack of this.audioTracks) {
            if (audioTrack.enabled) {
                muteMasterMedia = true;
                break;
            }
        }
        privates.get(lastMediaSync).mediaObserver.muted = muteMasterMedia;
    }

    function setToPermanentErrorState() {
        const p = privates.get(this);
        let ret = false;
        if (!p.inPermanentErrorState) {
            if (p.mediaObserver) {
                p.mediaObserver.removeEventListener('MediaUpdated', mediaUpdatedHandler);
                p.mediaObserver.removeEventListener('Error', errorHandler);
                p.mediaObserver.stop();
                p.mediaObserver = undefined;
            }
            if (p.masterMediaObject) {
                p.masterMediaObject.removeEventListener(
                    '__orb_onstreamupdated__',
                    p.onStreamUpdatedHandler
                );
                p.masterMediaObject.removeEventListener(
                    '__orb_onperiodchanged__',
                    p.onPeriodChangedHandler
                );

                if (p.overridePrototype) {
                    mediaObject.removeEventListener('loaded', p.overridePrototype);
                    Object.setPrototypeOf(p.masterMediaObject, p.moPrototype);
                }
            }
            for (const mediaObject of p.mediaObjects) {
                const priv = privates.get(mediaObject);
                priv.tsClient.destroy();
                mediaObject.audioTracks.removeEventListener('change', priv.onAudioTrackChanged);
                privates.delete(mediaObject);
            }
            p.mediaObjects.clear();
            if (p.timelineUnavailableHandler) {
                hbbtv.bridge.removeWeakEventListener(
                    'TimelineUnavailable',
                    p.timelineUnavailableHandler
                );
            }
            if (p.timelineAvailableHandler) {
                hbbtv.bridge.removeWeakEventListener(
                    'TimelineAvailable',
                    p.timelineAvailableHandler
                );
            }
            p.inPermanentErrorState = true;

            hbbtv.bridge.mediaSync.destroy(p.id);
            delete mediaSyncs[p.id];

            ret = true;
        }
        return ret;
    }

    // helper function for dispatching events
    function dispatchEvent(event, contextInfo) {
        console.log("Dispatched '" + event + "' event.");
        const evt = new Event(event);
        if (contextInfo) {
            Object.assign(evt, contextInfo);
        }
        privates.get(this).eventTarget.dispatchEvent(evt);
        hbbtv.utils.runOnMainLooper(this, function() {
            if (this['on' + event]) {
                if (contextInfo) {
                    this['on' + event](...Object.values(contextInfo));
                } else {
                    this['on' + event]();
                }
            }
        });
    }

    // helper function for error events
    function dispatchErrorEvent(lastError, lastErrorSource) {
        const p = privates.get(this);
        p.lastError = lastError; // media object already added (transient)
        p.lastErrorSource = lastErrorSource;
        dispatchEvent.call(this, 'Error', {
            lastError: p.lastError,
            lastErrorSource: p.lastErrorSource,
        });
        console.log('MediaSynchroniser: Last error:', lastError);
    }

    function initialise() {
        privates.set(this, {
            eventTarget: document.createDocumentFragment(),
            mediaObjects: new Set(),
            inPermanentErrorState: false,
            id: hbbtv.bridge.mediaSync.instantiate(),
            lastError: null,
            lastErrorSource: null,
        });
        mediaSyncs[privates.get(this).id] = this;
    }

    return {
        prototype: prototype,
        initialise: initialise,
    };
})();

hbbtv.objects.upgradeToMediaSynchroniser = function(object) {
    Object.setPrototypeOf(object, hbbtv.objects.MediaSynchroniser.prototype);
    hbbtv.objects.MediaSynchroniser.initialise.call(object);
};

hbbtv.objectManager.registerObject({
    name: 'application/hbbtvMediaSynchroniser',
    mimeTypes: ['application/hbbtvmediasynchroniser'],
    oipfObjectFactoryMethodName: 'createMediaSynchroniser',
    upgradeObject: function(object) {
        hbbtv.objects.upgradeToMediaSynchroniser(object);
    },
});/**
 * @fileOverview MediaElementObserver class
 * @license ORB Software. Copyright (c) 2022 Ocean Blue Software Limited
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

hbbtv.objects.MediaElementObserver = (function() {
    const prototype = {};
    const privates = new WeakMap();
    const MEDIA_ELEMENT_EVENTS = [
        'seeked',
        'pause',
        'play',
        'abort',
        'ended',
        'ratechange',
        'error',
        'stalled',
        'waiting',
    ];
    const ERROR_EVENTS = ['error'];

    hbbtv.utils.defineGetterProperties(prototype, {
        contentTime() {
            return privates.get(this).mediaObject.currentTime;
        },
        timelineSpeedMultiplier() {
            const mo = privates.get(this).mediaObject;
            return mo.ended || mo.paused ? 0 : mo.playbackRate;
        },
        contentTicks() {
            if (this.timeline) {
                return this.contentTime * this.timeline.timelineProperties.unitsPerSecond;
            } else {
                return NaN;
            }
        },
        tickRate() {
            if (this.timeline) {
                return this.timeline.timelineProperties.unitsPerSecond;
            }
            return NaN;
        },
    });

    hbbtv.utils.defineGetterSetterProperties(prototype, {
        muted: {
            get() {
                return privates.get(this).mediaObject.muted;
            },
            set(val) {
                privates.get(this).mediaObject.muted = val;
            },
        },
        timeline: {
            get() {
                return privates.get(this).timeline;
            },
            set(val) {
                privates.get(this).timeline = val;
            },
        },
    });

    prototype.start = function() {
        const p = privates.get(this);
        let ret = true;
        if (p.mediaObject.error) {
            ret = false;
        } else if (!p.running) {
            for (const evt of MEDIA_ELEMENT_EVENTS) {
                p.mediaObject.addEventListener(evt, p.onMediaObjectEvent);
            }
            p.running = true;
            p.updateIntervalId = setInterval(() => {
                p.onMediaObjectEvent({
                    type: 'play',
                });
            }, 10000);
        }

        return ret;
    };

    prototype.stop = function() {
        const p = privates.get(this);
        if (p.running) {
            for (const evt of MEDIA_ELEMENT_EVENTS) {
                p.mediaObject.removeEventListener(evt, p.onMediaObjectEvent);
            }

            clearInterval(p.updateIntervalId);
            p.running = false;
        }
    };

    prototype.addEventListener = function(type, listener) {
        privates.get(this).eventTarget.addEventListener(type, listener);
    };

    prototype.removeEventListener = function(type, listener) {
        privates.get(this).eventTarget.removeEventListener(type, listener);
    };

    function onMediaObjectEvent(evt) {
        const p = privates.get(this);
        if (!ERROR_EVENTS.includes(evt.type)) {
            const event = new Event('MediaUpdated');
            event.data = {
                contentTime: this.contentTime,
                timelineSpeedMultiplier: this.timelineSpeedMultiplier,
            };
            p.eventTarget.dispatchEvent(event);
        } else {
            p.eventTarget.dispatchEvent(new Event('Error'));
        }
    }

    function initialise(mediaObject) {
        privates.set(this, {
            mediaObject: mediaObject,
            eventTarget: document.createDocumentFragment(),
            onMediaObjectEvent: onMediaObjectEvent.bind(this),
            running: false,
        });
    }

    return {
        prototype: prototype,
        initialise: initialise,
    };
})();

hbbtv.objects.createMediaElementObserver = function(mediaObject) {
    const observer = Object.create(hbbtv.objects.MediaElementObserver.prototype);
    hbbtv.objects.MediaElementObserver.initialise.call(observer, mediaObject);
    return observer;
};/**
 * @fileOverview BroadcastObserver class
 * @license ORB Software. Copyright (c) 2022 Ocean Blue Software Limited
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

hbbtv.objects.BroadcastObserver = (function() {
    const prototype = {};
    const privates = new WeakMap();

    hbbtv.utils.defineGetterProperties(prototype, {
        contentTime() {
            let ticks = this.contentTicks;
            if (!isNaN(ticks)) {
                return ticks / this.timeline.timelineProperties.unitsPerSecond;
            }
            return NaN;
        },
        timelineSpeedMultiplier() {
            return 1;
        },
        contentTicks() {
            if (this.timeline) {
                const ret = hbbtv.bridge.mediaSync.getBroadcastCurrentTime(
                    this.timeline.timelineSelector
                );
                if (ret >= 0) {
                    return ret;
                }
            }
            return NaN;
        },
        tickRate() {
            if (this.timeline) {
                return this.timeline.timelineProperties.unitsPerSecond;
            }
            return NaN;
        },
    });

    hbbtv.utils.defineGetterSetterProperties(prototype, {
        timeline: {
            get() {
                return privates.get(this).timeline;
            },
            set(val) {
                privates.get(this).timeline = val;
            },
        },
    });

    hbbtv.utils.defineConstantProperties(prototype, {
        PLAY_STATE_UNREALIZED: 0,
        PLAY_STATE_CONNECTING: 1,
        PLAY_STATE_PRESENTING: 2,
        PLAY_STATE_STOPPED: 3,
    });

    prototype.start = function() {
        const p = privates.get(this);
        let ret = true;
        if (!p.running) {
            p.running = true;
            p.mediaObject.addEventListener('PlayStateChange', p.onMediaObjectEvent);
        }
        return ret;
    };

    prototype.stop = function() {
        const p = privates.get(this);
        if (p.running) {
            p.running = false;
            p.mediaObject.removeEventListener('PlayStateChange', p.onMediaObjectEvent);
        }
    };

    prototype.addEventListener = function(type, listener) {
        privates.get(this).eventTarget.addEventListener(type, listener);
    };

    prototype.removeEventListener = function(type, listener) {
        privates.get(this).eventTarget.removeEventListener(type, listener);
    };

    function onMediaObjectEvent(e) {
        const p = privates.get(this);
        if (e.state === this.PLAY_STATE_STOPPED || e.state === this.PLAY_STATE_UNREALIZED) {
            p.eventTarget.dispatchEvent(new Event('Error'));
        } else {
            const event = new Event('MediaUpdated');
            event.data = {
                contentTime: this.contentTime,
                timelineSpeedMultiplier: this.timelineSpeedMultiplier,
            };
            p.eventTarget.dispatchEvent(event);
        }
    }

    function initialise(mediaObject) {
        privates.set(this, {
            mediaObject: mediaObject,
            eventTarget: document.createDocumentFragment(),
            onMediaObjectEvent: onMediaObjectEvent.bind(this),
            running: false,
        });
    }

    return {
        prototype: prototype,
        initialise: initialise,
    };
})();

hbbtv.objects.createBroadcastObserver = function(mediaObject) {
    const observer = Object.create(hbbtv.objects.BroadcastObserver.prototype);
    hbbtv.objects.BroadcastObserver.initialise.call(observer, mediaObject);
    return observer;
};/**
 * @fileOverview MediaElementTsClient class
 * @license ORB Software. Copyright (c) 2022 Ocean Blue Software Limited
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

hbbtv.objects.MediaElementTsClient = (function() {
    const prototype = {};
    const privates = new WeakMap();

    hbbtv.utils.defineGetterSetterProperties(prototype, {
        correlationTimestamp: {
            get() {
                return privates.get(this).correlationTimestamp;
            },
            set(val) {
                const p = privates.get(this);
                p.correlationTimestamp = val;
                onMasterMediaUpdated.call(this, {
                    data: {
                        contentTime: p.masterMediaObserver.contentTime,
                    },
                });
            },
        },
    });

    prototype.addEventListener = function(type, listener) {
        privates.get(this).eventTarget.addEventListener(type, listener);
    };

    prototype.removeEventListener = function(type, listener) {
        privates.get(this).eventTarget.removeEventListener(type, listener);
    };

    prototype.destroy = function() {
        const p = privates.get(this);
        hbbtv.bridge.removeWeakEventListener('TimelineUnavailable', p.onTimelineUnavailable);
        hbbtv.bridge.removeWeakEventListener('TimelineAvailable', p.onTimelineAvailable);
        p.masterMediaObserver.removeEventListener('MediaUpdated', p.onMasterMediaUpdated);
        p.masterMediaObserver.removeEventListener('Error', p.onFailureToPresentMedia);
        p.mediaObject.removeEventListener('ended', p.onFailureToPresentMedia);
        p.mediaObject.addEventListener('__orb_onstreamupdated__', p.onStreamUpdatedHandler);
        p.mediaObject.addEventListener('__orb_onperiodchanged__', p.onPeriodChangedHandler);
        delete p.mediaObject.__orb_addedToMediaSync__;
        Object.setPrototypeOf(p.mediaObject, p.moPrototype);
        clearInterval(p.pollIntervalId);
        privates.delete(this);
    };

    function onMasterMediaUpdated(e) {
        const p = privates.get(this);
        if (!isNaN(e.data.contentTime) && p.timeline) {
            const targetTime =
                e.data.contentTime +
                (p.correlationTimestamp.tlvOther / p.timeline.timelineProperties.tickRate -
                    p.correlationTimestamp.tlvMaster / p.masterMediaObserver.tickRate);
            let canSeek = false;
            for (let i = 0; i < p.mediaObject.buffered.length; ++i) {
                if (
                    targetTime >= p.mediaObject.buffered.start(i) &&
                    targetTime <= p.mediaObject.buffered.end(i)
                ) {
                    canSeek = true;
                    break;
                }
            }
            if (canSeek) {
                checkMediaSync.call(this, targetTime);
            } else {
                dispatchErrorEvent.call(this, 1); // insufficient buffer size (transient)
            }
        }
    }

    function checkMediaSync(contentTime) {
        const p = privates.get(this);
        if (
            p.mediaObject.readyState >= HTMLMediaElement.HAVE_METADATA &&
            contentTime >= 0 &&
            contentTime < p.mediaObject.duration
        ) {
            if (p.masterMediaObserver.timelineSpeedMultiplier == 0) {
                p.moPrototype.pause.call(p.mediaObject);
            } else {
                console.log(contentTime, p.mediaObject.currentTime);
                if (p.mediaObject.paused) {
                    p.moPrototype.play.call(p.mediaObject);
                }
                const ownProperty = Object.getOwnPropertyDescriptor(p.moPrototype, 'playbackRate');
                if (ownProperty) {
                    ownProperty.set.call(
                        p.mediaObject,
                        p.masterMediaObserver.timelineSpeedMultiplier
                    );
                }
            }

            if (Math.abs(contentTime - p.mediaObject.currentTime) > p.tolerance / 1000.0) {
                const ownProperty = Object.getOwnPropertyDescriptor(p.moPrototype, 'currentTime');
                if (ownProperty) {
                    ownProperty.set.call(p.mediaObject, contentTime + p.tolerance / 1000.0);
                    console.log('Synchronised tlvOther with tlvMaster');
                }
            }
            if (p.lastError) {
                p.lastError = 0;
                p.eventTarget.dispatchEvent(new Event('SyncNowAchievable'));
            }
        } else {
            if (!p.mediaObject.paused) {
                p.moPrototype.pause.call(p.mediaObject);
                dispatchErrorEvent.call(this, 11); // failed to synchronise media (transient)
            }
        }
    }

    function onFailureToPresentMedia() {
        dispatchErrorEvent.call(this, 2); // failed to present media (transient)
    }

    function onTimelineAvailable(e) {
        const p = privates.get(this);
        if (e.timeline.timelineSelector === p.timelineSelector) {
            p.timeline = e.timeline;
            const thiz = this;

            function pollMediaSync() {
                checkMediaSync.call(
                    thiz,
                    p.masterMediaObserver.contentTime +
                    (p.correlationTimestamp.tlvOther /
                        p.timeline.timelineProperties.unitsPerSecond -
                        p.correlationTimestamp.tlvMaster / p.masterMediaObserver.tickRate)
                );
            }
            if (!p.pollIntervalId) {
                p.pollIntervalId = setInterval(pollMediaSync, 2000);
            }
            pollMediaSync();
        }
    }

    function onTimelineUnavailable(e) {
        const p = privates.get(this);
        if (e.timelineSelector === p.timelineSelector) {
            clearInterval(p.pollIntervalId);
            p.pollIntervalId = undefined;
            p.timeline = undefined;
            dispatchErrorEvent.call(this, 3);
        }
    }

    function dispatchErrorEvent(errorCode) {
        const p = privates.get(this);
        if (p.lastError !== errorCode) {
            let evt = new Event('Error');
            p.lastError = evt.errorCode = errorCode;
            p.eventTarget.dispatchEvent(evt);
        }
    }

    async function initialise(
        mediaObject,
        timelineSelector,
        correlationTimestamp,
        tolerance,
        multiDecoderMode,
        masterMediaObserver,
        mediaSyncId
    ) {
        privates.set(this, {
            mediaObject: mediaObject,
            tolerance: tolerance,
            multiDecoderMode: multiDecoderMode,
            masterMediaObserver: masterMediaObserver,
            lastError: 0,
            timelineSelector: timelineSelector,
            correlationTimestamp: correlationTimestamp,
            eventTarget: document.createDocumentFragment(),
            moPrototype: Object.getPrototypeOf(mediaObject),
            onMasterMediaUpdated: onMasterMediaUpdated.bind(this),
            onFailureToPresentMedia: onFailureToPresentMedia.bind(this),
            onTimelineUnavailable: onTimelineUnavailable.bind(this),
            onTimelineAvailable: onTimelineAvailable.bind(this),
        });

        const p = privates.get(this);
        const thiz = this;

        const moPrototypeOverride = Object.create(p.moPrototype);
        moPrototypeOverride.pause = () => {
            dispatchErrorEvent.call(this, 9); // not in suitable state to synchronise media (transient)
            p.moPrototype.pause.call(mediaObject);
        };

        moPrototypeOverride.load = () => {
            dispatchErrorEvent.call(this, 9); // not in suitable state to synchronise media (transient)
            p.moPrototype.load.call(mediaObject);
        };

        moPrototypeOverride.play = () => {
            const res = p.moPrototype.play.call(mediaObject);
            dispatchErrorEvent.call(this, 9); // not in suitable state to synchronise media (transient)
            return res;
        };
        hbbtv.utils.defineGetterSetterProperties(moPrototypeOverride, {
            currentTime: {
                get() {
                    const ownProperty = Object.getOwnPropertyDescriptor(
                        p.moPrototype,
                        'currentTime'
                    );
                    return ownProperty ? ownProperty.get.call(mediaObject) : undefined;
                },
                set(value) {
                    dispatchErrorEvent.call(thiz, 9); // not in suitable state to synchronise media (transient)
                    const ownProperty = Object.getOwnPropertyDescriptor(
                        p.moPrototype,
                        'currentTime'
                    );
                    if (ownProperty) {
                        ownProperty.set.call(mediaObject, value);
                    }
                },
            },
            playbackRate: {
                get() {
                    const ownProperty = Object.getOwnPropertyDescriptor(
                        p.moPrototype,
                        'playbackRate'
                    );
                    return ownProperty ? ownProperty.get.call(mediaObject) : undefined;
                },
                set(value) {
                    dispatchErrorEvent.call(thiz, 9); // not in suitable state to synchronise media (transient)
                    const ownProperty = Object.getOwnPropertyDescriptor(
                        p.moPrototype,
                        'playbackRate'
                    );
                    if (ownProperty) {
                        ownProperty.set.call(mediaObject, value);
                    }
                },
            },
        });

        Object.setPrototypeOf(mediaObject, moPrototypeOverride);
        mediaObject.__orb_addedToMediaSync__ = true;

        hbbtv.bridge.addWeakEventListener('TimelineUnavailable', p.onTimelineUnavailable);
        hbbtv.bridge.addWeakEventListener('TimelineAvailable', p.onTimelineAvailable);
        masterMediaObserver.addEventListener('MediaUpdated', p.onMasterMediaUpdated);
        masterMediaObserver.addEventListener('Error', p.onFailureToPresentMedia);
        mediaObject.addEventListener('ended', p.onFailureToPresentMedia);

        // DASH timelines
        let relIndex = timelineSelector.indexOf(':rel:');
        let curPeriod = undefined;
        let timelines = {};

        p.onPeriodChangedHandler = async (e) => {
            if (curPeriod && e.data.id !== curPeriod) {
                //make available timeline based on e.data.id
                let currentTimelineSelector = timelineSelector.replace(curPeriod, e.data.id);
                relIndex = currentTimelineSelector.indexOf(':rel:');

                if (relIndex >= 0) {
                    console.warn(
                        'MediaElementTSClient: DASH period id changed from ' +
                        curPeriod +
                        ' to ' +
                        e.data.id +
                        '. Stopping timeline monitoring.'
                    );

                    hbbtv.bridge.mediaSync.setTimelineAvailability(
                        mediaSyncId,
                        timelines[curPeriod],
                        false,
                        0,
                        0
                    );
                    curPeriod = currentTimelineSelector.substring(relIndex + 5).split(':')[1];
                    if (curPeriod) {
                        if (timelines[curPeriod] !== currentTimelineSelector) {
                            timelines[curPeriod] = currentTimelineSelector;
                            hbbtv.bridge.mediaSync.startTimelineMonitoring(
                                mediaSyncId,
                                currentTimelineSelector,
                                false
                            );
                        }
                        hbbtv.bridge.mediaSync.setTimelineAvailability(
                            mediaSyncId,
                            currentTimelineSelector,
                            true,
                            p.timeline ?
                            mediaObject.currentTime *
                            p.timeline.timelineProperties.unitsPerSecond :
                            NaN,
                            mediaObject.ended || mediaObject.paused ? 0 : mediaObject.playbackRate
                        );
                    }
                }
                //await refreshContentId();
                //const mrsUrl = await extractMrsUrl(p.masterMediaObject);
                //hbbtv.bridge.mediaSync.updateCssCiiProperties(mediaSyncId, p.contentId, p.masterMediaObject.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA ? "okay" : "transitioning", "final", mrsUrl);
            }
        };

        p.onStreamUpdatedHandler = async (e) => {
            const periods = await mediaObject.orb_getPeriods();
            if (periods) {
                let periodIds = Object.keys(timelines);
                periodIds = periodIds.filter((pid) => {
                    for (const period of periods) {
                        if (period.id === pid) {
                            return false;
                        }
                    }
                    return true;
                });
                for (const pid of periodIds) {
                    hbbtv.bridge.mediaSync.stopTimelineMonitoring(
                        mediaSyncId,
                        timelines[pid],
                        false
                    );
                    delete timelines[pid];
                }
            }
        };
        if (relIndex >= 0) {
            mediaObject.addEventListener('__orb_onstreamupdated__', p.onStreamUpdatedHandler);
            mediaObject.addEventListener('__orb_onperiodchanged__', p.onPeriodChangedHandler);
            curPeriod = timelineSelector.substring(relIndex + 5).split(':')[1];
            if (curPeriod) {
                const curPeriodInfo = await mediaObject.orb_getCurrentPeriod();
                if (curPeriodInfo && curPeriodInfo.id !== curPeriod) {
                    // while starting mediasync, dash is streaming with a different timelineselector
                    hbbtv.bridge.mediaSync.stopTimelineMonitoring(
                        mediaSyncId,
                        timelineSelector,
                        false
                    );
                } else {
                    timelines[curPeriod] = timelineSelector;
                    hbbtv.bridge.mediaSync.setTimelineAvailability(
                        mediaSyncId,
                        timelineSelector,
                        true,
                        NaN,
                        mediaObject.ended || mediaObject.paused ? 0 : mediaObject.playbackRate
                    );
                }
            } else {
                hbbtv.bridge.mediaSync.setTimelineAvailability(
                    mediaSyncId,
                    timelineSelector,
                    true,
                    NaN,
                    mediaObject.ended || mediaObject.paused ? 0 : mediaObject.playbackRate
                );
            }
        } else {
            hbbtv.bridge.mediaSync.setTimelineAvailability(
                mediaSyncId,
                timelineSelector,
                true,
                NaN,
                mediaObject.ended || mediaObject.paused ? 0 : mediaObject.playbackRate
            );
        }
    }

    return {
        prototype: prototype,
        initialise: initialise,
    };
})();

hbbtv.objects.createMediaElementTsClient = function() {
    const client = Object.create(hbbtv.objects.MediaElementTsClient.prototype);
    hbbtv.objects.MediaElementTsClient.initialise.apply(client, arguments);
    return client;
};/**
 * @fileOverview application/hbbtvCSManager object
 * @license ORB Software. Copyright (c) 2022 Ocean Blue Software Limited
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

hbbtv.objects.CSManager = (function() {
    const prototype = Object.create(HTMLObjectElement.prototype);

    prototype.discoverTerminals = function() {
        // unsupported
        return false;
    };

    prototype.getApp2AppLocalBaseURL = function() {
        return hbbtv.bridge.csManager.getApp2AppLocalBaseURL();
    };

    prototype.getInterDevSyncURL = function() {
        return hbbtv.bridge.csManager.getInterDevSyncURL();
    };

    prototype.getApp2AppRemoteBaseURL = function() {
        return hbbtv.bridge.csManager.getApp2AppRemoteBaseURL();
    };

    function initialise() {}

    return {
        prototype: prototype,
        initialise: initialise,
    };
})();

hbbtv.objects.upgradeToCSManager = function(object) {
    Object.setPrototypeOf(object, hbbtv.objects.CSManager.prototype);
    hbbtv.objects.CSManager.initialise.call(object);
};

hbbtv.objectManager.registerObject({
    name: 'application/hbbtvCSManager',
    mimeTypes: ['application/hbbtvcsmanager'],
    oipfObjectFactoryMethodName: 'createCSManager',
    upgradeObject: function(object) {
        hbbtv.objects.upgradeToCSManager(object);
    },
});/**
 * @fileOverview OIPF DRM Agent object.
 * @license ORB Software. Copyright (c) 2022 Ocean Blue Software Limited
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

hbbtv.objects.OipfDrmAgent = (function() {
    const prototype = Object.create(HTMLObjectElement.prototype);
    const privates = new WeakMap();
    const gGarbageCollectionBlocked = new Set();

    prototype.sendDRMMessage = function(msgType, msg, DRMSystemID) {
        return hbbtv.drmManager.sendDRMMessage(msgType, msg, DRMSystemID);
    };

    prototype.DRMSystemStatus = function(DRMSystemID) {
        return hbbtv.drmManager.getDRMSystemStatus(DRMSystemID);
    };

    prototype.canPlayContent = function(DRMPrivateData, DRMSystemID) {
        return hbbtv.drmManager.canPlayContent(DRMPrivateData, DRMSystemID);
    };

    prototype.canRecordContent = function(DRMPrivateData, DRMSystemID) {
        return hbbtv.drmManager.canRecordContent(DRMPrivateData, DRMSystemID);
    };

    prototype.setActiveDRM = function(DRMSystemID) {
        return hbbtv.drmManager.setActiveDRM(DRMSystemID);
    };

    // DOM level 1 event methods
    prototype.addEventListener = function(type, listener) {
        if (privates.get(this).eventDispatcher.addCountedEventListener(type, listener) > 0) {
            gGarbageCollectionBlocked.add(this);
        }
    };

    prototype.removeEventListener = function(type, listener) {
        if (privates.get(this).eventDispatcher.removeCountedEventListener(type, listener) == 0) {
            gGarbageCollectionBlocked.delete(this);
        }
    };

    // DOM level 0 event properties
    Object.defineProperty(prototype, 'onDRMSystemStatusChange', {
        get() {
            return privates.get(this).onDRMSystemStatusChangeDomLevel0;
        },
        set(listener) {
            const p = privates.get(this);
            if (p.onDRMSystemStatusChangeDomLevel0) {
                this.removeEventListener('DRMSystemStatusChange', p.onDRMSystemStatusChangeWrapper);
                p.onDRMSystemStatusChangeWrapper = null;
            }
            p.onDRMSystemStatusChangeDomLevel0 = listener;
            if (listener) {
                p.onDRMSystemStatusChangeWrapper = (ev) => {
                    listener(ev.DRMSystemID);
                };
                this.addEventListener('DRMSystemStatusChange', p.onDRMSystemStatusChangeWrapper);
            }
        },
    });

    Object.defineProperty(prototype, 'onDRMMessageResult', {
        get() {
            return privates.get(this).onDRMMessageResultDomLevel0;
        },
        set(listener) {
            const p = privates.get(this);
            if (p.onDRMMessageResultDomLevel0) {
                this.removeEventListener('DRMMessageResult', p.onDRMMessageResultWrapper);
                p.onDRMMessageResultWrapper = null;
            }
            p.onDRMMessageResultDomLevel0 = listener;
            if (listener) {
                p.onDRMMessageResultWrapper = (ev) => {
                    listener(ev.msgID, ev.resultMsg, ev.resultCode);
                };
                this.addEventListener('DRMMessageResult', p.onDRMMessageResultWrapper);
            }
        },
    });

    Object.defineProperty(prototype, 'onDRMSystemMessage', {
        get() {
            return privates.get(this).onDRMSystemMessageDomLevel0;
        },
        set(listener) {
            const p = privates.get(this);
            if (p.onDRMSystemMessageDomLevel0) {
                this.removeEventListener('DRMSystemMessage', p.onDRMSystemMessageWrapper);
                p.onDRMSystemMessageWrapper = null;
            }
            p.onDRMSystemMessageDomLevel0 = listener;
            if (listener) {
                p.onDRMSystemMessageWrapper = (ev) => {
                    listener(ev.msg, ev.DRMSystemID);
                };
                this.addEventListener('DRMSystemMessage', p.onDRMSystemMessageWrapper);
            }
        },
    });

    function dispatchDRMSystemStatusChange(DRMSystemID) {
        const event = new Event('DRMSystemStatusChange');
        Object.assign(event, {
            DRMSystemID: DRMSystemID,
        });
        privates.get(this).eventDispatcher.dispatchEvent(event);
    }

    function dispatchDRMMessageResult(msgID, resultMsg, resultCode) {
        const ev = new Event('DRMMessageResult');
        Object.assign(ev, {
            msgID: msgID,
            resultMsg: resultMsg,
            resultCode: resultCode,
        });
        privates.get(this).eventDispatcher.dispatchEvent(ev);
    }

    function dispatchDRMSystemMessage(msg, DRMSystemID) {
        const ev = new Event('DRMSystemMessage');
        Object.assign(ev, {
            msg: msg,
            DRMSystemID: DRMSystemID,
        });
        privates.get(this).eventDispatcher.dispatchEvent(ev);
    }

    function initialise() {
        privates.set(this, {});
        const p = privates.get(this);
        p.eventDispatcher = new hbbtv.utils.EventDispatcher(this);

        hbbtv.drmManager.registerOipfDrmAgent(
            this,
            dispatchDRMSystemStatusChange,
            dispatchDRMMessageResult,
            dispatchDRMSystemMessage
        );
    }

    return {
        prototype: prototype,
        initialise: initialise,
    };
})();

hbbtv.objects.upgradeToOipfDrmAgent = function(object) {
    Object.setPrototypeOf(object, hbbtv.objects.OipfDrmAgent.prototype);
    hbbtv.objects.OipfDrmAgent.initialise.call(object);
};

hbbtv.objectManager.registerObject({
    name: 'application/oipfdrmagent',
    mimeTypes: ['application/oipfdrmagent'],
    oipfObjectFactoryMethodName: 'createDrmAgentObject',
    upgradeObject: hbbtv.objects.upgradeToOipfDrmAgent,
});/**
 * @fileOverview OIPF Gateway Info object
 * @license ORB Software. Copyright (c) 2022 Ocean Blue Software Limited
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

hbbtv.objects.OipfGatewayInfo = (function() {
    const prototype = Object.create(HTMLObjectElement.prototype);
    const privates = new WeakMap();
    const gGarbageCollectionBlocked = new Set();

    /* readonly properties */
    hbbtv.utils.defineGetterProperties(prototype, {
        isIGDiscovered() {
            return false;
        },
        isAGDiscovered() {
            return false;
        },
        isCSPGCIPlusDiscovered() {
            return hbbtv.drmManager.isCSPGCIPlusDiscovered();
        },
        isCSPGDTCPDiscovered() {
            return false;
        },
        igURL() {
            return 'igURL';
        },
        agURL() {
            return 'agURL';
        },
        cspgDTCPURL() {
            return 'cspgDTCPURL';
        },
        interval() {
            return 30;
        },
        isIGSupported() {
            return false;
        },
        isAGSupported() {
            return false;
        },
        isCSPGCIPlusSupported() {
            return true;
        },
        isCSPGDTCPSupported() {
            return false;
        },
        CSPGCIPlusDRMType() {
            let result = [];
            const status = hbbtv.drmManager.getCSPGCIPlusStatus();
            if (status) {
                status.DRMSystemIDs.forEach((value) => {
                    result.push(value.DRMSystemID);
                });
            }
            return result;
        },
    });

    prototype.isIGSupportedMethod = function(methodName) {
        return false;
    };

    // DOM level 1 event methods
    prototype.addEventListener = function(type, listener) {
        if (privates.get(this).eventDispatcher.addCountedEventListener(type, listener) > 0) {
            gGarbageCollectionBlocked.add(this);
        }
    };

    prototype.removeEventListener = function(type, listener) {
        if (privates.get(this).eventDispatcher.removeCountedEventListener(type, listener) == 0) {
            gGarbageCollectionBlocked.delete(this);
        }
    };

    // DOM level 0 event properties
    Object.defineProperty(prototype, 'onDiscoverIG', {
        get() {
            return privates.get(this).onDiscoverIGDomLevel0;
        },
        set(listener) {
            const p = privates.get(this);
            if (p.onDiscoverIGDomLevel0) {
                this.removeEventListener('DiscoverIG', p.onDiscoverIGWrapper);
                p.onDiscoverIGWrapper = null;
            }
            p.onDiscoverIGDomLevel0 = listener;
            if (listener) {
                p.onDiscoverIGWrapper = (ev) => {
                    listener(ev.channel, ev.errorState);
                };
                this.addEventListener('DiscoverIG', p.onDiscoverIGWrapper);
            }
        },
    });

    Object.defineProperty(prototype, 'onDiscoverAG', {
        get() {
            return privates.get(this).onDiscoverAGDomLevel0;
        },
        set(listener) {
            const p = privates.get(this);
            if (p.onDiscoverAGDomLevel0) {
                this.removeEventListener('DiscoverAG', p.onDiscoverAGWrapper);
                p.onDiscoverAGWrapper = null;
            }
            p.onDiscoverAGDomLevel0 = listener;
            if (listener) {
                p.onDiscoverAGWrapper = (ev) => {
                    listener(ev.channel, ev.errorState);
                };
                this.addEventListener('DiscoverAG', p.onDiscoverAGWrapper);
            }
        },
    });

    Object.defineProperty(prototype, 'onDiscoverCSPGDTCP', {
        get() {
            return privates.get(this).onDiscoverCSPGDTCPDomLevel0;
        },
        set(listener) {
            const p = privates.get(this);
            if (p.onDiscoverCSPGDTCPDomLevel0) {
                this.removeEventListener('DiscoverCSPGDTCP', p.onDiscoverCSPGDTCPWrapper);
                p.onDiscoverCSPGDTCPWrapper = null;
            }
            p.onDiscoverCSPGDTCPDomLevel0 = listener;
            if (listener) {
                p.onDiscoverCSPGDTCPWrapper = (ev) => {
                    listener(ev.channel, ev.errorState);
                };
                this.addEventListener('DiscoverCSPGDTCP', p.onDiscoverCSPGDTCPWrapper);
            }
        },
    });

    Object.defineProperty(prototype, 'onDiscoverCSPGCIPlus', {
        get() {
            return privates.get(this).onDiscoverCSPGCIPlusDomLevel0;
        },
        set(listener) {
            const p = privates.get(this);
            if (p.onDiscoverCSPGCIPlusDomLevel0) {
                this.removeEventListener('DiscoverCSPGCIPlus', p.onDiscoverCSPGCIPlusWrapper);
                p.onDiscoverCSPGCIPlusWrapper = null;
            }
            p.onDiscoverCSPGCIPlusDomLevel0 = listener;
            if (listener) {
                p.onDiscoverCSPGCIPlusWrapper = (ev) => {
                    listener(ev.channel, ev.errorState);
                };
                this.addEventListener('DiscoverCSPGCIPlus', p.onDiscoverCSPGCIPlusWrapper);
            }
        },
    });

    function dispatchDiscoverIGEvent() {
        const event = new Event('DiscoverIG');
        privates.get(this).eventDispatcher.dispatchEvent(event);
    }

    function dispatchDiscoverAGEvent() {
        const event = new Event('DiscoverAG');
        privates.get(this).eventDispatcher.dispatchEvent(event);
    }

    function dispatchDiscoverCSPGDTCPEvent() {
        const event = new Event('DiscoverCSPGDTCP');
        privates.get(this).eventDispatcher.dispatchEvent(event);
    }

    function dispatchDiscoverCSPGCIPlusEvent() {
        const event = new Event('DiscoverCSPGCIPlus');
        privates.get(this).eventDispatcher.dispatchEvent(event);
    }

    function initialise() {
        privates.set(this, {});
        const p = privates.get(this);
        p.eventDispatcher = new hbbtv.utils.EventDispatcher(this);
        hbbtv.drmManager.registerOipfGatewayInfo(this, dispatchDiscoverCSPGCIPlusEvent);
    }

    return {
        prototype: prototype,
        initialise: initialise,
    };
})();

hbbtv.objects.upgradeToOipfGatewayInfo = function(object) {
    Object.setPrototypeOf(object, hbbtv.objects.OipfGatewayInfo.prototype);
    hbbtv.objects.OipfGatewayInfo.initialise.call(object);
};

hbbtv.objectManager.registerObject({
    name: 'application/oipfgatewayinfo',
    mimeTypes: ['application/oipfgatewayinfo'],
    oipfObjectFactoryMethodName: 'createGatewayInfoObject',
    upgradeObject: hbbtv.objects.upgradeToOipfGatewayInfo,
});/**
 * @license ORB Software. Copyright (c) 2026 Ocean Blue Software Limited
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

(function() {
    function onTextInputFocused(e) {
        hbbtv.native.request('SoftKeyboard.show');
    }
    const observer = new MutationObserver(function(mutationsList) {
        for (const mutation of mutationsList) {
            for (const node of mutation.removedNodes) {
                if (node.nodeName && node.nodeName.toLowerCase() === 'input') {
                    node.removeEventListener('focus', onTextInputFocused);
                }
            }
            for (const node of mutation.addedNodes) {
                if (node.nodeName && node.nodeName.toLowerCase() === 'input' && node.type === 'text') {
                    node.addEventListener('focus', onTextInputFocused);
                }
            }
        }
    });
    const config = {
        childList: true,
        subtree: true,
    };
    observer.observe(document.documentElement || document.body, config);
})();
/**
 * @fileOverview MediaError class
 * @license ORB Software. Copyright (c) 2022 Ocean Blue Software Limited
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

hbbtv.objects.MediaError = (function() {
    const prototype = {};
    const privates = new WeakMap();
    const constants = [
        'MEDIA_ERR_ABORTED',
        'MEDIA_ERR_NETWORK',
        'MEDIA_ERR_DECODE',
        'MEDIA_ERR_SRC_NOT_SUPPORTED',
    ];
    const roProps = ['code', 'message'];

    for (const key of constants) {
        Object.defineProperty(prototype, key, {
            value: MediaError[key],
            writable: false,
        });
    }

    for (const key of roProps) {
        Object.defineProperty(prototype, key, {
            get() {
                return privates.get(this)[key];
            },
        });
    }

    function initialise(code, message) {
        privates.set(this, {
            code,
            message,
        });
    }

    return {
        prototype: prototype,
        initialise: initialise,
    };
})();

hbbtv.objects.createMediaError = function(code, message) {
    const mediaError = Object.create(hbbtv.objects.MediaError.prototype);
    hbbtv.objects.MediaError.initialise.call(mediaError, code, message);
    return mediaError;
};/**
 * @fileOverview TimeRanges class
 * @license ORB Software. Copyright (c) 2022 Ocean Blue Software Limited
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

hbbtv.objects.TimeRanges = (function() {
    const prototype = {};
    const privates = new WeakMap();

    Object.defineProperty(prototype, 'length', {
        get() {
            return privates.get(this).ranges.length;
        },
    });

    prototype.start = function(index) {
        return privates.get(this).ranges[index].start;
    };

    prototype.end = function(index) {
        return privates.get(this).ranges[index].end;
    };

    function initialise(ranges) {
        privates.set(this, {
            ranges,
        });
    }

    return {
        prototype: prototype,
        initialise: initialise,
    };
})();

hbbtv.objects.createTimeRanges = function(ranges) {
    const timeRanges = Object.create(hbbtv.objects.TimeRanges.prototype);
    hbbtv.objects.TimeRanges.initialise.call(timeRanges, ranges);
    return timeRanges;
};/**
 * @fileOverview MediaKeySystemAccess class
 * @license ORB Software. Copyright (c) 2022 Ocean Blue Software Limited
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
hbbtv.objects.MediaKeySystemAccess = (function() {
    const privates = new WeakMap();
    const prototype = {};

    hbbtv.utils.defineGetterProperties(prototype, {
        keySystem() {
            return privates.get(this).keySystem;
        },
    });

    prototype.getConfiguration = function() {
        return privates.get(this).configuration;
    };

    prototype.toJSON = function() {
        const p = privates.get(this);
        return {
            keySystem: p.keySystem,
            configuration: p.configuration
        };
    };

    prototype.createMediaKeys = function() {
        return Promise.resolve(hbbtv.objects.createMediaKeys(this));
    };

    function instantiate(keySystem, configuration) {
        const obj = Object.create(prototype);
        Object.freeze(configuration);
        privates.set(obj, {
            keySystem,
            configuration
        });
        return obj;
    }

    return {
        instantiate,
    };
})();

hbbtv.objects.createMediaKeySystemAccess = function(keySystem, configuration) {
    return hbbtv.objects.MediaKeySystemAccess.instantiate(keySystem, configuration);
};/**
 * @fileOverview MediaKeys class
 * @license ORB Software. Copyright (c) 2022 Ocean Blue Software Limited
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
hbbtv.objects.MediaKeys = (function() {
    const MEDIA_KEYS_ID = 'MediaKeys';
    const privates = new WeakMap();
    const prototype = {};

    hbbtv.utils.defineGetterProperties(prototype, {
        orb_polyfilled() {
            return true;
        },
    });

    prototype.createSession = function(sessionType) {
        const proxy = privates.get(this).proxy;
        proxy.callObserverMethod(MEDIA_KEYS_ID, 'createSession', [sessionType]);
        return hbbtv.objects.createMediaKeySession(proxy);
    };

    prototype.setServerCertificate = function(cert) {
        return privates
            .get(this)
            .proxy.callAsyncObserverMethod(MEDIA_KEYS_ID, 'setServerCertificate', [
                [...new Uint8Array(cert)],
            ]);
    };

    prototype.orb_setIFrameProxy = function(proxy) {
        privates.get(this).proxy = proxy;
        proxy.registerObserver(MEDIA_KEYS_ID, this);
    };

    prototype.toJSON = function() {
        const mediaKeySystemAccess = privates.get(this).mediaKeySystemAccess;
        return {
            mediaKeySystemAccess: mediaKeySystemAccess.toJSON()
        };
    };

    function instantiate(mediaKeySystemAccess) {
        const obj = Object.create(prototype);
        privates.set(obj, {
            mediaKeySystemAccess
        });
        return obj;
    }

    return {
        instantiate,
    };
})();

hbbtv.objects.createMediaKeys = function(mediaKeySystemAccess) {
    return hbbtv.objects.MediaKeys.instantiate(mediaKeySystemAccess);
};/**
 * @fileOverview MediaKeySession class
 * @license ORB Software. Copyright (c) 2022 Ocean Blue Software Limited
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
hbbtv.objects.MediaKeySession = (function() {
    const MEDIA_KEY_SESSION_ID = 'MediaKeySession';
    const privates = new WeakMap();
    const prototype = {};
    const events = ['keystatuseschange', 'message'];
    const evtTargetMethods = ['addEventListener', 'removeEventListener', 'dispatchEvent'];

    for (const key of events) {
        Object.defineProperty(prototype, 'on' + key, {
            set(callback) {
                const p = privates.get(this);
                if (p['on' + key]) {
                    p.eventTarget.removeEventListener(key, p['on' + key]);
                }

                if (callback instanceof Object) {
                    p['on' + key] = callback;
                    if (callback) {
                        p.eventTarget.addEventListener(key, callback);
                    }
                } else {
                    p['on' + key] = null;
                }
            },
            get() {
                return privates.get(this)['on' + key];
            },
        });
    }

    function makeEventTargetMethod(name) {
        return function() {
            EventTarget.prototype[name].apply(privates.get(this).eventTarget, arguments);
        };
    }

    for (const func of evtTargetMethods) {
        prototype[func] = makeEventTargetMethod(func);
    }

    hbbtv.utils.defineGetterProperties(prototype, {
        closed() {
            return privates
                .get(this)
                .proxy.callAsyncObserverMethod(MEDIA_KEY_SESSION_ID, 'orb_closed');
        },
        expiration() {
            return NaN;
        }, // TODO
        keyStatuses() {
            return {};
        }, // TODO
        sessionId() {
            return '';
        }, // TODO
    });

    prototype.generateRequest = function(initDataType, initData) {
        return privates
            .get(this)
            .proxy.callAsyncObserverMethod(MEDIA_KEY_SESSION_ID, 'generateRequest', [
                initDataType,
                [...new Uint8Array(initData)],
            ]);
    };

    prototype.update = function(licence) {
        return privates
            .get(this)
            .proxy.callAsyncObserverMethod(MEDIA_KEY_SESSION_ID, 'update', [
                [...new Uint8Array(licence)],
            ]);
    };

    prototype.close = function() {
        return privates.get(this).proxy.callAsyncObserverMethod(MEDIA_KEY_SESSION_ID, 'close');
    };

    prototype.load = function(sessionId) {
        return privates
            .get(this)
            .proxy.callAsyncObserverMethod(MEDIA_KEY_SESSION_ID, 'load', [sessionId]);
    };

    prototype.remove = function() {
        return privates.get(this).proxy.callAsyncObserverMethod(MEDIA_KEY_SESSION_ID, 'remove');
    };

    function instantiate(proxy) {
        const obj = Object.create(prototype);
        privates.set(obj, {
            proxy,
            eventTarget: document.createDocumentFragment(),
        });
        proxy.registerObserver(MEDIA_KEY_SESSION_ID, obj);
        return obj;
    }

    return {
        instantiate,
    };
})();

hbbtv.objects.createMediaKeySession = function(iframeProxy) {
    return hbbtv.objects.MediaKeySession.instantiate(iframeProxy);
};/**
 * @fileOverview IFrameObjectProxy class
 * @license ORB Software. Copyright (c) 2022 Ocean Blue Software Limited
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

hbbtv.objects.IFrameObjectProxy = (function() {
    const prototype = {};
    const privates = new WeakMap();
    const MSG_TYPE_HANDSHAKE_REQUEST = 'orb_iframe_handshake_request';
    const MSG_TYPE_DISPATCH_EVENT = 'orb_iframe_dispatch_event';
    const MSG_TYPE_SET_PROPERTIES = 'orb_iframe_set_properties';
    const MSG_TYPE_METHOD_REQUEST = 'orb_iframe_method_request';
    const MSG_TYPE_ASYNC_METHOD_REQUEST = 'orb_iframe_async_method_request';
    const MSG_TYPE_ASYNC_CALL_RESPONSE = 'orb_iframe_async_method_response';
    let asyncIDs = 0;

    // This may not be ideal in case the iframe content initiates the handshake,
    // because in case we have multiple video elements, for all of them, sessionIDs
    // variable would be initially set to 0. At the moment we know that the main
    // window initiates the handshake, so no problems there.
    let sessionIDs = 0;

    prototype.initiateHandshake = function(remoteWindow) {
        const p = privates.get(this);
        const thiz = this;
        p.sessionId = sessionIDs++;
        p.remoteWindow = remoteWindow;
        console.log('IFrameObjectProxy: Requesting handshake with sessionId', p.sessionId + '...');
        return makeAsyncCall.call(this, MSG_TYPE_HANDSHAKE_REQUEST).then(() => {
            while (p.pending.length) {
                const pending = p.pending.shift();
                postMessage.call(thiz, pending.type, pending.data);
            }
        });
    };

    prototype.invalidate = function() {
        const p = privates.get(this);
        p.remoteWindow = undefined;
        p.sessionId = undefined;
    };

    prototype.registerObserver = function(observerId, observer) {
        console.log('IFrameObjectProxy: Registered observer', observer, 'with id', observerId);
        privates.get(this).observers[observerId] = observer;
    };

    prototype.unregisterObserver = function(observerId) {
        console.log('IFrameObjectProxy: Unregistered observer with id', observerId);
        delete privates.get(this).observers[observerId];
    };

    prototype.callObserverMethod = function(observerId, name, args = []) {
        postMessage.call(this, MSG_TYPE_METHOD_REQUEST, {
            observerId: observerId,
            name: name,
            args: args,
        });
        //console.log("IFrameObjectProxy: Requested call to method", name, "with arguments", args, "to observer with id", observerId);
    };

    prototype.callAsyncObserverMethod = function(observerId, name, args = []) {
        console.log(
            'IFrameObjectProxy: Requested call to async method',
            name,
            'with arguments',
            args,
            'to observer with id',
            observerId
        );
        return makeAsyncCall.call(this, MSG_TYPE_ASYNC_METHOD_REQUEST, {
            observerId: observerId,
            name: name,
            args: args,
        });
    };

    prototype.updateObserverProperties = function(observerId, properties) {
        postMessage.call(this, MSG_TYPE_SET_PROPERTIES, {
            observerId: observerId,
            properties: properties,
        });
        //console.log("IFrameObjectProxy: Requested update of properties for observer with id", observerId, properties);
    };

    prototype.dispatchEvent = function(observerId, e) {
        postMessage.call(this, MSG_TYPE_DISPATCH_EVENT, {
            observerId: observerId,
            eventName: e.type,
            eventData: e,
        });
    };

    function makeAsyncCall(type, data = {}) {
        const thiz = this;
        return new Promise((resolve, reject) => {
            data.callId = asyncIDs++;
            const callback = (e) => {
                let msg;
                try {
                    msg = JSON.parse(e.data);
                } catch (error) {
                    console.warn('IFrameObjectProxy: error parsing message data:', e.data);
                    return;
                }
                if (
                    msg.type === MSG_TYPE_ASYNC_CALL_RESPONSE &&
                    msg.data.callId === data.callId &&
                    msg.sessionId === privates.get(thiz).sessionId
                ) {
                    console.log(
                        'IFrameObjectProxy: received response from async call with data',
                        msg.data
                    );
                    window.removeEventListener('message', callback);
                    clearTimeout(timeoutId);
                    if (msg.data.error) {
                        reject(msg.data.error);
                    } else {
                        resolve(...msg.data.args);
                    }
                    e.stopImmediatePropagation();
                }
            };
            const timeoutId = setTimeout(() => {
                window.removeEventListener('message', callback);
                reject(
                    'IFrameObjectProxy: Async call with callId ' +
                    data.callId +
                    ' timed out without receiving a response.'
                );
            }, 10000);
            window.addEventListener('message', callback);
            console.log('IFrameObjectProxy: Making an async call with callId ' + data.callId);
            postMessage.call(thiz, type, data);
        });
    }

    function postMessage(type, data) {
        const p = privates.get(this);
        if (p.remoteWindow) {
            p.remoteWindow.postMessage(
                JSON.stringify({
                    sessionId: p.sessionId,
                    type: type,
                    data: data,
                }),
                '*'
            );
        } else {
            p.pending.push({
                type: type,
                data: data,
            });
        }
    }

    function initialise() {
        privates.set(this, {
            observers: {},
            pending: [],
        });

        const thiz = this;
        const p = privates.get(this);

        p.onMessage = (e) => {
            let msg;
            try {
                msg = JSON.parse(e.data);
            } catch (error) {
                console.warn('IFrameObjectProxy: error parsing message data:', e.data);
                return;
            }
            if (msg.type === MSG_TYPE_HANDSHAKE_REQUEST) {
                p.remoteWindow = e.source;
                p.sessionId = msg.sessionId;
                console.log(
                    'IFrameObjectProxy: Received handshake request with sessionId',
                    p.sessionId + '. Responding back...'
                );
                postMessage.call(thiz, MSG_TYPE_ASYNC_CALL_RESPONSE, {
                    callId: msg.data.callId,
                    args: [],
                });
                while (p.pending.length) {
                    const pending = p.pending.shift();
                    postMessage.call(thiz, pending.type, pending.data);
                }
                e.stopImmediatePropagation();
            } else if (p.sessionId === msg.sessionId && p.remoteWindow === e.source) {
                const observer = p.observers[msg.data.observerId];
                if (observer) {
                    switch (msg.type) {
                        case MSG_TYPE_DISPATCH_EVENT:
                            const evt = new Event(msg.data.eventName);
                            const evtProps = {};
                            for (const key in msg.data.eventData) {
                                if (key !== 'isTrusted') {
                                    // Uncaught TypeError: Cannot redefine property: isTrusted
                                    evtProps[key] = {
                                        value: msg.data.eventData[key],
                                        writable: false,
                                    };
                                }
                            }
                            evtProps.target = {
                                value: observer,
                                writable: false
                            };
                            Object.defineProperties(evt, evtProps);
                            observer.dispatchEvent(evt);
                            break;
                        case MSG_TYPE_SET_PROPERTIES:
                            // console.log("IFrameObjectProxy: Received request for update of properties for observer with id", JSON.stringify(msg.data.observerId), JSON.stringify(msg.data.properties));
                            for (const key in msg.data.properties) {
                                if (typeof observer[key] !== 'function') {
                                    observer[key] = msg.data.properties[key];
                                }
                            }
                            break;
                        case MSG_TYPE_METHOD_REQUEST:
                            if (typeof observer[msg.data.name] === 'function') {
                                observer[msg.data.name](...msg.data.args);
                            }
                            break;
                        case MSG_TYPE_ASYNC_METHOD_REQUEST:
                            if (typeof observer[msg.data.name] === 'function') {
                                observer[msg.data.name](...msg.data.args)
                                    .then((...args) => {
                                        postMessage.call(thiz, MSG_TYPE_ASYNC_CALL_RESPONSE, {
                                            callId: msg.data.callId,
                                            args: args,
                                        });
                                    })
                                    .catch((e) => {
                                        postMessage.call(thiz, MSG_TYPE_ASYNC_CALL_RESPONSE, {
                                            callId: msg.data.callId,
                                            error: e,
                                        });
                                    });
                            }
                            break;
                        default:
                            return; // return for all other cases in order to prevent stopImmediatePropagation from being called
                    }
                    e.stopImmediatePropagation();
                }
            }
        };
        window.addEventListener('message', p.onMessage);
        console.log('IFrameObjectProxy: initialised');
    }

    return {
        prototype: prototype,
        initialise: initialise,
    };
})();

hbbtv.objects.createIFrameObjectProxy = function() {
    const iframeObjectProxy = Object.create(hbbtv.objects.IFrameObjectProxy.prototype);
    hbbtv.objects.IFrameObjectProxy.initialise.call(iframeObjectProxy);
    return iframeObjectProxy;
};/**
 * @fileOverview MediaElementExtension class
 * @license ORB Software. Copyright (c) 2022 Ocean Blue Software Limited
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

hbbtv.objects.MediaElementExtension = (function() {
    const privates = new WeakMap();
    const MEDIA_PROXY_ID = 'HTMLMediaElement';
    const props = [
        'autoplay',
        'controls',
        'currentTime',
        'playbackRate',
        'volume',
        'muted',
        'loop',
        'defaultMuted',
        'crossOrigin',
        'controlsList',
        'defaultPlaybackRate',
        'disableRemotePlayback',
        'preservesPitch',
        'srcObject',
    ];
    const mediaOwnProperties = Object.getOwnPropertyDescriptors(HTMLMediaElement.prototype);

    if (location.protocol !== 'http:' && location.hostname !== 'localhost') {
        const _requestMediaKeySystemAccess = Navigator.prototype.requestMediaKeySystemAccess;
        Navigator.prototype.requestMediaKeySystemAccess = function() {
            return Promise.resolve(
                hbbtv.objects.createMediaKeySystemAccess.apply(undefined, arguments)
            );
        };

        // consider custom EME playback
        const _setMediaKeys = HTMLMediaElement.prototype.setMediaKeys;
        HTMLMediaElement.prototype.setMediaKeys = function(mediaKeys) {
            const thiz = this;
            if (!mediaKeys || !mediaKeys.orb_polyfilled) {
                return _setMediaKeys.call(thiz, mediaKeys);
            }
            const conf = mediaKeys.toJSON().mediaKeySystemAccess;
            return _requestMediaKeySystemAccess
                .call(navigator, conf.keySystem, conf.configuration)
                .then((mksa) => mksa.createMediaKeys())
                .then((mkeys) => {
                    mediaKeys.createSession = function(sessionType) {
                        return mkeys.createSession(sessionType);
                    };
                    mediaKeys.setServerCertificate = function(cert) {
                        return mkeys.setServerCertificate(cert);
                    };
                    return _setMediaKeys.call(thiz, mkeys);
                });
        };
    }

    HTMLMediaElement.prototype.getStartDate = function() {
        return new Date(NaN);
    };
    HTMLMediaElement.prototype.orb_getPeriods =
        HTMLMediaElement.prototype.orb_getMrsUrl =
        HTMLMediaElement.prototype.orb_getCurrentPeriod =
        HTMLMediaElement.prototype.orb_getCiAncillaryData =
        HTMLMediaElement.prototype.orb_unload =
        function() {
            return Promise.resolve();
        };

    // Override default play() and load() for the case where it is being called
    // immediatelly after setting its source. Due to the fact
    // that the upgrade is asynchronous, the call is being skipped,
    // so we call it inside setTimeout()
    const __play = HTMLMediaElement.prototype.play;
    HTMLMediaElement.prototype.play = function() {
        const thiz = this;
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const playPromise = privates.get(thiz) ? thiz.play() : __play.call(thiz);
                playPromise.then(resolve).catch(reject);
            }, 0);
        });
    };

    const __load = HTMLMediaElement.prototype.load;
    HTMLMediaElement.prototype.load = function() {
        setTimeout(() => {
            privates.get(this) ? this.load() : __load.call(this);
        }, 0);
    };

    // Override default addEventListener and removeEventListener for HTMLMediaElement's
    // textTracks, so that callbacks are stored and will be registered once it is upgraded
    const __addTextTracksEventListener = TextTrackList.prototype.addEventListener;
    TextTrackList.prototype.addEventListener = function(type, callback) {
        let callbacks = privates.get(this);
        if (!callbacks) {
            callbacks = {};
            privates.set(this, callbacks);
        }
        if (!callbacks[type]) {
            callbacks[type] = new Set();
        }
        callbacks[type].add(callback);
        __addTextTracksEventListener.apply(this, arguments);
    }

    const __removeTextTracksEventListener = TextTrackList.prototype.removeEventListener;
    TextTrackList.prototype.removeEventListener = function(type, callback) {
        const callbacks = privates.get(this);
        if (callbacks && !callbacks[type]) {
            callbacks[type].delete(callback);
        }
        __removeTextTracksEventListener.apply(this, arguments);
    }


    function addSourceSetterIntercept() {
        const setAttribute = HTMLMediaElement.prototype.setAttribute;
        Object.defineProperty(HTMLMediaElement.prototype, 'src', {
            set(val) {
                this.setAttribute('src', val);
            },
            get() {
                return mediaOwnProperties.src.get.call(this);
            },
        });

        HTMLMediaElement.prototype.setAttribute = function(name, value) {
            if (name === 'src' && initialise.call(this, value)) {
                this.src = value;
                return;
            }
            return setAttribute.apply(this, arguments);
        };
    }

    function resetProxySession() {
        const persistentProps = [
            'src',
            'autoplay',
            'controls',
            'playbackRate',
            'volume',
            'muted',
            'loop',
            'defaultMuted',
            'crossOrigin',
            'controlsList',
            'defaultPlaybackRate',
            'disableRemotePlayback',
            'preservesPitch',
        ];
        const p = privates.get(this);
        const properties = {};
        p.iframeProxy.invalidate();
        p.videoDummy.readyState = HTMLMediaElement.HAVE_NOTHING;
        p.videoDummy.error = null;
        p.videoDummy.startDate = new Date(NaN);
        for (const key in p.videoDummy) {
            if (persistentProps.includes(key)) {
                properties[key] = p.videoDummy[key];
            }
        }
        p.iframeProxy.updateObserverProperties(MEDIA_PROXY_ID, properties);
    }

    function createPrototype() {
        const ORB_PLAYER_URL = 'orb://player';
        const prototype = Object.create(HTMLMediaElement.prototype);
        const methods = ['load'];
        const asyncMethods = [
            'orb_getPeriods',
            'orb_getMrsUrl',
            'orb_getCurrentPeriod',
            'orb_getCiAncillaryData',
        ];
        const nodeMethods = [
            'appendChild',
            'insertBefore',
            'removeChild',
            'replaceChild',
            'hasChildNodes',
            'getElementsByTagName',
            'getElementById',
        ];
        const nodeProps = ['childNodes', 'firstChild', 'lastChild', 'children'];
        const roProps = [
            'textTracks',
            'audioTracks',
            'videoTracks',
            'paused',
            'ended',
            'currentSrc',
            'error',
            'networkState',
            'readyState',
            'seekable',
            'buffered',
            'videoWidth',
            'videoHeight',
        ];
        let lastMediaElement = undefined;

        function makeNodeMethod(name) {
            return function() {
                const thiz = privates.get(this).divDummy;
                return thiz[name].apply(thiz, arguments);
            };
        }

        for (const name of nodeMethods) {
            prototype[name] = makeNodeMethod(name);
        }

        for (const key of nodeProps) {
            Object.defineProperty(prototype, key, {
                get() {
                    return privates.get(this).divDummy[key];
                },
            });
        }

        hbbtv.utils.defineGetterProperties(prototype, {
            nextSibling() {
                const nextSibling = Object.getOwnPropertyDescriptor(
                    Node.prototype,
                    'nextSibling'
                ).get.call(this);
                // skip the generated iframe
                if (nextSibling && nextSibling.orb_mediaElementExtension) {
                    return nextSibling.nextSibling;
                }
                return nextSibling;
            },
            previousSibling() {
                const previousSibling = Object.getOwnPropertyDescriptor(
                    Node.prototype,
                    'previousSibling'
                ).get.call(this);
                // check if there is a generated iframe from another video element
                if (previousSibling && previousSibling.orb_mediaElementExtension) {
                    return previousSibling.previousSibling;
                }
                return previousSibling;
            },
        });

        prototype.getStartDate = function() {
            return privates.get(this).videoDummy.startDate;
        };

        prototype.getAttribute = function(name) {
            if (props.includes(name)) {
                return this[name];
            }
            return HTMLMediaElement.prototype.getAttribute.apply(this, arguments);
        };

        prototype.setAttribute = function(name, value) {
            if (props.includes(name)) {
                this[name] = value;
            } else {
                HTMLMediaElement.prototype.setAttribute.call(this, name, value);
            }
        };

        prototype.removeAttribute = function(name) {
            const p = privates.get(this);
            if (props.includes(name)) {
                delete p.videoDummy[name];
                p.iframeProxy.callObserverMethod(MEDIA_PROXY_ID, 'removeAttribute', [name]);
            } else {
                HTMLMediaElement.prototype.removeAttribute.apply(this, arguments);
            }
        };

        prototype.orb_unload = function() {
            const p = privates.get(this);
            delete p.videoDummy.src;
            return p.iframeProxy.callAsyncObserverMethod(MEDIA_PROXY_ID, 'orb_unload');
        };

        prototype.play = function() {
            if (!this.__orb_addedToMediaSync__) {
                // check if the HTMLMediaElement is provided to MediaSynchroniser.addMediaObject() before we pause it
                if (lastMediaElement && lastMediaElement !== this && !lastMediaElement.paused) {
                    lastMediaElement.pause();
                }
                lastMediaElement = this;
            }

            const p = privates.get(this);
            p.videoDummy.paused = false;
            try {
                hbbtv.objects.VideoBroadcast.notifyBroadbandAvInUse(true);
            } catch (e) {}
            return p.iframeProxy.callAsyncObserverMethod(MEDIA_PROXY_ID, 'play');
        };

        prototype.pause = function() {
            const p = privates.get(this);
            p.videoDummy.paused = true;
            try {
                hbbtv.objects.VideoBroadcast.notifyBroadbandAvInUse(false);
            } catch (e) {}
            p.iframeProxy.callObserverMethod(MEDIA_PROXY_ID, 'pause', Array.from(arguments));
        };

        prototype.setMediaKeys = function(mediaKeys) {
            mediaKeys.orb_setIFrameProxy(privates.get(this).iframeProxy);
            return privates
                .get(this)
                .iframeProxy.callAsyncObserverMethod(MEDIA_PROXY_ID, 'setMediaKeys', [mediaKeys]);
        };

        function makeMethod(name) {
            return function() {
                privates
                    .get(this)
                    .iframeProxy.callObserverMethod(MEDIA_PROXY_ID, name, Array.from(arguments));
            };
        }

        function makeAsyncMethod(name) {
            return function() {
                return privates
                    .get(this)
                    .iframeProxy.callAsyncObserverMethod(
                        MEDIA_PROXY_ID,
                        name,
                        Array.from(arguments)
                    );
            };
        }

        // create the HTMLMediaElement's proxy methods
        for (const key of methods) {
            prototype[key] = makeMethod(key);
        }
        for (const key of asyncMethods) {
            prototype[key] = makeAsyncMethod(key);
        }

        // create the HTMLMediaElement's proxy properties
        for (const key of props) {
            Object.defineProperty(prototype, key, {
                set(value) {
                    const p = privates.get(this);
                    if (key === "playbackRate" || p.videoDummy[key] !== value) {
                        p.videoDummy[key] = value;
                        p.iframeProxy.updateObserverProperties(MEDIA_PROXY_ID, {
                            [key]: value,
                        });
                    }
                },
                get() {
                    return privates.get(this).videoDummy[key];
                },
            });
        }

        // mandatory step as setAttribute examines the props array
        // before setting a value to an attribute, and we need to be able
        // to change the src property that way as well
        props.push('src');
        Object.defineProperty(prototype, 'src', {
            set(value) {
                const p = privates.get(this);
                if (value !== p.videoDummy.src) {
                    p.videoDummy.src = value;
                    if (value) {
                        console.log(
                            "MediaElementExtension: Setting iframe src property to '" + value + "'."
                        );
                        p.iframe.src = ORB_PLAYER_URL + '?base=' + document.baseURI;
                    } else {
                        p.iframeProxy.updateObserverProperties(MEDIA_PROXY_ID, {
                            src: value,
                        });
                    }
                }
            },
            get() {
                return privates.get(this).videoDummy.src;
            },
        });

        props.push('width');
        Object.defineProperty(prototype, 'width', {
            set(value) {
                this.style.width = value + 'px';
            },
            get() {
                return this.getBoundingClientRect().width;
            },
        });

        props.push('height');
        Object.defineProperty(prototype, 'height', {
            set(value) {
                this.style.height = value + 'px';
            },
            get() {
                return this.getBoundingClientRect().height;
            },
        });

        const hiddenOwnProperty = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'hidden');
        Object.defineProperty(prototype, 'hidden', {
            set(value) {
                const iframe = privates.get(this).iframe;
                iframe.hidden = value;
                hiddenOwnProperty.set.call(this, value);
                hbbtv.utils.matchElementStyle(iframe, this);
            },
            get() {
                return hiddenOwnProperty.get.call(this);
            },
        });

        Object.defineProperty(prototype, 'innerHTML', {
            set(value) {
                privates.get(this).divDummy.innerHTML = value;
            },
            get() {
                return privates.get(this).divDummy.innerHTML;
            },
        });

        for (const key of roProps) {
            Object.defineProperty(prototype, key, {
                get() {
                    return privates.get(this).videoDummy[key];
                },
            });
        }

        Object.defineProperty(prototype, 'duration', {
            get() {
                const videoDummy = privates.get(this).videoDummy;
                if (videoDummy.duration === null) {
                    return Infinity;
                }
                return videoDummy.duration;
            },
        });

        return prototype;
    }

    // Mutation observer
    function addDocumentMutationIntercept() {
        const observer = new MutationObserver(function(mutationsList) {
            for (const mutation of mutationsList) {
                for (const node of mutation.removedNodes) {
                    if (
                        node.nodeName &&
                        (node.nodeName.toLowerCase() === 'video' ||
                            node.nodeName.toLowerCase() === 'audio')
                    ) {
                        const p = privates.get(node);
                        if (p && p.iframe.parentNode) {
                            p.iframe.parentNode.removeChild(p.iframe);
                        }
                    }
                }
                for (const node of mutation.addedNodes) {
                    if (node.nodeName) {
                        if (
                            node.nodeName.toLowerCase() === 'video' ||
                            node.nodeName.toLowerCase() === 'audio'
                        ) {
                            if (!initialise.call(node, node.src)) {
                                for (const child of node.children) {
                                    if (
                                        child.nodeName &&
                                        child.nodeName.toLowerCase() === 'source' &&
                                        initialise.call(node, child.src)
                                    ) {
                                        break;
                                    }
                                }
                            }
                        } else if (
                            node.nodeName.toLowerCase() === 'source' &&
                            node.parentNode &&
                            node.parentNode.nodeName &&
                            (node.parentNode.nodeName.toLowerCase() === 'video' ||
                                node.parentNode.nodeName.toLowerCase() === 'audio')
                        ) {
                            initialise.call(node.parentNode, node.src);
                        }
                    }
                }
            }
        });
        const config = {
            childList: true,
            subtree: true,
        };
        observer.observe(document.documentElement || document.body, config);
    }

    addSourceSetterIntercept();
    addDocumentMutationIntercept();
    const prototype = createPrototype();

    /**
     * Helper class to act as intermediate between MediaElementExtension and
     * IFrameMediaProxy, in order to prevent ping-pong effect when calling
     * a method or updating a property. In addition to that, updates
     * read-only properties of the media element from the other end, and when
     * requested with the MediaElementExtension, return those.
     */
    function VideoDummy(parent, iframeProxy) {
        let _error = null;
        let _timeUpdateTS = Date.now();
        let _currentTime = 0;
        const thiz = this;

        this.startDate = new Date(NaN);
        this.audioTracks = hbbtv.objects.createAudioTrackList(iframeProxy);
        hbbtv.bridge.addWeakEventListener('PreferredAudioLanguageChanged', (e) => {
            const language = e.language;
            const audiotracks = thiz.audioTracks;
            let preferredAudioLanguageTrack = null;
            let trackLanguage = null;
            for (let i = 0; i < audiotracks.length; ++i) {
                trackLanguage = audiotracks[i].language;
                if (trackLanguage === language ||
                    hbbtv.languageCodes.ISO639_2_to_ISO639_1[trackLanguage] === language ||
                    hbbtv.languageCodes.ISO639_2_to_ISO639_1[language] === trackLanguage) {
                    preferredAudioLanguageTrack = audiotracks[i];
                    if (preferredAudioLanguageTrack.kind === "main") {
                        preferredAudioLanguageTrack.enabled = true;
                        return;
                    }
                }
            }
        });
        this.videoTracks = hbbtv.objects.createVideoTrackList(iframeProxy);
        this.textTracks = hbbtv.objects.createTextTrackList(parent, iframeProxy);
        this.readyState = mediaOwnProperties.readyState.get.call(parent);
        this.paused = mediaOwnProperties.paused.get.call(parent);
        this.dispatchEvent = function(e) {
            if (e.type === '__orb_startDateUpdated__') {
                this.startDate = new Date(typeof e.startDate === 'number' ? e.startDate : NaN);
            } else if (e.type === 'play') {
                _timeUpdateTS = Date.now();
                try {
                    hbbtv.objects.VideoBroadcast.notifyBroadbandAvInUse(true);
                } catch (x) {}
            } else if (e.type === 'ended') {
                try {
                    hbbtv.objects.VideoBroadcast.notifyBroadbandAvInUse(false);
                } catch (x) {}
            } else if (e.type === 'pause' && this.paused) {
                // Only the app's pause() sets videoDummy.paused. dash.js MSE
                // pause/emptied during setSource must not release decoders
                // (A.2.4.1 / ERRATA0720).
                try {
                    hbbtv.objects.VideoBroadcast.notifyBroadbandAvInUse(false);
                } catch (x) {}
            }
            parent.dispatchEvent(e);
        };
        this.addTextTrack = function() {
            this.textTracks.orb_addTextTrack.apply(this.textTracks, arguments);
        };
        this.setSeekable = function(ranges) {
            this.seekable = hbbtv.objects.createTimeRanges(ranges);
        };

        this.setBuffered = function(ranges) {
            this.buffered = hbbtv.objects.createTimeRanges(ranges);
        };

        // Add the textTracks callbacks that were registered before the
        // upgrade of the video element to VideoDummy's textTracks
        const textCallbacks = privates.get(parent.textTracks);
        if (textCallbacks) {
            for (const type in textCallbacks) {
                textCallbacks[type].forEach((value1, value2, set) => {
                    this.textTracks.addEventListener(type, value2);
                    parent.textTracks.removeEventListener(type, value2);
                }, this);
            }
        }
        this.textTracks.onaddtrack = parent.textTracks.onaddtrack;
        hbbtv.utils.defineGetterSetterProperties(parent.textTracks, {
            onaddtrack: {
                set(val) {
                    thiz.textTracks.onaddtrack = val;
                },
                get() {
                    return thiz.textTracks.onaddtrack;
                },
            }
        });

        parent.textTracks.addEventListener = this.textTracks.addEventListener.bind(this.textTracks);
        parent.textTracks.removeEventListener = this.textTracks.removeEventListener.bind(this.textTracks);
        parent.textTracks.dispatchEvent = this.textTracks.dispatchEvent.bind(this.textTracks);

        Object.defineProperty(this, 'error', {
            set(value) {
                if (value) {
                    _error = hbbtv.objects.createMediaError(value.code, value.message);
                } else {
                    _error = value;
                }
            },
            get() {
                return _error;
            },
        });
        Object.defineProperty(this, 'currentTime', {
            set(value) {
                _currentTime = value;
                _timeUpdateTS = Date.now();
            },
            get() {
                return this.paused || this.ended ?
                    _currentTime :
                    _currentTime + (Date.now() - _timeUpdateTS) / 1000.0;
            },
        });
    }

    function initialise(src) {
        if (src && !src.startsWith('blob:') && !this._rdkHolepunch) {
            let p = privates.get(this);
            const thiz = this;
            if (!p) {
                const iframeProxy = hbbtv.objects.createIFrameObjectProxy();
                const videoDummy = new VideoDummy(this, iframeProxy);

                // will be used as a placeholder to store the attributes of
                // the original video element, and after the custom prototype
                // is set, update all the stored properties with the original
                // values
                const initialProps = {};

                // will be used to intercept child addition/removal of
                // the actual video element
                const divDummy = document.createElement('div');

                // extract attributes and reset them before setting the custom prototype
                for (const key of this.getAttributeNames()) {
                    if (props.includes(key)) {
                        initialProps[key] = this.getAttribute(key) || true;
                        this.removeAttribute(key);
                    }
                }
                initialProps.src = src;

                Object.setPrototypeOf(this, prototype);
                privates.set(this, {
                    videoDummy,
                    divDummy,
                    iframeProxy,
                    iframe: document.createElement('iframe'),
                });

                p = privates.get(this);
                iframeProxy.registerObserver(MEDIA_PROXY_ID, videoDummy);

                p.styleObservers = [];

                hbbtv.utils.defineGetterProperties(p.iframe, {
                    orb_mediaElementExtension() {
                        return true;
                    },
                });
                p.iframe.frameBorder = 0;
                p.iframe.allow = 'encrypted-media *;';
                p.iframe.addEventListener('load', () => {
                    resetProxySession.call(thiz);
                    if (thiz.src) {
                        console.log(
                            'MediaElementExtension: initialising iframe with src',
                            thiz.src + '...'
                        );

                        iframeProxy.initiateHandshake(p.iframe.contentWindow).then(() => {
                            console.log(
                                'MediaElementExtension: iframe proxy handshake completed successfully'
                            );
                        });
                    }
                });

                // whenever there is a change on the video element style,
                // update the iframe style as well
                const styleObserver = new MutationObserver(function() {
                    hbbtv.utils.matchElementStyle(p.iframe, thiz);
                });
                styleObserver.observe(this, {
                    attributes: true,
                    attributeFilter: ['style', 'class'],
                });

                // whenever there is a change in the childList of the divDummy,
                // check if the added/removed child is <source>, and if so
                // set/unset the iframe's src property
                const childListObserver = new MutationObserver(function(mutationsList) {
                    for (const mutation of mutationsList) {
                        for (const node of mutation.removedNodes) {
                            if (node.nodeName && node.nodeName.toLowerCase() === 'source') {
                                thiz.removeAttribute('src');
                            }
                        }
                        for (const node of mutation.addedNodes) {
                            if (
                                node.nodeName &&
                                node.nodeName.toLowerCase() === 'source' &&
                                !thiz.src
                            ) {
                                thiz.src = node.src;
                            }
                        }
                    }
                    iframeProxy.updateObserverProperties(MEDIA_PROXY_ID, {
                        innerHTML: divDummy.innerHTML,
                    });
                });
                childListObserver.observe(divDummy, {
                    childList: true,
                });

                // childNodes property is overrided at this point, so we need
                // to get the childNodes from the property descriptor and add
                // them dynamically to the divDummy
                const childNodes = Object.getOwnPropertyDescriptor(
                    Node.prototype,
                    'childNodes'
                ).get.call(this);
                while (childNodes.length) {
                    divDummy.appendChild(childNodes[0]);
                }

                // update the new prototype with the values stored in initialProps
                for (const prop in initialProps) {
                    this[prop] = initialProps[prop];
                }
                console.log('MediaElementExtension: initialised');
            }
            if (this.parentNode && p.iframe.parentNode !== this.parentNode) {
                hbbtv.utils.insertAfter(this.parentNode, p.iframe, this);
                hbbtv.utils.matchElementStyle(p.iframe, this);
            }

            // whenever there is a change on an ancestor style,
            // update the iframe style as well
            const ancestors = [];
            let parent = this.parentNode;
            while (parent) {
                ancestors.push(parent);
                parent = parent.parentNode;
            }

            for (const observer of p.styleObservers) {
                observer.disconnect();
            }
            p.styleObservers = [];

            const observerCallback = function() {
                hbbtv.utils.matchElementStyle(p.iframe, thiz);
            };
            for (const ancestor of ancestors) {
                const styleObserver = new MutationObserver(observerCallback);
                styleObserver.observe(ancestor, {
                    attributes: true,
                    attributeFilter: ['style', 'class'],
                });
                p.styleObservers.push(styleObserver);
            }
            return true;
        }
        console.log('MediaElementExtension: failed to initialise');
        return false;
    }
})();/**
 * @fileOverview Calls core initialise at the end of the injected script.
 * @license ORB Software. Copyright (c) 2022 Ocean Blue Software Limited
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
hbbtv.core.initialise();})();