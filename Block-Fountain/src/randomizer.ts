import { Ring } from './ring';


export class RandomFountain {
  // Boolean flags to track the active state of each ring
  ringOneActive: boolean = false;
  ringTwoActive: boolean = false;
  ringThreeActive: boolean = false;
  ringFourActive: boolean = false;

  // Duration of the animation
  animDuration: number;

  // Timers for each ring's animation and the main timer
  timer1: number;
  timer2: number;
  timer3: number;
  timer4: number;
  mainTimer: number;

  // Playing mode (0 for free control, 1 for random mode)
  playingMode: number = 0;

  // Array to hold references to Ring objects
  rings: Ring[];

  constructor(rings: Ring[], animDuration: number) {
    // Initialize class properties
    this.animDuration = animDuration;
    this.timer1 = 0;
    this.timer2 = 0;
    this.timer3 = 0;
    this.timer4 = 0;
    this.mainTimer = 0;
    this.playingMode = 1;
    this.rings = rings;
  }
  update(dt: number) {
    if (this.playingMode === 0) {
      // in free control mode
      return;
    }

    if (this.playingMode === 1) {
      // random mode

      if (this.ringOneActive) {
        this.timer1 -= dt;
        if (this.timer1 < 0) {
          this.ringOneActive = false;
        }
      }
      if (this.ringTwoActive) {
        this.timer2 -= dt;
        if (this.timer2 < 0) {
          this.ringTwoActive = false;
        }
      }
      if (this.ringThreeActive) {
        this.timer3 -= dt;
        if (this.timer3 < 0) {
          this.ringThreeActive = false;
        }
      }

      if (this.ringFourActive) {
        this.timer4 -= dt;
        if (this.timer4 < 0) {
          this.ringFourActive = false;
        }
      }

      this.mainTimer += dt;

      if (this.mainTimer > this.animDuration / 2) {
        const randomIndex = Math.floor(Math.random() * 1500);
        switch (randomIndex) {
          case 1:
            if (this.ringOneActive) break;
            this.rings[0].play1();
            this.ringOneActive = true;
            this.timer1 = this.animDuration;
            this.mainTimer = 0;
            break;

          case 2:
            if (this.ringOneActive) break;
            this.rings[0].play2();
            this.ringOneActive = true;
            this.timer1 = this.animDuration;
            this.mainTimer = 0;
            break;

          case 3:
            if (this.ringOneActive) break;
            this.rings[0].play3();
            this.ringOneActive = true;
            this.timer1 = this.animDuration;
            this.mainTimer = 0;
            break;

          case 4:
            if (this.ringTwoActive) break;
            this.rings[1].play1();
            this.ringTwoActive = true;
            this.timer2 = this.animDuration;
            this.mainTimer = 0;
            break;

          case 5:
            if (this.ringTwoActive) break;
            this.rings[1].play2();
            this.ringTwoActive = true;
            this.timer2 = this.animDuration;
            this.mainTimer = 0;
            break;

          case 6:
            if (this.ringTwoActive) break;
            this.rings[1].play3();
            this.ringTwoActive = true;
            this.timer2 = this.animDuration;
            this.mainTimer = 0;
            break;
          case 7:
            if (this.ringThreeActive) break;
            this.rings[2].play1();
            this.ringThreeActive = true;
            this.timer3 = this.animDuration;
            this.mainTimer = 0;
            break;

          case 8:
            if (this.ringThreeActive) break;
            this.rings[2].play2();
            this.ringThreeActive = true;
            this.timer3 = this.animDuration;
            this.mainTimer = 0;
            break;

          case 9:
            if (this.ringThreeActive) break;
            this.rings[2].play3();
            this.ringThreeActive = true;
            this.timer3 = this.animDuration;
            this.mainTimer = 0;
            break;

          case 10:
            if (this.ringFourActive) break;
            this.rings[3].play1();
            this.ringFourActive = true;
            this.timer4 = this.animDuration;
            this.mainTimer = 0;
            break;

          case 11:
            if (this.ringFourActive) break;
            this.rings[3].play2();
            this.ringFourActive = true;
            this.timer4 = this.animDuration;
            this.mainTimer = 0;
            break;

          case 12:
            if (this.ringFourActive) break;
            this.rings[3].play3();
            this.ringFourActive = true;
            this.timer4 = this.animDuration;
            this.mainTimer = 0;
            break;
        }
      }
    }
  }
}