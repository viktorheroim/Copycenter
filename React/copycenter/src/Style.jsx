import React, {useState} from 'react'
import './Styles/Style1.css';
import PostList from "./PostList";
import PostForm from "./PostForm";

const Style = () => {
    const [posts, setPosts] = useState([
        // {id: 1, title: 'Javascript1', body: 'Description'},
        // {id: 2, title: 'Javascript2', body: 'Description'},
        // {id: 3, title: 'Javascript3', body: 'Description'},
    ])

    const createPost = (newPost) => {
        setPosts([...posts, newPost])
    }

    // получаем post из дочернего компонента
    const removePost = (post) => {
        setPosts(posts.filter(p => p.id !== post.id))
    }


    return (
        <div className='style'>
            <PostForm create={createPost}/>
            {posts.length
                ? <PostList remove={removePost} posts={posts} title='Список заказов'/>
                : <h1 style={{textAlign: "right"}}>Заказы не найдены</h1>
            }

        </div>
    );
}

export default Style;