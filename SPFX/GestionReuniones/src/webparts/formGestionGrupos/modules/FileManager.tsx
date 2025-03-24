//Ruta de la carpeta para los archivos temporales: 
// /sites/myusta_Formacion/Documentos%20de%20grupos/.temp

//Ruta destinataria final
// /sites/myusta_Formacion/Documentos%20de%20grupos

import { spfi, SPFx } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/files";
import "@pnp/sp/folders";
import { WebPartContext } from "@microsoft/sp-webpart-base";
import { IFileInfo } from "@pnp/sp/files";

export function uploadTemp(currentFile: File, context: WebPartContext, loadData: () => void, groupId: string){
    //Faltaria pasar un string para añadir correctamente el metadata al archivo que vamos a subir

    let fileNamePath = encodeURI(currentFile.name)
    console.log(currentFile);
    const sp = spfi().using(SPFx(context))
    
    sp.web.getFolderByServerRelativePath('/sites/myusta_Formacion/Documentos%20de%20grupos/.temp')
    .files.addUsingPath(fileNamePath, currentFile, { Overwrite: true })
    .then(() =>{
        sp.web.getFolderByServerRelativePath('/sites/myusta_Formacion/Documentos%20de%20grupos/.temp').files.getByUrl(currentFile.name).getItem()
        .then((item) => {
            item.update({
                ReferenciaGrupo: groupId
            }).then(() => loadData())
            .catch((e) => console.log(e))
        }).catch((e) => console.log(e))
    }).catch((e) => console.log(e))

    
}

export function deleteFile(fileInfo: IFileInfo, context: WebPartContext, loadData: () => void){
    const sp = spfi().using(SPFx(context))
    sp.web.getFolderByServerRelativePath('Documentos de grupos')
        .files.getByUrl(fileInfo.ServerRelativeUrl).delete()
        .then(() => loadData())
        .catch((e) => console.log(e))
}

export function clearTempFolder(context: WebPartContext, groupId: string){
    const sp = spfi().using(SPFx(context))

    const filteredFiles = sp.web.lists.getByTitle('Documentos de grupos').items
    .filter(`ReferenciaGrupo eq '${groupId}'`)
    .expand('File').select('File')()
    
    Promise.resolve(filteredFiles).then((files) => {
        const mappedFiles: IFileInfo[] = files.map((file) => {
            if(file.File.ServerRelativeUrl.includes('.temp')) return file.File
        })
        return mappedFiles
    }).then((files) => {
        if(files[0]){
            files.forEach((file) => {
                //timeset - timeout - await
                Promise.resolve(sp.web.getFileByServerRelativePath(file.ServerRelativeUrl).delete())
                .catch((e) => console.log(e))
            })
        }
    })
    .catch((e) => console.log(e))

}

export function saveTempFiles(context: WebPartContext, groupId: string){
    const sp = spfi().using(SPFx(context))

    const filteredFiles = sp.web.lists.getByTitle('Documentos de grupos').items
    .filter(`ReferenciaGrupo eq '${groupId}'`)
    .expand('File').select('File')()
    
    Promise.resolve(filteredFiles).then((files) => {
        const mappedFiles: IFileInfo[] = files.map((file) => {
            if(file.File.ServerRelativeUrl.includes('.temp')) return file.File
        })
        return mappedFiles
    }).then((files) => {
        if(files[0]){
            files.forEach((file) => {
                Promise.resolve(sp.web.getFileByServerRelativePath(file.ServerRelativeUrl).copyTo(`/sites/myusta_Formacion/Documentos%20de%20grupos/${file.Name}`, false))
                .catch((e) => console.log(e))
            })
        }
    })
    .catch((e) => console.log(e))

    setInterval(() => {clearTempFolder(context, groupId)}, 2000)
    
}