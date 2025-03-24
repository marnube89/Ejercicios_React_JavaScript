import { WebPartContext } from "@microsoft/sp-webpart-base";
import { spfi, SPFx } from "@pnp/sp";
import { useState, useEffect } from "react";

export default function useColumnChoices(context: WebPartContext, nombre: string){
    const [choices, setChoices] = useState(Array<string>)

    const handdleChange = () => {
        const sp = spfi().using(SPFx(context))
        sp.web.lists.getByTitle('Grupos').fields.getByTitle(nombre)()
        .then((columna) => {
            const choices = columna.Choices
            if(choices !== undefined){setChoices(choices)}
        }).catch((e) => console.error(e))
    }
    useEffect(() => {
        handdleChange()
    },[])

    return choices
}