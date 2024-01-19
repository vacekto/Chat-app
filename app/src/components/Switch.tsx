import './Switch.scss'
import { useEffect, useState } from 'react'


export interface ISwitchProps {
  cb?: (activeSide: 'left' | 'right') => void
  state?: 'left' | 'right'
}

const Switch: React.FC<ISwitchProps> = ({ cb, state }) => {
  const [activeSide, setActiveSide] = useState<'left' | 'right'>(state ? state : 'left')

  const toggleActiveSide = () => {
    setActiveSide(prevState => prevState === 'left' ? 'right' : 'left')
  }

  const cssClass = activeSide === 'left' ? '' : 'right'

  useEffect(() => {
    if (cb) cb(activeSide)
  }, [activeSide])

  if (state) useEffect(() => {
    setActiveSide(state)
  }, [state])


  return (
    <div className='Switch' onClick={toggleActiveSide}  >
      <div className={cssClass} />
    </div>
  );
}
export default Switch