import Message from "./MessageFunc";
import PreLoader from "./PreLoaderFunc";
import { addMessage, reqestFrom } from "./FetchApiFunc";
import { useState, useEffect } from "react";
import {v4 as uuidv4} from 'uuid';

export default function Chat() {
    const [text, setText] = useState(
        { 
            userId: uuidv4(),
            content: '' ,
            color: `#${(0x1000000+Math.random()*0xffffff).toString(16).substr(1,6)}`,
        }
    );
    const [updated, setUpdated] = useState();
    const [preloader, setPreloader] = useState(false)
    const [messageId, setMessageId] = useState(0);
    const [messages, setMessages] = useState([]);

    const loadMessages = () => {
        setTimeout(() => {
            setPreloader(true);
            reqestFrom(apiURL, messageId).then((result) => {     
                if (result.length > 0) {
                    const prevItemArr = [];
                    if (messages.find(cU => cU.id === result[0].id)) {return null}
                    result.forEach(item => {

                        let color;
                        if (item.userId === text.userId) {
                            color = text.color;
                        } else if (prevItemArr.find(cU => cU.userId === item.userId)) {
                            color = prevItemArr.find(cU => cU.userId === item.userId).color;
                        } else if(messages.find(cU => cU.userId === item.userId)) {
                            color = messages.find(cU => cU.userId === item.userId).color;
                        } else {
                            color = `#${(0x1000000+Math.random()*0xffffff).toString(16).substr(1,6)}`;
                        }

                        item.color = color;
                        prevItemArr.push(item);
                        setMessages(prevMessages => [...prevMessages, item])
                    });

                    setMessageId(result[result.length - 1].id);
                }

                setUpdated(new Date().getTime());
                setPreloader(false);
            })
        }, 0)
    }

    const apiURL = 'https://ra-anonymous-chat-backend.onrender.com/';

    useEffect(() => {
        console.log('prestart')
        loadMessages()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        let timeout = setTimeout(loadMessages, 2000)
        
        return () => {
            clearTimeout(timeout);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [updated])

    

    const handleChange = (e) => {
        const { value } = e.target;
        setText(prevText => ({...prevText, content: value}));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        addMessage(apiURL, text);
        loadMessages();
        setText(prevText => ({ ...prevText, content: '' }));
    }

    return (
        <div className="chat-container">
            <div className="messages-container">
                {messages.map(item => <Message key={item.id} myId={text.userId} message={item}/>)}
            </div>
            <form className="chat-form" onSubmit={handleSubmit}>
                <div className="preloader">
                    {preloader ? <PreLoader/> : null}
                </div>
                <input className="chat-input" required value={text.content} onChange={handleChange}></input>
                <button className="chat-submit-btn">
                    &#10148;
                </button>
            </form>
        </div>
    )
}