import React from 'react'

const Pagination = ({ pageCount, pageNumbers }) => {

    return (
        <nav className="text-center mt-5">
            <ul className="pagination d-inline-flex">
                <li className="page-item disabled">
                    <span className="page-link" href="#" tabIndex="-1" aria-disabled="true"><span className="mdi mdi-chevron-left"></span></span>
                </li>
                {
                   pageNumbers && pageNumbers.map((pageNumber, key) => (
                        <li className="page-item"><span className="page-link">{pageNumber}</span></li>
                   ))
                }
                <li className="page-item">
                    <span className="page-link" href="#"><span className="mdi mdi-chevron-right"></span></span>
                </li>
            </ul>
            <ul className="pagination d-inline-flex goto-page">
                <li className="page-item">
                    <label htmlFor="">Go to page</label>
                    <input type="text" className="form-control" />
                </li>
                <li className="page-item">
                    <span className="page-link" href="#"><span className="mdi mdi-chevron-right"></span></span>
                </li>
            </ul>
        </nav>
    )
}

export default Pagination
