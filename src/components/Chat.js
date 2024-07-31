import React from 'react';
import { HiChatBubbleBottomCenter } from 'react-icons/hi2';

import BoxChat from './BoxChat';

export default function Chat() {
  return (
    <div className='fixed bottom-20 right-4 md:right-20'>
      <BoxChat />
      {/* <HiChatBubbleBottomCenter size={30} /> */}
    </div>
  );
}
