import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
function Post({posts}) {
    const useStyles = makeStyles({
        root: {
          maxWidth: 345,
        },
        media: {
          height: 140,
        },
      });
console.log(posts)
    return (
        <div className="post">
            {posts.map((post)=>(<div className="title"> <Card className={useStyles.root}>
      <CardActionArea>
          <img className={useStyles.media} src={post.img} alt="img" />
        <CardMedia
          className={useStyles.media}
          src={post.img}
          title="Contemplative Reptile"
        />
        <CardContent>
        
          <Typography gutterBottom variant="h5" component="h2">
            {post.title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
           {post.description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Share
        </Button>
        <Button size="small" color="primary">
          Learn More
        </Button>
      </CardActions>
    </Card></div>
            ))}
        </div>
    )
}

export default Post
