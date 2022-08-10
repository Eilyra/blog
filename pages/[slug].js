import { getPost, getPosts } from "../api/ghost";
import Article from "../components/article";

export async function getStaticPaths() {
    const posts = await getPosts();
    return {
        paths: posts.map(post => {
        return {
            params: { slug: post.slug }
        }}),
        fallback: false,
    };
}

export async function getStaticProps(context) {
    const post = await getPost(context.params.slug);
    return  {
        props: { post: post }
    }
}
const Post = ({ post }) => {

    return <Article post={post} />
}

export default Post