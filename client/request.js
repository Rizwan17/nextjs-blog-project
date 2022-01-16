import axios from "axios"
import { getValue } from "../utils/common";
import { baseUrl } from "./config"

export const signup = async (payload) => {
    try{
        const res = await axios.post(baseUrl + `/signup`, payload);
        return res.data;
    }catch(error){
        return getValue(error, ["response", "data"]);
    }
}

export const createPost = async (form) => {
    try{
        const res = await axios.post(baseUrl + `/post/create`, form);
        return res.data;
    }catch(error){
        return getValue(error, ["response", "data"]);
    }
}

export const getAllPosts = async () => {
    try{
        const res = await axios.get(baseUrl + `/post`);
        return res.data;
    }catch(error){
        return getValue(error, ["response", "data"]);
    }
}

export const getSinglePost = async (id) => {
    try{
        const res = await axios.get(baseUrl + `/post/${id}`);
        return res.data;
    }catch(error){
        return getValue(error, ["response", "data"]);
    }
}

export const getUserPosts = async (payload) => {
    try{
        const res = await axios.post(baseUrl + `/user/posts`, payload);
        return res.data;
    }catch(error){
        return getValue(error, ["response", "data"]);
    }
}