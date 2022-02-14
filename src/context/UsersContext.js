import React, {createContext, useReducer} from "react"
import users from "../data/users"

const initiaState = { users }
const UsersContext = createContext({})  //objeto vazio para inicialiazar o contexto

const actions = {
    createUser(state, action){    //funcao criar um usuario
        const user = action.payload
        user.id = Math.random()
        return{
            ...state,     //pegar tds os atributos do estado atual e clonar
            users: [...state.users, user],  //clonar a lista anterior mais o usuario atual
        }
    },
    updateUser(state, action) {
        const updated = action.payload
        return {
            ...state,
            users: state.users.map(u => u.id === updated.id ? updated : u) //se atualizar o elemento com o id existente ele apenas atualiza, mas se o id for diferente ele retorna o elemento
        }
    },
    deleteUser(state, action) {    //funcao deletar usuario
        const user = action.payLoad
        return{
            ...state,     // se tiver mais de um atributo vc acabara sobrescrevendo o estado inteiro "CUIDADO" ent use o codigo ao lado se tiver mais elementos
            users: state.users.filter(u => u.id !== user.id)  //se o usuario for diferente ele continua na lista caso contrario ele será excluido
        } 
    }
}

export const UsersProvider = props => {   //comunicação de componentes

    function reducer(state, action){  //funcao representando o REDUCER
        const fn = actions[action.type]
        return fn ? fn(state, action) : state  //chama a funcao deletarUser mas caso essa funcao nao exista ele vai retornar o msm estado
    }

    const [state, dispatch] = useReducer(reducer, initiaState) //reducer irá decidir oq ela vai fazer com o estado (excluir, adicionar...)
                                                               //o primerio parametro que ele ira receber eh o state o segundo eh o dipatch que ira disparar um determido  evento para tds os reducers
    return (
        <UsersContext.Provider value={{state, dispatch}}>
            {props.children}
        </UsersContext.Provider>
    ) // Provider acima irá receber uma lista de elementos 
}

export default UsersContext   

