import BaseComponent from './base-component';
import { TextIcon } from 'lucide-react';

export default function Text(){
  return (
    <BaseComponent>
      <TextIcon className='size-10' />
      <span>
        Text
      </span>
    </BaseComponent>
  )
}