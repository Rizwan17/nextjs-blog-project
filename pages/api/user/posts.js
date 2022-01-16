import Post from "../../../models/post";
import { errorHandler, responseHandler } from "../../../utils/common";

export default async function handler(req, res) {
  try {
    const { id } = req.body;
    const posts = await Post.find({ user: id })
      .select("_id title slug image desc createdAt")
      .exec();

      if(posts){
          responseHandler(posts, res);
      }else{
          errorHandler("Something went wrong", res, 404);
      }
  } catch (error) {
    errorHandler(error, res);
  }
}