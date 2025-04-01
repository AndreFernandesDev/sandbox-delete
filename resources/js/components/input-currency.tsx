import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Currency } from '@/types';

export type UploaderItem = {
    id: string;
    src?: string;
    file?: File;
};

export default function InputCurrency({
    id,
    value,
    currencies,
    onChange,
}: {
    id?: string;
    name?: string;
    value?: string;
    currencies: Currency[];
    required?: boolean;
    onChange?: (val: string) => void;
}) {
    return (
        <RadioGroup
            id={id}
            onValueChange={(value) => onChange?.(value)}
            defaultValue={value ? value : currencies[0].code}
        >
            <div className="flex flex-col gap-8 sm:flex-row">
                {currencies.map((c) => (
                    <div
                        key={c.code}
                        className="flex items-center space-x-2"
                    >
                        <RadioGroupItem
                            value={c.code}
                            id={c.code}
                        />
                        <Label
                            htmlFor={c.code}
                            className="text-lg"
                        >
                            {c.code}
                        </Label>
                    </div>
                ))}
            </div>
        </RadioGroup>
    );
}
