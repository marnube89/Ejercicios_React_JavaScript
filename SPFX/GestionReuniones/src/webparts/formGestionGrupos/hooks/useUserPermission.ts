import { WebPartContext } from "@microsoft/sp-webpart-base";
import { spfi, SPFx } from "@pnp/sp";
import { PermissionKind } from "@pnp/sp/security";
import { useEffect, useState } from "react";

export default function useUserPermission(context: WebPartContext){
    const [hasPermission, setHasPermission] = useState(true)

    const handdleChange= () => {
        const sp = spfi().using(SPFx(context))
        sp.web.currentUserHasPermissions(PermissionKind.AddListItems)
        .then((isUserAllowed) => setHasPermission(isUserAllowed))
        .catch((e) => console.log(e))
    }

    useEffect(() => {
        handdleChange()
    },[])
    
    return hasPermission
}
