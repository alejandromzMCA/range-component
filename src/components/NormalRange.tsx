import { useEffect, useRef, useState } from "react";

const NormalRange = (): JSX.Element => {
    const [updating, setUpdating] = useState(false);
    const [dragging, setDragging] = useState(false);
    const [minValue, setMinValue] = useState(0);
    const [maxValue, setMaxValue] = useState(100);
    const marginLeft = 18;
    const marginRight = marginLeft + 27.5;
    const minX = useRef(marginLeft);
    const maxX = useRef(marginRight);
    const rangeWrapperRef = useRef<HTMLDivElement | null>(null);
    const x = useRef(marginLeft);

    const updateX = (newX: number) => {
        if (x.current !== newX) {
            x.current = newX;
            if (!updating) {
                setUpdating(true);
                setTimeout(() => setUpdating(false), 100)
            }
        }
    }

    useEffect(() => {
        const updateLimits = () => {
            if (rangeWrapperRef.current) {
                const rect = rangeWrapperRef.current.getBoundingClientRect();
                maxX.current = rect.right - marginRight;
                updateX(Math.max(Math.min(x.current, maxX.current), minX.current));
            }
        }
        updateLimits();
        window.addEventListener('resize', updateLimits);
        () => {
            window.removeEventListener('resize', updateLimits)
        }
    }, [])

    const handleMouseDown = () => {
        setDragging(true);
    }

    const handleMouseUp = () => {
        setDragging(false);
    }

    const handleMouseMove = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        event.preventDefault();
        event.stopPropagation();
        const newX = event.clientX - 18;
        if (dragging && x.current !== newX) {
            updateX(Math.max(Math.min(newX, maxX.current), minX.current));
        }
    }

    return <div ref={rangeWrapperRef} onMouseUp={handleMouseUp} onMouseMove={handleMouseMove} onMouseLeave={handleMouseUp} className="rangeWrapper" style={{ cursor: dragging ? "grabbing" : undefined }}>
        <div style={{ display: 'flex', flexDirection: 'column', position: 'relative' }}>
            <div className="rangeLimit" />
            <input type="text" value={minValue} onChange={(ev) => setMinValue(Number.parseInt(ev.currentTarget.value))} style={{ position: 'absolute', border: '0px', borderRadius: '5px', bottom: '-23px', left: '-20px', width: '40px' }} />
        </div>
        <div className="rangeLine" />
        <div style={{ display: 'flex', flexDirection: 'column', position: 'relative' }}>
            <div className="rangeLimit" />
            <input type="text" value={maxValue} onChange={(ev) => setMaxValue(Number.parseInt(ev.currentTarget.value))} style={{ position: 'absolute', border: '0px', borderRadius: '5px', bottom: '-23px', left: '-20px', width: '40px' }} />
        </div>
        <div onMouseDown={handleMouseDown} className="rangeDot" style={{ left: x.current, cursor: dragging ? "grabbing" : "grab" }} />
    </div>
}

export default NormalRange;