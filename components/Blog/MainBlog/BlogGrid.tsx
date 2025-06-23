import BlogCard from "@/components/Blog/BlogDetail/BlogCard";

import {mockBlogPosts} from "@/lib/data/mock-data";

const BlogGrid = () => {
    return (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {mockBlogPosts.map((post) => (
                <BlogCard {...post} key={post.id} />
            ))}
        </div>
    )
}
export default BlogGrid
