import { client } from "../../../../lib/sanityClient";
import { nanoid } from "nanoid";
  
export default async function handler(req, res) {
    const { title, author, description, imageAsset, userId,branch,semester,price } = req.body;
  const id = nanoid();
  const [branchId, branchTitle] = branch.split(',');
    const doc = {
      _type: 'book',
      _id:id,
        title,
        author,
        description,
        semester,
        price,
        image: {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: imageAsset._id,
          },
      },
        userId: userId,
        postedBy: {
          _type: 'postedBy',
          _ref: userId,
        },
        branch:branchTitle,

  };

  const branchPatch = client.patch(branchId)
  .setIfMissing({ books: [] })
    .insert('after', 'books[-1]', [{
      _key: nanoid(),
      userId,
      item: {
          _type: 'reference',
          _ref: id
      }
    }]);
    const userPatch = client.patch(userId)
    .setIfMissing({ uploads: [] })
      .insert('after', 'uploads[-1]', [{
        _key: nanoid(),
        title,
        item: {
            _type: 'reference',
            _ref: id
        }
    }]);
  
  const response = await client
    .transaction()
    .create(doc)
    .patch(branchPatch)
    .patch(userPatch)
    .commit();
  
    res.status(200).json({ message: "Success" });
}