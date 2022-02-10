import { observer } from "mobx-react-lite";
import React, { Fragment } from "react";
import { Item, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import PostListItem from "./PostListItem";




// if any functionality does not work on a component we probably did not set it as an observer so it can observe the observables

export default observer(function PostList() {

    const {postStore} = useStore();
    const {postsByDate} = postStore;

    

    return (
            <Fragment>
                {postsByDate.map(post => (
                    <PostListItem key={post.id}  post = {post}></PostListItem>
                ))}
            </Fragment>
    )
})