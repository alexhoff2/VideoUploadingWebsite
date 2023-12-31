var pathToFFMPEG = require('ffmpeg-static');
var exec = require('child_process').exec;
var db = require('../conf/database');
module.exports = {
    makeThumbnail: function (req, res, next) {
        if (!req.file) {
            next(new Error("File upload failed"));
        } else {
            try {
                var destinationOfThumbnail = `public/images/uploads/thumbnail-${
                    req.file.filename.split(".")[0]
                }.png`;
                var thumbnailCommand = `${pathToFFMPEG} -ss 00:00:01 -i ${req.file.path} -y -s 200x200 -vframes 1 -f image2 ${destinationOfThumbnail}`;
                exec(thumbnailCommand);
                req.file.thumbnail = destinationOfThumbnail;
                next();
            } catch (error) {
                next(error);
            }
        }
    },

    getPostsforUser: function (req, res, next) {
        
     },
    getPostById: async function (req, res, next) {
        var { id } = req.params;
        try {
            let [rows, _] = await db.execute(
                `select u.username, p.video, p.title, 
                p.description, p.createdAt, p.id 
                from posts p
                JOIN users u
                ON p.fk_userId=u.id
                WHERE p.id=?;`,
                [id]
            );

            const post = rows[0];
            if (!post) {

            } else {
                res.locals.currentPost = post;
                next();
            }

        } catch (error) {
            next(error);
        }
    },
    getCommentsForPostById: async function (req, res, next) {
        var { id } = req.params;
        try {
            let [rows, _] = await db.execute(
                `select u.username, c.text, c.createdAt
                from comments c
                JOIN users u
                ON c.fk_authorId=u.id
                WHERE c.fk_postId=?;
                `,
                [id]
            );

            res.locals.currentPost.comments = rows;
            next();
        } catch (error) {
            next(error);
        }
    },
    getRecentPosts: async function (req, res, next) {
        try{
            const[ rows, fields] = await db.execute(`SELECT id,
             title, video, createdAt,
        description,thumbnail FROM csc317db.posts 
        ORDER BY createdAt DESC LIMIT 10;`)
        const posts = rows.map(post=>({
            id: post.id,
            title: post.title,
            description: post.description,
            thumbnail: post.thumbnail,
        }));
        res.locals.posts = posts;
        next();

        }catch(error){
            next(error)
        }
    }
}