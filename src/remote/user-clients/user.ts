import React from 'react'

export async function userLogin(username:string, password:string){

    const credentials = {
        username,
        password
    }
    try{
        const response = await fetch('http://localhost:8888/login',{
            //this object is the config for our requests
            //use it to set headers...
            method:'POST',
            credentials:'include', //must set to include to send up credentials
            body: JSON.stringify(credentials),
            header:{
                'content-type':'application/json'
            }
            
        }
        return response)
    } catch(e) {
            console.log(e)
        }
         
    }
