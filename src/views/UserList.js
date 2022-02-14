import React, { useContext } from 'react'
import { View, FlatList, Alert } from 'react-native'
import { ListItem, Avatar} from 'react-native-elements'
import UsersContext from '../context/UsersContext'
 
export default props =>{

    const { state, dispatch } = useContext(UsersContext)  //acessar o valor compartilhado sem precisar importar a lita de usuarios

    function confirmUserDeletion(user){
        Alert.alert('Excluir Usuário', 'Deseja excluir o usuário?', [
            {
                text: 'Sim',
                onPress(){
                    dispatch({          // esta passando uma action
                        type:'deleteUser',     
                        payLoad: user,        //informaçao que vai passar com o tipo da ação
                    })
                }
            },
            {
                text: 'Não'
            }
        ])
    }

    function getUserItem({ item: user }) {
            return (      //renderizar a lista de usuario
                <ListItem
                    bottomDivider
                    onPress={() => props.navigation.navigate('UserForm', user)}>
                    <Avatar
                        title={user.name}
                        Subtitle={user.email}
                        source={{ uri: user.avatarUrl }}
                    />
                <ListItem.Content>
                    <ListItem.Title>{user.name}</ListItem.Title>
                    <ListItem.Subtitle>{user.email}</ListItem.Subtitle>
                </ListItem.Content>

                <ListItem.Chevron //Botoes da direita (LAPIS E LIXEIRA)
                    onPress={() => props.navigation.navigate('UserForm', user)}
                    iconProps={{name: "edit"}}
                    iconStyle={{fontSize: 25, color: "orange"}}
                />
                <ListItem.Chevron
                    onPress={() => confirmUserDeletion(user)}
                    iconProps={{name: 'delete'}}
                    iconStyle={{fontSize: 25, color: "red"}}
                />

                </ListItem>
            )
        }
        return (
            <View>
                <FlatList
                    keyExtractor={user => user.id.toString()}
                    data={state.users}
                    renderItem={getUserItem}
                />
            </View>
        )
    }
