import './Switch.scss'
import { useEffect, useState } from 'react'


export interface ISwitchProps {
  cb: (active: 'left' | 'right') => void
}

const Switch: React.FC = () => {
  const [active, setActive] = useState<'left' | 'right'>('left')

  useEffect(() => {

  }, [])

  return (
    <div className='Switch'>
      <div>

      </div>
    </div>
  );
}
export default Switch