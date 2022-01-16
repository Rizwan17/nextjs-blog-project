import { dbConnect } from "../../../lib/db-connect";
import multer from "multer";
import nc from "next-connect";
import path from "path";
import { getSession } from "next-auth/client";
import { errorHandler, responseHandler, validateAllOnce } from "../../../utils/common";
import Post from "../../../models/post";
import { staticResourceUrl } from "../../../client/config";
import slugify from "slugify";

export const config = {
  api: {
    bodyParser: false,
  },
};

const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(process.cwd(), "public", "uploads"));
    },
    filename: function (req, file, cb) {
      cb(null, new Date().getTime() + "-" + file.originalname);
    },
  }),
});

const handler = nc({
  onError: (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).end("Something broke!");
  },
  onNoMatch: (req, res, next) => {
    res.status(404).end("Page is not found");
  },
})
  .use(upload.single("image"))
  .post(async (req, res) => {

    try{
        const session = await getSession({ req });

        if(!session){
            errorHandler("Access denied", res);
        }else{

            const { title, desc } = req.body;
            validateAllOnce({ title, desc });
            
            if(req.file === undefined){
                errorHandler('Select image for your news', res);
                return;
            }

            await dbConnect();
            const userId = session.user.id;
            const url =  staticResourceUrl + req.file.filename;
            const slug = slugify(req.body.title, {remove: /[*+~.()'"!:@]/g});
            const post = new Post({
                ...req.body,
                slug: slug.toLocaleLowerCase(),
                image: url,
                user: userId
            });

            const savePost = await post.save();
            if(savePost){
                responseHandler(savePost, res);
            }else{
                errorHandler(savePost, res);
            }
        }
    }catch(error){
        errorHandler(error, res);
    }
  });

export default handler;
