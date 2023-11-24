import {redirect} from "react-router-dom";
import {deleteContact} from "../../contacts.js";


export async function action({params}){
    await deleteContact(params.contactId);
    return redirect("/");
}