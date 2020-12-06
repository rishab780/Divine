import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComment } from '@fortawesome/free-solid-svg-icons'
class Comment extends Component {
   
    render() { 
        
        return (<FontAwesomeIcon  icon={faComment} style={{"margin-left": "10px"}}/>  );
    }
}
 
export default Comment;