/**
 * Noise Generator - Perlin/Simplex Noise
 * 
 * This is a clean implementation of Perlin noise used for
 * creating organic, natural-looking wave animations.
 * 
 * Why Perlin Noise?
 * - Creates smooth, continuous random values
 * - Adjacent values are related (unlike pure random)
 * - Perfect for natural-looking motion and textures
 */

class Noise {
  constructor(seed = Math.random()) {
    this.grad3 = [
      [1,1,0],[-1,1,0],[1,-1,0],[-1,-1,0],
      [1,0,1],[-1,0,1],[1,0,-1],[-1,0,-1],
      [0,1,1],[0,-1,1],[0,1,-1],[0,-1,-1]
    ];
    
    this.p = [];
    for (let i = 0; i < 256; i++) {
      this.p[i] = Math.floor(seed * 256);
      seed = (seed * 16807) % 2147483647;
      seed = seed / 2147483647;
    }
    
    // Shuffle using seed
    for (let i = 255; i > 0; i--) {
      seed = (seed * 16807) % 2147483647;
      const j = Math.floor((seed / 2147483647) * (i + 1));
      [this.p[i], this.p[j]] = [this.p[j], this.p[i]];
    }
    
    // Double the permutation table
    this.perm = new Array(512);
    this.permMod12 = new Array(512);
    for (let i = 0; i < 512; i++) {
      this.perm[i] = this.p[i & 255];
      this.permMod12[i] = this.perm[i] % 12;
    }
  }

  /**
   * Dot product of gradient and distance vectors
   */
  dot(g, x, y) {
    return g[0] * x + g[1] * y;
  }

  /**
   * 2D Perlin Noise
   * Returns a value between -1 and 1
   */
  perlin2(x, y) {
    // Find unit grid cell containing point
    let X = Math.floor(x) & 255;
    let Y = Math.floor(y) & 255;
    
    // Get relative xy coordinates of point within cell
    x -= Math.floor(x);
    y -= Math.floor(y);
    
    // Compute fade curves for each coordinate
    const u = this.fade(x);
    const v = this.fade(y);
    
    // Hash coordinates of the 4 corners
    const A = this.perm[X] + Y;
    const B = this.perm[X + 1] + Y;
    
    // Blend results from 4 corners
    return this.lerp(
      v,
      this.lerp(
        u,
        this.dot(this.grad3[this.permMod12[A]], x, y),
        this.dot(this.grad3[this.permMod12[B]], x - 1, y)
      ),
      this.lerp(
        u,
        this.dot(this.grad3[this.permMod12[A + 1]], x, y - 1),
        this.dot(this.grad3[this.permMod12[B + 1]], x - 1, y - 1)
      )
    );
  }

  /**
   * Fade function for smooth interpolation
   * 6t^5 - 15t^4 + 10t^3 (improved Perlin)
   */
  fade(t) {
    return t * t * t * (t * (t * 6 - 15) + 10);
  }

  /**
   * Linear interpolation
   */
  lerp(t, a, b) {
    return a + t * (b - a);
  }
}

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = Noise;
}
