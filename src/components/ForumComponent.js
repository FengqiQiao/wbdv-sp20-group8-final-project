import React from "react";

class ForumComponent extends React.Component {
    render() {
        return(
            <div className="container-fluid">
                <div className="tp-banner-container">
                    <div className="tp-banner">
                        <ul>
                            <li>
                                <img src={require("../constants/images/NEU.jpeg")} height="400" className="headerImage"/>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="headernav">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-1 col-xs-3 col-sm-2 col-md-2 logo "><a
                                href="index.html"><img src="images/logo.jpg" alt=""/></a></div>
                            <div className="col-lg-3 col-xs-9 col-sm-5 col-md-3 selecttopic">
                                <div className="dropdown">
                                    <a data-toggle="dropdown" href="#">Northeastern University</a> <b
                                    className="caret"></b>
                                    {/*<ul className="dropdown-menu" role="menu">*/}
                                    {/*    <li role="presentation"><a role="menuitem" tabIndex="-1"*/}
                                    {/*                               href="#">Borderlands 1</a></li>*/}
                                    {/*    <li role="presentation"><a role="menuitem" tabIndex="-2"*/}
                                    {/*                               href="#">Borderlands 2</a></li>*/}
                                    {/*    <li role="presentation"><a role="menuitem" tabIndex="-3"*/}
                                    {/*                               href="#">Borderlands 3</a></li>*/}

                                    {/*</ul>*/}
                                </div>
                            </div>
                            <div className="col-lg-4 search hidden-xs hidden-sm col-md-3 form-inline">
                                        <span className="pull-left txt"><input type="text"
                                                                              className="form-control w-75"
                                                                              placeholder="Search Post"/>
                                        </span>
                                        <span className="float-right">
                                            <button className="btn btn-default" type="button"><i
                                                className="fa fa-search"></i></button>
                                        </span>
                            </div>
                            <div className="col-lg-4 col-xs-12 col-sm-5 col-md-4 avt">
                                <div className="stnt pull-left">
                                    {/*<form action="03_new_topic.html" method="post" className="form">*/}
                                    {/*    <button className="btn btn-primary">Start New Post</button>*/}
                                    {/*</form>*/}
                                        <button className="btn btn-primary">Start New Post</button>
                                </div>

                                <div className="avatar pull-left dropdown">
                                    <a data-toggle="dropdown" href="#"><img src="images/avatar.jpg"
                                                                            alt=""/></a> <b
                                    className="caret"></b>
                                    <div className="status green">&nbsp;</div>
                                    <ul className="dropdown-menu" role="menu">
                                        <li role="presentation"><a role="menuitem" tabIndex="-1"
                                                                   href="#">My Profile</a></li>
                                        <li role="presentation"><a role="menuitem" tabIndex="-2"
                                                                   href="#">Inbox</a></li>
                                        <li role="presentation"><a role="menuitem" tabIndex="-3"
                                                                   href="#">Log Out</a></li>
                                        <li role="presentation"><a role="menuitem" tabIndex="-4"
                                                                   href="04_new_account.html">Create
                                            account</a></li>
                                    </ul>
                                </div>

                                <div className="clearfix"></div>
                            </div>
                        </div>
                    </div>
                </div>

                <section className="content">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-8 col-xs-12 col-md-8 form-inline">
                                <div className="pull-left"><a href="#" className="prevnext"><i
                                    className="fa fa-angle-left"></i></a></div>
                                <div className="pull-left">
                                    <ul className="paginationforum">
                                        <li className="hidden-xs"><a href="#">1</a></li>
                                        <li className="hidden-xs"><a href="#">2</a></li>
                                        <li className="hidden-xs"><a href="#">3</a></li>
                                        <li className="hidden-xs"><a href="#">4</a></li>
                                        <li><a href="#">5</a></li>
                                        <li><a href="#">6</a></li>
                                        <li><a href="#" className="active">7</a></li>
                                        <li><a href="#">10</a></li>
                                    </ul>
                                </div>
                                <div className="pull-left"><a href="#" className="prevnext last"><i
                                    className="fa fa-angle-right"></i></a></div>
                                <div className="clearfix"></div>
                            </div>
                        </div>
                    </div>

                <div class="container">
                    <div class="row">
                        <div class="col-lg-8 col-md-8">
                            <div class="post form-inline">
                                <div class="wrap-ut pull-left">
                                    <div class="mx-5 my-5">
                                        <h2><a href="02_topic.html">How is Coop service in Northeastern University? </a></h2>
                                        <p>Undergraduates may participate in co-op after completing three academic semesters and alternate periods
                                            of academic study with six-month periods of work experience in their field(s) of interest.
                                            Transfer students are eligible to start co-op after completing at least one academic semester at Northeastern.</p>
                                    </div>
                                    <div class="clearfix"></div>
                                </div>
                                <div class="postinfo pull-left">
                                    <div class="comments">
                                        <div class="commentbg">
                                            560
                                            <div class="mark"></div>
                                        </div>

                                    </div>
                                    <div class="views"><i class="fa fa-eye"></i> 1,568</div>
                                    <div class="time"><i class="fa fa-clock-o"></i> 24 min</div>
                                </div>
                                <div class="clearfix"></div>
                            </div>


                            <div class="post form-inline">
                                <div class="wrap-ut pull-left">

                                    <div class="mx-5 my-5">
                                        <h2><a href="02_topic.html">Where can I find good restaurant near Northeastern University? </a></h2>
                                        <p> Top 5: Giacomo's. 0.4 mi. 1278 reviews.
                                            Conor Larkins Grill & Tap. 1.0 mi. 113 reviews.
                                            Atlantic Fish Co. 0.5 mi. 2537 reviews.
                                            Boston Shawarma. 1.0 mi. 571 reviews.
                                            The Squealing Pig. 1.8 mi. 413 reviews.</p>
                                    </div>
                                    <div class="clearfix"></div>
                                </div>
                                <div class="postinfo pull-left">
                                    <div class="comments">
                                        <div class="commentbg">
                                            89
                                            <div class="mark"></div>
                                        </div>

                                    </div>
                                    <div class="views"><i class="fa fa-eye"></i> 1,568</div>
                                    <div class="time"><i class="fa fa-clock-o"></i> 15 min</div>
                                </div>
                                <div class="clearfix"></div>
                            </div>


                            <div class="post form-inline">
                                <div class="wrap-ut pull-left">
                                    <div class="mx-5 my-5">
                                        <h2><a href="02_topic.html">Where is the fitting center near Northeastern? </a></h2>
                                        <p>Marino Recreation Center, 259-269 Huntington Ave, Boston, MA 02115.</p>
                                    </div>
                                    <div class="clearfix"></div>
                                </div>
                                <div class="postinfo pull-left">
                                    <div class="comments">
                                        <div class="commentbg">
                                            456
                                            <div class="mark"></div>
                                        </div>

                                    </div>
                                    <div class="views"><i class="fa fa-eye"></i> 1,568</div>
                                    <div class="time"><i class="fa fa-clock-o"></i> 2 days</div>
                                </div>
                                <div class="clearfix"></div>
                            </div>

                        </div>
                        <div class="col-lg-4 col-md-4">

                            <div class="sidebarblock">
                                <h3>Student Profile</h3>
                                <div class="divline"></div>
                                <div class="blocktxt">
                                    <ul class="cats">
                                        <li><a>Status: <span class="badge pull-right">Current Student</span></a></li>
                                        <li><a>Major: <span class="badge pull-right">Computer Science</span></a></li>
                                        <li><a>GPA: <span class="badge pull-right">3.88</span></a></li>
                                        <li><a>Education Level: <span class="badge pull-right">Master</span></a></li>
                                        <li><a>Expected Graduation Year: <span class="badge pull-right">2021</span></a></li>
                                    </ul>
                                </div>
                            </div>

                            <div class="sidebarblock">
                                <h3>University Information</h3>
                                <div class="divline"></div>
                                <div class="blocktxt">
                                    <form action="#" method="post" class="form">
                                        <table class="poll">
                                            <tr>
                                                <td>
                                                    <div class="progress">
                                                        <div class="progress-bar color1" role="progressbar" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100" style={{width: "90%"}}>
                                                            Internship/Coop Service
                                                        </div>
                                                    </div>
                                                </td>
                                                <td class="chbox">
                                                    <input id="opt1" type="radio" name="opt" value="1"/>
                                                        <label for="opt1"></label>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <div class="progress">
                                                        <div class="progress-bar color2" role="progressbar" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100" style={{width: "63%"}}>
                                                            Academic Ability
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="chbox">
                                                    <input id="opt2" type="radio" name="opt" value="2" checked/>
                                                        <label for="opt2"></label>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <div class="progress">
                                                        <div class="progress-bar color3" role="progressbar" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100" style={{width: "75%"}} >
                                                            Tuition Fee
                                                        </div>
                                                    </div>
                                                </td>
                                                <td class="chbox">
                                                    <input id="opt3" type="radio" name="opt" value="3"/>
                                                        <label for="opt3"></label>
                                                </td>
                                            </tr>
                                            <ul className="cats">
                                                <li><a>Location: <span className="badge pull-right">Boston, MA</span></a>
                                                </li>
                                                <li><a>US News Ranking: <span className="badge pull-right">39</span></a>
                                                </li>
                                                <li><a>Preferred Student: <span
                                                    className="badge pull-right">High GPA</span>
                                                    <span
                                                        className="badge pull-right">Had Working Experience</span></a>
                                                </li>
                                            </ul>
                                        </table>
                                    </form>
                                    <p class="smal">Updated date: April, 2020</p>
                                </div>
                            </div>

                            {/*<div class="sidebarblock">*/}
                            {/*    <h3>My Active Threads</h3>*/}
                            {/*    <div class="divline"></div>*/}
                            {/*    <div class="blocktxt">*/}
                            {/*        <a href="#">This Dock Turns Your iPhone Into a Bedside Lamp</a>*/}
                            {/*    </div>*/}
                            {/*    <div class="divline"></div>*/}
                            {/*    <div class="blocktxt">*/}
                            {/*        <a href="#">Who Wins in the Battle for Power on the Internet?</a>*/}
                            {/*    </div>*/}
                            {/*    <div class="divline"></div>*/}
                            {/*    <div class="blocktxt">*/}
                            {/*        <a href="#">Sony QX10: A Funky, Overpriced Lens Camera for Your Smartphone</a>*/}
                            {/*    </div>*/}
                            {/*    <div class="divline"></div>*/}
                            {/*    <div class="blocktxt">*/}
                            {/*        <a href="#">FedEx Simplifies Shipping for Small Businesses</a>*/}
                            {/*    </div>*/}
                            {/*    <div class="divline"></div>*/}
                            {/*    <div class="blocktxt">*/}
                            {/*        <a href="#">Loud and Brave: Saudi Women Set to Protest Driving Ban</a>*/}
                            {/*    </div>*/}
                            {/*</div>*/}


                        </div>
                    </div>
                </div>



                <div class="container">
                    <div class="row">
                        <div class="col-lg-8 col-xs-12 form-inline">
                            <div class="float-right"><a href="#" class="prevnext"><i class="fa fa-angle-left"></i></a></div>
                            <div class="float-left">
                                <ul class="paginationforum">
                                    <li class="hidden-xs"><a href="#">1</a></li>
                                    <li class="hidden-xs"><a href="#">2</a></li>
                                    <li class="hidden-xs"><a href="#">3</a></li>
                                    <li class="hidden-xs"><a href="#">4</a></li>
                                    <li><a href="#">5</a></li>
                                    <li><a href="#">6</a></li>
                                    <li><a href="#" class="active">7</a></li>
                                    <li><a href="#">10</a></li>
                                </ul>
                            </div>
                            <div class="pull-left"><a href="#" class="prevnext last"><i class="fa fa-angle-right"></i></a></div>
                            <div class="clearfix"></div>
                        </div>
                    </div>
                </div>


            </section>

        <footer>
            <div class="container">
                <div class="row">
                    <div class="col-lg-1 col-xs-3 col-sm-2 logo "><a href="#"><img src="images/logo.jpg" alt=""  /></a></div>
                    <div class="col-lg-8 col-xs-9 col-sm-5 ">Copyrights 2020, Zheng Feng, Junxiang Zhao, Chencheng Geng, Fengqi Qiao</div>
                    <div class="col-lg-3 col-xs-12 col-sm-5 sociconcent">
                        <ul class="socialicons">
                            <li><a href="#"><i class="fab fa-weixin"></i></a></li>
                            <li><a href="#"><i class="fab fa-twitter"></i></a></li>
                            <li><a href="#"><i class="fab fa-google-plus"></i></a></li>
                            <li><a href="#"><i class="fab fa-facebook-square"></i></a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    </div>
        )
    }
}

export default ForumComponent
