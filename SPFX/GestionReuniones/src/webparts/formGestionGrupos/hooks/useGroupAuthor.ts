import { WebPartContext } from "@microsoft/sp-webpart-base";
import { spfi, SPFx } from "@pnp/sp";
import { useState, useEffect } from "react";

export default function useGroupAuthor(context: WebPartContext, groupCode?: string){
    const [initialData, setInitialData] = useState<Array<string>>()

    const handdleChange = () => {
        const sp = spfi().using(SPFx(context))
        const column = sp.web.lists.getByTitle('Grupos').fields.getByTitle('Autor')
        if(groupCode){
            column.select(groupCode)()
            .then((value) => {setInitialData([value.Title+'?'+value.Id, groupCode])})
            .catch((e) => console.log(e))
        }
        else {
            sp.web.currentUser()
            .then((user) => {
                return user
            }).then((userName) => {
                sp.web.lists.getByTitle('Grupos').items().then((list) => {   
                    setInitialData([userName.Title+'?'+userName.Id, `GP-${list.length + 1}`])
                }).catch((e) => console.log(e))
            })
            .catch((e) => console.log(e))
        }
    }
    useEffect(() => {
        handdleChange()
    },[])
    
    return initialData
}