
import useRange from "@/hooks/use-range";
import { type RangeProps } from "@/models/range";
import Slider from "../slider/slider";
import styles from "./range.module.css";
import { useMemo } from "react";

const Range: React.FC<RangeProps> = (props) => {
    const { max, min } = props;
    const { lineRef, points, left, right, leftValue, rightValue, dragging, handleMouseUp, handleMouseMove, handleMouseDownLeft, handleMouseDownRight } = useRange(props);

    const pointsRender = useMemo((): JSX.Element[] => {
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
    }, [points]);

    return <div
        className={styles.wrapper}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        style={{ cursor: dragging ? "grabbing" : undefined }} >
        <div className={styles.content}>
            <div className={styles.line} ref={lineRef} />
            {pointsRender}
            <Slider max={rightValue} min={min} value={leftValue} leftPercent={left} dragging={dragging} onMouseDown={handleMouseDownLeft} />
            <Slider max={max} min={leftValue} value={rightValue} leftPercent={right} dragging={dragging} onMouseDown={handleMouseDownRight} />
        </div>
    </div>
};

export default Range;