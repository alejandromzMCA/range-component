export type RangeValue = {
    left: number;
    right: number;
}

export enum RangeModeEnum {
    Normal,
    Fixed,
}

type RangeBasicProps = {
    mode: RangeModeEnum;
    max: number;
    min: number;
    value?: Partial<RangeValue>;
    onMaxChange?: (max: number) => void;
    onMinChange?: (min: number) => void;
    onValueChange?: (value: RangeValue) => void;
}

interface NormalRangeProps extends RangeBasicProps {
    mode: RangeModeEnum.Normal;
    pointsValue?: number[];
};

interface FixedRangeProps extends RangeBasicProps {
    mode: RangeModeEnum.Fixed;
    pointsValue: number[];
};

export type RangeProps = NormalRangeProps | FixedRangeProps;