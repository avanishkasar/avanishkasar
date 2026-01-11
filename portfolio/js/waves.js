/**
 * AWaves - Interactive Wave Animation Component
 * 
 * A custom Web Component that creates an organic, flowing wave background
 * inspired by wodniack.dev. Uses Perlin noise for natural motion and
 * responds to mouse/touch interactions.
 * 
 * Design Philosophy:
 * - Subtle, ambient motion that doesn't distract
 * - Responsive to user interaction (mouse influence)
 * - Performance-optimized using requestAnimationFrame
 * - Scales gracefully across screen sizes
 * 
 * Color: Neon Cyan (#00f0ff) on dark background
 */

class AWaves extends HTMLElement {
  /**
   * Initialize when element is connected to DOM
   */
  connectedCallback() {
    // Get the SVG element
    this.svg = this.querySelector('.js-svg');
    if (!this.svg) return;

    // Mouse state tracking
    this.mouse = {
      x: -10,           // Current X position
      y: 0,             // Current Y position
      lx: 0,            // Last X position
      ly: 0,            // Last Y position
      sx: 0,            // Smoothed X position
      sy: 0,            // Smoothed Y position
      v: 0,             // Velocity
      vs: 0,            // Smoothed velocity
      a: 0,             // Angle of movement
      set: false,       // Has mouse been set
    };

    // Arrays to hold line data
    this.lines = [];
    this.paths = [];
    
    // Create noise generator for organic motion
    this.noise = new Noise(Math.random());
    
    // Animation state
    this.isVisible = true;
    this.animationFrame = null;

    // Initialize
    this.setSize();
    this.setLines();
    this.bindEvents();
    
    // Start the animation loop
    this.tick(0);
  }

  /**
   * Cleanup when element is removed
   */
  disconnectedCallback() {
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);
    }
    window.removeEventListener('resize', this.onResize);
    window.removeEventListener('mousemove', this.onMouseMove);
    this.removeEventListener('touchmove', this.onTouchMove);
  }

  /**
   * Bind all event listeners
   */
  bindEvents() {
    // Bind methods to preserve context
    this.onResize = this.onResize.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onTouchMove = this.onTouchMove.bind(this);
    
    window.addEventListener('resize', this.onResize);
    window.addEventListener('mousemove', this.onMouseMove);
    this.addEventListener('touchmove', this.onTouchMove, { passive: false });
    
    // Visibility API for performance
    document.addEventListener('visibilitychange', () => {
      this.isVisible = !document.hidden;
    });
  }

  /**
   * Handle window resize
   */
  onResize() {
    this.setSize();
    this.setLines();
  }

  /**
   * Handle mouse movement
   */
  onMouseMove(e) {
    this.updateMousePosition(e.pageX, e.pageY);
  }

  /**
   * Handle touch movement
   */
  onTouchMove(e) {
    e.preventDefault();
    const touch = e.touches[0];
    this.updateMousePosition(touch.clientX, touch.clientY);
  }

  /**
   * Update internal mouse position
   */
  updateMousePosition(x, y) {
    const { mouse } = this;

    mouse.x = x - this.bounding.left;
    mouse.y = y - this.bounding.top + window.scrollY;

    // Initialize smoothed position on first movement
    if (!mouse.set) {
      mouse.sx = mouse.x;
      mouse.sy = mouse.y;
      mouse.lx = mouse.x;
      mouse.ly = mouse.y;
      mouse.set = true;
    }
  }

  /**
   * Set SVG dimensions to match container
   */
  setSize() {
    this.bounding = this.getBoundingClientRect();
    this.svg.style.width = `${this.bounding.width}px`;
    this.svg.style.height = `${this.bounding.height}px`;
  }

  /**
   * Generate the grid of points and create SVG paths
   */
  setLines() {
    const { width, height } = this.bounding;
    
    // Clear existing data
    this.lines = [];
    this.paths.forEach((path) => path.remove());
    this.paths = [];

    // Grid configuration
    // xGap: horizontal spacing between lines
    // yGap: vertical spacing between points on each line
    const xGap = 12;  // Slightly wider for performance
    const yGap = 36;  // Taller gaps for smoother appearance

    // Add padding to ensure lines extend beyond viewport
    const oWidth = width + 200;
    const oHeight = height + 60;

    // Calculate grid dimensions
    const totalLines = Math.ceil(oWidth / xGap);
    const totalPoints = Math.ceil(oHeight / yGap);

    // Center the grid
    const xStart = (width - xGap * totalLines) / 2;
    const yStart = (height - yGap * totalPoints) / 2;

    // Generate lines and points
    for (let i = 0; i <= totalLines; i++) {
      const points = [];

      for (let j = 0; j <= totalPoints; j++) {
        const point = {
          x: xStart + xGap * i,
          y: yStart + yGap * j,
          wave: { x: 0, y: 0 },          // Perlin noise offset
          cursor: { x: 0, y: 0, vx: 0, vy: 0 },  // Mouse influence
        };

        points.push(point);
      }

      // Create SVG path element for this line
      const path = document.createElementNS(
        'http://www.w3.org/2000/svg',
        'path'
      );
      path.classList.add('a__line');
      path.classList.add('js-line');

      this.svg.appendChild(path);
      this.paths.push(path);
      this.lines.push(points);
    }
  }

  /**
   * Update point positions based on noise and mouse
   */
  movePoints(time) {
    const { lines, mouse, noise } = this;

    lines.forEach((points) => {
      points.forEach((p) => {
        // === WAVE MOVEMENT ===
        // Use Perlin noise for organic, flowing motion
        // The multipliers control the speed and scale of the noise
        const noiseValue = noise.perlin2(
          (p.x + time * 0.015) * 0.002,   // X-axis noise, slow horizontal drift
          (p.y + time * 0.008) * 0.002    // Y-axis noise, slower vertical drift
        ) * 12;  // Amplitude of the wave

        // Convert noise to circular motion
        p.wave.x = Math.cos(noiseValue) * 28;  // Horizontal displacement
        p.wave.y = Math.sin(noiseValue) * 14;  // Vertical displacement

        // === MOUSE INFLUENCE ===
        // Calculate distance from mouse to point
        const dx = p.x - mouse.sx;
        const dy = p.y - mouse.sy;
        const d = Math.hypot(dx, dy);
        
        // Influence radius scales with mouse velocity
        const l = Math.max(175, mouse.vs);

        if (d < l) {
          // Point is within influence radius
          const s = 1 - d / l;  // Strength (1 at center, 0 at edge)
          const f = Math.cos(d * 0.001) * s;  // Falloff with cosine smoothing

          // Add velocity based on mouse direction and speed
          p.cursor.vx += Math.cos(mouse.a) * f * l * mouse.vs * 0.0006;
          p.cursor.vy += Math.sin(mouse.a) * f * l * mouse.vs * 0.0006;
        }

        // === PHYSICS SIMULATION ===
        // Spring tension - pull back to origin
        p.cursor.vx += (0 - p.cursor.x) * 0.004;
        p.cursor.vy += (0 - p.cursor.y) * 0.004;

        // Friction - gradually slow down
        p.cursor.vx *= 0.92;
        p.cursor.vy *= 0.92;

        // Apply velocity
        p.cursor.x += p.cursor.vx * 2;
        p.cursor.y += p.cursor.vy * 2;

        // Clamp to prevent extreme values
        p.cursor.x = Math.min(80, Math.max(-80, p.cursor.x));
        p.cursor.y = Math.min(80, Math.max(-80, p.cursor.y));
      });
    });
  }

  /**
   * Calculate final point position with all effects applied
   */
  moved(point, withCursorForce = true) {
    const coords = {
      x: point.x + point.wave.x + (withCursorForce ? point.cursor.x : 0),
      y: point.y + point.wave.y + (withCursorForce ? point.cursor.y : 0),
    };

    // Round for performance (fewer decimal places = faster path parsing)
    coords.x = Math.round(coords.x * 10) / 10;
    coords.y = Math.round(coords.y * 10) / 10;

    return coords;
  }

  /**
   * Generate SVG path strings and update DOM
   */
  drawLines() {
    const { lines, paths } = this;
    
    lines.forEach((points, lIndex) => {
      let p1 = this.moved(points[0], false);
      
      // Start path at first point
      let d = `M ${p1.x} ${p1.y}`;

      // Draw line through all points
      points.forEach((point, pIndex) => {
        const isLast = pIndex === points.length - 1;
        
        // Get moved position (no cursor effect on last point for smooth ending)
        p1 = this.moved(point, !isLast);
        
        // Simple line segments (L command)
        // Could use Q (quadratic curves) for smoother lines but lower performance
        d += `L ${p1.x} ${p1.y}`;
      });

      // Update the path element
      paths[lIndex].setAttribute('d', d);
    });
  }

  /**
   * Main animation loop
   */
  tick(time) {
    // Skip animation when page is hidden (performance)
    if (!this.isVisible) {
      this.animationFrame = requestAnimationFrame(this.tick.bind(this));
      return;
    }

    const { mouse } = this;

    // === SMOOTH MOUSE TRACKING ===
    // Lerp towards actual mouse position for smooth following
    mouse.sx += (mouse.x - mouse.sx) * 0.08;
    mouse.sy += (mouse.y - mouse.sy) * 0.08;

    // === CALCULATE VELOCITY ===
    const dx = mouse.x - mouse.lx;
    const dy = mouse.y - mouse.ly;
    const d = Math.hypot(dx, dy);

    mouse.v = d;
    mouse.vs += (d - mouse.vs) * 0.1;
    mouse.vs = Math.min(100, mouse.vs);  // Cap velocity

    // Update last position
    mouse.lx = mouse.x;
    mouse.ly = mouse.y;

    // Calculate movement angle
    mouse.a = Math.atan2(dy, dx);

    // === UPDATE CSS CUSTOM PROPERTIES ===
    // These can be used for the cursor dot position
    this.style.setProperty('--x', `${mouse.sx}px`);
    this.style.setProperty('--y', `${mouse.sy}px`);

    // === ANIMATE ===
    this.movePoints(time);
    this.drawLines();
    
    // Continue the loop
    this.animationFrame = requestAnimationFrame(this.tick.bind(this));
  }
}

// Register the custom element
customElements.define('a-waves', AWaves);
