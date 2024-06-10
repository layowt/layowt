import BaseComponent from './base-component';
import { TypeIcon } from 'lucide-react';

export default function Text(){
  return (
    <BaseComponent name="text">
      <TypeIcon className='size-8' />
      <span>
        Text
      </span>
    </BaseComponent>
  )
}