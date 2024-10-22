import { useReducer, useState, type MouseEvent, type Dispatch, type SetStateAction, useRef } from "react";

import styles from "./range.module.css";

type RangeProps = {
}

const getPercent = (max: number, min: number, value: number) => parseFloat(((Math.min(max, Math.max(min, value)) - min) * 100 / (max - min)).toFixed(2));
const getNearestNumber = (value: number, options: number[]): number => {
    return options.reduce((prev, curr) => Math.abs(curr - value) < Math.abs(prev - value) ? curr : prev, options[0]);
}
const Range: React.FC<RangeProps> = () => {
    const lineRef = useRef<HTMLDivElement | null>(null);

    const max = 100;
    const min = 0;
    const pointsValue: number[] = [20, 40, 60, 80];
    const points = [min, ...pointsValue.map((point) => getPercent(max, min, point)), max].sort((a, b) => a - b);
    const [left, setLeft] = useState(min);
    const [right, setRight] = useState(max);
    const [draggingLeft, setDraggingLeft] = useState(false);
    const [draggingRight, setDraggingRight] = useState(false);
    const dragging = draggingLeft || draggingRight;
    const leftValue = (left / 100) * (max - min) + min;
    const rightValue = (right / 100) * (max - min) + min;

    const handleMouseDownLeft = () => {
        setDraggingLeft(true);
    }
    const handleMouseDownRight = () => {
        setDraggingRight(true);
    }

    const handleMouseUp = () => {
        if (points?.length) {
            if (draggingLeft) {
                console.log({ leftValue, rightValue, points, p: points.slice(0, points.indexOf(rightValue)) })
                setLeft(getNearestNumber(leftValue, points.slice(0, points.indexOf(rightValue))))
            }
            if (draggingRight) {
                setRight(getNearestNumber(rightValue, points.slice(points.indexOf(leftValue) + 1)))
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
            const newValue = parseFloat(((Math.min(maxX, Math.max(minX, x)) - minX) * 100 / (maxX - minX)).toFixed(2));
            if (draggingLeft) {
                setLeft(Math.min(newValue, rightValue))
            }
            if (draggingRight) {
                setRight(Math.max(newValue, leftValue))
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
            <div
                className={styles.slider}
                role="slider"
                aria-valuemin={min}
                aria-valuemax={rightValue}
                aria-valuenow={leftValue}
                aria-orientation="horizontal"
                style={{ left: `calc(${left}% - 4px)`, cursor: dragging ? "grabbing" : "grab" }}
                onMouseDown={handleMouseDownLeft} />
            <div
                className={styles.slider}
                role="slider"
                aria-valuemin={leftValue}
                aria-valuemax={max}
                aria-valuenow={rightValue}
                aria-orientation="horizontal"
                style={{ left: `calc(${right}% - 4px)`, cursor: dragging ? "grabbing" : "grab" }}
                onMouseDown={handleMouseDownRight} />
        </div>
    </div>
};

export default Range;