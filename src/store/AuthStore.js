import { EventEmitter } from "events";
import dispatcher from "../dispatcher/dispatcher";
import keys from "../keys";
import Axios from "axios";


class AuthStore extends EventEmitter {

    constructor(){
        super()
        this.initialState = {
            token : null,
            loading : false,
            profile : null
        }
    }

    loadingStart = () => {
        this.initialState.loading = true
        this.emit('update')
    }

    loadingEnd = () => {
        this.initialState.loading = false
        this.emit('update')
    }

    autoCheckState = () => {
        this.loadingStart()
        const token = localStorage.getItem('token')
        if (token == undefined){
            this.initialState.token = null
            this.loadingEnd()
        }
        else{
            Axios.post(`${keys.server}/user/get-user-profile/`,null,{headers:{Authorization : `Token ${token}`}})
            .then(({data})=>{
                if (data.success){
                    this.initialState.token = token
                    this.initialState.profile = data.data     
                }
                else{
                    this.initialState.token = null
                    localStorage.removeItem('token')
                }
                this.loadingEnd()

            })
            .catch(error=>{
                this.initialState.token = null
                localStorage.removeItem('token')
                this.loadingEnd()

            })
        }
    }

    login = (data) => {
        const url = keys.server + "/user/get-auth-token/"
        this.loadingStart()
        Axios.post(url,data)
        .then(({data})=>{
            localStorage.setItem('token',data.token)
            this.initialState.token = data.token
            this.autoCheckState()
        })
        .catch(error=>{
            console.log(error)
            this.loadingEnd()

        })

    }

    logout = () => {
        this.loadingStart()
        localStorage.removeItem('token')
        this.initialState.token = null
        this.loadingEnd()
    }

    handleActions = (action) => {
        switch(action.type){
            case "AUTO_CHECK_STATE" : return this.autoCheckState()
            case "LOGIN" : return this.login(action.data)
            case "LOGOUT" : return this.logout()
            default : return
        }
    }
}

const authStore = new AuthStore()
dispatcher.register(authStore.handleActions.bind(authStore))

export default authStore