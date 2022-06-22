import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import Directory from './directory/Directory'

const BlogPost = ({ match }) =>  {
    const intMatch = parseInt(match.params.id)
    if (isNaN(intMatch) | (intMatch > Directory.length)) {return <Redirect exact to="/blog" />}
    const Blog = Directory[match.params.id]
    return (
        <Blog></Blog>
    ) 
}

export default BlogPost;