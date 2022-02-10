import { observer } from "mobx-react-lite";
import React, { ChangeEvent, useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { Button, Header, Label, Segment } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";
import { v4 as uuid } from 'uuid';
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from 'yup';
import MyTextInput from "../../../app/common/form/MyTextInput";
import MyTextArea from "../../../app/common/form/MyTextArea";
import MySelectInput from "../../../app/common/form/MySelectInput";
import { petTypeOptions } from "../../../app/common/options/petTypeOptions";
import { statusTypeOptions } from "../../../app/common/options/statusTypeOptions";
import MyDateInput from "../../../app/common/form/MyDateInput";
import { Post } from "../../../app/models/post";

export default observer(function PostForm() {
    const history = useHistory();
    const {postStore} = useStore();
    const { createPost, updatePost, loading, loadPost, loadingInitial } = postStore;
    const {id} = useParams<{id: string}>();

    const[post, setPost] = useState<Post>({
        id:'',
        title: '',
        description: '',
        date: null,
        location: '',
        userID: '84b1ffb1-f1a1-44c4-a8b7-016610c6a135',
        petType: '',
        statusType: ''
    });

    const validationSchema = Yup.object({
        title: Yup.string().required('post title is a required field'),
        description: Yup.string().required('post description is a required field'),
        date: Yup.string().required('date is a required field').nullable(),
        location: Yup.string().required(),
        animal: Yup.string().required('animal type is a required field'),
        status: Yup.string().required('post type is a required field')
    })

    useEffect(() => {
        if(id) loadPost(id).then(post => setPost(post!))
    }, [id, loadPost]);

    // const petType = [
    //     {key: 1, value: 1, text: "CAT"},
    //     {key: 2, value: 2, text: "DOG"},
    //     {key: 3, value: 3, text: "ALPACA"},
    //     {key: 4, value: 4, text: "OTHER"}];

    // const statusType = [
    //     {key: 1, value: 1, text: "LOST"},
    //     {key: 2, value: 2, text: "FOUND"},
    //     {key: 3, value: 3, text: "FOR ADOPTION"}];
    

    function handleFormSubmit(post: Post) {
        if(post.id.length === 0) {
            let newPost = {
                ...post,
                id: uuid()
            };
            createPost(newPost).then(() => history.push(`/posts/${newPost.id}`))
        } else {
            updatePost(post).then(() => history.push(`/posts/${post.id}`))
        }
    }

    // function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    //     const{name, value} = event.target;
    //     setPost({...post, [name]: value})
    // }

    // const handleDropDownSelectPet = (event: any, data: any) => {
    //     const name = 'petType';
    //     const value = petType[data.value-1].text;
    //     setPost({...post, [name]: value})
    //    };

    // const handleDropDownSelectStatus = (event: any, data: any) => {
    //     const name = 'statusType';
    //     const value = statusType[data.value-1].text;
    //     setPost({...post, [name]: value})
    //     };

    if(loadingInitial) return <LoadingComponent />
        
    return (
        <Segment clearing>
            <Header content='Post Details' sub color='teal' />
            <Formik 
                validationSchema={validationSchema}
                enableReinitialize 
                initialValues={post} 
                onSubmit={values => handleFormSubmit(values)}>
                {({handleSubmit, isValid, isSubmitting, dirty}) => (
                <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                    <MyTextInput name='title' placeholder='Title' />
                    <MyTextArea rows={3} placeholder = 'Description' name='description' />
                    <MySelectInput name='animal' placeholder = "Animal Type" options={petTypeOptions} />
                    <MySelectInput name='status' placeholder = "Post type" options={statusTypeOptions} />
                    <MyTextInput placeholder = 'Location' name='location' />
                    <MyDateInput
                        placeholderText = 'Date' 
                        name='date'
                        dateFormat='MMMM d, yyyy'
                    />
                    <Button
                        disabled={isSubmitting || !dirty || !isValid}
                        loading={loading} 
                        floated='right' 
                        positive type='submit' 
                        content='Submit'/>
                    <Button as={Link} to='/posts' floated='right' type='button' content='Cancel'/>
                </Form>
                )}
            </Formik>
            
        </Segment>
    )
})