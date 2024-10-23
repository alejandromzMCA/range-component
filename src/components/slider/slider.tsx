import { useState, type MouseEvent, useRef, useEffect } from "react";

import styles from "./slider.module.css";

type SliderProps = {
    max: number;
    min: number;
    value: number;
    leftPercent: number;
    dragging: boolean;
    onMouseDown: () => void
};

const Slider: React.FC<SliderProps> = ({ max, min, value, leftPercent, dragging, onMouseDown }) => (
    <div
        className={styles.slider}
        role="slider"
        aria-valuemax={max}
        aria-valuemin={min}
        aria-valuenow={value}
        aria-orientation="horizontal"
        style={{ left: `calc(${leftPercent}% - 4px)`, cursor: dragging ? "grabbing" : "grab" }}
        onMouseDown={onMouseDown} />
);

export default Slider;