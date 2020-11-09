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
  }
};

export default function SoundControl(state: any = initialState, action: any) {
  switch (action.type) {
    default:
      return state;
  }
}
