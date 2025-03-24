import { WebPartContext } from "@microsoft/sp-webpart-base";
import { spfi, SPFx } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/folders";
import "@pnp/sp/files/folder";
import { useEffect, useState } from "react";
import { IFileInfo } from "@pnp/sp/files/types";


export default function useDocumentLibrary(context: WebPartContext, groupId: string){
    //Faltaria asignar un string para indicar el codigo del grupo actual
    const [library, setLibrary] = useState<Array<IFileInfo>>()
    const fileNumber = library?.length

    const loadData = () => {
        const sp = spfi().using(SPFx(context))
        const filteredFiles = sp.web.lists.getByTitle('Documentos de grupos').items
        .filter(`ReferenciaGrupo eq '${groupId}'`)
        .expand('File').select('File')()
        
        Promise.resolve(filteredFiles).then((files) => {
            const mappedFiles: IFileInfo[] = files.map((file) => {
                    return file.File
                
            })
            
            setLibrary(mappedFiles)
            
        }).catch((e) => console.log(e))

    }

    useEffect(() => {
        loadData()
    },[])

    return {library, loadData, fileNumber}
}
