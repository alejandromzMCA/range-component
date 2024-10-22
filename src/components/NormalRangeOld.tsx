import React, { type ChangeEvent, useEffect, useReducer, useRef, useState } from "react";

const NormalRangeOld = ({ minDefault, maxDefault, onValuesChange }: { minDefault: number; maxDefault: number, onValuesChange?: (leftValue: number, rightValue: number) => void }): JSX.Element => {
    const [updating, setUpdating] = useState(false);
    const [draggingLeft, setDraggingLeft] = useState(false);
    const [draggingRight, setDraggingRight] = useState(false);
    const [minValue, setMinValue] = useState(minDefault);
    const [maxValue, setMaxValue] = useState(maxDefault);
    const marginLeft = 16;
    const marginRight = 18;
    const minX = useRef(marginLeft);
    const maxX = useRef(marginRight);
    const lineRef = useRef<HTMLDivElement | null>(null);
    const leftX = useRef(marginLeft);
    const rightX = useRef(marginRight);

    const updateX = ({ newLeftX, newRightX }: { newLeftX?: number; newRightX?: number }) => {
        let update = false;
        if (newLeftX && leftX.current !== newLeftX) {
            leftX.current = newLeftX;
            update = !updating;
        }
        if (newRightX && rightX.current !== newRightX) {
            rightX.current = newRightX;
            update = !updating;
        }
        if (update) {
            setUpdating(true);
            setTimeout(() => setUpdating(false), 20)
        }
    }

    const getNewX = (x: number, oldMinX: number, oldMaxX: number) => ((x - oldMinX) / (oldMaxX - oldMinX)) * (maxX.current - minX.current) + minX.current;
    useEffect(() => {
        const updateLimits = () => {
            if (lineRef.current) {
                const rect = lineRef.current.getBoundingClientRect();
                const oldMinX = minX.current;
                minX.current = rect.left - marginLeft;
                const oldMaxX = maxX.current;
                maxX.current = rect.right - marginRight;
                const newLeftX = getNewX(leftX.current, oldMinX, oldMaxX);
                const newRightX = getNewX(rightX.current, oldMinX, oldMaxX);
                updateX({
                    newLeftX: (isFinite(newLeftX) && newLeftX !== newRightX) ? newLeftX : Math.max(Math.min(leftX.current, rightX.current - 10), minX.current),
                    newRightX: (isFinite(newRightX) && newRightX !== newLeftX) ? newRightX : Math.max(Math.min(rightX.current, maxX.current), leftX.current + 10),
                });
            }
        }
        updateLimits();
        window.addEventListener('resize', updateLimits);
        () => {
            window.removeEventListener('resize', updateLimits)
        }
    }, [])

    const getValue = (x: number) => ((x - minX.current) / (maxX.current - minX.current)) * (maxValue - minValue) + minValue;
    useEffect(() => {
        if (!!onValuesChange && !updating) {
            onValuesChange(parseFloat(getValue(leftX.current).toFixed(2)), parseFloat(getValue(rightX.current).toFixed(2)));
        }
    }, [minValue, maxValue, updating])

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
        if (draggingLeft && leftX.current !== newX) {
            updateX({ newLeftX: Math.max(Math.min(newX, rightX.current - 10), minX.current) });
        }
        if (draggingRight && rightX.current !== newX) {
            updateX({ newRightX: Math.max(Math.min(newX, maxX.current), leftX.current + 10) });
        }
    }

    const handleMinLimitChange = (event: ChangeEvent<HTMLInputElement>) => {
        const newValue = parseFloat(event.currentTarget?.value);
        if (newValue && newValue < maxValue) {
            setMinValue(() => newValue);
        }
    }

    const handleMaxLimitChange = (event: ChangeEvent<HTMLInputElement>) => {
        const newValue = Number.parseFloat(event.currentTarget?.value);
        if (newValue && newValue > minValue) {
            setMaxValue(() => newValue);
        }
    }

    const dragging = draggingLeft || draggingRight;
    return <div onMouseUp={handleMouseUp} onMouseMove={handleMouseMove} onMouseLeave={handleMouseUp} className="rangeWrapper" style={{ cursor: dragging ? "grabbing" : undefined }}>
        <input type="text" title="Range min limit" value={minValue} onChange={handleMinLimitChange} className="rangeLimitInput" />
        <span className="rangeLimitLabel">€</span>
        <div ref={lineRef} className="rangeLine" />
        <input type="text" title="Range max limit" value={maxValue} onChange={handleMaxLimitChange} className="rangeLimitInput" />
        <span className="rangeLimitLabel" >€</span>
        <div role="slider" onMouseDown={handleMouseDownLeft} title="Left drag handle" className="rangeDot" style={{ left: leftX.current, cursor: dragging ? "grabbing" : "grab" }} />
        <div role="slider" onMouseDown={handleMouseDownRight} title="Right drag handle" className="rangeDot" style={{ left: rightX.current, cursor: dragging ? "grabbing" : "grab" }} />
    </div>
}

export default NormalRangeOld;