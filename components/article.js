import Link from "next/link"

export default function Article({ post }) {
    return <article className="post h-entry">
        <header className="post-header">
            <h1 className="post-title p-name"><Link href={post.url}><a>{post.title}</a></Link></h1>
        </header>
        <section className="post-content e-content" dangerouslySetInnerHTML={{__html: post.html}}/>
        {post.primary_tag && <div className="category p-category"><a href={post.primary_tag.url}>{post.primary_tag.name}</a></div>}
        <time className="dt-published" dateTime={ post.date}>{post.published_at}</time>
        {post.tags && (<div className="tags">{post.tags.map(tag => <Link href={tag.url} key={tag.slug} rel="tag"><a>#{tag.name}</a></Link>)}</div>)}
    </article>
}