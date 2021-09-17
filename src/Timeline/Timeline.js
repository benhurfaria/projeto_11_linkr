import axios from 'axios';
import { LoggedUser } from '../services/contexts/LoggedUser';

import React, { useState, useEffect, useContext } from "react";
import { IoIosArrowDown } from "react-icons/io";

import PostsList from "./PostsList.js";
import { TimelineHeader, DropdownMenu, UserAvatar, MainContainer, ContainerHeader, ContainerPosts} from "./Timeline_style.js";

// { email: "ruffles@mail.com", password: "potato" };

const POSTS_URL = "https://mock-api.bootcamp.respondeai.com.br/api/v3/linkr/posts/";

export default function Timeline() {
    const { loggedUser } = useContext(LoggedUser);
    const [allPostsArray, setAllPostsArray] = useState([]);
    const [postsLoaded, setPostsLoaded] = useState(false);

    function updatePostsArray(response) {
        if (response.data.posts.length < 1 ) {
            alert("Nenhum post encontrado");
            return;
        }
        setAllPostsArray(response.data.posts);
        setPostsLoaded(true);
    };

    useEffect(() => {
        const requestConfig = {
            headers: { Authorization: `Bearer ${loggedUser.token}` }
        };

        const allPostsPromise = axios.get(POSTS_URL, requestConfig);
        allPostsPromise.then(updatePostsArray);
        allPostsPromise.catch(() => alert("Houve uma falha ao obter os posts, por favor atualize a página"));
    }, [loggedUser]);

    console.log("all posts:", allPostsArray);

    return (
        <>
            <TimelineHeader>
                <h1>linkr</h1>

                <DropdownMenu>
                    <IoIosArrowDown />
                    <UserAvatar src={loggedUser.avatar} />
                </DropdownMenu>
            </TimelineHeader>

            <MainContainer>
                <ContainerHeader>
                    <h1>timeline</h1>
                </ContainerHeader>

                <ContainerPosts>
                    <PostsList showList={postsLoaded} avatar={loggedUser.avatar} allPostsArray={allPostsArray} />
                </ContainerPosts>

            </MainContainer>
        </>
    );
}