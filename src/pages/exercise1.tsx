import NormalRangeOld from "@/components/NormalRangeOld"
import Range from "@/components/range/range";
import { RangeModeEnum } from "@/models/range";
import { useState } from "react";

interface Exercise1Props {
    minDefault: number;
    maxDefault: number;
}
const Exercise1: React.FC<Exercise1Props> = ({ minDefault = 0, maxDefault = 10 }) => {
    const [min, setMin] = useState(0);
    return <div style={{ display: "flex", marginTop: "3rem", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
        <NormalRangeOld minDefault={minDefault} maxDefault={maxDefault} />
        <Range
            min={min}
            max={1000}
            mode={RangeModeEnum.Fixed}
            pointsValue={[200, 400, 600, 800]}
        />
        <button onClick={() => setMin((m) => m + 1)}>+</button>
        <button onClick={() => setMin((m) => m - 1)}>-</button>
    </div>
}

export const getServerSideProps = async () => {
    // const res = await fetch("http://demo8286832.mockable.io/getNormalRange");
    const data = {}; // (await res.json()) as Exercise1Props;

    return {
        props: data,
    }
}
export default Exercise1