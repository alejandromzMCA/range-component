import React, { useEffect, useRef, useState } from "react";

const FixedValuesRange = ({ rangeLimitsValue: rangeValues, onValuesChange }: { rangeLimitsValue: number[]; onValuesChange?: (leftValue: number, rightValue: number) => void }): JSX.Element => {
    const [update, setUpdate] = useState(false);
    const [draggingLeft, setDraggingLeft] = useState(false);
    const [draggingRight, setDraggingRight] = useState(false);
    const marginLeft = 16;
    const marginRight = 18;
    const dotLimitDeviation = 6;
    const minX = useRef(marginLeft);
    const maxX = useRef(marginRight);
    const lineRef = useRef<HTMLDivElement | null>(null);
    const leftX = useRef(marginLeft);
    const rightX = useRef(marginLeft);
    const rangeLimitsX = useRef<number[]>();
    const rangeLimitsXMap = useRef(new Map<number, number>());
    const maxValue = useRef(rangeValues.at(-1)!);
    const minValue = useRef(rangeValues[0]);

    const updateX = ({ newLeftX, newRightX }: { newLeftX?: number; newRightX?: number }) => {
        const oldLeftX = leftX.current;
        const oldRightX = rightX.current;
        const [fixedLeftX, fixedRightX] = rangeLimitsX.current?.reduce(([prevFixedLeftX, prevFixedRightX], rangeLimit) => {
            let newFixedLeftX = prevFixedLeftX;
            let newFixedRightX = prevFixedRightX;
            if (newLeftX) {
                newFixedLeftX = !newFixedLeftX || Math.abs(rangeLimit - newLeftX) < Math.abs(newFixedLeftX - newLeftX) ? rangeLimit - dotLimitDeviation : newFixedLeftX;
            }
            if (newRightX) {
                newFixedRightX = !newFixedRightX || Math.abs(rangeLimit - newRightX) < Math.abs(newFixedRightX - newRightX) ? rangeLimit - dotLimitDeviation : newFixedRightX;
            }
            return [newFixedLeftX, newFixedRightX]
        }, new Array<number>()) || [];
        if (fixedLeftX && leftX.current !== fixedLeftX) {
            leftX.current = fixedLeftX;
        }
        if (fixedRightX && rightX.current !== fixedRightX) {
            rightX.current = fixedRightX;
        }
        if (rangeLimitsX.current && leftX.current === rightX.current) {
            const rangeIndex = rangeLimitsX.current?.findIndex((e) => e === leftX.current + dotLimitDeviation);
            if (rangeIndex !== undefined && rangeIndex !== -1) {
                if (rangeIndex === 0 || (!newLeftX && rangeIndex < rangeLimitsX.current.length - 1)) {
                    rightX.current = rangeLimitsX.current[rangeIndex + 1]! - dotLimitDeviation;
                } else {
                    leftX.current = rangeLimitsX.current[rangeIndex - 1]! - dotLimitDeviation;
                }
            }
        }
        if (oldLeftX !== leftX.current || oldRightX !== rightX.current) {
            setUpdate((current) => !current);
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
                if (rangeValues.length > 2) {
                    const sortedRangeLimits = rangeValues.sort((a, b) => a - b);
                    rangeLimitsXMap.current = new Map<number, number>();
                    const newRangeLimits = sortedRangeLimits.reduce((allRangeLimits, rangeValue) => {
                        const rangeX = ((rangeValue - minValue.current) / (maxValue.current - minValue.current)) * (maxX.current - minX.current) + minX.current + 8;
                        rangeLimitsXMap.current.set(rangeX, rangeValue);
                        allRangeLimits.push(rangeX);
                        return allRangeLimits;
                    }, new Array<number>());
                    rangeLimitsX.current = newRangeLimits;
                }
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
    }, [rangeValues])

    useEffect(() => {
        if (!!onValuesChange) {
            onValuesChange(rangeLimitsXMap.current.get(leftX.current + dotLimitDeviation)!, rangeLimitsXMap.current.get(rightX.current + dotLimitDeviation)!);
        }
    }, [update])

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
    // console.log({ rangeLimitsX })
    const dragging = draggingLeft || draggingRight;
    return <div onMouseUp={handleMouseUp} onMouseMove={handleMouseMove} onMouseLeave={handleMouseUp} className="rangeWrapper" style={{ cursor: dragging ? "grabbing" : undefined }}>
        <div ref={lineRef} className="rangeLine" />
        {rangeLimitsX.current?.map((rangeLimit) => {
            const rangeValue = rangeLimitsXMap.current.get(rangeLimit);
            return rangeValue ? (
                <div title={`Limit ${rangeValue}`} key={rangeValue} className="rangeLimit" style={{ left: rangeLimit }}>
                    <div className="rangeLimitLine" />
                    <label className="rangeLimitabel">{rangeValue}</label>
                </div>
            ) : null
        }
        )}
        <div role="slider" onMouseDown={handleMouseDownLeft} title="Left drag handle" className="rangeDot" style={{ left: leftX.current, transitionDuration: dragging ? '500ms' : '0ms', cursor: dragging ? "grabbing" : "grab" }} />
        <div role="slider" onMouseDown={handleMouseDownRight} title="Right drag handle" className="rangeDot" style={{ left: rightX.current, transitionDuration: dragging ? '500ms' : '0ms', cursor: dragging ? "grabbing" : "grab" }} />
    </div>
}

export default FixedValuesRange;