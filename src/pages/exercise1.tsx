import NormalRange from "@/components/NormalRange"

interface Exercise1Props {
    minDefault: number;
    maxDefault: number;
}
const Exercise1: React.FC<Exercise1Props> = ({ minDefault = 0, maxDefault = 10 }) => {
    return <div style={{ display: "flex", marginTop: "3rem", justifyContent: "center", alignItems: "center" }}><NormalRange minDefault={minDefault} maxDefault={maxDefault} /></div>
}

export const getServerSideProps = async () => {
    const res = await fetch("http://demo8286832.mockable.io/getNormalRange");
    const data = (await res.json()) as Exercise1Props;

    return {
        props: data,
    }
}
export default Exercise1