export interface QuerityFieldProps {
  value?: string;
  placeholder?: string;
  className?: string;
  onChange?: (value: string) => void;
  onEnter?: (value: string) => void;
  onInvalidQuery?: (error: Error) => void;
}
