import { useEffect, useState } from "react";


export function useDebounce(value: string, delay: number = 400) {
    
    const [debounced, setDebounced] = useState(value)

    useEffect(()=>{
       const handler = setTimeout(()=> setDebounced(value), delay)

       return () => clearTimeout(handler) // чтобы каждый раз не отрабатывал при каком изменении (только при delay) 
    }, [value, delay])

    return debounced
}