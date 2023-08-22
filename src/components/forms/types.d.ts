export type CheckHandler = (value:boolean) => void;

export interface ToolSectionProps {
    setSource: CheckHandler,
    isDataset: boolean,
    setIsDataset: CheckHandler
}