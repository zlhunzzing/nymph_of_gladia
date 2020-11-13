// import { createAction } from 'redux-actions';

const initialState = {
  playMoveSound: function() {
    if((document.querySelector('.moveSound') as any).paused) {
      (document.querySelector('.moveSound') as any).play()
    } else {
      (document.querySelector('.moveSound') as any).pause()
      (document.querySelector('.moveSound') as any).currentTime = 0
    }
  },
  playManaUpSound: function() {
    if((document.querySelector('.manaUpSound') as any).paused) {
      (document.querySelector('.manaUpSound') as any).play()
    } else {
      (document.querySelector('.manaUpSound') as any).pause()
      (document.querySelector('.manaUpSound') as any).currentTime = 0
    }
  },
  playHitSound: function() {
    if((document.querySelector('.hitSound') as any).paused) {
      (document.querySelector('.hitSound') as any).play()
    } else {
      (document.querySelector('.hitSound') as any).pause()
      (document.querySelector('.hitSound') as any).currentTime = 0
    }
  },
  playGuardSound: function() {
    if((document.querySelector('.guardSound') as any).paused) {
      (document.querySelector('.guardSound') as any).play()
    } else {
      (document.querySelector('.guardSound') as any).pause()
      (document.querySelector('.guardSound') as any).currentTime = 0
    }
  },
  playWinSound: function() {
    if((document.querySelector('.winSound') as any).paused) {
      (document.querySelector('.winSound') as any).play()
    } else {
      (document.querySelector('.winSound') as any).pause()
      (document.querySelector('.winSound') as any).currentTime = 0
    }
  },
  playLoseSound: function() {
    if((document.querySelector('.loseSound') as any).paused) {
      (document.querySelector('.loseSound') as any).play()
    } else {
      (document.querySelector('.loseSound') as any).pause()
      (document.querySelector('.loseSound') as any).currentTime = 0
    }
  },
  playDrawSound: function() {
    if((document.querySelector('.drawSound') as any).paused) {
      (document.querySelector('.drawSound') as any).play()
    } else {
      (document.querySelector('.drawSound') as any).pause()
      (document.querySelector('.drawSound') as any).currentTime = 0
    }
  },
};

export default function SoundControl(state: any = initialState, action: any) {
  switch (action.type) {
    default:
      return state;
  }
}
