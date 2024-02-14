//'use client';

import clsx from 'clsx';
import { IoAddCircleOutline, IoRemoveCircleOutline } from 'react-icons/io5';

interface Props {
    quantity: number;

    onQuantityChanged: (quantity: number) => void;
}

export const QuantitySelector = ({ quantity, onQuantityChanged }: Props) => {

    //const [count, setCount] = useState(quantity);

    /* const onQuantityChanged = (value: number) => {
        if (1 > count + value || count + value > 5) return;
        setCount(count + value);
    } */

    return (
        <div className="flex">
            <button
                onClick={() => onQuantityChanged(quantity - 1)}
                disabled={quantity < 2}
            >
                <IoRemoveCircleOutline
                    size={30}
                    className={clsx("", { "text-gray-300": quantity < 2 })}
                />
            </button>
            <span className=' w-20 mx-3 px-5 bg-gray-200 text-center rounded'>
                {quantity}
            </span>
            <button
                onClick={() => onQuantityChanged(quantity + 1)}
                disabled={quantity > 4}
            >
                <IoAddCircleOutline
                    size={30}
                    className={clsx("", { "text-gray-300": quantity > 4 })}
                />
            </button>
        </div>


    )
}
