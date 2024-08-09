import FixedValuesRange from "@/components/FixedValuesRange"

interface Exercise2Props {
    rangeLimitsValue: number[];
}
const Exercise2: React.FC<Exercise2Props> = ({ rangeLimitsValue }) => {
    return <div style={{ display: "flex", marginTop: "3rem", justifyContent: "center", alignItems: "center" }}><FixedValuesRange rangeLimitsValue={rangeLimitsValue} /></div>
}

export const getServerSideProps = async () => {
    const res = await fetch("http://demo8286832.mockable.io/getFixedValuesRange");
    const data = (await res.json()) as Exercise2Props;

    return {
        props: data || [],
    }
}

export default Exercise2