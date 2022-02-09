import React from 'react';
import { db } from "../firebase";

exports.getAllUsers = (request, response) => {
    db
    .collection('Users')
    .get()
    .then((data) => {
        let users = [];
        data.forEach((doc) => {
            users.push(
                doc.data()
                )
        })
        return response.json(data);
    })
    .catch((err) => {
        console.log(err);
        return response.status(500).json({ error: err.code});
    })
}

exports.getUser = (request, response) => {
    db
    .doc(`/Users/${request.params.todoId}`)
    .get()
    .then((doc) => {
        if(!doc.exists){
            return response.status(404).json(
                { error: 'User not found' });
        }
       return response.json(doc)
    })
    .catch((err) => {
        console.log(err);
        return response.status(500).json({ error: err.code});
    })
}
