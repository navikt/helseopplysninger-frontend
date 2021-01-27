import pg from "pg";
export const isomorphic =  (comment:string) => {
    // @ts-ignore
    if(process.browser){
        return "nothing";
    } else {
        return pg;
    }
}
