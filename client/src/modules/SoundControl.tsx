// import { createAction } from 'redux-actions';

const initialState = {
  playHitSound: function() {
    if((document.querySelector('.hitSound') as any).paused) {
      (document.querySelector('.hitSound') as any).play()
    } else {
      (document.querySelector('.hitSound') as any).pause()
      (document.querySelector('.hitSound') as any).currentTime = 0
    }
  }
};

export default function SoundControl(state: any = initialState, action: any) {
  switch (action.type) {
    default:
      return state;
  }
}
