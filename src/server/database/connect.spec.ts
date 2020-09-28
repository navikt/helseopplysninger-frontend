import connect from "./connect";


test('should connect', async () => {
    const client1 = await connect();
    const result = await client1.query("SELECT 1");
    expect(result.rowCount).toBe(1);
    const client2 = await connect();
    expect(client1).toBe(client2);
    await client1.end();
    const client3 = await connect();
    const result2 = await client3.query("SELECT 1");
    expect(result2.rowCount).toBe(1);
},1000);
