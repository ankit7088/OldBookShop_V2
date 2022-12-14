import { client } from "../../../lib/sanityClient";

async function handler(req, res) {
  if (req.method !== 'POST') {
    return;
  }

  const {userId,imageUrl} = req.body;


 const response = await client.patch(userId).set({image:imageUrl}).commit();

  if (response) {
    res.status(200).json({image:response.image});

  } else {
    res.status(200).json({ message: "Something wrong happend" });
 }

}

export default handler;
