import React from 'react';
import _ from 'lodash';

const Pagination = (props) => {
    
    const {itemsCount, pageSize,onPageChange} = props;
    const pagesCount = Math.ceil(itemsCount/pageSize);
    
    const pages = _.range(1, pagesCount+1);
    return <nav>
        <ul className="pagination">
            {pages.map(page =>( 
            <li key={page} className="page-item">
                <a onClick={() => onPageChange(page)} className="page-link">{page}</a></li>
        ))}
           
        </ul>
    </nav>;
}
 
export default Pagination;
