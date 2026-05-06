const BLOG_POSTS = [
    { date: '2026-04-20' },
    { date: '2026-04-22' }
];

BLOG_POSTS.forEach(post => {
    try {
        console.log(new Date(post.date).toISOString());
    } catch (e) {
        console.error(`Error with date: ${post.date}`, e);
    }
});
