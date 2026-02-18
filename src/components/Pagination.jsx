
function Pagination({ pagination, goPage }) {
    return (
        <>
            <nav aria-label="Page navigation">
                <ul className="pagination justify-content-center pt-5">
                    <li className={`page-item ${pagination && !pagination.has_pre && 'disabled'}`}>
                        {/* 如果!(pagination)=true的話就執行disabled ，代表pagination是false時會執行*/}
                        <a className="page-link" onClick={(e) => {
                            e.preventDefault();
                            goPage(1);
                        }} aria-label="Previous">
                            <span aria-hidden="true">&laquo;</span>
                        </a>
                    </li>
                    {pagination && [...Array(pagination.total_pages).keys()].map((item, index) => (
                        <li className="page-item" key={`分頁${index}`}>
                            <a className="page-link" onClick={(e) => {
                                e.preventDefault();
                                goPage(item + 1);
                            }} >{item + 1}
                            </a>
                        </li>
                    ))}
                    <li className={`page-item ${pagination && !pagination.has_next && 'disabled'}`}>
                        <a className="page-link" onClick={(e) => {
                            e.preventDefault();
                            goPage(pagination.total_pages);
                        }} aria-label="Next">
                            <span aria-hidden="true">&raquo;</span>
                        </a>
                    </li>
                </ul>
            </nav>
        </>
    )
}

export default Pagination