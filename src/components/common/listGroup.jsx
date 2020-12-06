import React, { Component } from 'react';
const ListGroup = (props) => {
    const {items,selectedItem, onItemSelect} = props;
    
    return <ul className="list-group">
        {items.map(item =>
             <li key={item.name} 
             onClick={()=> onItemSelect(item)}
             className={item === selectedItem ? "list-group-item active": "list-group-item"}>
                 {item.name}
                 </li> )}
        
    </ul>
}
  
export default ListGroup;