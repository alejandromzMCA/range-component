import NormalRangeOld from "@/components/NormalRangeOld"
import Range, { RangeModeEnum } from "@/components/range/range";

interface Exercise1Props {
    minDefault: number;
    maxDefault: number;
}
const Exercise1: React.FC<Exercise1Props> = ({ minDefault = 0, maxDefault = 10 }) => {
    return <div style={{ display: "flex", marginTop: "3rem", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
        <NormalRangeOld minDefault={minDefault} maxDefault={maxDefault} />
        <Range
            min={0}
            max={1000}
            mode={RangeModeEnum.Fixed}
            pointsValue={[200, 400, 600, 800]}
        />
    </div>
}

export const getServerSideProps = async () => {
    const res = await fetch("http://demo8286832.mockable.io/getNormalRange");
    const data = (await res.json()) as Exercise1Props;

    return {
        props: data,
    }
}
export default Exercise1