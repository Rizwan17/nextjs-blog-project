import Link from "next/link";
import { getAllPosts } from "../client/request";


export const getStaticProps = async (ctx) => {
    const res = await getAllPosts();
    if(!res.hasError){
      return {
        props: {
          posts: res.body
        },
        revalidate: 5
      }
    }else{
      return {
        props: {
          posts: [],
          res
        }
      }
    }
}

export default function Home({
  posts
}) {
  return (
    <div className="container" style={{ marginTop: '20px' }}>
      {
        posts && posts.map((post, index) => (
          <div key={index} className="row">
            <div className="col">
              <article class="blog-post">
                <h2 class="blog-post-title">{post.title}</h2>
                <p class="blog-post-meta">{post.createdAt} by <a href="#">{post.user.name}</a></p>
                <Link href={`/post/${post._id}/${post.slug.toLocaleLowerCase()}`}>
                  <a>View More</a>
                </Link>
              </article>
            </div>
          </div>
        ))
      }
      
      
    </div>
  )
}
