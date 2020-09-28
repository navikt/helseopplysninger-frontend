import connect from "./connect";

export default async (selectQuery: string) => {
    const client = await connect();
    const result = await client.query(selectQuery);
    return result.rows;
}
