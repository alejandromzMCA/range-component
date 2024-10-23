import { useState, type MouseEvent, useRef, useEffect } from "react";

import styles from "./range.module.css";
import Slider from "../slider/slider";
import { type RangeValue, type RangeProps, RangeModeEnum } from "@/models/range";
import { getNearestNumber, getPercent, getValue } from "@/utils/range";

const Range: React.FC<RangeProps> = ({ max, min, mode, pointsValue }) => {
    const lineRef = useRef<HTMLDivElement | null>(null);

    const [{ left, right }, setValue] = useState<RangeValue>({ left: 0, right: 100 });
    const leftValue = getValue(max, min, left);
    const rightValue = getValue(max, min, right);
    const [draggingLeft, setDraggingLeft] = useState(false);
    const [draggingRight, setDraggingRight] = useState(false);
    const dragging = draggingLeft || draggingRight;

    const [points, setPoints] = useState<number[]>();

    useEffect(() => {
        if (mode === RangeModeEnum.Fixed) {
            const clearPoints = Array.from(new Set(pointsValue.filter(point => point < max && point > min))).sort((a, b) => a - b);
            const newPoints = [0, ...clearPoints.map((point) => getPercent(max, min, point)), 100];
            setPoints(newPoints);
            setValue(({ left: oldLeft, right: oldRight }) => {
                const newLeft = getNearestNumber(oldLeft, newPoints.slice(0, newPoints.indexOf(oldRight)));
                return {
                    left: newLeft,
                    right: getNearestNumber(oldRight, newPoints.slice(newPoints.indexOf(newLeft) + 1))
                }
            });
        }
    }, [max, min, mode, pointsValue])

    const handleMouseDownLeft = () => {
        setDraggingLeft(true);
    }
    const handleMouseDownRight = () => {
        setDraggingRight(true);
    }

    const handleMouseUp = () => {
        if (points?.length) {
            if (draggingLeft) {
                setValue((oldValue) => ({ ...oldValue, left: getNearestNumber(left, points.slice(0, points.indexOf(right))) }));
            }
            if (draggingRight) {
                setValue((oldValue) => ({ ...oldValue, right: getNearestNumber(right, points.slice(points.indexOf(left) + 1)) }));
            }
        }
        setDraggingLeft(false);
        setDraggingRight(false);
    }

    const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
        event.preventDefault();
        event.stopPropagation();
        if (lineRef.current) {
            const { left: minX, right: maxX } = lineRef.current.getBoundingClientRect();
            const x = event.clientX;
            const newValue = getPercent(maxX, minX, x)
            if (draggingLeft) {
                setValue((oldValue) => ({ ...oldValue, left: Math.min(newValue, right) }));
            }
            if (draggingRight) {
                setValue((oldValue) => ({ ...oldValue, right: Math.max(newValue, left) }));
            }
        }
    }

    const renderPoints = (): JSX.Element[] => {
        const elements: JSX.Element[] = [];
        const pointsLength = points?.length;
        if (pointsLength) {
            for (let index = 0; index < pointsLength; index++) {
                const point = points[index];
                elements.push(<div key={`point-${point}`} className={styles.point} style={{ left: `${point}%` }} />);
            }
        } else {
            elements.push(<div key="start-point" className={`${styles.point} ${styles.startPoint}`} />);
            elements.push(<div key="end-point" className={`${styles.point} ${styles.endPoint}`} />);
        }
        return elements;
    };

    return <div
        className={styles.wrapper}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        style={{ cursor: dragging ? "grabbing" : undefined }} >
        <div className={styles.content}>
            <div className={styles.line} ref={lineRef} />
            {renderPoints()}
            <Slider max={rightValue} min={min} value={leftValue} leftPercent={left} dragging={dragging} onMouseDown={handleMouseDownLeft} />
            <Slider max={max} min={leftValue} value={rightValue} leftPercent={right} dragging={dragging} onMouseDown={handleMouseDownRight} />
        </div>
    </div>
};

export default Range;