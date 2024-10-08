// <![CDATA[
/**!
 * SVG Particles (Site)
 * @author 0znzw https://scratch.mit.edu/users/0znzw/
 * @version 1.0
 * @copyright MIT & LGPLv3 License
 * Do not remove this comment
 */
// babel repl was used to do the "compilation"
// https://babeljs.io/repl#?browsers=defaults%2C%20ie%208%2C%20safari%2C%20chrome%2049%2C%20opera&build=&builtIns=false&corejs=3.21&spec=false&loose=false&code_lz=Q&debug=false&forceAllTransforms=false&modules=false&shippedProposals=false&evaluate=false&fileSize=true&timeTravel=false&sourceType=module&lineWrap=true&presets=stage-3&prettier=true&targets=&version=7.25.7&externalPlugins=&assumptions=%7B%22privateFieldsAsProperties%22%3Atrue%2C%22setClassMethods%22%3Atrue%2C%22superIsCallableConstructor%22%3Atrue%2C%22setPublicClassFields%22%3Atrue%2C%22mutableTemplateObject%22%3Atrue%2C%22constantReexports%22%3Atrue%2C%22constantSuper%22%3Atrue%2C%22arrayLikeIsIterable%22%3Atrue%2C%22iterableIsArray%22%3Atrue%7D
function _classPrivateFieldLooseBase(e, t) {
  if (!{}.hasOwnProperty.call(e, t))
    throw new TypeError("attempted to use private field on non-instance");
  return e;
}
var id = 0;
function _classPrivateFieldLooseKey(e) {
  return "__private_" + id++ + "_" + e;
}
((_ref, _window$crypto, _RNG, _state) => {
  "use strict";

  const crypto =
    (_ref =
      ((_window$crypto = window.crypto) === null || _window$crypto === void 0
        ? void 0
        : _window$crypto.getRandomValues) && window.crypto) !== null &&
    _ref !== void 0
      ? _ref
      : (() => {
          // https://unpkg.com/polyfill-crypto-methods@0.2.0/dist/index.js
          let i;
          typeof globalThis < "u" && (i = globalThis);
          if (typeof self < "u") i = self;
          else if (typeof window < "u") i = window;
          else if (typeof global < "u") i = global;
          else
            try {
              i = Function("return this")();
            } catch {}
          function l() {
            return i;
          }
          function a(e) {
            if (!ArrayBuffer.isView(e))
              throw new TypeError(
                "Failed to execute 'getRandomValues' on 'Crypto': parameter 1 is not of type 'ArrayBufferView'."
              );
            if (e.byteLength > 65536) {
              const t =
                "Failed to execute 'getRandomValues' on 'Crypto': The ArrayBufferView's byte length (" +
                e.byteLength +
                ") exceeds the number of bytes of entropy available via this API (65536).";
              throw "DOMException" in globalThis
                ? new globalThis.DOMException(t)
                : new Error(t);
            }
            const o = Math.pow(256, e.BYTES_PER_ELEMENT);
            for (let t = 0; t < e.byteLength; ++t)
              e[t] = Math.floor(o * Math.random());
            return e;
          }
          function y(e, o) {
            if (typeof e != "number")
              throw new TypeError(
                `[ERR_INVALID_ARG_TYPE]: The "size" argument must be of type number. Received type ${typeof e} (${e})`
              );
            if (e < 0 || e > 2147483647)
              throw new RangeError(
                `[ERR_OUT_OF_RANGE]: The value of "size" is out of range. It must be >= 0 && <= 2147483647. Received ${e}`
              );
            if (o && typeof o != "function")
              throw new TypeError(
                `[ERR_INVALID_ARG_TYPE]: The "callback" argument must be of type function. Received type ${typeof o} (${o})`
              );
            if (!o) {
              const t = new Uint8Array(e);
              return a(t);
            }
            return new Promise((t) => {
              const f = new Uint8Array(e);
              let r = null;
              try {
                o(null, a(f));
              } catch {
                o(r, f);
              }
              t(f);
            });
          }
          function s() {
            return y(16).reduce((t, f, r) => {
              let u = t + f.toString(16).padStart(2, "0");
              return (
                (r === 3 || r === 5 || r === 7 || r === 9) && (u += "-"), u
              );
            }, "");
          }
          const n = l();
          return {
            getRandomValues: a,
            randomBytes: y,
            randomUUID: s
          };
        })();
  const generateAnimation = function generateAnimation(
    seed,
    particleCount,
    width,
    height,
    animationSpeed,
    clipPath,
    positionAlgorithm
  ) {
    var _positionAlgorithm;
    positionAlgorithm =
      (_positionAlgorithm = positionAlgorithm) !== null &&
      _positionAlgorithm !== void 0
        ? _positionAlgorithm
        : generateAnimation.defaultPositionAlgorithm;
    seed = new generateAnimation.RNG(seed);
    animationSpeed =
      typeof animationSpeed === "number"
        ? `${animationSpeed}ms`
        : animationSpeed;
    const finalClipPath = `<path style="width: ${width}px; height: ${height}px" d="${clipPath}" />`;
    let particlesCss = "",
      cssAnimations = "",
      svgParticles = "";
    for (; particleCount > 0; particleCount--) {
      const id = seed.base(particleCount, 16);
      const sizeClass =
        Math.round(seed.float() + 1) === 2
          ? "particletools-large"
          : "particletools-small";
      const position = positionAlgorithm(seed, width, height, id);
      particlesCss += `
        /* animation class for ${id} */
        circle.particletools-particle[data-particleAnimation="${id}"] {
          animation-name: particletoolsParticleAnimationAT${id} !important;
          /* firefox */
          -mos-animation-name: particletoolsParticleAnimationAT${id} !important;
          /* IE8 */
          -ms-animation-name: particletoolsParticleAnimationAT${id} !important;
          /* safari */
          -webkit-animation-name: particletoolsParticleAnimationAT${id} !important;
          ${position.classCss || ""}
        }
        /* end animation class */
      `;
      cssAnimations += ((animation) => {
        return `
          /* all keyframes for ${id} */
          @keyframes ${animation}
          /* firefox */
          @-moz-keyframes ${animation}
          /* IE8 */
          @-ms-keyframes ${animation}
          /* safari */
          @-webkit-keyframes ${animation}
          /* end keyframes */
        `;
      })(`particletoolsParticleAnimationAT${id} {
        ${
          position.cssAnimation
            ? position.cssAnimation
            : `
          from { cx: ${position.sx}; cy: ${position.sy}; }
          to { cx: ${position.ex}; cy: ${position.ey}; }
        `
        }
      }`);
      svgParticles += `<g><circle class="particletools-particle ${sizeClass}" data-particleAnimation="${id}" data-time="${
        position.speed || animationSpeed
      }"></circle></g>`;
    }
    const svgId = `particletoolsSVG${seed.base(particleCount, 16)}`;
    return `
    <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" fill="none" id="${svgId}">
      <defs>
        <!-- Start styling -->
        <style>
          /* start root styling */
          svg#${svgId} {
            /* start constants */
            --particletoolsconstants-pi: 3.141592653589793;
            --particletoolsconstants-2pi: 6.283185307179586;
            /* end constants */
          }
          /* end root styling */
          /* start all animations */
          /* all keyframes for emptyAnimation */
          @keyframesparticletoolsEmptyAnimation {}
          /* firefox */
          @-moz-keyframesparticletoolsEmptyAnimation {}
          /* IE8 */
          @-ms-keyframesparticletoolsEmptyAnimation {}
          /* safari */
          @-webkit-keyframesparticletoolsEmptyAnimation {}
          /* opera */
          @-o-keyframesparticletoolsEmptyAnimation {}
          /* end keyframes */
          ${cssAnimations}
          /* end all animations */
          /* start base styling */
          circle.particletools-particle {
            cx: ${0 - Math.PI * 3};
            cy: ${0 - Math.PI * 3};
            fill: #1b62d4ff;
            stroke: #1857bcff;
            stroke-width: 0px;
            /* start animation properties */
            ${generateAnimation.writeAnimationProps(`
              animation-name: particletoolsEmptyAnimation;
              animation-duration: ${animationSpeed};
              animation-iteration-count: infinite;
              animation-direction: alternate;
              animation-timing-function: ease-in-out;
              animation-fill-mode: both;
            `)}
            /* end animation properties */
          }
          circle.particletools-particle.particletools-small {
            r: var(--particletoolsconstants-pi);
          }
          circle.particletools-particle.particletools-large {
            r: var(--particletoolsconstants-2pi);
          }
          g.particletools-particles {
            /* start clip path */
            clip-path: url(#particletools-particlesMask);
            /* firefox */
            -moz-clip-path: url(#particletools-particlesMask);
            /* IE8 */
            -ms-clip-path: url(#particletools-particlesMask);
            /* safari */
            -webkit-clip-path: url(#particletools-particlesMask);
            /* end clip path */
            box-sizing: box;
          }
          g.particletools-particles > path {
            fill: #4C97FF;
            stroke: #3d79ccff;
            stroke-width: 1px;
          }
          g.particletools-blocklyDraggable {
            cursor: grab;
            /* firefox */
            cursor: -moz-grab;
            /* IE8 */
            cursor: -ms-grab;
            /* safari */
            cursor: -webkit-grab;
          }
          path.particletools-blocklyTextPath {
            stroke: #4a8eabff;
            stroke-width: 1px;
            fill: #FFFFFF;
            fill-opacity: 1;
          }
          g.particletools-blocklyEditableText {
            transform: translate(8, 0);
            cursor: text;
            /* firefox */
            cursor: -moz-text;
            /* IE8 */
            cursor: -ms-text;
            /* safari */
            cursor: -webkit-text;
          }
          g.particletools-blocklyEditableText > text {
            user-select: none;
            cursor: inherit;
            /* firefox */
            -moz-user-select: none;
            cursor: -moz-inherit;
            /* IE8 */
            -ms-user-select: none;
            cursor: -ms-inherit;
            /* safari */
            -webkit-user-select: none;
            cursor: -webkit-inerit;
            fill: #575e75;
          }
          /* end base styling */
          /* start particles */
          ${particlesCss}
          /* end particles */
        </style>
        <!-- End styling -->
        <!-- Start clip path -->
        <clipPath id="particletools-particlesMask">
          ${finalClipPath}
        </clipPath>
        <!-- End clip path -->
      </defs>
      <!-- Particles container -->
      <g class="particletools-particles particletools-blocklyDraggable">
        <!-- Background -->
        ${finalClipPath}
        <!-- Particles -->
        ${svgParticles}
        <!-- Other cool stuff for the block -->
        <g transform="translate(48,8)">
          <path class="particletools-blocklyTextPath" d="m 0,0 m 16,0 H ${
            width - 76.25102996826172
          } a 16 16 0 0 1 0 32 H 16 a 16 16 0 0 1 0 -32 z"></path>
          <g class="particletools-blocklyEditableText">
            <text class="blocklyText" x="16.25102996826172" y="18" dominant-baseline="middle" dy="0" text-anchor="left">
              >:3
            </text>
          </g>
        </g>
      </g>
    </svg>
    `;
  };
  generateAnimation.writeAnimationProps = (props) => {
    return `
      ${props}
      /* firefox */
      ${props.replaceAll("animation-", "-moz-animation-")}
      /* IE8 */
      ${props.replaceAll("animation-", "-ms-animation-")}
      /* safari */
      ${props.replaceAll("animation-", "-webkit-animation-")}
      /* opera */
      ${props.replaceAll("animation-", "-o-animation-")}
    `;
  };
  generateAnimation.defaultPositionAlgorithm = (rng, width, height, id) => ({
    sx:
      Math.round(rng.float() * width) +
      Math.round(rng.float() * width - width / 2),
    sy:
      Math.round(rng.float() * height) +
      Math.round(rng.float() * height - height / 2),
    ex: Math.round(rng.float() * (width * 2)),
    ey: Math.round(rng.float() * (height * 2))
  });
  generateAnimation.randomInt = function (limit) {
    return (typeof limit === "bigint" ? BigInt : Number)(
      crypto.getRandomValues(new BigUint64Array(1))[0] % BigInt(limit)
    );
  };
  generateAnimation.randomFloat = function () {
    return parseFloat(
      `0.${String(crypto.getRandomValues(new BigUint64Array(1))[0]).slice(
        0,
        16
      )}`
    );
  };
  generateAnimation.RNG =
    ((_state = /*#__PURE__*/ _classPrivateFieldLooseKey("state")),
    (_RNG = class RNG {
      constructor(seed) {
        Object.defineProperty(this, _state, {
          writable: true,
          value: 0
        });
        _classPrivateFieldLooseBase(this, _state)[_state] =
          seed !== null && seed !== void 0
            ? seed
            : Math.floor(generateAnimation.randomFloat() * (this.m - 1));
        this.startSeed = _classPrivateFieldLooseBase(this, _state)[_state];
      }
      int() {
        return (_classPrivateFieldLooseBase(this, _state)[_state] =
          (RNG.a * _classPrivateFieldLooseBase(this, _state)[_state] + RNG.c) %
          RNG.m);
      }
      float() {
        return this.int() / (RNG.m - 1);
      }
      range(start, end) {
        return start + Math.floor((this.int() / RNG.m) * (end - start));
      }
      choice(arr) {
        return arr[this.range(0, arr.length)];
      }
      base(rOff, base) {
        return (rOff + Math.round(this.float() * this.range(0, this.int())))
          .toString(base)
          .toLowerCase();
      }
    }),
    (_RNG.m = 0x80000000),
    (_RNG.a = 1103515245),
    (_RNG.c = 12345),
    _RNG);
  if (window.ParticleTools_onLibraryLoad)
    window.ParticleTools_onLibraryLoad(generateAnimation);
  return generateAnimation;
})();
// ]]>
