import React from 'react';

export default function Sound() {
  return (
    <span>
      {/* <audio className='Sound' src=''></audio> */}
      <audio className='moveSound' src='https://nymph-of-gladia-s3.s3.ap-northeast-2.amazonaws.com/sound_nog/406742__kretopi__steponwood-010.wav'></audio>
      <audio className='manaUpSound' src='https://nymph-of-gladia-s3.s3.ap-northeast-2.amazonaws.com/sound_nog/346116__lulyc__retro-game-heal-sound.wav'></audio>
      <audio className='hitSound' src='https://zlhunzzing.net/wp-content/uploads/2019/12/118513__thefsoundman__punch-02.wav'></audio>
      <audio className='guardSound' src='https://nymph-of-gladia-s3.s3.ap-northeast-2.amazonaws.com/sound_nog/370203__nekoninja__shield-guard.wav'></audio>
      <audio className='winSound' src='https://nymph-of-gladia-s3.s3.ap-northeast-2.amazonaws.com/sound_nog/521949__kastenfrosch__success-jingle.ogg'></audio>
      <audio className='loseSound' src='https://nymph-of-gladia-s3.s3.ap-northeast-2.amazonaws.com/sound_nog/370209__jugraf__fail-down.wav'></audio>
      <audio className='drawSound' src='https://nymph-of-gladia-s3.s3.ap-northeast-2.amazonaws.com/sound_nog/504609__neospica__drawing-knife.wav'></audio>
    </span>
  );
}
