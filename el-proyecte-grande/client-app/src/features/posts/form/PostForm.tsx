import { observer } from "mobx-react-lite";
import React, { ChangeEvent, useState } from "react";
import { Button, Form, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";


export default observer(function PostForm() {

    const {postStore} = useStore();
    const { selectedPost, closeForm, createPost, updatePost, loading } = postStore;

    const petType = [
        {key: 1, value: 1, text: "CAT"},
        {key: 2, value: 2, text: "DOG"},
        {key: 3, value: 3, text: "ALPACA"},
        {key: 4, value: 4, text: "OTHER"}];

    const statusType = [
        {key: 1, value: 1, text: "LOST"},
        {key: 2, value: 2, text: "FOUND"},
        {key: 3, value: 3, text: "FOR ADOPTION"}];

    const initialState = selectedPost ?? {
        id:'',
        title: '',
        description: '',
        date: '',
        location: '',
        userID: '84b1ffb1-f1a1-44c4-a8b7-016610c6a135',
        petType: '',
        statusType: ''
    }

    const[post, setPost] = useState(initialState);

    function handleSubmit() {
        post.id ? updatePost(post) : createPost(post);
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const{name, value} = event.target;
        setPost({...post, [name]: value})
    }

    const handleDropDownSelectPet = (event: any, data: any) => {
        const name = 'petType';
        const value = petType[data.value-1].text;
        setPost({...post, [name]: value})
       };

    const handleDropDownSelectStatus = (event: any, data: any) => {
        const name = 'statusType';
        const value = statusType[data.value-1].text;
        setPost({...post, [name]: value})
        };

    return (
        <Segment clearing>
            <Form onSubmit={handleSubmit} autoComplete='off'>
                <Form.Input placeholder = 'Title' value={post.title} name='title' onChange={handleInputChange}/>
                <Form.TextArea placeholder = 'Description' value={post.description} name='description' onChange={handleInputChange}/>
                <Form.Select placeholder = {post.petType?post.petType:"Animal Type"} options={petType} onChange={handleDropDownSelectPet}/>
                <Form.Select placeholder = {post.statusType?post.statusType:"Post type"} options={statusType} onChange={handleDropDownSelectStatus}/>
                <Form.Input placeholder = 'Location' value={post.location} name='location' onChange={handleInputChange}/>
                <Form.Input type='date' placeholder = 'Date' value={post.date} name='date' onChange={handleInputChange}/>
                <Button loading={loading} floated='right' positive type='submit' content='Submit'/>
                <Button onClick={closeForm} floated='right' type='button' content='Cancel'/>
            </Form>
        </Segment>
    )
})