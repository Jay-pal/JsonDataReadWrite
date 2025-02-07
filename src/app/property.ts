export interface Property {
    Value: string | number | boolean;
    Label: string;
}

export interface Data {
    id: string;
    SamplingTime: string;
    Properties: Property[];
}