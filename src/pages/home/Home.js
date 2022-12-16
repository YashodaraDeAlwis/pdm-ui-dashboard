import "./home.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Widget from "../../components/widget/Widget";

const Home =()=>{
    return(
        <div className="home"> 
           <Sidebar/>
          <div className="homecontainer"> 
          <Navbar/>
          <Widget/>
          </div>
          
        </div>
    )
}

export default Home