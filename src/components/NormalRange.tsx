import { useEffect, useRef, useState } from "react";

const NormalRange = (): JSX.Element => {
    const [updating, setUpdating] = useState(false);
    const [draggingLeft, setDraggingLeft] = useState(false);
    const [draggingRight, setDraggingRight] = useState(false);
    const [minValue, setMinValue] = useState(0);
    const [maxValue, setMaxValue] = useState(100);
    const marginLeft = 16;
    const marginRight = 18;
    const minX = useRef(marginLeft);
    const maxX = useRef(marginRight);
    const lineRef = useRef<HTMLDivElement | null>(null);
    const xLeft = useRef(marginLeft);
    const xRight = useRef(marginLeft);



    const updateX = ({ newLeftX, newRightX }: { newLeftX?: number; newRightX?: number }) => {
        let update = false;
        if (newLeftX && xLeft.current !== newLeftX) {
            xLeft.current = newLeftX;
            update = !updating;
        }
        if (newRightX && xRight.current !== newRightX) {
            xRight.current = newRightX;
            update = !updating;
        }
        if (update) {
            setUpdating(true);
            setTimeout(() => setUpdating(false), 100)
        }
    }

    useEffect(() => {
        const updateLimits = () => {
            if (lineRef.current) {
                const rect = lineRef.current.getBoundingClientRect();
                minX.current = rect.left - marginLeft;
                maxX.current = rect.right - marginRight;
                updateX({ newLeftX: Math.max(Math.min(xLeft.current, xRight.current - 10), minX.current) });
                updateX({ newRightX: Math.max(Math.min(xRight.current, maxX.current), xLeft.current + 10) });
            }
        }
        updateLimits();
        window.addEventListener('resize', updateLimits);
        () => {
            window.removeEventListener('resize', updateLimits)
        }
    }, [])

    const handleMouseDownLeft = () => {
        setDraggingLeft(true);
    }
    const handleMouseDownRight = () => {
        setDraggingRight(true);
    }

    const handleMouseUp = () => {
        setDraggingLeft(false);
        setDraggingRight(false);
    }

    const handleMouseMove = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        event.preventDefault();
        event.stopPropagation();
        const newX = event.clientX - 18;
        if (draggingLeft && xLeft.current !== newX) {
            updateX({ newLeftX: Math.max(Math.min(newX, xRight.current - 10), minX.current) });
        }
        if (draggingRight && xRight.current !== newX) {
            updateX({ newRightX: Math.max(Math.min(newX, maxX.current), xLeft.current + 10) });
        }
    }

    const dragging = draggingLeft || draggingRight;
    return <div onMouseUp={handleMouseUp} onMouseMove={handleMouseMove} onMouseLeave={handleMouseUp} className="rangeWrapper" style={{ cursor: dragging ? "grabbing" : undefined }}>
        <input type="text" title="Range min limit" value={minValue} onChange={(ev) => setMinValue(Number.parseInt(ev.currentTarget.value))} className="rangeLimitInput" />
        <span className="rangeLimitLabel">€</span>
        <div ref={lineRef} className="rangeLine" />
        <input type="text" title="Range max limit" value={maxValue} onChange={(ev) => setMaxValue(Number.parseInt(ev.currentTarget.value))} className="rangeLimitInput" />
        <span className="rangeLimitLabel">€</span>
        <div onMouseDown={handleMouseDownLeft} className="rangeDot" style={{ left: xLeft.current, cursor: dragging ? "grabbing" : "grab" }} />
        <div onMouseDown={handleMouseDownRight} className="rangeDot" style={{ left: xRight.current, cursor: dragging ? "grabbing" : "grab" }} />
    </div>
}

export default NormalRange;