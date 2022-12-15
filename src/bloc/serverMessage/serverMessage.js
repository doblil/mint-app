import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { selectCurrentMessage, sMessageCh } from "../../store/sMessageSlice"
import './serverMessage.scss'


export const ServerMessage = () => {
    const currentMessage = useSelector(selectCurrentMessage);
    const dispatch = useDispatch();


    let content
    if(currentMessage){
        content = (<div className="server-message">
        {currentMessage}
    </div>)
    } else {
        content = <>
        </>
    }
   console.log(currentMessage)

    useEffect(() => {

        const timerId = setTimeout(() => {
            dispatch(sMessageCh(''));
            clearTimeout(timerId);
        }, 4000);

        
    }, [currentMessage, dispatch])

    
    
    return content
}