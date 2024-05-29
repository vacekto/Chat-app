import { ReactNode } from 'react';
import './BorderContainer.scss';

interface IBorderContainerProps {
    children?: ReactNode
    title?: string
    titleSize?: 15 | 20 | 25
}

/**
 * needs its parent to have position relative and target .BorderContainer CSS class
 */

const BorderContainer: React.FC<IBorderContainerProps> = ({ children, title, titleSize = 20 }) => {

    return <div className="BorderContainer">
        {title ? <div className="title">
            <span
                style={{ fontSize: `${titleSize}px` }}
            >{title}</span>
        </div> : null}
        {children}
    </div>
}

export default BorderContainer