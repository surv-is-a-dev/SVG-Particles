// <![CDATA[
/**!
 * SVG Particles (Site)
 * @author 0znzw https://scratch.mit.edu/users/0znzw/
 * @version 1.0
 * @copyright MIT & LGPLv3 License
 * Do not remove this comment
 */
(() => {
  const generateAnimation = function generateAnimation(
    seed,
    particleCount,
    width, height,
    animationSpeed,
    clipPath
  ) {
    seed = new generateAnimation.RNG(seed);
    animationSpeed = typeof animationSpeed === 'number' ? `${animationSpeed}ms` : animationSpeed;
    const finalClipPath = `<path style="width: ${width}px; height: ${height}px" d="${clipPath}" />`;
    let particlesCss = '', cssAnimations = '', svgParticles = '';
    for (; particleCount > 0; particleCount--) {
      const id = seed.base(particleCount, 16);
      const sizeClass = Math.round(seed.float() + 1) === 2 ? 'particletools-large' : 'particletools-small';
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
        }
        /* end animation class */
      `;
      // todo: Use a better algorithm for this
      const position = {
        sx: Math.round(seed.float() * width) + Math.round(seed.float() * width - (width / 2)),
        sy: Math.round(seed.float() * height) + Math.round(seed.float() * height - (height / 2)),
        ex: Math.round(seed.float() * (width * 2)),
        ey: Math.round(seed.float() * (height * 2)),
      };
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
        from { cx: ${position.sx}; cy: ${position.sy}; }
        to { cx: ${position.ex}; cy: ${position.ey}; }
      }`);
      svgParticles += `<g><circle class="particletools-particle ${sizeClass}" data-particleAnimation="${id}"></circle></g>`;
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
            fill: #1b62d4ff;
            stroke: #1857bcff;
            stroke-width: 0px;
            /* start animation properties */
            ${((props) => {
              return `
                ${props}
                /* firefox */
                ${props.replaceAll('animation-', '-moz-animation-')}
                /* IE8 */
                ${props.replaceAll('animation-', '-ms-animation-')}
                /* safari */
                ${props.replaceAll('animation-', '-webkit-animation-')}
                /* opera */
                ${props.replaceAll('animation-', '-o-animation-')}
              `;
            })(`
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
      <g class="particletools-particles">
        <!-- Background -->
        ${finalClipPath}
        <!-- Particles -->
        ${svgParticles}
      </g>
    </svg>
    `;
  }
  generateAnimation.RNG = class RNG {
    static m = 0x80000000;
    static a = 1103515245;
    static c = 12345;
    #state = 0;
    constructor(seed) {
      this.#state = seed ?? Math.floor(Math.random() * (this.m - 1));
    }
    int() {
      return (this.#state = (RNG.a * this.#state + RNG.c) % RNG.m);
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
      return (rOff + Math.round(this.float() * this.range(0, this.int()))).toString(base).toLowerCase();
    }
  };
  if (window.ParticleTools_onLibraryLoad) window.ParticleTools_onLibraryLoad(generateAnimation);
  return generateAnimation;
})();
// ]]>
