import { useRef, useState } from "react";

const NormalRange = (): JSX.Element => {
    const [updating, setUpdating] = useState(false);
    const [dragging, setDragging] = useState(false);
    const x = useRef(0);

    const handleMouseDown = () => {
        setDragging(true);
    }

    const handleMouseUp = () => {
        setDragging(false);
    }

    const handleMouseMove = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        event.preventDefault();
        event.stopPropagation();
        const newX = event.clientX -18;
        if (dragging && x.current !== newX) {
            x.current = newX;
            if (!updating) {
                setUpdating(true);
                setTimeout(()=>setUpdating(false), 100)
            }
        }
    }

    return <div onMouseUp={handleMouseUp} onMouseMove={handleMouseMove} onMouseLeave={handleMouseUp} style={{ display: "flex", position: "relative", alignItems: "center", width: "100%", height: "6rem", backgroundColor: '#CBD5E1', cursor: dragging ? "grabbing" : undefined }}>
        <div style={{ width: "100%", height: "0.25rem", backgroundColor: '#0F172A' }} />
        <div onMouseDown={handleMouseDown} className="dot" style={{ left: x.current, cursor: dragging ? "grabbing" : "grab" }}/>
    </div>
}

export default NormalRange;