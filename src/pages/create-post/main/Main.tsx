import React, { useEffect, useState } from 'react';
import { Config } from 'firebase/auth';
import { db } from '../../../config/firebase';
import '../../Home.css';
import { Post } from './Post';
import { getDocs, collection } from '@firebase/firestore';

export interface IPost {
    id: string;
    description: string;
    userId: string;
    title: string;
    username: string;
}

export const Main = () => {
    const [postList, setPostList] = useState<IPost[] | null>(null);
    const postRef = collection(db, "posts");
    const getPosts = async () => {
        const data = await getDocs(postRef);
        setPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })) as IPost[]);
    }
    useEffect(() => {
        getPosts();
    }, [])
    return (
        <div>
            {postList?.map((post) => <Post post={post} />)}
        </div>
    );
};
