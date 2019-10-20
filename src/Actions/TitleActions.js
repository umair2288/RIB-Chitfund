import dispatcher from '../dispatcher/dispatcher'


export function changeTitle(text){
    dispatcher.dispatch(
        {
            type : "CHANGE_TITLE",
            text
        }
    )
}