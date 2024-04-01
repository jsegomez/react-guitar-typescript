import { useState, useEffect, useMemo } from "react";
import { toast } from 'react-hot-toast';
import { db } from '../data/db';
import { Guitar } from "../types/guitar";

export const userCart = () => {
    const [dataPage] = useState(db);
    const notify = () => toast.success('Agregado a tu carrito.');

    const initialStateDataCart = ():Guitar[] => {
        const dataLS = localStorage.getItem('products');
        return dataLS ? JSON.parse(dataLS) : [];
    };

    const [dataCart, setDataCart] = useState(initialStateDataCart);

    useEffect(() => {
        localStorage.setItem('products', JSON.stringify(dataCart));
    }, [dataCart])


    function clearCart():void {
        setDataCart([]);
    }

    const deleteFromCart = (idGuitar: number):void => {
        setDataCart((prevState: Guitar[]) => prevState.filter(guitar => guitar.id != idGuitar));
    }

    const addToCart = (newGuitar: Guitar):void => {
        notify();
        const indexGuitar = dataCart.findIndex((guitar: Guitar) => guitar.id == newGuitar.id);

        if (indexGuitar == -1) {
            newGuitar.quantity = 1;
            setDataCart([...dataCart, newGuitar]);
        } else {
            increseQuantity(indexGuitar);
        }
    }

    function increseQuantity(index: number):void {
        const updateArr = [...dataCart];
        updateArr[index].quantity++;
        setDataCart(updateArr);
    }

    function decreseQuantity(idGuitar: number): void {
        const index = dataCart.findIndex((guitar: Guitar) => guitar.id == idGuitar);

        const updateArr = [...dataCart];
        updateArr[index].quantity--;
        updateArr[index].quantity == 0 ? deleteFromCart(idGuitar) : setDataCart(updateArr);
    }

    const isEmpty: boolean = useMemo(
        () => dataCart.length == 0,
        [dataCart]
    );    

    const cartTotal: number = useMemo(
        () => dataCart.reduce((sum: number, guitar: Guitar) => sum + (guitar.price * guitar.quantity), 0),
        [dataCart]
    );

    return {
        addToCart,        
        cartTotal,
        clearCart,
        dataCart,
        dataPage,
        decreseQuantity,
        deleteFromCart,
        increseQuantity,
        isEmpty
    }
}

