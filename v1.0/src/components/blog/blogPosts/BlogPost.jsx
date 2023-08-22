import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Directory from './directory/Directory'

const BlogPost = ({ match }) =>  {
    const intMatch = parseInt(match.params.id)
    if (!intMatch | (intMatch > Directory.length)) {return <Redirect exact to="/" />}
    const Blog = Directory[match.params.id]
    return (
        <Blog></Blog>
    ) 
}

export default BlogPost;