import axios from "axios";

const apiClient=axios.create(
    {
        baseURL: 'http://localhost:8080'
    }
)
export const retrieveAllInventoryItems
=(username)=>apiClient.get(`/user/${username}/inventory`)

export const addNewInventoryItem
=(username,form)=>apiClient.post(`/user/${username}/inventory`,form)

export const deleteItemsApi
=(username,id)=>apiClient.delete(`/user/${username}/inventory/${id}`)

export const retrieveInventoryItem
=(username,id)=>apiClient.put(`/user/${username}/inventory/${id}`)
export const addItemObjectToCart
=(username,itemObject)=>apiClient.post(`/user/${username}/cart`,itemObject)
export const getAllCartItems
=(username)=>apiClient.get(`/user/${username}/cart`)
export const deleteItemCartApi
=(username,id)=>apiClient.delete(`/user/${username}/cart/${id}`)
export const deleteCart
=(username)=>apiClient.delete(`/user/${username}/inventory`)

export const updateInventory
=(username,cartItems)=>apiClient.put(`/user/${username}/invoice`,cartItems)