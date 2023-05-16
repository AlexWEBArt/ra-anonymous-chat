import { useEffect, useRef } from "react";

export default function Message(props) {
    // const [colorUsers, setColorUsers] = useState([
    //     {
    //         userId: props.myId,
    //         color: `#ff2178`
    //     },
    // ]);
    const messageScroll = useRef();

    useEffect(() => {
        messageScroll.current.scrollIntoView({ behavior: 'smooth' })
    })

    const { myId } = props
    const { id, content, userId, color } = props.message;

    // const user = colorUsers.find(item => item.userId === userId)

    // if (!user) {
    //     setColorUsers(prevColorUsers => [...prevColorUsers, {
    //         userId: userId,
    //         color: `#${(0x1000000+Math.random()*0xffffff).toString(16).substr(1,6)}`
    //     }])
    // }

    const whoseMessage = userId === myId ? 'my' : 'other';
    // const userColor = colorUsers.find(item => item.userId === userId).color;

    const textColor = (color) => {
        var c = color.substring(1);      // strip #
        var rgb = parseInt(c, 16);   // convert rrggbb to decimal
        var r = (rgb >> 16) & 0xff;  // extract red
        var g = (rgb >>  8) & 0xff;  // extract green
        var b = (rgb >>  0) & 0xff;  // extract blue
    
        var luma = 0.2126 * r + 0.7152 * g + 0.0722 * b; // per ITU-R BT.709
    
        if (luma < 50) {
            return 'white'
        }
        return 'black'
    }
    
    return (
        <div className={"message " + whoseMessage} data-id={id} style={ {backgroundColor: color, color: textColor(color)} } ref={messageScroll}>
            <p className="message-text">
                {content}
            </p>
        </div>
    )
}