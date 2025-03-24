import { WebPartContext } from "@microsoft/sp-webpart-base";
import { spfi, SPFx } from "@pnp/sp";
import { SubmitedData } from "../modules/SubmitedData";

export default function useSubmitData(context: WebPartContext, data: SubmitedData){
    const ambitoProps = data.ambito.split('?')
    const paisProps = data.pais.split('?')
    const ciudadProps = data.ciudad.split('?')
    console.log(parseInt(data.autor));
    
    const sp = spfi().using(SPFx(context))
    Promise.resolve(
        sp.web.lists.getByTitle('Grupos').items.add({
            Codigodegrupo: data.idGrupo,
            Denominacion: data.denominacion,
            Descripcion: data.descripcion,
            Fechadecreacion: data.fechaCreacion,
            Fechadefinalizacion: data.fechaFinalizacion,
            Estado: data.estado,
            Tipodegrupo: data.tipoGrupo,
            Tematica: data.tematica,
            Ambito: {
                Label: ambitoProps[0],
                TermGuid: ambitoProps[1]
            },
            Pais: {
                Label: paisProps[0],
                TermGuid: paisProps[1]
            },
            Ciudad: {
                Label: ciudadProps[0],
                TermGuid: ciudadProps[1]
            },
            AutorId: parseInt(data.autor)
        })
    ).catch((e) => console.error(e))

}