import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import  {faHeart as sHeart}  from '@fortawesome/free-solid-svg-icons'
import {faHeart as rHeart} from '@fortawesome/free-regular-svg-icons'
class Like extends Component {
   
    render() { 
    
        return (  <React.Fragment>
              {this.props.liked && 
              <FontAwesomeIcon 
              style={{color: 'red'}} 
              onClick={this.props.onClick}
              icon={sHeart}/> }
              {!this.props.liked &&
               <FontAwesomeIcon style={{color: 'red'}} onClick={this.props.onClick} icon={rHeart} /> }
        </React.Fragment>
        );
    }
}
 
export default Like;