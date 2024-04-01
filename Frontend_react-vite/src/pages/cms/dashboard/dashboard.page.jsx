const AdminDashboard=()=>{
     return(
          <>
          <div className="container-fluid px-4">
                        <h1 className="mt-4">Static Navigation</h1>
                        <ol className="breadcrumb mb-4">
                            <li className="breadcrumb-item"><a href="index.html">Dashboard</a></li>
                            <li className="breadcrumb-item active">Static Navigation</li>
                        </ol>
                        <div className="card mb-4">
                            <div className="card-body">
                                <p className="mb-0">
                                    This page is an example of using static navigation. By removing the
                                    <code>.sb-nav-fixed</code>
                                    className from the
                                    <code>body</code>
                                    , the top navigation and side navigation will become static on scroll. Scroll down this page to see an example.
                                </p>
                            </div>
                        </div>
                        <div style={{height: "100vh"}}></div>
                        <div className="card mb-4"><div className="card-body">When scrolling, the navigation stays at the top of the page. This is the end of the static navigation demo.</div></div>
                    </div>
          </>
     )
}

 export default AdminDashboard;