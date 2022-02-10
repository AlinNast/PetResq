import { observer } from 'mobx-react-lite';
import React from 'react'
import { Link } from 'react-router-dom';
import { Button, Header, Item, Segment, Image, Label } from 'semantic-ui-react'
import { Post } from "../../../app/models/post";
// import { format } from 'date-fns';
import { useStore } from '../../../app/stores/store';
import {format} from 'date-fns';



const postImageTextStyle = {
    position: 'absolute',
    bottom: '5%',
    left: '5%',
    width: '100%',
    height: 'auto',
    color: 'black'
};

interface Props {
    post: Post
}

export default observer(function PostDetailedHeader({ post }: Props) {
    
    return (
        <Segment.Group>
            <Segment basic attached='top' style={{ padding: '0' }}>
                <Image src={`/assets/dalmatian.jpg`} fluid />
                <Segment style={postImageTextStyle} basic>
                    
                </Segment>
            </Segment>
            <Segment clearing attached='bottom'>
            <Item.Group>
                        <Item>
                            <Item.Content>
                                <Header
                                    size='huge'
                                    content={post.title}
                                    style={{ color: 'black' }}
                                />
                                <p>{format(post.date!, 'dd MMM yyyy')}</p>
                               <p>
                                   Posted by Bob
                               </p>
                            </Item.Content>
                        </Item>
                    </Item.Group>
                <Button color='teal'>
                    Join
                </Button>
                <Button as={Link} to={`/edit/${post.id}`} color='orange' floated='right'> 
                    Edit Post
                </Button>
                <Button > Cancel</Button>
            </Segment>
        </Segment.Group>
    )
})