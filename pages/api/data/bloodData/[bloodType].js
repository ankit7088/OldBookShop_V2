import { client } from "../../../../lib/sanityClient";
import { bloodQuery } from "../../../../lib/Data";

export default async function handler(req, res) {
    
    const { bloodType } = req.query;
    const query = bloodQuery(bloodType);

    const data = await client.fetch(`${query}`);
   
    res.status(200).json({ bloodData: data });
}